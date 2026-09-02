import type { Metadata } from "next";
import { Container, PageHeader, Eyebrow, CtaBand, Btn } from "@/components/ui";

export const metadata: Metadata = {
  title: "Éducation AVC",
  description: "Qu'est-ce qu'un AVC, la méthode FAST, les facteurs de risque, les chiffres clés et les idées reçues.",
};

const FAST = [
  { l: "F", t: "Face — le visage", d: "Affaissement ou engourdissement soudain d'un côté du visage." },
  { l: "A", t: "Arms — les bras", d: "Faiblesse ou engourdissement d'un bras — demandez de lever les deux bras." },
  { l: "S", t: "Speech — la parole", d: "Parole troublée, confusion, incapacité à parler ou à comprendre." },
  { l: "T", t: "Time — le temps", d: "Appelez immédiatement les secours. Notez l'heure d'apparition des signes.", em: true },
];

const MODIF = [
  "Hypertension artérielle — le facteur de risque n°1",
  "Diabète",
  "Cholestérol élevé",
  "Tabagisme",
  "Sédentarité et obésité",
  "Consommation excessive d'alcool",
  "Fibrillation auriculaire (rythme cardiaque irrégulier)",
  "Alimentation déséquilibrée",
];
const NONMODIF = ["Âge (le risque augmente après 55 ans)", "Antécédents familiaux d'AVC", "AVC ou AIT (mini-AVC) antérieur"];

const STATS = [
  "L'AVC est la 2ᵉ cause de mortalité dans le monde",
  "1 adulte sur 4 fera un AVC au cours de sa vie",
  "Chaque année, 15 millions de personnes subissent un AVC",
  "Parmi elles, 5 millions décèdent et 5 millions gardent un handicap permanent",
  "80 % des AVC sont évitables",
  "En Afrique, l'incidence et la mortalité de l'AVC sont parmi les plus élevées au monde",
];

const KNOW = [
  "L'hypertension est responsable de plus de 50 % des AVC — or la plupart des personnes hypertendues l'ignorent.",
  "Un AIT (accident ischémique transitoire, ou « mini-AVC ») est un signal d'alerte : il doit être traité comme une urgence.",
  "La thrombolyse n'est efficace que si elle est administrée dans les 4 h 30 suivant l'apparition des symptômes.",
  "L'AVC est la première cause de handicap acquis chez l'adulte — mais une bonne rééducation permet à beaucoup de récupérer.",
  "L'AVC ne touche pas que les personnes âgées : il peut survenir à tout âge, y compris chez le jeune adulte et l'enfant.",
];

export default function EducationPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Comprendre l'AVC" }, { label: "Éducation AVC" }]}
        eyebrow="Éducation AVC"
        title="Connaître l'AVC. Réagir vite. Sauver des vies."
      />

      {/* Qu'est-ce qu'un AVC */}
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container className="grid gap-[clamp(2rem,6vw,4rem)] md:grid-cols-[1fr_0.9fr]">
          <div className="max-w-[58ch]">
            <Eyebrow>Qu&rsquo;est-ce qu&rsquo;un AVC&nbsp;?</Eyebrow>
            <p className="mt-4">
              Un AVC survient lorsque l&rsquo;irrigation d&rsquo;une partie du cerveau est brutalement interrompue —
              soit par une artère bouchée (AVC ischémique), soit par une rupture de vaisseau (AVC hémorragique). Privées
              de sang, les cellules du cerveau commencent à mourir en quelques minutes.
            </p>
            <p className="mt-3 font-semibold">L&rsquo;AVC est une urgence médicale. Chaque minute compte.</p>
          </div>
          <div className="border border-red-ink/30 bg-[color-mix(in_srgb,var(--color-red)_6%,var(--color-paper))] p-6">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-red-ink">
              Urgences — Cameroun
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                ["119", "SAMU"],
                ["118", "Pompiers"],
                ["117", "Police"],
              ].map(([n, l]) => (
                <div key={n} className="bg-red px-2 py-3 text-white">
                  <div className="text-[1.4rem] font-bold tabular-nums leading-none">{n}</div>
                  <div className="mt-1 text-[0.7rem] uppercase tracking-[0.08em]">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[0.85rem] text-ink-soft">
              Au moindre signe d&rsquo;AVC, appelez immédiatement — n&rsquo;attendez pas.
            </p>
          </div>
        </Container>
      </section>

      {/* FAST */}
      <section className="bg-paper-deep py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)]">La méthode FAST</h2>
          <div className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {FAST.map((f) => (
              <div
                key={f.l}
                className={`p-[clamp(1.1rem,2.5vw,1.7rem)] ${f.em ? "bg-[color-mix(in_srgb,var(--color-red)_8%,var(--color-paper-deep))]" : "bg-paper-deep"}`}
              >
                <div className={`text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[0.9] tracking-[-0.04em] ${f.em ? "text-red" : "text-blue"}`}>
                  {f.l}
                </div>
                <h3 className="mt-[0.65rem] text-[0.98rem] font-semibold">{f.t}</h3>
                <p className="mt-[0.3rem] text-[0.88rem] text-ink-soft">{f.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Facteurs de risque */}
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container className="grid gap-[clamp(2rem,6vw,4rem)] md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(1.4rem,2.8vw,2rem)]">Facteurs de risque modifiables</h2>
            <p className="mt-1 text-[0.9rem] text-ink-soft">Sur lesquels vous pouvez agir.</p>
            <ul className="mt-5 border-t border-rule">
              {MODIF.map((m) => (
                <li key={m} className="border-b border-rule py-[0.7rem] text-[0.96rem]">{m}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[clamp(1.4rem,2.8vw,2rem)]">Facteurs non modifiables</h2>
            <p className="mt-1 text-[0.9rem] text-ink-soft">À connaître pour rester vigilant.</p>
            <ul className="mt-5 border-t border-rule">
              {NONMODIF.map((m) => (
                <li key={m} className="border-b border-rule py-[0.7rem] text-[0.96rem]">{m}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Chiffres clés */}
      <section className="bg-ink py-[clamp(3rem,7vw,5.5rem)] text-paper">
        <Container>
          <Eyebrow>Chiffres clés</Eyebrow>
          <ul className="mt-6 grid gap-px border border-[rgba(252,250,246,0.14)] bg-[rgba(252,250,246,0.14)] sm:grid-cols-2">
            {STATS.map((s) => (
              <li key={s} className="bg-ink p-5 text-[0.98rem] text-[rgba(252,250,246,0.85)]">{s}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Le saviez-vous */}
      <section id="le-saviez-vous" className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <Eyebrow>Le saviez-vous&nbsp;?</Eyebrow>
          <h2 className="mt-[0.9rem] max-w-[30ch] text-[clamp(1.6rem,3.4vw,2.4rem)]">
            Informez-vous, prenez soin de votre santé, protégez votre cerveau&nbsp;!
          </h2>
          <div className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {KNOW.map((k, i) => (
              <p key={i} className="bg-paper p-5 text-[0.95rem] text-ink-soft">{k}</p>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Partagez ces signes autour de vous."
        text="Chaque personne qui connaît FAST peut sauver une vie. Rejoignez la sensibilisation."
        actions={
          <>
            <Btn href="/nous-soutenir#benevolat" onDark>Devenir bénévole</Btn>
            <Btn href="/actualites" variant="ghost" onDark>Suivre nos campagnes</Btn>
          </>
        }
      />
    </>
  );
}
