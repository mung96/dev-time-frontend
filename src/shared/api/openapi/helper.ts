import type { paths } from "./generated";

/**
 * API 응답 타입 추출 헬퍼
 * @example
 * ```ts
 * type CheckEmailResponse = ApiResponse<'/api/signup/check-email', 'get'>;
 * type LoginResponse = ApiResponse<'/api/auth/login', 'post'>;
 * type SignupResponse = ApiResponse<'/api/signup', 'post', 201>;
 * ```
 */
export type ApiResponse<
  Path extends keyof paths,
  Method extends keyof paths[Path],
  Status extends number = 200,
> = paths[Path][Method] extends {
  responses: Record<Status, { content: { "application/json": infer T } }>;
}
  ? T
  : never;

/**
 * API 요청 타입 추출 헬퍼
 * @example
 * ```ts
 * type LoginRequest = ApiRequest<'/api/auth/login', 'post'>;
 * type SignupRequest = ApiRequest<'/api/signup', 'post'>;
 * ```
 */
export type ApiRequest<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;

/**
 * API 쿼리 파라미터 타입 추출 헬퍼
 * @example
 * ```ts
 * type CheckEmailParams = ApiQueryParams<'/api/signup/check-email', 'get'>;
 * // { email: string }
 * ```
 */
export type ApiQueryParams<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends { parameters: { query?: infer T } }
  ? T
  : never;

/**
 * API 경로 파라미터 타입 추출 헬퍼
 *
 * @template Path - API 경로
 * @template Method - HTTP 메서드
 *
 * @example
 * ```ts
 * type TimerIdParam = ApiPathParams<'/api/timers/{timerId}', 'get'>;
 * // { timerId: string }
 * ```
 */
export type ApiPathParams<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends { parameters: { path: infer T } } ? T : never;
