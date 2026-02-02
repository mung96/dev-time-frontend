import { stopTimer } from "@pages/timer/api/stop-timer";
import { timerQueries } from "./timer.query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useStopTimer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: stopTimer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timerQueries.details() });
    },
  });
};
