import Image from "next/image";

export const SideBanner = () => {
  return (
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
  );
};
