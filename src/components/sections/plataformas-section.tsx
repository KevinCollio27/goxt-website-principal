"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, Flame, Clock } from "lucide-react";
import { motion, type Variants } from "motion/react";

type Plataforma = {
  badge: string;
  name: string;
  description: string;
  features: string[];
  featured: boolean;
  comingSoon: boolean;
  href: string;
};

const plataformas: Plataforma[] = [
  {
    badge: "CRM",
    name: "GOxT CRM",
    description: "Gestión comercial desde el primer contacto hasta el cierre.",
    features: [
      "Pipeline visual Kanban",
      "Cotizaciones en minutos",
      "Seguimiento automático de oportunidades",
      "Agente IA integrado",
    ],
    featured: false,
    comingSoon: false,
    href: "https://crm.goxt.io",
  },
  {
    badge: "Más Usado",
    name: "TMS GONetwork",
    description: "La red que conecta transportistas y generadores de carga en tiempo real.",
    features: [
      "Red colaborativa de transporte",
      "Visibilidad total de tu flota",
      "Gestión de despachos en tiempo real",
      "Trazabilidad de carga completa",
    ],
    featured: true,
    comingSoon: false,
    href: "https://network.goxt.io",
  },
  {
    badge: "TMS",
    name: "TMS Cargo",
    description: "Software especializado para dadores de carga.",
    features: [
      "Digitalización del proceso logístico",
      "Control de contratos de transporte",
      "Seguimiento de despachos",
      "Integrado con GONetwork",
    ],
    featured: false,
    comingSoon: false,
    href: "https://cargo.goxt.io",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function PlataformasSection() {
  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">

        {/* Header */}
        <div className="flex flex-col gap-3 text-center items-center mb-12">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
            Plataformas
          </Badge>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
            Accede a tu ecosistema GOxT.
          </h2>
          <p className="text-muted-foreground max-w-xl">
            CRM, logística e inteligencia de negocio — todo conectado.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plataformas.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className={cn(
                "relative flex flex-col",
                plan.featured && "z-10 scale-[1.02]"
              )}
            >
              {/* Borde animado card destacada */}
              {plan.featured && (
                <div className="absolute -inset-0.5 rounded-2xl overflow-hidden">
                  <div className="absolute -inset-full blur-xs animate-spin animation-duration-[2s] bg-conic from-blue-500 via-red-500 to-teal-400" />
                  <div className="absolute inset-0.5 rounded-2xl bg-card" />
                </div>
              )}

              <Card
                className={cn(
                  "relative flex-1 flex flex-col rounded-2xl p-6 gap-6",
                  plan.featured ? "border-0 ring-0" : "border border-border",
                  plan.comingSoon && "opacity-60"
                )}
              >
                <CardHeader className="p-0">
                  <div className="flex flex-col gap-3">
                    <Badge
                      className={cn(
                        "text-xs h-auto py-0.5 px-2 border-0 w-fit",
                        plan.featured && "flex items-center gap-1",
                        plan.comingSoon && "flex items-center gap-1"
                      )}
                    >
                      {plan.featured && <Flame className="size-3" />}
                      {plan.comingSoon && <Clock className="size-3" />}
                      {plan.badge}
                    </Badge>
                    <CardTitle className="text-lg font-medium">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {plan.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 gap-6 p-0">
                  <Separator />
                  <ul className="flex flex-col gap-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="size-4 text-primary shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {plan.comingSoon ? (
                    <Button
                      variant="outline"
                      className="w-full h-10 cursor-not-allowed opacity-50"
                      disabled
                    >
                      Próximamente
                    </Button>
                  ) : (
                    <a href={plan.href} target="_blank" rel="noopener noreferrer">
                      <Button
                        className="w-full h-10 cursor-pointer"
                        variant={plan.featured ? "default" : "outline"}
                      >
                        Iniciar Sesión
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
