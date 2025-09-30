"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUserStore, UserStoreData } from "@/store/user_store";
import { authClient } from "@/lib/auth-client";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { login } = useUserStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { data: user } = authClient.useSession();

  useEffect(() => {
    if (user) {
      router.replace("/tutors");
    }
  }, [router, user]);

  const signup = async function () {
    // derive the expected parameter type from the authClient method to avoid using 'any'
    type SignUpParams = Parameters<typeof authClient.signUp.email>[0];
    const payload: Partial<SignUpParams> &
      Pick<SignUpParams, "email" | "password" | "role"> = {
      email,
      password,
      role,
    };
    const { data } = await authClient.signUp.email(payload as SignUpParams);
    if (!data) {
      throw new Error("Signup failed");
    }
    return data;
  };

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: () => signup(),
    onSuccess: (data) => {
      const userStoreData: UserStoreData = {
        token: data.token || "",
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          emailVerified: data.user.emailVerified,
          createdAt: data.user.createdAt,
          updatedAt: data.user.updatedAt,
        },
        role: data.user.name,
        needsProfileCompletion: true,
      };
      login(userStoreData);
      if (role === "user") {
        router.replace("/tutors");
      } else if (role === "tutor") {
        router.replace("/tutor/dashboard");
      } else {
        router.replace("/");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <div>
            <Label htmlFor="role" className="mb-2">
              Role
            </Label>
            <Select name="role" required value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tutor">Tutor</SelectItem>
                <SelectItem value="user">Family</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {isError && (
          <div className="text-center text-sm text-red-500">
            {error.message}
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing Up..." : "Sign up"}
        </Button>
        {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div> */}
        {/* <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={signIn}
          disabled={isLoading}
        >
          Sign up with Google
        </Button> */}
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
