import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en"] as const;
const defaultLocale = "en";

/** Préfixe chaque URL par la locale (/en/... ou /fr/...).
 *  Défaut : EN — demande du Dr Kamtchum, le site s'ouvre en anglais.
 *  Le visiteur bascule ensuite en FR via le sélecteur de l'en-tête. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Ignore les fichiers internes, les assets et tout chemin avec extension.
  matcher: ["/((?!_next|photos|.*\\..*).*)"],
};
