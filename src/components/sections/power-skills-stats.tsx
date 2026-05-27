import { ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    id: "stat-1",
    value: "50%",
    label: "de los trabajadores necesitarán nuevas habilidades antes de 2030",
  },
  {
    id: "stat-2",
    value: "85%",
    label: "del éxito profesional se explica por habilidades blandas",
  },
  {
    id: "stat-3",
    value: "+40%",
    label: "de jóvenes no se sienten preparados para el mundo laboral",
  },
  {
    id: "stat-4",
    value: "1 de 2",
    label: "empresas no encuentra el talento que necesita para innovar",
  },
];

export default function PowerSkillsStats() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            El problema es real.
          </h2>
          <p className="text-muted-foreground">
            La brecha entre educación y mercado laboral no para de crecer.
          </p>
          <Link
            href="#"
            className="flex items-center gap-1.5 text-sm font-bold hover:underline underline-offset-4 w-fit"
          >
            Ver más datos
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-5">
              <span className="text-6xl font-bold">{stat.value}</span>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
