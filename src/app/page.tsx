import Link from "next/link";
import { Container, Btn, Eyebrow, SectionHead, ArrowLink, CtaBand } from "@/components/ui";
import { BrainMark } from "@/components/brain-mark";
import { SecondsBand } from "@/components/seconds-band";
import { CountUp } from "@/components/count-up";

const PILLARS = [
  { t: "Éducation", d: "Sensibiliser le public aux facteurs de risque de l'AVC, aux signes d'alerte et aux premiers gestes." },
  { t: "Recherche", d: "Mener et soutenir des travaux scientifiques de qualité pour éclairer les politiques de santé." },
  { t: "Formation", d: "Former en continu les professionnels de santé à la prise en charge de l'AVC." },
  { t: "Soutien", d: "Apporter un appui technique, financier et humain aux personnes touchées et à leurs familles." },
];

const FAST = [
  { l: "F", t: "Face — le visage", d: "Affaissement ou engourdissement soudain d'un côté du visage." },
  { l: "A", t: "Arms — les bras", d: "Faiblesse d'un bras — demandez de lever les deux bras." },
  { l: "S", t: "Speech — la parole", d: "Parole troublée, confuse ou impossible." },
  { l: "T", t: "Time — le temps", d: "Appelez immédiatement les secours.", em: true },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="py-[clamp(2rem,5vw,4rem)] pb-[clamp(3.25rem,7vw,6rem)]">
        <Container className="grid items-center gap-[clamp(2rem,6vw,5rem)] md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="hero-stg hero-d1 inline-block text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-blue-ink">
              Stroke Action · Action AVC
            </span>
            <h1 className="mt-4 text-[clamp(2.5rem,6.6vw,5rem)] leading-none tracking-[-0.035em]">
              <span className="hero-stg hero-d2 block">Ensemble</span>
              <span className="hero-stg hero-d2 block">pour vaincre</span>
              <span className="hero-stg hero-d3 block">
                l&rsquo;AVC<span className="hero-end-dot" aria-hidden="true" />
              </span>
            </h1>
            <p className="hero-stg hero-d4 mt-6 flex max-w-[34ch] items-start gap-[0.7rem] text-[clamp(0.95rem,1.4vw,1.12rem)] font-semibold text-red-ink">
              <svg viewBox="0 0 40 40" className="mt-0.5 h-[22px] w-[22px] flex-none text-red-ink" aria-hidden="true">
                <path
                  className="hero-mark-path"
                  d="M8 27C4 18 9 7 20 7c10 0 16 8 14 18-1 5-6 8-12 7-4-1-6 1-10 0-3-1-4-2-4-5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
                <circle className="hero-mark-dot" cx="24" cy="20" r="3.6" fill="currentColor" />
              </svg>
              <span>
                Pendant un AVC, le cerveau perd <b className="tabular-nums">1,9&nbsp;million</b> de neurones par minute.
              </span>
            </p>
            <p className="hero-stg hero-d5 mt-[1.1rem] max-w-[48ch] text-[clamp(1rem,1.4vw,1.15rem)] text-ink-soft">
              Stroke Action est une organisation à but non lucratif qui agit pour réduire le fardeau de l&rsquo;AVC par
              l&rsquo;éducation, la recherche, la formation professionnelle et le soutien aux patients et à leurs familles.
            </p>
            <div className="hero-stg hero-d6 mt-8 flex flex-wrap gap-3">
              <Btn href="/a-propos">Découvrir l&rsquo;association</Btn>
              <Btn href="/nous-soutenir#devenir-membre" variant="ghost">
                Nous rejoindre
              </Btn>
            </div>
          </div>
          <figure className="hero-stg hero-d3 m-0">
            <div className="aspect-[3/4] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/portrait-femme.jpg"
                alt="Portrait d'une femme dans une salle de soins."
                className="hero-img-in h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-[0.55rem] text-[0.74rem] tracking-[0.03em] text-grey">
              Photographie documentaire, traitement N&amp;B — à remplacer par des images de terrain de Stroke Action
              (Yaoundé).
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* QUI SOMMES-NOUS */}
      <section className="bg-paper-deep py-[clamp(3.75rem,9vw,7.5rem)]">
        <Container className="grid items-center gap-[clamp(2rem,6vw,5rem)] md:grid-cols-[0.85fr_1.15fr]">
          <figure className="m-0 aspect-[16/10] overflow-hidden md:order-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/soignante.jpg" alt="Une soignante dans un dispensaire." className="h-full w-full object-cover" />
          </figure>
          <div>
            <Eyebrow>Qui sommes-nous</Eyebrow>
            <h2 className="mt-[0.9rem] text-[clamp(1.6rem,3.6vw,2.6rem)]">Une communauté unie contre l&rsquo;AVC.</h2>
            <div className="mt-[1.1rem] max-w-[52ch] space-y-4 text-ink-soft">
              <p>
                Née au Cameroun, Stroke Action rassemble patients, familles, professionnels de santé et chercheurs
                autour d&rsquo;un même objectif&nbsp;: vaincre l&rsquo;AVC.
              </p>
              <p>
                Nous croyons que par l&rsquo;éducation, la science et la solidarité, nous pouvons sauver des vies et
                transformer la réalité de l&rsquo;AVC en Afrique et au-delà.
              </p>
            </div>
            <ArrowLink href="/a-propos">À propos de Stroke Action →</ArrowLink>
          </div>
        </Container>
      </section>

      {/* 4 PILIERS */}
      <section className="py-[clamp(3.75rem,9vw,7.5rem)]">
        <Container>
          <SectionHead eyebrow="Nos piliers" title="Quatre piliers, une conviction." />
          <div className="mt-[clamp(2rem,5vw,3rem)] border-t border-rule">
            {PILLARS.map((p) => (
              <div
                key={p.t}
                className="grid grid-cols-[22px_1fr] items-baseline gap-x-6 gap-y-2 border-b border-rule py-[clamp(1.15rem,2.8vw,1.7rem)] transition-[padding] duration-200 ease-[var(--ease-out)] sm:grid-cols-[26px_12rem_1fr] sm:hover:ps-3"
              >
                <BrainMark className="mt-[3px] h-[22px] w-[22px] self-start text-ink" />
                <h3 className="text-[clamp(1.1rem,2vw,1.45rem)] tracking-[-0.015em]">{p.t}</h3>
                <p className="col-start-2 max-w-[52ch] text-[0.96rem] text-ink-soft sm:col-start-3">{p.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CHAQUE SECONDE COMPTE — explicatif animé */}
      <SecondsBand />

      {/* APERÇU FAST */}
      <section id="fast" className="py-[clamp(3.75rem,9vw,7.5rem)]">
        <Container>
          <SectionHead
            eyebrow="Éducation AVC"
            alert
            title="Reconnaître un AVC : la méthode FAST."
            intro="Quatre vérifications, quelques secondes. Un seul signe suffit à appeler les secours."
          />
          <div className="mt-[clamp(2rem,5vw,3rem)] grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {FAST.map((f) => (
              <div
                key={f.l}
                className={`p-[clamp(1.1rem,2.5vw,1.7rem)] ${
                  f.em ? "bg-[color-mix(in_srgb,var(--color-red)_7%,var(--color-paper))]" : "bg-paper"
                }`}
              >
                <div
                  className={`text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[0.9] tracking-[-0.04em] ${
                    f.em ? "text-red" : "text-blue"
                  }`}
                >
                  {f.l}
                </div>
                <h3 className="mt-[0.65rem] text-[0.95rem] font-semibold">{f.t}</h3>
                <p className="mt-[0.3rem] text-[0.85rem] text-ink-soft">{f.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-[1.3rem] flex flex-wrap items-baseline gap-x-6 gap-y-[0.55rem] text-[0.9rem] text-ink-soft">
            <b className="font-semibold text-ink">Urgences (Cameroun) :</b>
            <span>
              SAMU <span className="font-bold tabular-nums tracking-[0.02em] text-red-ink">119</span>
            </span>
            <span>
              Pompiers <span className="font-bold tabular-nums tracking-[0.02em] text-red-ink">118</span>
            </span>
            <span>
              Police <span className="font-bold tabular-nums tracking-[0.02em] text-red-ink">117</span>
            </span>
          </p>
          <ArrowLink href="/education-avc">Tout savoir sur l&rsquo;AVC →</ArrowLink>
        </Container>
      </section>

      {/* CHIFFRES */}
      <section className="bg-paper-deep py-[clamp(3.75rem,9vw,7.5rem)]">
        <Container>
          <SectionHead eyebrow="L'AVC en chiffres" title="Pourquoi le temps compte." />
          <div className="mt-[clamp(2rem,5vw,3rem)] grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-16 gap-y-10">
            <Stat n={<><CountUp to={15} /><U>&nbsp;M / an</U></>} k="de personnes victimes d'un AVC dans le monde." />
            <Stat n={<>1<U>&nbsp;sur&nbsp;</U><CountUp to={4} /></>} k="adultes fera un AVC au cours de sa vie." />
            <Stat n={<><CountUp to={80} /><U>&nbsp;%</U></>} k="des AVC sont évitables." accent />
            <Stat n={<><CountUp to={2} /><U>e</U></>} k="cause de mortalité dans le monde." />
          </div>
        </Container>
      </section>

      {/* ILS EN PARLENT */}
      <section className="py-[clamp(3.75rem,9vw,7.5rem)]">
        <div className="relative left-1/2 aspect-[21/9] w-screen -translate-x-1/2 overflow-hidden max-sm:aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/homme-espoir.jpg" alt="Un homme sourit dans une salle de soins." className="h-full w-full object-cover" />
        </div>
        <Container>
          <div className="mt-[clamp(2rem,5vw,3rem)] max-w-[46ch]">
            <Eyebrow>Ils en parlent</Eyebrow>
            <h2 className="mt-[0.9rem] text-[clamp(1.6rem,3.6vw,2.6rem)]">Derrière chaque AVC, une histoire.</h2>
            <p className="mt-[0.9rem] text-ink-soft">
              Nous recueillons les premiers témoignages des personnes et des familles accompagnées par Stroke Action. À
              découvrir bientôt.
            </p>
            <ArrowLink href="/galerie">Voir la galerie →</ArrowLink>
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <CtaBand
        title={
          <>
            Rejoignez le combat contre <span className="text-blue">l&rsquo;AVC</span>.
          </>
        }
        text="Adhérer, donner, devenir bénévole ou partenaire : chaque geste étend la prévention et l'accompagnement, une personne de plus à la fois."
        actions={
          <>
            <Btn href="/nous-soutenir#don" onDark>Faire un don</Btn>
            <Btn href="/nous-soutenir#devenir-membre" variant="ghost" onDark>Devenir membre</Btn>
            <Btn href="/contact" variant="ghost" onDark>Nous contacter</Btn>
          </>
        }
      />
    </>
  );
}

function U({ children }: { children: React.ReactNode }) {
  return <span className="text-[0.3em] font-semibold text-ink-soft">{children}</span>;
}

function Stat({ n, k, accent = false }: { n: React.ReactNode; k: string; accent?: boolean }) {
  return (
    <div>
      <div
        className={`flex items-baseline gap-[0.05em] text-[clamp(2.7rem,8vw,5.2rem)] font-bold leading-[0.9] tabular-nums tracking-[-0.045em] ${
          accent ? "text-red-ink" : ""
        }`}
      >
        {n}
      </div>
      <p className="mt-[0.75rem] max-w-[26ch] text-[0.94rem] text-ink-soft">{k}</p>
    </div>
  );
}
