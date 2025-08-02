import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/QueryClientProvider";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tutor Family",
  description: "main app for Tutor Family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lexend.className}>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
