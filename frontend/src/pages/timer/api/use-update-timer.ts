import { timerQueries } from "./timer.query";
import { updateTimer as updateTimerApi } from "./update-timer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTimer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTimerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timerQueries.details() });
    },
  });
};
