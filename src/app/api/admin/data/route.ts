import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Helper to check if we're in dev mode
const isDevelopment = process.env.NODE_ENV === "development";

// Helper to get consistent file path
const getFilePath = (filename: string) => path.join(process.cwd(), "src", "data", filename);

export async function GET(request: Request) {
  if (!isDevelopment) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // "projects" or "achievements"

  if (type !== "projects" && type !== "achievements") {
    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  }

  try {
    const filePath = getFilePath(`${type}.json`);
    const fileContents = await fs.readFile(filePath, "utf8");
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read data file", details: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isDevelopment) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type !== "projects" && type !== "achievements") {
      return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
    }

    const data = await request.json();
    const filePath = getFilePath(`${type}.json`);
    
    // Write the new formatted array to the json file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    
    return NextResponse.json({ success: true, message: `Successfully updated ${type}` });
  } catch (error) {
    return NextResponse.json({ error: "Failed to write data file", details: error }, { status: 500 });
  }
}
