"use server";

import {
  AllArticlesDocument,
  MetadataDocument,
  ArticleDocument,
} from "@/gql/generated/graphql";
import { request } from "./client";

export const getArticle = async (slug: string) => {
  const { article } = await request(
    ArticleDocument,
    { slug },
    { tags: [`article:${slug}`] }
  );

  return article;
};

export const getPageMetadata = async (slug: string) => {
  const { article } = await request(
    MetadataDocument,
    { slug },
    { tags: [`article:${slug}`] }
  );

  return article;
};

export const getAllArticles = async () => {
  const { allArticles } = await request(
    AllArticlesDocument,
    {},
    { tags: [`articles`] }
  );

  return allArticles;
};
