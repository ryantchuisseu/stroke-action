import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(isLocale(lang) ? lang : "fr").documents.crumb };
}

function PdfIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 42" className={className} aria-hidden="true">
      <path
        d="M5 2h16l11 11v25a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M21 2v11h11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <rect x="1" y="22" width="24" height="13" rx="2" fill="var(--color-red)" />
      <text
        x="13"
        y="31.5"
        textAnchor="middle"
        fill="#fff"
        style={{ font: "700 8.5px var(--font-sans)" }}
      >
        PDF
      </text>
    </svg>
  );
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
            {d.items.map((doc) => {
              const rowInner = (
                <div className="grid grid-cols-[34px_1fr_auto] items-center gap-x-5 gap-y-1 sm:grid-cols-[34px_1fr_6rem_12rem_1.5rem]">
                  <PdfIcon
                    className={`h-[34px] w-[34px] transition-colors duration-200 ${
                      doc.ready ? "text-ink group-hover:text-red-ink" : "text-rule"
                    }`}
                  />
                  <span className="text-[clamp(1rem,1.9vw,1.2rem)] font-semibold tracking-[-0.01em]">{doc.title}</span>
                  <span className="text-[0.85rem] text-grey max-sm:col-start-2">{doc.lang}</span>
                  <span
                    className={`text-[0.85rem] max-sm:col-span-2 max-sm:col-start-2 ${
                      doc.ready ? "text-ink-soft" : "text-grey"
                    }`}
                  >
                    {doc.ready ? d.statusAvailable : d.statusSoon}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`hidden justify-self-end text-lg transition-transform duration-200 ease-[var(--ease-out)] sm:block ${
                      doc.ready ? "text-blue-ink group-hover:translate-y-0.5" : "text-rule"
                    }`}
                  >
                    ↓
                  </span>
                </div>
              );

              return (
                <li key={doc.title} className="border-b border-rule">
                  {doc.ready ? (
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block px-0 py-[clamp(1rem,2.6vw,1.5rem)] transition-[background-color,padding] duration-200 ease-[var(--ease-out)] hover:bg-paper-deep hover:px-4"
                    >
                      {rowInner}
                    </a>
                  ) : (
                    <div className="px-0 py-[clamp(1rem,2.6vw,1.5rem)] opacity-70">{rowInner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
