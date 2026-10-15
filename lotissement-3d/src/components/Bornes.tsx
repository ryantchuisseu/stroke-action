import React, { useMemo } from "react";
import { BORNES } from "../lib/layout";
import { P, springAt, useTime } from "../lib/timeline";
import { GEO, Instanced } from "./Instanced";

/** Bornes blanches et rouges qui surgissent du sol une par une */
export const Bornes: React.FC = () => {
  const t = useTime();
  const items = useMemo(
    () => BORNES.map(([x, z], i) => ({ x, z, start: P.bornage + 0.5 + (i / BORNES.length) * 2.6 })),
    [],
  );
  const k = (it: { start: number }) => Math.max(0, springAt(t, it.start, 6, 2.6));
  return (
    <group>
      <Instanced
        items={items}
        geometry={GEO.cyl}
        t={t}
        castShadow
        color="#f4f1ea"
        roughness={0.5}
        pose={(o, it) => {
          const s = k(it);
          o.position.set(it.x, -0.2 + s * 0.2, it.z);
          o.scale.set(0.55, 1.2 * s, 0.55);
        }}
      />
      <Instanced
        items={items}
        geometry={GEO.cyl}
        t={t}
        color="#d6322b"
        roughness={0.5}
        pose={(o, it) => {
          const s = k(it);
          o.position.set(it.x, -0.2 + s * 0.2 + 1.2 * s, it.z);
          o.scale.set(0.58, 0.35 * s, 0.58);
        }}
      />
    </group>
  );
};
