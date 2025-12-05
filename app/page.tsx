import { Button } from "@shared/ui";

export default function Home() {
  return (
    <div>
      <p className="text-title font-bold">프리텐다드X</p>
      <Button priority="primary">Primary</Button>
      <Button priority="secondary">Secondary</Button>
      <Button priority="tertiary">Tertiary</Button>

      <p className="text-title font-medium font-pretendard">프리텐다드O</p>
    </div>
  );
}
