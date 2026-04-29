import { ApiRequest } from "@shared/api/openapi/helper";

type CareerType = ApiRequest<"/api/profile", "post">["career"];

export const Career = {
  NONE: "경력 없음",
  JUNIOR: "0 - 3년",
  MIDDLE: "4 - 7년",
  SENIOR: "8 - 10년",
  EXPERT: "11년 이상",
} as const satisfies Record<string, CareerType>;

export type Career = keyof typeof Career;
