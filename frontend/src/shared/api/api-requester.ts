export const apiRequester = async <T = unknown>(
  endpoint: string,
  options: RequestInit & { queryParams?: Record<string, string> },
): Promise<T> => {
  const { headers, queryParams, ...restOptions } = options;

  const query = queryParams ? `?${new URLSearchParams(queryParams)}` : "";
  const response = await fetch(endpoint + query, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...restOptions,
  });

  if (!response.ok) {
    //TODO: 서비스 에러말고, 기타 에러 처리해야함
    const errorBody = await response.json();

    console.log("errorBody", errorBody);

    throw new ApiError(errorBody);
  }

  return response.json() as T;
};

interface ErrorData {
  success: false;
  error: {
    message: string;
    statusCode: number;
  };
}

//TODO: 로그인 구현 이후, 다른 API Response보고 수정 필요
export class ApiError extends Error {
  status: number;

  constructor(errorData: ErrorData) {
    super(errorData.error.message);
    this.name = "ApiError";
    this.status = errorData.error.statusCode;
  }
}
