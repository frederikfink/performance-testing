import Callout from "@/blog/blocks/callout/callout";
import Media from "@/blog/blocks/media/media";
import {
  ArticleQuery,
  BlogCalloutBlockRecord,
  BlogMediaFragment,
} from "@/gql/generated/graphql";
import {
  StructuredText,
  TypesafeStructuredTextGraphQlResponse,
} from "react-datocms/structured-text";

interface Props {
  article: ArticleQuery["article"];
}

const BlogStructuredText = ({ article }: Props) => {
  if (!article?.content) return null;

  return (
    <article className="mx-auto prose max-w-4xl container block px-3">
      <h1 className="border-b pb-4">{article.title}</h1>
      <StructuredText
        data={article.content as TypesafeStructuredTextGraphQlResponse}
        renderBlock={({ record }) => {
          const key = record._modelApiKey;

          if (key === "blog_media_block")
            return <Media data={record as BlogMediaFragment} />;
          if (key === "blog_callout_block")
            return <Callout data={record as BlogCalloutBlockRecord} />;

          return <></>;
        }}
      />
    </article>
  );
};

export default BlogStructuredText;
