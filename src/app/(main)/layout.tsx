import type { Metadata } from "next";
import ReactQueryProvider from "@/QueryClientProvider";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import Component from "@/components/comp-581";

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
    <>
      <ReactQueryProvider>
        <Component />
        <div className="mt-16">{children}</div>
        <Toaster />
      </ReactQueryProvider>
    </>
  );
}
