import Navbar from "@/components/layout/navbar";
import { TerminosHero, TerminosContent, Footer } from "@/components/sections";

export const metadata = {
  title: "Términos y Condiciones | GOXT",
  description: "Conoce los términos y condiciones de uso de la plataforma GOxT.",
};

export default function TerminosPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <TerminosHero />
        <TerminosContent />
      </main>
      <Footer />
    </div>
  );
}
