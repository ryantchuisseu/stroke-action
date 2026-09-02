import type { Metadata } from "next";
import { Container, PageHeader, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog / Actualités",
  description: "Articles, campagnes de sensibilisation et événements de Stroke Action AVC.",
};

const POSTS = [
  { cat: "Campagne", t: "Journée mondiale de l'AVC — 29 octobre", d: "Le programme des actions de sensibilisation prévues à Yaoundé et en ligne." },
  { cat: "Éducation", t: "Le saviez-vous ? — L'hypertension, ennemie silencieuse", d: "Pourquoi plus d'un AVC sur deux commence par une tension mal contrôlée." },
  { cat: "Association", t: "Stroke Action recrute ses premiers bénévoles", d: "Rejoindre l'action, quel que soit votre parcours." },
];

export default function ActualitesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Actualités" }, { label: "Blog / Actualités" }]}
        eyebrow="Blog / Actualités"
        title="Ce qui se passe à Stroke Action."
        intro="Articles éducatifs, campagnes de sensibilisation et événements. Publication mensuelle."
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <ul className="border-t border-rule">
            {POSTS.map((p) => (
              <li key={p.t} className="border-b border-rule py-[clamp(1.25rem,3vw,2rem)]">
                <article className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-8">
                  <Eyebrow>{p.cat}</Eyebrow>
                  <div>
                    <h2 className="text-[clamp(1.15rem,2.2vw,1.5rem)] tracking-[-0.015em]">{p.t}</h2>
                    <p className="mt-2 max-w-[60ch] text-[0.95rem] text-ink-soft">{p.d}</p>
                    <span className="mt-3 inline-block text-[0.85rem] font-semibold text-grey">Article à venir</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.85rem] text-grey">
            Les articles complets seront publiés au lancement du site. Contenus indicatifs.
          </p>
        </Container>
      </section>
    </>
  );
}
