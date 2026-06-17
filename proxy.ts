import { NextResponse, type NextRequest } from "next/server";
import {
  LANG_COOKIE,
  countryFromHeaders,
  detectLang,
} from "./app/lib/detect-locale";

export function proxy(req: NextRequest) {
  const res = NextResponse.next();

  // Si el visitante ya tiene un idioma (elegido manualmente o detectado
  // antes), respetamos esa preferencia y no la sobreescribimos.
  const existing = req.cookies.get(LANG_COOKIE)?.value;
  if (existing === "es" || existing === "en") return res;

  const country = countryFromHeaders((name) => req.headers.get(name));
  const lang = detectLang(country, req.headers.get("accept-language"));

  res.cookies.set(LANG_COOKIE, lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 año
    sameSite: "lax",
  });

  return res;
}

export const config = {
  // Ejecutamos solo en páginas, no en assets estáticos ni en la API.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
