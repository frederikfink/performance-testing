"use server";

import {
  AllArticlesDocument,
  MetadataDocument,
  ArticleDocument,
  SiteLocale,
} from "@/gql/generated/graphql";
import { request } from "./client";

export const getArticle = async (slug: string, locale: SiteLocale) => {
  const { article } = await request(
    ArticleDocument,
    { slug, locale },
    { tags: [`article:${slug}`] }
  );

  return article;
};

export const getPageMetadata = async (slug: string, locale: string) => {
  const { article } = await request(
    MetadataDocument,
    { slug, locale },
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
