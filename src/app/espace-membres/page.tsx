import type { Metadata } from "next";
import { Container, PageHeader, Btn } from "@/components/ui";

export const metadata: Metadata = {
  title: "Espace membres",
  description: "L'espace réservé aux membres de Stroke Action AVC arrive bientôt.",
};

export default function EspaceMembresPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "S'engager" }, { label: "Espace membres" }]}
        eyebrow="Espace membres"
        title="Bientôt disponible."
        intro="L'espace réservé aux membres — documents internes, convocations aux assemblées, suivi de cotisation — est en préparation."
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <p className="max-w-[52ch] text-ink-soft">
            En attendant, vous pouvez soumettre votre demande d&rsquo;adhésion et nous contacter pour toute question.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Btn href="/nous-soutenir#devenir-membre">Devenir membre</Btn>
            <Btn href="/contact" variant="ghost">Nous contacter</Btn>
          </div>
        </Container>
      </section>
    </>
  );
}
