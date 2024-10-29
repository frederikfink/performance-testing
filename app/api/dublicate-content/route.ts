"use server";

import { buildClient } from "@datocms/cma-client-node";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const findLocaleKeys = (obj: any, path: string = ""): string[] => {
  // If not an object or null, return empty array
  if (!obj || typeof obj !== "object") {
    return [];
  }

  let localizedFields: string[] = [];

  // Check if current object is a localized field (has 'en' as direct key)
  if (obj.hasOwnProperty("en")) {
    localizedFields.push(path.slice(1)); // Remove leading dot
  }

  // Recursively check all nested objects
  for (const key in obj) {
    const newPath = path ? `${path}.${key}` : key;
    localizedFields = localizedFields.concat(findLocaleKeys(obj[key], newPath));
  }

  return localizedFields;
};

const translateContent = async (
  content: string,
  fromLocale: string,
  toLocale: string
): Promise<string> => {
  const { text } = await generateText({
    model: openai("gpt-4"),
    prompt: `Translate the following ${fromLocale} text to natural-sounding language of locale: ${toLocale}.
    
    Important rules:
    - Maintain all markdown and HTML formatting
    - DO NOT translate:
      * Technical terms
      * URLs
      * Code snippets or commands
    - Only output the translated text, without including these instructions
    
    ### CONTENT TO TRANSLATE ###
    ${content}
    ### END CONTENT ###`,
  });

  return text;
};

const translateDastContent = async (
  dastContent: any,
  fromLocale: string,
  toLocale: string
): Promise<any> => {
  if (!dastContent || typeof dastContent !== "object") {
    return dastContent;
  }

  // Handle arrays (like children arrays)
  if (Array.isArray(dastContent)) {
    const filteredContent = dastContent.filter((item) => item.type !== "block");
    return Promise.all(
      filteredContent.map((item) =>
        translateDastContent(item, fromLocale, toLocale)
      )
    );
  }

  // If it's a paragraph, collect all text content for context-aware translation
  if (dastContent.type === "paragraph" && dastContent.children) {
    // First, collect the full text with markers for links
    let fullText = "";
    const linkMap = new Map();
    let linkCounter = 0;

    const collectText = (node: any): string => {
      if (node.type === "span") {
        return node.value;
      }
      if (node.type === "link") {
        const linkId = `[[LINK${linkCounter}]]`;
        linkMap.set(linkId, node.url);
        linkCounter++;
        return `${linkId}${collectText(node.children[0])}${linkId}`;
      }
      if (Array.isArray(node)) {
        return node.map(collectText).join("");
      }
      return "";
    };

    fullText = collectText(dastContent.children);

    // Translate the full text
    const translatedText = await translateContent(
      fullText,
      fromLocale,
      toLocale
    );

    // Now rebuild the paragraph structure with translated content
    const rebuiltChildren = [];
    let currentText = translatedText;

    for (const child of dastContent.children) {
      if (child.type === "span") {
        const nextLinkStart = currentText.indexOf("[[LINK");
        if (nextLinkStart === -1) {
          rebuiltChildren.push({
            type: "span",
            value: currentText,
          });
          break;
        }
        if (nextLinkStart > 0) {
          rebuiltChildren.push({
            type: "span",
            value: currentText.slice(0, nextLinkStart),
          });
        }
        currentText = currentText.slice(nextLinkStart);
      } else if (child.type === "link") {
        const linkMatch = currentText.match(
          /\[\[LINK(\d+)\]](.*?)\[\[LINK\1\]]/
        );
        if (linkMatch) {
          rebuiltChildren.push({
            ...child,
            children: [
              {
                type: "span",
                value: linkMatch[2],
              },
            ],
          });
          currentText = currentText.slice(linkMatch[0].length);
        }
      }
    }

    return {
      ...dastContent,
      children: rebuiltChildren,
    };
  }

  // For other nodes, recursively process all properties
  const result: any = {};
  for (const key in dastContent) {
    result[key] = await translateDastContent(
      dastContent[key],
      fromLocale,
      toLocale
    );
  }
  return result;
};

const translate = async (
  obj: any,
  fromLocale: string,
  toLocale: string
): Promise<any> => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  // If this is a localized field (has source locale key)
  if (obj.hasOwnProperty(fromLocale)) {
    // Special handling for DAST content
    if (obj[fromLocale]?.schema === "dast") {
      const translatedDast = await translateDastContent(
        obj[fromLocale],
        fromLocale,
        toLocale
      );
      return {
        ...obj,
        [toLocale]: translatedDast,
      };
    }

    // Regular content translation
    const translatedText = await translateContent(
      obj[fromLocale],
      fromLocale,
      toLocale
    );
    return {
      ...obj,
      [toLocale]: translatedText,
    };
  }

  // For arrays
  if (Array.isArray(obj)) {
    return Promise.all(
      obj.map((item) => translate(item, fromLocale, toLocale))
    );
  }

  // For regular objects, recursively process all properties
  const result: any = {};
  for (const key in obj) {
    result[key] = await translate(obj[key], fromLocale, toLocale);
  }
  return result;
};

export const POST = async (req: Request) => {
  const { itemId, fromLocale = "en", toLocale } = await req.json();

  if (!itemId) return new Response("Item ID is required", { status: 400 });
  if (!toLocale)
    return new Response("Target locale is required", { status: 400 });

  const client = buildClient({
    apiToken: process.env.NEXT_PRIVATE_DATOCMS_FULL_ACCESS_TOKEN!,
  });

  try {
    const item = await client.items.find(itemId);
    if (!item) return new Response("Item not found", { status: 404 });

    console.log(JSON.stringify(item.content, null, 2));

    const translatedItem = await translate(item, fromLocale, toLocale);

    console.log(JSON.stringify(translatedItem, null, 2));
    await client.items.update(itemId, translatedItem);

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Translation error:", error);
    return new Response("Failed to translate and update item", { status: 500 });
  }
};
