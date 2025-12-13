import { cookies } from "next/headers";

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";
const ACCESS_TOKEN_MAX_AGE = 60 * 60; //1시간
const REFRESH_TOKEN_MAX_AGE = 10 * 24 * 60 * 60; //10일

//ReadonlyRequestCookies import하면 dist 파일에서 불러옴 => so, ReturnType으로 대체
type CookieStore = Awaited<ReturnType<typeof cookies>>;

export const setAccessTokenCookie = (
  cookieStore: CookieStore,
  accessToken: string
) => {
  cookieStore.set(ACCESS_TOKEN_STORAGE_KEY, accessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
};

export const setRefreshTokenCookie = (
  cookieStore: CookieStore,
  refreshToken: string
) => {
  cookieStore.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
};

export const getAccessTokenFromCookie = (cookieStore: CookieStore) =>
  cookieStore.get(ACCESS_TOKEN_STORAGE_KEY)?.value;

export const getRefreshTokenFromCookie = (cookieStore: CookieStore) =>
  cookieStore.get(REFRESH_TOKEN_STORAGE_KEY)?.value;
