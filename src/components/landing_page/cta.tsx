import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section className="py-16 mt-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Find the Right Tutor?
        </h2>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of families who have found academic success through
          personalized tutoring.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/auth/signup">Get Started Today</Link>
        </Button>
      </div>
    </section>
  );
}
