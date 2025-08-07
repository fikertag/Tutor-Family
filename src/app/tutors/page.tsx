"use client";
import Hero from "@/components/home_page/hero";
import TopTutors from "@/components/home_page/top_tutors";
import PostAd from "@/components/home_page/post_ad";
import FAQ from "@/components/home_page/faq";
import Navbar from "@/components/home_page/navbar";
import Footer from "@/components/home_page/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 ">
        <Hero />
        <TopTutors />
        <PostAd />
        <FAQ />
      </main>{" "}
      <Footer />
    </>
  );
}
