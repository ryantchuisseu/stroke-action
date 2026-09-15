import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { CONTACT } from "@/lib/nav";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/contact", title: d.contact.crumb, description: d.contact.intro });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const c = t.contact;

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[3].label }, { label: c.crumb }]}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container className="grid gap-[clamp(2rem,6vw,4rem)] md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-[1.2rem] font-semibold">{c.detailsTitle}</h2>
            <dl className="mt-4 grid gap-4 text-[0.95rem]">
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-grey">{c.labelEmail}</dt>
                <dd className="mt-1"><a href={`mailto:${CONTACT.email}`} className="hover:text-blue-ink">{CONTACT.email}</a></dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-grey">{c.labelPhone}</dt>
                <dd className="mt-1"><a href={CONTACT.phoneHref} className="hover:text-blue-ink">{CONTACT.phone}</a></dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-grey">{c.labelAddress}</dt>
                <dd className="mt-1">{CONTACT.address}</dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-grey">{c.labelWebsite}</dt>
                <dd className="mt-1">www.{CONTACT.domain}</dd>
              </div>
            </dl>
          </div>

          <ContactForm c={c} />
        </Container>
      </section>
    </>
  );
}
