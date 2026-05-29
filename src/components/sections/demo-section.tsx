"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoaderIcon, CalendarIcon, CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const CALENDAR_URL = "https://calendar.app.google/1nbeEzv7YSstAzQL8";

const PRODUCTS = [
  { value: "GOXT CRM",    label: "GOXT CRM" },
  { value: "TMS Cargo",   label: "TMS Cargo" },
  { value: "GONetwork",   label: "GONetwork" },
  { value: "GOXT BI",     label: "GOXT BI" },
  { value: "Power Skills",label: "Power Skills" },
  { value: "No sé aún",   label: "No sé aún" },
];

const TEAM_SIZES = [
  { value: "1–5",    label: "1–5 personas" },
  { value: "5–10",   label: "5–10 personas" },
  { value: "10–20",  label: "10–20 personas" },
  { value: "+20",    label: "Más de 20 personas" },
];

const schema = z.object({
  name:     z.string().min(2, "Nombre requerido"),
  email:    z.string().email("Correo inválido"),
  company:  z.string().min(2, "Empresa requerida"),
  product:  z.string().min(1, "Selecciona un producto"),
  teamSize: z.string().min(1, "Selecciona el tamaño de tu equipo"),
  notes:    z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function buildNotes(data: FormData): string {
  const lines = [
    `Producto: ${data.product}`,
    `Equipo: ${data.teamSize}`,
  ];
  if (data.notes?.trim()) lines.push(`Nota: ${data.notes.trim()}`);
  return lines.join("\n");
}

export default function DemoSection() {
  const [submitted, setSubmitted] = useState(false);
  const hasSubmitted = useRef(false);
  const searchParams = useSearchParams();

  const productParam = PRODUCTS.find(
    (p) => p.value === searchParams.get("product")
  )?.value ?? "";

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", product: productParam, teamSize: "", notes: "" },
  });

  const productVal  = watch("product");
  const teamSizeVal = watch("teamSize");

  const onSubmit = async (data: FormData) => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    const res = await fetch("/api/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:    data.name,
        email:   data.email,
        company: data.company,
        notes:   buildNotes(data),
      }),
    });

    if (!res.ok) {
      hasSubmitted.current = false;
      setError("root", { message: "No pudimos enviar tu solicitud. Intenta de nuevo." });
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className="pt-10 md:pt-16 pb-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row lg:gap-24">

          {/* Columna izquierda */}
          <div className="flex flex-1 flex-col gap-8">
            <div>
              <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
                ¿Listo para ver GOXT en acción?
              </h1>
              <p className="text-muted-foreground">
                En 30 minutos te mostramos cómo GOXT puede ordenar tu operación.
              </p>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>✓ Demo personalizada según tu industria</li>
              <li>✓ Sin instalaciones ni tarjeta de crédito</li>
              <li>✓ Respondemos en menos de 24 horas</li>
            </ul>
          </div>

          {/* Columna derecha — formulario */}
          <div className="flex-1">
            {submitted ? (
              <div className="flex flex-col gap-6 rounded-xl bg-muted/50 p-8 md:p-10 h-full justify-center items-center text-center">
                <CheckCircleIcon className="size-12 text-green-500" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">¡Solicitud recibida!</h2>
                  <p className="text-sm text-muted-foreground">
                    Estamos preparando tu demo. Pronto nos pondremos en contacto.
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <p className="text-sm font-medium">¿Quieres agendar una reunión?</p>
                  <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2">
                      <CalendarIcon className="size-4" />
                      Agendar demo
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 rounded-xl bg-muted/50 p-8 md:p-10"
              >
                <div>
                  <h2 className="text-xl font-semibold">Solicitar Demo</h2>
                  <p className="text-sm text-muted-foreground">Preparamos tu demo en menos de 24 horas</p>
                </div>

                <FieldGroup>
                  {/* Nombre */}
                  <Field>
                    <FieldLabel htmlFor="name">
                      Nombre completo <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="name"
                      aria-invalid={!!errors.name}
                      placeholder="Ej: Juan Pérez"
                      {...register("name")}
                    />
                    <FieldError errors={[errors.name]} />
                  </Field>

                  {/* Email */}
                  <Field>
                    <FieldLabel htmlFor="email">
                      Correo electrónico <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      aria-invalid={!!errors.email}
                      placeholder="Ej: juan@empresa.cl"
                      {...register("email")}
                    />
                    <FieldError errors={[errors.email]} />
                  </Field>

                  {/* Empresa */}
                  <Field>
                    <FieldLabel htmlFor="company">
                      Empresa <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="company"
                      aria-invalid={!!errors.company}
                      placeholder="Ej: GOxT SpA"
                      {...register("company")}
                    />
                    <FieldError errors={[errors.company]} />
                  </Field>

                  {/* Producto + Tamaño de equipo */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Producto */}
                    <Field>
                      <FieldLabel htmlFor="product">
                        ¿Qué producto te interesa? <span className="text-destructive">*</span>
                      </FieldLabel>
                      <select
                        id="product"
                        aria-invalid={!!errors.product}
                        className={cn(
                          "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none",
                          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                          !productVal && "text-muted-foreground",
                        )}
                        {...register("product")}
                      >
                        <option value="" disabled hidden>Selecciona un producto</option>
                        {PRODUCTS.map((p) => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                      <FieldError errors={[errors.product]} />
                    </Field>

                    {/* Tamaño equipo */}
                    <Field>
                      <FieldLabel htmlFor="teamSize">
                        ¿Personas en tu Equipo? <span className="text-destructive">*</span>
                      </FieldLabel>
                      <select
                        id="teamSize"
                        aria-invalid={!!errors.teamSize}
                        className={cn(
                          "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none",
                          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                          !teamSizeVal && "text-muted-foreground",
                        )}
                        {...register("teamSize")}
                      >
                        <option value="" disabled hidden>Selecciona un rango</option>
                        {TEAM_SIZES.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                      <FieldError errors={[errors.teamSize]} />
                    </Field>
                  </div>

                  {/* Nota opcional */}
                  <Field>
                    <FieldLabel htmlFor="notes">Nota (opcional)</FieldLabel>
                    <Textarea
                      id="notes"
                      placeholder="¿Hay algo específico que quieras ver en la demo?"
                      rows={3}
                      {...register("notes")}
                    />
                  </Field>

                  {errors.root && (
                    <p className="text-sm text-destructive">{errors.root.message}</p>
                  )}

                  <Button
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderIcon className="mr-2 size-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Solicitar Demo"
                    )}
                  </Button>
                </FieldGroup>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
