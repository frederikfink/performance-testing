/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment BlogCallout on BlogCalloutBlockRecord {\n  _modelApiKey\n  id\n  callout\n}": types.BlogCalloutFragmentDoc,
    "fragment BlogCodeBlock on BlogCodeBlockRecord {\n  id\n  _modelApiKey\n  title\n  language\n  code\n}": types.BlogCodeBlockFragmentDoc,
    "fragment BlogMedia on BlogMediaBlockRecord {\n  _modelApiKey\n  id\n  title\n  description\n  alternativeText\n  image {\n    focalPoint {\n      x\n      y\n    }\n    responsiveImage {\n      ...Image\n    }\n  }\n}": types.BlogMediaFragmentDoc,
    "fragment Author on AuthorRecord {\n  fullName\n  title\n  company\n  linkedin\n  instagram\n  github\n  image {\n    focalPoint {\n      x\n      y\n    }\n    responsiveImage(imgixParams: {crop: focalpoint, w: \"48\", h: \"48\", fit: crop}) {\n      ...Image\n    }\n  }\n}": types.AuthorFragmentDoc,
    "fragment Image on ResponsiveImage {\n  alt\n  base64\n  bgColor\n  title\n  src\n  width\n  alt\n  height\n}": types.ImageFragmentDoc,
    "query AllArticles {\n  allArticles {\n    _publishedAt\n    title\n    slug\n  }\n}": types.AllArticlesDocument,
    "query Article($slug: String, $locale: SiteLocale) {\n  article(filter: {slug: {eq: $slug}}, locale: $locale) {\n    __typename\n    _allTitleLocales {\n      locale\n      value\n    }\n    id\n    slug\n    title\n    subtitle\n    _publishedAt\n    author {\n      ...Author\n    }\n    heroImage {\n      focalPoint {\n        x\n        y\n      }\n      responsiveImage(imgixParams: {crop: focalpoint, w: \"896\", h: \"500\", fit: crop}) {\n        ...Image\n      }\n    }\n    content {\n      value\n      blocks {\n        ...BlogMedia\n        ...BlogCallout\n        ...BlogCodeBlock\n      }\n    }\n  }\n}": types.ArticleDocument,
    "query Navbar {\n  navbar {\n    title\n    links {\n      label\n      url\n    }\n  }\n}": types.NavbarDocument,
    "query Metadata($slug: String) {\n  article(filter: {slug: {eq: $slug}}) {\n    seo: _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n  site: _site {\n    favicon: faviconMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n}": types.MetadataDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment BlogCallout on BlogCalloutBlockRecord {\n  _modelApiKey\n  id\n  callout\n}"): (typeof documents)["fragment BlogCallout on BlogCalloutBlockRecord {\n  _modelApiKey\n  id\n  callout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment BlogCodeBlock on BlogCodeBlockRecord {\n  id\n  _modelApiKey\n  title\n  language\n  code\n}"): (typeof documents)["fragment BlogCodeBlock on BlogCodeBlockRecord {\n  id\n  _modelApiKey\n  title\n  language\n  code\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment BlogMedia on BlogMediaBlockRecord {\n  _modelApiKey\n  id\n  title\n  description\n  alternativeText\n  image {\n    focalPoint {\n      x\n      y\n    }\n    responsiveImage {\n      ...Image\n    }\n  }\n}"): (typeof documents)["fragment BlogMedia on BlogMediaBlockRecord {\n  _modelApiKey\n  id\n  title\n  description\n  alternativeText\n  image {\n    focalPoint {\n      x\n      y\n    }\n    responsiveImage {\n      ...Image\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Author on AuthorRecord {\n  fullName\n  title\n  company\n  linkedin\n  instagram\n  github\n  image {\n    focalPoint {\n      x\n      y\n    }\n    responsiveImage(imgixParams: {crop: focalpoint, w: \"48\", h: \"48\", fit: crop}) {\n      ...Image\n    }\n  }\n}"): (typeof documents)["fragment Author on AuthorRecord {\n  fullName\n  title\n  company\n  linkedin\n  instagram\n  github\n  image {\n    focalPoint {\n      x\n      y\n    }\n    responsiveImage(imgixParams: {crop: focalpoint, w: \"48\", h: \"48\", fit: crop}) {\n      ...Image\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Image on ResponsiveImage {\n  alt\n  base64\n  bgColor\n  title\n  src\n  width\n  alt\n  height\n}"): (typeof documents)["fragment Image on ResponsiveImage {\n  alt\n  base64\n  bgColor\n  title\n  src\n  width\n  alt\n  height\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AllArticles {\n  allArticles {\n    _publishedAt\n    title\n    slug\n  }\n}"): (typeof documents)["query AllArticles {\n  allArticles {\n    _publishedAt\n    title\n    slug\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Article($slug: String, $locale: SiteLocale) {\n  article(filter: {slug: {eq: $slug}}, locale: $locale) {\n    __typename\n    _allTitleLocales {\n      locale\n      value\n    }\n    id\n    slug\n    title\n    subtitle\n    _publishedAt\n    author {\n      ...Author\n    }\n    heroImage {\n      focalPoint {\n        x\n        y\n      }\n      responsiveImage(imgixParams: {crop: focalpoint, w: \"896\", h: \"500\", fit: crop}) {\n        ...Image\n      }\n    }\n    content {\n      value\n      blocks {\n        ...BlogMedia\n        ...BlogCallout\n        ...BlogCodeBlock\n      }\n    }\n  }\n}"): (typeof documents)["query Article($slug: String, $locale: SiteLocale) {\n  article(filter: {slug: {eq: $slug}}, locale: $locale) {\n    __typename\n    _allTitleLocales {\n      locale\n      value\n    }\n    id\n    slug\n    title\n    subtitle\n    _publishedAt\n    author {\n      ...Author\n    }\n    heroImage {\n      focalPoint {\n        x\n        y\n      }\n      responsiveImage(imgixParams: {crop: focalpoint, w: \"896\", h: \"500\", fit: crop}) {\n        ...Image\n      }\n    }\n    content {\n      value\n      blocks {\n        ...BlogMedia\n        ...BlogCallout\n        ...BlogCodeBlock\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Navbar {\n  navbar {\n    title\n    links {\n      label\n      url\n    }\n  }\n}"): (typeof documents)["query Navbar {\n  navbar {\n    title\n    links {\n      label\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Metadata($slug: String) {\n  article(filter: {slug: {eq: $slug}}) {\n    seo: _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n  site: _site {\n    favicon: faviconMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n}"): (typeof documents)["query Metadata($slug: String) {\n  article(filter: {slug: {eq: $slug}}) {\n    seo: _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n  site: _site {\n    favicon: faviconMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;