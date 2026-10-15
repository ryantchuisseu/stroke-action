import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Defs, Sky, Snow, Vignette } from "../components/Atmosphere";
import { Elf, IsoTeam } from "../components/Characters";
import { Brand, ChapterTag, Counter, Headline, Sub } from "../components/Hud";
import { Diorama, Gift, Pine, Sparkle } from "../components/Objects";
import { At, Box, Camera, IsoPoly, mix, project, rectX, Roof, Stage } from "../lib/iso";
import { easeInOut, lerp, pop, prog, range, rnd } from "../lib/anim";
import { COL, display } from "../lib/theme";

const GO = 34;
const sleighAt = (f: number) => {
  const t = Math.max(0, f - GO);
  const dist = 0.0062 * t * t;
  const lift = Math.max(0, t - 30);
  return { x: 0, y: 5 - dist, z: 0.0075 * lift * lift, t };
};

export const S3Takeoff: React.FC = () => {
  const f = useCurrentFrame();
  const s = sleighAt(f);
  const camF = Math.min(f, 98);
  const cs = sleighAt(camF);
  const cam = {
    x: 0.4,
    y: cs.y - 2.5,
    z: cs.z * 0.8 + 1.5 + prog(f, 98, 50, easeInOut) * 3,
    zoom: lerp(1.15, 0.92, prog(f, 30, 70, easeInOut)),
  };
  const tilt = -Math.min(16, Math.max(0, s.t - 30) * 0.7);

  // feux de piste en chenillard
  const lights: React.ReactNode[] = [];
  for (let k = 0; k < 18; k++) {
    const y = 7 - k * 1.5;
    const on = (((k - f * 0.45) % 6) + 6) % 6 < 1.4;
    for (const x of [-1.85, 1.85]) {
      lights.push(
        <At key={`${k}${x}`} x={x} y={y} z={0.02}>
          {on && <circle r={16} fill="url(#goldGlow)" />}
          <circle r={4} fill={on ? "#fff3c4" : "#6b74a8"} />
        </At>,
      );
    }
  }

  // traînée d'étincelles
  const trail: React.ReactNode[] = [];
  if (s.t > 6) {
    for (let k = 1; k < 46; k++) {
      const p = sleighAt(f - k * 0.7);
      if (p.t <= 4) break;
      const j1 = rnd(k * 3.7 + Math.floor(f / 2)) - 0.5;
      const j2 = rnd(k * 1.3 + Math.floor(f / 3)) - 0.5;
      const [sx, sy] = project(p.x + 0.3 + j1 * 0.9, p.y + 1.8, p.z + 1.2 + j2 * 0.9);
      trail.push(
        <Sparkle
          key={k}
          cx={sx}
          cy={sy}
          r={(17 - k * 0.3) * (0.6 + rnd(k) * 0.6)}
          o={Math.max(0, 1 - k / 46)}
          rot={f * 6 + k * 30}
          color={k % 3 === 0 ? "#ffffff" : "#ffd977"}
        />,
      );
    }
  }

  const count = (n: string, st: number) => {
    const p = pop(f, st, 9, 200);
    const o = range(f, [st, st + 2, st + 8, st + 10], [0, 1, 1, 0]);
    return (
      <div
        key={n}
        style={{
          position: "absolute",
          width: "100%",
          top: 150,
          textAlign: "center",
          fontFamily: display,
          fontWeight: 700,
          fontSize: 180,
          color: n === "GO" ? COL.gold : "#fff",
          opacity: o,
          transform: `scale(${0.5 + p * 0.5})`,
          textShadow: "0 10px 40px rgba(0,0,0,0.35)",
        }}
      >
        {n}
      </div>
    );
  };

  const speed = range(f, [GO, 120], [0, 1040], (t) => t * t);
  const streaks = prog(f, GO + 30, 30);

  return (
    <AbsoluteFill>
      <Sky glow="#34419e" glowY={45} />
      <Stage>
        <Defs />
        <Camera {...cam}>
          <Diorama x={-4} y={-19} w={8} d={31} h={1.3} side="#3d5aa8" />
          <IsoPoly
            p={[
              [-1.6, 7.6, 0.01],
              [1.6, 7.6, 0.01],
              [1.6, -18.5, 0.01],
              [-1.6, -18.5, 0.01],
            ]}
            fill="#2b326e"
          />
          {Array.from({ length: 16 }).map((_, k) => {
            const y = 7 - k * 1.6;
            return (
              <IsoPoly
                key={k}
                p={[
                  [-0.07, y, 0.02],
                  [0.07, y, 0.02],
                  [0.07, y - 0.8, 0.02],
                  [-0.07, y - 0.8, 0.02],
                ]}
                fill="#e8eefc"
                opacity={0.7}
              />
            );
          })}
          {lights}
          {/* tour de contrôle */}
          <Box x={2.6} y={-1} w={0.9} d={0.9} h={3.4} color="#c9d1ee" />
          <Box x={2.4} y={-1.2} z={3.4} w={1.3} d={1.3} h={0.9} color="#5e81ac" top="#e8eefc" />
          <IsoPoly p={rectX(3.71, -1.1, 0.0, 3.55, 4.15)} fill={mix(COL.warm, "#ffffff", 0.2)} opacity={0.9} />
          {/* hangar */}
          <Box x={-2.6} y={8.2} w={5.2} d={3.2} h={2.6} color={COL.red} />
          <Roof x={-2.6} y={8.2} z={2.6} w={5.2} d={3.2} h={1.4} axis="y" color={COL.snow} gable={COL.red} />
          {[
            [2.4, 6.6, 0.7, 0],
            [3.0, 5.6, 0.55, 1],
            [2.3, 6.0, 0.5, 2],
          ].map(([x, y, sz, k]) => (
            <Gift key={k} x={x} y={y} z={k === 2 ? 0.7 : 0} s={sz} color={["#2a9d8f", "#e9c46a", "#5e81ac"][k]} />
          ))}
          <At x={-2.6} y={4.2} s={1}>
            <Elf t={f} work />
          </At>
          {[
            [-3.3, -3, 0.6],
            [-3.2, -8, 0.5],
            [3.3, -6, 0.65],
            [-3.4, 1.5, 0.55],
            [3.2, 3.4, 0.5],
            [3.4, -12, 0.6],
            [-3.3, -14, 0.55],
          ].map(([x, y, sz], i) => (
            <Pine key={i} x={x} y={y} s={sz} />
          ))}
          {/* ombre au sol */}
          <At x={s.x + 0.2} y={s.y - 3.4} z={0.02}>
            <ellipse rx={150 * Math.max(0.3, 1 - s.z / 14)} ry={34 * Math.max(0.3, 1 - s.z / 14)} fill="#0b1033" opacity={0.22 * Math.max(0, 1 - s.z / 10)} />
          </At>
          {trail}
          <IsoTeam x={s.x} y={s.y} z={s.z} t={f * (1 + s.t / 30)} dir="-y" s={1.35} wave={range(f, [6, 14, 26, 32], [0, 1, 1, 0])} tilt={tilt} />
        </Camera>
      </Stage>
      {/* lignes de vitesse */}
      {streaks > 0 && (
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          {Array.from({ length: 34 }).map((_, i) => {
            const len = 120 + rnd(i * 2.1) * 260;
            const ph = ((f * (18 + rnd(i) * 22) + rnd(i * 4.4) * 3000) % 3000) - 600;
            const y0 = rnd(i * 9.3) * 1600;
            const x = ph;
            const y = y0 - x * 0.577;
            return (
              <line
                key={i}
                x1={x}
                y1={y}
                x2={x + len * 0.866}
                y2={y - len * 0.5}
                stroke="#fff"
                strokeWidth={1.5 + rnd(i * 7) * 2}
                strokeLinecap="round"
                opacity={streaks * 0.35}
              />
            );
          })}
        </svg>
      )}
      <Snow count={100} speed={1 + streaks * 1.5} wind={-1.6 * streaks} />
      <Vignette />
      {count("3", 4)}
      {count("2", 14)}
      {count("1", 24)}
      <ChapterTag n="02" label="DÉCOLLAGE · 24 DÉC. 18:00 UTC" />
      <Counter label="VITESSE DE CROISIÈRE" value={speed} suffix=" km/s" start={GO} x={80} y={60} />
      <Headline text="Une flotte. Un pilote. Zéro retard." start={44} end={134} y={850} accent={["Zéro", "retard"]} />
      <Sub text="Propulsion 100 % rennes · autonomie : une nuit complète." start={56} end={134} y={940} />
      <Brand />
    </AbsoluteFill>
  );
};
