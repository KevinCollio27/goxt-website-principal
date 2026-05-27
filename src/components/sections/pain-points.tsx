"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileSpreadsheet, Truck, Bot, Rocket, ArrowUpRight } from 'lucide-react'
import { ReactNode } from 'react'

const DEMO_URL = "https://calendar.app.google/1nbeEzv7YSstAzQL8";

const challenges = [
  {
    badge: "CRM",
    icon: <FileSpreadsheet className="size-6" aria-hidden />,
    title: "Pierdo tiempo en procesos manuales",
    description: "Excel, WhatsApp, correos y desorden operativo. Tu equipo gasta horas en tareas que deberían tardar minutos.",
    cta: "Quiero ordenarme",
  },
  {
    badge: "Cargo",
    icon: <Truck className="size-6" aria-hidden />,
    title: "Necesito controlar mi operación logística",
    description: "Falta trazabilidad, seguimiento y control en tiempo real. No sabes dónde está tu carga ni en qué estado va cada despacho.",
    cta: "Controlar mi flota",
  },
  {
    badge: "BI",
    icon: <Bot className="size-6" aria-hidden />,
    title: "Quiero implementar IA en mi negocio",
    description: "La IA parece compleja pero puede ayudarte desde hoy. Automatiza tareas, mejora decisiones y gana ventaja.",
    cta: "Mejorar decisiones",
  },
  {
    badge: "Power Skills",
    icon: <Rocket className="size-6" aria-hidden />,
    title: "Tengo un proyecto y quiero escalar",
    description: "Tienes una idea o emprendimiento que necesita crecer. La tecnología correcta marca la diferencia.",
    cta: "Quiero crecer",
  },
]

export default function PainPoints() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3 text-center items-center mb-12">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
            Desafíos
          </Badge>
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            ¿Qué desafío quieres resolver hoy?
          </h2>
          <p className="text-foreground/60 max-w-xl">
            Elige tu desafío y te mostraremos cómo podemos ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.title} className="group border-0 shadow-none *:bg-muted text-center bg-muted flex flex-col">
              <CardHeader className="pb-3">
                <CardDecorator>{challenge.icon}</CardDecorator>
                <div className="mt-6 flex flex-col items-center gap-2">
                  <Badge className="text-xs h-auto py-0.5 px-2 border-0 w-fit">
                    {challenge.badge}
                  </Badge>
                  <h3 className="font-medium text-base">{challenge.title}</h3>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 flex-1">
                <p className="text-sm text-foreground/60 flex-1">{challenge.description}</p>
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    className="relative text-sm font-medium rounded-full h-9 p-1 ps-4 pe-11 group/btn transition-all duration-500 hover:ps-11 hover:pe-4 w-fit overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10 transition-all duration-500">{challenge.cta}</span>
                    <span className="absolute right-1 w-7 h-7 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover/btn:right-[calc(100%-32px)] group-hover/btn:rotate-45">
                      <ArrowUpRight size={13} />
                    </span>
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] dark:opacity-50"
    />
    <div className="bg-muted absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
  </div>
)
