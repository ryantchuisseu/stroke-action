import Link from "next/link";
import { Container } from "./ui";
import { CONTACT } from "@/lib/nav";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "L'association",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Nos actions", href: "/nos-actions" },
      { label: "Gouvernance", href: "/gouvernance" },
      { label: "Documents clés", href: "/documents-cles" },
    ],
  },
  {
    title: "Comprendre l'AVC",
    links: [
      { label: "Éducation AVC", href: "/education-avc" },
      { label: "Le saviez-vous ?", href: "/education-avc#le-saviez-vous" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Actualités",
    links: [
      { label: "Blog / Actualités", href: "/actualites" },
      { label: "Galerie", href: "/galerie" },
    ],
  },
  {
    title: "S'engager",
    links: [
      { label: "Nous soutenir", href: "/nous-soutenir" },
      { label: "Devenir membre", href: "/nous-soutenir#devenir-membre" },
      { label: "Bénévolat", href: "/nous-soutenir#benevolat" },
      { label: "Contact", href: "/contact" },
      { label: "Espace membres — bientôt", href: "/espace-membres" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[rgba(252,250,246,0.14)] bg-ink py-[clamp(3rem,7vw,5rem)] text-paper">
      <Container>
        <p className="max-w-[24ch] text-[clamp(1.2rem,2.8vw,1.8rem)] font-bold tracking-[-0.02em] text-balance">
          Ensemble pour vaincre l&rsquo;AVC
          <span className="mt-[0.3rem] block text-[0.8em] font-medium text-[rgba(252,250,246,0.55)]">
            Together to Defeat Stroke
          </span>
        </p>

        <div className="mt-[clamp(2.25rem,5vw,3.5rem)] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8">
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[rgba(252,250,246,0.5)]">
                {col.title}
              </h3>
              <ul className="grid gap-[0.55rem]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[0.9rem] text-[rgba(252,250,246,0.82)] hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[rgba(252,250,246,0.5)]">
              Contact
            </h3>
            <ul className="grid gap-[0.55rem]">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-[0.9rem] text-[rgba(252,250,246,0.82)] hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="text-[0.9rem] text-[rgba(252,250,246,0.82)] hover:text-white">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="text-[0.9rem] text-[rgba(252,250,246,0.82)]">Tradex Nkoabang — Yaoundé</li>
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(2.25rem,5vw,3.5rem)] flex flex-wrap gap-x-5 gap-y-[0.4rem] border-t border-[rgba(252,250,246,0.14)] pt-[1.4rem] text-[0.78rem] text-[rgba(252,250,246,0.5)]">
          <span>© 2026 Stroke Action · Action AVC</span>
          <span>Yaoundé, Cameroun</span>
          <span>Site conçu et développé par AD Design</span>
          <span>Réseaux sociaux : bientôt</span>
        </div>
      </Container>
    </footer>
  );
}
