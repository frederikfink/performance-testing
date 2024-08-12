import {
  PageDocument,
  PageQuery,
  PageQueryVariables,
} from "@/gql/generated/graphql";
import { request } from "@/lib/datoCMS/client";
import { notFound } from "next/navigation";
import { StructuredText } from "react-datocms";

interface Props {
  params: {
    slug: string;
  };
}

const Page = async ({ params: { slug } }: Props) => {
  const { page } = await request<PageQuery, PageQueryVariables>(
    PageDocument,
    { slug },
    { tags: [`page:${slug}`] }
  );

  if (!page) return notFound();

  return (
    <article className="max-w-prose mx-auto mt-20 prose">
      <h1 className="border-b pb-4">{page.title}</h1>
      {page.content && <StructuredText data={page.content.value} />}
    </article>
  );
};

export default Page;
