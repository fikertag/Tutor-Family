import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
const tutors = [
  {
    id: 1,
    name: "Abel Tesfaye",
    subject: "Math & Physics",
    rating: 4.9,
    image: "/top-1.jpg",
  },
  {
    id: 3,
    name: "Lily Haile",
    subject: "Chemistry & Biology",
    rating: 4.7,
    image: "/top-2.jpg",
  },
  {
    id: 2,
    name: "Fikir Yilkal",
    subject: "English & Essay Writing",
    rating: 4.8,
    image: "/top-3.jpg",
  },
];
export default function Features() {
  return (
    <section className="bg-zinc-50 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Browse Our Top Tutors
          </h2>
          <p className="mt-4">
            Discover our top-rated tutors and find the perfect match for your
            learning needs.
          </p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="relative text-card-foreground max-w-72 min-w-60 w-full mx-auto overflow-hidden rounded-2xl bg-card shadow"
            >
              {/* image header - full bleed, no extra spacing */}
              <div className="relative w-full aspect-square overflow-hidden bg-background rounded-t-2xl">
                <Image
                  src={tutor.image}
                  alt={tutor.name}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              <div className="flex flex-col items-start px-4 py-3">
                <h3 className="text-lg font-semibold mb-1">{tutor.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">
                  {tutor.subject}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant={"outline"}
                    className="bg-card text-card-foreground mx-0"
                  >
                    ⭐ {tutor.rating}
                  </Badge>
                  <span className="text-xs text-muted-foreground">ADAMA</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-secondary text-foreground px-4 py-3 mt-5">
          <p className="flex justify-center text-sm">
            <Link href="/tutors" className="group">
              <span className="me-1 text-base leading-none">✨</span>
              See All Tutors
              <ArrowRightIcon
                className="ms-2 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
