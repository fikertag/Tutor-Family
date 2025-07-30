"use client";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();
  if (isPending)
    return (
      <main className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to Tutor Family</h1>
        <div className="bg-background rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <ul className="grid gap-2">
            {[...Array(8)].map((_, i) => (
              <li key={i}>
                <Skeleton className="h-6 w-3/4" />
              </li>
            ))}
            <li>
              <Skeleton className="h-24 w-24 rounded-full mt-2" />
            </li>
          </ul>
        </div>
      </main>
    );
  if (error)
    return <div className="p-8 text-destructive">Error: {error.message}</div>;

  const user = session?.user;

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth/login");
          },
        },
      });
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Tutor Family</h1>
      {user ? (
        <div className="bg-background rounded shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Profile</h2>
            <Button onClick={handleSignOut} variant={"destructive"}>
              Sign out
            </Button>
          </div>
          <ul className="grid gap-2">
            <li>
              <b>ID:</b> {user.id}
            </li>
            <li>
              <b>Name:</b> {user.name} {user.lastname}
            </li>
            <li>
              <b>Email:</b> {user.email}
            </li>
            <li>
              <b>Email Verified:</b> {user.emailVerified ? "Yes" : "No"}
            </li>
            <li>
              <b>Role:</b> {user.role}
            </li>
            <li>
              <b>Phone:</b> {user.phone || "-"}
            </li>
            <li>
              <b>Active:</b> {user.isActive ? "Yes" : "No"}
            </li>
            <li>
              <b>Created At:</b>{" "}
              {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
            </li>
            <li>
              <b>Updated At:</b>{" "}
              {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "-"}
            </li>
            {user.lastLoginAt && (
              <li>
                <b>Last Login:</b> {new Date(user.lastLoginAt).toLocaleString()}
              </li>
            )}
            {user.image && (
              <li>
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mt-2"
                />
              </li>
            )}
          </ul>
        </div>
      ) : (
        <div className="bg-muted border border-border rounded p-6 text-foreground">
          <h2 className="text-lg font-semibold mb-2">Not logged in</h2>
          <p>
            Please log in to view your profile and access the agency features.
          </p>
        </div>
      )}
    </main>
  );
}
