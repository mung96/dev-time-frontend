import z from "zod";

export const Timer = z.object({
  timerId: z.string(),
  splitTimes: z.array(
    z.object({
      date: z.iso.datetime(),
      timeSpent: z.number(),
    })
  ),
  startTime: z.iso.datetime(),
  lastUpdateTime: z.iso.datetime(),
});

export type Timer = z.infer<typeof Timer>;
