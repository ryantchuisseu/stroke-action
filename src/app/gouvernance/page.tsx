import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gouvernance",
  description: "Le bureau exécutif de Stroke Action AVC — cinq membres élus, engagés pour la transparence et l'impact.",
};

const BOARD = [
  { role: "Président", name: "Dr KAMTCHUM TATUENE Joseph", bio: "Neurologue et chercheur, fondateur de Stroke Action." },
  { role: "Secrétaire général", name: "À communiquer", bio: "Profil à publier prochainement." },
  { role: "Trésorier", name: "À communiquer", bio: "Profil à publier prochainement." },
  { role: "Contrôleur de gestion", name: "À communiquer", bio: "Profil à publier prochainement." },
  { role: "Conseiller", name: "À communiquer", bio: "Profil à publier prochainement." },
];

export default function GouvernancePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "L'association" }, { label: "Gouvernance" }]}
        eyebrow="Gouvernance"
        title="Un bureau exécutif engagé."
        intro="Stroke Action est administrée par un bureau exécutif de cinq membres élus, chacun apportant son expertise au service de la mission — avec intégrité, transparence et impact."
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {BOARD.map((m) => (
              <article key={m.role} className="bg-paper p-6">
                <div className="aspect-square bg-paper-deep" aria-hidden="true" />
                <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-blue-ink">{m.role}</p>
                <h2 className="mt-1 text-[1.1rem] font-semibold tracking-[-0.01em]">{m.name}</h2>
                <p className="mt-2 text-[0.9rem] text-ink-soft">{m.bio}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[0.85rem] text-grey">
            Les noms et photographies des membres seront fournis par le bureau exécutif avant publication.
          </p>
        </Container>
      </section>
    </>
  );
}
