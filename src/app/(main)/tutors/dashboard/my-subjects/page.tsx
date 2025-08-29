"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/user_store";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

export default function Page() {
  const { userData } = useUserStore();
  const user = authClient.useSession();

  const { mutate } = useMutation({
    mutationFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tutors/${userData?.user.id}/subjects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.data?.session.token}`,
          },
          body: JSON.stringify({
            subjectId: "12",
            grades: ["8"],
          }),
        }
      ),
  });
  const { mutate: mutateDelete } = useMutation({
    mutationFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tutor-subjects/${userData?.user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.data?.session.token}`,
          },
        }
      ),
  });

  const { data } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tutors/${userData?.user.id}/subjects`,
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

  useEffect(() => {
    console.log("Fetched subjects:", data);
  }, [data]);

  return (
    <div className="flex flex-1 flex-col">
      if (isLoading) return <div>Loading...</div>;
      <button onClick={() => mutate()}>add</button>
      <button onClick={() => mutateDelete()}>delete</button>
    </div>
  );
}
