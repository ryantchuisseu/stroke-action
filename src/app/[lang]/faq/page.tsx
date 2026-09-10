import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { Accordion } from "@/components/accordion";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/faq", title: d.faq.crumb, description: d.faq.metaDesc });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const f = t.faq;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[1].label }, { label: f.crumb }]}
        eyebrow={f.eyebrow}
        title={f.title}
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <div className="max-w-[860px]">
            <Accordion items={f.items.map((it) => ({ q: it.q, a: it.a }))} />
          </div>
        </Container>
      </section>
    </>
  );
}
