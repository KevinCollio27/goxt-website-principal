import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function TerminosHero() {
  return (
    <section className="pt-8 md:pt-12 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Columna izquierda */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
                Legal
              </Badge>
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                Términos y Condiciones
              </h1>
              <p className="text-base text-muted-foreground">
                Última actualización: Mayo 2026
              </p>
            </div>
          </div>

          {/* Columna derecha: imagen */}
          <div className="relative h-80 md:h-120 rounded-2xl overflow-hidden border border-border shadow-sm">
            <Image
              src="/assets/Terminos.jpg"
              alt="Términos y Condiciones GOxT"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
