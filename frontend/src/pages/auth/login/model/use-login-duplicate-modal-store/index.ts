import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
  onConfirm: null as (() => void) | null,
};

const useLoginDuplicateModalStore = create(
  devtools(
    combine(initialState, (set, get) => ({
      actions: {
        open: (onConfirm: () => void) => {
          set({ isOpen: true, onConfirm: onConfirm });
        },
        close: () => {
          set({ isOpen: false });
        },
        confirm: () => {
          const { onConfirm } = get();
          onConfirm?.();
          set({ isOpen: false, onConfirm: null });
        },
      },
    })),
    {
      name: "loginDuplicateModal",
    }
  )
);

//로그인 모달을 여는 곳에서 활용
export const useOpenLoginDuplicateModal = () => {
  const {
    actions: { open },
  } = useLoginDuplicateModalStore();
  return {
    open,
  };
};

//로그인 모달에서 활용
export const useLoginDuplicateModal = () => {
  const {
    isOpen,
    actions: { close, confirm, open },
  } = useLoginDuplicateModalStore();

  return {
    isOpen,
    open,
    close,
    confirm,
  };
};
