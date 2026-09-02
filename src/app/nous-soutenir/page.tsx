import type { Metadata } from "next";
import { Container, PageHeader, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Nous soutenir",
  description: "Faire un don, devenir membre, acheter nos produits ou donner de son temps — chaque geste compte.",
};

const WAYS = [
  {
    id: "don",
    t: "Faire un don",
    d: "Votre don finance l'imagerie cérébrale des patients en difficulté, les campagnes de sensibilisation, les formations et le renforcement de l'association. Chaque contribution compte.",
    cta: "Faire un don (bientôt)",
    disabled: true,
    strong: true,
  },
  {
    id: "devenir-membre",
    t: "Devenir membre",
    d: "Rejoignez une communauté grandissante de personnes engagées contre l'AVC au Cameroun, en Afrique et dans le monde. Formulaire : nom, date de naissance, e-mail, téléphone, profession, ville / pays, motivation, pièce d'identité avec photo.",
    cta: "Demander l'adhésion",
  },
  {
    id: "boutique",
    t: "Notre boutique",
    d: "Autocollants, livre, brochures et d'autres articles à venir. Chaque achat soutient directement notre mission.",
    cta: "Boutique (bientôt)",
    disabled: true,
  },
  {
    id: "benevolat",
    t: "Devenir bénévole",
    d: "Vous êtes motivé·e par la lutte contre l'AVC ? Nous accueillons les bénévoles de toutes compétences, quel que soit leur parcours ou leur profession.",
    cta: "S'impliquer",
  },
];

export default function SoutenirPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "S'engager" }, { label: "Nous soutenir" }]}
        eyebrow="Nous soutenir"
        title="Stroke Action existe grâce à vous."
        intro="Des personnes qui croient qu'ensemble, nous pouvons vaincre l'AVC. Voici comment agir."
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
            {WAYS.map((w) => (
              <div
                key={w.id}
                id={w.id}
                className={`flex flex-col p-[clamp(1.5rem,3.5vw,2.5rem)] ${
                  w.strong ? "bg-[color-mix(in_srgb,var(--color-red)_6%,var(--color-paper))]" : "bg-paper"
                }`}
              >
                <Eyebrow alert={w.strong}>{`0${WAYS.indexOf(w) + 1}`}</Eyebrow>
                <h2 className="mt-2 text-[clamp(1.3rem,2.6vw,1.8rem)] tracking-[-0.02em]">{w.t}</h2>
                <p className="mt-3 flex-1 text-[0.95rem] text-ink-soft">{w.d}</p>
                <span
                  className={`mt-5 inline-flex w-fit items-center px-[1.1rem] py-[0.62rem] text-[0.88rem] font-semibold ${
                    w.disabled
                      ? "cursor-not-allowed bg-rule text-grey"
                      : "bg-ink text-paper transition-colors hover:bg-red hover:text-white"
                  }`}
                >
                  {w.cta}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[0.85rem] text-grey">
            Le paiement en ligne (Mobile Money + carte bancaire) sera activé ultérieurement.
          </p>
        </Container>
      </section>
    </>
  );
}
