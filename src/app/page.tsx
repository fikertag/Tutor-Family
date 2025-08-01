import Navbar from "@/components/landing_page/navbar";
import HeroLanding from "@/components/landing_page/hero-landing";
import HowItWorks from "@/components/landing_page/howItWorks";
import AboutUs from "@/components/landing_page/aboutus";
import BrowseTutors from "@/components/landing_page/browse";
import FAQ from "@/components/landing_page/faq";
import Testimony from "@/components/landing_page/testimony";
import Cta from "@/components/landing_page/cta";
import Footer from "@/components/landing_page/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroLanding />
      <HowItWorks />
      <AboutUs />
      <BrowseTutors />
      <Testimony />
      <FAQ />
      <Cta />
      <Footer />
    </div>
  );
}
