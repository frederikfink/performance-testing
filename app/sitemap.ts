import {
  AllPagesDocument,
  AllPagesQuery,
  AllPagesQueryVariables,
} from "@/gql/generated/graphql";
import { request } from "@/lib/datoCMS/client";
import { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { allPages } = await request<AllPagesQuery, AllPagesQueryVariables>(
    AllPagesDocument,
    {},
    { tags: [`pages`] }
  );

  return allPages.map((page) => ({
    url: `/${page.slug}`,
    lastModified: new Date(page._publishedAt).toISOString(),
  }));
};

export default sitemap;
