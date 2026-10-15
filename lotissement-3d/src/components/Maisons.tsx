import React, { useMemo } from "react";
import { COULEURS, LOTISSEMENT } from "../config";
import { LOTS, MAIN_Z, OUTER_W } from "../lib/layout";
import { P, rnd, springAt, useTime } from "../lib/timeline";
import { GEO, Instanced } from "./Instanced";

const RW = LOTISSEMENT.largeurRoute;

type House = {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  face: 1 | -1; // façade vers +z ou -z
  roof: string;
  start: number;
  lot: (typeof LOTS)[number];
};

const HOUSES: House[] = LOTS.filter((l) => l.index !== LOTISSEMENT.lotDisponible)
  .map((l) => {
    const r = rnd(l.index * 3.3 + 1);
    const face: 1 | -1 = l.cz < MAIN_Z ? 1 : -1;
    return {
      x: l.cx + (rnd(l.index * 1.7) - 0.5) * 0.8,
      z: l.cz - face * 0.4,
      w: 3.6 + r * 1.1,
      d: 3.3 + rnd(l.index * 9.1) * 0.9,
      h: 2.1 + rnd(l.index * 5.3) * 0.6,
      face,
      roof: COULEURS.toits[l.index % COULEURS.toits.length],
      lot: l,
      start: 0,
    };
  })
  // cascade : du centre vers l'extérieur
  .sort((a, b) => Math.hypot(a.x, a.z - MAIN_Z) - Math.hypot(b.x, b.z - MAIN_Z))
  .map((h, i) => ({ ...h, start: P.quartier + 0.4 + i * 0.17 }));

/** Ouvertures : porte + 2 fenêtres en façade, 1 fenêtre par pignon */
const OPENINGS = HOUSES.flatMap((h) => [
  { h, dx: -h.w * 0.22, w: 0.75, hh: 1.5, y: 0, side: 0 },
  { h, dx: h.w * 0.18, w: 0.9, hh: 0.8, y: 0.85, side: 0 },
  { h, dx: h.w * 0.38, w: 0.5, hh: 0.8, y: 0.85, side: 0 },
  { h, dx: 0, w: 0.8, hh: 0.8, y: 0.85, side: 1 },
]);

/** Murs de clôture (3 côtés + façade avec portail) */
const WALLS = HOUSES.flatMap((h) => {
  const l = h.lot;
  const m = 0.15;
  const front = h.face === 1 ? l.z0 + l.d - m : l.z0 + m;
  const back = h.face === 1 ? l.z0 + m : l.z0 + l.d - m;
  return [
    { h, x: l.cx, z: back, w: l.w - 2 * m, d: 0.18 },
    { h, x: l.x0 + m, z: l.cz, w: 0.18, d: l.d - 2 * m },
    { h, x: l.x0 + l.w - m, z: l.cz, w: 0.18, d: l.d - 2 * m },
    { h, x: l.x0 + l.w * 0.2, z: front, w: l.w * 0.4 - m, d: 0.18 },
    { h, x: l.x0 + l.w * 0.8, z: front, w: l.w * 0.4 - m, d: 0.18 },
  ];
});

/** Arbres d'alignement le long de la voie principale */
const STREET_TREES = Array.from({ length: 14 }, (_, i) => {
  const side = i % 2 === 0 ? -1 : 1;
  const x = -OUTER_W / 2 + 4 + Math.floor(i / 2) * ((OUTER_W - 8) / 6) + (side > 0 ? 2.5 : 0);
  return { x, z: MAIN_Z + side * (RW / 2 + 1.1), start: P.quartier + 1.2 + i * 0.12, s: 0.8 + rnd(i) * 0.25 };
});

export const Maisons: React.FC = () => {
  const t = useTime();
  const wallsK = (h: House) => Math.max(0, springAt(t, h.start, 6.5, 2.2));
  const roofK = (h: House) => Math.max(0, springAt(t, h.start + 0.25, 6.5, 2.2));
  return (
    <group>
      {/* murs des maisons (crème) */}
      <Instanced
        items={HOUSES}
        geometry={GEO.box}
        t={t}
        castShadow
        color={COULEURS.creme}
        roughness={0.85}
        pose={(o, h) => {
          const k = wallsK(h);
          o.position.set(h.x, 0.06, h.z);
          o.scale.set(h.w * Math.min(1.08, 0.6 + 0.4 * k), h.h * k, h.d * Math.min(1.08, 0.6 + 0.4 * k));
        }}
      />
      {/* toits en tôle colorée */}
      <Instanced
        items={HOUSES}
        geometry={GEO.roof}
        t={t}
        castShadow
        colors={(h) => h.roof}
        roughness={0.55}
        pose={(o, h) => {
          const k = roofK(h);
          o.position.set(h.x, 0.06 + h.h * Math.min(1, wallsK(h)) + (1 - Math.min(1, k)) * 2, h.z);
          o.scale.set((h.w + 0.7) * k, 1.25 * k, (h.d + 0.7) * k);
        }}
      />
      {/* portes et fenêtres */}
      <Instanced
        items={OPENINGS}
        geometry={GEO.box}
        t={t}
        colors={(op) => (op.hh > 1.2 ? "#7a4a2a" : "#2d4a63")}
        roughness={0.4}
        pose={(o, op) => {
          const h = op.h;
          const k = Math.min(1, wallsK(h));
          const vis = t > h.start + 0.35 ? 1 : 0;
          if (op.side === 0) {
            o.position.set(h.x + op.dx, 0.06 + op.y * k + 0.05, h.z + (h.face * h.d) / 2);
            o.scale.set(op.w * vis, op.hh * vis, 0.08);
          } else {
            o.position.set(h.x + h.w / 2, 0.06 + op.y * k + 0.05, h.z);
            o.scale.set(0.08, op.hh * vis, op.w * vis);
          }
        }}
      />
      {/* clôtures (sable) */}
      <Instanced
        items={WALLS}
        geometry={GEO.box}
        t={t}
        castShadow
        color={COULEURS.sable}
        pose={(o, w) => {
          const k = Math.max(0, springAt(t, w.h.start - 0.15, 7, 2.2));
          o.position.set(w.x, 0.06, w.z);
          o.scale.set(w.w, 0.75 * k, w.d);
        }}
      />
      {/* arbres d'alignement */}
      <Instanced
        items={STREET_TREES}
        geometry={GEO.trunk}
        t={t}
        castShadow
        color="#6b4a32"
        pose={(o, tr) => {
          const k = Math.max(0, springAt(t, tr.start, 6, 2));
          o.position.set(tr.x, 0, tr.z);
          o.scale.set(1.3 * tr.s * k, 1.6 * tr.s * k, 1.3 * tr.s * k);
        }}
      />
      <Instanced
        items={STREET_TREES}
        geometry={GEO.blob}
        t={t}
        castShadow
        colors={(tr) => (tr.s > 0.92 ? "#3a7a38" : "#47883d")}
        pose={(o, tr) => {
          const k = Math.max(0, springAt(t, tr.start + 0.1, 6, 2));
          o.position.set(tr.x, 2.2 * tr.s * Math.min(1, k), tr.z);
          o.rotation.y = tr.x;
          o.scale.set(1.2 * tr.s * k, 1.1 * tr.s * k, 1.2 * tr.s * k);
        }}
      />
      <Car t={t} />
    </group>
  );
};

/** Voiture qui roule sur la voie principale */
const Car: React.FC<{ t: number }> = ({ t }) => {
  const t0 = P.quartier + 1;
  if (t < t0) return null;
  const x = -OUTER_W / 2 - 4 + (t - t0) * 4.2;
  const z = MAIN_Z + RW / 4;
  const wheel = (t - t0) * 4.2 / 0.32;
  return (
    <group position={[x, 0.06, z]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2.2, 0.55, 1.05]} />
        <meshStandardMaterial color="#c8352b" roughness={0.4} flatShading />
      </mesh>
      <mesh position={[-0.15, 0.98, 0]} castShadow>
        <boxGeometry args={[1.2, 0.45, 0.95]} />
        <meshStandardMaterial color="#c8352b" roughness={0.4} flatShading />
      </mesh>
      <mesh position={[-0.15, 0.99, 0]}>
        <boxGeometry args={[1.22, 0.32, 0.97]} />
        <meshStandardMaterial color="#1e2b38" roughness={0.15} metalness={0.4} />
      </mesh>
      {[
        [0.7, 0.5],
        [-0.7, 0.5],
        [0.7, -0.5],
        [-0.7, -0.5],
      ].map(([a, b], i) => (
        <mesh key={i} position={[a, 0.3, b]} rotation={[Math.PI / 2, 0, -wheel]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 10]} />
          <meshStandardMaterial color="#1b1b1b" flatShading />
        </mesh>
      ))}
      <mesh position={[1.11, 0.55, 0.32]}>
        <boxGeometry args={[0.04, 0.12, 0.22]} />
        <meshStandardMaterial color="#fff7d6" emissive="#fff1b0" emissiveIntensity={2} />
      </mesh>
      <mesh position={[1.11, 0.55, -0.32]}>
        <boxGeometry args={[0.04, 0.12, 0.22]} />
        <meshStandardMaterial color="#fff7d6" emissive="#fff1b0" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};
