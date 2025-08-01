import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="container mx-auto mt-20">
      <div
        className="flex min-h-[250px] md:min-h-[350px] flex-col gap-8 md:gap-10 bg-cover bg-center bg-no-repeat items-center justify-center rounded-2xl"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%), url("/homehero.png")',
        }}
      >
        <div className="flex flex-col gap-2 text-center px-4">
          <h1 className="text-2xl md:text-4xl font-black leading-tight tracking-tight text-white">
            Find the perfect tutor for your family
          </h1>
          <h2 className="text-base md:text-lg font-normal leading-normal text-white">
            Connect with experienced tutors who can help your child succeed.
          </h2>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="min-w-[120px]">
            <Link href="/browse">Browse Tutors</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[120px]">
            <Link href="/post-ad">Post an Ad</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
