import type { Metadata } from "next";
import { ReactQueryProvider } from "@app/providers";
import "@app/styles/globals.css";
import "@app/styles/font.css";

export const metadata: Metadata = {
  title: "Dev Time",
  description: "Dev Time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`font-pretendard`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
