import React, { useMemo } from "react";
import * as THREE from "three";
import { COULEURS } from "../config";
import { BANDS, BAND_W, bandExtent, SITE } from "../lib/layout";
import { rnd, useTime } from "../lib/timeline";

/** Distance (≥0) d'un point au rectangle du chantier */
export const distToSite = (x: number, z: number) => {
  const dx = Math.max(SITE.x0 - x, 0, x - SITE.x1);
  const dz = Math.max(SITE.z0 - z, 0, z - SITE.z1);
  return Math.hypot(dx, dz);
};

const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Relief des collines : nul sur le chantier, collines douces autour */
export const heightAt = (x: number, z: number) => {
  const d = Math.max(0, distToSite(x, z) - (z > SITE.z1 && Math.abs(x) < SITE.x1 + 20 ? 14 : 0));
  const k = smooth(4, 45, d);
  const n =
    Math.sin(x * 0.045 + 1.3) * Math.cos(z * 0.05 - 0.4) * 9 +
    Math.sin(x * 0.11 + z * 0.07) * 3.5 +
    Math.cos(z * 0.13 - x * 0.05) * 2.5 +
    Math.max(0, Math.sin(x * 0.02 - 0.8) * Math.sin(z * 0.025 + 0.6)) * 22;
  return k * (n + 6 + d * 0.12);
};

export const Terrain: React.FC = () => {
  const t = useTime();

  const hills = useMemo(() => {
    const g = new THREE.PlaneGeometry(520, 520, 110, 110).toNonIndexed();
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, heightAt(x, z) - 0.02);
    }
    // une couleur par facette (low-poly)
    const cols = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    const g1 = new THREE.Color(COULEURS.vert);
    const g2 = new THREE.Color(COULEURS.vertClair);
    const lat = new THREE.Color(COULEURS.laterite);
    for (let f = 0; f < pos.count; f += 3) {
      const x = pos.getX(f);
      const z = pos.getZ(f);
      const y = (pos.getY(f) + pos.getY(f + 1) + pos.getY(f + 2)) / 3;
      const r = rnd(x * 0.37 + z * 1.91);
      c.copy(g1).lerp(g2, Math.min(1, 0.25 + y / 30 + r * 0.25));
      // quelques pistes / champs de latérite au loin
      if (distToSite(x, z) > 30 && Math.abs(Math.sin(x * 0.03) * 60 - z) < 2.2) c.copy(lat);
      for (let k = 0; k < 3; k++) c.toArray(cols, (f + k) * 3);
    }
    g.setAttribute("color", new THREE.BufferAttribute(cols, 3));
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group>
      <mesh geometry={hills} receiveShadow>
        <meshStandardMaterial vertexColors flatShading roughness={0.95} metalness={0} />
      </mesh>
      {/* sol de brousse du chantier */}
      <mesh rotation-x={-Math.PI / 2} position={[(SITE.x0 + SITE.x1) / 2, 0.005, (SITE.z0 + SITE.z1) / 2]} receiveShadow>
        <planeGeometry args={[SITE.x1 - SITE.x0, SITE.z1 - SITE.z0]} />
        <meshStandardMaterial color="#5a8a3e" roughness={1} />
      </mesh>
      {/* piste d'accès en latérite devant le chantier */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, SITE.z1 + 6]} receiveShadow>
        <planeGeometry args={[(SITE.x1 - SITE.x0) * 3, 4.2]} />
        <meshStandardMaterial color="#b5603c" roughness={1} />
      </mesh>
      {/* bandes de latérite mises à nu par le bulldozer */}
      {Array.from({ length: BANDS }).map((_, b) => {
        const e = bandExtent(b, t);
        if (!e || e[1] - e[0] < 0.01) return null;
        const z = SITE.z0 + (b + 0.5) * BAND_W;
        return (
          <mesh key={b} rotation-x={-Math.PI / 2} position={[(e[0] + e[1]) / 2, 0.03, z]} receiveShadow>
            <planeGeometry args={[e[1] - e[0], BAND_W + 0.02]} />
            <meshStandardMaterial color={COULEURS.laterite} roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
};
