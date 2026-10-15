import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Defs, Sky, Snow, Vignette } from "../components/Atmosphere";
import { Team } from "../components/Characters";
import { Gift, Sparkle, scatter } from "../components/Objects";
import { Camera, Stage } from "../lib/iso";
import { easeInOut, expoOut, lerp, pop, prog } from "../lib/anim";
import { COL, display, ui } from "../lib/theme";

export const S7Outro: React.FC = () => {
  const f = useCurrentFrame();
  const fly = prog(f, 0, 80, easeInOut);
  const tx = lerp(-1300, 1300, fly);
  const ty = lerp(120, -260, fly) + Math.sin(fly * Math.PI) * -60;
  const logo = pop(f, 40, 11, 120);
  const t1 = prog(f, 52, 22, expoOut);
  const t2 = prog(f, 70, 22, expoOut);
  const t3 = prog(f, 96, 22, expoOut);
  const end = prog(f, 165, 15);
  const sparks = scatter(20, 21);
  return (
    <AbsoluteFill>
      <Sky glow="#34449f" glowY={38} stars={140} />
      <Stage>
        <Defs />
        {/* lune */}
        <g transform="translate(330 -250)">
          <circle r={420} fill="url(#moonGlow)" />
          <circle r={190} fill="#fbf3dc" />
          <circle cx={-60} cy={-40} r={32} fill="#efe3c2" />
          <circle cx={50} cy={60} r={22} fill="#efe3c2" />
          <circle cx={70} cy={-70} r={14} fill="#efe3c2" />
        </g>
        {/* silhouette du traîneau */}
        <g transform={`translate(${tx} ${ty}) rotate(-12) scale(1.3)`} style={{ filter: "brightness(0.12) saturate(0)" }}>
          <Team t={f * 1.4} />
        </g>
        {f > 4 &&
          sparks.map((s, i) => {
            const lag = (i + 1) * 2.4;
            const ff = prog(f - lag, 0, 80, easeInOut);
            if (f - lag < 0) return null;
            const x = lerp(-1300, 1300, ff) - 60;
            const y = lerp(120, -260, ff) + Math.sin(ff * Math.PI) * -60 + (s.a - 0.5) * 30;
            return <Sparkle key={i} cx={x} cy={y - 30} r={8 + s.b * 8} o={1 - i / 20} rot={f * 5 + i * 40} />;
          })}
        {/* logo iso */}
        <g transform={`translate(0 ${-150 + (1 - logo) * 60}) scale(${logo})`}>
          <Camera x={0.6} y={0.6} z={0.6} zoom={2.4}>
            <Gift x={0} y={0} s={1.2} color={COL.red} />
          </Camera>
        </g>
      </Stage>
      <Snow count={90} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 560 }}>
        <div
          style={{
            fontFamily: display,
            fontWeight: 700,
            fontSize: 130,
            color: "#fff",
            letterSpacing: -2,
            lineHeight: 1,
            opacity: t1,
            transform: `translateY(${(1 - t1) * 40}px)`,
            textShadow: "0 12px 50px rgba(255,201,74,0.3)",
          }}
        >
          SANTA <span style={{ color: COL.gold }}>&amp;</span> Co.
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily: display,
            fontWeight: 500,
            fontSize: 44,
            color: "rgba(255,255,255,0.92)",
            opacity: t2,
            transform: `translateY(${(1 - t2) * 24}px)`,
          }}
        >
          On livre la magie. Partout. <span style={{ color: COL.gold }}>En une nuit.</span>
        </div>
        <div
          style={{
            marginTop: 70,
            fontFamily: ui,
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: 6,
            color: "rgba(255,255,255,0.6)",
            opacity: t3,
          }}
        >
          FILM MOTION DESIGN 3D ISOMÉTRIQUE · RÉALISÉ PAR CLAUDE AVEC REMOTION
        </div>
      </AbsoluteFill>
      <Vignette bottom={0.3} />
      <AbsoluteFill style={{ background: "#03051a", opacity: end }} />
    </AbsoluteFill>
  );
};
