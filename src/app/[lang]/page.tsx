import { Container, Btn, Eyebrow, SectionHead, ArrowLink, CtaBand } from "@/components/ui";
import { BrainMark } from "@/components/brain-mark";
import { SecondsBand } from "@/components/seconds-band";
import { CountUp } from "@/components/count-up";
import { getDictionary, type Locale } from "@/dictionaries";

/* -------- Formes qui dérivent en fond de hero --------
 * Motif "V6" (cf. V6-NOTES.md) : ce sont des points rouges, écho du point
 * du logo et du "neurone" évoqué par les chiffres (2M neurones/minute).
 * Ryan : le 1er réglage (opacité 4-7%) était "trop discret" -> remonté à
 * 16-26%, tailles et amplitude de mouvement augmentées, plus rapide.
 * -z-10 pour rester derrière le texte et la photo. */
type Drift = { top: string; left: string; size: number; dx: number; dy: number; dur: number; delay: number; opacity: number };
const HERO_DRIFTS: Drift[] = [
  { top: "6%", left: "0%", size: 220, dx: 46, dy: -34, dur: 15, delay: 0, opacity: 0.22 },
  { top: "56%", left: "4%", size: 140, dx: -38, dy: 40, dur: 12, delay: 1.5, opacity: 0.19 },
  { top: "10%", left: "80%", size: 250, dx: -48, dy: 36, dur: 17, delay: 0.8, opacity: 0.2 },
  { top: "68%", left: "72%", size: 170, dx: 34, dy: -42, dur: 13, delay: 3, opacity: 0.22 },
  { top: "36%", left: "42%", size: 300, dx: 40, dy: 38, dur: 19, delay: 1, opacity: 0.16 },
];
function HeroDrift() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {HERO_DRIFTS.map((d, i) => (
        <span
          key={i}
          className="sa-float absolute rounded-full bg-red blur-xl"
          style={
            {
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
              "--dx": `${d.dx}px`,
              "--dy": `${d.dy}px`,
              "--dur": `${d.dur}s`,
              "--delay": `${d.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const h = t.home;
  const p = (href: string) => `/${lang}${href}`;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-[clamp(2rem,5vw,4rem)] pb-[clamp(3.25rem,7vw,6rem)]">
        <HeroDrift />
        <Container className="grid items-center gap-[clamp(2rem,6vw,5rem)] md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="hero-stg hero-d1 inline-block text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-blue-ink">
              {h.hero.eyebrow}
            </span>
            <h1 className="hero-stg hero-d2 mt-4 text-[clamp(2.5rem,6.6vw,5rem)] leading-[1.02] tracking-[-0.035em]">
              {h.hero.headline}
              <span className="hero-end-dot" aria-hidden="true" />
            </h1>
            <p className="hero-stg hero-d4 mt-6 flex max-w-[34ch] items-start gap-[0.7rem] text-[clamp(0.95rem,1.4vw,1.12rem)] font-semibold text-red-ink">
              <svg viewBox="0 0 40 40" className="mt-0.5 h-[22px] w-[22px] flex-none text-red-ink" aria-hidden="true">
                <path
                  className="hero-mark-path"
                  d="M8 27C4 18 9 7 20 7c10 0 16 8 14 18-1 5-6 8-12 7-4-1-6 1-10 0-3-1-4-2-4-5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
                <circle className="hero-mark-dot" cx="24" cy="20" r="3.6" fill="currentColor" />
              </svg>
              <span>{h.hero.brainline}</span>
            </p>
            <p className="hero-stg hero-d5 mt-[1.1rem] max-w-[48ch] text-[clamp(1rem,1.4vw,1.15rem)] text-ink-soft">
              {h.hero.sub}
            </p>
            <div className="hero-stg hero-d6 mt-8 flex flex-wrap gap-3">
              <Btn href={p("/a-propos")}>{h.hero.ctaPrimary}</Btn>
              <Btn href={p("/nous-soutenir#devenir-membre")} variant="ghost">
                {h.hero.ctaSecondary}
              </Btn>
            </div>
          </div>
          <div className="hero-stg hero-d3 aspect-[3/4] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photos/portrait-femme.jpg"
              alt=""
              className="hero-img-in h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* QUI SOMMES-NOUS */}
      <section className="bg-paper-deep py-[clamp(3.75rem,9vw,7.5rem)]">
        <Container className="grid items-center gap-[clamp(2rem,6vw,5rem)] md:grid-cols-[0.85fr_1.15fr]">
          <figure className="m-0 aspect-[16/10] overflow-hidden md:order-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/soignante.jpg" alt="" className="h-full w-full object-cover" />
          </figure>
          <div>
            <Eyebrow>{h.who.eyebrow}</Eyebrow>
            <h2 className="mt-[0.9rem] text-[clamp(1.6rem,3.6vw,2.6rem)]">{h.who.title}</h2>
            <div className="mt-[1.1rem] max-w-[52ch] space-y-4 text-ink-soft">
              <p>{h.who.p1}</p>
              <p>{h.who.p2}</p>
            </div>
            <ArrowLink href={p("/a-propos")}>{h.who.link}</ArrowLink>
          </div>
        </Container>
      </section>

      {/* 4 PILIERS */}
      <section className="py-[clamp(3.75rem,9vw,7.5rem)]">
        <Container>
          <SectionHead eyebrow={h.pillars.eyebrow} title={h.pillars.title} />
          <div className="mt-[clamp(2rem,5vw,3rem)] border-t border-rule">
            {h.pillars.items.map((it) => (
              <div
                key={it.t}
                className="grid grid-cols-[26px_1fr] items-baseline gap-x-7 gap-y-2 border-b border-rule py-[clamp(1.15rem,2.8vw,1.7rem)] transition-[padding] duration-200 ease-[var(--ease-out)] sm:grid-cols-[26px_12rem_1fr] sm:hover:ps-3"
              >
                <BrainMark className="mt-[2px] h-6 w-6 self-start text-blue-ink" />
                <h3 className="text-[clamp(1.1rem,2vw,1.45rem)] tracking-[-0.015em]">{it.t}</h3>
                <p className="col-start-2 max-w-[52ch] text-[0.96rem] text-ink-soft sm:col-start-3">{it.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CHAQUE SECONDE COMPTE */}
      <SecondsBand d={h.seconds} donateHref={p("/nous-soutenir#don")} />

      {/* APERÇU FAST */}
      <section id="fast" className="py-[clamp(3.75rem,9vw,7.5rem)]">
        <Container>
          <SectionHead eyebrow={h.fast.eyebrow} alert title={h.fast.title} intro={h.fast.intro} />
          <div className="mt-[clamp(2rem,5vw,3rem)] grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {h.fast.items.map((f: { l: string; t: string; d: string; em?: boolean }) => (
              <div
                key={f.l}
                className={`p-[clamp(1.1rem,2.5vw,1.7rem)] ${
                  f.em ? "bg-[color-mix(in_srgb,var(--color-red)_7%,var(--color-paper))]" : "bg-paper"
                }`}
              >
                <div
                  className={`text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[0.9] tracking-[-0.04em] ${
                    f.em ? "text-red" : "text-blue"
                  }`}
                >
                  {f.l}
                </div>
                <h3 className="mt-[0.65rem] text-[0.95rem] font-semibold">{f.t}</h3>
                <p className="mt-[0.3rem] text-[0.85rem] text-ink-soft">{f.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-[1.3rem] flex flex-wrap items-baseline gap-x-6 gap-y-[0.55rem] text-[0.9rem] text-ink-soft">
            <b className="font-semibold text-ink">{t.common.urgencyLabel}</b>
            <span>{t.common.samu} <span className="font-bold tabular-nums tracking-[0.02em] text-red-ink">119</span></span>
            <span>{t.common.fire} <span className="font-bold tabular-nums tracking-[0.02em] text-red-ink">118</span></span>
            <span>{t.common.police} <span className="font-bold tabular-nums tracking-[0.02em] text-red-ink">117</span></span>
          </p>
          <ArrowLink href={p("/education-avc")}>{h.fast.link}</ArrowLink>
        </Container>
      </section>

      {/* CHIFFRES */}
      <section className="bg-paper-deep py-[clamp(3.75rem,9vw,7.5rem)]">
        <Container>
          <SectionHead eyebrow={h.stats.eyebrow} title={h.stats.title} />
          <div className="mt-[clamp(2rem,5vw,3rem)] grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-16 gap-y-10">
            <Stat n={<><CountUp to={12} /><U>{h.stats.items[0].unit}</U></>} k={h.stats.items[0].k} />
            <Stat n={<>1<U>{lang === "fr" ? " sur " : " in "}</U><CountUp to={4} /></>} k={h.stats.items[1].k} />
            <Stat n={<><CountUp to={80} /><U>{h.stats.items[2].unit}</U></>} k={h.stats.items[2].k} accent />
            <Stat n={<><CountUp to={2} /><U>{h.stats.items[3].unit}</U></>} k={h.stats.items[3].k} />
          </div>
          <p className="mt-10 text-[0.8rem] text-grey">{h.stats.source}</p>
        </Container>
      </section>

      {/* ILS EN PARLENT */}
      <section className="py-[clamp(3.75rem,9vw,7.5rem)]">
        <div className="relative aspect-[21/9] w-full overflow-hidden max-sm:aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/homme-espoir.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <Container>
          <div className="mt-[clamp(2rem,5vw,3rem)] max-w-[46ch]">
            <Eyebrow>{h.voices.eyebrow}</Eyebrow>
            <h2 className="mt-[0.9rem] text-[clamp(1.6rem,3.6vw,2.6rem)]">{h.voices.title}</h2>
            <p className="mt-[0.9rem] text-ink-soft">{h.voices.text}</p>
            <ArrowLink href={p("/galerie")}>{h.voices.link}</ArrowLink>
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <CtaBand
        title={
          <>
            {h.finalCta.titlePre}
            <span className="underline decoration-red decoration-[3px] underline-offset-[6px]">
              {h.finalCta.titleAccent}
            </span>
            .
          </>
        }
        text={h.finalCta.text}
        actions={
          <>
            <Btn href={p("/nous-soutenir#don")} onDark>{h.finalCta.donate}</Btn>
            <Btn href={p("/nous-soutenir#devenir-membre")} variant="ghost" onDark>{h.finalCta.member}</Btn>
            <Btn href={p("/contact")} variant="ghost" onDark>{h.finalCta.contact}</Btn>
          </>
        }
      />
    </>
  );
}

function U({ children }: { children: React.ReactNode }) {
  return <span className="text-[0.3em] font-semibold text-ink-soft">{children}</span>;
}

function Stat({ n, k, accent = false }: { n: React.ReactNode; k: string; accent?: boolean }) {
  return (
    <div>
      <div
        className={`flex items-baseline gap-[0.05em] text-[clamp(2.7rem,8vw,5.2rem)] font-bold leading-[0.9] tabular-nums tracking-[-0.045em] ${
          accent ? "text-red-ink" : ""
        }`}
      >
        {n}
      </div>
      <p className="mt-[0.75rem] max-w-[26ch] text-[0.94rem] text-ink-soft">{k}</p>
    </div>
  );
}
