"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type GetStartedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  className?: string;
};

export default function GetStartedButton({
  children = "Get Started",
  className = "",
  ...props
}: GetStartedButtonProps) {
  return (
    <Button
      {...props}
      className={`group px-6 py-3 rounded-full font-semibold text-base bg-primary text-primary-foreground hover:bg-primary/90 transition flex items-center gap-2 ${className}`}
    >
      <span className="leading-none">{children}</span>
      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
    </Button>
  );
}
