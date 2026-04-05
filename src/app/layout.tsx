import { QueryProvider } from "@/shared/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "날씨",
  description: "날씨 예보",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} min-h-dvh overflow-x-hidden antialiased lg:h-dvh lg:max-h-dvh lg:overflow-hidden`}
    >
      <body className="flex min-h-dvh w-full flex-col overflow-x-hidden lg:h-dvh lg:max-h-dvh lg:min-h-0 lg:overflow-hidden">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
