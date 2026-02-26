import { apiRequester } from "@shared/api/api-requester";
import { ApiRequest, ApiResponse } from "@shared/api/openapi/helper";

export const presignedUrlCreate = async (
  request: PresignedUrlCreateRequest,
) => {
  const response = await apiRequester<PresignedUrlCreateResponse>(
    `/api/file/presigned-url`,
    {
      method: "POST",
      body: JSON.stringify(request),
    },
  );
  return response;
};

type PresignedUrlCreateRequest = ApiRequest<"/api/file/presigned-url", "post">;
type PresignedUrlCreateResponse = ApiResponse<
  "/api/file/presigned-url",
  "post"
>;
