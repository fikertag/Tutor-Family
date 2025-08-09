import TutorCard from "./tutor_card";
import { Button } from "../ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/user_store";
import { Tutor_Info } from "@/types/index";
import { Skeleton } from "@/components/ui/skeleton";

const TopTutors = () => {
  const { userData } = useUserStore();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const token = userData?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tutor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });

  return (
    <section className="py-8 sm:py-16 bg-background">
      <div className=" container mx-auto ">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Top Tutors
          </h2>
          <Link href="/findtutors">
            <Button
              variant={"link"}
              size="sm"
              className="cursor-pointer text-base px-4 py-2"
            >
              See All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="rounded-2xl border border-border bg-card text-card-foreground flex flex-col overflow-hidden shadow-lg w-90 mx-auto h-[400px]"
              >
                <div className="w-full aspect-[4/3] flex items-center justify-center h-60">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex items-center gap-4 mb-4 mt-auto">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              </Skeleton>
            ))
          ) : isError ? (
            <div className="col-span-full text-center text-destructive">
              Error loading tutors.
            </div>
          ) : (
            data?.map((tutor: Tutor_Info) => (
              <TutorCard
                key={tutor.id}
                id={tutor.id}
                name={tutor.name}
                image={
                  tutor.profile_picture_url?.trim()
                    ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${tutor.profile_picture_url}`
                    : "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=facearea&w=400&h=400&facepad=2&q=80"
                }
                description={tutor.snapshot_bio}
                location={tutor.location}
                rating={tutor.avg_review}
                languages={tutor.languages}
                ratingCount={tutor.review_num}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TopTutors;
