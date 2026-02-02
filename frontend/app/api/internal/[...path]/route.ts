import { API_SERVER_URL, HttpStatus } from "@shared/api";
import { cookieManager } from "@shared/api/cookie";

import { NextRequest, NextResponse } from "next/server";

const handler = async (request: NextRequest) => {
  return handleRequest(request);
};

// 모든 HTTP 메서드 처리
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const DELETE = handleRequest;
export const PATCH = handleRequest;

async function handleRequest(request: NextRequest): Promise<NextResponse> {
  try {
    const pathname = request.nextUrl.pathname;
    const apiPath = pathname.replace("/internal", "");

    const accessToken = await cookieManager.getAccessToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    let body: string | undefined;
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      const data = await request.json();
      body = JSON.stringify(data);
    }

    let response = await fetch(`${API_SERVER_URL}${apiPath}`, {
      method: request.method,
      headers,
      body,
    });

    if (response.status === HttpStatus.UNAUTHORIZED) {
      const newAccessToken = await refreshAccessToken();

      if (!newAccessToken) {
        return NextResponse.json(
          { error: "REFRESH_FAILED", message: "세션이 만료되었습니다." },
          { status: HttpStatus.UNAUTHORIZED }
        );
      }

      // 재시도
      headers["Authorization"] = `Bearer ${newAccessToken}`;
      response = await fetch(`${API_SERVER_URL}${apiPath}`, {
        method: request.method,
        headers,
        body,
      });
    }

    // 9. 응답 반환
    if (!response.ok) {
      const errorData = await response.text();
      return new NextResponse(errorData, {
        status: response.status,
      });
    }

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("API Proxy Error:", error);
    return NextResponse.json(
      { error: "INTERNAL_ERROR", message: "서버 오류가 발생했습니다." },
      { status: 500 }
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
