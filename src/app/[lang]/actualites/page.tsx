import type { Metadata } from "next";
import { Megaphone, Activity, HeartHandshake } from "lucide-react";
import { Container, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/dictionaries";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return pageMeta({
    lang,
    route: "/actualites",
    title: d.news.crumb,
    description: `${d.news.introPre}${d.news.introAccent}.`,
  });
}

/* -------- Fioriture bleue à côté du titre : trois tirets, notre patte -------- */
function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
      <path d="M15 3 9 9" stroke="var(--color-blue)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M18 8 12 14" stroke="var(--color-blue)" strokeWidth="2.6" strokeLinecap="round" opacity="0.6" />
      <path d="M11 1 5 7" stroke="var(--color-blue)" strokeWidth="2.6" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/* -------- Nuage de points rouges : même motif que le point du logo, en écho -------- */
function DotCluster() {
  const dots: [number, number, number][] = [
    [10, 12, 7],
    [27, 6, 6],
    [42, 15, 8],
    [16, 29, 5],
    [35, 31, 6.5],
    [52, 23, 5],
    [45, 43, 7],
  ];
  return (
    <div className="pointer-events-none absolute right-5 top-7 hidden sm:block lg:right-16" aria-hidden="true">
      <svg width="64" height="56" viewBox="0 0 64 56" fill="none">
        {dots.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="var(--color-red)" opacity={0.5 + (i % 3) * 0.18} />
        ))}
      </svg>
    </div>
  );
}

/* -------- Catégories : une teinte douce par sujet, dans l'esprit du papier ivoire -------- */
const CAT_STYLES: Record<
  string,
  { bg: string; iconBg: string; text: string; Icon: typeof Megaphone }
> = {
  // Megaphone : sensibilisation/mobilisation, plus parlant qu'un calendrier générique
  campaign: { bg: "bg-[#EAF2EA]", iconBg: "bg-[#D3E6D5]", text: "text-[#3F6B48]", Icon: Megaphone },
  // Activity (courbe de pouls) : ancrage santé/cardiovasculaire, plus spécifique qu'une ampoule "idée"
  education: { bg: "bg-[#EDEAF6]", iconBg: "bg-[#DAD3EF]", text: "text-[#5B4E96]", Icon: Activity },
  // HeartHandshake : solidarité/bénévolat, plus chaleureux que deux silhouettes génériques
  association: { bg: "bg-[#F8EAEE]", iconBg: "bg-[#F1D3DB]", text: "text-[#A84360]", Icon: HeartHandshake },
};

export default async function ActualitesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  const n = t.news;

  const titleNode = (
    <>
      {n.titleLead}
      <Flourish className="ml-2 inline-block h-[0.55em] w-[0.55em] align-super" />
      {n.titleMid}
      <span className="inline-block rounded-[10px] bg-[color-mix(in_srgb,var(--color-blue)_18%,transparent)] px-2 py-0.5">
        {n.titleAccent}
      </span>
      .
    </>
  );
  const introNode = (
    <>
      {n.introPre}
      <span className="underline decoration-red decoration-[3px] underline-offset-[3px]">{n.introAccent}</span>.
    </>
  );

  return (
    <>
      <PageHeader
        crumbs={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.groups[2].label }, { label: n.crumb }]}
        eyebrow={n.eyebrow}
        title={`${n.titleLead}${n.titleMid}${n.titleAccent}.`}
        titleNode={titleNode}
        intro={`${n.introPre}${n.introAccent}.`}
        introNode={introNode}
        decor={<DotCluster />}
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <ul className="grid gap-4">
            {n.posts.map((post) => {
              const cat = CAT_STYLES[post.id] ?? CAT_STYLES.education;
              const Icon = cat.Icon;
              return (
                <li key={post.id}>
                  <article
                    className={`grid gap-4 rounded-[14px] p-[clamp(1.2rem,3vw,1.8rem)] sm:grid-cols-[3rem_1fr] sm:gap-6 ${cat.bg}`}
                  >
                    <div
                      className={`flex h-11 w-11 flex-none items-center justify-center rounded-full ${cat.iconBg} ${cat.text}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <span className={`text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${cat.text}`}>
                        {post.cat}
                      </span>
                      <h2 className="mt-1 text-[clamp(1.15rem,2.2vw,1.5rem)] tracking-[-0.015em]">{post.t}</h2>
                      <p className="mt-2 max-w-[60ch] text-[0.95rem] text-ink-soft">{post.d}</p>
                      <span className="mt-3 inline-block text-[0.85rem] font-semibold text-grey">{n.postSoon}</span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-[0.85rem] text-grey">{n.note}</p>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-ink py-[clamp(3rem,8vw,6rem)] text-paper">
        <Container>
          <div className="grid gap-[clamp(1.5rem,5vw,4rem)] md:grid-cols-[1fr_1.1fr] md:items-end">
            <div>
              <span className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[rgba(252,250,246,0.65)]">
                {n.newsletter.eyebrow}
              </span>
              <h2 className="mt-3 text-[clamp(1.6rem,3.6vw,2.6rem)] tracking-[-0.025em]">{n.newsletter.title}</h2>
              <p className="mt-3 max-w-[42ch] text-[rgba(252,250,246,0.7)]">{n.newsletter.text}</p>
            </div>
            <form className="w-full" aria-label={n.newsletter.title}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="nl-email">
                  {n.newsletter.placeholder}
                </label>
                <input
                  id="nl-email"
                  type="email"
                  name="email"
                  required
                  placeholder={n.newsletter.placeholder}
                  className="min-w-0 flex-1 border border-[rgba(252,250,246,0.28)] bg-transparent px-4 py-3 text-[0.95rem] text-paper placeholder:text-[rgba(252,250,246,0.4)] outline-none focus:border-paper"
                />
                <button
                  type="submit"
                  className="flex-none bg-paper px-6 py-3 text-[0.88rem] font-semibold text-ink transition-colors duration-150 hover:bg-red hover:text-white active:scale-[0.97]"
                >
                  {n.newsletter.cta}
                </button>
              </div>
              <p className="mt-3 text-[0.78rem] text-[rgba(252,250,246,0.45)]">{n.newsletter.note}</p>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
