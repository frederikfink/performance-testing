import BlogStructuredText from "@/components/blog-structured-text";
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
    <article>
      <h1 className="border-b pb-4">{page.title}</h1>
      {page && <BlogStructuredText page={page} />}
    </article>
  );
};

export default Page;
