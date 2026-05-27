"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function BlogHeader() {
  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Columna izquierda: contenido */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
                Blog de GOxT
              </Badge>
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                Insights para hacer crecer<br className="hidden md:block" /> tu negocio en serio.
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Estrategias, casos reales y recursos<br className="hidden md:block" />
                para PyMEs chilenas que quieren<br className="hidden md:block" />
                operar mejor y vender más.
              </p>
            </div>
          </div>

          {/* Columna derecha: imagen */}
          <div className="relative h-80 md:h-120 rounded-2xl overflow-hidden border border-border shadow-sm">
            <Image
              src="/assets/Blog.jpg"
              alt="Blog de GOxT"
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
