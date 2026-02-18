export async function getImage(
  request: Request,
  env: Env
): Promise<Response> {

  const url = new URL(request.url);
  const fileName = url.searchParams.get("name");

  if (!fileName) {
    return new Response("Missing file name", { status: 400 });
  }
  const object = await env.MY_BUCKET.get(fileName);

  if (!object) {
    return new Response("Image not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Content-Type", "image/jpeg");

  return new Response(object.body, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType || "application/octet-stream",
    },
  });
}

export async function uploadImage(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return new Response("Use multipart/form-data", { status: 400 });
    }

    const formData = await request.formData();

    const results: {
      fileName: string;
      status: "success" | "failed";
      reason?: string;
    }[] = [];

    // ดึงทุกไฟล์ที่ส่งมา (รองรับ key ชื่อเดียวกันหลายไฟล์)
    const files = formData.getAll("file") as File[];

    if (!files.length) {
      return new Response("No files uploaded", { status: 400 });
    }

    for (const file of files) {
      const fileName = file.name;

      try {
        // ✅ เช็คไฟล์ซ้ำ
        const existing = await env.MY_BUCKET.head(fileName);

        if (existing) {
          results.push({
            fileName,
            status: "failed",
            reason: "File already exists",
          });
          continue; // ไปไฟล์ถัดไป
        }

        // ✅ อัปโหลด
        await env.MY_BUCKET.put(fileName, await file.arrayBuffer(), {
          httpMetadata: {
            contentType: file.type,
          },
        });

        results.push({
          fileName,
          status: "success",
        });
      } catch (err) {
        results.push({
          fileName,
          status: "failed",
          reason: "Unexpected error during upload",
        });
      }
    }

    return Response.json({
      summary: {
        total: files.length,
        success: results.filter(r => r.status === "success").length,
        failed: results.filter(r => r.status === "failed").length,
      },
      results,
    });
  } catch (err) {
    return new Response("Upload failed", { status: 500 });
  }
}
