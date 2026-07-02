import countries from "i18n-iso-countries";
import es from "i18n-iso-countries/langs/es.json";
import regionData from "country-region-data/data.json";

countries.registerLocale(es);

export const CHILE_REGIONES = [
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

const names = countries.getNames("es", { select: "official" });

export const COUNTRIES: { code: string; name: string }[] = [
  { code: "CL", name: names.CL },
  ...Object.entries(names)
    .filter(([code]) => code !== "CL")
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name, "es")),
];

export function countryName(code: string): string {
  return COUNTRIES.find((c) => c.code === code)?.name ?? code;
}

export function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export function getRegionsForCountry(code: string): string[] {
  if (code === "CL") return CHILE_REGIONES;
  const entry = (regionData as { countryShortCode: string; regions: { name: string }[] }[]).find(
    (c) => c.countryShortCode === code,
  );
  return entry ? entry.regions.map((r) => r.name) : [];
}
