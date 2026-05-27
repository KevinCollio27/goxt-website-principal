import Navbar from "@/components/layout/navbar";
import { BlogHeader, BlogGrid, Footer } from "@/components/sections";

export const metadata = {
  title: "Blog | GOXT",
  description: "Estrategias, casos reales y recursos para PyMEs chilenas que quieren operar mejor y vender más.",
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
