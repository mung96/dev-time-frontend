"use client";
import { useLoginDuplicateModal } from "@pages/auth/model/use-login-duplicate-modal-store";
import { Button, Dialog } from "@shared/ui";

export const LoginDuplicateModal = () => {
  const { isOpen, confirm } = useLoginDuplicateModal();

  if (!isOpen) return null;
  return (
    <Dialog>
      <div className="flex flex-col gap-6">
        <p className="text-gray-800 text-title font-semibold">
          중복 로그인이 불가능합니다.
        </p>
        <p className="text-gray-800 text-title font-semibold">
          다른 기기에 중복 로그인 된 상태입니다. [확인] 버튼을 누르면 다른
          기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동
          삭제됩니다.
        </p>
        <Button priority={"primary"} onClick={() => confirm()}>
          확인
        </Button>
      </div>
    </Dialog>
  );
};
