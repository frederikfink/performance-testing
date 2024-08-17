"use client";

import CodeBlock from "@/blog/blocks/code-block/code-block";
import Media from "@/blog/blocks/media/media";
import {
  BlogCodeBlockFragment,
  BlogMediaFragment,
} from "@/gql/generated/graphql";
import {
  StructuredText,
  TypesafeStructuredTextGraphQlResponse,
} from "react-datocms";

interface Props {
  content: TypesafeStructuredTextGraphQlResponse;
}

const BlogRender = ({ content }: Props) => {
  return (
    <StructuredText
      data={content}
      renderBlock={({ record }) => {
        const key = record._modelApiKey;
        const data = record as unknown;

        if (key === "blog_media_block")
          return <Media data={data as BlogMediaFragment} />;
        if (key === "blog_code_block")
          return <CodeBlock data={data as BlogCodeBlockFragment} />;

        return <></>;
      }}
    />
  );
};

export default BlogRender;
