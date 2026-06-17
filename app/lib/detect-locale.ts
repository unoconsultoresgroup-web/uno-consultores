// Lógica de detección de idioma compartida entre el middleware (edge) y el
// layout (server). No debe importar nada de cliente.

export type Lang = "es" | "en";
export const LANG_COOKIE = "lang";

// Países de habla hispana (ISO 3166-1 alpha-2). Visitantes desde aquí ven
// la web en español; el resto, en inglés.
const SPANISH_COUNTRIES = new Set([
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GQ", "GT",
  "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE",
]);

/** Decide el idioma a partir del país (geo) y del header Accept-Language. */
export function detectLang(
  country: string | null | undefined,
  acceptLanguage: string | null | undefined,
): Lang {
  // 1) Señal más fuerte: el país desde el que navega.
  if (country) {
    return SPANISH_COUNTRIES.has(country.toUpperCase()) ? "es" : "en";
  }

  // 2) Sin geo (ej. desarrollo local): usamos las preferencias del navegador.
  if (acceptLanguage) {
    const primary = acceptLanguage.split(",")[0]?.trim().toLowerCase() ?? "";
    if (primary.startsWith("es")) return "es";
    if (primary.startsWith("en")) return "en";
  }

  // 3) Por defecto, español (mercado principal).
  return "es";
}

/** Extrae el código de país de los headers de geolocalización del host. */
export function countryFromHeaders(
  get: (name: string) => string | null,
): string | null {
  return (
    get("x-vercel-ip-country") ||
    get("cf-ipcountry") ||
    get("x-country") ||
    null
  );
}
