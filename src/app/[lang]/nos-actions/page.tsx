import type { Metadata } from "next";
import { Megaphone, Microscope, GraduationCap, HeartHandshake, Users, type LucideIcon } from "lucide-react";
import { Container, PageHeader, CtaBand, Btn } from "@/components/ui";
import { Carousel } from "@/components/carousel";
import { Reveal } from "@/components/reveal";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/nos-actions", title: d.whatWeDo.crumb, description: d.whatWeDo.intro });
}

/* -------- Une teinte par programme, translucide (motif V6, cf. V6-NOTES.md) --------
 * Reprend telle quelle la palette de catégories déjà posée sur Blog/News et
 * "Nos piliers" (violet/rose/bleu de charte/pêche) + le vert de Blog/News
 * pour le 5e programme — pas de teinte nouvelle. Fonds en color-mix() à
 * faible dose pour rester translucides (le papier du site reste visible). */
const PROGRAM_STYLES: { bg: string; iconBg: string; text: string; Icon: LucideIcon }[] = [
  { bg: "color-mix(in srgb, #C9BEEA 38%, transparent)", iconBg: "#DAD3EF", text: "#5B4E96", Icon: Megaphone },
  { bg: "color-mix(in srgb, var(--color-blue) 16%, transparent)", iconBg: "#CFE6FA", text: "var(--color-blue-ink)", Icon: Microscope },
  { bg: "color-mix(in srgb, #E9B98A 34%, transparent)", iconBg: "#F3DCC2", text: "#B4763C", Icon: GraduationCap },
  { bg: "color-mix(in srgb, #DD9AAE 30%, transparent)", iconBg: "#F1D3DB", text: "#A84360", Icon: HeartHandshake },
  { bg: "color-mix(in srgb, #8FBF98 30%, transparent)", iconBg: "#D3E6D5", text: "#3F6B48", Icon: Users },
];

export default async function NosActionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const w = t.whatWeDo;
  const p = (href: string) => `/${lang}${href}`;

  const introHighlight = lang === "fr" ? "action concrète" : "concrete action";
  const [introPre, introPost] = w.intro.split(introHighlight);
  const introNode = (
    <>
      {introPre}
      <span className="inline-block rounded-[10px] bg-[color-mix(in_srgb,var(--color-blue)_18%,transparent)] px-2 py-0.5">
        {introHighlight}
      </span>
      {introPost}
    </>
  );

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[0].label }, { label: w.crumb }]}
        eyebrow={w.eyebrow}
        title={w.title}
        intro={w.intro}
        introNode={introNode}
        highlight={lang === "fr" ? "engagement" : "commitment"}
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
          <div className="grid gap-5">
            {w.programs.map((prog, i) => {
              const style = PROGRAM_STYLES[i % PROGRAM_STYLES.length];
              const Icon = style.Icon;
              return (
                <Reveal key={prog.n} delay={i * 80}>
                <article
                  className="grid gap-x-[clamp(1.5rem,5vw,3.5rem)] gap-y-4 border border-rule p-[clamp(1.5rem,4vw,2.5rem)] md:grid-cols-[4rem_1fr]"
                  style={{ background: style.bg }}
                >
                  <div className="flex flex-row items-center gap-3 md:flex-col md:items-start md:gap-4">
                    <span
                      className="grid h-12 w-12 flex-none place-items-center rounded-full"
                      style={{ background: style.iconBg, color: style.text }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span
                      className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold tabular-nums leading-none tracking-[-0.03em]"
                      style={{ color: style.text }}
                    >
                      {prog.n}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-[clamp(1.3rem,2.6vw,1.9rem)] tracking-[-0.02em]">{prog.t}</h2>
                    <p className="mt-1 text-[0.95rem] font-semibold" style={{ color: style.text }}>
                      {prog.s}
                    </p>
                    <ul className="mt-4 grid gap-2">
                      {prog.b.map((li, i2) => (
                        <li key={i2} className="grid grid-cols-[1.1rem_1fr] gap-2 text-[0.96rem] text-ink-soft">
                          <span className="mt-[0.6rem] h-[3px] w-[10px]" style={{ background: style.text }} />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-paper-deep py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <h2 className="text-[clamp(1.5rem,3.2vw,2.2rem)]">{w.metricsTitle}</h2>
          <p className="mt-2 text-ink-soft">{w.metricsNote}</p>
          <dl className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {w.metrics.map((m) => (
              <div
                key={m}
                className="group bg-paper-deep p-6 transition-colors duration-200 ease-[var(--ease-out)] hover:bg-[color-mix(in_srgb,var(--color-blue)_8%,var(--color-paper-deep))]"
              >
                <dd className="origin-left text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.04em] text-grey transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.08] motion-reduce:group-hover:scale-100">
                  —
                </dd>
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
