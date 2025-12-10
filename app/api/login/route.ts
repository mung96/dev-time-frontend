import { NextRequest, NextResponse } from "next/server";
import { API_SERVER_URL } from "@shared/api";

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";
const ACCESS_TOKEN_MAX_AGE = 60 * 60; //1시간
const REFRESH_TOKEN_MAX_AGE = 10 * 24 * 60 * 60; //10일

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const response = await fetch(`${API_SERVER_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const { error } = await response.json();
    return NextResponse.json({ ...error });
  }

  const { accessToken, refreshToken, ...loginInfo } = await response.json();
  const res = NextResponse.json({ loginInfo });

  res.cookies.set(ACCESS_TOKEN_STORAGE_KEY, accessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  res.cookies.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
  return res;
}
