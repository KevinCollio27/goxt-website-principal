"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
import { isValidPhoneNumber } from "react-phone-number-input";
import { GlobeIcon, LoaderIcon, MailIcon, PhoneIcon, CalendarIcon, CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const PhoneInput = dynamic(
  () => import("@/components/ui/phone-input").then((m) => ({ default: m.PhoneInput })),
  {
    ssr: false,
    loading: () => <div className="h-10 w-full rounded-md border border-input bg-background animate-pulse" />,
  },
);

const CALENDAR_URL = "https://calendar.app.google/1nbeEzv7YSstAzQL8";

const schema = z.object({
  name:     z.string().min(2, "Nombre requerido"),
  email:    z.string().email("Correo inválido"),
  phone:    z.string().refine((v) => v.length > 0 && isValidPhoneNumber(v), "Teléfono inválido"),
  company:  z.string().min(2, "Empresa requerida"),
  industry: z.string().optional(),
  message:  z.string().min(10, "Cuéntanos un poco más (mín. 10 caracteres)"),
});

type FormData = z.infer<typeof schema>;

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const hasSubmitted = useRef(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "+56", company: "", industry: "", message: "" },
  });

  const onSubmit = async (data: FormData) => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:     data.name,
        email:    data.email,
        phone:    data.phone,
        company:  data.company  || undefined,
        industry: data.industry || undefined,
        message:  data.message,
      }),
    });

    if (!res.ok) {
      hasSubmitted.current = false; // allow retry on error
      form.setError("root", { message: "No pudimos enviar tu mensaje. Intenta de nuevo." });
      return;
    }

    setSubmitted(true);
    form.reset();
  };

  return (
    <section className="pt-10 md:pt-16 pb-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row lg:gap-24">

          {/* Columna izquierda */}
          <div className="flex flex-1 flex-col gap-10">
            <div>
              <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
                ¿Hablamos de tu operación?
              </h1>
              <p className="text-muted-foreground">
                Cuéntanos qué está frenando tu negocio hoy.
                En 30 minutos te mostramos si GOxT puede
                ordenarlo — sin compromiso, sin PowerPoint.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <a href="https://wa.me/56929184887" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                <PhoneIcon className="size-5 text-muted-foreground" />
                <span className="group-hover:underline">+56 9 2918 4887</span>
              </a>
              <a href="mailto:contacto@goxt.io" className="group flex items-center gap-3">
                <MailIcon className="size-5 text-muted-foreground" />
                <span className="group-hover:underline">contacto@goxt.io</span>
              </a>
              <a href="https://goxt.io" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                <GlobeIcon className="size-5 text-muted-foreground" />
                <span className="group-hover:underline">goxt.io</span>
              </a>
            </div>
          </div>

          {/* Columna derecha — formulario */}
          <div className="flex-1">
            {submitted ? (
              /* Estado de éxito */
              <div className="flex flex-col gap-6 rounded-xl bg-muted/50 p-8 md:p-10 h-full justify-center items-center text-center">
                <CheckCircleIcon className="size-12 text-green-500" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">¡Recibimos tu mensaje!</h2>
                  <p className="text-sm text-muted-foreground">
                    Te contactaremos en menos de 24 horas.
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <p className="text-sm font-medium">¿Quieres agendar una reunión ahora?</p>
                  <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2">
                      <CalendarIcon className="size-4" />
                      Agendar reunión
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    className="w-full text-muted-foreground"
                    onClick={() => setSubmitted(false)}
                  >
                    Volver al formulario
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 rounded-xl bg-muted/50 p-8 md:p-10"
              >
                <div>
                  <h2 className="text-xl font-semibold">Envíanos un mensaje</h2>
                  <p className="text-sm text-muted-foreground">Respondemos en menos de 24 horas</p>
                </div>

                <FieldGroup>
                  {/* Nombre */}
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="name">
                          Nombre completo <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Ej: Juan Pérez"
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  {/* Email */}
                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="email">
                          Correo electrónico <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="Ej: juan@empresa.cl"
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  {/* Teléfono */}
                  <Controller
                    control={form.control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>
                          Teléfono <span className="text-destructive">*</span>
                        </FieldLabel>
                        <PhoneInput
                          international
                          defaultCountry="CL"
                          value={field.value}
                          onChange={(val) => field.onChange(val || "")}
                          invalid={fieldState.invalid}
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  {/* Empresa e Industria */}
                  <div className={cn("grid gap-4 sm:grid-cols-2")}>
                    <Controller
                      control={form.control}
                      name="company"
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="company">
                            Empresa <span className="text-destructive">*</span>
                          </FieldLabel>
                          <Input
                            {...field}
                            id="company"
                            aria-invalid={fieldState.invalid}
                            placeholder="GOxT SpA"
                          />
                          <FieldError errors={[fieldState.error]} />
                        </Field>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <Field>
                          <FieldLabel htmlFor="industry">Industria</FieldLabel>
                          <Input
                            {...field}
                            id="industry"
                            placeholder="Logística, Retail..."
                          />
                        </Field>
                      )}
                    />
                  </div>

                  {/* Mensaje */}
                  <Controller
                    control={form.control}
                    name="message"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="message">
                          ¿En qué podemos ayudarte? <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="message"
                          aria-invalid={fieldState.invalid}
                          placeholder="Cuéntanos el desafío de tu operación..."
                          rows={4}
                        />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  {form.formState.errors.root && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.root.message}
                    </p>
                  )}

                  <Button
                    size="lg"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <LoaderIcon className="mr-2 size-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar mensaje"
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
