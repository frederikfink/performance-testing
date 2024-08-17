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
  renderNodeRule,
  toNextMetadata,
  TypesafeStructuredTextGraphQlResponse,
} from "react-datocms";
import { isCode } from "datocms-structured-text-utils";
import CodeBlock from "@/components/code-block/code-block";

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
      <div className="mx-auto text-primary max-w-4xl container block px-3 space-y-8 [&>p]:leading-7 animate-in">
        <div className="my-12 animate-in">
          <h1 className="mb-4 text-3xl font-medium tracking-tighter">
            {article.title}
          </h1>
          <p className="text-lg text-primary tracking-tight">
            {article.subtitle}
          </p>
        </div>
        <hr className="mb-12" />
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
          customNodeRules={[
            renderNodeRule(isCode, ({ node, key }) => {
              return <CodeBlock key={key} code={node} />;
            }),
          ]}
        />
      </div>
    </article>
  );
};

export default Page;
