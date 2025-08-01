"use client";
import Hero from "@/components/home_page/hero";
import FAQ from "@/components/tutor_page/faq";
import TopJobs from "@/components/tutor_page/top_jobs";

export default function Home() {
  return (
    <main className="px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 ">
      <Hero />
      <TopJobs />
      <FAQ />
    </main>
  );
}
