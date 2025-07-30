"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/context/UserContext";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const signIn = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const lastname = formData.get("lastname") as string;
    const role = formData.get("role") as string;
    const phone = formData.get("phone") as string;
    try {
      const { error: signupError } = await authClient.signUp.email(
        { email, password, name, lastname, role, phone },
        {
          onRequest: () => setIsLoading(true),
          onSuccess: (ctx) => {
            if (ctx?.data?.user) setUser(ctx.data.user);
            router.replace("/home");
            setIsLoading(false);
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Signup failed");
            setIsLoading(false);
          },
        },
      );
      if (signupError) setError(signupError.message || "Signup failed");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || "Signup failed");
      else setError("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSignup}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="firstname">First Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="First name"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="lastname">Last Name</Label>
          <Input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Last name"
            required
          />
        </div>
        <div className="">
          <Label htmlFor="role" className="mb-2">
            Role
          </Label>
          <Select name="role" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tutor">Tutor</SelectItem>
              <SelectItem value="family">Family</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone">Phone</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm font-normal">
              +251
            </span>
            <Input
              id="phone"
              name="phone"
              type="text"
              pattern="[0-9]{9}"
              maxLength={9}
              minLength={9}
              placeholder="933602575"
              required
              className="rounded-l-none placeholder:text-muted-foreground/30"
              inputMode="numeric"
              autoComplete="tel"
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        {/* Feedback messages */}
        {error && (
          <div className="text-center text-sm text-destructive">{error}</div>
        )}
        {success && (
          <div className="text-center text-sm text-green-600">{success}</div>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign up"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={signIn}
          disabled={isLoading}
        >
          Sign up with Google
        </Button>
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
