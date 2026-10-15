import { Billboard } from "@react-three/drei";
import React, { useMemo } from "react";
import { useVideoConfig } from "remotion";
import { COULEURS, LOTISSEMENT, TEXTES } from "../config";
import { LOTS, SEGMENTS } from "../lib/layout";
import { easeOut, P, prog, springAt, useTime } from "../lib/timeline";
import { makeLabel, useFontReady } from "./CanvasLabel";
import { GEO, Instanced } from "./Instanced";

const DISPO = LOTS[LOTISSEMENT.lotDisponible];

/** Lignes du plan cadastral + étiquettes de lots + lot « DISPONIBLE » */
export const Lots: React.FC = () => {
  const t = useTime();
  const ready = useFontReady();
  const { width, height } = useVideoConfig();
  // en 9:16 la caméra est tournée de 90° : on tourne les étiquettes pour qu'elles restent lisibles
  const rz = height > width ? Math.PI / 2 : 0;

  const segs = useMemo(
    () => SEGMENTS.map(([x0, z0, x1, z1], i) => ({ x0, z0, x1, z1, start: P.bornage + 2.4 + (i / SEGMENTS.length) * 2.6 })),
    [],
  );

  const labels = useMemo(() => {
    if (!ready) return [];
    return LOTS.map((l) =>
      makeLabel(
        [
          { text: `${TEXTES.lot} ${String(l.index + 1).padStart(2, "0")}`, size: 104 },
          { text: TEXTES.surfaceLot, size: 66, weight: 600, color: "#fff3c2" },
        ],
        512,
        320,
      ),
    );
  }, [ready]);

  const dispoTex = useMemo(
    () => (ready ? makeLabel([{ text: TEXTES.disponible, size: 92, color: "#1d1d1d" }], 640, 170, { color: COULEURS.marque, radius: 40 }) : null),
    [ready],
  );

  // lignes visibles du bornage jusqu'à l'arrivée des maisons
  const linesOut = prog(t, P.quartier + 0.2, P.quartier + 1.4);
  const labelsOut = prog(t, P.viabilisation + 3.5, P.quartier + 0.8);
  const pulse = 0.55 + 0.45 * Math.sin((t - P.appel) * 5);
  const dispo = prog(t, P.appel + 0.3, P.appel + 1.2, easeOut);

  return (
    <group>
      {/* tracé lumineux */}
      <Instanced
        items={segs}
        geometry={GEO.boxC}
        t={t}
        color={COULEURS.marque}
        emissive={COULEURS.marque}
        emissiveIntensity={1.6}
        flatShading={false}
        pose={(o, s) => {
          const k = prog(t, s.start, s.start + 0.5, easeOut) * (1 - linesOut);
          const len = Math.hypot(s.x1 - s.x0, s.z1 - s.z0) * k;
          const horiz = s.z0 === s.z1;
          o.position.set(s.x0 + (horiz ? len / 2 : 0), 0.09, s.z0 + (horiz ? 0 : len / 2));
          o.scale.set(horiz ? len : 0.16, 0.06, horiz ? 0.16 : len);
        }}
      />
      {/* étiquettes « Lot 01 — 500 m² » couchées sur le sol */}
      {labels.map((tex, i) => {
        const l = LOTS[i];
        const a = prog(t, P.bornage + 4 + i * 0.07, P.bornage + 4.8 + i * 0.07, easeOut) * (1 - labelsOut);
        if (a <= 0.001) return null;
        return (
          <mesh key={i} position={[l.cx, 0.1, l.cz]} rotation={[-Math.PI / 2, 0, rz]} scale={0.85 + 0.15 * a}>
            <planeGeometry args={[5.4, 3.4]} />
            <meshBasicMaterial map={tex} transparent opacity={a} depthWrite={false} toneMapped={false} />
          </mesh>
        );
      })}
      {/* lot disponible : surbrillance pulsante + étiquette */}
      {dispo > 0 && (
        <group>
          <mesh position={[DISPO.cx, 0.12, DISPO.cz]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[DISPO.w - 0.4, DISPO.d - 0.4]} />
            <meshBasicMaterial color={COULEURS.marque} transparent opacity={dispo * (0.25 + 0.3 * pulse)} toneMapped={false} depthWrite={false} />
          </mesh>
          {[0, 1, 2, 3].map((k) => {
            const horiz = k < 2;
            const w = horiz ? DISPO.w : 0.22;
            const d = horiz ? 0.22 : DISPO.d;
            const x = horiz ? DISPO.cx : DISPO.x0 + (k === 2 ? 0 : DISPO.w);
            const z = horiz ? DISPO.z0 + (k === 0 ? 0 : DISPO.d) : DISPO.cz;
            return (
              <mesh key={k} position={[x, 0.2, z]} scale={[1, 0.3 + 0.7 * dispo, 1]}>
                <boxGeometry args={[w, 0.25, d]} />
                <meshStandardMaterial color={COULEURS.marque} emissive={COULEURS.marque} emissiveIntensity={0.8 + pulse} />
              </mesh>
            );
          })}
          {dispoTex && (
            <Billboard position={[DISPO.cx, 3.2 + Math.sin((t - P.appel) * 2.4) * 0.25, DISPO.cz]}>
              <mesh scale={Math.max(0.001, springAt(t, P.appel + 0.6, 6, 2.4)) * 1.1}>
                <planeGeometry args={[6.4, 1.7]} />
                <meshBasicMaterial map={dispoTex} transparent toneMapped={false} />
              </mesh>
              <mesh position={[0, -1.25, 0]} rotation-z={Math.PI} scale={Math.max(0.001, springAt(t, P.appel + 0.6, 6, 2.4))}>
                <coneGeometry args={[0.35, 0.7, 3]} />
                <meshBasicMaterial color={COULEURS.marque} toneMapped={false} />
              </mesh>
            </Billboard>
          )}
        </group>
      )}
    </group>
  );
};
