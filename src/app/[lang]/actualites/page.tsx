import type { Metadata } from "next";
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

/* -------- Icônes de catégorie (même esprit que PdfIcon sur Documents clés) -------- */
function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function LightbulbIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.45 1 1.15 1 1.9V16h5.2v-.3c0-.75.4-1.45 1-1.9A6 6 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PeopleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="9.5" r="2.1" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.5 19c.5-3 2.7-4.6 5.5-4.6s5 1.6 5.5 4.6M14.8 19c.4-2.3 1.9-3.6 4-3.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
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

/* -------- Goutte : forme + rail animé le long du bord droit --------
 * Motif "goutte qui tombe" dessiné par Ryan sur Figma. Bloqué à cette page
 * pour l'instant (cf. V6-NOTES.md) ; à généraliser si le rendu plaît. */
function BloodDrop({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 18" className={className} fill="var(--color-red)" aria-hidden="true">
      <path d="M7 0C7 0 0 9.6 0 12.9A7 6.1 0 0 0 14 12.9C14 9.6 7 0 7 0Z" />
    </svg>
  );
}

const DRIPS = [
  { top: "4%", x: 2, size: 10, delay: 0, dur: 3.4 },
  { top: "15%", x: 9, size: 8, delay: 1.1, dur: 2.8 },
  { top: "26%", x: 0, size: 12, delay: 0.4, dur: 3.9 },
  { top: "37%", x: 6, size: 9, delay: 2, dur: 3.1 },
  { top: "48%", x: 3, size: 11, delay: 0.8, dur: 3.6 },
  { top: "59%", x: 10, size: 8, delay: 1.6, dur: 2.9 },
  { top: "70%", x: 1, size: 13, delay: 0.2, dur: 4.1 },
  { top: "81%", x: 7, size: 9, delay: 2.4, dur: 3.3 },
  { top: "92%", x: 4, size: 10, delay: 1.2, dur: 3.7 },
] as const;

function BloodDrips() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-9 overflow-hidden sm:block lg:w-12"
      aria-hidden="true"
    >
      {DRIPS.map((d, i) => (
        <span
          key={i}
          className="sa-drip absolute"
          style={{
            top: d.top,
            right: `${d.x}px`,
            width: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        >
          <BloodDrop className="h-auto w-full" />
        </span>
      ))}
    </div>
  );
}

/* -------- Catégories : une teinte douce par sujet, dans l'esprit du papier ivoire -------- */
const CAT_STYLES: Record<
  string,
  { bg: string; iconBg: string; text: string; Icon: (p: { className?: string }) => React.JSX.Element }
> = {
  campaign: { bg: "bg-[#EAF2EA]", iconBg: "bg-[#D3E6D5]", text: "text-[#3F6B48]", Icon: CalendarIcon },
  education: { bg: "bg-[#EDEAF6]", iconBg: "bg-[#DAD3EF]", text: "text-[#5B4E96]", Icon: LightbulbIcon },
  association: { bg: "bg-[#F8EAEE]", iconBg: "bg-[#F1D3DB]", text: "text-[#A84360]", Icon: PeopleIcon },
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
    <div className="relative">
      <BloodDrips />
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
                      <Icon className="h-5 w-5" />
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
    </div>
  );
}
