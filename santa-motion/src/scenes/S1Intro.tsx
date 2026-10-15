import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Defs, Sky, Snow, Vignette } from "../components/Atmosphere";
import { Diorama, Gift, Pine, Sparkle, scatter } from "../components/Objects";
import { Camera, IsoPoly, project, Stage } from "../lib/iso";
import { easeInOut, expoOut, lerp, pop, prog, range } from "../lib/anim";
import { COL, display, ui } from "../lib/theme";

export const S1Intro: React.FC = () => {
  const f = useCurrentFrame();

  // caméra : léger travelling avant
  const zoom = lerp(1.55, 1.25, prog(f, 0, 120, easeInOut));
  const camZ = lerp(1.2, 2.2, prog(f, 30, 80, easeInOut));

  // socle qui monte, cadeau qui tombe
  const base = pop(f, 0, 14, 120);
  const drop = pop(f, 10, 9, 160);
  const giftZ = lerp(9, 0, drop);

  // ouverture
  const open = pop(f, 42, 10, 120);
  const lid = open * 2.4;
  const lidO = range(f, [58, 72], [1, 0]);
  const beam = prog(f, 44, 18, expoOut) * (1 - prog(f, 96, 20));

  // titre
  const t1 = pop(f, 50, 12, 110);
  const t2 = prog(f, 64, 20, expoOut);
  const out = prog(f, 104, 16);

  const [bx, by] = project(0, 0, 1.6);
  const sparks = scatter(26, 3);

  return (
    <AbsoluteFill>
      <Sky glow="#3546a8" glowY={62} />
      <Stage>
        <Defs />
        <g transform={`translate(0 ${(1 - base) * 300 + 140})`}>
          <Camera x={0} y={0} z={camZ} zoom={zoom}>
            <Diorama x={-3} y={-3} w={6} h={0.7} d={6} />
            <Pine x={-2.1} y={1.6} s={0.55 * pop(f, 14)} />
            <Pine x={1.8} y={-2.2} s={0.48 * pop(f, 18)} />
            <Pine x={-2.3} y={-1.4} s={0.4 * pop(f, 22)} />
            {/* ombre portée du cadeau */}
            <IsoPoly
              p={[
                [-0.95, -0.95, 0.01],
                [1.15, -0.95, 0.01],
                [1.15, 1.15, 0.01],
                [-0.95, 1.15, 0.01],
              ]}
              fill="#0b1033"
              opacity={0.18 * drop}
            />
            {/* faisceau lumineux */}
            {beam > 0 && (
              <g opacity={beam}>
                <path
                  d={`M ${bx - 50} ${by} L ${bx - 260} ${by - 900} L ${bx + 260} ${by - 900} L ${bx + 50} ${by} Z`}
                  fill="url(#goldGlow)"
                  opacity={0.55}
                />
                <circle cx={bx} cy={by - 10} r={120 * beam} fill="url(#goldGlow)" />
              </g>
            )}
            <Gift x={-0.8} y={-0.8} z={giftZ} s={1.6} color={COL.red} ribbon={COL.gold} lid={lid} lidOpacity={lidO} />
            {/* paillettes qui jaillissent */}
            {sparks.map((s, i) => {
              const st = 46 + s.a * 18;
              const p = prog(f, st, 36, expoOut);
              if (p <= 0 || p >= 1) return null;
              const ang = -Math.PI / 2 + (s.b - 0.5) * 2.2;
              const dist = 120 + s.c * 260;
              return (
                <Sparkle
                  key={i}
                  cx={bx + Math.cos(ang) * dist * p}
                  cy={by - 20 + Math.sin(ang) * dist * p + p * p * 60}
                  r={6 + s.c * 9}
                  o={1 - p}
                  rot={p * 180}
                />
              );
            })}
          </Camera>
        </g>
      </Stage>
      <Snow count={110} />
      {/* titre */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 170, opacity: 1 - out }}>
        <div
          style={{
            fontFamily: display,
            fontWeight: 700,
            fontSize: 150,
            color: "#fff",
            letterSpacing: -2,
            transform: `translateY(${(1 - t1) * 160}px) scale(${0.4 + 0.6 * t1})`,
            opacity: Math.min(1, t1 * 2),
            textShadow: "0 12px 50px rgba(255,201,74,0.35)",
          }}
        >
          SANTA <span style={{ color: COL.gold }}>&amp;</span> Co.
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: ui,
            fontWeight: 600,
            fontSize: 24,
            letterSpacing: 10 + (1 - t2) * 14,
            color: "rgba(255,255,255,0.85)",
            opacity: t2,
          }}
        >
          LOGISTIQUE MAGIQUE · DEPUIS 1823
        </div>
      </AbsoluteFill>
      <Vignette />
    </AbsoluteFill>
  );
};
