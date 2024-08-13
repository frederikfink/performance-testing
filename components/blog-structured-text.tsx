import BlogImage from "@/blog/blog-image/blog-image";
import { PageQuery } from "@/gql/generated/graphql";
import { StructuredText } from "react-datocms/structured-text";

interface Props {
  page: PageQuery["page"];
}

const BlogStructuredText = ({ page }: Props) => {
  if (!page?.content) return null;

  return (
    <article className="prose mx-auto block">
      <StructuredText
        data={page.content as any}
        renderBlock={({ record }) => {
          switch (record.__typename) {
            case "BlogImageRecord":
              return <BlogImage data={record} />;
            default:
              return <>a</>;
          }
        }}
      />
    </article>
  );
};

export default BlogStructuredText;