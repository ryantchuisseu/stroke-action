import { LOTISSEMENT } from "../config";
import { DRONE, fin, lerp, P, prog } from "./timeline";

/* ================= Géométrie du lotissement ================= */
const { colonnes: NC, rangees: NR, largeurLot: LW, profondeurLot: LD, largeurRoute: RW } = LOTISSEMENT;

const midC = Math.floor(NC / 2); // voie transversale après cette colonne
const midR = Math.floor(NR / 2); // voie principale après cette rangée
export const INNER_W = NC * LW + RW;
export const INNER_D = NR * LD + RW;
export const OUTER_W = INNER_W + 2 * RW;
export const OUTER_D = INNER_D + 2 * RW;
export const SITE = { x0: -OUTER_W / 2 - 2, x1: OUTER_W / 2 + 2, z0: -OUTER_D / 2 - 2, z1: OUTER_D / 2 + 2 };

export type Rect = { x0: number; z0: number; w: number; d: number };
export type Lot = Rect & { index: number; cx: number; cz: number };

const colX = (c: number) => -INNER_W / 2 + c * LW + (c >= midC ? RW : 0);
const rowZ = (r: number) => -INNER_D / 2 + r * LD + (r >= midR ? RW : 0);

export const LOTS: Lot[] = [];
for (let r = 0; r < NR; r++)
  for (let c = 0; c < NC; c++) {
    const x0 = colX(c);
    const z0 = rowZ(r);
    LOTS.push({ x0, z0, w: LW, d: LD, index: LOTS.length, cx: x0 + LW / 2, cz: z0 + LD / 2 });
  }

/** Routes : axe "x" = parallèle à x */
export type Road = Rect & { axis: "x" | "z"; main?: boolean };
export const MAIN_Z = rowZ(midR) - RW / 2; // centre de la voie principale
export const CROSS_X = colX(midC) - RW / 2;
export const ROADS: Road[] = [
  { x0: -OUTER_W / 2, z0: MAIN_Z - RW / 2, w: OUTER_W, d: RW, axis: "x", main: true },
  { x0: CROSS_X - RW / 2, z0: -OUTER_D / 2, w: RW, d: OUTER_D, axis: "z" },
  { x0: -OUTER_W / 2, z0: -OUTER_D / 2, w: OUTER_W, d: RW, axis: "x" },
  { x0: -OUTER_W / 2, z0: OUTER_D / 2 - RW, w: OUTER_W, d: RW, axis: "x" },
  { x0: -OUTER_W / 2, z0: -OUTER_D / 2, w: RW, d: OUTER_D, axis: "z" },
  { x0: OUTER_W / 2 - RW, z0: -OUTER_D / 2, w: RW, d: OUTER_D, axis: "z" },
];

/** Bornes : coins uniques des lots */
export const BORNES: [number, number][] = (() => {
  const m = new Map<string, [number, number]>();
  for (const l of LOTS)
    for (const [x, z] of [
      [l.x0, l.z0],
      [l.x0 + l.w, l.z0],
      [l.x0, l.z0 + l.d],
      [l.x0 + l.w, l.z0 + l.d],
    ])
      m.set(`${x.toFixed(2)},${z.toFixed(2)}`, [x, z]);
  // apparition en balayage depuis le centre
  return [...m.values()].sort((a, b) => Math.hypot(a[0], a[1] * 1.2) - Math.hypot(b[0], b[1] * 1.2));
})();

/** Segments du plan cadastral (bords uniques des lots) */
export const SEGMENTS: [number, number, number, number][] = (() => {
  const m = new Map<string, [number, number, number, number]>();
  const add = (a: number, b: number, c: number, d: number) => {
    const k = [a, b, c, d].map((v) => v.toFixed(2)).join(",");
    m.set(k, [a, b, c, d]);
  };
  for (const l of LOTS) {
    const X = l.x0 + l.w;
    const Z = l.z0 + l.d;
    add(l.x0, l.z0, X, l.z0);
    add(l.x0, Z, X, Z);
    add(l.x0, l.z0, l.x0, Z);
    add(X, l.z0, X, Z);
  }
  return [...m.values()].sort((p, q) => Math.hypot(p[0] + p[2], p[1] + p[3]) - Math.hypot(q[0] + q[2], q[1] + q[3]));
})();

/* ================= Bulldozer ================= */
export const BANDS = 8;
export const BAND_W = (SITE.z1 - SITE.z0) / BANDS;
export const bandZ = (b: number) => SITE.z0 + (b + 0.5) * BAND_W;
export const BLADE = 2.4; // distance centre → lame
const X_IN = SITE.x0 - 5;
const X_OUT = SITE.x1 + 3;
const HERO = BANDS - 1; // passe filmée au plan 2 (bande la plus proche de la caméra)

// Plan 2 : passe héroïque
const H0 = P.bulldozer + 0.4;
const H1 = fin("bulldozer") - 0.3;
// Plan 3 : allers-retours en accéléré
const T0 = P.terrassement + 0.1;
const T1 = fin("terrassement") - 0.35;
const PASS = (T1 - T0) / (BANDS - 1);

export type DozerState = { x: number; z: number; dir: 1 | -1; moving: boolean; visible: number; band: number; speed: number };

const heroX = (t: number) => lerp(X_IN, X_OUT, prog(t, H0, H1, DRONE));

export const dozerAt = (t: number): DozerState => {
  if (t < T0) {
    const x = heroX(t);
    const sp = Math.abs(heroX(t + 0.05) - heroX(t - 0.05)) * 10;
    return { x, z: bandZ(HERO), dir: 1, moving: sp > 0.3, visible: 1, band: HERO, speed: sp };
  }
  const k = Math.min(BANDS - 2, Math.floor((t - T0) / PASS));
  const band = HERO - 1 - k;
  const dir: 1 | -1 = k % 2 === 0 ? -1 : 1;
  const local = Math.min(1, (t - T0 - k * PASS) / PASS);
  const xa = dir === 1 ? X_IN : X_OUT;
  const xb = dir === 1 ? X_OUT : X_IN;
  const visible = 1 - prog(t, T1 + 0.05, T1 + 0.35);
  return { x: lerp(xa, xb, local), z: bandZ(band), dir, moving: t < T1, visible, band, speed: 40 };
};

/** Instant où la lame atteint la position x dans la bande b (∞ si jamais) */
export const clearTime = (x: number, z: number): number => {
  const b = Math.max(0, Math.min(BANDS - 1, Math.floor((z - SITE.z0) / BAND_W)));
  if (b === HERO) {
    // recherche dichotomique sur la passe filmée (monotone)
    let lo = H0;
    let hi = H1;
    if (heroX(hi) + BLADE < x) return Infinity;
    for (let i = 0; i < 30; i++) {
      const m = (lo + hi) / 2;
      if (heroX(m) + BLADE < x) lo = m;
      else hi = m;
    }
    return hi;
  }
  const k = HERO - 1 - b;
  const dir = k % 2 === 0 ? -1 : 1;
  const xa = dir === 1 ? X_IN : X_OUT;
  const xb = dir === 1 ? X_OUT : X_IN;
  const target = x - dir * BLADE;
  const local = (target - xa) / (xb - xa);
  return T0 + k * PASS + Math.max(0, Math.min(1, local)) * PASS;
};

/** Étendue dégagée de la bande b à l'instant t : [xmin, xmax] ou null */
export const bandExtent = (b: number, t: number): [number, number] | null => {
  const tA = clearTime(SITE.x0, bandZ(b));
  const tB = clearTime(SITE.x1, bandZ(b));
  if (t >= Math.max(tA, tB)) return [SITE.x0, SITE.x1];
  if (t < Math.min(tA, tB)) return null;
  const s = dozerAt(t);
  const blade = Math.max(SITE.x0, Math.min(SITE.x1, s.x + s.dir * BLADE));
  return s.dir === 1 ? [SITE.x0, blade] : [blade, SITE.x1];
};

export const IMPACT_T = clearTime(SITE.x0 + 0.01, bandZ(HERO)); // la lame touche le sol
export const HERO_T = { start: H0, end: H1 };
