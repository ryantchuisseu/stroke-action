import { Container, PageHeader } from "@/components/ui";

export type LegalSection = { heading: string; body: readonly (string | readonly string[])[] };

export function LegalPage({
  lang,
  homeLabel,
  crumb,
  eyebrow,
  title,
  intro,
  updated,
  sections,
  note,
}: {
  lang: string;
  homeLabel: string;
  crumb: string;
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: readonly LegalSection[];
  note: string;
}) {
  return (
    <>
      <PageHeader
        crumbs={[{ label: homeLabel, href: `/${lang}` }, { label: crumb }]}
        eyebrow={eyebrow}
        title={title}
        intro={intro}
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <p className="max-w-[62ch] text-[0.85rem] text-grey">{updated}</p>
          <div className="mt-[clamp(2rem,5vw,3rem)] max-w-[68ch] divide-y divide-rule border-t border-rule">
            {sections.map((s, i) => (
              <div key={i} className="py-[clamp(1.5rem,3.5vw,2.25rem)]">
                <h2 className="text-[1.15rem] font-bold tracking-[-0.01em]">{s.heading}</h2>
                <div className="mt-3 grid gap-3">
                  {s.body.map((block, j) =>
                    Array.isArray(block) ? (
                      <ul key={j} className="grid gap-2 pl-5 text-ink-soft [&>li]:list-disc">
                        {block.map((item, k) => (
                          <li key={k}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j} className="text-ink-soft">
                        {block}
                      </p>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-[clamp(2rem,5vw,3rem)] max-w-[62ch] text-[0.8rem] italic text-grey">{note}</p>
        </Container>
      </section>
    </>
  );
}
