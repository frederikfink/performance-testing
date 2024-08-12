export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { slug: string };
    console.log(body);
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
