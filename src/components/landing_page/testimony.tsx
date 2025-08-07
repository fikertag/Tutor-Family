import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonies = [
  {
    name: "Sarah Johnson",
    role: "Parent of 8th grader",
    image: "/model1.jpg",
    text: "We found the perfect math tutor for our daughter through TutorBridge. Her grades improved dramatically in just two months!",
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Parent of 10th grader",
    image: "/model1.jpg",
    text: "The Spanish tutor we connected with has been amazing. Flexible scheduling and personalized lessons have made all the difference.",
    initials: "MC",
  },
  {
    name: "Amina Yusuf",
    role: "Parent of 6th grader",
    image: "/model1.jpg",
    text: "TutorBridge made it easy to find a science tutor who really connects with my son. He looks forward to every session!",
    initials: "AY",
  },
];

export default function Testimony() {
  return (
    <section className="py-16 bg-background ">
      <div className="container mx-auto px-4">
        <h2 className="md:text-4xl text-3xl font-bold text-center mb-12">
          What Families Say About Us
        </h2>
        <Carousel className=" w-full max-w-xl mx-auto">
          <CarouselContent>
            {testimonies.map((t, index) => (
              <CarouselItem key={index}>
                <div className="p-1 h-full">
                  <Card className="flex flex-col items-center justify-center shadow-lg rounded-2xl bg-card text-card-foreground h-[300px] border-none">
                    <CardContent className="flex flex-col items-center justify-center p-8 h-full">
                      <Avatar className="mb-6 w-20 h-20 shadow-lg border-4 border-background">
                        <AvatarImage src={t.image} alt={t.name} />
                        <AvatarFallback>{t.initials}</AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold text-lg mb-1 text-center">
                        {t.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-4 text-center">
                        {t.role}
                      </p>
                      <p className="text-base text-foreground text-center italic flex-1 flex items-center justify-center">
                        &quot;{t.text}&quot;
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}{" "}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4 min-[500px]:hidden">
            {testimonies.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${1 === idx ? "bg-primary" : "bg-muted-foreground"}`}
              />
            ))}
          </div>
          <CarouselPrevious />
          <CarouselNext className="hidden min-[450px]:flex" />
        </Carousel>
      </div>
    </section>
  );
}
