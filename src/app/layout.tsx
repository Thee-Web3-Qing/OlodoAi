import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/components/app-provider";

export const metadata: Metadata = {
  title: "Olodo AI",
  description: "A past-question-first exam survival tutor.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><AppProvider>{children}</AppProvider></body>
    </html>
  );
}
