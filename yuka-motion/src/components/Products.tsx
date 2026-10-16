import React from "react";
import { rnd } from "../anim";
import { DISPLAY, UI } from "../theme";

/**
 * Produits FICTIFS dessinés en SVG (aucune vraie marque n'est notée dans la pub).
 * Chaque produit est dessiné dans sa propre viewBox et mis à l'échelle via `w`.
 */
type P = { w: number; style?: React.CSSProperties };

const Svg: React.FC<P & { vb: [number, number]; children: React.ReactNode }> = ({ w, vb, style, children }) => (
  <svg width={w} height={(w * vb[1]) / vb[0]} viewBox={`0 0 ${vb[0]} ${vb[1]}`} style={{ overflow: "visible", ...style }}>
    {children}
  </svg>
);

export const Barcode: React.FC<{ w: number; seed?: number; digits?: string; color?: string }> = ({ w, seed = 3, digits = "3 017620 425035", color = "#111" }) => {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; x < 180; i++) {
    const bw = 1 + Math.floor(rnd(seed + i * 1.3) * 3.2);
    if (i % 2 === 0 || i < 3) bars.push({ x, w: bw * 1.6 });
    x += bw * 1.6 + 0.4;
  }
  return (
    <svg width={w} height={w * 0.62} viewBox="0 0 190 118">
      <rect width={190} height={118} rx={8} fill="#fff" />
      {bars.map((b, i) => (
        <rect key={i} x={6 + b.x} y={8} width={b.w} height={i < 2 || i > bars.length - 3 ? 88 : 80} fill={color} />
      ))}
      <text x={95} y={110} textAnchor="middle" fontFamily={UI} fontSize={15} fontWeight={600} letterSpacing={2} fill={color}>
        {digits}
      </text>
    </svg>
  );
};

/** Boîte de biscuits au chocolat (fictive) */
export const BiscuitBox: React.FC<P> = ({ w, style }) => (
  <Svg w={w} vb={[220, 280]} style={style}>
    <path d="M30 20 L190 20 L210 40 L210 270 L50 270 L30 250 Z" fill="#7a3e1d" />
    <rect x={30} y={20} width={160} height={250} rx={6} fill="#c8662a" />
    <rect x={30} y={20} width={160} height={74} rx={6} fill="#5b2a12" />
    <text x={110} y={55} textAnchor="middle" fontFamily={DISPLAY} fontWeight={800} fontSize={26} fill="#ffd36b">
      CROC'CHOCO
    </text>
    <text x={110} y={80} textAnchor="middle" fontFamily={UI} fontWeight={700} fontSize={12} letterSpacing={2} fill="#ffe9c2">
      BISCUITS FOURRÉS
    </text>
    {[
      [70, 150],
      [140, 140],
      [105, 205],
    ].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={30} fill="#3d1f0e" />
        <circle cx={x} cy={y} r={24} fill="#5a2e14" />
        {[0, 1, 2, 3, 4].map((k) => (
          <circle key={k} cx={x - 12 + (k % 3) * 11} cy={y - 8 + Math.floor(k / 3) * 14} r={2.5} fill="#2a1408" />
        ))}
      </g>
    ))}
    <rect x={130} y={238} width={52} height={22} rx={11} fill="#ffd36b" />
    <text x={156} y={254} textAnchor="middle" fontFamily={UI} fontWeight={800} fontSize={12} fill="#5b2a12">
      400 g
    </text>
  </Svg>
);

/** Alternative saine : biscuits avoine & chocolat noir bio (fictive) */
export const OatBox: React.FC<P> = ({ w, style }) => (
  <Svg w={w} vb={[220, 280]} style={style}>
    <path d="M30 20 L190 20 L210 40 L210 270 L50 270 L30 250 Z" fill="#a98a5c" />
    <rect x={30} y={20} width={160} height={250} rx={6} fill="#f1e2c4" />
    <rect x={30} y={20} width={160} height={74} rx={6} fill="#3f7d4a" />
    <text x={110} y={55} textAnchor="middle" fontFamily={DISPLAY} fontWeight={800} fontSize={25} fill="#fff">
      AVÉNA
    </text>
    <text x={110} y={80} textAnchor="middle" fontFamily={UI} fontWeight={700} fontSize={11} letterSpacing={1.5} fill="#e4f3d9">
      AVOINE · CHOCOLAT NOIR
    </text>
    {[
      [75, 160],
      [140, 175],
    ].map(([x, y], i) => (
      <g key={i}>
        <ellipse cx={x} cy={y} rx={32} ry={30} fill="#d9b77a" />
        <ellipse cx={x} cy={y} rx={26} ry={24} fill="#e8c98c" />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={x - 9 + k * 9} cy={y - 4 + (k % 2) * 9} r={3} fill="#4a2a17" />
        ))}
      </g>
    ))}
    <circle cx={165} cy={238} r={20} fill="#3f7d4a" />
    <text x={165} y={243} textAnchor="middle" fontFamily={UI} fontWeight={800} fontSize={13} fill="#fff">
      BIO
    </text>
    <path d="M48 225 q10 -30 30 -20 q-15 5 -30 20 z" fill="#7cc243" />
  </Svg>
);

/** Déodorant stick (fictif) */
export const DeoStick: React.FC<P> = ({ w, style }) => (
  <Svg w={w} vb={[120, 300]} style={style}>
    <rect x={18} y={10} width={84} height={60} rx={14} fill="#1f4e8c" />
    <rect x={14} y={62} width={92} height={228} rx={18} fill="#e9f1fb" />
    <rect x={14} y={62} width={92} height={228} rx={18} fill="url(#deoShade)" />
    <defs>
      <linearGradient id="deoShade" x1="0" x2="1">
        <stop offset="0" stopColor="#000" stopOpacity={0} />
        <stop offset="1" stopColor="#000" stopOpacity={0.12} />
      </linearGradient>
    </defs>
    <rect x={14} y={120} width={92} height={70} fill="#2d6cc0" />
    <text x={60} y={152} textAnchor="middle" fontFamily={DISPLAY} fontWeight={800} fontSize={20} fill="#fff">
      FRESH
    </text>
    <text x={60} y={176} textAnchor="middle" fontFamily={UI} fontWeight={800} fontSize={15} fill="#bfe0ff">
      48H
    </text>
    <path d="M30 230 q30 -20 60 0" stroke="#2d6cc0" strokeWidth={4} fill="none" />
  </Svg>
);

/** Déodorant naturel (alternative) */
export const DeoNatural: React.FC<P> = ({ w, style }) => (
  <Svg w={w} vb={[120, 300]} style={style}>
    <rect x={18} y={10} width={84} height={60} rx={14} fill="#b8d9a8" />
    <rect x={14} y={62} width={92} height={228} rx={18} fill="#f3f7ef" />
    <rect x={14} y={120} width={92} height={70} fill="#7cc243" />
    <text x={60} y={152} textAnchor="middle" fontFamily={DISPLAY} fontWeight={800} fontSize={17} fill="#fff">
      NATURA
    </text>
    <text x={60} y={176} textAnchor="middle" fontFamily={UI} fontWeight={700} fontSize={12} fill="#effbe7">
      sans aluminium
    </text>
    <path d="M45 240 q15 -30 30 0 q-15 12 -30 0 z" fill="#7cc243" />
  </Svg>
);

/* ---------- produits « décor » pour le rayon ---------- */
export const SodaCan: React.FC<P & { color?: string }> = ({ w, style, color = "#d83a3a" }) => (
  <Svg w={w} vb={[100, 190]} style={style}>
    <rect x={10} y={8} width={80} height={14} rx={6} fill="#c9ced3" />
    <rect x={6} y={18} width={88} height={160} rx={14} fill={color} />
    <rect x={6} y={70} width={88} height={40} fill="#fff" opacity={0.85} />
    <text x={50} y={97} textAnchor="middle" fontFamily={DISPLAY} fontWeight={800} fontSize={18} fill={color}>
      FIZZ
    </text>
    <rect x={10} y={172} width={80} height={10} rx={5} fill="#aeb4ba" />
  </Svg>
);

export const CerealBox: React.FC<P> = ({ w, style }) => (
  <Svg w={w} vb={[170, 260]} style={style}>
    <rect x={10} y={10} width={150} height={240} rx={6} fill="#f5c542" />
    <rect x={10} y={10} width={150} height={60} rx={6} fill="#e5432f" />
    <text x={85} y={50} textAnchor="middle" fontFamily={DISPLAY} fontWeight={800} fontSize={24} fill="#fff">
      CRUNCHY
    </text>
    <ellipse cx={85} cy={170} rx={52} ry={34} fill="#fff" />
    {[0, 1, 2, 3, 4, 5].map((k) => (
      <circle key={k} cx={58 + (k % 3) * 26} cy={158 + Math.floor(k / 3) * 22} r={11} fill="#e8a33a" />
    ))}
  </Svg>
);

export const ShampooBottle: React.FC<P> = ({ w, style }) => (
  <Svg w={w} vb={[120, 280]} style={style}>
    <rect x={40} y={8} width={40} height={36} rx={8} fill="#7a3e8f" />
    <path d="M24 60 Q24 40 60 40 Q96 40 96 60 L100 260 Q100 272 88 272 L32 272 Q20 272 20 260 Z" fill="#b97cd0" />
    <rect x={28} y={120} width={64} height={90} rx={10} fill="#fff" opacity={0.92} />
    <text x={60} y={160} textAnchor="middle" fontFamily={DISPLAY} fontWeight={800} fontSize={15} fill="#7a3e8f">
      SILKY
    </text>
    <text x={60} y={182} textAnchor="middle" fontFamily={UI} fontWeight={600} fontSize={10} fill="#7a3e8f">
      shampoing
    </text>
  </Svg>
);

export const YogurtCup: React.FC<P> = ({ w, style }) => (
  <Svg w={w} vb={[130, 140]} style={style}>
    <path d="M10 20 L120 20 L108 130 L22 130 Z" fill="#fff" />
    <rect x={6} y={10} width={118} height={16} rx={6} fill="#5ab4e8" />
    <path d="M18 60 L112 60 L106 100 L24 100 Z" fill="#ffc9d6" />
    <text x={65} y={86} textAnchor="middle" fontFamily={DISPLAY} fontWeight={800} fontSize={16} fill="#d1416a">
      FRAISE
    </text>
  </Svg>
);

export const CreamTube: React.FC<P> = ({ w, style }) => (
  <Svg w={w} vb={[90, 260]} style={style}>
    <path d="M12 10 L78 10 L72 210 L18 210 Z" fill="#fdf2e4" />
    <rect x={8} y={4} width={74} height={16} rx={4} fill="#e6c79c" />
    <rect x={30} y={210} width={30} height={40} rx={6} fill="#e08a5b" />
    <text x={45} y={110} textAnchor="middle" fontFamily={DISPLAY} fontWeight={800} fontSize={13} fill="#e08a5b" transform="rotate(-90 45 110)">
      HYDRA+
    </text>
  </Svg>
);

export const ChipsBag: React.FC<P> = ({ w, style }) => (
  <Svg w={w} vb={[170, 230]} style={style}>
    <path d="M14 12 Q85 0 156 12 L150 218 Q85 230 20 218 Z" fill="#2c7be5" />
    <path d="M14 12 Q85 0 156 12 L156 30 Q85 18 14 30 Z" fill="#1d5bb3" />
    <text x={85} y={92} textAnchor="middle" fontFamily={DISPLAY} fontWeight={800} fontSize={26} fill="#ffd36b">
      CHIPZ
    </text>
    {[0, 1, 2].map((k) => (
      <ellipse key={k} cx={55 + k * 30} cy={155 + (k % 2) * 10} rx={22} ry={15} fill="#f5c542" transform={`rotate(${k * 20 - 20} ${55 + k * 30} 155)`} />
    ))}
  </Svg>
);
