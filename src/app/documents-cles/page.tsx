import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Documents clés",
  description: "Statuts, règlement intérieur, plan stratégique — Stroke Action s'engage pour une transparence totale.",
};

const DOCS = [
  { title: "Statuts / Bylaws", lang: "FR / EN", status: "Disponible au téléchargement", ready: true },
  { title: "Règlement intérieur", lang: "FR", status: "Disponible au téléchargement", ready: true },
  { title: "Plan stratégique 2026-2030", lang: "FR", status: "Disponible au téléchargement", ready: true },
  { title: "Rapport annuel", lang: "—", status: "Bientôt", ready: false },
  { title: "Brochure de présentation", lang: "—", status: "Bientôt", ready: false },
];

export default function DocumentsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "L'association" }, { label: "Documents clés" }]}
        eyebrow="Documents clés"
        title="Transparence totale."
        intro="Tous les documents officiels de Stroke Action sont consultables et téléchargeables ici."
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <ul className="border-t border-rule">
            {DOCS.map((d) => (
              <li
                key={d.title}
                className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-rule py-[clamp(1rem,2.6vw,1.5rem)] sm:grid-cols-[1fr_6rem_12rem_2rem]"
              >
                <span className="text-[clamp(1rem,1.9vw,1.2rem)] font-semibold tracking-[-0.01em]">{d.title}</span>
                <span className="text-[0.85rem] text-grey max-sm:col-span-2">{d.lang}</span>
                <span className={`text-[0.85rem] ${d.ready ? "text-ink-soft" : "text-grey"} max-sm:col-span-2`}>
                  {d.status}
                </span>
                <span aria-hidden="true" className={`justify-self-end text-lg ${d.ready ? "text-blue-ink" : "text-rule"}`}>
                  ↓
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
