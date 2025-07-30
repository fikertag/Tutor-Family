import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="max-w-lg w-full p-8 rounded shadow bg-card text-card-foreground">
        <h1 className="text-4xl font-bold mb-4 text-center">Tutor Family</h1>
        <p className="text-lg mb-8 text-center">
          Connecting families and tutors for a better learning experience.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/auth/login"
            className="w-full px-6 py-3 rounded bg-primary text-primary-foreground text-center font-semibold hover:bg-primary/90 transition"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="w-full px-6 py-3 rounded border border-primary text-primary text-center font-semibold hover:bg-primary hover:text-primary-foreground transition"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
