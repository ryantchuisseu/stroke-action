import type { Metadata } from "next";
import { Container, Eyebrow, PageHeader, CtaBand, Btn } from "@/components/ui";
import { BrainMark } from "@/components/brain-mark";

export const metadata: Metadata = {
  title: "À propos",
  description: "L'histoire, la vision, la mission et les valeurs de Stroke Action AVC.",
};

const VALUES = [
  { t: "Compassion", d: "Nous plaçons l'humain d'abord — patients, familles, communautés — avec empathie." },
  { t: "Dévouement", d: "Nous servons notre cause avec travail, persévérance et sacrifice." },
  { t: "Intégrité", d: "Nous agissons avec transparence, honnêteté et responsabilité éthique en toute chose." },
  { t: "Professionnalisme", d: "Nous tenons les plus hauts standards dans nos activités, nos communications et nos partenariats." },
];

const DIFF = [
  "Ancrée au Cameroun, tournée vers l'Afrique, avec une vision mondiale.",
  "Portée par des professionnels de santé et des chercheurs.",
  "Ouverte à tous, sans condition de qualification ni de profession.",
  "Fait le lien entre science, éducation et action communautaire.",
];

export default function AProposPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "L'association" }, { label: "À propos" }]}
        eyebrow="À propos"
        title="Notre histoire."
        intro="Née au Cameroun, unie par un seul objectif : vaincre l'AVC."
      />

      {/* Notre histoire */}
      <section className="py-[clamp(3.5rem,8vw,6.5rem)]">
        <Container className="grid items-start gap-[clamp(2rem,6vw,5rem)] md:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-[62ch]">
            <p className="text-[clamp(1.15rem,1.9vw,1.5rem)] font-medium leading-[1.5] tracking-[-0.015em]">
              Stroke Action — connue en français sous le nom d&rsquo;Action AVC — a été fondée au Cameroun sous le
              régime de la loi n°&nbsp;90-53 du 19&nbsp;décembre 1990 sur la liberté d&rsquo;association.
            </p>
            <p className="mt-[1.15rem]">
              Née de la conviction que l&rsquo;AVC est à la fois évitable et traitable, l&rsquo;association existe pour
              combler le fossé entre le savoir médical et les communautés les plus touchées par cette maladie
              dévastatrice.
            </p>
            <p className="mt-[1.15rem]">
              Nous sommes une organisation à but non lucratif, laïque et apolitique, d&rsquo;intérêt général —
              rassemblant patients, familles, professionnels de santé et chercheurs autour d&rsquo;un même combat.
            </p>
          </div>
          <aside className="md:sticky md:top-24">
            <div className="aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/infirmiere.jpg" alt="Portrait d'une infirmière dans un dispensaire." className="h-full w-full object-cover" />
            </div>
            <p className="mt-4 border-t-2 border-ink pt-4 text-[0.88rem] text-ink-soft">
              <b className="mb-[0.15rem] block text-2xl tracking-[-0.02em] text-ink">1990</b>
              Loi n° 90-53 du 19 décembre sur la liberté d&rsquo;association — le cadre légal de Stroke Action.
            </p>
          </aside>
        </Container>
      </section>

      {/* Vision / Mission */}
      <section className="bg-paper-deep py-[clamp(3.5rem,8vw,6.5rem)]">
        <Container>
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
            {[
              {
                k: "Notre vision",
                q: "Être un soutien indispensable pour les patients, les familles, les professionnels de santé et les chercheurs qui œuvrent chaque jour pour vaincre l'AVC.",
              },
              {
                k: "Notre mission",
                q: "Réduire significativement le fardeau de l'AVC dans le monde par l'éducation, la recherche, le plaidoyer et le soutien aux patients et à leurs familles.",
              },
            ].map((c) => (
              <div key={c.k} className="bg-paper-deep p-[clamp(1.75rem,4vw,3rem)]">
                <div className="flex items-center gap-[0.6rem]">
                  <BrainMark className="h-[22px] w-[22px] text-ink" />
                  <span className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-blue-ink">{c.k}</span>
                </div>
                <blockquote className="mt-[1.1rem] text-[clamp(1.15rem,2.1vw,1.55rem)] font-medium leading-[1.4] tracking-[-0.015em]">
                  {c.q}
                </blockquote>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Nos valeurs */}
      <section className="py-[clamp(3.5rem,8vw,6.5rem)]">
        <Container>
          <Eyebrow>Nos valeurs</Eyebrow>
          <h2 className="mt-[0.9rem] max-w-[40ch] text-[clamp(1.55rem,3.4vw,2.4rem)]">
            Quatre principes, tenus au quotidien.
          </h2>
          <div className="mt-[clamp(2rem,5vw,3rem)] border-t border-rule">
            {VALUES.map((v) => (
              <div
                key={v.t}
                className="grid grid-cols-[20px_1fr] items-baseline gap-x-6 gap-y-2 border-b border-rule py-[clamp(1.15rem,2.8vw,1.7rem)] sm:grid-cols-[20px_12rem_1fr]"
              >
                <BrainMark className="mt-1 h-5 w-5 self-start text-ink" />
                <h3 className="text-[clamp(1.1rem,2vw,1.4rem)] tracking-[-0.015em]">{v.t}</h3>
                <p className="col-start-2 max-w-[50ch] text-[0.96rem] text-ink-soft sm:col-start-3">{v.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bande devise */}
      <section className="bg-ink py-[clamp(3.5rem,9vw,6.5rem)] text-center text-paper">
        <Container>
          <BrainMark className="mx-auto mb-[1.4rem] h-[30px] w-[30px] text-paper" />
          <p className="text-[clamp(1.8rem,4.6vw,3.3rem)] font-bold tracking-[-0.03em]">
            Ensemble pour vaincre l&rsquo;AVC.
            <span className="mt-[0.6rem] block text-[0.42em] font-medium text-[rgba(252,250,246,0.55)]">
              Together to Defeat Stroke
            </span>
          </p>
        </Container>
      </section>

      {/* Ce qui nous distingue */}
      <section className="py-[clamp(3.5rem,8vw,6.5rem)]">
        <Container>
          <Eyebrow>Ce qui nous distingue</Eyebrow>
          <h2 className="mt-[0.9rem] max-w-[40ch] text-[clamp(1.55rem,3.4vw,2.4rem)]">
            La seule association camerounaise entièrement dédiée à l&rsquo;AVC.
          </h2>
          <ul className="mt-[clamp(2rem,5vw,3rem)] border-t border-rule">
            {DIFF.map((d, i) => (
              <li
                key={i}
                className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-rule py-[clamp(1rem,2.6vw,1.5rem)] text-[clamp(1.02rem,1.9vw,1.25rem)] font-medium tracking-[-0.01em]"
              >
                <span className="text-[0.8rem] font-semibold tabular-nums text-grey">0{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="Vous partagez ces convictions ?"
        text="Devenez membre, donnez de votre temps ou soutenez la mission — chaque geste compte."
        actions={
          <>
            <Btn href="/nous-soutenir#devenir-membre" onDark>Devenir membre</Btn>
            <Btn href="/contact" variant="ghost" onDark>Nous contacter</Btn>
          </>
        }
      />
    </>
  );
}
