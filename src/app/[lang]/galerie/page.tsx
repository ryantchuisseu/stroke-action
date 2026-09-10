import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

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
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-paper-deep" aria-hidden="true" />
            ))}
          </div>
          <p className="mt-8 max-w-[46ch] text-ink-soft">{g.placeholder}</p>
        </Container>
      </section>
    </>
  );
}
