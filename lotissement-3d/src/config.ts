/**
 * ============================================================
 *  CONFIGURATION — tout ce qui se modifie sans toucher à la 3D
 * ============================================================
 */

export const ENTREPRISE = {
  nom: "[NOM DE L'ENTREPRISE]",
  initiales: "NE", // affichées dans le logo provisoire
  ville: "[VILLE]",
  telephone: "[NUMÉRO]",
  slogan: "Terrains titrés & sécurisés",
};

export const TEXTES = {
  plan1: "Du terrain brut…",
  plan2: "Défrichage",
  plan3: "Défrichage & terrassement",
  plan4: "Bornage & lotissement",
  plan5: "Voirie • Électricité • Eau",
  plan6: "…à votre futur chez-vous.",
  disponible: "DISPONIBLE",
  lot: "Lot", // préfixe des étiquettes : « Lot 01 »
  surfaceLot: "500 m²",
  carteVille: (ville: string) => `Lots disponibles à ${ville}`,
  carteTel: "Téléphone / WhatsApp",
};

export const COULEURS = {
  vert: "#2F6B3A",
  vertClair: "#4E8F4A",
  laterite: "#C1502E",
  sable: "#E8C79A",
  ciel: "#9CC9E8",
  peche: "#F6C79E",
  marque: "#F2B705",
  texte: "#FFFFFF",
  bitume: "#3E4148",
  creme: "#F3E7D0",
  toits: ["#B5442E", "#2E6E8E", "#3F7F4F", "#8A4F9E", "#D17A22"],
};

export const POLICE = { famille: "Montserrat", fichier: "fonts/Montserrat.woff2" };

/** Durées des plans en secondes (le total donne la durée de la vidéo). */
export const PLANS = {
  terrainBrut: 5,
  bulldozer: 8,
  terrassement: 5,
  bornage: 8,
  viabilisation: 6,
  quartier: 7,
  appel: 6,
};

export const FPS = 30;

/** Lotissement : grille de lots de part et d'autre d'une voie principale. */
export const LOTISSEMENT = {
  colonnes: 6,
  rangees: 4,
  largeurLot: 7, // unités 3D (≈ 22 m)
  profondeurLot: 7,
  largeurRoute: 3,
  lotDisponible: 6, // index (0..n-1) du lot mis en surbrillance à la fin
};

/** Musique optionnelle : placez le fichier dans public/. S'il est absent, la vidéo se rend sans son. */
export const AUDIO = { fichier: "music.mp3", volume: 0.8 };

/* ----------- dérivés (ne pas modifier) ----------- */
const ordre = Object.values(PLANS);
export const DUREE_TOTALE = ordre.reduce((a, b) => a + b, 0);
/** Début (en secondes) de chaque plan */
export const DEBUT = (() => {
  const keys = Object.keys(PLANS) as (keyof typeof PLANS)[];
  const out = {} as Record<keyof typeof PLANS, number>;
  let acc = 0;
  for (const k of keys) {
    out[k] = acc;
    acc += PLANS[k];
  }
  return out;
})();
