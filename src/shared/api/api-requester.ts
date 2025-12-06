const API_SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const apiRequester = async (
  endpoint: string,
  options: Record<string, string> //TODO: options type 다시
) => {
  const apiUrl = API_SERVER_URL + endpoint;
  return fetch(apiUrl, { ...options });
};
