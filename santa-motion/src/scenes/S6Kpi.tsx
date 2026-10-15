import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Defs, Sky, Snow, Vignette } from "../components/Atmosphere";
import { Brand, ChapterTag, fmt, Headline, Sub } from "../components/Hud";
import { Diorama } from "../components/Objects";
import { At, Box, Camera, Stage } from "../lib/iso";
import { easeInOut, expoOut, lerp, pop, prog } from "../lib/anim";
import { COL, display, ui } from "../lib/theme";

const KPIS = [
  { v: 2.4, dec: 1, suf: " Md", label: "CADEAUX LIVRÉS", h: 7.5, c: COL.red },
  { v: 195, dec: 0, suf: "", label: "PAYS DESSERVIS", h: 5.2, c: COL.green },
  { v: 31, dec: 0, suf: " h", label: "DE NUIT (FUSEAUX)", h: 6.2, c: "#5e81ac" },
  { v: 100, dec: 0, suf: " %", label: "À L'HEURE", h: 8.6, c: COL.goldDeep },
];

export const S6Kpi: React.FC = () => {
  const f = useCurrentFrame();
  const cam = {
    x: 6.1,
    y: -4.1,
    z: lerp(2.2, 2.8, prog(f, 0, 210, easeInOut)),
    zoom: lerp(1.12, 1.02, prog(f, 0, 210, easeInOut)),
  };
  return (
    <AbsoluteFill>
      <Sky glow="#2e3c99" glowY={55} />
      <Stage>
        <Defs />
        <Camera {...cam}>
          {KPIS.map((k, i) => {
            const st = 14 + i * 12;
            const base = pop(f, st - 10, 13, 120);
            const g = pop(f, st, 13, 90);
            const h = Math.max(0.01, k.h * g);
            const x = 3.4 * i;
            const y = -3.4 * i;
            const n = prog(f, st, 40, expoOut) * k.v;
            const lab = prog(f, st + 10, 20, expoOut);
            return (
              <g key={i} transform={`translate(0 ${(1 - base) * 400})`} opacity={Math.min(1, base * 2)}>
                <Diorama x={x - 0.6} y={y - 0.6} w={3.2} d={3.2} h={0.5} />
                <Box x={x} y={y} w={2} d={2} h={h} color={k.c} />
                <Box x={x} y={y} z={h} w={2} d={2} h={0.08} color="#ffffff" opacity={0.5} />
                <At x={x + 1} y={y + 1} z={h + 0.3}>
                  <text textAnchor="middle" y={-14} fontFamily={display} fontWeight={700} fontSize={60} fill="#fff" opacity={Math.min(1, g * 1.5)}>
                    {fmt(n, k.dec)}
                    <tspan fill={COL.gold}>{k.suf}</tspan>
                  </text>
                </At>
                <At x={x + 2.6} y={y + 2.6} z={-0.5} opacity={lab}>
                  <text textAnchor="middle" y={44} fontFamily={ui} fontWeight={700} fontSize={17} letterSpacing={3} fill="rgba(255,255,255,0.8)">
                    {k.label}
                  </text>
                </At>
              </g>
            );
          })}
        </Camera>
      </Stage>
      <Snow count={70} />
      <Vignette bottom={0.6} />
      <ChapterTag n="05" label="PERFORMANCE · BILAN DE LA NUIT" />
      <Headline text="Les chiffres d'une seule nuit." start={20} y={850} accent={["seule", "nuit"]} />
      <Sub text="0 g de CO₂ · propulsion 100 % rennes · 0 colis perdu." start={60} y={940} />
      <Brand />
    </AbsoluteFill>
  );
};
