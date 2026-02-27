import { presignedUrlCreate } from "@shared/ui/add-image/presigned-url-create";
import { ChangeEvent, useRef, useState } from "react";

const extractBaseUrl = (presignedUrl: string) => {
  return presignedUrl.split("?")[0];
};

const MAX_FILE_BYTE = 5 * 1024 * 1024; //5MB

const accept = ["image/png", "image/jpg", "image/jpeg"];
export const AddImage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");

  // TODO: 이미지 업로드 최적화하기 + 외부 서비스 에러도 서브클래싱
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    //예외 케이스
    if (!accept.includes(file.type)) alert("확장자는 jpg, png만 가능합니다");
    if (file.size > MAX_FILE_BYTE) alert("파일은 최대 5MB 까지 가능합니다");

    //presignedUrl 받아오기
    const { presignedUrl, key } = await presignedUrlCreate({
      fileName: file.name,
      contentType: file.type,
    });

    //이미지 업로드
    const response = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    e.target.value = "";
    if (!response.ok) throw new Error("S3 업로드에 실패했습니다.");

    setUrl(extractBaseUrl(presignedUrl));
  };

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        className="hidden"
        ref={inputRef}
        onChange={handleImageUpload}
      />

      <picture className="w-30 h-30 block">
        <img src={url} alt="이미지" className="w-full h-full" />
      </picture>
      <div
        className="w-30 h-30 flex items-center justify-center border cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        클릭
      </div>
    </div>
  );
};
