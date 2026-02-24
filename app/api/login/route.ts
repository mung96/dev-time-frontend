import { NextRequest, NextResponse } from "next/server";
import { API_SERVER_URL } from "@shared/api";
import { cookieManager } from "@shared/api/cookie";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const response = await fetch(`${API_SERVER_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json();
    return NextResponse.json(body, { status: response.status });
  }

  const { accessToken, refreshToken, ...loginInfo } = await response.json();

  // 토큰을 쿠키에 세팅
  await cookieManager.setAccessToken(accessToken);
  await cookieManager.setRefreshToken(refreshToken);

  return NextResponse.json({ ...loginInfo });
}
