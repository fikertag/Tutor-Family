import { BookAIcon } from "lucide-react";
import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="grid h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 ">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative h-screen hidden lg:block">
        <Image
          src="/auth-img.avif"
          alt="Image"
          fill
          className="object-cover absolute inset-0 h-full w-full "
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    </div>
  );
}
