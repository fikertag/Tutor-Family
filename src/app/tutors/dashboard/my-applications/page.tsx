"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/user_store";
import { authClient } from "@/lib/auth-client";

export default function Page() {
  const { userData } = useUserStore();
  const user = authClient.useSession();

  const { data, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/job-application/user/${userData?.user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.data?.session.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }
      return response.json();
    },
  });

  return (
    <div className="flex flex-1 flex-col">
      if (isLoading) return <div>Loading...</div>;{data}
    </div>
  );
}
