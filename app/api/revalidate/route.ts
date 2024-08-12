export async function POST(req: Request) {
  try {
    const body = (await req.json()) as any;
    console.log(body?.related_entities);

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
