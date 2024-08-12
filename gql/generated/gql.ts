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
    "query AllPages {\n  allPages {\n    title\n    slug\n  }\n}": types.AllPagesDocument,
    "query Navbar {\n  navbar {\n    title\n    links {\n      label\n      url\n    }\n  }\n}": types.NavbarDocument,
    "query Page($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    __typename\n    title\n    content {\n      blocks\n      links\n      value\n    }\n  }\n}": types.PageDocument,
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
export function graphql(source: "query AllPages {\n  allPages {\n    title\n    slug\n  }\n}"): (typeof documents)["query AllPages {\n  allPages {\n    title\n    slug\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Navbar {\n  navbar {\n    title\n    links {\n      label\n      url\n    }\n  }\n}"): (typeof documents)["query Navbar {\n  navbar {\n    title\n    links {\n      label\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Page($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    __typename\n    title\n    content {\n      blocks\n      links\n      value\n    }\n  }\n}"): (typeof documents)["query Page($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    __typename\n    title\n    content {\n      blocks\n      links\n      value\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;