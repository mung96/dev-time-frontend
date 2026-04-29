import { PATH } from "@shared/routes";
import { redirect } from "next/navigation";

export default function Page() {
  return redirect(PATH.TIMER);
}
