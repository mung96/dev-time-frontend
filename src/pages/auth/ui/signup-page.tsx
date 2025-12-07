"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkEmail } from "@pages/auth/api/check-email";
import { ApiError, HttpStatus } from "@shared/api";
import {
  SignUpFormValues,
  SignUpFormValuesSchema,
} from "@pages/auth/model/signup-form-values.schema";
import { PATH } from "@shared/routes";
import { Button } from "@shared/ui";
import { TextField } from "@shared/ui/text-field";
import { HelperText } from "@shared/ui/text-field/helper-text";
import { TextFieldButton } from "@shared/ui/text-field/text-field-button";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { checkNickname } from "@pages/auth/api/check-nickname";
import { useState } from "react";
import { signup } from "@pages/auth/api/signup";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/navigation";

export const SignupPage = () => {
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormValues>({
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

  const [isValidDuplicateEmail, setIsValidDuplicateEmail] = useState(false);
  const [isValidDuplicateNickname, setIsValidDuplicateNickname] =
    useState(false);
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
          <form
            className="mt-[140px] w-105 flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit((data) => {
                signup(data).then(() => {
                  router.replace(PATH.LOGIN);
                });
              })();
            }}
          >
            <h2 className="text-heading text-primary text-center">회원가입</h2>
            <fieldset className="flex flex-col gap-10">
              <TextField
                label={"아이디"}
                placeholder="이메일 주소 형식으로 입력해 주세요."
                {...register("email", {
                  onChange: () => setIsValidDuplicateEmail(false),
                })}
                button={
                  <TextFieldButton
                    type="button"
                    onClick={() => {
                      const email = getValues("email");
                      checkEmail(email)
                        .then(() => {
                          setIsValidDuplicateEmail(true);
                        })
                        .catch((error) => {
                          if (error instanceof ApiError) {
                            if (error.status === HttpStatus.BAD_REQUEST) {
                              setError("email", {
                                type: "manual",
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
                    {errors.email?.message && (
                      <HelperText state={"error"}>
                        {errors.email?.message}
                      </HelperText>
                    )}
                    {isValidDuplicateEmail && (
                      <HelperText state={"success"}>
                        사용 가능한 이메일입니다.
                      </HelperText>
                    )}
                  </>
                }
                isError={!!errors.email?.message}
              />
              <TextField
                label={"닉네임"}
                placeholder="닉네임을 입력해 주세요."
                {...register("nickname", {
                  onChange: () => setIsValidDuplicateNickname(false),
                })}
                button={
                  <TextFieldButton
                    type="button"
                    onClick={() => {
                      const nickname = getValues("nickname");
                      checkNickname(nickname)
                        .then(() => {
                          setIsValidDuplicateNickname(true);
                        })
                        .catch((error) => {
                          if (error instanceof ApiError) {
                            if (error.status === HttpStatus.BAD_REQUEST) {
                              setError("nickname", {
                                type: "nickname",
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
                    {errors.nickname?.message && (
                      <HelperText state={"error"}>
                        {errors.nickname?.message}
                      </HelperText>
                    )}
                    {isValidDuplicateNickname && (
                      <HelperText state={"success"}>
                        사용 가능한 닉네임입니다.
                      </HelperText>
                    )}
                  </>
                }
                isError={!!errors.nickname?.message}
              />
              <TextField
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
              <TextField
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
              <section>
                <div className="flex justify-between">
                  <span>이용약관</span>
                  <div>체크박스</div>
                </div>
                <div className="bg-gray-50 h-[110px] overflow-y-scroll py-3 px-4">
                  {TERMS_OF_SERVICE_CONTENT}
                </div>
              </section>
            </fieldset>
            <Button priority={"primary"} type="submit">
              {" "}
              회원가입
            </Button>
            <DevTool control={control} /> {/* set up the dev tool */}
          </form>

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

const TERMS_OF_SERVICE_CONTENT =
  "안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕";
