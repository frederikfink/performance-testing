import { createHighlighter } from "shiki";
import dark from "./vercel-dark-theme";
import light from "./vercel-light-theme";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import CopyCodeButton from "./copy-code-button";
import { FileJs, FileTs } from "@phosphor-icons/react/dist/ssr";

interface Props {
  code: string;
  language: string;
  title?: string;
}

const getIcon = (language: string) => {
  switch (language) {
    case "javascript":
      return <FileJs size={16} />;
    case "typescript":
      return <FileTs size={16} />;
  }
};

const CodeBlock = async ({ code, title, language }: Props) => {
  const highlighter = await createHighlighter({
    themes: [dark, light],
    langs: ["javascript", "typescript"],
  });

  await highlighter.loadTheme(dark, light);

  const html = highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      dark: "vercel-dark",
      light: "vercel-light",
    },
    transformers: [transformerNotationHighlight(), transformerNotationDiff()],
  });

  return (
    <div className="rounded-lg border">
      <div className="px-4 py-3 text-sm bg-muted/30 gap-2 dark:bg-black items-center rounded-t-lg text-muted-foreground flex">
        {getIcon(language)}
        <p className="text-[13px]">{title}</p>
        <CopyCodeButton className="ml-auto" code={code} />
      </div>
      <div
        className="[&>pre]:rounded-b-lg [&>pre]:py-4 [&>pre]:px-2 text-[13px] border-t overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default CodeBlock;
