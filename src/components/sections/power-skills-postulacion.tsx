"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
import { isValidPhoneNumber } from "react-phone-number-input";
import { LoaderIcon, CalendarIcon, CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const PhoneInput = dynamic(() => import("@/components/ui/phone-input").then((m) => m.PhoneInput), { ssr: false });

const CALENDAR_URL = "https://calendar.app.google/1nbeEzv7YSstAzQL8";

const MODALIDADES = [
  { value: "Educativo",   label: "Educativo" },
  { value: "Corporativo", label: "Corporativo" },
  { value: "Abierto",     label: "Abierto" },
];

const ROLES = [
  { value: "Estudiante",    label: "Estudiante" },
  { value: "Profesional",   label: "Profesional" },
  { value: "Emprendedor",   label: "Emprendedor" },
  { value: "Empresa",       label: "Empresa" },
];

const PROYECTOS = [
  { value: "Sí",          label: "Sí" },
  { value: "No",          label: "No" },
  { value: "En desarrollo", label: "En desarrollo" },
];

const schema = z.object({
  name:      z.string().min(2, "Nombre requerido"),
  email:     z.string().email("Correo inválido"),
  phone:     z.string().refine((v) => v.length > 0 && isValidPhoneNumber(v), "Teléfono inválido"),
  company:   z.string().min(2, "Empresa / Institución requerida"),
  modalidad: z.string().min(1, "Selecciona una modalidad"),
  rol:       z.string().min(1, "Selecciona tu rol"),
  proyecto:  z.string().optional(),
  challenge: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function buildNotes(data: FormData): string {
  const lines = [
    `Modalidad: ${data.modalidad}`,
    `Rol: ${data.rol}`,
  ];
  if (data.proyecto) lines.push(`Proyecto en mente: ${data.proyecto}`);
  if (data.challenge?.trim()) lines.push(`Desafío: ${data.challenge.trim()}`);
  return lines.join("\n");
}

export default function PowerSkillsPostulacion() {
  const [submitted, setSubmitted] = useState(false);
  const hasSubmitted = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "", email: "", phone: "+56", company: "",
      modalidad: "", rol: "", proyecto: "", challenge: "",
    },
  });

  const modalidadVal = watch("modalidad");
  const rolVal       = watch("rol");
  const proyectoVal  = watch("proyecto");

  const onSubmit = async (data: FormData) => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    const res = await fetch("/api/postulacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:    data.name,
        email:   data.email,
        phone:   data.phone,
        company: data.company,
        notes:   buildNotes(data),
      }),
    });

    if (!res.ok) {
      hasSubmitted.current = false;
      setError("root", { message: "No pudimos enviar tu postulación. Intenta de nuevo." });
      return;
    }

    setSubmitted(true);
  };

  return (
    <section id="postulacion" className="pt-10 md:pt-16 pb-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row lg:gap-24">

          {/* Columna izquierda */}
          <div className="flex flex-1 flex-col gap-8">
            <div>
              <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
                ¿Listo para dar el siguiente paso?
              </h1>
              <p className="text-muted-foreground">
                Postula al programa y te contactamos en menos de 24 horas.
              </p>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>✓ Programa adaptado a tu modalidad</li>
              <li>✓ Metodología 100% práctica y aplicada</li>
              <li>✓ Conectamos tu proyecto con el ecosistema que importa</li>
            </ul>
          </div>

          {/* Columna derecha — formulario */}
          <div className="flex-1">
            {submitted ? (
              <div className="flex flex-col gap-6 rounded-xl bg-muted/50 p-8 md:p-10 h-full justify-center items-center text-center">
                <CheckCircleIcon className="size-12 text-green-500" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">¡Postulación recibida!</h2>
                  <p className="text-sm text-muted-foreground">
                    Revisaremos tu postulación y te contactaremos en menos de 24 horas.
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
                  <h2 className="text-xl font-semibold">Postulación Power Skills 2026</h2>
                  <p className="text-sm text-muted-foreground">Completa el formulario y nos pondremos en contacto contigo.</p>
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

                  {/* Teléfono */}
                  <Field>
                    <FieldLabel htmlFor="phone">
                      Teléfono <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          value={field.value}
                          onChange={field.onChange}
                          defaultCountry="CL"
                          invalid={!!errors.phone}
                        />
                      )}
                    />
                    <FieldError errors={[errors.phone]} />
                  </Field>

                  {/* Empresa / Institución */}
                  <Field>
                    <FieldLabel htmlFor="company">
                      Empresa / Institución <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="company"
                      aria-invalid={!!errors.company}
                      placeholder="Ej: Universidad de Chile"
                      {...register("company")}
                    />
                    <FieldError errors={[errors.company]} />
                  </Field>

                  {/* Modalidad + Rol */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Modalidad */}
                    <Field>
                      <FieldLabel htmlFor="modalidad">
                        ¿A qué modalidad postulas? <span className="text-destructive">*</span>
                      </FieldLabel>
                      <select
                        id="modalidad"
                        aria-invalid={!!errors.modalidad}
                        className={cn(
                          "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none",
                          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                          !modalidadVal && "text-muted-foreground",
                        )}
                        {...register("modalidad")}
                      >
                        <option value="" disabled hidden>Selecciona una modalidad</option>
                        {MODALIDADES.map((m) => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                      <FieldError errors={[errors.modalidad]} />
                    </Field>

                    {/* Rol */}
                    <Field>
                      <FieldLabel htmlFor="rol">
                        ¿Cuál es tu rol? <span className="text-destructive">*</span>
                      </FieldLabel>
                      <select
                        id="rol"
                        aria-invalid={!!errors.rol}
                        className={cn(
                          "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none",
                          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                          !rolVal && "text-muted-foreground",
                        )}
                        {...register("rol")}
                      >
                        <option value="" disabled hidden>Selecciona tu rol</option>
                        {ROLES.map((r) => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                      <FieldError errors={[errors.rol]} />
                    </Field>
                  </div>

                  {/* Proyecto en mente (opcional) */}
                  <Field>
                    <FieldLabel htmlFor="proyecto">¿Tienes un proyecto en mente? (opcional)</FieldLabel>
                    <select
                      id="proyecto"
                      className={cn(
                        "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none",
                        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        !proyectoVal && "text-muted-foreground",
                      )}
                      {...register("proyecto")}
                    >
                      <option value="">Selecciona una opción</option>
                      {PROYECTOS.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Desafío (opcional) */}
                  <Field>
                    <FieldLabel htmlFor="challenge">Cuéntanos tu desafío (opcional)</FieldLabel>
                    <Textarea
                      id="challenge"
                      placeholder="¿Qué problema quieres resolver?"
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
                      "Postular ahora"
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
