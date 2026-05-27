import Navbar from "@/components/layout/navbar";
import { SolucionesSection, SolutionsAccordion, SoluccionesCTA, Footer } from "@/components/sections";

export const metadata = {
  title: "Soluciones | GOXT",
  description: "Tecnología que resuelve problemas reales. CRM, Cargo, Network y BI para tu operación.",
};

export default function SolucionesPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <SolucionesSection />
        <SolutionsAccordion />
        <SoluccionesCTA />
      </main>
      <Footer />
    </div>
  );
}
