import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en"] as const;
const defaultLocale = "fr";

/** Préfixe chaque URL par la locale (/fr/... ou /en/...). Défaut : FR. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const accept = (request.headers.get("accept-language") ?? "").toLowerCase();
  const locale = accept.startsWith("en") ? "en" : defaultLocale;

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Ignore les fichiers internes, les assets et tout chemin avec extension.
  matcher: ["/((?!_next|photos|.*\\..*).*)"],
};
