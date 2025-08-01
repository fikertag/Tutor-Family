import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export interface TutorCardProps {
  id: number | string;
  name: string;
  image: string;
  description: string;
  location: string;
  rating: number;
}

export default function TutorCard({
  id,
  name,
  image,
  description,
  location,
  rating,
}: TutorCardProps) {
  return (
    <Card className="rounded-2xl border border-border bg-card text-card-foreground flex flex-col overflow-hidden shadow-lg">
      <div className="w-full aspect-[4/3] bg-muted flex items-center justify-center h-60">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
          style={{ borderRadius: "0.75rem 0.75rem 0 0" }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-1 text-left">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2 text-left line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-4 mb-4 mt-auto">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="inline-block">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                  fill="currentColor"
                />
              </svg>
            </span>
            {location}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="inline-block">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  fill="currentColor"
                />
              </svg>
            </span>
            {rating}
          </div>
        </div>
        <Link href={`/tutors/${id}`} className="w-full">
          <Button variant="secondary" className="w-full rounded-lg">
            View Profile
          </Button>
        </Link>
      </div>
    </Card>
  );
}
