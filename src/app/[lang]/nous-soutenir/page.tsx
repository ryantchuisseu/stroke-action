import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader, Eyebrow } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/nous-soutenir", title: d.support.crumb, description: d.support.intro });
}

export default async function SoutenirPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const s = t.support;
  const p = (href: string) => `/${lang}${href}`;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[3].label }, { label: s.crumb }]}
        eyebrow={s.eyebrow}
        title={s.title}
        intro={s.intro}
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
            {s.ways.map((way, i) => (
              <div
                key={way.id}
                id={way.id}
                className={`relative flex flex-col p-[clamp(1.5rem,3.5vw,2.5rem)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] ${
                  "strong" in way && way.strong
                    ? "bg-[color-mix(in_srgb,var(--color-red)_6%,var(--color-paper))] before:bg-red"
                    : "bg-paper before:bg-blue"
                }`}
              >
                <Eyebrow alert={"strong" in way && way.strong}>{`0${i + 1}`}</Eyebrow>
                <h2 className="mt-2 text-[clamp(1.3rem,2.6vw,1.8rem)] tracking-[-0.02em]">{way.t}</h2>
                <p className="mt-3 flex-1 text-[0.95rem] text-ink-soft">{way.d}</p>
                {"href" in way && way.href ? (
                  <Link
                    href={p(way.href)}
                    className="mt-5 inline-flex w-fit items-center px-[1.1rem] py-[0.62rem] text-[0.88rem] font-semibold bg-blue-ink text-paper transition-[background-color,color,transform] duration-150 hover:bg-red hover:text-white active:scale-[0.97]"
                  >
                    {way.cta}
                  </Link>
                ) : "drawer" in way && way.drawer ? (
                  <button
                    type="button"
                    data-drawer={way.drawer}
                    className="mt-5 inline-flex w-fit items-center px-[1.1rem] py-[0.62rem] text-[0.88rem] font-semibold bg-blue-ink text-paper transition-[background-color,color,transform] duration-150 hover:bg-red hover:text-white active:scale-[0.97]"
                  >
                    {way.cta}
                  </button>
                ) : (
                  <span className="mt-5 inline-flex w-fit cursor-not-allowed items-center bg-rule px-[1.1rem] py-[0.62rem] text-[0.88rem] font-semibold text-grey">
                    {way.cta}
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-[0.85rem] text-grey">{s.note}</p>
        </Container>
      </section>
    </>
  );
}
