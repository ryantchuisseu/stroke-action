import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { BrainMark } from "@/components/brain-mark";
import { BoardGrid } from "@/components/board-grid";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/gouvernance", title: d.governance.crumb, description: d.governance.intro });
}

export default async function GouvernancePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const g = t.governance;
  const founderName = g.board[0].name;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[0].label }, { label: g.crumb }]}
        eyebrow={g.eyebrow}
        title={g.title}
        intro={g.intro}
      />

      {/* Déclaration — texte / portrait du fondateur / texte */}
      <section className="py-[clamp(3rem,9vw,7.5rem)]">
        <Container>
          <div className="grid items-center gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-10 md:grid-cols-[1fr_auto_1fr]">
            <p className="text-[clamp(1.15rem,2vw,1.5rem)] font-medium leading-[1.4] tracking-[-0.015em] text-balance md:text-right">
              {g.introLeft}
            </p>

            <figure className="mx-auto w-[min(68vw,320px)] shrink-0">
              <BrainMark className="mx-auto mb-5 h-7 w-7 text-ink" />
              <div className="aspect-[3/4] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/dr-kamtchum.jpg"
                  alt={`${founderName} — ${g.founderCaptionRole}`}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <figcaption className="mt-4 text-center text-[0.74rem] uppercase tracking-[0.14em] text-grey">
                {founderName}
                <span className="mt-1 block text-blue-ink">{g.founderCaptionRole}</span>
              </figcaption>
            </figure>

            <p className="text-[clamp(1.15rem,2vw,1.5rem)] font-medium leading-[1.4] tracking-[-0.015em] text-balance md:text-left">
              {g.introRight}
            </p>
          </div>
        </Container>
      </section>

      {/* Bureau exécutif */}
      <section className="border-t border-rule py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <h2 className="text-[clamp(1.4rem,2.8vw,2rem)]">{g.boardTitle}</h2>
          <BoardGrid board={g.board} readMore={g.readMore} closeLabel={g.closeBio} />
          <p className="mt-6 text-[0.85rem] text-grey">{g.note}</p>
        </Container>
      </section>
    </>
  );
}
