import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

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
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
