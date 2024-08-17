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
    "fragment BlogMedia on BlogMediaBlockRecord {\n  _modelApiKey\n  id\n  title\n  description\n  alternativeText\n  image {\n    responsiveImage {\n      ...Image\n    }\n  }\n}": types.BlogMediaFragmentDoc,
    "fragment Image on ResponsiveImage {\n  alt\n  base64\n  bgColor\n  title\n  webpSrcSet\n  src\n  width\n  height\n}": types.ImageFragmentDoc,
    "query AllArticles {\n  allArticles {\n    _publishedAt\n    title\n    slug\n  }\n}": types.AllArticlesDocument,
    "query Article($slug: String) {\n  article(filter: {slug: {eq: $slug}}) {\n    __typename\n    id\n    slug\n    title\n    subtitle\n    heroImage {\n      focalPoint {\n        x\n        y\n      }\n      responsiveImage {\n        ...Image\n      }\n    }\n    content {\n      value\n      blocks {\n        ...BlogMedia\n        ...BlogCallout\n      }\n    }\n  }\n}": types.ArticleDocument,
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
export function graphql(source: "fragment BlogMedia on BlogMediaBlockRecord {\n  _modelApiKey\n  id\n  title\n  description\n  alternativeText\n  image {\n    responsiveImage {\n      ...Image\n    }\n  }\n}"): (typeof documents)["fragment BlogMedia on BlogMediaBlockRecord {\n  _modelApiKey\n  id\n  title\n  description\n  alternativeText\n  image {\n    responsiveImage {\n      ...Image\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Image on ResponsiveImage {\n  alt\n  base64\n  bgColor\n  title\n  webpSrcSet\n  src\n  width\n  height\n}"): (typeof documents)["fragment Image on ResponsiveImage {\n  alt\n  base64\n  bgColor\n  title\n  webpSrcSet\n  src\n  width\n  height\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AllArticles {\n  allArticles {\n    _publishedAt\n    title\n    slug\n  }\n}"): (typeof documents)["query AllArticles {\n  allArticles {\n    _publishedAt\n    title\n    slug\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Article($slug: String) {\n  article(filter: {slug: {eq: $slug}}) {\n    __typename\n    id\n    slug\n    title\n    subtitle\n    heroImage {\n      focalPoint {\n        x\n        y\n      }\n      responsiveImage {\n        ...Image\n      }\n    }\n    content {\n      value\n      blocks {\n        ...BlogMedia\n        ...BlogCallout\n      }\n    }\n  }\n}"): (typeof documents)["query Article($slug: String) {\n  article(filter: {slug: {eq: $slug}}) {\n    __typename\n    id\n    slug\n    title\n    subtitle\n    heroImage {\n      focalPoint {\n        x\n        y\n      }\n      responsiveImage {\n        ...Image\n      }\n    }\n    content {\n      value\n      blocks {\n        ...BlogMedia\n        ...BlogCallout\n      }\n    }\n  }\n}"];
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