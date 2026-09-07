import type { Metadata } from "next";
import { Container, PageHeader, Eyebrow } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(isLocale(lang) ? lang : "fr").news.crumb };
}

export default async function ActualitesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const n = t.news;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[2].label }, { label: n.crumb }]}
        eyebrow={n.eyebrow}
        title={n.title}
        intro={n.intro}
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <ul className="border-t border-rule">
            {n.posts.map((post) => (
              <li key={post.t} className="border-b border-rule py-[clamp(1.25rem,3vw,2rem)]">
                <article className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-8">
                  <Eyebrow>{post.cat}</Eyebrow>
                  <div>
                    <h2 className="text-[clamp(1.15rem,2.2vw,1.5rem)] tracking-[-0.015em]">{post.t}</h2>
                    <p className="mt-2 max-w-[60ch] text-[0.95rem] text-ink-soft">{post.d}</p>
                    <span className="mt-3 inline-block text-[0.85rem] font-semibold text-grey">{n.postSoon}</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.85rem] text-grey">{n.note}</p>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-ink py-[clamp(3rem,8vw,6rem)] text-paper">
        <Container>
          <div className="grid gap-[clamp(1.5rem,5vw,4rem)] md:grid-cols-[1fr_1.1fr] md:items-end">
            <div>
              <span className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[rgba(252,250,246,0.65)]">
                {n.newsletter.eyebrow}
              </span>
              <h2 className="mt-3 text-[clamp(1.6rem,3.6vw,2.6rem)] tracking-[-0.025em]">{n.newsletter.title}</h2>
              <p className="mt-3 max-w-[42ch] text-[rgba(252,250,246,0.7)]">{n.newsletter.text}</p>
            </div>
            <form className="w-full" aria-label={n.newsletter.title}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="nl-email">
                  {n.newsletter.placeholder}
                </label>
                <input
                  id="nl-email"
                  type="email"
                  name="email"
                  required
                  placeholder={n.newsletter.placeholder}
                  className="min-w-0 flex-1 border border-[rgba(252,250,246,0.28)] bg-transparent px-4 py-3 text-[0.95rem] text-paper placeholder:text-[rgba(252,250,246,0.4)] outline-none focus:border-paper"
                />
                <button
                  type="submit"
                  className="flex-none bg-paper px-6 py-3 text-[0.88rem] font-semibold text-ink transition-colors duration-150 hover:bg-red hover:text-white active:scale-[0.97]"
                >
                  {n.newsletter.cta}
                </button>
              </div>
              <p className="mt-3 text-[0.78rem] text-[rgba(252,250,246,0.45)]">{n.newsletter.note}</p>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
