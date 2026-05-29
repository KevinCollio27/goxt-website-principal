import { Suspense } from "react";
import Navbar from "@/components/layout/navbar";
import { DiagnosticoSection, Footer } from "@/components/sections";

export const metadata = {
  title: "Agendar Diagnóstico | GOXT",
  description: "En 30 minutos identificamos el cuello de botella de tu operación y te mostramos cómo resolverlo.",
};

export default function DiagnosticoPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Suspense>
          <DiagnosticoSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
