import Link from "next/link";
import { Container, Btn, Eyebrow, SectionHead, ArrowLink, CtaBand } from "@/components/ui";
import { SecondsBand } from "@/components/seconds-band";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { HandNote, highlightWord, underlineWord } from "@/components/ink-marks";
import { CreditedPhoto } from "@/components/photo-credit";
import { getDictionary, type Locale } from "@/dictionaries";

/* -------- Formes qui dérivent en fond de hero --------
 * Motif "V6" (cf. V6-NOTES.md). Revu après retour critique (trop de points,
 * trop gros, trop rouges, passaient derrière le texte/les boutons) :
 * - 3 points au lieu de 5, tailles plafonnées via clamp() (raisonnable sur
 *   mobile), opacité baissée à 8-10%.
 * - gris-bleu très pâle (bg-blue-ink) au lieu de rouge : le rouge reste
 *   réservé à la ligne d'alerte "neurones perdus" et au point final du titre.
 * - repoussés dans les coins vides (bords + zone photo), aucun ne recouvre
 *   le bloc de texte ni les boutons.
 * -z-10 pour rester derrière le texte et la photo. */
type Drift = { top: string; left: string; size: string; dx: number; dy: number; dur: number; delay: number; opacity: number };
const HERO_DRIFTS: Drift[] = [
  { top: "2%", left: "-4%", size: "clamp(60px,18vw,130px)", dx: 30, dy: -22, dur: 16, delay: 0, opacity: 0.09 },
  { top: "90%", left: "0%", size: "clamp(50px,15vw,110px)", dx: -26, dy: 20, dur: 14, delay: 2, opacity: 0.08 },
  { top: "6%", left: "84%", size: "clamp(70px,20vw,150px)", dx: -32, dy: 26, dur: 18, delay: 1, opacity: 0.1 },
];
function HeroDrift() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {HERO_DRIFTS.map((d, i) => (
        <span
          key={i}
          className="sa-float absolute rounded-full bg-blue-ink blur-md"
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

/* -------- 4 piliers : cartes blanches + badge numéro plein --------
 * Test d'une référence apportée par Ryan (fond blanc, badge en pilule
 * coloré, lien "En savoir plus" dans la couleur du badge). Couleurs =
 * les teintes profondes déjà utilisées ailleurs sur le site (Nos
 * valeurs/Nos actions), en plein cette fois au lieu de translucide.
 * Voir V6-NOTES.md. */
const PILLAR_STYLES: Record<string, { badge: string }> = {
  education: { badge: "#5B4E96" },
  research: { badge: "var(--color-blue-ink)" },
  training: { badge: "#B4763C" },
  support: { badge: "#A84360" },
};

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const h = t.home;
  const p = (href: string) => `/${lang}${href}`;

  const heroHighlight = lang === "fr" ? "l'AVC" : "Stroke";
  const heroUnderline = lang === "fr" ? "non lucratif" : "non-profit";
  const whoHighlight = lang === "fr" ? "communauté" : "community";
  const whoUnderline = lang === "fr" ? "rassemble" : "together";

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
              {highlightWord(h.hero.headline, heroHighlight, { flourish: true })}
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
              {underlineWord(h.hero.sub, heroUnderline)}
            </p>
            <div className="hero-stg hero-d6 mt-8 flex flex-wrap items-center gap-3">
              <Btn href={p("/a-propos")}>{h.hero.ctaPrimary}</Btn>
              <Btn href={p("/nous-soutenir#devenir-membre")} variant="ghost">
                {h.hero.ctaSecondary}
              </Btn>
              <HandNote className="hidden rotate-[-4deg] sm:inline-block">{h.hero.handNote}</HandNote>
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
            <CreditedPhoto
              src="/photos/soignante.jpg"
              alt=""
              href="https://www.merckgroup.com/en/news/praziquantel-tablet-donation-24-01-2022.html"
              className="h-full w-full"
            />
          </figure>
          <div>
            <Eyebrow>{h.who.eyebrow}</Eyebrow>
            <h2 className="mt-[0.9rem] text-[clamp(1.6rem,3.6vw,2.6rem)]">
              {highlightWord(h.who.title, whoHighlight, { flourish: true })}
            </h2>
            <div className="mt-[1.1rem] max-w-[52ch] space-y-4 text-ink-soft">
              <p>{underlineWord(h.who.p1, whoUnderline)}</p>
              <p>{h.who.p2}</p>
            </div>
            <ArrowLink href={p("/a-propos")}>{h.who.link}</ArrowLink>
          </div>
        </Container>
      </section>

      {/* 4 PILIERS */}
      <section className="py-[clamp(3.75rem,9vw,7.5rem)]">
        <Container>
          <SectionHead
            eyebrow={h.pillars.eyebrow}
            title={h.pillars.title}
            highlight={lang === "fr" ? "piliers" : "pillars"}
          />
          <div className="mt-[clamp(2rem,5vw,3rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {h.pillars.items.map((it, i) => {
              const cat = PILLAR_STYLES[it.id] ?? PILLAR_STYLES.education;
              return (
                <Reveal
                  key={it.id}
                  delay={i * 90}
                  className="flex h-full flex-col gap-3 rounded-[14px] border border-rule bg-paper p-[clamp(1.3rem,3vw,1.7rem)]"
                >
                  <span
                    className="flex h-9 w-7 flex-none items-center justify-center rounded-full text-[0.8rem] font-bold text-white"
                    style={{ background: cat.badge }}
                  >
                    {`0${i + 1}`}
                  </span>
                  <h3 className="mt-1 text-[1.05rem] font-bold tracking-[-0.01em]">{it.t}</h3>
                  <p className="flex-1 text-[0.92rem] leading-[1.5] text-ink-soft">{it.d}</p>
                  <Link
                    href={p("/nos-actions")}
                    className="group/link inline-flex w-fit items-center gap-1 text-[0.88rem] font-semibold"
                    style={{ color: cat.badge }}
                  >
                    {h.pillars.cta}
                    <span aria-hidden="true" className="transition-transform duration-200 ease-[var(--ease-out)] group-hover/link:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CHAQUE SECONDE COMPTE */}
      <SecondsBand d={h.seconds} donateHref={p("/nous-soutenir#don")} />

      {/* APERÇU FAST */}
      <section id="fast" className="py-[clamp(3.75rem,9vw,7.5rem)]">
        <Container>
          <SectionHead eyebrow={h.fast.eyebrow} alert title={h.fast.title} intro={h.fast.intro} highlight="FAST" />
          <div className="mt-[clamp(2rem,5vw,3rem)] grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {h.fast.items.map((f: { l: string; t: string; d: string; em?: boolean }) => (
              <div
                key={f.l}
                className={`group p-[clamp(1.1rem,2.5vw,1.7rem)] transition-colors duration-200 ease-[var(--ease-out)] ${
                  f.em
                    ? "bg-[color-mix(in_srgb,var(--color-red)_7%,var(--color-paper))] hover:bg-[color-mix(in_srgb,var(--color-red)_13%,var(--color-paper))]"
                    : "bg-paper hover:bg-[color-mix(in_srgb,var(--color-blue)_7%,var(--color-paper))]"
                }`}
              >
                <div
                  className={`origin-left text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[0.9] tracking-[-0.04em] transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.12] motion-reduce:group-hover:scale-100 ${
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
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
            <SectionHead eyebrow={h.stats.eyebrow} title={h.stats.title} highlight={lang === "fr" ? "temps" : "time"} />
            <HandNote className="hidden rotate-[3deg] sm:inline-block">{h.stats.handNote}</HandNote>
          </div>
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
        <CreditedPhoto
          src="/photos/homme-espoir.jpg"
          alt=""
          href="https://www.zeit.de/gesundheit/2024-11/krankenhaeuser-sudan-buergerkrieg-nubaberge-humanitaere-hilfe"
          className="relative aspect-[21/9] w-full max-sm:aspect-[4/3]"
        />
        <Container>
          <div className="mt-[clamp(2rem,5vw,3rem)] max-w-[46ch]">
            <Eyebrow>{h.voices.eyebrow}</Eyebrow>
            <h2 className="mt-[0.9rem] text-[clamp(1.6rem,3.6vw,2.6rem)]">
              {highlightWord(h.voices.title, lang === "fr" ? "histoire" : "story", { flourish: true })}
            </h2>
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
    <div className="group">
      <div
        className={`flex origin-left items-baseline gap-[0.05em] text-[clamp(2.7rem,8vw,5.2rem)] font-bold leading-[0.9] tabular-nums tracking-[-0.045em] transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.06] motion-reduce:group-hover:scale-100 ${
          accent ? "text-red-ink" : ""
        }`}
      >
        {n}
      </div>
      <p className="mt-[0.75rem] max-w-[26ch] text-[0.94rem] text-ink-soft">{k}</p>
    </div>
  );
}
