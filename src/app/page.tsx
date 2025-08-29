import HeroSection from "@/components/heroSection";
import Features from "@/components/brouse-top";
import HowItWorks from "@/components/how-it works";
import FAQ from "@/components/landing_page/faq";
import Cta from "@/components/landing_page/cta";
import FooterSection from "@/components/footer";
import Testimony from "@/components/testtimony";
import AboutUs from "@/components/aboutus";
export default function page() {
  return (
    <>
      <div className="min-h-screen w-full relative">
        <div
          className="absolute inset-0 z-0 dark:hidden"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
          }}
        />
        <HeroSection />
      </div>
      <Features />
      <HowItWorks />
      <Testimony />
      <AboutUs />
      <FAQ />
      <Cta />
      <FooterSection />
    </>
  );
}
