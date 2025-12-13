import { setRefreshTokenCookie } from "./../../../src/shared/api/cookie";
import { NextRequest, NextResponse } from "next/server";
import { API_SERVER_URL } from "@shared/api";
import { setAccessTokenCookie } from "@shared/api/cookie";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const response = await fetch(`${API_SERVER_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const { error } = await response.json();
    return NextResponse.json({ ...error }, { status: response.status });
  }

  const { accessToken, refreshToken, ...loginInfo } = await response.json();
  const res = NextResponse.json({ ...loginInfo });

  const cookieStore = await cookies();
  setAccessTokenCookie(cookieStore, accessToken);
  setRefreshTokenCookie(cookieStore, refreshToken);

  return res;
}
