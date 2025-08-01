import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Adjust path as needed
export default function HeroLanding() {
  return (
    <section className="py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-0">
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Find the <span className="text-primary">Perfect Tutor</span> for
            Your Child
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Connecting families with qualified tutors for personalized learning
            experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-center md:justify-start">
            <Button size="lg" asChild className="w-full sm:w-auto px-10 py-7">
              <Link href="/auth/signup" className="text-xl">
                Find a Tutor
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto px-10 py-7"
            >
              <Link href="/auth/signup" className="text-xl">
                Become a Tutor
              </Link>
            </Button>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative aspect-[5/4] w-full max-w-[420px] md:max-w-[500px] rounded-xl overflow-hidden ">
            <Image
              src="/question.jpg"
              alt="Happy student learning with tutor"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 90vw, 500px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
