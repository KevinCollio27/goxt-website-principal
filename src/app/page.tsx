import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { HeroSection, BrandSlider, PainPoints, FeaturesSection, Testimonials, CTASection, Footer } from "@/components/sections";
import { defaultOgImages } from "@/lib/metadata";

export const metadata: Metadata = {
  title: { absolute: "GOxT | CRM, Logística e IA para tu operación" },
  description: "Gestiona clientes, controla tu operación logística e implementa IA en tu negocio. Todo en una sola plataforma pensada para Latinoamérica.",
  openGraph: {
    title: "GOxT | CRM, Logística e IA para tu operación",
    description: "Gestiona clientes, controla tu operación logística e implementa IA en tu negocio. Todo en una sola plataforma pensada para Latinoamérica.",
    url: "https://goxt.io",
    images: defaultOgImages,
  },
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
