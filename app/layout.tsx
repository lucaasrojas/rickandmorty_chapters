import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty's characters finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialised`}>{children}</body>
    </html>
  );
}
