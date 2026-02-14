import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const useLoginFailModalStore = create(
  devtools(
    combine({ isOpen: false }, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    {
      name: "loginFailModal",
    }
  )
);

//로그인 모달을 여는 곳에서 활용
export const useOpenLoginFailModal = () => {
  const {
    actions: { open },
  } = useLoginFailModalStore();
  return {
    open,
  };
};

//로그인 모달에서 활용
export const useLoginFailModal = () => {
  const {
    isOpen,
    actions: { close },
  } = useLoginFailModalStore();

  return {
    isOpen,
    open,
    close,
    confirm,
  };
};
