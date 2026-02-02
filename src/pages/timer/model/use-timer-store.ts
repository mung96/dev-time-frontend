import { Timer } from "@entities/timers";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TimerState = {
  timerId: string | null;
  setTimerId: (timerId: string) => void;
  isRunning: boolean;

  splitTimes: Timer["splitTimes"];
  setSplitTimes: (splitTimes: Timer["splitTimes"]) => void;
  setIsRunning: (isRunning: boolean) => void;
};
export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      timerId: null,
      splitTimes: [],
      isRunning: false,

      setTimerId: (timerId) => {
        set({ timerId });
      },

      setSplitTimes: (splitTimes) => {
        set({ splitTimes });
      },

      setIsRunning: (isRunning) => {
        set({ isRunning });
      },
    }),
    {
      name: "timer",
    }
  )
);
