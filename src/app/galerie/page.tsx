import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Photos des activités, campagnes et événements de Stroke Action AVC.",
};

export default function GaleriePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Actualités" }, { label: "Galerie" }]}
        eyebrow="Galerie"
        title="Nos activités en images."
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-paper-deep" aria-hidden="true" />
            ))}
          </div>
          <p className="mt-8 max-w-[46ch] text-ink-soft">
            Nous débutons&nbsp;: revenez bientôt pour les photos de nos prochains événements et activités de terrain à
            Yaoundé.
          </p>
        </Container>
      </section>
    </>
  );
}
