import { studyLogQueries } from "@pages/timer/api/study-log.query";
import { useQuery } from "@tanstack/react-query";

export const useStudyLog = ({ studyLogId }: { studyLogId: string }) => {
  const { data: studyLogDetailData } = useQuery(
    studyLogQueries.detail(studyLogId || "")
  );

  return { studyLogDetail: studyLogDetailData };
};
