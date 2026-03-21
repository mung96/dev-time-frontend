import { techStacksCreate } from "@pages/member/profile-create/api/tech-stacks-create";
import { useMutation } from "@tanstack/react-query";

export const useTechStackCreate = () => {
  return useMutation({
    mutationFn: techStacksCreate,
  });
};
