

export async function getImage(
  request: Request,
  env: Env
): Promise<Response> {
  const fileName = "screenshot.968.jpg";

  const object = await env.MY_BUCKET.get(fileName);

  if (!object) {
    return new Response("Image not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Content-Type", "image/jpeg");

  return new Response(object.body, {
    headers,
  });
}
