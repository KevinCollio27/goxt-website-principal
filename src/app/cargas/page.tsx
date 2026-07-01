import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { CargasHero, Testimonials, Footer } from "@/components/sections";
import { defaultOgImages } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Cargas",
  description: "Conectamos transportistas, generadores de carga y conductores para crecer con más control.",
  openGraph: {
    title: "Cargas | GOxT",
    description: "Conectamos transportistas, generadores de carga y conductores para crecer con más control.",
    url: "https://goxt.io/cargas",
    images: defaultOgImages,
  },
};

export default function CargasPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <CargasHero />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
