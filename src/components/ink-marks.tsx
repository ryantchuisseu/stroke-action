import type { ReactNode } from "react";

/* -------- Fioriture bleue (3 tirets), notre patte à côté des titres --------
 * D'abord posée sur Blog/News (V6-NOTES point 2-3), désormais partagée pour
 * être réutilisée sur tous les titres du site (voir highlightWord). */
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
      <path d="M15 3 9 9" stroke="var(--color-blue)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M18 8 12 14" stroke="var(--color-blue)" strokeWidth="2.6" strokeLinecap="round" opacity="0.6" />
      <path d="M11 1 5 7" stroke="var(--color-blue)" strokeWidth="2.6" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/** Surligne la 1re occurrence de `word` dans `text` (fond translucide bleu,
 * coins arrondis — recette Blog/News). Rend `text` tel quel si `word` est
 * introuvable (jamais d'erreur silencieuse qui casserait l'affichage).
 * `flourish: true` pose la fioriture directement au-dessus du mot, décalée
 * (pas collée en ligne dans le texte — retour Ryan : ça faisait trop
 * cramé/à l'étroit quand la fioriture était insérée en plein milieu du
 * titre). */
export function highlightWord(text: string, word: string, opts?: { flourish?: boolean }): ReactNode {
  const idx = text.indexOf(word);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="relative inline-block rounded-[10px] bg-[color-mix(in_srgb,var(--color-blue)_18%,transparent)] px-2 py-0.5">
        {opts?.flourish && (
          <Flourish className="pointer-events-none absolute -top-2 -right-3 h-[0.65em] w-[0.65em] rotate-[15deg]" />
        )}
        {word}
      </span>
      {text.slice(idx + word.length)}
    </>
  );
}

/** Souligne la 1re occurrence de `word` dans `text` (trait rouge droit,
 * recette Blog/News — pas le tracé manuscrit de InkUnderline). */
export function underlineWord(text: string, word: string): ReactNode {
  const idx = text.indexOf(word);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="underline decoration-red decoration-[3px] underline-offset-[3px]">{word}</span>
      {text.slice(idx + word.length)}
    </>
  );
}

/* -------- Petites annotations "à la main" (motif V6, cf. V6-NOTES.md) --------
 * Référence apportée par Ryan (ancienne V3.7) : de petites notes en écriture
 * manuscrite, parfois cerclées, qui ponctuent la page ("every minute counts",
 * "preventable"...). Toujours décoratif, jamais un texte essentiel à la
 * compréhension (aria-hidden sur le trait dessiné, le mot reste du texte réel). */

const ROUGH_CIRCLE = "M14 55C9 29 36 9 77 7C133 4 207 12 211 46C215 74 174 93 108 94C54 95 18 83 14 55Z";
const ROUGH_UNDERLINE = "M3 15C36 4 82 24 118 10C148 -1 185 16 213 6";

export function HandNote({
  children,
  variant = "circle",
  color = "var(--color-red-ink)",
  className = "",
}: {
  children: ReactNode;
  variant?: "circle" | "underline";
  color?: string;
  className?: string;
}) {
  return (
    // Le positionnement (relative en flux normal, ou absolute pour une
    // pastille flottante) est entièrement délégué à `className` de l'appelant
    // — ne JAMAIS mettre "relative" ici : Tailwind classerait sa règle
    // `.relative` après `.absolute` dans la feuille de style, et un
    // "absolute" passé par l'appelant serait silencieusement ignoré.
    <span className={`inline-block whitespace-nowrap ${className}`}>
      <span
        className="relative block px-3 py-2 font-[family-name:var(--font-caveat)] text-[1.35rem] leading-none font-semibold"
        style={{ color }}
      >
        <svg
          viewBox={variant === "circle" ? "0 0 220 100" : "0 0 216 26"}
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path
            d={variant === "circle" ? ROUGH_CIRCLE : ROUGH_UNDERLINE}
            fill="none"
            stroke={color}
            strokeWidth={variant === "circle" ? 2.6 : 3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="relative">{children}</span>
      </span>
    </span>
  );
}

/** Souligné manuscrit sous un mot/groupe de mots, dans la police normale
 * (contrairement à HandNote qui bascule en police manuscrite). */
export function InkUnderline({
  children,
  color = "var(--color-red-ink)",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    // Même remarque que HandNote : le positionnement externe reste piloté par
    // `className`, jamais de "relative" au même niveau qu'un "absolute" appelant.
    <span className={`inline-block ${className}`}>
      <span className="relative inline-block" style={{ color }}>
        {children}
        <svg
          viewBox="0 0 120 16"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-full h-[0.4em] w-full"
        >
          <path d="M2 10C22 3 50 14 68 7C90 -1 105 11 118 5" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
        </svg>
      </span>
    </span>
  );
}
