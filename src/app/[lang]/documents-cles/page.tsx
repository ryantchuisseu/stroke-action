import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(isLocale(lang) ? lang : "fr").documents.crumb };
}

export default async function DocumentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const d = t.documents;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[0].label }, { label: d.crumb }]}
        eyebrow={d.eyebrow}
        title={d.title}
        intro={d.intro}
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <ul className="border-t border-rule">
            {d.items.map((doc) => (
              <li
                key={doc.title}
                className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-rule py-[clamp(1rem,2.6vw,1.5rem)] sm:grid-cols-[1fr_6rem_12rem_2rem]"
              >
                <span className="text-[clamp(1rem,1.9vw,1.2rem)] font-semibold tracking-[-0.01em]">{doc.title}</span>
                <span className="text-[0.85rem] text-grey max-sm:col-span-2">{doc.lang}</span>
                <span className={`text-[0.85rem] ${doc.ready ? "text-ink-soft" : "text-grey"} max-sm:col-span-2`}>
                  {doc.ready ? d.statusAvailable : d.statusSoon}
                </span>
                <span aria-hidden="true" className={`justify-self-end text-lg ${doc.ready ? "text-blue-ink" : "text-rule"}`}>
                  ↓
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
