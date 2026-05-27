import Navbar from "@/components/layout/navbar";
import { PowerSkillsSection, PowerSkillsStats, PowerSkillsPillars, PowerSkillsProcess, PowerSkillsModalidades, PowerSkillsDemoDay, PowerSkillsEcosistemaStats, PowerSkillsEcosistema, PowerSkillsBrandSlider, PowerSkillsCTA, Footer } from "@/components/sections";

export const metadata = {
  title: "Power Skills | GOXT",
  description: "Programa de innovación y emprendimiento aplicado. Aprende haciendo, resuelve problemas reales y conéctate con el ecosistema que importa.",
};

export default function SkillsPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <PowerSkillsSection />
        <PowerSkillsStats />
        <PowerSkillsPillars />
        <PowerSkillsProcess />
        <PowerSkillsModalidades />
        <PowerSkillsDemoDay />
        <PowerSkillsEcosistemaStats />
        <PowerSkillsEcosistema />
        <PowerSkillsBrandSlider />
        <PowerSkillsCTA />
      </main>
      <Footer />
    </div>
  );
}
