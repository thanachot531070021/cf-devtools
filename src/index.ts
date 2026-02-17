import { getImage } from "./route/image";
interface Env {
  MY_BUCKET: R2Bucket;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
	const url = new URL(request.url);
    const method = request.method;

// GET /
    if (url.pathname === "/" && method === "GET") {
      return Response.json({ message: "Hello Worker API 🚀" });
    }

    // GET /api/hello
    if (url.pathname === "/api/hello" && method === "GET") {
      const name = url.searchParams.get("name") || "Guest";
      return Response.json({ greeting: `Hello ${name}` });
    }

    // POST /api/echo
    if (url.pathname === "/api/echo" && method === "POST") {
      const body = await request.json();
      return Response.json({
        you_sent: body,
      });
    }

    // GET /api/time
    if (url.pathname === "/api/time" && method === "GET") {
      return Response.json({
        now: new Date().toISOString(),
      });
    }

	// GET /api/image
    if (url.pathname === "/api/image" && method === "GET") {
      return getImage(request, env);
    }
	

		return new Response("Hello Worker!");
	},
} satisfies ExportedHandler<Env>;
