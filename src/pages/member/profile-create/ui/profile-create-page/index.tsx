"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PATH } from "@shared/routes";
import { Button, TextField } from "@shared/ui";

import Link from "next/link";
import { FormProvider, useController, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { SideBanner } from "@widgets/side-banner";
import {
  createNewProfileCreateFormValues,
  ProfileCreateFormValues,
} from "../../model/profile-create-form-values";
import { Dropdown } from "@shared/ui/dropdown";
import { Career } from "@pages/member/profile-create/model/career.enum";
import { Purpose } from "@pages/member/profile-create/model/purpose.enum";

export const ProfileCreatePage = () => {
  const methods = useForm<ProfileCreateFormValues>({
    defaultValues: createNewProfileCreateFormValues(),
    resolver: zodResolver(ProfileCreateFormValues),
    mode: "onTouched",
  });
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = methods;

  // const { mutate: signup, isPending } = useSignup();
  const { field: career } = useController({ control, name: "career" });
  const { field: purpose } = useController({ control, name: "purpose" });

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
              <fieldset className="flex flex-col gap-10">
                <Dropdown value={career.value} setValue={career.onChange}>
                  <div className="flex flex-col gap-2">
                    <Dropdown.Label>개발 경력</Dropdown.Label>
                    <Dropdown.Trigger placeholder="개발 경력을 선택해 주세요." />
                    <Dropdown.Options>
                      {Object.entries(Career).map(([_, v]) => (
                        <Dropdown.Option key={v} value={v} label={v} id={v} />
                      ))}
                    </Dropdown.Options>
                  </div>
                </Dropdown>
                <div className="flex flex-col gap-2">
                  <Dropdown
                    value={purpose.value && purpose.value.type}
                    setValue={(v) => {
                      console.log(v);
                      purpose.onChange({
                        type: v,
                        detail:
                          purpose.value &&
                          purpose.value.type === Purpose.OTHER &&
                          purpose.value.detail,
                      });
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <Dropdown.Label>공부 목적</Dropdown.Label>
                      <Dropdown.Trigger placeholder="공부의 목적을 선택해 주세요." />
                      <Dropdown.Options>
                        {Object.entries(Purpose).map(([_, v]) => (
                          <Dropdown.Option key={v} value={v} label={v} id={v} />
                        ))}
                      </Dropdown.Options>
                    </div>
                  </Dropdown>
                  {purpose.value && purpose.value.type === Purpose.OTHER && (
                    <TextField id={"purpose-detail"}>
                      <TextField.Input
                        placeholder="내용을 입력해주세요"
                        value={purpose.value.detail}
                      />
                    </TextField>
                  )}
                </div>
              </fieldset>
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
