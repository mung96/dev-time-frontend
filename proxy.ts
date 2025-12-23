import { cookieManager } from "@shared/api/cookie";
import { PATH } from "@shared/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [PATH.HOME, PATH.LOGIN, PATH.SIGNUP];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookieManager.getAccessToken();

  //TODO: 토큰이 실제 유효한지 검증이 필요할 것 같음

  if (!accessToken && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(PATH.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2)).*)",
  ],
};
