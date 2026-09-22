import type { Metadata } from "next";
import { Heart, Flame, ShieldCheck, Award, type LucideIcon } from "lucide-react";
import { Eye, Target } from "@phosphor-icons/react/ssr";
import { Container, Eyebrow, PageHeader, CtaBand, Btn } from "@/components/ui";
import { BrainMark } from "@/components/brain-mark";
import { Reveal } from "@/components/reveal";
import { HandNote, highlightWord, underlineWord } from "@/components/ink-marks";
import { CreditedPhoto } from "@/components/photo-credit";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

/* -------- Nos valeurs : cartes teintées translucides + icônes --------
 * Référence apportée par Ryan (cartes colorées avec icône, style
 * "pâtisserie"). Palette réutilisée telle quelle depuis Nos piliers/Nos
 * actions (violet/bleu de charte/pêche/rose) — voir V6-NOTES.md. */
const VALUE_STYLES: { bg: string; iconBg: string; text: string; Icon: LucideIcon }[] = [
  { bg: "color-mix(in srgb, #C9BEEA 35%, transparent)", iconBg: "#DAD3EF", text: "#5B4E96", Icon: Heart },
  { bg: "color-mix(in srgb, var(--color-blue) 15%, transparent)", iconBg: "#CFE6FA", text: "var(--color-blue-ink)", Icon: Flame },
  { bg: "color-mix(in srgb, #E9B98A 32%, transparent)", iconBg: "#F3DCC2", text: "#B4763C", Icon: ShieldCheck },
  { bg: "color-mix(in srgb, #DD9AAE 28%, transparent)", iconBg: "#F1D3DB", text: "#A84360", Icon: Award },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/a-propos", title: d.about.crumb, description: d.about.story.lead });
}

export default async function AProposPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const a = t.about;
  const p = (href: string) => `/${lang}${href}`;
  const storyUnderline = lang === "fr" ? "liberté d'association" : "freedom of association";
  const storyHighlight = lang === "fr" ? "évitable" : "preventable";

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
        highlight={lang === "fr" ? "histoire" : "Story"}
        underline={lang === "fr" ? "objectif" : "goal"}
      />

      {/* Notre histoire */}
      <section className="py-[clamp(3.5rem,8vw,6.5rem)]">
        <Container className="grid items-start gap-[clamp(2rem,6vw,5rem)] md:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-[62ch]">
            <p className="text-[clamp(1.15rem,1.9vw,1.5rem)] font-medium leading-[1.5] tracking-[-0.015em]">
              {underlineWord(a.story.lead, storyUnderline)}
            </p>
            <p className="mt-[1.15rem]">{highlightWord(a.story.p2, storyHighlight)}</p>
            <p className="mt-[1.15rem]">{a.story.p3}</p>
          </div>
          <aside className="md:sticky md:top-24">
            <CreditedPhoto
              src="/photos/infirmiere.jpg"
              alt=""
              href="https://www.jorishermans.com/blog/portrait-photography-ideas-and-examples"
              className="group relative aspect-[4/5]"
              imgClassName="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
            />
            <p className="relative mt-4 border-t-2 border-ink pt-4 text-[0.88rem] text-ink-soft">
              <b className="mb-[0.15rem] block text-2xl tracking-[-0.02em] text-ink">{a.story.factYear}</b>
              {a.story.fact}
              <HandNote className="mt-3 hidden rotate-[-3deg] sm:inline-block">{a.story.originNote}</HandNote>
            </p>
          </aside>
        </Container>
      </section>

      {/* Citation du fondateur */}
      <section className="bg-blue-ink py-[clamp(4rem,10vw,8rem)] text-paper">
        <Container className="grid gap-[clamp(2rem,6vw,5rem)] md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <figure className="m-0">
            <div className="aspect-[4/5] max-w-[380px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/dr-kamtchum.jpg"
                alt={`${a.quote.author} — ${a.quote.role}`}
                className="h-full w-full object-cover"
              />
            </div>
          </figure>
          <blockquote className="m-0">
            <BrainMark className="mb-7 h-9 w-9 text-paper" dot="var(--color-red)" stroke="rgba(252,250,246,0.9)" />
            <p className="max-w-[24ch] text-[clamp(1.5rem,3.6vw,2.65rem)] font-semibold leading-[1.28] tracking-[-0.02em] text-balance">
              {a.quote.text}
            </p>
            <footer className="mt-9 flex flex-wrap items-center gap-4 text-[0.95rem]">
              <span aria-hidden="true" className="h-px w-9 flex-none bg-[rgba(252,250,246,0.4)]" />
              <span>
                <span className="block font-semibold text-paper">{a.quote.author}</span>
                <span className="block text-[rgba(252,250,246,0.6)]">{a.quote.role}</span>
              </span>
              <HandNote color="var(--color-red)" className="hidden rotate-[-3deg] sm:inline-block">
                {a.quote.handNote}
              </HandNote>
            </footer>
          </blockquote>
        </Container>
      </section>

      {/* Vision / Mission */}
      <section className="bg-paper-deep py-[clamp(3.5rem,8vw,6.5rem)]">
        <Container>
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
            {[a.vision, a.mission].map((c, i) => {
              const Icon = i === 0 ? Eye : Target;
              return (
              <div key={c.k} className="bg-paper-deep p-[clamp(1.75rem,4vw,3rem)]">
                <div className="flex items-center gap-[0.6rem]">
                  <Icon size={20} weight="bold" className="text-blue-ink" aria-hidden="true" />
                  <span className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-blue-ink">{c.k}</span>
                </div>
                <blockquote className="mt-[1.1rem] text-[clamp(1.15rem,2.1vw,1.55rem)] font-medium leading-[1.4] tracking-[-0.015em]">
                  {i === 0
                    ? (() => {
                        const phrase = lang === "fr" ? "un monde sans AVC" : "a world without stroke";
                        const idx = c.q.indexOf(phrase);
                        return idx === -1 ? (
                          c.q
                        ) : (
                          <>
                            {c.q.slice(0, idx)}
                            <span className="text-red-ink">{phrase}</span>
                            {c.q.slice(idx + phrase.length)}
                          </>
                        );
                      })()
                    : c.q}
                </blockquote>
              </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Nos valeurs */}
      <section className="py-[clamp(3.5rem,8vw,6.5rem)]">
        <Container>
          <Eyebrow>{a.values.eyebrow}</Eyebrow>
          <h2 className="mt-[0.9rem] max-w-[40ch] text-[clamp(1.55rem,3.4vw,2.4rem)]">{a.values.title}</h2>
          <div className="mt-[clamp(2rem,5vw,3rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.items.map((v, i) => {
              const style = VALUE_STYLES[i % VALUE_STYLES.length];
              const Icon = style.Icon;
              return (
                <Reveal key={v.t} delay={i * 90}>
                  <div
                    className="group flex h-full flex-col gap-3 border border-rule p-[clamp(1.3rem,3vw,1.7rem)]"
                    style={{ background: style.bg }}
                  >
                    <span
                      className="grid h-11 w-11 flex-none place-items-center rounded-full"
                      style={{ background: style.iconBg, color: style.text }}
                    >
                      <Icon
                        className="h-5 w-5 transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.3] motion-reduce:group-hover:scale-100"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="origin-left text-[1.05rem] font-bold tracking-[-0.01em] transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.06] motion-reduce:group-hover:scale-100">
                      {v.t}
                    </h3>
                    <p className="text-[0.92rem] leading-[1.5] text-ink-soft">{v.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bande devise */}
      <section className="bg-blue-ink py-[clamp(3.5rem,9vw,6.5rem)] text-center text-paper">
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
