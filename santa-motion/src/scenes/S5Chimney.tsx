import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Defs, Sky, Snow, Vignette } from "../components/Atmosphere";
import { Santa } from "../components/Characters";
import { Brand, ChapterTag, Counter, Headline, Sub } from "../components/Hud";
import { Diorama, Gift, Pine, Sparkle, scatter } from "../components/Objects";
import {
  At,
  Box,
  boxHullPoints,
  Camera,
  camToScreen,
  hull,
  IsoPlane,
  IsoPoly,
  project,
  rectX,
  rectY,
  Roof,
  Stage,
} from "../lib/iso";
import { easeIn, easeInOut, easeOut, lerp, pop, prog, range } from "../lib/anim";
import { COL } from "../lib/theme";

const FZ = 0.15; // niveau du plancher
const CH = { x: 0.1, y: 3.9, z: FZ + 3.3, w: 1.0, d: 1.6 };
const CH_TOP = 12.6;
const OPEN = { y0: 3.7, y1: 5.7, z0: FZ, z1: FZ + 2.7 };

const KF = [0, 30, 62, 100, 228, 300];
const camAt = (f: number) => {
  const ease = easeInOut;
  return {
    x: range(f, KF, [5, 5, 3.2, 4.6, 4.6, 5.2], ease),
    y: range(f, KF, [5, 5, 4.6, 4.6, 4.6, 5.4], ease),
    z: range(f, [0, 30, 62, 98, 228, 300], [6.4, 6, 9, 2.9, 2.9, 4.4], ease),
    zoom: range(f, KF, [0.6, 0.66, 0.9, 1.32, 1.32, 0.74], ease),
  };
};

export const S5Chimney: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(f);

  const drop = prog(f, 30, 30, easeInOut); // murs avant qui s'abaissent
  const roofUp = prog(f, 28, 26, easeIn);
  const xray = prog(f, 34, 20);
  const extChim = 1 - prog(f, 30, 16);

  // --- Père Noël : trajectoire ---
  const hop = prog(f, 62, 8, easeOut);
  const fall = prog(f, 70, 28, easeIn);
  const stepOut = prog(f, 102, 20, easeInOut);
  const walk = prog(f, 124, 36, easeInOut);
  let sx = 0.6;
  let sy = 4.7;
  let sz = CH_TOP;
  if (f < 70) sz = CH_TOP + Math.sin(hop * Math.PI) * 0.9;
  else sz = lerp(CH_TOP, FZ, fall);
  if (f >= 100) {
    sx = lerp(0.6, 2.2, stepOut);
    sx = lerp(sx, 5.2, walk);
    sy = lerp(4.7, 5.1, walk);
  }
  const walking = (f > 102 && f < 160) || (f > 196 && f < 200);
  const landSquash = f >= 98 && f < 112 ? 1 - Math.sin(prog(f, 98, 14) * Math.PI) * 0.22 : 1;
  const vanish = 1 - prog(f, 226, 8, easeIn);
  const santaS = 0.86 * pop(f, 6, 12) * vanish;
  const inShaft = f >= 70 && sx < 1.7;
  const onRoof = f < 70;

  const streak = prog(f, 236, 14, easeIn);

  // --- intérieur ---
  const lights = prog(f, 194, 26);
  const star = pop(f, 220, 8);
  const warm = prog(f, 196, 40);
  const cookies = f < 142 ? 3 : f < 150 ? 2 : 1;

  // clip : conduit prolongé vers le haut + foyer
  const shaftClip = (() => {
    const v: [number, number][] = [];
    for (const a of [CH.x, CH.x + CH.w])
      for (const b of [CH.y, CH.y + CH.d]) for (const c of [CH.z, CH_TOP + 8]) v.push(project(a, b, c));
    return hull(v)
      .map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`)
      .join(" ");
  })();
  const openClip = boxHullPoints(0.1, OPEN.y0, OPEN.z0, 3, OPEN.y1 - OPEN.y0, OPEN.z1 - OPEN.z0 + 0.1);
  const fireClip = boxHullPoints(0.1, CH.y, FZ, 1.2, CH.d, 3.4);

  const gifts: [number, number, number, string, number][] = [
    [6.2, 3.3, 0.8, "#2a9d8f", 164],
    [7.9, 3.5, 0.7, COL.red, 172],
    [8.6, 2.4, 0.6, "#e9c46a", 180],
    [6.6, 4.4, 0.55, "#5e81ac", 188],
  ];

  type Item = { d: number; node: React.ReactNode };
  const items: Item[] = [];
  items.push({
    d: 7.4 + 2.4,
    node: <Pine key="tree" x={7.4} y={2.4} z={FZ} s={2.3} snowy={false} ornaments lights={lights} star={star} t={f} />,
  });
  gifts.forEach(([x, y, s, c, st], k) =>
    items.push({ d: x + y + s, node: <Gift key={`g${k}`} x={x} y={y} z={FZ} s={s * pop(f, st, 9, 170)} color={c} /> }),
  );
  items.push({
    d: 8.6 + 8.1,
    node: (
      <g key="sofa">
        <Box x={7.6} y={6.3} z={FZ} w={2} d={0.35} h={1.25} color="#23877c" />
        <Box x={7.6} y={6.65} z={FZ} w={2} d={2.95} h={0.8} color="#2a9d8f" />
        <Box x={9.0} y={6.65} z={FZ + 0.8} w={0.6} d={2.95} h={1.05} color="#2a9d8f" />
        <Box x={7.6} y={9.6} z={FZ} w={2} d={0.35} h={1.25} color="#23877c" />
        <Box x={8.0} y={7.1} z={FZ + 0.8} w={0.9} d={0.9} h={0.5} color={COL.red} />
      </g>
    ),
  });
  items.push({
    d: 3.5 + 6.6,
    node: (
      <g key="table">
        <Box x={3.0} y={6.1} z={FZ} w={1.0} d={1.0} h={1.0} color="#8b5a3c" />
        <IsoPlane axis="top" x={3.5} y={6.6} z={FZ + 1.01}>
          <ellipse rx={15} ry={15} fill="#ffffff" />
        </IsoPlane>
        {Array.from({ length: cookies }).map((_, k) => (
          <At key={k} x={3.42 + k * 0.12} y={6.62 - k * 0.1} z={FZ + 1.03}>
            <ellipse rx={6} ry={3.4} fill="#c98a4b" />
            <circle cx={-2} cy={-0.5} r={0.9} fill="#4a2a16" />
            <circle cx={2} cy={0.5} r={0.9} fill="#4a2a16" />
          </At>
        ))}
        <At x={3.2} y={6.3} z={FZ + 1.0}>
          <rect x={-4} y={-15} width={8} height={15} rx={1.5} fill="#ffffff" />
        </At>
      </g>
    ),
  });
  if (!inShaft && !onRoof && santaS > 0.001)
    items.push({
      d: sx + sy + 0.3,
      node: (
        <At key="santa" x={sx} y={sy} z={FZ} s={santaS}>
          <ellipse rx={28} ry={9} fill="url(#softShadow)" />
          <Santa walk={walking ? f * 0.45 : undefined} squash={landSquash} holdSack={f < 192} wave={f > 166 && f < 196 ? (Math.sin(f * 0.4) + 1) / 2 : 0} />
        </At>
      ),
    });
  items.sort((a, b) => a.d - b.d);

  const santaScreen = camToScreen(cam, [sx, sy, FZ + 1]);
  const burst = scatter(14, 9);
  const puff = prog(f, 98, 26, easeOut);
  const [ox, oy] = project(1.4, 4.7, FZ + 0.8);

  return (
    <AbsoluteFill>
      <Sky glow="#2c3a94" glowY={40} />
      <Stage>
        <Defs />
        <defs>
          <clipPath id="shaftClip">
            <polygon points={shaftClip} />
            <polygon points={openClip} />
          </clipPath>
          <clipPath id="streakClip">
            <polygon points={shaftClip} />
            <polygon points={fireClip} />
          </clipPath>
        </defs>
        <Camera {...cam}>
          <Diorama x={-3} y={-3} w={17} d={17} h={0.8} />
          <Pine x={-2} y={7} s={0.9} />
          <Pine x={4} y={-2.2} s={0.8} />
          <Pine x={-2.2} y={-1.8} s={0.7} />

          {/* sol */}
          <Box x={0} y={0} w={10} d={10} h={FZ} color="#b0784b" top="#c08657" />
          {Array.from({ length: 9 }).map((_, k) => (
            <IsoPoly
              key={k}
              p={[
                [0, k + 1, FZ + 0.002],
                [10, k + 1, FZ + 0.002],
                [10, k + 1.03, FZ + 0.002],
                [0, k + 1.03, FZ + 0.002],
              ]}
              fill="#9c673e"
              opacity={0.5}
            />
          ))}
          <IsoPlane axis="top" x={5.2} y={5.4} z={FZ + 0.01}>
            <ellipse rx={118} ry={96} fill="#b5303d" />
            <ellipse rx={100} ry={80} fill="none" stroke={COL.gold} strokeWidth={4} strokeDasharray="10 8" />
          </IsoPlane>

          {/* murs du fond */}
          <Box x={-0.4} y={-0.4} w={0.4} d={10.4} h={6} color="#eadabb" />
          <Box x={0} y={-0.4} w={10} d={0.4} h={6} color="#f3e6cc" />
          <IsoPoly p={rectX(0.005, 0, 10, FZ, 1.6)} fill="#a8794f" />
          <IsoPoly p={rectY(0.005, 0, 10, FZ, 1.6)} fill="#b8875b" />
          <IsoPoly p={rectX(0.006, 0, 10, 1.6, 1.7)} fill="#7a4f31" />
          <IsoPoly p={rectY(0.006, 0, 10, 1.6, 1.7)} fill="#8b5a3c" />
          {/* fenêtre (nuit) */}
          <IsoPoly p={rectY(0.01, 5.6, 8.4, 2.4, 4.8)} fill="#ffffff" />
          <IsoPoly p={rectY(0.02, 5.75, 8.25, 2.55, 4.65)} fill="#1a2766" />
          <IsoPlane axis="x" x={7.6} y={0.03} z={4.15}>
            <circle r={13} fill="#fff3c4" />
            <circle r={24} fill="url(#moonGlow)" />
            {[
              [-50, 8],
              [-30, 30],
              [-62, 40],
              [10, 34],
              [-15, 14],
            ].map(([x, y], k) => (
              <circle key={k} cx={x} cy={y + ((f * 0.6 + k * 9) % 30)} r={1.8} fill="#fff" />
            ))}
          </IsoPlane>
          <IsoPoly p={rectY(0.03, 6.96, 7.04, 2.55, 4.65)} fill="#ffffff" />
          <IsoPoly p={rectY(0.03, 5.75, 8.25, 3.56, 3.64)} fill="#ffffff" />
          <IsoPoly p={rectY(0.04, 5.15, 5.75, 2.1, 5.1)} fill={COL.red} />
          <IsoPoly p={rectY(0.04, 8.25, 8.85, 2.1, 5.1)} fill={COL.red} />
          {/* tableau */}
          <IsoPoly p={rectX(0.01, 6.6, 8.8, 2.8, 4.4)} fill={COL.gold} />
          <IsoPoly p={rectX(0.02, 6.75, 8.65, 2.95, 4.25)} fill="#2a4f7a" />
          <IsoPlane axis="y" x={0.03} y={8.65} z={2.95}>
            <path d="M 0 0 L 22 -26 L 38 -12 L 52 -34 L 76 0 Z" fill="#eef3ff" />
            <circle cx={60} cy={-42} r={5} fill="#fff3c4" />
          </IsoPlane>
          {/* guirlandes murales */}
          <IsoPlane axis="x" x={0} y={0.03} z={5.7}>
            <path d={Array.from({ length: 8 }).map((_, k) => `${k === 0 ? "M 0 0" : ""} Q ${k * 50 + 25} 20 ${k * 50 + 50} 0`).join(" ")} stroke="#1f8a64" strokeWidth={6} fill="none" />
            {Array.from({ length: 8 }).map((_, k) => (
              <circle key={k} cx={k * 50 + 25} cy={10} r={4} fill={lights > k / 8 ? ["#ff4d6d", "#ffd166", "#4cc9f0"][k % 3] : "#6b6f8a"} />
            ))}
          </IsoPlane>
          <IsoPlane axis="y" x={0.03} y={10} z={5.7}>
            <path d={Array.from({ length: 8 }).map((_, k) => `${k === 0 ? "M 0 0" : ""} Q ${k * 50 + 25} 20 ${k * 50 + 50} 0`).join(" ")} stroke="#1f8a64" strokeWidth={6} fill="none" />
            {Array.from({ length: 8 }).map((_, k) => (
              <circle key={k} cx={k * 50 + 25} cy={10} r={4} fill={lights > k / 8 ? ["#ffd166", "#ff4d6d", "#4cc9f0"][k % 3] : "#6b6f8a"} />
            ))}
          </IsoPlane>

          {/* cheminée (foyer) */}
          <Box x={0} y={3} z={FZ} w={1.2} d={3.4} h={3.1} color="#a7adc6" />
          <IsoPoly p={rectX(1.21, OPEN.y0, OPEN.y1, OPEN.z0, OPEN.z1)} fill="#1c1526" />
          <IsoPlane axis="y" x={1.22} y={OPEN.y1} z={FZ}>
            {[12, 30, 48, 62].map((u, k) => (
              <ellipse key={k} cx={u} cy={-3} rx={9} ry={4} fill="#ff7b39" opacity={0.55 + 0.35 * Math.sin(f * 0.3 + k)} />
            ))}
          </IsoPlane>
          <Box x={0} y={2.7} z={FZ + 3.1} w={1.6} d={4} h={0.3} color="#7a4a2e" />
          {[6.1, 4.9, 3.7].map((y, k) => (
            <IsoPlane key={k} axis="y" x={1.61} y={y + 0.3} z={FZ + 3.1}>
              <rect x={-9} y={0} width={18} height={8} rx={3} fill="#fff" />
              <rect x={-7} y={8} width={14} height={24} fill={k === 1 ? COL.green : COL.red} />
              <ellipse cx={4} cy={32} rx={12} ry={7} fill={k === 1 ? COL.green : COL.red} />
            </IsoPlane>
          ))}
          {[3.0, 6.4].map((y, k) => (
            <At key={k} x={0.8} y={y} z={FZ + 3.4}>
              <rect x={-3} y={-16} width={6} height={16} fill="#fff6e0" />
              <ellipse cx={0} cy={-21} rx={3} ry={5} fill="#ffcf5a" opacity={0.8 + 0.2 * Math.sin(f * 0.5 + k)} />
              <circle cx={0} cy={-20} r={12} fill="url(#warmGlow)" opacity={0.6} />
            </At>
          ))}

          {/* conduit en rayons X : parois intérieures */}
          <g opacity={xray}>
            <IsoPoly p={rectX(CH.x + 0.01, CH.y, CH.y + CH.d, CH.z, CH_TOP)} fill="#2a2240" />
            <IsoPoly p={rectY(CH.y + 0.01, CH.x, CH.x + CH.w, CH.z, CH_TOP)} fill="#352b4f" />
          </g>
          {/* Père Noël dans le conduit */}
          {inShaft && (
            <g clipPath="url(#shaftClip)">
              <At x={sx} y={sy} z={sz} s={santaS}>
                <Santa squash={landSquash} holdSack wave={f < 98 ? 1 : 0} />
              </At>
            </g>
          )}
          {streak > 0 && streak < 1 && (
            <g clipPath="url(#streakClip)">
              {(() => {
                const z0 = lerp(FZ, CH_TOP + 2, streak);
                const [a, b] = project(0.6, 4.7, z0);
                return (
                  <g>
                    <rect x={a - 14} y={b} width={28} height={260 * (1 - streak * 0.5)} rx={14} fill={COL.red} opacity={0.5} />
                    <circle cx={a} cy={b} r={18} fill={COL.red} />
                    <circle cx={a} cy={b - 8} r={9} fill="#fff" />
                  </g>
                );
              })()}
            </g>
          )}
          <g opacity={xray}>
            <Box
              x={CH.x}
              y={CH.y}
              z={CH.z}
              w={CH.w}
              d={CH.d}
              h={CH_TOP - CH.z}
              color="#8fb3ff"
              faceOpacity={0.12}
              stroke={COL.gold}
              strokeWidth={2.5}
              dash="10 7"
            />
          </g>
          {/* nuage de suie à l'atterrissage */}
          {puff > 0 && puff < 1 && (
            <g opacity={1 - puff}>
              {[-30, -10, 12, 30, 0].map((dx, k) => (
                <circle key={k} cx={ox + dx * (1 + puff)} cy={oy - 10 - puff * 30 - (k % 2) * 12} r={10 + puff * 26} fill="#8a8aa6" opacity={0.6} />
              ))}
            </g>
          )}

          {items.map((it) => it.node)}

          {/* façade + toit (s'effacent) */}
          <Box x={10} y={0} w={0.4} d={10.4} h={6 * (1 - drop)} color="#5e81ac" />
          <Box x={-0.4} y={10} w={10.4} d={0.4} h={6 * (1 - drop)} color="#5e81ac" />
          {drop < 0.02 && (
            <g>
              {[
                [1.5, 3.5],
                [6.5, 8.5],
              ].map(([a, b], k) => (
                <g key={k}>
                  <IsoPoly p={rectX(10.41, a, b, 2.4, 4.4)} fill="#ffffff" />
                  <IsoPoly p={rectX(10.42, a + 0.15, b - 0.15, 2.55, 4.25)} fill={COL.window} />
                </g>
              ))}
              <IsoPoly p={rectY(10.41, 1.5, 3.5, 2.4, 4.4)} fill="#ffffff" />
              <IsoPoly p={rectY(10.42, 1.65, 3.35, 2.55, 4.25)} fill={COL.window} />
              <IsoPoly p={rectY(10.41, 5.6, 7.4, 0, 3.6)} fill="#2a3a66" />
              <IsoPoly p={rectY(10.42, 7.0, 7.15, 1.7, 1.85)} fill={COL.gold} />
              <IsoPlane axis="x" x={6.5} y={10.43} z={2.9}>
                <circle r={14} fill="none" stroke="#1f8a64" strokeWidth={7} />
                <circle cy={12} r={4} fill={COL.red} />
              </IsoPlane>
            </g>
          )}
          {roofUp < 1 && (
            <g opacity={Math.max(0, 1 - roofUp * 1.5)} transform={`translate(0 ${-roofUp * 320})`}>
              <Roof x={-0.4} y={-0.4} z={6} w={10.8} d={10.8} h={4} axis="x" color={COL.snow} gable="#5e81ac" overhang={0.4} />
            </g>
          )}
          {extChim > 0 && (
            <g opacity={extChim} transform={`translate(0 ${-roofUp * 320})`}>
              <Box x={CH.x} y={CH.y} z={9.3} w={CH.w} d={CH.d} h={CH_TOP - 9.3} color="#a54034" top="#2b2236" />
            </g>
          )}
          {onRoof && santaS > 0.001 && (
            <At x={sx} y={sy} z={sz} s={santaS}>
              <Santa holdSack wave={range(f, [10, 20, 50, 60], [0, 1, 1, 0])} squash={1 + Math.sin(hop * Math.PI) * 0.06} />
            </At>
          )}
          <Pine x={12} y={2} s={0.9} />
          <Pine x={12.5} y={8.4} s={0.75} />
          <Pine x={3} y={12.6} s={0.85} />
          <Pine x={11.6} y={12.2} s={0.6} />
        </Camera>
        {/* éclat de paillettes quand le Père Noël disparaît */}
        {f >= 226 &&
          burst.map((b, k) => {
            const p = prog(f, 226 + b.a * 6, 24, easeOut);
            if (p <= 0 || p >= 1) return null;
            const ang = b.b * Math.PI * 2;
            return (
              <Sparkle
                key={k}
                cx={santaScreen[0] + Math.cos(ang) * 120 * p}
                cy={santaScreen[1] + Math.sin(ang) * 90 * p - 20}
                r={10 + b.c * 10}
                o={1 - p}
                rot={p * 200}
              />
            );
          })}
      </Stage>
      {/* ambiance chaude quand le sapin s'illumine */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 62% 50%, rgba(255,190,90,${0.28 * warm}) 0%, rgba(255,160,60,0) 55%)`,
          mixBlendMode: "screen",
        }}
      />
      <Snow count={60} opacity={0.8} />
      <Vignette bottom={0.65} />
      <ChapterTag n="04" label="LE DERNIER MÈTRE" />
      <Headline text="Livré au pied du sapin." start={108} end={230} y={850} accent={["sapin"]} />
      <Sub text="Accès par la cheminée · dépôt sécurisé · zéro réveil." start={120} end={230} y={940} />
      <Headline text="Mission accomplie." start={244} y={850} accent={["accomplie"]} />
      <Sub text="Et déjà en route vers la maison suivante." start={254} y={940} />
      <Counter label="TEMPS PAR FOYER" value={0.0003} dec={4} suffix=" s" start={200} x={80} y={60} />
      <Brand />
    </AbsoluteFill>
  );
};
