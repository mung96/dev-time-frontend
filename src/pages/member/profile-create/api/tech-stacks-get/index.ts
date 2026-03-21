import { apiRequester } from "@shared/api/api-requester";
import { ApiQueryParams, ApiResponse } from "@shared/api/openapi/helper";

export const techStacksGet = ({
  queryParams,
}: {
  queryParams?: TechStacksGetQueryParams;
}) => {
  return apiRequester<TechStacksGetResponse>(`/api/tech-stacks`, {
    method: "GET",
    queryParams: queryParams,
  });
};

type TechStacksGetQueryParams = ApiQueryParams<"/api/tech-stacks", "get">;
type TechStacksGetResponse = ApiResponse<"/api/tech-stacks", "get">;
