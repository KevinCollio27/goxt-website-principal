import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { ContactSection, Footer } from "@/components/sections";

export const metadata: Metadata = {
  title: "Contacto",
  description: "¿Tienes dudas o quieres saber más? Escríbenos y te respondemos en menos de 24 horas.",
  openGraph: {
    title: "Contacto | GOxT",
    description: "¿Tienes dudas o quieres saber más? Escríbenos y te respondemos en menos de 24 horas.",
    url: "https://goxt.io/contacto",
  },
};

export default function ContactoPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
