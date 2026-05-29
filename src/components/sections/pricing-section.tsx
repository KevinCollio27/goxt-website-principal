"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, Flame } from "lucide-react";
import { motion, type Variants } from "motion/react";

type Plan = {
  badge: string;
  name: string;
  service: string;
  description: string;
  features: string[];
  featured: boolean;
  highlighted: boolean;
};

const plans: Plan[] = [
  {
    badge: "Implementación",
    name: "Setup Inicial",
    service: "Setup Inicial",
    description: "Configuramos tu entorno de trabajo desde cero para que tu equipo opere desde el día uno.",
    features: [
      "Configuración del espacio de trabajo",
      "Parametrización según tu operación",
      "Capacitación al equipo",
      "Flujos y procesos definidos",
      "Acompañamiento en el arranque",
    ],
    featured: false,
    highlighted: false,
  },
  {
    badge: "Más Solicitado",
    name: "Plataformas",
    service: "Plataformas",
    description: "Accede a las herramientas que tu operación necesita. Fee mensual por usuario, según el producto que uses.",
    features: [
      "CRM para gestión comercial",
      "CARGO para operaciones logísticas",
      "BI para inteligencia de negocio",
      "Actualizaciones continuas incluidas",
      "Soporte técnico base",
    ],
    featured: true,
    highlighted: false,
  },
  {
    badge: "Desarrollo",
    name: "Desarrollo",
    service: "Desarrollo",
    description: "Construimos o adaptamos soluciones tecnológicas específicas para los desafíos de tu operación.",
    features: [
      "Diagnóstico técnico previo",
      "Desarrollo de integraciones",
      "Automatizaciones de procesos",
      "Módulos personalizados",
      "Iteración continua post-entrega",
    ],
    featured: false,
    highlighted: false,
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

export default function PricingSection() {
  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">

        {/* Header */}
        <div className="flex flex-col gap-3 text-center items-center mb-12">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
            Plataforma & Servicios
          </Badge>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
            Elige cómo trabajar con nosotros.
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Cada operación es distinta — armamos la solución contigo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
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

              {/* Borde primario card highlighted */}
              {plan.highlighted && (
                <div className="absolute -inset-px rounded-2xl border-2 border-primary" />
              )}

              <Card
                className={cn(
                  "relative flex-1 flex flex-col rounded-2xl p-6 gap-6",
                  plan.featured ? "border-0 ring-0" : "border border-border",
                  plan.highlighted && "border-0"
                )}
              >
                <CardHeader className="p-0">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <Badge
                        className={cn(
                          "text-xs h-auto py-0.5 px-2 border-0 w-fit",
                          plan.featured && "flex items-center gap-1"
                        )}
                      >
                        {plan.featured && <Flame className="size-3" />}
                        {plan.badge}
                      </Badge>
                    </div>
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
                  <a href={`/diagnostico?service=${encodeURIComponent(plan.service)}`}>
                    <Button
                      className="w-full h-10 cursor-pointer"
                      variant={plan.featured || plan.highlighted ? "default" : "outline"}
                    >
                      Agendar diagnóstico
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
