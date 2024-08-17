import BlogStructuredText from "@/components/blog-structured-text";
import Image from "@/components/image/image";
import { ImageFragment } from "@/gql/generated/graphql";
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

  const image = article.heroImage?.responsiveImage as ImageFragment | undefined;

  return (
    <article>
      {image && (
        <Image
          priority={true}
          className="h-[480px]"
          image={image}
          alt={image.alt || undefined}
        />
      )}
      {article && <BlogStructuredText article={article} />}
    </article>
  );
};

export default Page;
