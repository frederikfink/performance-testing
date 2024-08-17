import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  try {
    const { tags } = (await req.json()) as { tags: string[] };

    tags.forEach((tag) => revalidateTag(tag));

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
