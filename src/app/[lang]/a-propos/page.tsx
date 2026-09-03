import type { Metadata } from "next";
import { Container, Eyebrow, PageHeader, CtaBand, Btn } from "@/components/ui";
import { BrainMark } from "@/components/brain-mark";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "fr");
  return { title: d.about.crumb };
}

export default async function AProposPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const a = t.about;
  const p = (href: string) => `/${lang}${href}`;

  return (
    <>
      <PageHeader
        crumbs={[
          { label: t.nav.home, href: `/${lang}` },
          { label: t.nav.groups[0].label },
          { label: a.crumb },
        ]}
        eyebrow={a.eyebrow}
        title={a.title}
        intro={a.intro}
      />

      {/* Notre histoire */}
      <section className="py-[clamp(3.5rem,8vw,6.5rem)]">
        <Container className="grid items-start gap-[clamp(2rem,6vw,5rem)] md:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-[62ch]">
            <p className="text-[clamp(1.15rem,1.9vw,1.5rem)] font-medium leading-[1.5] tracking-[-0.015em]">
              {a.story.lead}
            </p>
            <p className="mt-[1.15rem]">{a.story.p2}</p>
            <p className="mt-[1.15rem]">{a.story.p3}</p>
          </div>
          <aside className="md:sticky md:top-24">
            <div className="aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/infirmiere.jpg" alt="" className="h-full w-full object-cover" />
            </div>
            <p className="mt-4 border-t-2 border-ink pt-4 text-[0.88rem] text-ink-soft">
              <b className="mb-[0.15rem] block text-2xl tracking-[-0.02em] text-ink">{a.story.factYear}</b>
              {a.story.fact}
            </p>
          </aside>
        </Container>
      </section>

      {/* Vision / Mission */}
      <section className="bg-paper-deep py-[clamp(3.5rem,8vw,6.5rem)]">
        <Container>
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
            {[a.vision, a.mission].map((c) => (
              <div key={c.k} className="bg-paper-deep p-[clamp(1.75rem,4vw,3rem)]">
                <div className="flex items-center gap-[0.6rem]">
                  <BrainMark className="h-[22px] w-[22px] text-ink" />
                  <span className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-blue-ink">{c.k}</span>
                </div>
                <blockquote className="mt-[1.1rem] text-[clamp(1.15rem,2.1vw,1.55rem)] font-medium leading-[1.4] tracking-[-0.015em]">
                  {c.q}
                </blockquote>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Nos valeurs */}
      <section className="py-[clamp(3.5rem,8vw,6.5rem)]">
        <Container>
          <Eyebrow>{a.values.eyebrow}</Eyebrow>
          <h2 className="mt-[0.9rem] max-w-[40ch] text-[clamp(1.55rem,3.4vw,2.4rem)]">{a.values.title}</h2>
          <div className="mt-[clamp(2rem,5vw,3rem)] border-t border-rule">
            {a.values.items.map((v) => (
              <div
                key={v.t}
                className="grid grid-cols-[20px_1fr] items-baseline gap-x-6 gap-y-2 border-b border-rule py-[clamp(1.15rem,2.8vw,1.7rem)] sm:grid-cols-[20px_12rem_1fr]"
              >
                <BrainMark className="mt-1 h-5 w-5 self-start text-ink" />
                <h3 className="text-[clamp(1.1rem,2vw,1.4rem)] tracking-[-0.015em]">{v.t}</h3>
                <p className="col-start-2 max-w-[50ch] text-[0.96rem] text-ink-soft sm:col-start-3">{v.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bande devise */}
      <section className="bg-ink py-[clamp(3.5rem,9vw,6.5rem)] text-center text-paper">
        <Container>
          <BrainMark className="mx-auto mb-[1.4rem] h-[30px] w-[30px] text-paper" />
          <p className="text-[clamp(1.8rem,4.6vw,3.3rem)] font-bold tracking-[-0.03em]">
            {a.mottoLine}
            <span className="mt-[0.6rem] block text-[0.42em] font-medium text-[rgba(252,250,246,0.55)]">
              {a.mottoSub}
            </span>
          </p>
        </Container>
      </section>

      {/* Ce qui nous distingue */}
      <section className="py-[clamp(3.5rem,8vw,6.5rem)]">
        <Container>
          <Eyebrow>{a.diff.eyebrow}</Eyebrow>
          <h2 className="mt-[0.9rem] max-w-[40ch] text-[clamp(1.55rem,3.4vw,2.4rem)]">{a.diff.title}</h2>
          <ul className="mt-[clamp(2rem,5vw,3rem)] border-t border-rule">
            {a.diff.items.map((d, i) => (
              <li
                key={i}
                className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-rule py-[clamp(1rem,2.6vw,1.5rem)] text-[clamp(1.02rem,1.9vw,1.25rem)] font-medium tracking-[-0.01em]"
              >
                <span className="text-[0.8rem] font-semibold tabular-nums text-grey">0{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title={a.cta.title}
        text={a.cta.text}
        actions={
          <>
            <Btn href={p("/nous-soutenir#devenir-membre")} onDark>{a.cta.member}</Btn>
            <Btn href={p("/contact")} variant="ghost" onDark>{a.cta.contact}</Btn>
          </>
        }
      />
    </>
  );
}
