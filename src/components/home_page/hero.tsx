import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="container mx-auto mt-20">
      <div className="flex min-h-[250px] md:min-h-[350px] flex-col gap-8 md:gap-10  items-center justify-center rounded-2xl bg-card">
        <div className="flex flex-col gap-2 text-center px-4">
          <h1 className="text-2xl md:text-5xl font-semibold leading-tight tracking-tight capitalize ">
            Find the perfect tutor for your child
          </h1>
          <h2 className="text-base md:text-lg font-normal leading-normal ">
            Connect with experienced tutors who can help your child succeed.
          </h2>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="min-w-[120px]">
            <Link href="/findtutors">Browse Tutors</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[120px]">
            <Link href="/post-ad">Post an Ad</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
