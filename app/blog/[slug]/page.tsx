import Callout from "@/blog/blocks/callout/callout";
import Media from "@/blog/blocks/media/media";
import Image from "@/components/image/image";
import {
  BlogCalloutBlockRecord,
  BlogMediaFragment,
  ImageFragment,
} from "@/gql/generated/graphql";
import { getArticle, getPageMetadata } from "@/lib/datoCMS/helpers";
import { notFound } from "next/navigation";
import {
  Metadata,
  StructuredText,
  toNextMetadata,
  TypesafeStructuredTextGraphQlResponse,
} from "react-datocms";

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
          sizes="(max-width: 3500px) 100vw, 3500px"
          priority={true}
          className="h-[200px] mb-20  "
          image={image}
          alt={image.alt || undefined}
        />
      )}
      <article className="mx-auto prose text-primary max-w-4xl container block px-3 [&>h1]:font-medium [&>h1]:tracking-tighter">
        <h1 className="mb-4">{article.title}</h1>
        <p className="text-lg text-primary tracking-tight">
          {article.subtitle}
        </p>
        <hr />
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
    </article>
  );
};

export default Page;
