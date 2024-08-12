"use server";

import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";

interface RequestOptions {
  tags: string[];
  includeDrafts?: boolean;
}

export const request = async <TResult = unknown, TVariables = unknown>(
  query: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  options?: RequestOptions
): Promise<TResult> => {
  const payload = JSON.stringify({ query: print(query), variables });

  const response = await fetch("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_READ_ONLY_TOKEN}`,
      "Content-Type": "application/json",
      // Always exclude invalid content for type safety
      "X-Exclude-Invalid": "true",
      // Include draft content in development mode
      ...(process.env.NEXT_PUBLIC_DATOCMS_MODE === "development" && {
        "X-Include-Drafts": "true",
      }),
      // Include environment in headers if set
      // for multi-environment projects
      ...(process.env.NEXT_PUBLIC_DATOCMS_ENV && {
        "X-Environment": process.env.NEXT_PUBLIC_DATOCMS_ENV,
      }),
    },
    method: "POST",
    body: payload,
    // Disable cache in development mode
    ...(process.env.NEXT_PUBLIC_DATOCMS_MODE === "development" && {
      cache: "no-store",
    }),
    next: {
      ...(options?.tags && { tags: options?.tags }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed request ${payload}`);
  }

  const result = (await response.json()) as { data: TResult };

  return result.data;
};
