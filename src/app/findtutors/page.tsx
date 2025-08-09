"use client";
import TutorCard from "@/components/home_page/tutor_card";
import { useState } from "react";
import { Tutor_Info } from "@/types/index";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/user_store";

const locations = [
  "Addis Ababa",
  "Adama",
  "Bahir Dar",
  "Dire Dawa",
  "Hawassa",
  "Mekelle",
  "Gondar",
  "Jimma",
  "Harar",
  "Dessie",
];

export default function FindTutorsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const { userData } = useUserStore();
  const { data, isLoading, isError } = useQuery({
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
    <div className="container mx-auto px-4 py-5 md:py-10">
      <h1 className="text-3xl font-bold mb-4 sm:mb-8 text-primary">
        Find a Tutor
      </h1>
      <form className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative w-full md:w-1/2">
          <Input
            type="text"
            className="border rounded-lg px-4 py-2 w-full pl-10"
            placeholder="Search by name, subject, etc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99c.41.41 1.09.41 1.5 0s.41-1.09 0-1.5l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
        <div className="flex gap-2">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Locations</SelectLabel>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={""} onValueChange={() => {}}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                <SelectItem value="rating-desc">Highest Rated</SelectItem>
                <SelectItem value="rating-asc">Lowest Rated</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </form>
      <section className="py-8 sm:py-16 bg-background">
        <div className=" container mx-auto ">
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
            ) : Array.isArray(data) ? (
              data.map((tutor: Tutor_Info) => (
                <TutorCard
                  key={tutor.id}
                  id={tutor.id}
                  name={tutor.name || "Unknown"}
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
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
