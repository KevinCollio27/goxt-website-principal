import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { PricingSection, FormacionSection, Footer } from "@/components/sections";

export const metadata: Metadata = {
  title: "Planes y Servicios",
  description: "Desde setup inicial hasta desarrollo a medida. Elige cómo trabajar con GOxT según tu operación.",
  openGraph: {
    title: "Planes y Servicios | GOxT",
    description: "Desde setup inicial hasta desarrollo a medida. Elige cómo trabajar con GOxT según tu operación.",
    url: "https://goxt.io/planes",
  },
};

export default function PlanesPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <PricingSection />
        <FormacionSection />
      </main>
      <Footer />
    </div>
  );
}
