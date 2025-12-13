import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { API_SERVER_URL, HttpStatus } from "@shared/api";
import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  setAccessTokenCookie,
} from "@shared/api/cookie";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const endPoint = "api/" + path.join("/"); //백엔드 서버로 가는 end point

  const cookieStore = await cookies();
  const body = await req.text();
  const accessToken = getAccessTokenFromCookie(cookieStore) || "";

  let response = await postWithBearer({
    accessToken,
    body,
    endPoint,
  });

  // 인증 실패시 refreshToken -> accessToken
  if (response.status === HttpStatus.UNAUTHORIZED) {
    const refreshToken = getRefreshTokenFromCookie(cookieStore) || "";
    const newAccessToken = await refreshAccessToken(refreshToken);
    setAccessTokenCookie(cookieStore, newAccessToken);

    response = await postWithBearer({
      accessToken: newAccessToken,
      body,
      endPoint,
    });
  }

  const data = await response.json();
  return NextResponse.json(data);
}

const postWithBearer = ({
  endPoint,
  body,
  accessToken,
}: {
  endPoint: string;
  body: string;
  accessToken: string;
}) => {
  return fetch(`${API_SERVER_URL}/${endPoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: body || undefined,
  });
};

const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch(`${API_SERVER_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    return NextResponse.json({ ...error }, { status: response.status });
  }

  const { accessToken } = await response.json();
  return accessToken;
};
