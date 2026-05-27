"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_URL = "https://calendar.app.google/1nbeEzv7YSstAzQL8";

const solutions = [
  {
    id: "crm",
    label: "CRM: De Leads a Clientes",
    description:
      "¿Sigues perdiendo ventas porque nadie da seguimiento a tiempo? Pipeline visual, cotizaciones en minutos y seguimiento automático desde el primer contacto.",
    cta: "Solicitar Demo",
    href: DEMO_URL,
    image: "/assets/features/CRM.jpg",
    alt: "GOxT CRM",
  },
  {
    id: "cargo",
    label: "Cargo: Del Despacho a la Entrega",
    description:
      "¿No sabes dónde está tu carga ni en qué estado va cada despacho? Tracking en tiempo real, documentos digitales y alertas automáticas sin llamadas.",
    cta: "Solicitar Demo",
    href: DEMO_URL,
    image: "/assets/features/Cargo.jpg",
    alt: "GOxT Cargo",
  },
  {
    id: "network",
    label: "Network: Tus Clientes, Siempre Informados",
    description:
      "¿Tus clientes te llaman para saber el estado de su pedido? Comparte trazabilidad en tiempo real sin correos ni llamadas de seguimiento.",
    cta: "Solicitar Demo",
    href: DEMO_URL,
    image: "/assets/features/Network.jpg",
    alt: "GOxT Network",
  },
  {
    id: "bi",
    label: "BI: Decisiones con Datos Reales",
    description:
      "¿Tomas decisiones sin datos concretos? Dashboards automáticos con los KPIs que importan — ventas, logística y operaciones en un solo panel.",
    cta: "Solicitar Demo",
    href: DEMO_URL,
    image: "/assets/features/BI.jpg",
    alt: "GOxT BI",
  },
];

export default function SolutionsAccordion() {
  const [activeId, setActiveId] = useState<string>("crm");

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit mb-4">
            Nuestras Soluciones
          </Badge>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Todo lo que necesita tu operación,<br className="hidden md:block" /> en un solo lugar.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cuatro productos que trabajan juntos para eliminar el caos operacional.
            Elige el que necesitas hoy, escala cuando quieras.
          </p>
        </div>

        {/* Accordion + Image */}
        <div className="flex w-full items-start gap-12">

          {/* Left: Accordion */}
          <div className="w-full md:w-1/2">
            <Accordion
              type="single"
              className="w-full"
              defaultValue="crm"
              onValueChange={(value) => {
                if (value) setActiveId(value);
              }}
            >
              {solutions.map((solution) => {
                const isActive = activeId === solution.id;
                return (
                  <AccordionItem
                    key={solution.id}
                    value={solution.id}
                    className="border-b-0!"
                  >
                    <AccordionTrigger className="cursor-pointer py-5 no-underline! hover:no-underline! transition">
                      <span
                        className={cn(
                          "text-xl font-medium transition-colors",
                          isActive ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {solution.label}
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="pb-4">
                      <div className="flex flex-col gap-5">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {solution.description}
                        </p>
                        <button
                          type="button"
                          onClick={() => window.open(solution.href, "_blank")}
                          className="relative inline-flex items-center text-sm font-medium rounded-full h-10 p-1 ps-5 pe-11 group transition-all duration-500 hover:ps-11 hover:pe-5 w-fit overflow-hidden cursor-pointer bg-primary text-primary-foreground"
                        >
                          <span className="relative z-10 transition-all duration-500">
                            {solution.cta}
                          </span>
                          <span className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
                            <ArrowUpRight size={14} />
                          </span>
                        </button>

                        {/* Imagen visible solo en mobile */}
                        <div className="mt-2 md:hidden relative h-56 rounded-xl overflow-hidden border border-border shadow-sm">
                          <Image
                            src={solution.image}
                            alt={solution.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-center"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Right: Imagen sticky */}
          <div className="hidden md:block w-1/2 sticky top-24 self-start">
            <div className="relative h-120 rounded-2xl overflow-hidden border border-border shadow-sm">
              {solutions.map((solution) => (
                <Image
                  key={solution.id}
                  src={solution.image}
                  alt={solution.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={cn(
                    "object-cover object-center transition-opacity duration-500",
                    activeId === solution.id ? "opacity-100" : "opacity-0"
                  )}
                  priority={solution.id === "crm"}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
