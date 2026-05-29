import { Suspense } from "react";
import Navbar from "@/components/layout/navbar";
import { DemoSection, Footer } from "@/components/sections";

export const metadata = {
  title: "Solicitar Demo",
  description: "En 30 minutos te mostramos cómo GOxT puede ordenar tu operación — sin compromiso, sin PowerPoint.",
};

export default function DemoPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Suspense>
          <DemoSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
