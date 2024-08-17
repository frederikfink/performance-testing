import { AllArticlesDocument } from "@/gql/generated/graphql";
import { request } from "@/lib/datoCMS/client";
import { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { allArticles } = await request(
    AllArticlesDocument,
    {},
    { tags: [`pages`] }
  );

  return allArticles.map((article) => ({
    url: `https://performance-testing-one.vercel.app/blog/${article.slug}`,
    lastModified: new Date(article._publishedAt).toISOString(),
  }));
};

export default sitemap;
