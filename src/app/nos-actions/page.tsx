import type { Metadata } from "next";
import { Container, PageHeader, CtaBand, Btn } from "@/components/ui";

export const metadata: Metadata = {
  title: "Nos actions",
  description: "Les cinq programmes de Stroke Action AVC : éducation, recherche, formation, soutien aux patients, développement.",
};

const PROGRAMS = [
  {
    n: "01",
    t: "Éducation du public",
    s: "« Informez-vous. Protégez votre cerveau. »",
    b: [
      "Matériel éducatif mensuel sur l'AVC diffusé sur YouTube et les réseaux sociaux",
      "Campagnes de sensibilisation et dépistage gratuit des facteurs de risque cardiovasculaire",
      "Célébration annuelle de la Journée mondiale de l'AVC (29 octobre)",
      "Publication d'un ouvrage éducatif sur l'AVC",
      "Campagne « Le saviez-vous ? » — « Informez-vous, prenez soin de votre santé, protégez votre cerveau ! »",
    ],
  },
  {
    n: "02",
    t: "Recherche scientifique",
    s: "« Une action fondée sur les preuves. »",
    b: [
      "Projets de recherche menés en partenariat avec des institutions académiques",
      "Collecte de données au service du Ministère de la Santé publique",
      "Soutien aux chercheurs : financement, logistique et mentorat scientifique",
    ],
  },
  {
    n: "03",
    t: "Formation professionnelle",
    s: "« Renforcer les professionnels de santé. »",
    b: [
      "Séminaires sur le diagnostic et la prise en charge de l'AVC",
      "Ateliers : neuro-imagerie, exploration cardiaque, neurosonologie",
      "Forum annuel Stroke Action (ASAC) — rencontres et consultations pluridisciplinaires",
    ],
  },
  {
    n: "04",
    t: "Soutien aux patients",
    s: "« Aucun patient laissé de côté. »",
    b: [
      "Fonds de solidarité AVC : prise en charge de l'imagerie cérébrale pour les patients en difficulté financière — objectif « Un AVC, un scanner »",
      "Plaidoyer pour les droits des patients et l'accès aux soins",
      "Engagement auprès de la communauté, en ligne et sur le terrain",
    ],
  },
  {
    n: "05",
    t: "Développement de l'organisation",
    s: "« Grandir pour servir davantage. »",
    b: [
      "Identité visuelle, présence en ligne et communication média",
      "Recrutement annuel de membres et animation de la communauté",
      "Contributions bienvenues de personnes de tous horizons",
      "Partenariats avec la société civile, les entreprises et les institutions",
      "(À partir de 2028) Gala de Noël de l'AVC",
      "(À partir de 2030) Campagne « Un sou pour vaincre l'AVC »",
    ],
  },
];

const METRICS = [
  "Membres & bénévoles",
  "Projets de recherche menés",
  "Sessions de formation organisées",
  "Patients accompagnés",
  "Pays touchés",
];

export default function NosActionsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "L'association" }, { label: "Nos actions" }]}
        eyebrow="Nos actions"
        title="Transformer l'engagement en action."
        intro="Notre travail s'articule autour de quatre domaines d'action, complétés par un cinquième objectif de développement — guidés par nos statuts et notre Plan stratégique 2026-2030."
      />

      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <div className="border-t border-rule">
            {PROGRAMS.map((p) => (
              <article
                key={p.n}
                className="grid gap-x-[clamp(1.5rem,5vw,4rem)] gap-y-3 border-b border-rule py-[clamp(2rem,5vw,3.5rem)] md:grid-cols-[4rem_1fr]"
              >
                <div className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold tabular-nums leading-none tracking-[-0.03em] text-blue">
                  {p.n}
                </div>
                <div>
                  <h2 className="text-[clamp(1.3rem,2.6vw,1.9rem)] tracking-[-0.02em]">{p.t}</h2>
                  <p className="mt-1 text-[0.95rem] font-medium text-red-ink">{p.s}</p>
                  <ul className="mt-4 grid gap-2">
                    {p.b.map((li, i) => (
                      <li key={i} className="grid grid-cols-[1.1rem_1fr] gap-2 text-[0.96rem] text-ink-soft">
                        <span className="mt-[0.6rem] h-[3px] w-[10px] bg-red" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-deep py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <h2 className="text-[clamp(1.5rem,3.2vw,2.2rem)]">Notre impact</h2>
          <p className="mt-2 text-ink-soft">Indicateurs mis à jour périodiquement.</p>
          <dl className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {METRICS.map((m) => (
              <div key={m} className="bg-paper-deep p-6">
                <dd className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.04em] text-grey">—</dd>
                <dt className="mt-2 text-[0.9rem] text-ink-soft">{m}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand
        title="Soutenez nos programmes."
        text="Chaque contribution étend la prévention, la formation et l'accompagnement des patients."
        actions={
          <>
            <Btn href="/nous-soutenir#don" onDark>Faire un don</Btn>
            <Btn href="/documents-cles" variant="ghost" onDark>Lire le plan stratégique</Btn>
          </>
        }
      />
    </>
  );
}
