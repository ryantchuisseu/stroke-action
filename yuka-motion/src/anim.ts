import { Easing, interpolate, spring } from "remotion";

export const FPS = 30;
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const prog = (f: number, start: number, dur: number, ease: (t: number) => number = Easing.inOut(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { ...CL, easing: ease });
export const range = (f: number, i: number[], o: number[], ease?: (t: number) => number) =>
  interpolate(f, i, o, { ...CL, easing: ease });
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const pop = (f: number, start: number, damping = 12, stiffness = 160) =>
  spring({ frame: f - start, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
export const out = Easing.out(Easing.cubic);
export const expoOut = Easing.out(Easing.exp);
export const inOut = Easing.inOut(Easing.cubic);
export const back = Easing.out(Easing.back(1.8));
export const rnd = (s: number) => {
  const x = Math.sin(s * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/** Découpage de la pub (frames, 30 fps) */
export const T = {
  hook: 0, // rayons pleins de produits : « Que contient vraiment… ? »
  phoneIn: 84, // le téléphone arrive
  scan1: 112, // le biscuit est scanné
  food: 166, // fiche produit alimentaire
  cosmetic: 330, // scan cosmétique
  alt: 455, // alternative plus saine
  proof: 566, // indépendance + 80 M d'utilisateurs
  outro: 660, // logo + appel à l'action
  end: 750,
};
