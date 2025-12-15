"use client";
import { useLoginFailModal } from "@pages/auth/model/use-login-fail-modal-store";
import { Button, Dialog } from "@shared/ui";

export const LoginFailModal = () => {
  const { isOpen, close } = useLoginFailModal();

  if (!isOpen) return null;
  return (
    <Dialog size="sm">
      <div className="flex flex-col gap-6">
        <p className="text-gray-800 text-title font-semibold">
          로그인 정보를 다시 확인해 주세요
        </p>
        <Button priority={"primary"} onClick={close}>
          확인
        </Button>
      </div>
    </Dialog>
  );
};
