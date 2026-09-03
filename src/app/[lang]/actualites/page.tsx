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
    </>
  );
}
