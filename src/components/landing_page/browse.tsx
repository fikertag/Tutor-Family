"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const tutors = [
  {
    id: 1,
    name: "Sara Mekonnen",
    subject: "Math & Physics",
    location: "Addis Ababa",
    rating: 4.9,
    image: "/images/tutor1.jpg",
  },
  {
    id: 2,
    name: "Abel Tesfaye",
    subject: "English & Essay Writing",
    location: "Bahir Dar",
    rating: 4.8,
    image: "/images/tutor2.jpg",
  },
  {
    id: 3,
    name: "Lily Haile",
    subject: "Chemistry & Biology",
    location: "Hawassa",
    rating: 4.7,
    image: "/images/tutor3.jpg",
  },
];

const BrowseTutors = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Browse Top Tutors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <Card
              key={tutor.id}
              className="rounded-lg shadow-md p-6 flex flex-col items-center text-center bg-card text-card-foreground"
            >
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={tutor.image} alt={tutor.name} />
                <AvatarFallback>
                  {tutor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{tutor.name}</h3>
              <p className="text-sm text-muted-foreground">{tutor.subject}</p>
              <p className="text-sm text-muted-foreground">{tutor.location}</p>
              <p className="text-accent mt-1">⭐ {tutor.rating}</p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link href="/tutors">View All Tutors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BrowseTutors;
