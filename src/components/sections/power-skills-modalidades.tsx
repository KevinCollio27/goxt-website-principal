import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Users } from "lucide-react";
import { ReactNode } from "react";

const modalidades = [
  {
    id: "educativo",
    icon: <GraduationCap className="size-6" aria-hidden />,
    title: "Educativo",
    description:
      "Para universidades, institutos y colegios. Integramos el programa en semestres académicos, extracurriculares o a medida.",
    bullets: ["Semestres académicos", "Extracurriculares", "Programas a medida"],
  },
  {
    id: "corporativo",
    icon: <Briefcase className="size-6" aria-hidden />,
    title: "Corporativo",
    description:
      "Para empresas que buscan desarrollar talento interno con metodologías reales de innovación aplicada.",
    bullets: ["Intraemprendimiento", "Innovación abierta", "Team Building"],
  },
  {
    id: "abierto",
    icon: <Users className="size-6" aria-hidden />,
    title: "Abierto",
    description:
      "Para personas que quieren innovar y emprender por su cuenta, a su ritmo.",
    bullets: ["Bootcamps intensivos", "Programas regulares", "Eventos y talleres"],
  },
];

export default function PowerSkillsModalidades() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto sm:px-16 px-4">
        <div className="flex flex-col gap-3 text-center items-center mb-12">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
            Modalidades
          </Badge>
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Flexible, práctico<br className="hidden md:block" /> y transformador.
          </h2>
          <p className="text-foreground/60 max-w-md">
            Power Skills se adapta a tu contexto. Elige la modalidad que mejor se ajusta a tu organización.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 *:bg-muted">
          {modalidades.map((mod) => (
            <Card key={mod.id} className="group border-0 shadow-none">
              <CardHeader className="pb-3 text-center">
                <CardDecorator>{mod.icon}</CardDecorator>
                <h3 className="mt-6 font-medium text-center">{mod.title}</h3>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground text-center">
                  {mod.description}
                </p>
                <ul className="flex flex-col gap-1.5 pt-2 border-t border-border">
                  {mod.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="size-1 rounded-full bg-foreground/40 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
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
