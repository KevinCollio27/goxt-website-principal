import { NextRequest, NextResponse } from "next/server";

const BASE           = process.env.CRM_API_URL         ?? "https://api-crm.goxt.io";
const TOKEN           = process.env.CRM_WIDGET_TOKEN     ?? "";
const CARGAS_FLOW_ID  = Number(process.env.CRM_CARGAS_FLOW_ID ?? "70");

const authHeaders = () => ({
  "Content-Type": "application/json",
  "x-access-token": TOKEN,
});

// ── In-memory cache (lives for the server process lifetime) ──────────────────
let cachedStageId: number | null = null;
let cachedEmailLabel: { labelId: number; optionId: number; optionName: string } | null = null;
let cachedPhoneLabel: { labelId: number; optionId: number; optionName: string } | null = null;

async function loadConfig() {
  if (cachedStageId && cachedEmailLabel && cachedPhoneLabel) return;

  const [flowRes, labelRes] = await Promise.all([
    fetch(`${BASE}/api/widget/flow/all`, { headers: authHeaders() }),
    fetch(`${BASE}/api/label/widget/key?key=person`, { headers: authHeaders() }),
  ]);

  if (!flowRes.ok)  throw new Error("No se pudo obtener el pipeline");
  if (!labelRes.ok) throw new Error("No se pudo obtener los labels");

  const flowJson = await flowRes.json();
  const flows: any[] = flowJson.flows ?? [];
  const flow = flows.find((f: any) => f.id === CARGAS_FLOW_ID);
  if (!flow) throw new Error(`Flow ${CARGAS_FLOW_ID} no encontrado`);
  const stages: any[] = flow.flow_stage ?? [];
  if (!stages.length) throw new Error("El pipeline no tiene etapas");
  cachedStageId = stages[0].id as number;

  const labelJson = await labelRes.json();
  const entities: any[] = labelJson.labels ?? [];

  const flatLabels: any[] = [];
  for (const entity of entities) {
    for (const el of (entity.entity_label ?? [])) {
      flatLabels.push(el.label);
    }
  }

  const emailLabelRaw = flatLabels.find((l: any) => l.key === "email");
  const phoneLabelRaw = flatLabels.find((l: any) => l.key === "phone");
  if (!emailLabelRaw) throw new Error("Label 'email' no encontrado en workspace");
  if (!phoneLabelRaw) throw new Error("Label 'phone' no encontrado en workspace");

  const firstActive = (label: any) => {
    const opts: any[] = label.options ?? [];
    return opts.find((o: any) => o.option_status?.[0]?.is_active) ?? opts[0];
  };

  const emailOpt = firstActive(emailLabelRaw);
  const phoneOpt = firstActive(phoneLabelRaw);
  if (!emailOpt) throw new Error("Label 'email' sin opciones activas");
  if (!phoneOpt) throw new Error("Label 'phone' sin opciones activas");

  cachedEmailLabel = { labelId: emailLabelRaw.id, optionId: emailOpt.id, optionName: emailOpt.value };
  cachedPhoneLabel = { labelId: phoneLabelRaw.id, optionId: phoneOpt.id, optionName: phoneOpt.value };
}

// ── API helpers ───────────────────────────────────────────────────────────────

async function createPerson(
  name: string,
  email: string,
  phone: string,
  orgId: number | null,
): Promise<number> {
  const res = await fetch(`${BASE}/api/widget/person`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      name,
      organization_id: orgId ?? null,
      origin: "widget",
      email: [{
        id:       cachedEmailLabel!.optionId,
        value:    email,
        option:   cachedEmailLabel!.optionName,
        label_id: cachedEmailLabel!.labelId,
      }],
      phone: [{
        id:       cachedPhoneLabel!.optionId,
        value:    phone,
        option:   cachedPhoneLabel!.optionName,
        label_id: cachedPhoneLabel!.labelId,
      }],
      charge: [],
      tag: [],
      person_contact_source: [],
    }),
  });
  if (!res.ok) throw new Error("Error al registrar contacto");
  const json = await res.json();
  const id = json.person?.id;
  if (!id) throw new Error("No se recibió ID del contacto");
  return id as number;
}

async function createOrg(name: string): Promise<number> {
  const res = await fetch(`${BASE}/api/widget/organization`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      name,
      industry: null,
      address: [],
      tag: [],
      origin: "widget",
    }),
  });
  if (!res.ok) throw new Error("Error al registrar empresa");
  const json = await res.json();
  const id = json.organization?.id;
  if (!id) throw new Error("No se recibió ID de la empresa");
  return id as number;
}

async function createOpportunity(
  personId: number,
  orgId: number | null,
  oppName: string,
  notes: string,
): Promise<void> {
  const res = await fetch(`${BASE}/api/widget/opportunity/widget`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      name:            oppName,
      flow_id:         CARGAS_FLOW_ID,
      flow_stage_id:   cachedStageId!,
      person_id:       personId,
      organization_id: orgId ?? null,
      origin:          "widget",
      notes,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al registrar oportunidad");
  }
}

// ── Formato de nombre y notas por perfil ────────────────────────────────────

const PERFIL_LABELS: Record<string, string> = {
  transportista: "Transportista",
  cliente:       "Generador",
  conductor:     "Conductor",
};

const TIPO_EQUIPO_LABELS: Record<string, string> = {
  cerrado:        "Cerrado",
  camion:         "Camión",
  refrigerado:    "Refrigerado",
  rampla_plana:   "Rampla Plana",
  rampla_cerrada: "Rampla Cerrada",
  furgonado:      "Furgonado",
  otro:           "Otro",
};

function buildNotes(data: any): string {
  const lines: string[] = [];

  if (data.perfil === "transportista") {
    if (data.company) lines.push(`Empresa: ${data.company}`);
    lines.push(`Región: ${data.region}`);
    lines.push(`Camiones que opera: ${data.camiones}`);
    const equipos: string[] = (data.tipoEquipo ?? []).map((v: string) =>
      v === "otro" && data.tipoEquipoOtro ? `Otro (${data.tipoEquipoOtro})` : (TIPO_EQUIPO_LABELS[v] ?? v),
    );
    lines.push(`Tipo de equipo: ${equipos.join(", ")}`);
  } else if (data.perfil === "cliente") {
    lines.push(`Empresa: ${data.companyCliente}`);
    lines.push(`Origen: ${data.origen}`);
    lines.push(`Destino: ${data.destino}`);
    lines.push(`Tipo de carga: ${data.tipoCarga}`);
    lines.push(`Volumen/tonelaje estimado: ${data.volumen} ${data.volumenUnidad ?? ""}`.trim());
    lines.push(`Frecuencia: ${data.frecuencia}`);
  } else if (data.perfil === "conductor") {
    lines.push(`Clase de licencia: ${data.licencia}`);
    lines.push(`Años de experiencia: ${data.experiencia}`);
    lines.push(`Busca: ${data.busca}`);
    lines.push(`Región: ${data.regionConductor}`);
  }

  return lines.join("\n");
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, perfil } = data;

    await loadConfig();

    const companyName =
      perfil === "transportista" ? data.company :
      perfil === "cliente"       ? data.companyCliente :
      null;

    const orgId    = companyName ? await createOrg(companyName) : null;
    const personId = await createPerson(name, email, phone, orgId);

    const perfilLabel = PERFIL_LABELS[perfil] ?? perfil;
    await createOpportunity(personId, orgId, `${perfilLabel}: ${name}`, buildNotes(data));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[cargas] Error:", error.message);
    return NextResponse.json(
      { success: false, message: "No pudimos enviar tu solicitud. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
