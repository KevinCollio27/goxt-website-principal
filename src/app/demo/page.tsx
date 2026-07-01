import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/layout/navbar";
import { DemoSection, Footer } from "@/components/sections";
import { defaultOgImages } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Solicita tu Demo",
  description: "En 30 minutos te mostramos cómo GOxT puede ordenar tu operación. Sin instalaciones, sin tarjeta de crédito.",
  openGraph: {
    title: "Solicita tu Demo | GOxT",
    description: "En 30 minutos te mostramos cómo GOxT puede ordenar tu operación. Sin instalaciones, sin tarjeta de crédito.",
    url: "https://goxt.io/demo",
    images: defaultOgImages,
  },
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
