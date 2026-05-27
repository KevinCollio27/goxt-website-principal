import Navbar from "@/components/layout/navbar";
import { PricingSection, FormacionSection, Footer } from "@/components/sections";

export const metadata = {
  title: "Planes | GOXT",
  description: "Elige cómo trabajar con nosotros. Plataforma, Setup, Desarrollo, Power Skills y Mentoría.",
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
