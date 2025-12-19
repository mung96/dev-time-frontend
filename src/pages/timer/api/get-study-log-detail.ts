import { apiRequester } from "@shared/api/api-requester";
import z from "zod";

export const getStudyLogDetail = async (studyLogId: string) => {
  const response = await apiRequester<StudyLogDetailResponse>(
    `/api/internal/study-logs/${studyLogId}`,
    {
      method: "GET",
    }
  );

  // const result = StudyLogDetailResponse.safeParse(response);
  // console.log("result", result);

  // if (!result.success) {
  //   throw new Error("공부기록 응답 데이터 형식이 올바르지 않습니다.");
  // }
  return response.data;
};
export const StudyLogDetailResponse = z.object({
  id: z.string(),
  date: z.iso.date(),
  todayGoal: z.string(),
  studyTime: z.number(),
  tasks: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      isCompleted: z.boolean(),
    })
  ),
  review: z.string(),
  completionRate: z.number(),
  lastUpdateTime: z.iso.datetime(),
});

export type StudyLogDetailResponse = z.infer<typeof StudyLogDetailResponse>;
