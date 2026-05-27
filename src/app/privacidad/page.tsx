import Navbar from "@/components/layout/navbar";
import { PrivacidadHero, PrivacidadContent, Footer } from "@/components/sections";

export const metadata = {
  title: "Política de Privacidad | GOXT",
  description: "Conoce cómo GOxT recopila, usa y protege tu información personal.",
};

export default function PrivacidadPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <PrivacidadHero />
        <PrivacidadContent />
      </main>
      <Footer />
    </div>
  );
}
