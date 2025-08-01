"use client";
import Hero from "@/components/home_page/hero";
import TopTutors from "@/components/home_page/top_tutors";
import PostAd from "@/components/home_page/post_ad";
import FAQ from "@/components/home_page/faq";

export default function Home() {
  return (
    <main className="px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 ">
      <Hero />
      <TopTutors />
      <PostAd />
      <FAQ />
    </main>
  );
}
