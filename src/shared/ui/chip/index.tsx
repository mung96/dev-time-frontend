import { X } from "@shared/ui/icons";
import { ReactNode } from "react";

export const Chip = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center gap-2 border border-primary bg-primary/10 px-3 py-3 rounded-sm">
      <span className="text-primary text-body-small font-semibold">
        {children}
      </span>
      <X className="w-5 h-5 text-primary" />
    </div>
  );
};
