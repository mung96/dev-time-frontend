import { getStudyLogDetail } from "@pages/timer/api/get-study-log-detail";
import { queryOptions } from "@tanstack/react-query";

export const studyLogQueries = {
  all: () => ["study-logs"],

  details: (studyLogId: string) => [
    ...studyLogQueries.all(),
    "detail",
    studyLogId,
  ],
  detail: (studyLogId: string) =>
    queryOptions({
      queryKey: [...studyLogQueries.details(studyLogId)],
      queryFn: () => getStudyLogDetail(studyLogId),
    }),
};
