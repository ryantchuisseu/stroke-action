import type { Metadata } from "next";
import { Container, PageHeader, Btn } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/espace-membres", title: d.members.crumb, description: d.members.intro });
}

export default async function EspaceMembresPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const m = t.members;
  const p = (href: string) => `/${lang}${href}`;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[3].label }, { label: m.crumb }]}
        eyebrow={m.eyebrow}
        title={m.title}
        intro={m.intro}
        highlight={lang === "fr" ? "disponible" : "soon"}
        underline={lang === "fr" ? "préparation" : "preparation"}
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <p className="max-w-[52ch] text-ink-soft">{m.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Btn href={p("/nous-soutenir#devenir-membre")}>{m.member}</Btn>
            <Btn href={p("/contact")} variant="ghost">{m.contact}</Btn>
          </div>
        </Container>
      </section>
    </>
  );
}
