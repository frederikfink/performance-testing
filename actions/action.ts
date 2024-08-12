"use server";

import { revalidateTag } from "next/cache";

export const action = async (number: Number) => {
  const res = await fetch(`http://localhost:3000/api/test?number=${number}`, {
    next: {
      tags: ["api"],
    },
  });

  const data = await res.json();

  return data;
};

export const revalidate = async (tag: string) => {
  revalidateTag("api");

  console.log("revalidated ", tag);

  return;
};
