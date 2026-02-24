"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PATH } from "@shared/routes";
import { Button } from "@shared/ui";

import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { SideBanner } from "@widgets/side-banner";
import { ProfileCreateFormValues } from "../../model/profile-create-form-values";

export const ProfileCreatePage = () => {
  const methods = useForm<ProfileCreateFormValues>({
    defaultValues: {},
    resolver: zodResolver(ProfileCreateFormValues),
    mode: "onTouched",
  });
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  // const { mutate: signup, isPending } = useSignup();

  return (
    <div className="flex h-full">
      <SideBanner />
      <div className="flex-1 flex justify-center w-full">
        <div className="flex flex-col items-center gap-6">
          <FormProvider {...methods}>
            <form
              className="mt-[140px] w-105 flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit((data) => {
                  // signup(data);
                  router.replace(PATH.LOGIN);
                })();
              }}
            >
              <h2 className="text-heading text-primary text-center">
                프로필 설정
              </h2>
              <fieldset className="flex flex-col gap-10"></fieldset>
              <Button
                priority={"primary"}
                type="submit"
                // disabled={!isValid || isPending}
                disabled={!isValid}
              >
                저장하기
              </Button>
            </form>
          </FormProvider>
          <p>
            <span className="text-primary text-body font-medium">
              다음에 하시겠어요?
            </span>
            <Link
              href={PATH.TIMER}
              className="text-primary text-body font-bold "
            >
              건너뛰기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
