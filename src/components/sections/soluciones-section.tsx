"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function SolucionesSection() {
  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Columna izquierda: contenido */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
                Nuestras Soluciones
              </Badge>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                Tecnología que resuelve<br className="hidden md:block" /> problemas reales.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Elige la solución que necesita tu operación hoy.<br className="hidden md:block" />
                Cada producto está diseñado para un dolor específico.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                asChild
                className="relative text-sm font-medium rounded-full h-10 p-1 ps-5 pe-11 group transition-all duration-500 hover:ps-11 hover:pe-5 w-fit overflow-hidden cursor-pointer"
              >
                <a href="/demo">
                  <span className="relative z-10 transition-all duration-500">Solicitar Demo</span>
                  <span className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
                    <ArrowUpRight size={14} />
                  </span>
                </a>
              </Button>
            </div>
          </div>

          {/* Columna derecha: imagen */}
          <div className="relative h-120 rounded-2xl overflow-hidden border border-border shadow-sm">
            <Image
              src="/assets/CRM - Hero.jpg"
              alt="Soluciones GOxT"
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
