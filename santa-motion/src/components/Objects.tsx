import React from "react";
import { At, Box, IsoPlane, IsoPoly, Roof, mix, rectX, rectY, shade, V3 } from "../lib/iso";
import { rnd } from "../lib/anim";
import { COL } from "../lib/theme";

/* ---------------- Cadeau ---------------- */
export const Gift: React.FC<{
  x: number;
  y: number;
  z?: number;
  s?: number;
  h?: number;
  color: string;
  ribbon?: string;
  lid?: number; // ouverture du couvercle (unités monde)
  lidOpacity?: number;
  bow?: boolean;
  opacity?: number;
}> = ({ x, y, z = 0, s = 1, h, color, ribbon = COL.gold, lid = 0, lidOpacity = 1, bow = true, opacity = 1 }) => {
  if (s <= 0.001) return null;
  const w = s;
  const d = s;
  const hh = (h ?? s) * 1;
  const X = x + w;
  const Y = y + d;
  const r = s * 0.09;
  const cx = x + w / 2;
  const cy = y + d / 2;
  const lidH = hh * 0.22;
  const bodyH = hh - lidH;
  const lz = z + bodyH + lid;
  const o = s * 0.04;
  return (
    <g opacity={opacity}>
      <Box x={x} y={y} z={z} w={w} d={d} h={bodyH} color={color} top={lid > 0.05 ? mix(color, "#14051a", 0.6) : undefined} />
      {/* rubans sur le corps */}
      <IsoPoly p={rectX(X, cy - r, cy + r, z, z + bodyH)} fill={shade(ribbon, [1, 0, 0])} />
      <IsoPoly p={rectY(Y, cx - r, cx + r, z, z + bodyH)} fill={shade(ribbon, [0, 1, 0])} />
      <g opacity={lidOpacity}>
        <Box x={x - o} y={y - o} z={lz} w={w + 2 * o} d={d + 2 * o} h={lidH} color={mix(color, "#ffffff", 0.08)} />
        <IsoPoly p={rectX(X + o, cy - r, cy + r, lz, lz + lidH)} fill={shade(ribbon, [1, 0, 0])} />
        <IsoPoly p={rectY(Y + o, cx - r, cx + r, lz, lz + lidH)} fill={shade(ribbon, [0, 1, 0])} />
        <IsoPoly
          p={[
            [x - o, cy - r, lz + lidH],
            [X + o, cy - r, lz + lidH],
            [X + o, cy + r, lz + lidH],
            [x - o, cy + r, lz + lidH],
          ]}
          fill={shade(ribbon, [0, 0, 1])}
        />
        <IsoPoly
          p={[
            [cx - r, y - o, lz + lidH],
            [cx + r, y - o, lz + lidH],
            [cx + r, Y + o, lz + lidH],
            [cx - r, Y + o, lz + lidH],
          ]}
          fill={shade(ribbon, [0, 0, 1])}
        />
        {bow && (
          <At x={cx} y={cy} z={lz + lidH} s={s}>
            <ellipse cx={-9} cy={-6} rx={10} ry={6} transform="rotate(-25 -9 -6)" fill={mix(ribbon, "#000000", 0.08)} />
            <ellipse cx={9} cy={-6} rx={10} ry={6} transform="rotate(25 9 -6)" fill={mix(ribbon, "#000000", 0.18)} />
            <circle cx={0} cy={-3} r={4} fill={ribbon} />
          </At>
        )}
      </g>
    </g>
  );
};

/* ---------------- Sapin ---------------- */
export const Pine: React.FC<{
  x: number;
  y: number;
  z?: number;
  s?: number;
  lights?: number; // 0..1 nombre de guirlandes allumées
  star?: number;
  seed?: number;
  snowy?: boolean;
  ornaments?: boolean;
  t?: number;
}> = ({ x, y, z = 0, s = 1, lights = 0, star = 0, seed = 1, snowy = true, ornaments = false, t = 0 }) => {
  if (s <= 0.001) return null;
  const g1 = "#1f8a64";
  const g2 = "#156b4d";
  const tiers = [
    { y: -26, w: 34, h: 34 },
    { y: -48, w: 28, h: 30 },
    { y: -68, w: 20, h: 26 },
  ];
  const bulbs = [
    [-18, -30], [6, -27], [18, -32], [-8, -44], [12, -50], [-14, -56], [0, -62], [8, -70], [-6, -76], [-22, -36], [15, -41], [-2, -36],
  ];
  const bulbCols = ["#ff4d6d", "#ffd166", "#4cc9f0", "#ffffff", "#f72585", "#90e0ef"];
  return (
    <At x={x} y={y} z={z} s={s}>
      <ellipse cx={0} cy={0} rx={30} ry={12} fill="url(#softShadow)" />
      <rect x={-4} y={-14} width={8} height={14} fill="#6b4226" />
      {tiers.map((tr, i) => (
        <g key={i}>
          <path d={`M ${-tr.w} ${tr.y + 4} L 0 ${tr.y - tr.h} L ${tr.w} ${tr.y + 4} Z`} fill={g1} />
          <path d={`M 0 ${tr.y - tr.h} L ${tr.w} ${tr.y + 4} L 0 ${tr.y + 4} Z`} fill={g2} />
          {snowy && (
            <path
              d={`M ${-tr.w * 0.5} ${tr.y - tr.h * 0.48} L 0 ${tr.y - tr.h} L ${tr.w * 0.5} ${tr.y - tr.h * 0.48} Q ${tr.w * 0.25} ${tr.y - tr.h * 0.38} 0 ${tr.y - tr.h * 0.5} Q ${-tr.w * 0.25} ${tr.y - tr.h * 0.38} ${-tr.w * 0.5} ${tr.y - tr.h * 0.48} Z`}
              fill="#f4f7ff"
            />
          )}
        </g>
      ))}
      {ornaments &&
        bulbs.map((b, i) => {
          const on = lights * bulbs.length > i;
          const c = bulbCols[i % bulbCols.length];
          const flick = 0.75 + 0.25 * Math.sin(t * 0.3 + i * 2.1);
          return (
            <g key={i}>
              {on && <circle cx={b[0]} cy={b[1]} r={9} fill={c} opacity={0.35 * flick} />}
              <circle cx={b[0]} cy={b[1]} r={3.2} fill={on ? c : "#3a4a5e"} />
            </g>
          );
        })}
      {star > 0 && (
        <g transform={`translate(0 ${-96}) scale(${star})`}>
          <circle r={18} fill="url(#goldGlow)" />
          <path
            d="M0,-9 L2.6,-2.8 L9,-2.8 L3.9,1.2 L5.8,7.6 L0,3.8 L-5.8,7.6 L-3.9,1.2 L-9,-2.8 L-2.6,-2.8 Z"
            fill={COL.gold}
          />
        </g>
      )}
    </At>
  );
};

/* ---------------- Maison ---------------- */
export const House: React.FC<{
  x: number;
  y: number;
  w?: number;
  d?: number;
  h?: number;
  wall: string;
  roof?: string;
  roofH?: number;
  axis?: "x" | "y";
  lit?: number;
  rise?: number; // 0..1 construction
  chimney?: boolean;
  seed?: number;
}> = ({ x, y, w = 2, d = 2, h = 1.6, wall, roof = "#f4f7ff", roofH = 1.1, axis = "x", lit = 0, rise = 1, chimney = true, seed = 0 }) => {
  if (rise <= 0.001) return null;
  const hh = h * rise;
  const X = x + w;
  const Y = y + d;
  const win = mix(COL.window, COL.warm, lit);
  const winFrame = mix(wall, "#ffffff", 0.35);
  const rz = hh;
  // cheminée sur le pan visible
  const chx = axis === "x" ? x + w * 0.62 : x + w * 0.66;
  const chy = axis === "x" ? y + d * 0.66 : y + d * 0.3;
  return (
    <g>
      {/* lumière projetée au sol */}
      {lit > 0 && (
        <IsoPoly
          p={[
            [X, y + 0.1, 0.01],
            [X + 1.2, y - 0.2, 0.01],
            [X + 1.2, Y + 0.2, 0.01],
            [X, Y - 0.1, 0.01],
          ]}
          fill={COL.warm}
          opacity={0.18 * lit}
        />
      )}
      <Box x={x} y={y} w={w} d={d} h={hh} color={wall} />
      {lit > 0 && (
        <g opacity={lit * 0.55}>
          <At x={X} y={y + d * 0.5} z={hh * 0.5}>
            <circle r={46} fill="url(#warmGlow)" />
          </At>
          <At x={x + w * 0.7} y={Y} z={hh * 0.5}>
            <circle r={36} fill="url(#warmGlow)" />
          </At>
        </g>
      )}
      {/* fenêtres face +x */}
      {rise > 0.9 &&
        [0.28, 0.72].map((t, i) => {
          const cy = y + d * t;
          return (
            <g key={`wx${i}`}>
              <IsoPoly p={rectX(X + 0.01, cy - 0.26, cy + 0.26, hh * 0.38, hh * 0.38 + 0.52)} fill={winFrame} />
              <IsoPoly p={rectX(X + 0.02, cy - 0.19, cy + 0.19, hh * 0.38 + 0.07, hh * 0.38 + 0.45)} fill={win} />
            </g>
          );
        })}
      {/* porte + fenêtre face +y */}
      {rise > 0.9 && (
        <g>
          <IsoPoly p={rectY(Y + 0.01, x + w * 0.2, x + w * 0.2 + 0.48, 0, 0.9)} fill={mix(wall, COL.ink, 0.45)} />
          <IsoPoly p={rectY(Y + 0.02, x + w * 0.2 + 0.36, x + w * 0.2 + 0.42, 0.42, 0.48)} fill={COL.gold} />
          <IsoPoly p={rectY(Y + 0.01, x + w * 0.58, x + w * 0.88, hh * 0.38, hh * 0.38 + 0.52)} fill={winFrame} />
          <IsoPoly p={rectY(Y + 0.02, x + w * 0.62, x + w * 0.84, hh * 0.38 + 0.07, hh * 0.38 + 0.45)} fill={win} />
          {/* couronne de Noël */}
          <IsoPlane axis="x" x={x + w * 0.2 + 0.24} y={Y + 0.03} z={0.72}>
            <circle r={4.5} fill="none" stroke="#1f8a64" strokeWidth={2.6} />
            <circle cx={0} cy={4} r={1.6} fill="#e63946" />
          </IsoPlane>
        </g>
      )}
      <Roof x={x} y={y} z={rz} w={w} d={d} h={roofH * rise} axis={axis} color={roof} gable={wall} />
      {chimney && rise > 0.95 && (
        <Box
          x={chx}
          y={chy}
          z={rz + roofH * 0.3}
          w={0.32}
          d={0.32}
          h={roofH * 0.75}
          color={mix(wall, "#3a2a3a", 0.35)}
          top="#2b2236"
        />
      )}
    </g>
  );
};

export const chimneyTop = (x: number, y: number, w = 2, d = 2, h = 1.6, roofH = 1.1, axis: "x" | "y" = "x"): V3 => {
  const chx = axis === "x" ? x + w * 0.62 : x + w * 0.66;
  const chy = axis === "x" ? y + d * 0.66 : y + d * 0.3;
  return [chx + 0.16, chy + 0.16, h + roofH * 1.05];
};

/* ---------------- Socle diorama ---------------- */
export const Diorama: React.FC<{
  x: number;
  y: number;
  w: number;
  d: number;
  h?: number;
  top?: string;
  side?: string;
  rise?: number;
}> = ({ x, y, w, d, h = 1, top = COL.snow, side = COL.earth, rise = 1 }) => (
  <g>
    <Box x={x} y={y} z={-h} w={w} d={d} h={h} color={side} top={top} />
    {/* liseré de neige sur la tranche */}
    <IsoPoly
      p={[
        [x + w, y, 0],
        [x + w, y + d, 0],
        [x + w, y + d, -0.18],
        [x + w, y, -0.18],
      ]}
      fill={shade(COL.snow, [1, 0, 0])}
    />
    <IsoPoly
      p={[
        [x, y + d, 0],
        [x + w, y + d, 0],
        [x + w, y + d, -0.18],
        [x, y + d, -0.18],
      ]}
      fill={shade(COL.snow, [0, 1, 0])}
    />
  </g>
);

/* ---------------- Fumée ---------------- */
export const Smoke: React.FC<{ x: number; y: number; z: number; f: number; seed?: number; scale?: number; color?: string }> = ({
  x,
  y,
  z,
  f,
  seed = 0,
  scale = 1,
  color = "#dfe6ff",
}) => (
  <At x={x} y={y} z={z} s={scale}>
    {Array.from({ length: 5 }).map((_, i) => {
      const life = 60;
      const t = ((f + seed * 17 + i * (life / 5)) % life) / life;
      const r = 5 + t * 16;
      return (
        <circle
          key={i}
          cx={Math.sin(t * 4 + i) * 6 + t * 28}
          cy={-t * 70}
          r={r}
          fill={color}
          opacity={(1 - t) * 0.5}
        />
      );
    })}
  </At>
);

/* ---------------- Pin de livraison ---------------- */
export const Pin: React.FC<{ x: number; y: number; z: number; s: number }> = ({ x, y, z, s }) =>
  s <= 0.001 ? null : (
    <At x={x} y={y} z={z} s={s}>
      <circle cx={0} cy={-34} r={28} fill="url(#goldGlow)" opacity={0.6} />
      <path d="M0 0 C -6 -10 -16 -18 -16 -30 A 16 16 0 1 1 16 -30 C 16 -18 6 -10 0 0 Z" fill={COL.gold} />
      <circle cx={0} cy={-30} r={11} fill="#fff" />
      <path d="M -5 -30 L -1 -26 L 6 -34" stroke={COL.green} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </At>
  );

/* ---------------- Paillettes ---------------- */
export const Sparkle: React.FC<{ cx: number; cy: number; r: number; o: number; rot?: number; color?: string }> = ({
  cx,
  cy,
  r,
  o,
  rot = 0,
  color = "#fff3c4",
}) => (
  <g transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${r})`} opacity={o}>
    <path d="M0,-1 Q0.12,-0.12 1,0 Q0.12,0.12 0,1 Q-0.12,0.12 -1,0 Q-0.12,-0.12 0,-1 Z" fill={color} />
  </g>
);

export const scatter = (n: number, seed: number) =>
  Array.from({ length: n }).map((_, i) => ({ a: rnd(seed + i * 1.7), b: rnd(seed + i * 3.3), c: rnd(seed + i * 5.9) }));
