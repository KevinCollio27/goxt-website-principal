import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "+100", label: "Mentores y expertos" },
  { value: "+50",  label: "Empresas aliadas" },
  { value: "+200", label: "Proyectos impulsados" },
  { value: "+15",  label: "Sectores impactados" },
];

export default function PowerSkillsEcosistemaStats() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="flex flex-col gap-4">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
            Ecosistema
          </Badge>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            No estás solo en esto.
          </h2>
          <p className="text-muted-foreground">
            Un ecosistema de aliados que potencia cada proyecto desde el primer día.
          </p>
        </div>

        <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col gap-5">
              <span className="text-6xl font-bold">{stat.value}</span>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
