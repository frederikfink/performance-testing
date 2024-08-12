"use server";

import { NextRequest } from "next/server";

export const GET = (request: NextRequest) => {
  console.log("reached endpoint");
  const number = request.nextUrl.searchParams.get("number");

  if (!number) {
    return new Response("Missing number query parameter", { status: 400 });
  }

  return new Response(JSON.stringify({ number: number }));
};
