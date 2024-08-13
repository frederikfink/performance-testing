import { getPage, getPageMetadata } from "@/lib/datoCMS/helpers";
import { notFound } from "next/navigation";
import { Metadata, StructuredText, toNextMetadata } from "react-datocms";

interface Props {
  params: {
    slug: string;
  };
}

export const generateMetadata = async ({
  params: { slug },
}: Props): Promise<Metadata> => {
  const page = await getPageMetadata(slug);
  return toNextMetadata(page?.seo || []);
};

const Page = async ({ params: { slug } }: Props) => {
  const page = await getPage(slug);

  if (!page) return notFound();

  return (
    <article className="max-w-prose mx-auto mt-20 prose">
      <h1 className="border-b pb-4">{page.title}</h1>
      {page.content && <StructuredText data={page.content.value} />}
    </article>
  );
};

export default Page;
