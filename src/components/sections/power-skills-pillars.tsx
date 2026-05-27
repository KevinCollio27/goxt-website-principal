import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Lightbulb, Rocket } from "lucide-react";
import { ReactNode } from "react";

const pillars = [
  {
    id: "human-skills",
    icon: <User className="size-6" aria-hidden />,
    title: "Human Skills",
    description:
      "Comunicación, liderazgo, trabajo en equipo e inteligencia emocional. Las habilidades que ningún algoritmo puede reemplazar.",
  },
  {
    id: "innovacion",
    icon: <Lightbulb className="size-6" aria-hidden />,
    title: "Innovación & Emprendimiento",
    description:
      "Design Thinking, Lean Startup, prototipado y pitch. Herramientas para identificar oportunidades y crear soluciones de impacto.",
  },
  {
    id: "experiencia",
    icon: <Rocket className="size-6" aria-hidden />,
    title: "Experiencia Real",
    description:
      "Proyectos reales con desafíos reales. Validación con usuarios, iteración y Demo Day frente al ecosistema que importa.",
  },
];

export default function PowerSkillsPillars() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto sm:px-16 px-4">
        <div className="flex flex-col gap-3 text-center items-center mb-12">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
            Un programa, tres pilares.
          </Badge>
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Todo lo que necesitas para<br className="hidden md:block" /> enfrentar el mundo real.
          </h2>
          <p className="text-foreground/60 max-w-md">
            No enseñamos teoría. Combinamos habilidades humanas, metodologías reales y experiencia práctica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 *:text-center *:bg-muted">
          {pillars.map((pillar) => (
            <Card key={pillar.id} className="group border-0 shadow-none">
              <CardHeader className="pb-3">
                <CardDecorator>{pillar.icon}</CardDecorator>
                <h3 className="mt-6 font-medium">{pillar.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />
    <div className="bg-muted absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
