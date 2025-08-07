"use client";

import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
const tutors = [
  {
    id: 1,
    name: "Sara Mekonnen",
    subject: "Math & Physics",
    rating: 4.9,
    image: "/model1.webp",
  },
  {
    id: 2,
    name: "Abel Tesfaye",
    subject: "English & Essay Writing",
    rating: 4.8,
    image: "/model1.webp",
  },
  {
    id: 3,
    name: "Lily Haile",
    subject: "Chemistry & Biology",
    rating: 4.7,
    image: "/model1.webp",
  },
];

const BrowseTutors = () => {
  return (
    <section className="py-16 bg-background lg:px-10 ">
      <div className="container mx-auto px-4">
        <h2 className="md:text-4xl text-3xl font-bold text-center  mb-10">
          Browse Our Top Tutors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
          {tutors.map((tutor) => (
            <Card
              key={tutor.id}
              className="relative text-card-foreground max-w-72 min-w-60 w-full mx-auto overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-square flex items-end justify-center  bg-background">
                <Image
                  src={tutor.image}
                  alt={tutor.name}
                  fill
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <div className="flex flex-col items-start px-2 pt-4 pb-2">
                <h3 className="text-lg font-semibold mb-1">{tutor.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">
                  {tutor.subject}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-card text-card-foreground">
                    ⭐ {tutor.rating}
                  </Badge>
                  <span className="text-xs text-muted-foreground">ADAMA</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-4 right-4 rounded-full"
              >
                <ArrowRight size={20} />
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg" variant={"link"}>
            <Link
              href="/findtutors"
              className="flex items-center gap-2 text-xl underline"
            >
              View All Tutors
              <span className="inline-flex items-center justify-center rounded-full bg-primary text-white w-8 h-8 ml-2">
                <ArrowRight size={20} />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BrowseTutors;
