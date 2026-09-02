export type NavItem = { label: string; href: string; desc?: string; soon?: boolean };
export type NavGroup = { label: string; items: NavItem[] };

/** Header groupé : 4 entrées max, on clique pour dérouler. */
export const NAV: NavGroup[] = [
  {
    label: "L'association",
    items: [
      { label: "À propos", href: "/a-propos", desc: "Histoire, vision, mission, valeurs" },
      { label: "Nos actions", href: "/nos-actions", desc: "Les cinq programmes" },
      { label: "Gouvernance", href: "/gouvernance", desc: "Le bureau exécutif" },
      { label: "Documents clés", href: "/documents-cles", desc: "Statuts, règlement, plan stratégique" },
    ],
  },
  {
    label: "Comprendre l'AVC",
    items: [
      { label: "Éducation AVC", href: "/education-avc", desc: "Signes, FAST, facteurs de risque" },
      { label: "Le saviez-vous ?", href: "/education-avc#le-saviez-vous", desc: "Idées reçues et faits essentiels" },
      { label: "FAQ", href: "/faq", desc: "Questions fréquentes" },
    ],
  },
  {
    label: "Actualités",
    items: [
      { label: "Blog / Actualités", href: "/actualites", desc: "Articles, campagnes, événements" },
      { label: "Galerie", href: "/galerie", desc: "Photos de nos activités" },
    ],
  },
  {
    label: "S'engager",
    items: [
      { label: "Nous soutenir", href: "/nous-soutenir", desc: "Don, adhésion, boutique, bénévolat" },
      { label: "Devenir membre", href: "/nous-soutenir#devenir-membre", desc: "Formulaire d'adhésion" },
      { label: "Bénévolat", href: "/nous-soutenir#benevolat", desc: "Donner de son temps" },
      { label: "Contact", href: "/contact", desc: "Nous écrire" },
      { label: "Espace membres", href: "/espace-membres", desc: "Réservé aux membres", soon: true },
    ],
  },
];

export const CONTACT = {
  email: "contact@strokeaction.org",
  phone: "+237 652 14 81 47",
  phoneHref: "tel:+237652148147",
  address: "Tradex Nkoabang, Yaoundé, Cameroun",
  domain: "strokeaction.org",
};
