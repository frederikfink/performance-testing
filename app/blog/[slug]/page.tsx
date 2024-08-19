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
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { prettyDate } from "@/lib/pretty";
import Title from "@/components/article/title";
import ContentLoadingSkeleton from "@/components/article/content-loading-skeleton";
import Author from "@/components/author.tsx/author";

const getReadtime = (content: TypesafeStructuredTextGraphQlResponse) => {
  let readtime = 4;

  return readtime;
};

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
  const content = article.content as TypesafeStructuredTextGraphQlResponse;

  return (
    <article className="px-3">
      {image && (
        <Image
          sizes="(max-width: 896px) 100vw, 896px"
          priority={true}
          className="h-[500px] mb-8 bg-muted max-w-4xl mx-auto w-full"
          focalPoint={article.heroImage?.focalPoint || undefined}
          image={image}
          alt={image.alt || undefined}
        />
      )}

      <div className="mx-auto text-primary max-w-4xl block space-y-8 [&>p]:leading-7 animate-in dark:[&>p]:text-muted-foreground">
        <div className="flex items-center gap-4">
          <Badge variant={"outline"}>{prettyDate(article._publishedAt)}</Badge>
          <Badge variant={"outline"}>{getReadtime(content)} Minutes</Badge>
        </div>
        <Title
          className={"animate-in"}
          title={article.title}
          subtitle={article.subtitle}
        />
        <hr className="mb-12" />
        {article.author && <Author author={article.author} />}
        <hr className="mb-12" />
        <Suspense fallback={<ContentLoadingSkeleton />}>
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
        </Suspense>
      </div>
    </article>
  );
};

export default Page;
