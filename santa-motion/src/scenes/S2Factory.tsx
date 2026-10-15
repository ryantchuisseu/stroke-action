import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Defs, Sky, Snow, Vignette } from "../components/Atmosphere";
import { Elf, Santa } from "../components/Characters";
import { Brand, Callout, ChapterTag, Counter, Headline, Sub } from "../components/Hud";
import { Diorama, Gift, Pine, Smoke } from "../components/Objects";
import { At, Box, Camera, camToScreen, IsoPlane, IsoPoly, mix, rectX, rectY, Roof, Stage } from "../lib/iso";
import { easeInOut, expoInOut, lerp, pop, prog, range } from "../lib/anim";
import { COL, display, HOUSE_COLORS } from "../lib/theme";

const GIFT_COLS = [COL.red, "#2a9d8f", "#e9c46a", "#5e81ac", "#f4a261", "#b56576", "#7fb069"];

export const S2Factory: React.FC = () => {
  const f = useCurrentFrame();

  // caméra : plan large → zoom sur le contrôle qualité
  const a = prog(f, 0, 120, easeInOut);
  const b = prog(f, 130, 75, expoInOut);
  const cam = {
    x: lerp(lerp(0.5, 0.2, a), 2.6, b),
    y: lerp(lerp(-0.5, -1.2, a), -2.2, b),
    z: lerp(1.2, 1.0, b),
    zoom: lerp(lerp(0.66, 0.8, a), 1.55, b),
  };

  const rFactory = pop(f, 4, 12, 120);
  const rWare = pop(f, 10, 12, 120);
  const rBelt = prog(f, 14, 20, easeInOut);
  const roofDrop = (s: number) => (1 - pop(f, s, 10, 140)) * 6;

  // tapis roulant : flux continu de cadeaux
  const speed = 0.07;
  const spacing = 1.15;
  const beltX0 = -1;
  const beltX1 = 7.6;
  const head = Math.max(0, f - 16) * speed;
  const gifts: { x: number; i: number }[] = [];
  for (let i = 0; i < 40; i++) {
    const x = beltX0 + head - i * spacing;
    if (x >= beltX0 - 0.1 && x <= beltX1) gifts.push({ x, i });
  }
  gifts.sort((p, q) => p.x - q.x);

  // scanner du contrôle qualité
  const scan = (Math.sin(f * 0.18) + 1) / 2;

  const callA = prog(f, 40, 26);
  const callB = prog(f, 62, 26);
  const callC = prog(f, 84, 26);
  const callOut = 1 - prog(f, 125, 12);

  const pFactory = camToScreen(cam, [-4, -1.5, 3.4]);
  const pQC = camToScreen(cam, [2.9, -2.2, 2.2]);
  const pDish = camToScreen(cam, [4, -5, 4.6]);

  const pines: [number, number, number, number][] = [
    [-8.2, 4.6, 0.75, 22],
    [-6.8, 5.4, 0.55, 26],
    [-8.4, -0.4, 0.6, 30],
    [7.8, 4.4, 0.7, 24],
    [8.2, 2.8, 0.5, 28],
    [8.3, -6.2, 0.6, 20],
    [-1.2, 5.6, 0.5, 34],
  ];

  return (
    <AbsoluteFill>
      <Sky glow="#2f3f9a" glowY={58} />
      <Stage>
        <Defs />
        <Camera {...cam}>
          <Diorama x={-9} y={-7.5} w={18} d={13.5} h={1.4} side="#3d5aa8" />
          {/* allées */}
          <IsoPoly
            p={[
              [-1, -1.4, 0.01],
              [8.6, -1.4, 0.01],
              [8.6, -0.6, 0.01],
              [-1, -0.6, 0.01],
            ]}
            fill={COL.snowShade}
          />
          {/* Usine principale */}
          <Box x={-6.2} y={-5.6} z={3.4} w={0.6} d={0.6} h={2.6 * rFactory} color="#8a3b3b" top="#2a1e2e" />
          <Box x={-4.6} y={-5.6} z={3.4} w={0.6} d={0.6} h={2.2 * rFactory} color="#8a3b3b" top="#2a1e2e" />
          {rFactory > 0.95 && <Smoke x={-5.9} y={-5.3} z={6.1} f={f} />}
          {rFactory > 0.95 && <Smoke x={-4.3} y={-5.3} z={5.7} f={f} seed={2} />}
          <Box x={-7} y={-6} w={6} d={4.5} h={3.4 * rFactory} color="#c8453b" />
          {rFactory > 0.98 && (
            <g>
              {[-6.4, -5.2, -4, -2.8].map((wx, i) => (
                <g key={i}>
                  <IsoPoly p={rectY(-1.49, wx, wx + 0.8, 0.6, 1.7)} fill="#f3d9c7" />
                  <IsoPoly p={rectY(-1.48, wx + 0.08, wx + 0.72, 0.68, 1.62)} fill={mix(COL.warm, "#ffb347", (Math.sin(f * 0.1 + i) + 1) / 4)} />
                </g>
              ))}
              {/* enseigne */}
              <IsoPlane axis="x" x={-4} y={-1.47} z={2.55}>
                <rect x={-92} y={-20} width={184} height={34} rx={8} fill={COL.ink} />
                <text x={0} y={7} textAnchor="middle" fontFamily={display} fontWeight={700} fontSize={22} fill="#fff">
                  SANTA <tspan fill={COL.gold}>&amp;</tspan> Co.
                </text>
              </IsoPlane>
              {/* porte du tapis */}
              <IsoPoly p={rectX(-0.99, -3, -1.6, 0, 1.4)} fill="#1c1630" />
            </g>
          )}
          <g transform={`translate(0 ${-roofDrop(14) * 40})`} opacity={rFactory}>
            <Roof x={-7} y={-6} z={3.4 * rFactory} w={6} d={4.5} h={1.7} axis="x" color={COL.snow} gable="#c8453b" />
          </g>

          {/* Entrepôt vert + parabole */}
          <Box x={1.4} y={-6.8} w={5.2} d={3.2} h={2.6 * rWare} color={COL.green} />
          {rWare > 0.98 && (
            <g>
              {[1.9, 3.6, 5.3].map((dx) => (
                <g key={dx}>
                  <IsoPoly p={rectY(-3.59, dx, dx + 1.1, 0, 1.6)} fill="#e8eefc" />
                  {[0.3, 0.6, 0.9, 1.2].map((z) => (
                    <IsoPoly key={z} p={rectY(-3.58, dx, dx + 1.1, z, z + 0.05)} fill="#b7c3e6" />
                  ))}
                </g>
              ))}
            </g>
          )}
          <g transform={`translate(0 ${-roofDrop(20) * 40})`} opacity={rWare}>
            <Roof x={1.4} y={-6.8} z={2.6 * rWare} w={5.2} d={3.2} h={1.2} axis="x" color={COL.snow} gable={COL.green} />
          </g>
          {rWare > 0.9 && (
            <At x={4.2} y={-5.2} z={3.8} s={pop(f, 26)}>
              <rect x={-2} y={-30} width={4} height={30} fill="#9aa4c8" />
              <g transform={`translate(0 -34) scale(${Math.cos(f * 0.06)} 1)`}>
                <ellipse rx={20} ry={14} fill="#e8eefc" stroke="#9aa4c8" strokeWidth={2} />
                <circle r={3} fill={COL.red} />
              </g>
              <circle cx={0} cy={-34} r={30 + (f % 30)} fill="none" stroke={COL.gold} strokeWidth={2} opacity={1 - (f % 30) / 30} />
            </At>
          )}

          {/* Tapis roulant */}
          <Box x={beltX0} y={-2.8} w={(beltX1 - beltX0 + 0.6) * rBelt} d={1.2} h={0.6} color="#3b4170" top="#262a52" />
          {rBelt > 0.99 &&
            Array.from({ length: 16 }).map((_, i) => {
              const x = beltX0 + ((i * 0.6 + f * speed) % 9.6);
              if (x > beltX1 + 0.5) return null;
              return (
                <IsoPoly
                  key={i}
                  p={[
                    [x, -2.75, 0.61],
                    [x + 0.06, -2.75, 0.61],
                    [x + 0.06, -1.65, 0.61],
                    [x, -1.65, 0.61],
                  ]}
                  fill="#3c4277"
                />
              );
            })}
          {/* arche de contrôle qualité (montant arrière) */}
          <Box x={2.6} y={-3.2} w={0.3} d={0.3} h={2.4 * rBelt} color="#9aa4c8" />
          {gifts.map(({ x, i }) => {
            const end = range(x, [beltX1 - 0.6, beltX1], [1, 0]);
            const passed = x > 2.6;
            return (
              <Gift
                key={i}
                x={x}
                y={-2.55}
                z={0.6}
                s={0.7 * end}
                color={GIFT_COLS[i % GIFT_COLS.length]}
                ribbon={i % 3 === 0 ? "#ffffff" : COL.gold}
                bow={passed}
              />
            );
          })}
          {/* arche (montant avant + traverse + scan) */}
          <Box x={2.6} y={-1.3} w={0.3} d={0.3} h={2.4 * rBelt} color="#9aa4c8" />
          <Box x={2.6} y={-3.2} z={2.4} w={0.3} d={2.2} h={0.3 * rBelt} color="#b7c0e0" />
          {rBelt > 0.99 && (
            <IsoPoly
              p={[
                [2.75, -2.9, 2.38],
                [2.75, -1.3, 2.38],
                [2.75 + 0.1, -1.3, 0.62],
                [2.75 + 0.1, -2.9, 0.62],
              ]}
              fill="#3ef0a5"
              opacity={0.18 + scan * 0.25}
            />
          )}
          {/* pile de cadeaux en bout de chaîne */}
          {[
            [8.1, -3.3, 0, 0.8, 0],
            [8.4, -2.3, 0, 0.7, 1],
            [7.6, -1.5, 0, 0.6, 2],
            [8.2, -3.0, 0.8, 0.55, 3],
          ].map(([x, y, z, s, k]) => (
            <Gift key={k} x={x} y={y} z={z} s={s * pop(f, 30 + k * 4)} color={HOUSE_COLORS[k + 2]} />
          ))}

          {/* lutins */}
          {[0.6, 4.2, 6.4].map((x, i) => (
            <At key={i} x={x} y={-1.0} s={0.9 * pop(f, 30 + i * 5)}>
              <Elf t={f + i * 7} color={i === 1 ? "#2a9d8f" : COL.green} />
            </At>
          ))}

          {/* grand sapin + Père Noël */}
          <Pine x={-2.6} y={2.4} s={1.5 * pop(f, 22)} ornaments lights={1} star={1} t={f} />
          {[
            [-3.6, 3.0, 0.5, 0],
            [-1.9, 3.4, 0.45, 1],
          ].map(([x, y, s, k]) => (
            <Gift key={k} x={x} y={y} s={s * pop(f, 34 + k * 3)} color={k ? "#2a9d8f" : COL.red} />
          ))}
          <At x={1.4} y={2.2} s={0.95 * pop(f, 38, 10)}>
            <ellipse cx={0} cy={0} rx={30} ry={10} fill="url(#softShadow)" />
            <Santa wave={(Math.sin(f * 0.2) + 1) / 2} />
          </At>
          {pines.map(([x, y, s, st], i) => (
            <Pine key={i} x={x} y={y} s={s * pop(f, st)} />
          ))}
        </Camera>
        {/* callouts écran */}
        <g opacity={callOut}>
          <Callout px={pFactory[0]} py={pFactory[1]} dx={-120} dy={-150} title="Atelier 24/7" sub="1 200 lutins certifiés" p={callA} />
          <Callout px={pQC[0]} py={pQC[1]} dx={230} dy={170} title="Contrôle qualité" sub="100 % des cadeaux vérifiés" p={callB} />
          <Callout px={pDish[0]} py={pDish[1]} dx={170} dy={-110} title="Suivi en temps réel" sub="Chaque colis, chaque seconde" p={callC} />
        </g>
        {/* tampon "VÉRIFIÉ" lors du zoom */}
        {f > 150 && (
          <g transform={`translate(${pQC[0] + 330} ${pQC[1] + 210}) rotate(-10) scale(${pop(f, 156, 9, 180)})`}>
            <rect x={-150} y={-44} width={300} height={88} rx={14} fill="none" stroke={COL.gold} strokeWidth={6} />
            <text x={0} y={18} textAnchor="middle" fontFamily={display} fontWeight={700} fontSize={50} fill={COL.gold}>
              VÉRIFIÉ ✓
            </text>
          </g>
        )}
      </Stage>
      <Snow count={90} />
      <Vignette />
      <ChapterTag n="01" label="CENTRE DE PRODUCTION · PÔLE NORD" />
      <Counter label="CADEAUX PRÉPARÉS" value={range(f, [24, 170], [0, 2400000000], (t) => t * t * (3 - 2 * t))} start={20} x={80} y={60} />
      <Headline text="Une usine qui ne dort jamais." start={18} end={128} y={850} accent={["jamais"]} />
      <Sub text="365 jours par an, une seule mission : préparer LA nuit." start={30} end={128} y={940} />
      <Brand />
    </AbsoluteFill>
  );
};
