import { API_SERVER_URL, BFF_PREFIX, HttpStatus } from "@shared/api";
import { cookieManager } from "@shared/api/cookie";

import { NextRequest, NextResponse } from "next/server";

// 모든 HTTP 메서드 처리
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const DELETE = handleRequest;
export const PATCH = handleRequest;

async function handleRequest(request: NextRequest): Promise<NextResponse> {
  try {
    const endPoint = request.nextUrl.pathname;
    const apiPath = endPoint.replace(BFF_PREFIX, "");
    const newUrl = new URL(`${API_SERVER_URL}${apiPath}`);
    newUrl.search = request.nextUrl.search;

    const body = request.body ? await request.arrayBuffer() : null; //multipart때 안깨지도록

    const accessToken = await cookieManager.getAccessToken();

    let response = await fetch(
      newUrl,
      createFetchOptions({
        request,
        body,
        token: accessToken || "",
      }),
    );

    /**refreshToken으로 accessToken을 재발급 받은 뒤, API 재요청 */
    if (response.status === HttpStatus.UNAUTHORIZED) {
      const newAccessToken = await refreshAccessToken();

      if (!newAccessToken) {
        const body = response.json();
        return NextResponse.json(body, { status: response.status });
      }

      response = await fetch(
        `${API_SERVER_URL}${apiPath}`,
        createFetchOptions({
          request,
          body,
          token: newAccessToken,
        }),
      );

      await cookieManager.setAccessToken(newAccessToken);
    }

    if (!response.ok) {
      const body = await response.json();
      return NextResponse.json(body, { status: response.status });
    }

    const responseBody = await response.json();
    return new NextResponse(responseBody, {
      status: response.status,
    });
  } catch (error) {
    console.error("BFF_SERVER_ERROR:", error);
    return NextResponse.json(
      { error: "BFF_SERVER_ERROR", message: "BFF 서버에 오류가 발생했습니다." },
      { status: HttpStatus.INTERNAL_SERVER_ERROR },
    );
  }
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await cookieManager.getRefreshToken();

  if (!refreshToken) {
    await cookieManager.clearTokens();
    return null;
  }

  try {
    const refreshResponse = await fetch(`${API_SERVER_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResponse.ok) {
      const refreshData = await refreshResponse.json();
      const newAccessToken = refreshData.accessToken;

      await cookieManager.setAccessToken(newAccessToken);
      return newAccessToken;
    } else {
      await cookieManager.clearTokens();
      return null;
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    await cookieManager.clearTokens();
    return null;
  }
}

const createFetchOptions = ({
  request,
  token,
  body,
}: {
  request: NextRequest;
  token: string;
  body: ArrayBuffer | null;
}): RequestInit => {
  return {
    method: request.method,
    headers: {
      "Content-Type": request.headers.get("content-type") ?? "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  };
};
