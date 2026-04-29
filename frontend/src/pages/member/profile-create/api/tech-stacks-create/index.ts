import { apiRequester } from "@shared/api/api-requester";
import { ApiRequest } from "@shared/api/openapi/helper";

export const techStacksCreate = ({
  request,
}: {
  request?: TechStacksCreateRequest;
}) => {
  return apiRequester(`/api/tech-stacks`, {
    method: "POST",
    body: JSON.stringify(request),
  });
};

type TechStacksCreateRequest = ApiRequest<"/api/tech-stacks", "post">;
