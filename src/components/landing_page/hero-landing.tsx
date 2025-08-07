import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Adjust path as needed
export default function HeroLanding() {
  return (
    <section className=" pattern pb-20 pt-10 mt-[60px] sm:min-h-[calc(100vh-60px)] lg:px-10 flex items-center">
      <div className="container mx-auto px-4 flex flex-col-reverse gap-5 lg:flex-row md:justify-around md:items-center ">
        {/* Text Section */}
        <div className=" flex flex-col items-center lg:items-start text-center lg:text-left md:max-w-140 ">
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground my-2 sm:mb-6 leading-tight">
            Find the <span className="text-primary">Perfect Tutor</span> for
            Your Child
          </h1>
          <p className="text- md:text-xl  mb-6 sm:mb-8 max-w-xl">
            Connecting families with qualified tutors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4  md:w-auto justify-center md:justify-start">
            <Button size="lg" asChild className="sm:w-auto px-10 sm:py-7">
              <Link href="/auth/signup" className="text-lg sm:text-xl">
                Find a Tutor
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className=" sm:w-auto  sm:py-7"
            >
              <Link href="/auth/signup" className="text-lg sm:text-xl">
                Become a Tutor
              </Link>
            </Button>
          </div>
        </div>
        {/* Image Section */}
        <div className=" flex justify-center md:block md:w-[400px]  ">
          <div className="relative aspect-[4/3] w-full max-w-[280px] md:max-w-[400px] rounded-xl overflow-hidden ">
            <Image
              src="/banner1.jpg"
              alt="Happy student learning with tutor"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
