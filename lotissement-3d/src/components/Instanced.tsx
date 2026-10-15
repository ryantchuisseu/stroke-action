import React, { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * InstancedMesh piloté par le temps Remotion : `pose` remplit l'Object3D
 * de chaque instance à chaque frame (aucune boucle requestAnimationFrame).
 */
export function Instanced<T>({
  items,
  geometry,
  color = "#ffffff",
  colors,
  pose,
  t,
  castShadow = false,
  receiveShadow = true,
  roughness = 0.9,
  emissive,
  emissiveIntensity,
  flatShading = true,
  transparent,
  opacity,
}: {
  items: T[];
  geometry: THREE.BufferGeometry;
  color?: string;
  colors?: (item: T, i: number) => string;
  pose: (o: THREE.Object3D, item: T, i: number, t: number) => void;
  t: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  flatShading?: boolean;
  transparent?: boolean;
  opacity?: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const o = useMemo(() => new THREE.Object3D(), []);
  const n = Math.max(1, items.length);

  useLayoutEffect(() => {
    const im = ref.current;
    if (!im || !colors) return;
    const c = new THREE.Color();
    items.forEach((it, i) => im.setColorAt(i, c.set(colors(it, i))));
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
  }, [items, colors]);

  useLayoutEffect(() => {
    const im = ref.current;
    if (!im) return;
    items.forEach((it, i) => {
      o.position.set(0, 0, 0);
      o.rotation.set(0, 0, 0);
      o.scale.set(1, 1, 1);
      pose(o, it, i, t);
      if (o.scale.x < 1e-4 || o.scale.y < 1e-4 || o.scale.z < 1e-4) o.scale.setScalar(1e-4);
      o.updateMatrix();
      im.setMatrixAt(i, o.matrix);
    });
    im.instanceMatrix.needsUpdate = true;
    im.computeBoundingSphere();
  });

  return (
    <instancedMesh ref={ref} args={[geometry, undefined, n]} castShadow={castShadow} receiveShadow={receiveShadow} frustumCulled={false}>
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        flatShading={flatShading}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        transparent={transparent}
        opacity={opacity}
      />
    </instancedMesh>
  );
}

/** Géométries réutilisables, pivot à la base */
export const GEO = {
  blade: (() => {
    // touffe d'herbes : 6 brins inclinés fusionnés
    const parts: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 6; i++) {
      const g = new THREE.ConeGeometry(0.05, 1 - (i % 3) * 0.18, 3);
      g.translate(0, (1 - (i % 3) * 0.18) / 2, 0);
      g.rotateZ(0.18 + (i % 2) * 0.12);
      g.rotateY((i / 6) * Math.PI * 2);
      g.translate(Math.cos(i * 2.1) * 0.08, 0, Math.sin(i * 2.1) * 0.08);
      parts.push(g.toNonIndexed());
    }
    return mergeGeometries(parts)!;
  })(),
  bush: new THREE.IcosahedronGeometry(1, 0),
  blob: new THREE.IcosahedronGeometry(1, 1),
  trunk: (() => {
    const g = new THREE.CylinderGeometry(0.11, 0.2, 1, 6);
    g.translate(0, 0.5, 0);
    return g;
  })(),
  frond: (() => {
    // feuille effilée pointant vers +x, base à l'origine
    const g = new THREE.ConeGeometry(0.38, 2.8, 4);
    g.rotateZ(-Math.PI / 2);
    g.translate(1.4, 0, 0);
    g.scale(1, 0.18, 1);
    return g;
  })(),
  box: (() => {
    const g = new THREE.BoxGeometry(1, 1, 1);
    g.translate(0, 0.5, 0);
    return g;
  })(),
  boxC: new THREE.BoxGeometry(1, 1, 1),
  roof: (() => {
    // toit à 4 pans (pyramide écrasée), base à y=0, 1×1
    const g = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4, 1);
    g.rotateY(Math.PI / 4);
    g.translate(0, 0.5, 0);
    return g;
  })(),
  cyl: (() => {
    const g = new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
    g.translate(0, 0.5, 0);
    return g;
  })(),
};

export const InstancedGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => <group>{children}</group>;
