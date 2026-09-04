import type { Metadata } from "next";
import { Container, PageHeader, Eyebrow, CtaBand, Btn } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(isLocale(lang) ? lang : "fr").education.crumb };
}

export default async function EducationPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const e = t.education;
  const p = (href: string) => `/${lang}${href}`;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[1].label }, { label: e.crumb }]}
        eyebrow={e.eyebrow}
        title={e.title}
      />

      {/* Qu'est-ce qu'un AVC */}
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container className="grid gap-[clamp(2rem,6vw,4rem)] md:grid-cols-[1fr_0.9fr]">
          <div className="max-w-[58ch]">
            <Eyebrow>{e.whatIs.eyebrow}</Eyebrow>
            <p className="mt-4">{e.whatIs.p}</p>
            <p className="mt-3 font-semibold">{e.whatIs.emphasis}</p>
          </div>
          <div className="border border-red-ink/30 bg-[color-mix(in_srgb,var(--color-red)_6%,var(--color-paper))] p-6">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-red-ink">
              {e.whatIs.emergencyLabel}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                ["119", t.common.samu],
                ["118", t.common.fire],
                ["117", t.common.police],
              ].map(([n, l]) => (
                <div key={n} className="bg-red px-2 py-3 text-white">
                  <div className="text-[1.4rem] font-bold tabular-nums leading-none">{n}</div>
                  <div className="mt-1 text-[0.7rem] uppercase tracking-[0.08em]">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[0.85rem] text-ink-soft">{e.whatIs.emergencyNote}</p>
          </div>
        </Container>
      </section>

      {/* FAST */}
      <section className="bg-paper-deep py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)]">{e.fastTitle}</h2>
          <div className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {e.fast.map((f: { l: string; t: string; d: string; em?: boolean }) => (
              <div
                key={f.l}
                className={`p-[clamp(1.1rem,2.5vw,1.7rem)] ${f.em ? "bg-[color-mix(in_srgb,var(--color-red)_8%,var(--color-paper-deep))]" : "bg-paper-deep"}`}
              >
                <div className={`text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[0.9] tracking-[-0.04em] ${f.em ? "text-red" : "text-blue"}`}>
                  {f.l}
                </div>
                <h3 className="mt-[0.65rem] text-[0.98rem] font-semibold">{f.t}</h3>
                <p className="mt-[0.3rem] text-[0.88rem] text-ink-soft">{f.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Facteurs de risque */}
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container className="grid gap-[clamp(2rem,6vw,4rem)] md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(1.4rem,2.8vw,2rem)]">{e.modifTitle}</h2>
            <p className="mt-1 text-[0.9rem] text-ink-soft">{e.modifSub}</p>
            <ul className="mt-5 border-t border-rule">
              {e.modif.map((m) => (
                <li key={m} className="border-b border-rule py-[0.7rem] text-[0.96rem]">{m}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[clamp(1.4rem,2.8vw,2rem)]">{e.nonModifTitle}</h2>
            <p className="mt-1 text-[0.9rem] text-ink-soft">{e.nonModifSub}</p>
            <ul className="mt-5 border-t border-rule">
              {e.nonModif.map((m) => (
                <li key={m} className="border-b border-rule py-[0.7rem] text-[0.96rem]">{m}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Chiffres clés */}
      <section className="bg-blue-ink py-[clamp(3rem,7vw,5.5rem)] text-paper">
        <Container>
          <Eyebrow>{e.statsEyebrow}</Eyebrow>
          <ul className="mt-6 grid gap-px border border-[rgba(252,250,246,0.14)] bg-[rgba(252,250,246,0.14)] sm:grid-cols-2">
            {e.stats.map((s) => (
              <li key={s} className="bg-blue-ink p-5 text-[0.98rem] text-[rgba(252,250,246,0.85)]">{s}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Le saviez-vous */}
      <section id="le-saviez-vous" className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <Eyebrow>{e.knowEyebrow}</Eyebrow>
          <h2 className="mt-[0.9rem] max-w-[30ch] text-[clamp(1.6rem,3.4vw,2.4rem)]">{e.knowTitle}</h2>
          <div className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {e.know.map((k, i) => (
              <p
                key={i}
                className={`bg-paper p-5 text-[0.95rem] text-ink-soft ${
                  i === e.know.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                {k}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={e.cta.title}
        text={e.cta.text}
        actions={
          <>
            <Btn href={p("/nous-soutenir#benevolat")} onDark>{e.cta.volunteer}</Btn>
            <Btn href={p("/actualites")} variant="ghost" onDark>{e.cta.campaigns}</Btn>
          </>
        }
      />
    </>
  );
}
