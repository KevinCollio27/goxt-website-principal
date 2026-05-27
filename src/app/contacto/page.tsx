import Navbar from "@/components/layout/navbar";
import { ContactSection, Footer } from "@/components/sections";

export const metadata = {
  title: "Contacto | GOXT",
  description: "Hablemos de tu operación. En 30 minutos te mostramos si GOxT puede ordenarlo.",
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
