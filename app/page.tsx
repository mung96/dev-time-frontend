import { PATH } from "@shared/routes/path";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={PATH.SIGNUP}>회원가입 페이지로 이동하기</Link>
    </div>
  );
}
