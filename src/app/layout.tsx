import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import React from "react";
import ReactQueryProvider from "@/QueryClientProvider";
import { ThemeProvider } from "@/components/theme-provider";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tutor Family",
  description: "connecting Tutors with Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lexend.className} suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
