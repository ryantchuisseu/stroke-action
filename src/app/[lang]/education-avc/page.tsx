import type { Metadata } from "next";
import { Heartbeat, WarningCircle, Timer, Wheelchair, UsersFour } from "@phosphor-icons/react/ssr";
import { Container, PageHeader, Eyebrow, CtaBand, Btn } from "@/components/ui";
import { HandNote, InkUnderline } from "@/components/ink-marks";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

/* -------- "Le saviez-vous" : une icône par fait --------
 * Librairie Phosphor (import SSR, sans Provider) — plus expressive que
 * lucide pour ces icônes-là (retour Ryan). Voir V6-NOTES.md. */
const KNOW_ICONS = [Heartbeat, WarningCircle, Timer, Wheelchair, UsersFour];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/education-avc", title: d.education.crumb, description: d.education.whatIs.p });
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
        highlight={lang === "fr" ? "vies" : "Lives"}
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
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
            <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)]">
              {e.fastTitle.split(/(FAST)/).map((part, i) =>
                part === "FAST" ? (
                  <InkUnderline key={i}>{part}</InkUnderline>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h2>
            <HandNote className="hidden -mt-3 rotate-[-3deg] sm:inline-block">{e.fastNote}</HandNote>
          </div>
          <div className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {e.fast.map((f: { l: string; t: string; d: string; em?: boolean }) => (
              <div
                key={f.l}
                className={`group p-[clamp(1.1rem,2.5vw,1.7rem)] transition-colors duration-200 ease-[var(--ease-out)] ${f.em ? "bg-[color-mix(in_srgb,var(--color-red)_8%,var(--color-paper-deep))] hover:bg-[color-mix(in_srgb,var(--color-red)_14%,var(--color-paper-deep))]" : "bg-paper-deep hover:bg-[color-mix(in_srgb,var(--color-blue)_8%,var(--color-paper-deep))]"}`}
              >
                <div
                  className={`origin-left text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[0.9] tracking-[-0.04em] transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.12] motion-reduce:group-hover:scale-100 ${f.em ? "text-red" : "text-blue"}`}
                >
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
                <li key={m} className="group border-b border-rule transition-[background-color,padding] duration-200 ease-[var(--ease-out)] hover:bg-paper-deep hover:px-3">
                  <span className="inline-block origin-left py-[0.7rem] text-[0.96rem] transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100">
                    {m}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[clamp(1.4rem,2.8vw,2rem)]">{e.nonModifTitle}</h2>
            <p className="mt-1 text-[0.9rem] text-ink-soft">{e.nonModifSub}</p>
            <ul className="mt-5 border-t border-rule">
              {e.nonModif.map((m) => (
                <li key={m} className="group border-b border-rule transition-[background-color,padding] duration-200 ease-[var(--ease-out)] hover:bg-paper-deep hover:px-3">
                  <span className="inline-block origin-left py-[0.7rem] text-[0.96rem] transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100">
                    {m}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Chiffres clés */}
      <section className="bg-blue-ink py-[clamp(3rem,7vw,5.5rem)] text-paper">
        <Container>
          <span className="inline-block text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[rgba(252,250,246,0.65)]">
            {e.statsEyebrow}
          </span>
          <ul className="mt-6 grid gap-px border border-[rgba(252,250,246,0.14)] bg-[rgba(252,250,246,0.14)] sm:grid-cols-2 lg:grid-cols-3">
            {e.stats.map((s, i) => (
              <li
                key={s.t}
                className={`relative p-[clamp(1.3rem,2.8vw,1.8rem)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] ${
                  s.em
                    ? "bg-[color-mix(in_srgb,var(--color-red)_16%,var(--color-blue-ink))] before:bg-red"
                    : "bg-blue-ink before:bg-[rgba(252,250,246,0.3)]"
                }`}
              >
                <span className="text-[0.72rem] font-semibold tabular-nums tracking-[0.12em] text-[rgba(252,250,246,0.45)]">
                  {`0${i + 1}`}
                </span>
                <div className="mt-2 text-[clamp(1.7rem,3.4vw,2.3rem)] font-bold leading-[1] tracking-[-0.03em] text-white">
                  {s.n}
                </div>
                <p className="mt-2 text-[0.92rem] leading-[1.5] text-[rgba(252,250,246,0.8)]">{s.t}</p>
                {s.n === "80%" && (
                  <HandNote
                    variant="underline"
                    color="var(--color-red)"
                    className="mt-1 hidden rotate-[-3deg] sm:inline-block"
                  >
                    {e.preventableNote}
                  </HandNote>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Le saviez-vous */}
      <section id="le-saviez-vous" className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <Eyebrow>{e.knowEyebrow}</Eyebrow>
          <h2 className="mt-[0.9rem] max-w-[30ch] text-[clamp(1.6rem,3.4vw,2.4rem)]">{e.knowTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {e.know.map((k, i) => {
              const Icon = KNOW_ICONS[i % KNOW_ICONS.length];
              const isBlue = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`group relative border border-rule bg-paper p-[clamp(1.3rem,2.8vw,1.8rem)] transition-colors duration-200 ease-[var(--ease-out)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] hover:bg-paper-deep ${
                    isBlue ? "before:bg-blue" : "before:bg-red"
                  } ${i === e.know.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.15] motion-reduce:group-hover:scale-100 ${
                      isBlue
                        ? "bg-[color-mix(in_srgb,var(--color-blue)_14%,transparent)] text-blue-ink"
                        : "bg-[color-mix(in_srgb,var(--color-red)_14%,transparent)] text-red-ink"
                    }`}
                  >
                    <Icon size={20} weight="bold" aria-hidden="true" />
                  </span>
                  <span
                    className={`mt-3 inline-block origin-left text-[0.72rem] font-semibold tabular-nums tracking-[0.12em] transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.3] motion-reduce:group-hover:scale-100 ${
                      isBlue ? "text-blue-ink" : "text-red-ink"
                    }`}
                  >
                    {`0${i + 1}`}
                  </span>
                  <p className="mt-2 text-[0.95rem] leading-[1.6] text-ink-soft">{k}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBand
        title={e.cta.title}
        text={e.cta.text}
        actions={
          <>
            <Btn href={p("/contact")} onDark>{e.cta.volunteer}</Btn>
            <Btn href={p("/actualites")} variant="ghost" onDark>{e.cta.campaigns}</Btn>
          </>
        }
      />
    </>
  );
}
