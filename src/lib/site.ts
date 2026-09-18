import type { Metadata } from "next";

/** Domaine canonique du site (le vrai domaine, pas l'URL Vercel). */
export const SITE_URL = "https://strokeaction.org";
export const SITE_NAME = "Stroke Action · Action AVC";

export const LOCALES = ["fr", "en"] as const;
export const DEFAULT_LOCALE = "en";

/** Les 12 pages du site (chemin sans le préfixe de langue). */
export const ROUTES = [
  "",
  "/a-propos",
  "/nos-actions",
  "/education-avc",
  "/gouvernance",
  "/documents-cles",
  "/faq",
  "/actualites",
  "/galerie",
  "/nous-soutenir",
  "/contact",
  "/espace-membres",
  "/politique-confidentialite",
  "/conditions-utilisation",
] as const;

/** Liens hreflang : chaque langue + x-default (langue par défaut). */
function languagesFor(route: string) {
  return {
    fr: `${SITE_URL}/fr${route}`,
    en: `${SITE_URL}/en${route}`,
    "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${route}`,
  };
}

/**
 * Métadonnées complètes pour une page : titre, description, URL canonique
 * (auto-référencée par langue), hreflang, Open Graph + Twitter.
 * Le template de titre (« %s · Stroke Action AVC ») du layout s'applique
 * automatiquement au <title> ; on l'ajoute manuellement pour l'Open Graph.
 */
export function pageMeta(opts: {
  lang: string;
  route: string;
  title: string;
  description: string;
}): Metadata {
  const { lang, route, title, description } = opts;
  const url = `${SITE_URL}/${lang}${route}`;
  const ogTitle = `${title} · Stroke Action AVC`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: languagesFor(route) },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url,
      title: ogTitle,
      description,
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/og.png"],
    },
  };
}

export { languagesFor };
