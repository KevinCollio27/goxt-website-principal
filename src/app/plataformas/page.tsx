import Navbar from "@/components/layout/navbar";
import { PlataformasSection, Footer } from "@/components/sections";

export const metadata = {
  title: "Plataformas | GOXT",
  description: "Accede a tu ecosistema GOxT. CRM, logística e inteligencia de negocio — todo conectado.",
};

export default function PlataformasPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <PlataformasSection />
      </main>
      <Footer />
    </div>
  );
}
