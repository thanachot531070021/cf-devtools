/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

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

		return new Response("Hello Worker!");
	},
} satisfies ExportedHandler<Env>;
