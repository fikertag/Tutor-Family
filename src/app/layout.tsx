import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/QueryClientProvider";
import { Toaster } from "@/components/ui/sonner";

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
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
