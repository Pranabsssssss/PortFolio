import { NextResponse } from "next/server";

// Helper to check if we're in dev mode
const isDevelopment = process.env.NODE_ENV === "development";

export async function POST(request: Request) {
  if (!isDevelopment) {
    return NextResponse.json({ error: "Admin portal is only available in local development" }, { status: 403 });
  }

  try {
    const { username, password } = await request.json();

    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      return NextResponse.json({ error: "Admin credentials not configured in .env.local" }, { status: 500 });
    }

    if (username === validUsername && password === validPassword) {
      return NextResponse.json({ success: true, token: "local-dev-admin-token" });
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
