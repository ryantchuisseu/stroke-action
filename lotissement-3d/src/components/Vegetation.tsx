import React, { useMemo } from "react";
import * as THREE from "three";
import { clearTime, dozerAt, SITE } from "../lib/layout";
import { useVideoConfig } from "remotion";
import { rnd, useTime } from "../lib/timeline";
import { cameraWorld } from "./CameraRig";
import { GEO, Instanced } from "./Instanced";
import { distToSite, heightAt } from "./Terrain";

type Plant = { x: number; z: number; y: number; s: number; r: number; ph: number; ct: number; dir: number; kind: number };

const inSite = (x: number, z: number) => x > SITE.x0 && x < SITE.x1 && z > SITE.z0 && z < SITE.z1;
/** couloir dégagé devant le chantier (piste d'accès, champ de la caméra) */
export const ACCESS = { z0: SITE.z1, z1: SITE.z1 + 16, x0: SITE.x0 - 25, x1: SITE.x1 + 25 };
const inAccess = (x: number, z: number) => x > ACCESS.x0 && x < ACCESS.x1 && z > ACCESS.z0 && z < ACCESS.z1;

const scatter = (n: number, seed: number, area: (u: number, v: number) => [number, number] | null, scale: [number, number]): Plant[] => {
  const out: Plant[] = [];
  for (let i = 0; out.length < n && i < n * 6; i++) {
    const p = area(rnd(seed + i * 1.37), rnd(seed * 3 + i * 2.71));
    if (!p) continue;
    const [x, z] = p;
    const clr = inSite(x, z) ? clearTime(x, z) : Infinity;
    // direction de renversement = sens du bulldozer à cet instant
    const dir = Number.isFinite(clr) ? dozerAt(clr).dir : 1;
    out.push({
      x,
      z,
      y: heightAt(x, z),
      s: scale[0] + rnd(seed + i * 9.1) * (scale[1] - scale[0]),
      r: rnd(seed + i * 4.4) * Math.PI * 2,
      ph: rnd(seed + i * 7.7) * 10,
      ct: clr,
      dir,
      kind: rnd(seed + i * 5.5),
    });
  }
  return out;
};

const siteArea = (u: number, v: number): [number, number] => [SITE.x0 + u * (SITE.x1 - SITE.x0), SITE.z0 + v * (SITE.z1 - SITE.z0)];
const ring = (dmin: number, dmax: number, maxH = 99) => (u: number, v: number): [number, number] | null => {
  const R = SITE.x1 + dmax;
  const x = (u * 2 - 1) * R;
  const z = (v * 2 - 1) * R;
  const d = distToSite(x, z);
  if (d < dmin || d > dmax || heightAt(x, z) > maxH) return null;
  if (inAccess(x, z)) return null;
  return [x, z];
};

/** facteur d'arrachage : 1 = intact, 0 = rasé */
const cleared = (p: Plant, t: number) => (t < p.ct ? 0 : Math.min(1, (t - p.ct) / 0.28));

const GRASS_COLS = ["#6a9a3c", "#5c8f3a", "#7fa845", "#9aa94e", "#b8b05a", "#4f8a3a"];

export const Vegetation: React.FC = () => {
  const t = useTime();

  const P = useMemo(() => {
    return {
      grass: [...scatter(2600, 11, siteArea, [0.8, 1.6]), ...scatter(1700, 12, ring(0.5, 34), [0.6, 1.3])],
      bush: [...scatter(140, 21, siteArea, [0.7, 1.4]), ...scatter(160, 22, ring(1, 60), [0.8, 1.6])],
      palm: [...scatter(9, 31, siteArea, [0.8, 1.05]), ...scatter(70, 32, ring(2, 70, 20), [0.85, 1.25])],
      mango: [...scatter(16, 41, siteArea, [0.8, 1.1]), ...scatter(120, 42, ring(3, 110), [0.9, 1.5])],
      banana: [...scatter(6, 51, siteArea, [0.8, 1]), ...scatter(60, 52, ring(0.5, 14), [0.8, 1.2])],
    };
  }, []);

  const fronds = useMemo(() => P.palm.flatMap((p, i) => Array.from({ length: 7 }, (_, j) => ({ p, j, i }))), [P]);
  const bLeaves = useMemo(() => P.banana.flatMap((p, i) => Array.from({ length: 6 }, (_, j) => ({ p, j, i }))), [P]);

  const { width, height } = useVideoConfig();
  const cam = cameraWorld(t, height > width);
  const [cx, cy, cz] = cam.pos;
  const vx = cam.target[0] - cx;
  const vy = cam.target[1] - cy;
  const vz = cam.target[2] - cz;
  const vv = vx * vx + vy * vy + vz * vz;
  /** 1 = visible, 0 = masqué car il bouche la vue (entre caméra et sujet) */
  const unblock = (x: number, y: number, z: number, r: number) => {
    const u = Math.max(0, Math.min(1, ((x - cx) * vx + (y - cy) * vy + (z - cz) * vz) / vv));
    if (u > 0.97) return 1;
    const d = Math.hypot(cx + vx * u - x, cy + vy * u - y, cz + vz * u - z);
    return Math.max(0, Math.min(1, (d - r) / r));
  };

  const wind = (p: Plant, amp: number, sp = 1.6) => Math.sin(t * sp + p.ph) * amp + Math.sin(t * sp * 2.3 + p.ph * 1.7) * amp * 0.35;

  /** pose commune : renversement par la lame puis disparition */
  const base = (o: THREE.Object3D, p: Plant, h: number, r = 1.4) => {
    const k = cleared(p, t);
    const v = unblock(p.x, p.y + h * 0.5, p.z, r);
    o.position.set(p.x, p.y, p.z);
    o.rotation.set(0, p.r, -p.dir * k * 1.3);
    o.scale.set(p.s * (1 - k * 0.6) * v, h * (1 - k) * v, p.s * (1 - k * 0.6) * v);
    return k;
  };

  return (
    <group>
      {/* herbes hautes */}
      <Instanced
        items={P.grass}
        geometry={GEO.blade}
        t={t}
        colors={(p) => GRASS_COLS[Math.floor(p.kind * GRASS_COLS.length)]}
        pose={(o, p) => {
          base(o, p, p.s * 1.1);
          o.rotation.x = wind(p, 0.12, 2.2);
          o.rotation.z += wind(p, 0.08, 1.7);
          o.scale.x *= 1.6;
          o.scale.z *= 1.6;
        }}
      />
      {/* buissons */}
      <Instanced
        items={P.bush}
        geometry={GEO.bush}
        t={t}
        castShadow
        colors={(p) => (p.kind > 0.5 ? "#3d7a38" : "#4c8a3c")}
        pose={(o, p) => {
          base(o, p, p.s * 0.75, 2.2);
          o.position.y += 0.35 * p.s * (1 - cleared(p, t));
          o.scale.x *= 1.3;
          o.scale.z *= 1.3;
        }}
      />
      {/* palmiers : stipes */}
      <Instanced
        items={P.palm}
        geometry={GEO.trunk}
        t={t}
        castShadow
        color="#8a6a4a"
        pose={(o, p) => {
          base(o, p, 6.5 * p.s, 3);
          const v = unblock(p.x, p.y + 3, p.z, 3);
          o.rotation.x += 0.08 + wind(p, 0.02, 1);
          o.scale.x = o.scale.z = 1.4 * p.s * (1 - cleared(p, t)) * v;
        }}
      />
      {/* palmiers : palmes */}
      <Instanced
        items={fronds}
        geometry={GEO.frond}
        t={t}
        castShadow
        colors={({ p }) => (p.kind > 0.5 ? "#3f8a3a" : "#4f9a3c")}
        pose={(o, { p, j }) => {
          const k = cleared(p, t);
          const H = 6.5 * p.s * (1 - k);
          const tilt = 0.08 + wind(p, 0.02, 1);
          o.position.set(p.x, p.y + H * Math.cos(tilt), p.z + H * Math.sin(tilt));
          o.rotation.set(0, p.r + (j / 7) * Math.PI * 2, -0.5 - (j % 2) * 0.3 + wind(p, 0.08, 2.4 + j * 0.1), "YXZ");
          o.scale.setScalar(p.s * (1 - k) * unblock(p.x, p.y + 3, p.z, 3));
        }}
      />
      {/* manguiers : troncs */}
      <Instanced
        items={P.mango}
        geometry={GEO.trunk}
        t={t}
        castShadow
        color="#6b4a32"
        pose={(o, p) => {
          base(o, p, 2.4 * p.s, 3);
          o.scale.x = o.scale.z = 2.2 * p.s * (1 - cleared(p, t)) * unblock(p.x, p.y + 2, p.z, 3);
        }}
      />
      {/* manguiers : houppiers */}
      <Instanced
        items={P.mango}
        geometry={GEO.blob}
        t={t}
        castShadow
        colors={(p) => (p.kind > 0.6 ? "#2f6b3a" : p.kind > 0.3 ? "#3a7a38" : "#47863d")}
        pose={(o, p) => {
          const k = cleared(p, t);
          o.position.set(p.x - p.dir * k * 2, p.y + (2.4 + 1.2) * p.s * (1 - k * 0.8), p.z);
          o.rotation.set(wind(p, 0.03, 1.2), p.r, wind(p, 0.04, 1.4));
          const sc = p.s * (1 - k) * unblock(p.x, p.y + 3.5 * p.s, p.z, 3.2);
          o.scale.set(2.2 * sc, 1.7 * sc, 2.2 * sc);
        }}
      />
      {/* bananiers : pseudo-troncs */}
      <Instanced
        items={P.banana}
        geometry={GEO.trunk}
        t={t}
        castShadow
        color="#6f8a3a"
        pose={(o, p) => {
          base(o, p, 2 * p.s, 2.5);
          o.scale.x = o.scale.z = 1.3 * p.s * (1 - cleared(p, t)) * unblock(p.x, p.y + 2, p.z, 2.5);
        }}
      />
      <Instanced
        items={bLeaves}
        geometry={GEO.frond}
        t={t}
        castShadow
        color="#62a83c"
        pose={(o, { p, j }) => {
          const k = cleared(p, t);
          o.position.set(p.x, p.y + 2 * p.s * (1 - k), p.z);
          o.rotation.set(0, p.r + (j / 6) * Math.PI * 2, 0.5 - (j % 2) * 0.35 + wind(p, 0.1, 2), "YXZ");
          const v = unblock(p.x, p.y + 2, p.z, 2.5);
          o.scale.set(p.s * 0.8 * (1 - k) * v, p.s * 2.2 * (1 - k) * v, p.s * 2.4 * (1 - k) * v);
        }}
      />
    </group>
  );
};
