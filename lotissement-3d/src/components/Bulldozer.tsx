import React, { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { COULEURS } from "../config";
import { BLADE, dozerAt, SITE } from "../lib/layout";
import { rnd, useTime } from "../lib/timeline";

const YEL = COULEURS.marque;
const DARK = "#262626";
const STEEL = "#6c6c6c";

/* ---------- chenille : patins qui défilent sur une boucle en « stade » ---------- */
const TRACK_L = 3.4; // entraxe des barbotins
const TRACK_R = 0.42;
const PERIM = 2 * TRACK_L + 2 * Math.PI * TRACK_R;
const N_PADS = 30;

const padPose = (s: number): [number, number, number] => {
  // s ∈ [0, PERIM) → (x, y, angle)
  const half = TRACK_L / 2;
  if (s < TRACK_L) return [-half + s, -TRACK_R, 0]; // brin inférieur
  s -= TRACK_L;
  if (s < Math.PI * TRACK_R) {
    const a = -Math.PI / 2 + s / TRACK_R;
    return [half + Math.cos(a) * TRACK_R, Math.sin(a) * TRACK_R, a + Math.PI / 2];
  }
  s -= Math.PI * TRACK_R;
  if (s < TRACK_L) return [half - s, TRACK_R, Math.PI];
  s -= TRACK_L;
  const a = Math.PI / 2 + s / TRACK_R;
  return [-half + Math.cos(a) * TRACK_R, Math.sin(a) * TRACK_R, a + Math.PI / 2];
};

const Track: React.FC<{ z: number; dist: number }> = ({ z, dist }) => {
  const ref = useRef<THREE.InstancedMesh>(null);
  const m = useMemo(() => new THREE.Object3D(), []);
  useLayoutEffect(() => {
    const im = ref.current;
    if (!im) return;
    for (let i = 0; i < N_PADS; i++) {
      const s = (((i * PERIM) / N_PADS - dist) % PERIM + PERIM) % PERIM;
      const [x, y, a] = padPose(s);
      m.position.set(x, y + 0.5, z);
      m.rotation.set(0, 0, a);
      m.updateMatrix();
      im.setMatrixAt(i, m.matrix);
    }
    im.instanceMatrix.needsUpdate = true;
  });
  return (
    <group>
      <instancedMesh ref={ref} args={[undefined, undefined, N_PADS]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.66]} />
        <meshStandardMaterial color={DARK} roughness={0.9} flatShading />
      </instancedMesh>
      {/* flanc de chenille + barbotins */}
      <mesh position={[0, 0.5, z]} castShadow>
        <boxGeometry args={[TRACK_L, TRACK_R * 1.7, 0.5]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.9} flatShading />
      </mesh>
      {[-TRACK_L / 2, TRACK_L / 2].map((x) => (
        <mesh key={x} position={[x, 0.5, z]} rotation={[Math.PI / 2, 0, dist / TRACK_R]} castShadow>
          <cylinderGeometry args={[TRACK_R * 0.85, TRACK_R * 0.85, 0.56, 8]} />
          <meshStandardMaterial color={STEEL} roughness={0.6} flatShading />
        </mesh>
      ))}
    </group>
  );
};

/* ---------- poussière rouge ---------- */
const N_DUST = 90;
const LIFE = 1.6;
const Dust: React.FC<{ t: number }> = ({ t }) => {
  const ref = useRef<THREE.InstancedMesh>(null);
  const m = useMemo(() => new THREE.Object3D(), []);
  useLayoutEffect(() => {
    const im = ref.current;
    if (!im) return;
    for (let k = 0; k < N_DUST; k++) {
      const age = (t + (k * LIFE) / N_DUST) % LIFE;
      const tb = t - age;
      const cycle = Math.floor((t + (k * LIFE) / N_DUST) / LIFE);
      const s = dozerAt(tb);
      const inside = s.x > SITE.x0 - 1 && s.x < SITE.x1 + 1 && s.moving && s.visible > 0.5;
      const front = k % 4 === 0; // une partie vient de la lame
      const j1 = rnd(k * 3.1 + cycle * 7.7) - 0.5;
      const j2 = rnd(k * 5.3 + cycle * 1.9) - 0.5;
      const bx = s.x + s.dir * (front ? BLADE + 0.4 : -1.9) + j1 * 1.2;
      const bz = s.z + j2 * 2.6;
      const life = age / LIFE;
      const sc = inside ? (0.25 + life * 1.1) * Math.sin(Math.min(1, life * 1.15) * Math.PI) : 0;
      m.position.set(bx - s.dir * life * 1.4 + j1 * life * 2, 0.3 + life * (front ? 1.2 : 2.4), bz + j2 * life * 2);
      m.rotation.set(k, k * 2, 0);
      m.scale.setScalar(Math.max(0.0001, sc));
      m.updateMatrix();
      im.setMatrixAt(k, m.matrix);
    }
    im.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, N_DUST]}>
      <icosahedronGeometry args={[0.45, 0]} />
      <meshStandardMaterial color="#d4825d" transparent opacity={0.55} roughness={1} flatShading depthWrite={false} />
    </instancedMesh>
  );
};

/* ---------- bulldozer ---------- */
export const Bulldozer: React.FC = () => {
  const t = useTime();
  const s = dozerAt(t);
  const inSite = s.x + s.dir * BLADE > SITE.x0 - 0.5 && s.x + s.dir * BLADE < SITE.x1 + 0.5;
  // lame : relevée hors du chantier, abaissée dedans
  const blade = inSite ? 0 : 0.55;
  const dist = s.x * s.dir; // avance de la chenille
  const blink = Math.sin(t * 14) > 0 ? 1 : 0.15;
  const vib = s.moving ? Math.sin(t * 60) * 0.015 : 0;
  // tas de terre poussé par la lame
  const pile = inSite && s.moving ? 1 : 0;

  if (s.visible <= 0.001) return <Dust t={t} />;
  return (
    <group>
      <group position={[s.x, vib, s.z]} rotation-y={s.dir === 1 ? 0 : Math.PI} scale={s.visible}>
        <Track z={0.95} dist={dist} />
        <Track z={-0.95} dist={dist} />
        {/* châssis + capot */}
        <mesh position={[0.1, 1.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.75, 1.6]} />
          <meshStandardMaterial color={YEL} roughness={0.6} flatShading />
        </mesh>
        <mesh position={[0.85, 1.75, 0]} castShadow>
          <boxGeometry args={[1.5, 0.35, 1.3]} />
          <meshStandardMaterial color={YEL} roughness={0.6} flatShading />
        </mesh>
        <mesh position={[1.2, 2.2, 0.35]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.75, 6]} />
          <meshStandardMaterial color={DARK} />
        </mesh>
        {/* cabine */}
        <mesh position={[-0.55, 2.15, 0]} castShadow>
          <boxGeometry args={[1.25, 1.05, 1.35]} />
          <meshStandardMaterial color={YEL} roughness={0.6} flatShading />
        </mesh>
        <mesh position={[-0.55, 2.25, 0]}>
          <boxGeometry args={[1.28, 0.62, 1.38]} />
          <meshStandardMaterial color="#1d2a33" roughness={0.2} metalness={0.3} />
        </mesh>
        <mesh position={[-0.55, 2.72, 0]} castShadow>
          <boxGeometry args={[1.45, 0.1, 1.5]} />
          <meshStandardMaterial color={YEL} roughness={0.6} flatShading />
        </mesh>
        {/* gyrophare */}
        <mesh position={[-0.55, 2.88, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.22, 10]} />
          <meshStandardMaterial color="#ff7a00" emissive="#ff6a00" emissiveIntensity={blink * 3} />
        </mesh>
        <pointLight position={[-0.55, 3.1, 0]} color="#ff7a00" intensity={blink * 6} distance={6} />
        {/* bras + lame */}
        <group position={[0, -blade, 0]}>
          {[0.75, -0.75].map((z) => (
            <mesh key={z} position={[1.75, 0.95, z]} rotation-z={-0.25} castShadow>
              <boxGeometry args={[1.5, 0.18, 0.18]} />
              <meshStandardMaterial color={STEEL} flatShading />
            </mesh>
          ))}
          <mesh position={[BLADE, 0.6, 0]} rotation-z={0.18} castShadow receiveShadow>
            <boxGeometry args={[0.22, 1.05, 2.9]} />
            <meshStandardMaterial color={YEL} roughness={0.6} flatShading />
          </mesh>
          <mesh position={[BLADE + 0.14, 0.12, 0]} castShadow>
            <boxGeometry args={[0.14, 0.14, 2.92]} />
            <meshStandardMaterial color={STEEL} flatShading />
          </mesh>
        </group>
        {/* bourrelet de latérite devant la lame */}
        {pile > 0 && (
          <mesh position={[BLADE + 0.55, 0.2, 0]} scale={[0.7, 0.42, 1.5]} castShadow>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color={COULEURS.laterite} roughness={1} flatShading />
          </mesh>
        )}
      </group>
      <Dust t={t} />
    </group>
  );
};
