const API_SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const apiRequester = async <T = unknown>(
  endpoint: string,
  options: RequestInit
): Promise<T> => {
  const apiUrl = API_SERVER_URL + endpoint;

  const { headers, ...restOptions } = options;

  const response = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...restOptions,
  });

  if (!response.ok) {
    //TODO: 서비스 에러말고, 기타 에러 처리해야함
    const errorData = await response.json();
    console.log("errorData", errorData);

    throw new ApiError(errorData);
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
  message: string;

  constructor(errorData: ErrorData) {
    super(`API Error`);
    this.status = errorData.error.statusCode;
    this.message = errorData.error.message;
  }
}
