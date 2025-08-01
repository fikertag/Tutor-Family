"use client";
import TutorCard from "@/components/home_page/tutor_card";
import { tutors } from "../tutors";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const locations = [...Array.from(new Set(tutors.map((t) => t.location)))];

export default function FindTutorsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} {...tutor} />
        ))}
      </div>
    </div>
  );
}
