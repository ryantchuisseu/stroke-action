import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { rnd } from "../lib/anim";
import { COL } from "../lib/theme";

/** Ciel de nuit : dégradé + halo + étoiles scintillantes */
export const Sky: React.FC<{ glow?: string; glowY?: number; stars?: number }> = ({
  glow = "#3b4bb0",
  glowY = 70,
  stars = 90,
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% ${glowY}%, ${glow} 0%, ${COL.night1} 55%, ${COL.night0} 100%)`,
        }}
      />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {Array.from({ length: stars }).map((_, i) => {
          const x = rnd(i * 3.1) * 1920;
          const y = rnd(i * 7.7) * 1080 * 0.85;
          const r = 0.6 + rnd(i * 1.3) * 1.6;
          const tw = 0.35 + 0.65 * Math.abs(Math.sin(f * 0.05 + i * 1.7));
          return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={tw * 0.75} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

/** Flocons de neige en parallaxe (3 profondeurs) */
export const Snow: React.FC<{ count?: number; speed?: number; opacity?: number; wind?: number }> = ({
  count = 140,
  speed = 1,
  opacity = 1,
  wind = 0.6,
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      <svg width={1920} height={1080}>
        {Array.from({ length: count }).map((_, i) => {
          const depth = rnd(i * 5.3); // 0 loin → 1 près
          const r = 1.2 + depth * 3.6;
          const v = (0.8 + depth * 2.6) * speed;
          const y0 = rnd(i * 2.9) * 1160;
          const y = ((y0 + f * v) % 1160) - 40;
          const sway = Math.sin(f * 0.03 + i) * (10 + depth * 18);
          const x = (((rnd(i * 9.1) * 2100 + f * wind * v + sway) % 2100) + 2100) % 2100 - 90;
          return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.35 + depth * 0.55} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{ strength?: number; bottom?: number }> = ({ strength = 0.55, bottom = 0.5 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,0) 55%, rgba(4,6,25,${strength}) 100%), linear-gradient(to top, rgba(5,8,32,${bottom}) 0%, rgba(5,8,32,0) 32%)`,
    }}
  />
);

/** Défs SVG partagées : lueurs, dégradés */
export const Defs: React.FC = () => (
  <defs>
    <radialGradient id="warmGlow">
      <stop offset="0%" stopColor="#ffd27a" stopOpacity={0.9} />
      <stop offset="45%" stopColor="#ffb347" stopOpacity={0.35} />
      <stop offset="100%" stopColor="#ffb347" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="goldGlow">
      <stop offset="0%" stopColor="#fff3c4" stopOpacity={1} />
      <stop offset="40%" stopColor="#ffc94a" stopOpacity={0.55} />
      <stop offset="100%" stopColor="#ffc94a" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="redGlow">
      <stop offset="0%" stopColor="#ff6b6b" stopOpacity={1} />
      <stop offset="100%" stopColor="#ff2d2d" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="softShadow">
      <stop offset="0%" stopColor="#0b1033" stopOpacity={0.45} />
      <stop offset="100%" stopColor="#0b1033" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="moonGlow">
      <stop offset="0%" stopColor="#fff8e1" stopOpacity={0.55} />
      <stop offset="60%" stopColor="#c9d4ff" stopOpacity={0.12} />
      <stop offset="100%" stopColor="#c9d4ff" stopOpacity={0} />
    </radialGradient>
  </defs>
);
