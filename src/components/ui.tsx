import Link from "next/link";
import type { ReactNode } from "react";

/* -------- Container -------- */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}

/* -------- Bouton / lien d'action -------- */
type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  onDark?: boolean;
  className?: string;
};
export function Btn({ href, children, variant = "solid", onDark = false, className = "" }: BtnProps) {
  const base =
    "inline-flex items-center gap-2 px-[1.1rem] py-[0.62rem] text-[0.88rem] font-semibold tracking-[0.01em] transition-[transform,background-color,color,box-shadow] duration-150 ease-[var(--ease-out)] active:scale-[0.97]";
  const styles =
    variant === "solid"
      ? onDark
        ? "bg-paper text-ink hover:bg-red hover:text-white"
        : "bg-blue-ink text-paper hover:bg-red hover:text-white"
      : onDark
        ? "text-paper shadow-[inset_0_0_0_1.5px_rgba(252,250,246,0.55)] hover:shadow-[inset_0_0_0_1.5px_var(--color-red)]"
        : "text-blue-ink shadow-[inset_0_0_0_1.5px_var(--color-blue-ink)] hover:shadow-[inset_0_0_0_1.5px_var(--color-red)]";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

/* -------- Eyebrow -------- */
export function Eyebrow({
  children,
  alert = false,
  className = "",
}: {
  children: ReactNode;
  alert?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-block text-[0.74rem] font-semibold uppercase tracking-[0.16em] ${
        alert ? "text-red-ink" : "text-blue-ink"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/* -------- En-tête de page (fil d'ariane + titre) -------- */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
}: {
  crumbs: { label: string; href?: string }[];
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="border-b border-rule">
      <Container>
        <nav aria-label="Fil d'ariane" className="pt-4 text-[0.82rem] text-grey">
          {crumbs.map((c, i) => (
            <span key={i}>
              {c.href ? (
                <Link href={c.href} className="hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink-soft" aria-current="page">
                  {c.label}
                </span>
              )}
              {i < crumbs.length - 1 && <span className="mx-2 text-rule">›</span>}
            </span>
          ))}
        </nav>
        <div className="pb-12 pt-5 md:pb-20 md:pt-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,5.5vw,4rem)] tracking-[-0.03em]">
            {title}
          </h1>
          {intro && (
            <p className="mt-[1.1rem] max-w-[42ch] text-[clamp(1.05rem,1.6vw,1.3rem)] text-ink-soft">
              {intro}
            </p>
          )}
        </div>
      </Container>
    </header>
  );
}

/* -------- Titre de section -------- */
export function SectionHead({
  eyebrow,
  title,
  intro,
  alert = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  alert?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-[44ch] ${className}`}>
      <Eyebrow alert={alert}>{eyebrow}</Eyebrow>
      <h2 className="mt-[0.9rem] text-[clamp(1.6rem,3.6vw,2.6rem)]">{title}</h2>
      {intro && <p className="mt-[0.85rem] text-ink-soft">{intro}</p>}
    </div>
  );
}

/* -------- Lien fléché -------- */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative mt-6 inline-block text-[0.9rem] font-semibold text-blue-ink transition-colors hover:text-red-ink"
    >
      {children}
      <span className="absolute -bottom-[3px] left-0 right-0 h-[1.5px] origin-left scale-x-0 bg-current transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-x-100" />
    </Link>
  );
}

/* -------- Bande CTA sombre -------- */
export function CtaBand({
  title,
  text,
  actions,
}: {
  title: ReactNode;
  text: string;
  actions: ReactNode;
}) {
  return (
    <section className="bg-blue-ink py-[clamp(3.75rem,9vw,6.5rem)] text-paper">
      <Container>
        <h2 className="max-w-[18ch] text-[clamp(1.8rem,4.2vw,3rem)] tracking-[-0.025em]">{title}</h2>
        <p className="mt-[1.1rem] max-w-[46ch] text-[rgba(252,250,246,0.7)]">{text}</p>
        <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
      </Container>
    </section>
  );
}
