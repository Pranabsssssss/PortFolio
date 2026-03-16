import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const isDevelopment = process.env.NODE_ENV === "development";

export async function POST(request: Request) {
  if (!isDevelopment) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: "Invalid urls array" }, { status: 400 });
    }

    const results: { url: string; deleted: boolean; error?: string }[] = [];

    for (const url of urls) {
      try {
        // Only delete files from our uploads directory
        if (typeof url === "string" && url.startsWith("/uploads/")) {
          const filePath = path.join(process.cwd(), "public", url);
          await fs.unlink(filePath);
          results.push({ url, deleted: true });
        } else {
          results.push({ url, deleted: false, error: "Not an uploaded file" });
        }
      } catch (e) {
        results.push({ url, deleted: false, error: "File not found or already deleted" });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
