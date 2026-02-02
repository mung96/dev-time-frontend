import type { Metadata } from "next";
import { ModalProvider, ReactQueryProvider } from "@app/providers";
import "@app/styles/globals.css";
import "@app/styles/font.css";
import { TimerProvider } from "@app/providers/timer-provider";

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
        <div id="modal-root"></div>
        <ModalProvider>
          <ReactQueryProvider>
            <TimerProvider>{children}</TimerProvider>
          </ReactQueryProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
