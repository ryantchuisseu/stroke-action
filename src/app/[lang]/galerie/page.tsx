import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

type Photo = { src: string; w: number; h: number; cls: string };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/galerie", title: d.gallery.crumb, description: d.gallery.metaDesc });
}

export default async function GaleriePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const g = t.gallery;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[2].label }, { label: g.crumb }]}
        eyebrow={g.eyebrow}
        title={g.title}
        highlight={lang === "fr" ? "images" : "pictures"}
      />
      {g.stories.map((s, idx) => {
        const photos = s.photos as readonly Photo[];
        return (
          <section
            key={s.title}
            className={`py-[clamp(3rem,7vw,5.5rem)] ${idx > 0 ? "border-t border-rule" : ""}`}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <Eyebrow>
                    {s.kicker} · {s.date}
                  </Eyebrow>
                  <h2 className="mt-3 text-[clamp(1.6rem,3.2vw,2.3rem)] font-bold leading-tight text-ink">{s.title}</h2>
                  <p className="mt-5 max-w-[46ch] text-ink-soft">{s.text}</p>
                  <p className="mt-3 max-w-[46ch] text-ink-soft">{s.guests}</p>
                  <p className="mt-6 border-s-2 border-red ps-4">
                    <span className="block text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-red-ink">
                      {s.topicLabel}
                    </span>
                    <span className="mt-1 block text-[1.15rem] font-semibold leading-snug text-ink">« {s.topic} »</span>
                  </p>
                  {photos.length > 0 && (
                    <>
                      <div className="mt-7 flex flex-wrap gap-3">
                        {s.listens.map((l) => (
                          <ListenButton key={l.url} href={l.url} label={l.label} />
                        ))}
                      </div>
                      <p className="mt-2 text-[0.82rem] text-ink-soft">{s.listenNote}</p>
                    </>
                  )}
                </div>
                {photos.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {photos.map((ph, i) => (
                      <figure key={ph.src} className={`overflow-hidden bg-paper-deep ${ph.cls}`}>
                        <Image
                          src={ph.src}
                          alt={s.alts[i] ?? ""}
                          width={ph.w}
                          height={ph.h}
                          sizes="(min-width: 1024px) 45vw, 100vw"
                          className="h-full w-full object-cover"
                        />
                      </figure>
                    ))}
                  </div>
                ) : (
                  <AudioCard listens={s.listens} note={s.listenNote} />
                )}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}

function ListenButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-blue-ink px-[1.1rem] py-[0.62rem] text-[0.88rem] font-semibold tracking-[0.01em] text-paper transition-[transform,background-color] duration-150 ease-[var(--ease-out)] hover:bg-red active:scale-[0.97]"
    >
      {label} ↗
    </a>
  );
}

/** Carte « audio » pour une émission sans photos : une piste par ligne, bouton d'écoute à droite. */
function AudioCard({ listens, note }: { listens: readonly { label: string; url: string }[]; note: string }) {
  return (
    <div className="relative self-start overflow-hidden border border-rule bg-paper-deep p-[clamp(1.5rem,4vw,2.5rem)]">
      <div className="flex items-center gap-3 text-blue-ink">
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3M8.5 21h7" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 120 24" className="h-6 flex-1 text-red" aria-hidden="true">
          <polyline points="0,12 70,12 78,3 86,21 92,8 97,12 120,12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>
      <ul className="mt-6 divide-y divide-rule border-y border-rule">
        {listens.map((l, i) => (
          <li key={l.url} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <span className="flex items-baseline gap-3">
              <span className="text-[1.6rem] font-bold leading-none text-blue-ink/30">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-semibold text-ink">{l.label}</span>
            </span>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              className="inline-flex items-center gap-2 bg-blue-ink px-4 py-2 text-[0.85rem] font-semibold text-paper transition-[transform,background-color] duration-150 ease-[var(--ease-out)] hover:bg-red active:scale-[0.97]"
            >
              ▶ SoundCloud
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.82rem] text-ink-soft">{note}</p>
    </div>
  );
}
