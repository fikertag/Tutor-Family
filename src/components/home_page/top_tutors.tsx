import TutorCard from "./tutor_card";
import { Button } from "../ui/button";
import Link from "next/link";
import { tutors } from "@/app/tutors";

const TopTutors = () => (
  <section className="py-16 bg-background">
    <div className=" container mx-auto ">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary">
          Top Tutors
        </h2>
        <Link href="/tutors">
          <Button
            variant={"link"}
            size="sm"
            className="cursor-pointer text-base px-4 py-2"
          >
            See All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {tutors.map((tutor) => (
          <TutorCard
            key={tutor.id}
            id={tutor.id}
            name={tutor.name}
            image={tutor.image}
            description={tutor.description}
            location={tutor.location}
            rating={tutor.rating}
          />
        ))}
      </div>
    </div>
  </section>
);

export default TopTutors;
