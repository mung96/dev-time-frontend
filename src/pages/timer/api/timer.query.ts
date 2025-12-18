import { getTimer } from "@pages/timer/api/get-timer";
import { queryOptions } from "@tanstack/react-query";

export const timerQueries = {
  all: () => ["timers"],

  details: () => [...timerQueries.all(), "detail"],
  detail: () =>
    queryOptions({
      queryKey: [...timerQueries.details()],
      queryFn: () => getTimer(),
      staleTime: 5000,
    }),
};
