import React from "react";

/**
 * Mini-moteur isométrique en SVG.
 * Monde : x vers bas-droite, y vers bas-gauche, z vers le haut.
 * Le spectateur regarde depuis (+1, +1, +1) : faces visibles = +x, +y, +z.
 */
export const U = 40; // pixels par unité monde
export const C = Math.cos(Math.PI / 6);

export type V3 = [number, number, number];

export const project = (x: number, y: number, z = 0): [number, number] => [
  (x - y) * C * U,
  ((x + y) * 0.5 - z) * U,
];

export const toPoints = (p: V3[]) =>
  p
    .map((q) => {
      const [a, b] = project(q[0], q[1], q[2]);
      return `${a.toFixed(2)},${b.toFixed(2)}`;
    })
    .join(" ");

/* ---------------- couleurs ---------------- */
const hexToRgb = (h: string) => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
export const mix = (a: string, b: string, t: number) => {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  const tt = Math.max(0, Math.min(1, t));
  return (
    "#" +
    A.map((v, i) => Math.round(v + (B[i] - v) * tt).toString(16).padStart(2, "0")).join("")
  );
};

export const SHADOW = "#1b1f4b";

const len = (v: V3) => Math.hypot(v[0], v[1], v[2]);
const norm = (v: V3): V3 => {
  const l = len(v) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const LIGHT = norm([0.3, 0.6, 1]);

/** Ombrage stylisé : dessus éclairci, face +y = couleur de base, face +x assombrie. */
export const shade = (base: string, n: V3) => {
  const k = dot(norm(n), LIGHT);
  if (k >= 0.5) return mix(base, "#ffffff", Math.min(0.2, ((k - 0.5) / 0.33) * 0.13));
  return mix(base, SHADOW, Math.min(0.6, ((0.5 - k) / 0.25) * 0.3));
};

/* ---------------- géométrie ---------------- */
const avg = (p: V3[]): V3 => {
  const s = p.reduce<V3>((a, q) => [a[0] + q[0], a[1] + q[1], a[2] + q[2]], [0, 0, 0]);
  return [s[0] / p.length, s[1] / p.length, s[2] / p.length];
};
// Méthode de Newell : normale robuste d'un polygone
const newell = (p: V3[]): V3 => {
  const n: V3 = [0, 0, 0];
  for (let i = 0; i < p.length; i++) {
    const a = p[i];
    const b = p[(i + 1) % p.length];
    n[0] += (a[1] - b[1]) * (a[2] + b[2]);
    n[1] += (a[2] - b[2]) * (a[0] + b[0]);
    n[2] += (a[0] - b[0]) * (a[1] + b[1]);
  }
  return n;
};

export type Face = { p: V3[]; color?: string; opacity?: number };

export const Solid: React.FC<{
  faces: Face[];
  color: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  faceOpacity?: number;
  dash?: string;
}> = ({ faces, color, stroke, strokeWidth = 1, opacity = 1, faceOpacity = 1, dash }) => {
  const cen = avg(faces.flatMap((f) => f.p));
  return (
    <g opacity={opacity}>
      {faces.map((f, i) => {
        let n = newell(f.p);
        const fc = avg(f.p);
        const out: V3 = [fc[0] - cen[0], fc[1] - cen[1], fc[2] - cen[2]];
        if (dot(n, out) < 0) n = [-n[0], -n[1], -n[2]];
        if (dot(n, [1, 1, 1]) <= 1e-6) return null;
        const fill = shade(f.color ?? color, n);
        return (
          <polygon
            key={i}
            points={toPoints(f.p)}
            fill={fill}
            fillOpacity={f.opacity ?? faceOpacity}
            stroke={stroke ?? fill}
            strokeWidth={stroke ? strokeWidth : 0.8}
            strokeLinejoin="round"
            strokeDasharray={dash}
          />
        );
      })}
    </g>
  );
};

export const boxFaces = (x: number, y: number, z: number, w: number, d: number, h: number): Face[] => {
  const X = x + w;
  const Y = y + d;
  const Z = z + h;
  return [
    { p: [[x, y, Z], [X, y, Z], [X, Y, Z], [x, Y, Z]] }, // dessus
    { p: [[x, y, z], [X, y, z], [X, Y, z], [x, Y, z]] }, // dessous
    { p: [[X, y, z], [X, Y, z], [X, Y, Z], [X, y, Z]] }, // +x
    { p: [[x, y, z], [x, Y, z], [x, Y, Z], [x, y, Z]] }, // -x
    { p: [[x, Y, z], [X, Y, z], [X, Y, Z], [x, Y, Z]] }, // +y
    { p: [[x, y, z], [X, y, z], [X, y, Z], [x, y, Z]] }, // -y
  ];
};

export type BoxProps = {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  color: string;
  top?: string;
  sideX?: string;
  sideY?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  faceOpacity?: number;
  dash?: string;
};

export const Box: React.FC<BoxProps> = ({ x, y, z = 0, w, d, h, color, top, sideX, sideY, ...rest }) => {
  if (h <= 0.001 || w <= 0.001 || d <= 0.001) return null;
  const f = boxFaces(x, y, z, w, d, h);
  if (top) f[0].color = top;
  if (sideX) f[2].color = sideX;
  if (sideY) f[4].color = sideY;
  return <Solid faces={f} color={color} {...rest} />;
};

/** Toit à deux pans. axis = direction du faîtage. */
export const Roof: React.FC<{
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  axis?: "x" | "y";
  color: string;
  gable?: string;
  overhang?: number;
  opacity?: number;
}> = ({ x, y, z, w, d, h, axis = "x", color, gable, overhang = 0.15, opacity }) => {
  const o = overhang;
  const x0 = x - o;
  const y0 = y - o;
  const X = x + w + o;
  const Y = y + d + o;
  const Z = z + h;
  let faces: Face[];
  if (axis === "x") {
    const m = (y0 + Y) / 2;
    faces = [
      { p: [[x0, y0, z], [X, y0, z], [X, m, Z], [x0, m, Z]] },
      { p: [[x0, Y, z], [X, Y, z], [X, m, Z], [x0, m, Z]] },
      { p: [[x0, y0, z], [x0, Y, z], [x0, m, Z]], color: gable },
      { p: [[X, y0, z], [X, Y, z], [X, m, Z]], color: gable },
      { p: [[x0, y0, z], [X, y0, z], [X, Y, z], [x0, Y, z]] },
    ];
  } else {
    const m = (x0 + X) / 2;
    faces = [
      { p: [[x0, y0, z], [x0, Y, z], [m, Y, Z], [m, y0, Z]] },
      { p: [[X, y0, z], [X, Y, z], [m, Y, Z], [m, y0, Z]] },
      { p: [[x0, y0, z], [X, y0, z], [m, y0, Z]], color: gable },
      { p: [[x0, Y, z], [X, Y, z], [m, Y, Z]], color: gable },
      { p: [[x0, y0, z], [X, y0, z], [X, Y, z], [x0, Y, z]] },
    ];
  }
  return <Solid faces={faces} color={color} opacity={opacity} />;
};

/** Polygone plat (sol, ruban, fenêtre…) */
export const IsoPoly: React.FC<{
  p: V3[];
  fill: string;
  opacity?: number;
  stroke?: string;
  strokeWidth?: number;
  dash?: string;
}> = ({ p, fill, opacity = 1, stroke, strokeWidth = 1, dash }) => (
  <polygon
    points={toPoints(p)}
    fill={fill}
    opacity={opacity}
    stroke={stroke}
    strokeWidth={stroke ? strokeWidth : 0}
    strokeDasharray={dash}
    strokeLinejoin="round"
  />
);

/** Rectangle sur une face verticale x = cste (face +x) */
export const rectX = (X: number, y0: number, y1: number, z0: number, z1: number): V3[] => [
  [X, y0, z0],
  [X, y1, z0],
  [X, y1, z1],
  [X, y0, z1],
];
/** Rectangle sur une face verticale y = cste (face +y) */
export const rectY = (Y: number, x0: number, x1: number, z0: number, z1: number): V3[] => [
  [x0, Y, z0],
  [x1, Y, z0],
  [x1, Y, z1],
  [x0, Y, z1],
];
export const rectZ = (Z: number, x0: number, x1: number, y0: number, y1: number): V3[] => [
  [x0, y0, Z],
  [x1, y0, Z],
  [x1, y1, Z],
  [x0, y1, Z],
];

/** Groupe positionné sur un point monde (billboard, toujours face caméra). */
export const At: React.FC<{
  x: number;
  y: number;
  z?: number;
  s?: number;
  r?: number;
  opacity?: number;
  children: React.ReactNode;
}> = ({ x, y, z = 0, s = 1, r = 0, opacity, children }) => {
  const [px, py] = project(x, y, z);
  return (
    <g transform={`translate(${px.toFixed(2)},${py.toFixed(2)}) rotate(${r}) scale(${s})`} opacity={opacity}>
      {children}
    </g>
  );
};

/**
 * Dessin 2D plaqué sur un plan isométrique.
 * - "x" : plan vertical le long de l'axe x (face +y visible), u -> +x
 * - "y" : plan vertical le long de -y (face +x visible), u -> -y
 * - "top": plan horizontal, u -> +x, v -> +y
 */
export const IsoPlane: React.FC<{
  axis: "x" | "y" | "top";
  x: number;
  y: number;
  z?: number;
  flip?: boolean;
  s?: number;
  opacity?: number;
  children: React.ReactNode;
}> = ({ axis, x, y, z = 0, flip, s = 1, opacity, children }) => {
  const [px, py] = project(x, y, z);
  const m =
    axis === "x" ? [C, 0.5, 0, 1] : axis === "y" ? [C, -0.5, 0, 1] : [C, 0.5, -C, 0.5];
  return (
    <g transform={`matrix(${m.join(",")},${px.toFixed(2)},${py.toFixed(2)})`} opacity={opacity}>
      <g transform={`scale(${flip ? -s : s},${s})`}>{children}</g>
    </g>
  );
};

/** Caméra : centre le point monde (x,y,z) avec un zoom. */
export const Camera: React.FC<{
  x: number;
  y: number;
  z?: number;
  zoom?: number;
  children: React.ReactNode;
}> = ({ x, y, z = 0, zoom = 1, children }) => {
  const [px, py] = project(x, y, z);
  return <g transform={`scale(${zoom}) translate(${(-px).toFixed(2)},${(-py).toFixed(2)})`}>{children}</g>;
};

export const camToScreen = (
  cam: { x: number; y: number; z?: number; zoom: number },
  p: V3,
): [number, number] => {
  const [cx, cy] = project(cam.x, cam.y, cam.z ?? 0);
  const [px, py] = project(p[0], p[1], p[2]);
  return [(px - cx) * cam.zoom, (py - cy) * cam.zoom];
};

/** Enveloppe convexe 2D (monotone chain) */
export const hull = (pts: [number, number][]) => {
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: number[], a: number[], b: number[]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  const upper: [number, number][] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
};

export const boxHullPoints = (x: number, y: number, z: number, w: number, d: number, h: number) => {
  const v: [number, number][] = [];
  for (const a of [x, x + w]) for (const b of [y, y + d]) for (const c of [z, z + h]) v.push(project(a, b, c));
  return hull(v)
    .map((q) => `${q[0].toFixed(2)},${q[1].toFixed(2)}`)
    .join(" ");
};

export const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    viewBox="-960 -540 1920 1080"
    width={1920}
    height={1080}
    style={{ position: "absolute", inset: 0 }}
  >
    {children}
  </svg>
);
