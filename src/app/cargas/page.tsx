import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { CargasHero, Testimonials, CargasFaq, Footer } from "@/components/sections";
import { defaultOgImages } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Busco Cargas para mi Camión | Transporte de Carga Chile",
  description:
    "Conectamos transportistas que buscan carga, generadores que necesitan transporte de carga y conductores en Chile. Cotiza o agenda una reunión en minutos.",
  openGraph: {
    title: "Busco Cargas para mi Camión | Transporte de Carga Chile | GOxT",
    description:
      "Conectamos transportistas que buscan carga, generadores que necesitan transporte de carga y conductores en Chile. Cotiza o agenda una reunión en minutos.",
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
        <CargasFaq />
      </main>
      <Footer />
    </div>
  );
}
