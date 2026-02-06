"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError, HttpStatus } from "@shared/api";
import {
  SignUpFormValues,
  SignUpFormValuesSchema,
} from "@pages/auth/model/signup-form-values.schema";
import { PATH } from "@shared/routes";
import { Button } from "@shared/ui";
import { Checkbox } from "@shared/ui/checkbox";
import { TextField as InputField } from "@shared/ui/input-field";
import { HelperText } from "@shared/ui/text-field/helper-text";
import { TextFieldButton } from "@shared/ui/input-field/text-field-button";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { checkNickname } from "@pages/auth/api/check-nickname";
import { useState } from "react";
import { signup } from "@pages/auth/api/signup";
import { useRouter } from "next/navigation";
import { TermsService } from "@pages/auth/ui/terms-service";

import clsx from "clsx";
import { EmailField } from "@pages/auth/ui/email-field";

export const SignupPage = () => {
  const methods = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignUpFormValuesSchema),
    mode: "onTouched",
  });
  const router = useRouter();
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isValid, isSubmitting },
  } = methods;
  const [isValidDuplicateEmail, setIsValidDuplicateEmail] = useState(false);
  const [isValidDuplicateNickname, setIsValidDuplicateNickname] =
    useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const isFormValid =
    isChecked && isValidDuplicateEmail && isValidDuplicateNickname && isValid;

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-primary flex items-center justify-center">
        <div className="flex flex-col gap-9 items-center justify-center">
          <picture>
            <Image
              width={264}
              height={200}
              src="/images/Logo.png"
              alt="DevTime 로고"
            />
          </picture>
          <span className="text-white text-title font-semibold">
            개발자를 위한 타이머
          </span>
        </div>
      </div>
      <div className="flex-1 flex justify-center w-full">
        <div className="flex flex-col items-center gap-6">
          <FormProvider {...methods}>
            <form
              className="mt-[140px] w-105 flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(async (data) => {
                  await signup(data);
                  router.replace(PATH.LOGIN);
                })();
              }}
            >
              <h2 className="text-heading text-primary text-center">
                회원가입
              </h2>
              <fieldset className="flex flex-col gap-10">
                <EmailField
                  isValidDuplicateEmail={isValidDuplicateEmail}
                  setIsValidDuplicateEmail={setIsValidDuplicateEmail}
                />

                <InputField
                  label={"닉네임"}
                  placeholder="닉네임을 입력해 주세요."
                  {...register("nickname", {
                    onChange: () => setIsValidDuplicateNickname(false),
                  })}
                  button={
                    <TextFieldButton
                      type="button"
                      disabled={
                        !touchedFields.nickname ||
                        errors.nickname?.type === "invalid_format"
                      }
                      onClick={() => {
                        const nickname = getValues("nickname");
                        checkNickname(nickname)
                          .then((response) => {
                            if (response.available) {
                              setIsValidDuplicateNickname(true);
                            } else {
                              setError("nickname", {
                                type: "duplicate",
                                message: response.message,
                              });
                            }
                          })
                          .catch((error) => {
                            if (error instanceof ApiError) {
                              if (error.status === HttpStatus.BAD_REQUEST) {
                                setError("nickname", {
                                  type: "invalid_format",
                                  message: error.message,
                                });
                              }
                            }
                          });
                      }}
                    >
                      중복 확인
                    </TextFieldButton>
                  }
                  helperText={
                    <>
                      {!!touchedFields.nickname ? (
                        !!errors.nickname?.message ? (
                          <HelperText state={"error"}>
                            {errors.nickname?.message}
                          </HelperText>
                        ) : (
                          isValidDuplicateNickname && (
                            <HelperText state={"success"}>
                              사용 가능한 닉네임입니다.
                            </HelperText>
                          )
                        )
                      ) : (
                        <></>
                      )}
                    </>
                  }
                  isError={!!errors.nickname?.message}
                />
                <InputField
                  label={"비밀번호"}
                  type="password"
                  {...register("password")}
                  placeholder="비밀번호를 입력해 주세요."
                  helperText={
                    <HelperText state={"error"}>
                      {errors.password?.message}
                    </HelperText>
                  }
                  isError={!!errors.password?.message}
                />
                <InputField
                  label={"비밀번호 확인"}
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="비밀번호를 다시 입력해 주세요."
                  helperText={
                    <HelperText state={"error"}>
                      {errors.confirmPassword?.message}
                    </HelperText>
                  }
                  isError={!!errors.confirmPassword?.message}
                />
                <section className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>이용약관</span>
                    <div className="flex gap-1 items-center">
                      <label
                        htmlFor="terms"
                        className={clsx(
                          "text-small text-medium text-primary/30",
                          isChecked && "text-primary/100"
                        )}
                      >
                        동의함
                      </label>
                      <Checkbox
                        id="terms"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                    </div>
                  </div>
                  <TermsService />
                </section>
              </fieldset>
              <Button
                priority={"primary"}
                type="submit"
                disabled={!isFormValid || isSubmitting}
              >
                회원가입
              </Button>
            </form>
          </FormProvider>
          <p>
            <span className="text-primary text-body font-medium">
              회원이신가요?
            </span>{" "}
            <Link
              href={PATH.LOGIN}
              className="text-primary text-body font-bold "
            >
              로그인 바로가기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
