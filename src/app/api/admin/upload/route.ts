import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const isDevelopment = process.env.NODE_ENV === "development";

export async function POST(request: Request) {
  if (!isDevelopment) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string; // "projects" or "achievements"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!category || (category !== "projects" && category !== "achievements")) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Generate unique filename
    const ext = path.extname(file.name) || ".jpg";
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    
    // Ensure the upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", category);
    await fs.mkdir(uploadDir, { recursive: true });

    // Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, uniqueName);
    await fs.writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/${category}/${uniqueName}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
