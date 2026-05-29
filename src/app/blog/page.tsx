import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { BlogHeader, BlogGrid, Footer } from "@/components/sections";

export const metadata: Metadata = {
  title: "Blog — Recursos para tu operación",
  description: "Artículos, guías y casos de uso sobre CRM, logística, IA y emprendimiento para equipos que quieren crecer.",
  openGraph: {
    title: "Blog — Recursos para tu operación | GOxT",
    description: "Artículos, guías y casos de uso sobre CRM, logística, IA y emprendimiento para equipos que quieren crecer.",
    url: "https://goxt.io/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <BlogHeader />
        <BlogGrid />
      </main>
      <Footer />
    </div>
  );
}
