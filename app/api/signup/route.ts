import { NextRequest, NextResponse } from "next/server";
import { API_SERVER_URL } from "@shared/api";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const response = await fetch(`${API_SERVER_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    return NextResponse.json(errorBody, { status: response.status });
  }

  return NextResponse.json(await response.json());
}
