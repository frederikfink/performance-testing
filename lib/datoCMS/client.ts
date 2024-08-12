"use server";

import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";

interface RequestOptions {
  tags: string[];
  includeDrafts?: boolean;
}

export const request = async <
  TResult = unknown,
  TVariables = unknown,
  TDocument = unknown
>(
  query: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  options?: RequestOptions
): Promise<TDocument> => {
  const payload = JSON.stringify({ query: print(query), variables });
  const response = await fetch("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_READ_ONLY_TOKEN}`,
      "X-Exclude-Invalid": "true",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: payload,
    next: {
      ...(options?.tags && { tags: options?.tags }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed request ${payload}`);
  }

  const result = (await response.json()) as { data: TDocument };

  return result.data;
};
