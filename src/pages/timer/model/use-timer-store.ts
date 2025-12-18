import { create } from "zustand";
import { persist } from "zustand/middleware";

type TimerState = {
  timerId: string | null;
  setTimerId: (timerId: string) => void;
};

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      timerId: null,

      setTimerId: (timerId) => {
        set({ timerId });
      },
    }),
    {
      name: "timer",
    }
  )
);
