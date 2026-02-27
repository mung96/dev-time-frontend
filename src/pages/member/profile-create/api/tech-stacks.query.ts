import { techStacksGet } from "./tech-stacks-get";
import { queryOptions } from "@tanstack/react-query";

export const techStacksQueries = {
  all: () => ["techStacks"],

  lists: () => [...techStacksQueries.all(), "list"],
  list: ({ keyword }: { keyword: string }) =>
    queryOptions({
      queryKey: [...techStacksQueries.lists(), keyword],
      queryFn: () => techStacksGet({ queryParams: { keyword } }),
    }),
};
