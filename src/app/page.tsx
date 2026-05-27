import Navbar from "@/components/layout/navbar";
import { HeroSection, BrandSlider, PainPoints, FeaturesSection, Testimonials, CTASection, Footer } from "@/components/sections";

export const metadata = {
  title: "Inicio | GOXT",
};

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <HeroSection />
        <BrandSlider />
        <PainPoints />
        <FeaturesSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
