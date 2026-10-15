import React, { useMemo } from "react";
import * as THREE from "three";
import { COULEURS, LOTISSEMENT } from "../config";
import { CROSS_X, MAIN_Z, OUTER_W, ROADS, SITE } from "../lib/layout";
import { easeInOut, easeOut, P, prog, springAt, useTime } from "../lib/timeline";
import { GEO, Instanced } from "./Instanced";

const RW = LOTISSEMENT.largeurRoute;
const T0 = P.viabilisation;

/** Poteaux électriques le long de la voie principale (côté nord) */
const POLES = Array.from({ length: 8 }, (_, i) => {
  const x = -OUTER_W / 2 + 3 + i * ((OUTER_W - 6) / 7);
  return { x, z: MAIN_Z - RW / 2 - 0.5, start: T0 + 1.6 + i * 0.16 };
});
const POLE_H = 4.6;

/** Lampadaires : côté sud de la voie principale + voie transversale */
const LAMPS = [
  ...Array.from({ length: 7 }, (_, i) => ({ x: -OUTER_W / 2 + 6 + i * ((OUTER_W - 12) / 6), z: MAIN_Z + RW / 2 + 0.45, rot: Math.PI })),
  ...[-14, -7, 7, 14].map((dz) => ({ x: CROSS_X + RW / 2 + 0.45, z: MAIN_Z + dz, rot: Math.PI / 2 })),
].map((l, i) => ({ ...l, start: T0 + 1.9 + i * 0.1, on: T0 + 3.2 + i * 0.2 }));

const CABLE_Y = [POLE_H - 0.1, POLE_H - 0.1, POLE_H - 0.45];
const CABLE_DZ = [-0.55, 0.55, 0];

export const Routes: React.FC = () => {
  const t = useTime();

  // câbles : tubes en chaînette, révélés par drawRange (« ils se tendent »)
  const cables = useMemo(() => {
    const out: { geo: THREE.TubeGeometry; start: number }[] = [];
    for (let i = 0; i < POLES.length - 1; i++)
      for (let w = 0; w < 3; w++) {
        const a = POLES[i];
        const b = POLES[i + 1];
        const pts = Array.from({ length: 9 }, (_, k) => {
          const u = k / 8;
          return new THREE.Vector3(a.x + (b.x - a.x) * u, CABLE_Y[w] - Math.sin(u * Math.PI) * 0.45, a.z + CABLE_DZ[w]);
        });
        out.push({ geo: new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.035, 4), start: T0 + 2.6 + i * 0.15 });
      }
    return out;
  }, []);

  const dashes = useMemo(() => {
    const main = ROADS[0];
    return Array.from({ length: Math.floor(main.w / 2.4) }, (_, i) => ({ x: main.x0 + 1 + i * 2.4 }));
  }, []);

  return (
    <group>
      {/* voirie : rubans qui se déroulent */}
      {ROADS.map((r, i) => {
        const k = prog(t, T0 + 0.2 + i * 0.22, T0 + 1.4 + i * 0.22, easeInOut);
        if (k <= 0.001) return null;
        const w = r.axis === "x" ? r.w * k : r.w;
        const d = r.axis === "z" ? r.d * k : r.d;
        return (
          <group key={i}>
            <mesh position={[r.x0 + w / 2, 0.06 + i * 0.002, r.z0 + d / 2]} rotation-x={-Math.PI / 2} receiveShadow>
              <planeGeometry args={[w, d]} />
              <meshStandardMaterial color={COULEURS.bitume} roughness={0.85} />
            </mesh>
            {/* bordures */}
            {r.axis === "x"
              ? [r.z0, r.z0 + r.d].map((z) => (
                  <mesh key={z} position={[r.x0 + w / 2, 0.08, z]}>
                    <boxGeometry args={[w, 0.08, 0.16]} />
                    <meshStandardMaterial color="#d9d4c7" />
                  </mesh>
                ))
              : [r.x0, r.x0 + r.w].map((x) => (
                  <mesh key={x} position={[x, 0.08, r.z0 + d / 2]}>
                    <boxGeometry args={[0.16, 0.08, d]} />
                    <meshStandardMaterial color="#d9d4c7" />
                  </mesh>
                ))}
          </group>
        );
      })}
      {/* marquage central de la voie principale */}
      <Instanced
        items={dashes}
        geometry={GEO.boxC}
        t={t}
        color="#f5f1e6"
        roughness={0.6}
        pose={(o, d) => {
          const main = ROADS[0];
          const k = prog(t, T0 + 0.2, T0 + 1.4, easeInOut);
          const vis = d.x < main.x0 + main.w * k ? 1 : 0;
          o.position.set(d.x, 0.075, MAIN_Z);
          o.scale.set(1.2 * vis, 0.02, 0.14 * vis);
        }}
      />
      {/* poteaux électriques */}
      <Instanced
        items={POLES}
        geometry={GEO.trunk}
        t={t}
        castShadow
        color="#7a5a3e"
        pose={(o, p) => {
          const s = Math.max(0, springAt(t, p.start, 6, 2));
          o.position.set(p.x, 0, p.z);
          o.scale.set(0.9, POLE_H * s, 0.9);
        }}
      />
      <Instanced
        items={POLES}
        geometry={GEO.boxC}
        t={t}
        castShadow
        color="#5d4632"
        pose={(o, p) => {
          const s = Math.max(0, springAt(t, p.start + 0.15, 6, 2));
          o.position.set(p.x, POLE_H * Math.min(1, s) - 0.1, p.z);
          o.scale.set(0.16 * s, 0.14 * s, 1.5 * s);
        }}
      />
      {cables.map((c, i) => {
        const k = prog(t, c.start, c.start + 0.7, easeOut);
        if (k <= 0) return null;
        const idx = c.geo.index!.count;
        c.geo.setDrawRange(0, Math.floor((idx * k) / 6) * 6);
        return (
          <mesh key={i} geometry={c.geo}>
            <meshStandardMaterial color="#1f1f1f" roughness={0.6} />
          </mesh>
        );
      })}
      {/* lampadaires */}
      <Instanced
        items={LAMPS}
        geometry={GEO.cyl}
        t={t}
        castShadow
        color="#5f646b"
        roughness={0.5}
        pose={(o, l) => {
          const s = Math.max(0, springAt(t, l.start, 6, 2));
          o.position.set(l.x, 0, l.z);
          o.scale.set(0.14, 3.6 * s, 0.14);
        }}
      />
      <Instanced
        items={LAMPS}
        geometry={GEO.boxC}
        t={t}
        color="#fff3c4"
        emissive="#ffd36b"
        emissiveIntensity={2.2}
        pose={(o, l) => {
          const s = Math.max(0, springAt(t, l.start + 0.1, 6, 2));
          const on = t > l.on ? 1 : 0.25;
          const dx = Math.sin(l.rot) * 0.6;
          const dz = Math.cos(l.rot) * 0.6;
          o.position.set(l.x + dx, 3.55 * Math.min(1, s), l.z + dz);
          o.rotation.y = l.rot;
          o.scale.set(0.38 * s, 0.14 * s * (0.6 + on * 0.4), 1.2 * s);
        }}
      />
      {/* halos des lampadaires allumés */}
      {LAMPS.map((l, i) => {
        const on = prog(t, l.on, l.on + 0.25);
        if (on <= 0) return null;
        return (
          <mesh key={i} position={[l.x + Math.sin(l.rot) * 0.6, 3.35, l.z + Math.cos(l.rot) * 0.6]}>
            <sphereGeometry args={[0.55 + on * 0.25, 10, 8]} />
            <meshBasicMaterial color="#ffd36b" transparent opacity={0.35 * on} depthWrite={false} toneMapped={false} />
          </mesh>
        );
      })}
      {/* château d'eau à l'entrée */}
      <WaterTower t={t} />
    </group>
  );
};

const WaterTower: React.FC<{ t: number }> = ({ t }) => {
  const s = Math.max(0, springAt(t, T0 + 2.2, 5, 1.6));
  if (s <= 0.001) return null;
  const x = SITE.x1 + 5;
  const z = SITE.z1 + 2.5;
  return (
    <group position={[x, 0, z]} scale={[1, s, 1]}>
      {[
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([a, b], i) => (
        <mesh key={i} position={[a * 1.1, 3.5, b * 1.1]} castShadow>
          <boxGeometry args={[0.25, 7, 0.25]} />
          <meshStandardMaterial color="#cfcac0" />
        </mesh>
      ))}
      <mesh position={[0, 8.2, 0]} castShadow>
        <cylinderGeometry args={[2.2, 1.6, 2.6, 10]} />
        <meshStandardMaterial color="#3d8fd1" flatShading roughness={0.5} />
      </mesh>
      <mesh position={[0, 9.8, 0]} castShadow>
        <coneGeometry args={[2.3, 0.9, 10]} />
        <meshStandardMaterial color="#e9eef2" flatShading />
      </mesh>
      <mesh position={[0, 8.2, 0]}>
        <cylinderGeometry args={[2.23, 2.23, 0.35, 10]} />
        <meshStandardMaterial color={COULEURS.marque} flatShading />
      </mesh>
    </group>
  );
};
