import { deleteTimer } from "@pages/timer/api/delete-timer";
import { timerQueries } from "./timer.query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTimer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTimer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timerQueries.details() });
    },
  });
};
