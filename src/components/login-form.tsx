"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useUserStore, UserStoreData } from "@/store/user_store";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, userData } = useUserStore();

  useEffect(() => {
    if (userData?.token) {
      if (userData.role === "user") {
        router.replace("/tutors");
      } else if (userData.role === "tutor") {
        router.replace("/jobs");
      } else {
        router.replace("/");
      }
    }
  }, [userData, router]);

  const signin = async function () {
    const response = await fetch(
      "https://tutor-server-tnat.onrender.com/api/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
    return response.json();
  };

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: () => signin(),
    onSuccess: (data) => {
      const userStoreData: UserStoreData = {
        token: data.token,
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          emailVerified: data.user.emailVerified,
          createdAt: data.user.createdAt,
          updatedAt: data.user.updatedAt,
        },
        role: data.role,
        needsProfileCompletion: data.needsProfileCompletion,
      };
      login(userStoreData);
      if (data.role === "user") {
        router.replace("/tutors");
      } else if (data.role === "tutor") {
        router.replace("jobs");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <Link
              href="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link> */}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {isError && (
          <p className="text-red-500 text-sm text-center">{error.message}</p>
        )}
        <Button
          className="w-full"
          onClick={() => mutate()}
          disabled={isPending}
        >
          Login
        </Button>
        {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          // onClick={signIn}
          disabled={isPending}
        >
          Login with Google
        </Button> */}
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
