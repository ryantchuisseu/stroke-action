import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/politique-confidentialite", title: d.legal.privacy.crumb, description: d.legal.privacy.metaDesc });
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const p = t.legal.privacy;

  return (
    <LegalPage
      lang={lang}
      homeLabel={t.nav.home}
      crumb={p.crumb}
      eyebrow={p.eyebrow}
      title={p.title}
      intro={p.intro}
      updated={p.updated}
      sections={p.sections}
      note={p.note}
    />
  );
}
