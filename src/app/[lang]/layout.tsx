import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SideDrawer } from "@/components/side-drawer";
import { CookieBanner } from "@/components/cookie-banner";
import { getDictionary, isLocale, locales, type Locale } from "@/dictionaries";
import { SITE_URL, SITE_NAME, languagesFor } from "@/lib/site";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

// Police "manuscrite" pour les petites annotations décoratives (motif V6,
// cf. V6-NOTES.md) — jamais pour du texte fonctionnel, uniquement des notes.
const caveat = Caveat({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = isLocale(lang) ? lang : "en";
  const d = getDictionary(l);
  const url = `${SITE_URL}/${l}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.meta.homeTitle, template: d.meta.titleTemplate },
    description: d.meta.description,
    applicationName: SITE_NAME,
    alternates: { canonical: url, languages: languagesFor("") },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: l === "fr" ? "fr_FR" : "en_US",
      url,
      title: d.meta.homeTitle,
      description: d.meta.description,
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.homeTitle,
      description: d.meta.description,
      images: ["/og.png"],
    },
  };
}

/** Données structurées : identité de l'organisation pour les moteurs. */
function OrgJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Stroke Action",
    alternateName: "Action AVC",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: "contact@strokeaction.org",
    telephone: "+237652148147",
    foundingDate: "2026",
    areaServed: "CM",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tradex Nkoabang",
      addressLocality: "Yaoundé",
      addressCountry: "CM",
    },
    // sameAs: [ ... ] à compléter avec les URL Facebook / YouTube / LinkedIn
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang as Locale);

  return (
    <html lang={lang} className={`${poppins.variable} ${caveat.variable}`}>
      <body className="flex min-h-screen flex-col">
        <OrgJsonLd />
        <SiteHeader lang={lang} nav={d.nav} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} footer={d.footer} />
        <SideDrawer lang={lang} d={d.drawer} />
        <CookieBanner lang={lang} d={d.cookieBanner} />
      </body>
    </html>
  );
}
