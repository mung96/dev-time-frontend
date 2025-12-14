import { NextRequest, NextResponse } from "next/server";
import { API_SERVER_URL } from "@shared/api";

export async function GET(req: NextRequest) {
  const queryString = req.nextUrl.search;

  const response = await fetch(
    `${API_SERVER_URL}/api/signup/check-email${queryString}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    return NextResponse.json({ ...error }, { status: response.status });
  }

  return NextResponse.json(await response.json());
}
