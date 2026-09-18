import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/conditions-utilisation", title: d.legal.terms.crumb, description: d.legal.terms.metaDesc });
}

export default async function TermsOfUsePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const c = t.legal.terms;

  return (
    <LegalPage
      lang={lang}
      homeLabel={t.nav.home}
      crumb={c.crumb}
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
      updated={c.updated}
      sections={c.sections}
      note={c.note}
    />
  );
}
