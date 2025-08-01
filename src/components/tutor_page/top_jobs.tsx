"use client";

import { ads } from "@/app/tutors";
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

const locations = ["diredewa", "addis ababa", "adama", "gonder"];

export default function TopJobs() {
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
        {ads.map((ad) => (
          <div
            key={ad.advertisement_id}
            className="rounded-2xl border border-border bg-card text-card-foreground flex flex-col overflow-hidden shadow-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-2">{ad.job_title}</h2>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {ad.job_description}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {ad.job_weekdays.map((day) => (
                <span
                  key={day}
                  className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground"
                >
                  {day}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs text-muted-foreground">
                Location: {ad.location}
              </span>
              <span className="text-xs text-muted-foreground">
                Grade: {ad.grade}
              </span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs text-muted-foreground">
                Salary: {ad.salary} ETB
              </span>
              <span className="text-xs text-muted-foreground">
                Posted: {ad.created_at}
              </span>
            </div>
            <button className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold shadow">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
