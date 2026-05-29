"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Flame } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const plans = [
  {
    badge: "El Más Consultado",
    name: "Power Skills",
    service: "Power Skills",
    description: "Programas de formación, bootcamps y talleres para que tu equipo adopte tecnología con criterio.",
    features: [
      "Bootcamps intensivos",
      "Talleres por área o rol",
      "Programas corporativos a medida",
      "Certificación de participantes",
      "Modalidad presencial u online",
    ],
    featured: true,
  },
  {
    badge: "Acompañamiento",
    name: "Mentoría & Incubación",
    service: "Mentoría",
    description: "Acompañamos el escalamiento de tu proyecto con mentoría estratégica y soporte en cada etapa.",
    features: [
      "Sesiones de mentoría recurrentes",
      "Revisión de modelo de negocio",
      "Roadmap de crecimiento",
      "Red de contactos GOxT",
      "Seguimiento de KPIs",
    ],
    featured: false,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

export default function FormacionSection() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">

        {/* Header */}
        <div className="flex flex-col gap-3 text-center items-center mb-12">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
            Aprende & Escala
          </Badge>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
            Potencia a tu equipo y tu negocio.
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Programas diseñados para equipos que quieren escalar con tecnología.
          </p>
        </div>

        {/* Cards — centradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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

              <Card
                className={cn(
                  "relative flex-1 flex flex-col rounded-2xl p-6 gap-6",
                  plan.featured ? "border-0 ring-0" : "border border-border"
                )}
              >
                <CardHeader className="p-0">
                  <div className="flex flex-col gap-3">
                    <Badge
                      className={cn(
                        "text-xs h-auto py-0.5 px-2 border-0 w-fit",
                        plan.featured && "flex items-center gap-1"
                      )}
                    >
                      {plan.featured && <Flame className="size-3" />}
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
                  <a href={`/diagnostico?service=${encodeURIComponent(plan.service)}`}>
                    <Button
                      className="w-full h-10 cursor-pointer"
                      variant={plan.featured ? "default" : "outline"}
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
