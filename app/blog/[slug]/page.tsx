import Media from "@/blog/blocks/media/media";
import Image from "@/components/image/image";
import {
  BlogCodeBlockFragment,
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
import CodeBlock from "@/blog/blocks/code-block/code-block";

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
    <article className="mb-20">
      {image && (
        <Image
          sizes="(max-width: 3500px) 100vw, 3500px"
          priority={true}
          className="h-[200px] mb-20  "
          image={image}
          alt={image.alt || undefined}
        />
      )}
      <div className="mx-auto text-primary max-w-4xl container block px-3 space-y-8 [&>p]:leading-7 animate-in dark:[&>p]:text-muted-foreground">
        <div className="my-12 animate-in">
          <h1 className="mb-4 text-3xl font-medium tracking-tighter">
            {article.title}
          </h1>
          <p className="text-lg dark:text-muted-foreground text-primary tracking-tight">
            {article.subtitle}
          </p>
        </div>
        <hr className="mb-12" />
        <StructuredText
          data={article.content as TypesafeStructuredTextGraphQlResponse}
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
      </div>
    </article>
  );
};

export default Page;
