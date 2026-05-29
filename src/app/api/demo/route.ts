import { NextRequest, NextResponse } from "next/server";

const BASE         = process.env.CRM_API_URL      ?? "https://api-crm.goxt.io";
const TOKEN        = process.env.CRM_WIDGET_TOKEN  ?? "";
const DEMO_FLOW_ID = Number(process.env.CRM_DEMO_FLOW_ID ?? "54");

const authHeaders = () => ({
  "Content-Type": "application/json",
  "x-access-token": TOKEN,
});

// ── In-memory cache (lives for the server process lifetime) ──────────────────
let cachedStageId: number | null = null;
let cachedEmailLabel: { labelId: number; optionId: number; optionName: string } | null = null;

async function loadConfig() {
  if (cachedStageId && cachedEmailLabel) return;

  const [flowRes, labelRes] = await Promise.all([
    fetch(`${BASE}/api/widget/flow/all`, { headers: authHeaders() }),
    fetch(`${BASE}/api/label/widget/key?key=person`, { headers: authHeaders() }),
  ]);

  if (!flowRes.ok)  throw new Error("No se pudo obtener el pipeline");
  if (!labelRes.ok) throw new Error("No se pudo obtener los labels");

  // Flow → first stage of DEMO_FLOW_ID
  const flowJson = await flowRes.json();
  const flows: any[] = flowJson.flows ?? [];
  const flow = flows.find((f: any) => f.id === DEMO_FLOW_ID);
  if (!flow) throw new Error(`Flow ${DEMO_FLOW_ID} no encontrado`);
  const stages: any[] = flow.flow_stage ?? [];
  if (!stages.length) throw new Error("El pipeline no tiene etapas");
  cachedStageId = stages[0].id as number;

  // Labels → entities[] → entity_label[] → label { key, options[] }
  const labelJson = await labelRes.json();
  const entities: any[] = labelJson.labels ?? [];

  const flatLabels: any[] = [];
  for (const entity of entities) {
    for (const el of (entity.entity_label ?? [])) {
      flatLabels.push(el.label);
    }
  }

  const emailLabelRaw = flatLabels.find((l: any) => l.key === "email");
  if (!emailLabelRaw) throw new Error("Label 'email' no encontrado en workspace");

  const firstActive = (label: any) => {
    const opts: any[] = label.options ?? [];
    return opts.find((o: any) => o.option_status?.[0]?.is_active) ?? opts[0];
  };

  const emailOpt = firstActive(emailLabelRaw);
  if (!emailOpt) throw new Error("Label 'email' sin opciones activas");

  cachedEmailLabel = { labelId: emailLabelRaw.id, optionId: emailOpt.id, optionName: emailOpt.value };
}

// ── API helpers ───────────────────────────────────────────────────────────────

async function createPerson(name: string, email: string, orgId: number | null): Promise<number> {
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
      phone:                  [],
      charge:                 [],
      tag:                    [],
      person_contact_source:  [],
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
      address:  [],
      tag:      [],
      origin:   "widget",
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
      flow_id:         DEMO_FLOW_ID,
      flow_stage_id:   cachedStageId!,
      person_id:       personId,
      organization_id: orgId ?? null,
      origin:          "widget",
      notes,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al registrar solicitud");
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, notes } = await req.json();

    await loadConfig();

    const orgId    = company ? await createOrg(company) : null;
    const personId = await createPerson(name, email, orgId);

    await createOpportunity(personId, orgId, `Solicitud Demo: ${name}`, notes ?? "");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[demo] Error:", error.message);
    return NextResponse.json(
      { success: false, message: "No pudimos enviar tu solicitud. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
