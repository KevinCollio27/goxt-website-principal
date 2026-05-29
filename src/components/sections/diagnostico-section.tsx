"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoaderIcon, CalendarIcon, CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const CALENDAR_URL = "https://calendar.app.google/1nbeEzv7YSstAzQL8";

const SERVICES = [
  { value: "Setup Inicial",  label: "Setup Inicial" },
  { value: "Plataformas",    label: "Plataformas" },
  { value: "Desarrollo",     label: "Desarrollo" },
  { value: "Power Skills",   label: "Power Skills" },
  { value: "Mentoría",       label: "Mentoría" },
];

const schema = z.object({
  name:      z.string().min(2, "Nombre requerido"),
  email:     z.string().email("Correo inválido"),
  company:   z.string().min(2, "Empresa requerida"),
  service:   z.string().min(1, "Selecciona un servicio"),
  challenge: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function buildNotes(data: FormData): string {
  const lines = [`Servicio: ${data.service}`];
  if (data.challenge?.trim()) lines.push(`Desafío: ${data.challenge.trim()}`);
  return lines.join("\n");
}

export default function DiagnosticoSection() {
  const [submitted, setSubmitted] = useState(false);
  const hasSubmitted = useRef(false);
  const searchParams = useSearchParams();

  const serviceParam = SERVICES.find(
    (s) => s.value === searchParams.get("service")
  )?.value ?? "";

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", service: serviceParam, challenge: "" },
  });

  const serviceVal = watch("service");

  const onSubmit = async (data: FormData) => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    const res = await fetch("/api/diagnostico", {
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
                Agendar Diagnóstico
              </h1>
              <p className="text-muted-foreground">
                En 30 minutos identificamos el cuello de botella de tu operación y te mostramos cómo resolverlo.
              </p>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>✓ Diagnóstico personalizado según tu industria</li>
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
                    Estamos preparando tu diagnóstico. Te contactaremos en menos de 24 horas.
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <p className="text-sm font-medium">¿Quieres elegir el horario ahora?</p>
                  <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2">
                      <CalendarIcon className="size-4" />
                      Agendar reunión
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
                  <h2 className="text-xl font-semibold">Agendar Diagnóstico</h2>
                  <p className="text-sm text-muted-foreground">Preparamos tu diagnóstico en menos de 24 horas</p>
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

                  {/* Servicio */}
                  <Field>
                    <FieldLabel htmlFor="service">
                      ¿Qué servicio te interesa? <span className="text-destructive">*</span>
                    </FieldLabel>
                    <select
                      id="service"
                      aria-invalid={!!errors.service}
                      className={cn(
                        "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none",
                        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                        !serviceVal && "text-muted-foreground",
                      )}
                      {...register("service")}
                    >
                      <option value="" disabled hidden>Selecciona un servicio</option>
                      {SERVICES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <FieldError errors={[errors.service]} />
                  </Field>

                  {/* Desafío opcional */}
                  <Field>
                    <FieldLabel htmlFor="challenge">¿Cuéntanos tu desafío? (opcional)</FieldLabel>
                    <Textarea
                      id="challenge"
                      placeholder="Texto libre opcional..."
                      rows={3}
                      {...register("challenge")}
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
                      "Agendar Diagnóstico"
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
