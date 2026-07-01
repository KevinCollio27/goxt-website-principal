import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { PowerSkillsSection, PowerSkillsStats, PowerSkillsPillars, PowerSkillsProcess, PowerSkillsModalidades, PowerSkillsDemoDay, PowerSkillsEcosistemaStats, PowerSkillsEcosistema, PowerSkillsBrandSlider, PowerSkillsCTA, Footer } from "@/components/sections";
import { defaultOgImages } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Power Skills 2026",
  description: "Aprende haciendo, resuelve problemas reales y conéctate con el ecosistema que importa. Postulaciones abiertas 2026.",
  openGraph: {
    title: "Power Skills 2026 | GOxT",
    description: "Aprende haciendo, resuelve problemas reales y conéctate con el ecosistema que importa. Postulaciones abiertas 2026.",
    url: "https://goxt.io/skills",
    images: defaultOgImages,
  },
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
