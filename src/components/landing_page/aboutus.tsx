"use client";

import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-primary mb-4">
            About TutorBridge
          </h2>
          <p className="text-foreground mb-4">
            At TutorBridge, we bridge the gap between families and experienced
            tutors. Whether your child needs help with math, languages, or exam
            prep, we make it easy to find and connect with qualified educators.
          </p>
          <p className="text-muted-foreground">
            Backed by a team that believes in accessible education, TutorBridge
            is designed to be simple, safe, and effective for both families and
            tutors.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative aspect-[4/3] w-full max-w-[320px] md:max-w-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/landing2.jpg"
              alt="Tutoring Session"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 90vw, 400px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
