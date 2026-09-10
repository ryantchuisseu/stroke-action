import type { Metadata } from "next";
import { Container, PageHeader, CtaBand, Btn } from "@/components/ui";
import { Carousel } from "@/components/carousel";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/nos-actions", title: d.whatWeDo.crumb, description: d.whatWeDo.intro });
}

export default async function NosActionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const w = t.whatWeDo;
  const p = (href: string) => `/${lang}${href}`;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[0].label }, { label: w.crumb }]}
        eyebrow={w.eyebrow}
        title={w.title}
        intro={w.intro}
      />

      {/* Carrousel — images de terrain */}
      <section className="py-[clamp(2.5rem,6vw,4.5rem)]">
        <Container>
          <Carousel
            slides={w.alts.map((alt, i) => ({ src: `/carousel/${i + 1}.jpg`, alt }))}
            labels={w.carousel}
          />
        </Container>
      </section>

      <section className="pb-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <div className="border-t border-rule">
            {w.programs.map((prog) => (
              <article
                key={prog.n}
                className="grid gap-x-[clamp(1.5rem,5vw,4rem)] gap-y-3 border-b border-rule py-[clamp(2rem,5vw,3.5rem)] md:grid-cols-[4rem_1fr]"
              >
                <div className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold tabular-nums leading-none tracking-[-0.03em] text-blue">
                  {prog.n}
                </div>
                <div>
                  <h2 className="text-[clamp(1.3rem,2.6vw,1.9rem)] tracking-[-0.02em]">{prog.t}</h2>
                  <p className="mt-1 text-[0.95rem] font-medium text-red-ink">{prog.s}</p>
                  <ul className="mt-4 grid gap-2">
                    {prog.b.map((li, i) => (
                      <li key={i} className="grid grid-cols-[1.1rem_1fr] gap-2 text-[0.96rem] text-ink-soft">
                        <span className="mt-[0.6rem] h-[3px] w-[10px] bg-red" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-deep py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <h2 className="text-[clamp(1.5rem,3.2vw,2.2rem)]">{w.metricsTitle}</h2>
          <p className="mt-2 text-ink-soft">{w.metricsNote}</p>
          <dl className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {w.metrics.map((m) => (
              <div key={m} className="bg-paper-deep p-6">
                <dd className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.04em] text-grey">—</dd>
                <dt className="mt-2 text-[0.9rem] text-ink-soft">{m}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand
        title={w.cta.title}
        text={w.cta.text}
        actions={
          <>
            <Btn href={p("/nous-soutenir#don")} onDark>{w.cta.donate}</Btn>
            <Btn href={p("/documents-cles")} variant="ghost" onDark>{w.cta.plan}</Btn>
          </>
        }
      />
    </>
  );
}
