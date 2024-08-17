import { createHighlighter } from "shiki";
import dark from "./vercel-dark-theme";
import light from "./vercel-light-theme";
import { type Code } from "datocms-structured-text-utils";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { Button } from "../ui/button";
import CopyCodeButton from "./copy-code-button";

interface Props {
  code: Code;
}

const CodeBlock = async ({ code }: Props) => {
  const highlighter = await createHighlighter({
    themes: [dark, light],
    langs: ["javascript", "typescript"],
  });

  await highlighter.loadTheme(dark, light);

  const html = highlighter.codeToHtml(code.code, {
    lang: "typescript",
    themes: {
      dark: "vercel-dark",
      light: "vercel-light",
    },
    transformers: [transformerNotationHighlight(), transformerNotationDiff()],
  });
  return (
    <div className="rounded-lg border">
      <div className="px-4 py-3 text-sm bg-muted dark:bg-black items-center justify-between rounded-t-lg text-muted-foreground flex">
        <p>function.ts</p>
        <CopyCodeButton code={code.code} />
      </div>
      <div
        className="[&>pre]:rounded-b-lg [&>pre]:py-4 [&>pre]:px-2 text-[13px] border-t"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default CodeBlock;