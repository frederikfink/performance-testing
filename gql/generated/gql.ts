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
    "query AllPages {\n  allPages {\n    _publishedAt\n    title\n    slug\n  }\n}": types.AllPagesDocument,
    "query Navbar {\n  navbar {\n    title\n    links {\n      label\n      url\n    }\n  }\n}": types.NavbarDocument,
    "query Metadata($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    seo: _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n  site: _site {\n    favicon: faviconMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n}": types.MetadataDocument,
    "query Page($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    id\n    __typename\n    title\n    content {\n      links\n      value\n      blocks {\n        __typename\n        ... on BlogImageRecord {\n          __typename\n          id\n          title\n          description\n          image {\n            responsiveImage {\n              alt\n              base64\n              bgColor\n              title\n              webpSrcSet\n              src\n              width\n              height\n            }\n          }\n        }\n        ... on BlogCalloutRecord {\n          __typename\n          id\n          callout\n        }\n      }\n    }\n  }\n}": types.PageDocument,
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
export function graphql(source: "query AllPages {\n  allPages {\n    _publishedAt\n    title\n    slug\n  }\n}"): (typeof documents)["query AllPages {\n  allPages {\n    _publishedAt\n    title\n    slug\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Navbar {\n  navbar {\n    title\n    links {\n      label\n      url\n    }\n  }\n}"): (typeof documents)["query Navbar {\n  navbar {\n    title\n    links {\n      label\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Metadata($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    seo: _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n  site: _site {\n    favicon: faviconMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n}"): (typeof documents)["query Metadata($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    seo: _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n  site: _site {\n    favicon: faviconMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Page($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    id\n    __typename\n    title\n    content {\n      links\n      value\n      blocks {\n        __typename\n        ... on BlogImageRecord {\n          __typename\n          id\n          title\n          description\n          image {\n            responsiveImage {\n              alt\n              base64\n              bgColor\n              title\n              webpSrcSet\n              src\n              width\n              height\n            }\n          }\n        }\n        ... on BlogCalloutRecord {\n          __typename\n          id\n          callout\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query Page($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    id\n    __typename\n    title\n    content {\n      links\n      value\n      blocks {\n        __typename\n        ... on BlogImageRecord {\n          __typename\n          id\n          title\n          description\n          image {\n            responsiveImage {\n              alt\n              base64\n              bgColor\n              title\n              webpSrcSet\n              src\n              width\n              height\n            }\n          }\n        }\n        ... on BlogCalloutRecord {\n          __typename\n          id\n          callout\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;