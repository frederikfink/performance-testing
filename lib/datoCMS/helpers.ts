"use server";

import {
  AllPagesDocument,
  MetadataDocument,
  PageDocument,
} from "@/gql/generated/graphql";
import { request } from "./client";

export const getPage = async (slug: string) => {
  const data = await request(
    PageDocument,
    { slug },
    { tags: [`page:${slug}`] }
  );

  return data.page;
};

export const getPageMetadata = async (slug: string) => {
  const { page } = await request(
    MetadataDocument,
    { slug },
    { tags: [`page:${slug}`] }
  );

  return page;
};

export const getAllPages = async () => {
  const { allPages } = await request(AllPagesDocument, {}, { tags: [`pages`] });

  return allPages;
};
