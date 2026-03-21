import { ApiRequest } from "@shared/api/openapi/helper";

type PurposeType = Extract<
  ApiRequest<"/api/profile", "post">["purpose"],
  | "취업 준비"
  | "이직 준비"
  | "단순 개발 역량 향상"
  | "회사 내 프로젝트 원활하게 수행"
>;

export const Purpose = {
  JOB_SEEKING: "취업 준비",
  CAREER_CHANGE: "이직 준비",
  SKILL_UP: "단순 개발 역량 향상",
  WORK_PROJECT: "회사 내 프로젝트 원활하게 수행",
  OTHER: "기타",
} as const satisfies Record<string, PurposeType | "기타">;

export type Purpose = keyof typeof Purpose;
