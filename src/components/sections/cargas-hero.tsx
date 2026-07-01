"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
import { isValidPhoneNumber } from "react-phone-number-input";
import { CalendarIcon, CheckCircleIcon, ChevronDownIcon, LoaderIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { clients } from "./brand-slider";

const PhoneInput = dynamic(
  () => import("@/components/ui/phone-input").then((m) => ({ default: m.PhoneInput })),
  {
    ssr: false,
    loading: () => <div className="h-10 w-full rounded-md border border-input bg-background animate-pulse" />,
  },
);

const CALENDAR_URL = "https://calendar.app.google/1nbeEzv7YSstAzQL8";

const STATS = [
  {
    id: "perfiles",
    value: "3 perfiles",
    label: "Conectamos transportistas, generadores y conductores para crecer su operación.",
  },
  {
    id: "precio",
    value: "Desde UF 3",
    label: "Plan Emprende, para transportistas de 1 a 5 camiones.",
  },
  {
    id: "respuesta",
    value: "<24h",
    label: "Respondemos y agendamos tu reunión en menos de 24 horas.",
  },
];

const REGIONES = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana de Santiago",
  "Libertador Gral. Bernardo O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén del Gral. Carlos Ibáñez del Campo",
  "Magallanes y de la Antártica Chilena",
];

const CAMIONES_OPTS = ["1 a 5", "6 a 25", "26 a 100", "Más de 100"] as const;
const TIPO_EQUIPO_OPTS = [
  { value: "cerrado", label: "Cerrado" },
  { value: "camion", label: "Camión" },
  { value: "refrigerado", label: "Refrigerado" },
  { value: "rampla_plana", label: "Rampla Plana" },
  { value: "rampla_cerrada", label: "Rampla Cerrada" },
  { value: "furgonado", label: "Furgonado" },
  { value: "otro", label: "Otro" },
];
const TIPO_CARGA_OPTS = ["General", "Refrigerada", "Peligrosa", "Otra"] as const;
const VOLUMEN_UNIDAD_OPTS = ["kg/mes", "ton/mes", "pallets/mes", "viajes/mes"] as const;
const FRECUENCIA_OPTS = ["Diario", "Semanal", "Mensual", "Eventual"] as const;
const LICENCIA_OPTS = ["A2", "A3", "A4", "A5"] as const;
const BUSCA_OPTS = ["Vehículo propio", "Unirme a una flota"] as const;

const formatThousands = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  return digits ? Number(digits).toLocaleString("es-CL") : "";
};

const PERFILES = [
  { value: "transportista", label: "Soy Transportista y busco carga" },
  { value: "cliente", label: "Soy Cliente y busco mover carga" },
  { value: "conductor", label: "Soy Conductor y busco equipos" },
] as const;

const schema = z
  .object({
    name:  z.string().min(2, "Nombre requerido"),
    email: z.string().email("Correo inválido"),
    phone: z.string().refine((v) => v.length > 0 && isValidPhoneNumber(v), "Teléfono inválido"),
    perfil: z.enum(["transportista", "cliente", "conductor"], { message: "Selecciona una opción" }),
    consent: z.literal(true, { message: "Debes aceptar el uso de tus datos" }),

    // Transportista
    company:       z.string().optional(),
    region:        z.string().optional(),
    camiones:      z.string().optional(),
    tipoEquipo:    z.array(z.string()).optional(),
    tipoEquipoOtro: z.string().optional(),

    // Cliente
    companyCliente: z.string().optional(),
    origen:         z.string().optional(),
    destino:        z.string().optional(),
    tipoCarga:      z.string().optional(),
    volumen:        z.string().optional(),
    volumenUnidad:  z.string().optional(),
    frecuencia:     z.string().optional(),

    // Conductor
    licencia:          z.string().optional(),
    experiencia:       z.string().optional(),
    busca:             z.string().optional(),
    regionConductor:   z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.perfil === "transportista") {
      if (!data.region) ctx.addIssue({ code: "custom", path: ["region"], message: "Selecciona una región" });
      if (!data.camiones) ctx.addIssue({ code: "custom", path: ["camiones"], message: "Selecciona un rango" });
      if (!data.tipoEquipo || data.tipoEquipo.length === 0)
        ctx.addIssue({ code: "custom", path: ["tipoEquipo"], message: "Selecciona al menos un tipo de equipo" });
      if (data.tipoEquipo?.includes("otro") && !data.tipoEquipoOtro)
        ctx.addIssue({ code: "custom", path: ["tipoEquipoOtro"], message: "Especifica el tipo de equipo" });
    }
    if (data.perfil === "cliente") {
      if (!data.companyCliente) ctx.addIssue({ code: "custom", path: ["companyCliente"], message: "Empresa requerida" });
      if (!data.origen) ctx.addIssue({ code: "custom", path: ["origen"], message: "Selecciona el origen" });
      if (!data.destino) ctx.addIssue({ code: "custom", path: ["destino"], message: "Selecciona el destino" });
      if (!data.tipoCarga) ctx.addIssue({ code: "custom", path: ["tipoCarga"], message: "Selecciona el tipo de carga" });
      if (!data.volumen) ctx.addIssue({ code: "custom", path: ["volumen"], message: "Ingresa el volumen o tonelaje" });
      if (!data.frecuencia) ctx.addIssue({ code: "custom", path: ["frecuencia"], message: "Selecciona la frecuencia" });
    }
    if (data.perfil === "conductor") {
      if (!data.licencia) ctx.addIssue({ code: "custom", path: ["licencia"], message: "Selecciona tu clase de licencia" });
      if (!data.experiencia) ctx.addIssue({ code: "custom", path: ["experiencia"], message: "Ingresa tus años de experiencia" });
      if (!data.busca) ctx.addIssue({ code: "custom", path: ["busca"], message: "Selecciona una opción" });
      if (!data.regionConductor) ctx.addIssue({ code: "custom", path: ["regionConductor"], message: "Selecciona una región" });
    }
  });

type FormData = z.infer<typeof schema>;

function EquipmentMultiSelect({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const toggle = (optValue: string) => {
    onChange(
      value.includes(optValue)
        ? value.filter((v) => v !== optValue)
        : [...value, optValue],
    );
  };

  const label =
    value.length === 0
      ? "Selecciona uno o más"
      : TIPO_EQUIPO_OPTS.filter((o) => value.includes(o.value)).map((o) => o.label).join(", ");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between font-normal"
        >
          <span className="truncate text-left text-muted-foreground data-[has-value=true]:text-foreground" data-has-value={value.length > 0}>
            {label}
          </span>
          <ChevronDownIcon className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {TIPO_EQUIPO_OPTS.map((opt) => {
                const checked = value.includes(opt.value);
                return (
                  <CommandItem
                    key={opt.value}
                    onSelect={() => toggle(opt.value)}
                    className="cursor-pointer"
                  >
                    <Checkbox checked={checked} className="pointer-events-none" />
                    {opt.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function CargasHero() {
  const [submitted, setSubmitted] = useState(false);
  const hasSubmitted = useRef(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "", email: "", phone: "+56",
      perfil: undefined,
      consent: undefined,
      company: "", region: "", camiones: "", tipoEquipo: [], tipoEquipoOtro: "",
      companyCliente: "", origen: "", destino: "", tipoCarga: "", volumen: "", volumenUnidad: "kg/mes", frecuencia: "",
      licencia: "", experiencia: "", busca: "", regionConductor: "",
    },
  });

  const perfil = form.watch("perfil");

  const onSubmit = async (data: FormData) => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    const res = await fetch("/api/cargas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      hasSubmitted.current = false; // allow retry on error
      form.setError("root", { message: "No pudimos enviar tu solicitud. Intenta de nuevo." });
      return;
    }

    setSubmitted(true);
    form.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="pt-10 md:pt-16 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Columna izquierda: contenido */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
                Tecnología logística para Chile &amp; Latinoamérica
              </Badge>
              <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
                Más carga.
                <br />
                Más control.
                <br />
                Más crecimiento.
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                La plataforma que conecta transportistas, generadores de carga y conductores para crecer con más control.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat) => (
                <div key={stat.id} className="flex flex-col gap-1.5">
                  <span className="text-xl md:text-2xl font-bold">{stat.value}</span>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <p className="text-sm text-muted-foreground">Confían en GOxT</p>
              <Marquee pauseOnHover className="[--duration:25s] p-0">
                {clients.map((client, index) => (
                  <div key={index} className="flex items-center justify-center mx-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={client.src}
                      alt={client.name}
                      className={`h-6 w-auto object-contain ${client.srcDark ? "dark:hidden" : ""} ${client.darkClass ?? ""}`}
                    />
                    {client.srcDark && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={client.srcDark}
                        alt={client.name}
                        className="h-6 w-auto object-contain hidden dark:block"
                      />
                    )}
                  </div>
                ))}
              </Marquee>
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <div className="w-full">
            {submitted ? (
              <div className="flex flex-col gap-6 rounded-xl bg-muted/50 p-8 md:p-10 h-full justify-center items-center text-center">
                <CheckCircleIcon className="size-12 text-green-500" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">¡Recibimos tus datos!</h2>
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
                    onClick={() => {
                      hasSubmitted.current = false;
                      setSubmitted(false);
                    }}
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
                  <h2 className="text-xl font-semibold">¿Estas interesado en conectar con nosotros?</h2>
                  <p className="text-sm text-muted-foreground">Respondemos en menos de 24 horas</p>
                </div>

                <FieldGroup>
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

                  <Controller
                    control={form.control}
                    name="perfil"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>
                          ¿Cómo te identificas? <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            {PERFILES.map((p) => (
                              <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  {/* ── Transportista y busco carga ──────────────────────── */}
                  {perfil === "transportista" && (
                    <>
                      <Controller
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <Field>
                            <FieldLabel htmlFor="company">Empresa</FieldLabel>
                            <Input {...field} id="company" placeholder="Opcional" />
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name="region"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Región donde operas <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                                <SelectValue placeholder="Selecciona una región" />
                              </SelectTrigger>
                              <SelectContent>
                                {REGIONES.map((r) => (
                                  <SelectItem key={r} value={r}>{r}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name="camiones"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              ¿Cuántos camiones operas? <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                                <SelectValue placeholder="Selecciona un rango" />
                              </SelectTrigger>
                              <SelectContent>
                                {CAMIONES_OPTS.map((c) => (
                                  <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name="tipoEquipo"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Tipo de equipo <span className="text-destructive">*</span>
                            </FieldLabel>
                            <EquipmentMultiSelect
                              value={field.value ?? []}
                              onChange={field.onChange}
                            />
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                      {form.watch("tipoEquipo")?.includes("otro") && (
                        <Controller
                          control={form.control}
                          name="tipoEquipoOtro"
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel htmlFor="tipoEquipoOtro">
                                Especifica el tipo de equipo <span className="text-destructive">*</span>
                              </FieldLabel>
                              <Input
                                {...field}
                                id="tipoEquipoOtro"
                                aria-invalid={fieldState.invalid}
                                placeholder="Ej: Cama baja"
                              />
                              <FieldError errors={[fieldState.error]} />
                            </Field>
                          )}
                        />
                      )}
                    </>
                  )}

                  {/* ── Cliente y busco mover carga ──────────────────────── */}
                  {perfil === "cliente" && (
                    <>
                      <Controller
                        control={form.control}
                        name="companyCliente"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="companyCliente">
                              Empresa <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input {...field} id="companyCliente" aria-invalid={fieldState.invalid} />
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Controller
                          control={form.control}
                          name="origen"
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel>
                                Origen <span className="text-destructive">*</span>
                              </FieldLabel>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                                  <SelectValue placeholder="Región/comuna" />
                                </SelectTrigger>
                                <SelectContent>
                                  {REGIONES.map((r) => (
                                    <SelectItem key={r} value={r}>{r}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FieldError errors={[fieldState.error]} />
                            </Field>
                          )}
                        />
                        <Controller
                          control={form.control}
                          name="destino"
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel>
                                Destino <span className="text-destructive">*</span>
                              </FieldLabel>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                                  <SelectValue placeholder="Región/comuna" />
                                </SelectTrigger>
                                <SelectContent>
                                  {REGIONES.map((r) => (
                                    <SelectItem key={r} value={r}>{r}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FieldError errors={[fieldState.error]} />
                            </Field>
                          )}
                        />
                      </div>
                      <Controller
                        control={form.control}
                        name="tipoCarga"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Tipo de carga <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                                <SelectValue placeholder="Selecciona el tipo de carga" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIPO_CARGA_OPTS.map((t) => (
                                  <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name="volumen"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="volumen">
                              Volumen o tonelaje estimado <span className="text-destructive">*</span>
                            </FieldLabel>
                            <div className="flex gap-2">
                              <Input
                                id="volumen"
                                type="text"
                                inputMode="numeric"
                                aria-invalid={fieldState.invalid}
                                placeholder="Ej: 20.000"
                                className="flex-1"
                                name={field.name}
                                ref={field.ref}
                                value={field.value ?? ""}
                                onBlur={field.onBlur}
                                onChange={(e) => field.onChange(formatThousands(e.target.value))}
                              />
                              <Controller
                                control={form.control}
                                name="volumenUnidad"
                                render={({ field: unidadField }) => (
                                  <Select value={unidadField.value} onValueChange={unidadField.onChange}>
                                    <SelectTrigger className="w-36 shrink-0">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {VOLUMEN_UNIDAD_OPTS.map((u) => (
                                        <SelectItem key={u} value={u}>{u}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name="frecuencia"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Frecuencia <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                                <SelectValue placeholder="¿Con qué frecuencia necesitas transporte?" />
                              </SelectTrigger>
                              <SelectContent>
                                {FRECUENCIA_OPTS.map((f) => (
                                  <SelectItem key={f} value={f}>{f}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                    </>
                  )}

                  {/* ── Conductor y busco equipos ────────────────────────── */}
                  {perfil === "conductor" && (
                    <>
                      <Controller
                        control={form.control}
                        name="licencia"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Clase de licencia <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                                <SelectValue placeholder="Selecciona tu clase de licencia" />
                              </SelectTrigger>
                              <SelectContent>
                                {LICENCIA_OPTS.map((l) => (
                                  <SelectItem key={l} value={l}>{l}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name="experiencia"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="experiencia">
                              Años de experiencia <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                              id="experiencia"
                              type="text"
                              inputMode="numeric"
                              aria-invalid={fieldState.invalid}
                              placeholder="Ej: 5"
                              name={field.name}
                              ref={field.ref}
                              value={field.value ?? ""}
                              onBlur={field.onBlur}
                              onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                            />
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name="busca"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              ¿Qué buscas? <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                                <SelectValue placeholder="Selecciona una opción" />
                              </SelectTrigger>
                              <SelectContent>
                                {BUSCA_OPTS.map((b) => (
                                  <SelectItem key={b} value={b}>{b}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name="regionConductor"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Región donde buscas trabajo <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                                <SelectValue placeholder="Selecciona una región" />
                              </SelectTrigger>
                              <SelectContent>
                                {REGIONES.map((r) => (
                                  <SelectItem key={r} value={r}>{r}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError errors={[fieldState.error]} />
                          </Field>
                        )}
                      />
                    </>
                  )}

                  <Controller
                    control={form.control}
                    name="consent"
                    render={({ field, fieldState }) => (
                      <Field>
                        <label className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Checkbox
                            checked={field.value === true}
                            onCheckedChange={(v) => field.onChange(v === true)}
                            aria-invalid={fieldState.invalid}
                          />
                          <span>
                            Acepto que GOxT use mis datos para contactarme, según la{" "}
                            <a href="/privacidad" target="_blank" className="underline underline-offset-2">
                              Política de Privacidad
                            </a>.
                          </span>
                        </label>
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
                      "Enviar"
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
