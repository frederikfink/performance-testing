import BlogStructuredText from "@/components/blog-structured-text";
import { getArticle, getPageMetadata } from "@/lib/datoCMS/helpers";
import { notFound } from "next/navigation";
import { Metadata, toNextMetadata } from "react-datocms";

interface Props {
  params: {
    slug: string;
  };
}

export const generateMetadata = async ({
  params: { slug },
}: Props): Promise<Metadata> => {
  const article = await getPageMetadata(slug);
  return toNextMetadata(article?.seo || []);
};

const Page = async ({ params: { slug } }: Props) => {
  const article = await getArticle(slug);

  if (!article) return notFound();

  return (
    <article>{article && <BlogStructuredText article={article} />}</article>
  );
};

export default Page;
