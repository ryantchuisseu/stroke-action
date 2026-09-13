import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { HandNote } from "@/components/ink-marks";
import { CONTACT } from "@/lib/nav";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({ lang, route: "/contact", title: d.contact.crumb, description: d.contact.intro });
}

const field = "w-full border border-rule bg-paper px-3 py-2.5 text-[0.95rem] outline-none focus:border-blue";

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
        highlight={lang === "fr" ? "Écrivez-nous" : "message"}
        underline={lang === "fr" ? "ravis" : "love"}
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container className="grid gap-[clamp(2rem,6vw,4rem)] md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
              <h2 className="text-[1.2rem] font-semibold">{c.detailsTitle}</h2>
              <HandNote className="hidden rotate-[-3deg] sm:inline-block">{c.handNote}</HandNote>
            </div>
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

          <form className="grid gap-4" aria-label={c.title}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-[0.85rem] font-medium">
                {c.formName}
                <input className={field} type="text" name="name" required />
              </label>
              <label className="grid gap-1.5 text-[0.85rem] font-medium">
                {c.formPhone}
                <input className={field} type="tel" name="phone" />
              </label>
            </div>
            <label className="grid gap-1.5 text-[0.85rem] font-medium">
              {c.formEmail}
              <input className={field} type="email" name="email" required />
            </label>
            <label className="grid gap-1.5 text-[0.85rem] font-medium">
              {c.formSubject}
              <input className={field} type="text" name="subject" required />
            </label>
            <label className="grid gap-1.5 text-[0.85rem] font-medium">
              {c.formMessage}
              <textarea className={field} name="message" rows={5} required />
            </label>
            <fieldset className="grid gap-2 text-[0.85rem] font-medium">
              <legend className="mb-1">{c.formChannel}</legend>
              <div className="flex flex-wrap gap-4 font-normal text-ink-soft">
                {c.channels.map((o) => (
                  <label key={o} className="flex items-center gap-2">
                    <input type="radio" name="channel" value={o} /> {o}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="grid gap-1.5 text-[0.85rem] font-medium">
              {c.formAttachment}
              <input className={field} type="file" name="attachment" />
            </label>
            <button
              type="submit"
              className="mt-2 justify-self-start bg-blue-ink px-[1.1rem] py-[0.7rem] text-[0.88rem] font-semibold text-paper transition-colors hover:bg-red hover:text-white active:scale-[0.97]"
            >
              {c.submit}
            </button>
            <p className="text-[0.8rem] text-grey">{c.note}</p>
          </form>
        </Container>
      </section>
    </>
  );
}
