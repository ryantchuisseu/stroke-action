import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

const photos = [
  { src: "/gallery/radio-maria-1.jpg", w: 1600, h: 1205, cls: "col-span-2" },
  { src: "/gallery/radio-maria-3.jpg", w: 1200, h: 1600, cls: "" },
  { src: "/gallery/radio-maria-2.jpg", w: 1600, h: 1205, cls: "" },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/galerie", title: d.gallery.crumb, description: d.gallery.metaDesc });
}

export default async function GaleriePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const g = t.gallery;
  const s = g.story;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[2].label }, { label: g.crumb }]}
        eyebrow={g.eyebrow}
        title={g.title}
        highlight={lang === "fr" ? "images" : "pictures"}
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
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
              <a
                href={s.listenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 bg-blue-ink px-[1.1rem] py-[0.62rem] text-[0.88rem] font-semibold tracking-[0.01em] text-paper transition-[transform,background-color] duration-150 ease-[var(--ease-out)] hover:bg-red active:scale-[0.97]"
              >
                {s.listen} ↗
              </a>
              <p className="mt-2 text-[0.82rem] text-ink-soft">{s.listenNote}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {photos.map((ph, i) => (
                <figure key={ph.src} className={`overflow-hidden bg-paper-deep ${ph.cls}`}>
                  <Image
                    src={ph.src}
                    alt={s.alts[i]}
                    width={ph.w}
                    height={ph.h}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
