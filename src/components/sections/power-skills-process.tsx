import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    step: "01",
    label: "DESCUBRIR",
    description: "Entendemos el problema y las oportunidades reales del entorno.",
  },
  {
    step: "02",
    label: "IDEAR",
    description: "Generamos ideas innovadoras con pensamiento creativo y trabajo en equipo.",
  },
  {
    step: "03",
    label: "PROTOTIPAR",
    description: "Construimos soluciones rápidas y medibles (MVP funcional).",
  },
  {
    step: "04",
    label: "VALIDAR",
    description: "Probamos con usuarios reales y ajustamos con datos concretos.",
  },
  {
    step: "05",
    label: "PRESENTAR",
    description: "Demo Day: presentamos al mercado, empresas e inversores del ecosistema.",
  },
];

export default function PowerSkillsProcess() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">

          {/* Columna izquierda sticky */}
          <div className="top-28 col-span-2 h-fit space-y-4 py-8 lg:sticky">
            <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
              Metodología
            </Badge>
            <h2 className="text-4xl font-semibold lg:text-5xl tracking-tight leading-tight">
              Aprender haciendo.
            </h2>
            <p className="text-muted-foreground">
              Un modelo práctico que combina innovación con desarrollo de habilidades.
            </p>
            <Link
              href="#"
              className="flex items-center gap-1.5 text-sm font-bold hover:underline underline-offset-4 w-fit"
            >
              Ver más detalle
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Lista de pasos */}
          <ul className="relative col-span-4 w-full lg:pl-8">
            {steps.map((step, index) => (
              <li
                key={index}
                className="relative flex flex-col justify-between gap-6 border-t border-border py-8 md:flex-row lg:py-10"
              >
                <StepCorner className="absolute top-4 right-0 text-border" />

                <div className="flex size-12 items-center justify-center bg-muted text-sm font-medium tracking-tighter shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                    {step.label}
                  </p>
                  <p className="text-foreground/70 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}

const StepCorner = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="22"
    height="20"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="0.607422" y1="2.57422" x2="21.5762" y2="2.57422" stroke="currentColor" strokeWidth="4" />
    <line x1="19.5762" y1="19.624" x2="19.5762" y2="4.57422" stroke="currentColor" strokeWidth="4" />
  </svg>
);
