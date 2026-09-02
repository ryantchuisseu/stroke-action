import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { CONTACT } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question, une suggestion, l'envie de vous engager ? Écrivez à Stroke Action AVC.",
};

const field = "w-full border border-rule bg-paper px-3 py-2.5 text-[0.95rem] outline-none focus:border-blue";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "S'engager" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Écrivez-nous."
        intro="Une question, une suggestion, l'envie de vous engager ? Nous serons ravis de vous lire."
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container className="grid gap-[clamp(2rem,6vw,4rem)] md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-[1.2rem] font-semibold">Coordonnées</h2>
            <dl className="mt-4 grid gap-4 text-[0.95rem]">
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-grey">E-mail</dt>
                <dd className="mt-1"><a href={`mailto:${CONTACT.email}`} className="hover:text-blue-ink">{CONTACT.email}</a></dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-grey">Téléphone / WhatsApp</dt>
                <dd className="mt-1"><a href={CONTACT.phoneHref} className="hover:text-blue-ink">{CONTACT.phone}</a></dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-grey">Adresse</dt>
                <dd className="mt-1">{CONTACT.address}</dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-grey">Site</dt>
                <dd className="mt-1">www.{CONTACT.domain}</dd>
              </div>
            </dl>
          </div>

          <form className="grid gap-4" aria-label="Formulaire de contact">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-[0.85rem] font-medium">
                Nom complet *
                <input className={field} type="text" name="name" required />
              </label>
              <label className="grid gap-1.5 text-[0.85rem] font-medium">
                Numéro de téléphone
                <input className={field} type="tel" name="phone" />
              </label>
            </div>
            <label className="grid gap-1.5 text-[0.85rem] font-medium">
              Adresse e-mail *
              <input className={field} type="email" name="email" required />
            </label>
            <label className="grid gap-1.5 text-[0.85rem] font-medium">
              Sujet *
              <input className={field} type="text" name="subject" required />
            </label>
            <label className="grid gap-1.5 text-[0.85rem] font-medium">
              Message * (français ou anglais)
              <textarea className={field} name="message" rows={5} required />
            </label>
            <fieldset className="grid gap-2 text-[0.85rem] font-medium">
              <legend className="mb-1">Comment souhaitez-vous être contacté ?</legend>
              <div className="flex flex-wrap gap-4 font-normal text-ink-soft">
                {["E-mail", "Téléphone", "WhatsApp"].map((o) => (
                  <label key={o} className="flex items-center gap-2">
                    <input type="radio" name="channel" value={o} /> {o}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="grid gap-1.5 text-[0.85rem] font-medium">
              Pièce jointe (facultatif)
              <input className={field} type="file" name="attachment" />
            </label>
            <button
              type="submit"
              className="mt-2 justify-self-start bg-ink px-[1.1rem] py-[0.7rem] text-[0.88rem] font-semibold text-paper transition-colors hover:bg-red hover:text-white active:scale-[0.97]"
            >
              Envoyer le message
            </button>
            <p className="text-[0.8rem] text-grey">
              Les demandes d&rsquo;adhésion se font via le formulaire dédié « Devenir membre » de la page Nous soutenir.
            </p>
          </form>
        </Container>
      </section>
    </>
  );
}
