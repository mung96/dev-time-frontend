import { Timer } from "@entities/timers";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TimerState = {
  timerId: string | null;
  setTimerId: (timerId: string) => void;

  splitTimes: Timer["splitTimes"];
  setSplitTimes: (splitTimes: Timer["splitTimes"]) => void;
};
export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      timerId: null,
      splitTimes: [],

      setTimerId: (timerId) => {
        set({ timerId });
      },

      setSplitTimes: (splitTimes) => {
        set({ splitTimes });
      },
    }),
    {
      name: "timer",
    }
  )
);
