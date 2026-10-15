import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Defs, Sky, Snow, Vignette } from "../components/Atmosphere";
import { IsoTeam } from "../components/Characters";
import { Brand, ChapterTag, Counter, Headline, Sub } from "../components/Hud";
import { chimneyTop, Diorama, Gift, House, Pin, Pine, Sparkle } from "../components/Objects";
import { At, Camera, IsoPlane, IsoPoly, project, Stage, V3 } from "../lib/iso";
import { easeIn, expoInOut, lerp, pop, prog, range, rnd } from "../lib/anim";
import { COL, HOUSE_COLORS } from "../lib/theme";

/* ---------- itinéraire ---------- */
const ROUTE: [number, number][] = [
  [1, 25],
  [1, 10],
  [10, 10],
  [10, 1],
  [22, 1],
];
const SEGS = ROUTE.slice(1).map((p, i) => {
  const a = ROUTE[i];
  return { a, b: p, len: Math.hypot(p[0] - a[0], p[1] - a[1]), dir: p[0] !== a[0] ? "+x" : "-y" } as const;
});
const TOTAL_LEN = SEGS.reduce((s, g) => s + g.len, 0);
const pathAt = (s: number) => {
  let rest = Math.max(0, Math.min(TOTAL_LEN, s));
  for (let i = 0; i < SEGS.length; i++) {
    const g = SEGS[i];
    if (rest <= g.len || i === SEGS.length - 1) {
      const t = rest / g.len;
      return { x: lerp(g.a[0], g.b[0], t), y: lerp(g.a[1], g.b[1], t), dir: g.dir, seg: i, rest, len: g.len };
    }
    rest -= g.len;
  }
  return { x: 0, y: 0, dir: "-y" as const, seg: 0, rest: 0, len: 1 };
};

const F0 = 8;
const F1 = 250;
const sAt = (f: number) => range(f, [F0, F1], [0, TOTAL_LEN]);
const fAt = (s: number) => F0 + (s / TOTAL_LEN) * (F1 - F0);
const FLY_Z = 5.2;

/* ---------- ville ---------- */
type Lot = {
  i: number;
  j: number;
  kind: "house" | "trees" | "pond";
  x: number;
  y: number;
  h: number;
  roofH: number;
  axis: "x" | "y";
  color: string;
  routeS?: number;
};
const NI = 6;
const NJ = 7;
const routeLots = new Map<string, number>();
// lots survolés : centre (3i+1, 3j+1)
(() => {
  let acc = 0;
  for (const g of SEGS) {
    const steps = Math.round(g.len);
    for (let k = 0; k <= steps; k++) {
      const x = lerp(g.a[0], g.b[0], k / steps);
      const y = lerp(g.a[1], g.b[1], k / steps);
      if ((x - 1) % 3 === 0 && (y - 1) % 3 === 0) {
        const i = (x - 1) / 3;
        const j = (y - 1) / 3;
        if (i >= 0 && i < NI && j >= 0 && j < NJ && !routeLots.has(`${i},${j}`)) routeLots.set(`${i},${j}`, acc + k);
      }
    }
    acc += g.len;
  }
})();

const LOTS: Lot[] = [];
for (let i = 0; i < NI; i++)
  for (let j = 0; j < NJ; j++) {
    const key = `${i},${j}`;
    const r = rnd(i * 13.1 + j * 7.3);
    const onRoute = routeLots.has(key);
    const kind: Lot["kind"] = onRoute ? "house" : i === 4 && j === 4 ? "pond" : r < 0.16 ? "trees" : "house";
    LOTS.push({
      i,
      j,
      kind,
      x: 3 * i,
      y: 3 * j,
      h: 1.4 + rnd(r * 99) * 0.9,
      roofH: 0.9 + rnd(r * 51) * 0.5,
      axis: rnd(r * 17) > 0.5 ? "x" : "y",
      color: HOUSE_COLORS[Math.floor(rnd(r * 31) * HOUSE_COLORS.length)],
      routeS: routeLots.get(key),
    });
  }
const SORTED = [...LOTS].sort((a, b) => a.x + a.y - (b.x + b.y));
const ROUTE_HOUSES = LOTS.filter((l) => l.routeS !== undefined).sort((a, b) => a.routeS! - b.routeS!);

export const S4City: React.FC = () => {
  const f = useCurrentFrame();
  const s = sAt(f);
  const p = pathAt(s);
  const bob = Math.sin(f * 0.15) * 0.15;

  // caméra lissée (moyenne glissante sur l'itinéraire, avec anticipation)
  let ax = 0;
  let ay = 0;
  const N = 12;
  for (let k = 0; k < N; k++) {
    const q = pathAt(s - 2.2 + (k / (N - 1)) * 5.5);
    ax += q.x / N;
    ay += q.y / N;
  }
  const fin = prog(f, 246, 70, expoInOut);
  const cam = {
    x: lerp(ax, 8.6, fin),
    y: lerp(ay, 9.2, fin),
    z: lerp(3.4, -2.6, fin),
    zoom: lerp(lerp(1.5, 1.3, prog(f, 0, 60)), 0.76, fin),
  };

  // retournement du traîneau aux virages
  const dCorner = Math.min(p.rest, p.len - p.rest);
  const flip = p.seg > 0 || p.rest > 1 ? Math.max(0.15, Math.min(1, dCorner / 0.7)) : 1;
  const nearEnd = p.seg === SEGS.length - 1 && p.len - p.rest < 1 ? 1 : flip;

  const deliveredCount = ROUTE_HOUSES.filter((h) => f >= fAt(h.routeS!) + 12).length;
  const big = range(f, [262, 318], [0, 526_000_000], easeIn);
  const counterValue = Math.max(deliveredCount, big);

  // éclairage des maisons
  const litOf = (l: Lot) => {
    if (l.routeS !== undefined) return prog(f, fAt(l.routeS) + 12, 8);
    const dist = Math.hypot(l.x + 1 - 10, l.y + 1 - 10);
    return prog(f, 262 + dist * 2.4 + rnd(l.i * 3 + l.j) * 8, 6);
  };

  // tracé de l'itinéraire (au niveau du vol)
  const toPath = (a: number, b: number) => {
    const pts: string[] = [];
    const n = Math.max(2, Math.ceil((b - a) * 2));
    for (let k = 0; k <= n; k++) {
      const q = pathAt(a + ((b - a) * k) / n);
      const [sx, sy] = project(q.x, q.y, FLY_Z + 0.4);
      pts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
    }
    return pts.join(" ");
  };

  return (
    <AbsoluteFill>
      <Sky glow="#2c3a94" glowY={50} />
      <Stage>
        <Defs />
        <Camera {...cam}>
          <Diorama x={-1.6} y={-1.6} w={20.2} d={23} h={1.3} side="#4b3a63" />
          {/* rues */}
          {Array.from({ length: NJ + 1 }).map((_, j) => (
            <IsoPoly
              key={`r${j}`}
              p={[
                [-1.6, 3 * j - 0.85, 0.01],
                [18.6, 3 * j - 0.85, 0.01],
                [18.6, 3 * j - 0.15, 0.01],
                [-1.6, 3 * j - 0.15, 0.01],
              ]}
              fill="#c3cdec"
            />
          ))}
          {Array.from({ length: NI + 1 }).map((_, i) => (
            <IsoPoly
              key={`c${i}`}
              p={[
                [3 * i - 0.85, -1.6, 0.012],
                [3 * i - 0.15, -1.6, 0.012],
                [3 * i - 0.15, 21.4, 0.012],
                [3 * i - 0.85, 21.4, 0.012],
              ]}
              fill="#c3cdec"
            />
          ))}
          {/* ombre du traîneau */}
          {fin < 0.9 && (
            <At x={p.x} y={p.y} z={0.02}>
              <ellipse rx={60} ry={22} fill="#0b1033" opacity={0.14} />
            </At>
          )}
          {/* lots triés en profondeur */}
          {SORTED.map((l) => {
            if (l.kind === "trees")
              return (
                <g key={`${l.i}${l.j}`}>
                  <Pine x={l.x + 0.6} y={l.y + 0.5} s={0.6} />
                  <Pine x={l.x + 1.5} y={l.y + 1.0} s={0.75} />
                  <Pine x={l.x + 0.7} y={l.y + 1.6} s={0.55} />
                </g>
              );
            if (l.kind === "pond")
              return (
                <g key="pond">
                  <IsoPlane axis="top" x={l.x + 1} y={l.y + 1} z={0.02}>
                    <ellipse rx={44} ry={38} fill="#9fd0f5" stroke="#e8f4ff" strokeWidth={4} />
                    <path d="M -20 -6 Q 0 -16 18 -2 M -10 12 Q 6 4 24 12" stroke="#ffffff" strokeWidth={2} fill="none" opacity={0.6} />
                  </IsoPlane>
                  <Pine x={l.x + 2} y={l.y + 0.1} s={0.5} />
                </g>
              );
            return (
              <House
                key={`${l.i}${l.j}`}
                x={l.x}
                y={l.y}
                h={l.h}
                roofH={l.roofH}
                axis={l.axis}
                wall={l.color}
                lit={litOf(l)}
              />
            );
          })}
          {/* réverbères */}
          {Array.from({ length: NI }).map((_, i) =>
            Array.from({ length: NJ }).map((__, j) => (
              <At key={`l${i}${j}`} x={3 * i + 2.5} y={3 * j + 2.5}>
                <rect x={-1.5} y={-34} width={3} height={34} fill="#3b4170" />
                <circle cx={0} cy={-36} r={16} fill="url(#warmGlow)" opacity={0.7} />
                <circle cx={0} cy={-36} r={3.5} fill="#fff1c9" />
              </At>
            )),
          )}
          {/* effets de livraison */}
          {ROUTE_HOUSES.map((h, k) => {
            const fh = fAt(h.routeS!);
            const top = chimneyTop(h.x, h.y, 2, 2, h.h, h.roofH, h.axis);
            const drop = prog(f, fh, 12, easeIn);
            const ring = prog(f, fh + 12, 18);
            const from: V3 = [h.x + 1, h.y + 1, FLY_Z + 0.6];
            const g: V3 = [lerp(from[0], top[0], drop), lerp(from[1], top[1], drop), lerp(from[2], top[2] + 0.1, drop)];
            return (
              <g key={`d${k}`}>
                {f >= fh && drop < 1 && (
                  <Gift x={g[0] - 0.2} y={g[1] - 0.2} z={g[2]} s={0.4} color={HOUSE_COLORS[(k + 3) % HOUSE_COLORS.length]} />
                )}
                {ring > 0 && ring < 1 && (
                  <IsoPlane axis="top" x={top[0]} y={top[1]} z={top[2]}>
                    <circle r={10 + ring * 60} fill="none" stroke={COL.gold} strokeWidth={4 * (1 - ring)} opacity={1 - ring} />
                  </IsoPlane>
                )}
                {ring > 0 &&
                  Array.from({ length: 6 }).map((_, m) => {
                    const a = (m / 6) * Math.PI * 2 + k;
                    const [sx, sy] = project(top[0], top[1], top[2]);
                    return (
                      <Sparkle
                        key={m}
                        cx={sx + Math.cos(a) * 50 * ring}
                        cy={sy - 10 + Math.sin(a) * 30 * ring - ring * 20}
                        r={7}
                        o={1 - ring}
                        rot={ring * 90}
                      />
                    );
                  })}
                <Pin x={top[0]} y={top[1]} z={top[2] + 0.3} s={0.75 * pop(f, fh + 14, 9, 160)} />
              </g>
            );
          })}
          {/* itinéraire */}
          <polyline points={toPath(s, TOTAL_LEN - 2)} fill="none" stroke={COL.gold} strokeWidth={3} strokeDasharray="4 12" strokeLinecap="round" opacity={0.75} />
          <polyline points={toPath(0, s)} fill="none" stroke={COL.gold} strokeWidth={10} opacity={0.18} strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={toPath(0, s)} fill="none" stroke="#fff3c4" strokeWidth={3} opacity={0.85} strokeLinecap="round" strokeLinejoin="round" />
          {/* traîneau */}
          <g opacity={1 - prog(f, 252, 12)}>
            <IsoTeam x={p.x} y={p.y} z={FLY_Z + bob} t={f * 1.3} dir={p.dir} s={0.95 * nearEnd} wave={0} />
          </g>
        </Camera>
      </Stage>
      <Snow count={80} wind={0.4} />
      <Vignette bottom={0.65} />
      <ChapterTag n="03" label="LA TOURNÉE · ITINÉRAIRE OPTIMISÉ" end={250} />
      <Counter label="FOYERS LIVRÉS" value={counterValue} start={10} x={80} y={60} />
      <Headline text="Chaque cheminée. Chaque maison." start={18} end={236} y={850} accent={["Chaque", "maison"]} />
      <Sub text="Un itinéraire recalculé en temps réel — zéro détour, zéro oubli." start={30} end={236} y={940} />
      <Headline text="× 526 millions de foyers." start={268} y={800} align="center" size={96} width={1600} accent={["526", "millions"]} />
      <Sub text="En une seule nuit. Sans exception." start={282} y={915} align="center" width={1600} size={30} />
      <Brand />
    </AbsoluteFill>
  );
};
