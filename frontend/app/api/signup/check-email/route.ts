import { NextRequest, NextResponse } from "next/server";
import { API_SERVER_URL } from "@shared/api";

export async function GET(req: NextRequest) {
  const queryString = req.nextUrl.search;

  console.log("실행");
  const response = await fetch(
    `${API_SERVER_URL}/api/signup/check-email${queryString}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  console.log("response", response);

  if (!response.ok) {
    const errorBody = await response.json();
    return NextResponse.json(errorBody, { status: response.status });
  }

  return NextResponse.json(await response.json());
}
