import Navbar from "@/components/layout/navbar";
import { PowerSkillsPostulacion, Footer } from "@/components/sections";

export const metadata = {
  title: "Postulación Power Skills 2026 | GOXT",
  description: "Postula al programa Power Skills y te contactamos en menos de 24 horas.",
};

export default function PostulacionPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <PowerSkillsPostulacion />
      </main>
      <Footer />
    </div>
  );
}
