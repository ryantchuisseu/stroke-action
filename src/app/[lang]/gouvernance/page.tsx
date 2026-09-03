import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(isLocale(lang) ? lang : "fr").governance.crumb };
}

export default async function GouvernancePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const g = t.governance;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[0].label }, { label: g.crumb }]}
        eyebrow={g.eyebrow}
        title={g.title}
        intro={g.intro}
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {g.board.map((m) => (
              <article key={m.role} className="bg-paper p-6">
                <div className="aspect-square bg-paper-deep" aria-hidden="true" />
                <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-blue-ink">{m.role}</p>
                <h2 className="mt-1 text-[1.1rem] font-semibold tracking-[-0.01em]">{m.name}</h2>
                <p className="mt-2 text-[0.9rem] text-ink-soft">{m.bio}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[0.85rem] text-grey">{g.note}</p>
        </Container>
      </section>
    </>
  );
}
