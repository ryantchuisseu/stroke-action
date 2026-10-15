import React from "react";
import { IsoPlane } from "../lib/iso";
import { COL } from "../lib/theme";

const SKIN = "#f5c4a1";

/* ---------------- Père Noël (origine = pieds) ---------------- */
export const Santa: React.FC<{
  walk?: number; // phase de marche (radians), undefined = immobile
  wave?: number; // 0..1 bras levé
  sitting?: boolean;
  squash?: number; // 1 = normal
  holdSack?: boolean;
}> = ({ walk, wave = 0, sitting = false, squash = 1, holdSack = false }) => {
  const legA = walk !== undefined ? Math.sin(walk) * 18 : 0;
  const armA = walk !== undefined ? Math.sin(walk) * 22 : 0;
  const bob = walk !== undefined ? Math.abs(Math.sin(walk)) * -3 : 0;
  return (
    <g transform={`scale(${2 - squash} ${squash})`}>
      <g transform={`translate(0 ${bob})`}>
        {!sitting && (
          <g>
            <g transform={`rotate(${legA} -9 -26)`}>
              <rect x={-15} y={-28} width={12} height={22} rx={4} fill={COL.redDark} />
              <ellipse cx={-10} cy={-5} rx={9} ry={5.5} fill="#1d1d2b" />
            </g>
            <g transform={`rotate(${-legA} 9 -26)`}>
              <rect x={3} y={-28} width={12} height={22} rx={4} fill={COL.redDark} />
              <ellipse cx={9} cy={-5} rx={9} ry={5.5} fill="#1d1d2b" />
            </g>
          </g>
        )}
        {/* sac */}
        {holdSack && (
          <g transform="translate(-30 -64) rotate(-14)">
            <path d="M -16 6 Q -24 -26 0 -30 Q 22 -28 16 6 Q 0 14 -16 6 Z" fill="#8a5a3c" />
            <path d="M -8 -26 Q 0 -36 8 -26" stroke={COL.gold} strokeWidth={3} fill="none" />
          </g>
        )}
        {/* bras arrière */}
        <g transform={`rotate(${-armA} -20 -62)`}>
          <rect x={-29} y={-64} width={11} height={28} rx={5.5} fill={COL.redDark} />
          <rect x={-30} y={-41} width={13} height={5} rx={2.5} fill="#fff" />
          <circle cx={-23.5} cy={-33} r={5.5} fill="#1d1d2b" />
        </g>
        {/* corps */}
        <path d="M -24 -24 Q -30 -72 0 -74 Q 30 -72 24 -24 Z" fill={COL.red} />
        <path d="M 0 -74 Q 30 -72 24 -24 L 10 -24 Q 16 -60 0 -74 Z" fill={COL.redDark} opacity={0.35} />
        <rect x={-26} y={-31} width={52} height={10} rx={5} fill="#fff" />
        <rect x={-25} y={-50} width={50} height={7} fill="#1d1d2b" />
        <rect x={-6} y={-52} width={12} height={11} rx={2} fill="none" stroke={COL.gold} strokeWidth={2.6} />
        <rect x={-2} y={-72} width={4} height={22} fill="#fff" opacity={0.9} />
        {/* bras avant (salut) */}
        <g transform={`rotate(${armA - wave * 150} 20 -62)`}>
          <rect x={18} y={-64} width={11} height={28} rx={5.5} fill={COL.red} />
          <rect x={17} y={-41} width={13} height={5} rx={2.5} fill="#fff" />
          <circle cx={23.5} cy={-33} r={5.5} fill="#1d1d2b" />
        </g>
        {/* tête */}
        <circle cx={0} cy={-86} r={14} fill={SKIN} />
        <path d="M -17 -88 Q -20 -64 0 -56 Q 20 -64 17 -88 Q 8 -78 0 -79 Q -8 -78 -17 -88 Z" fill="#fff" />
        <ellipse cx={-5.5} cy={-80} rx={6} ry={3.2} fill="#f4f4f4" />
        <ellipse cx={5.5} cy={-80} rx={6} ry={3.2} fill="#f4f4f4" />
        <circle cx={0} cy={-83} r={3} fill="#e8957a" />
        <circle cx={-5} cy={-89} r={1.8} fill="#1d1d2b" />
        <circle cx={5} cy={-89} r={1.8} fill="#1d1d2b" />
        <circle cx={-9} cy={-84} r={2.6} fill="#ff8fa3" opacity={0.6} />
        <circle cx={9} cy={-84} r={2.6} fill="#ff8fa3" opacity={0.6} />
        {/* bonnet */}
        <path d="M -15 -97 Q -8 -128 20 -120 L 16 -97 Z" fill={COL.red} />
        <rect x={-18} y={-101} width={36} height={9} rx={4.5} fill="#fff" />
        <circle cx={21} cy={-119} r={5.5} fill="#fff" />
      </g>
    </g>
  );
};

/* ---------------- Lutin ---------------- */
export const Elf: React.FC<{ t: number; color?: string; work?: boolean }> = ({ t, color = COL.green, work = true }) => {
  const a = work ? Math.sin(t * 0.35) * 35 : 0;
  const hop = work ? Math.max(0, Math.sin(t * 0.35)) * -2 : 0;
  return (
    <g transform={`translate(0 ${hop})`}>
      <ellipse cx={0} cy={0} rx={14} ry={5} fill="url(#softShadow)" />
      <rect x={-8} y={-14} width={6} height={12} rx={2} fill="#7b3f2a" />
      <rect x={2} y={-14} width={6} height={12} rx={2} fill="#7b3f2a" />
      <path d="M -11 -12 Q -12 -38 0 -39 Q 12 -38 11 -12 Z" fill={color} />
      <rect x={-11} y={-22} width={22} height={4} fill="#1d1d2b" />
      <rect x={-2.5} y={-23} width={5} height={6} fill={COL.gold} />
      <g transform={`rotate(${-50 + a} 9 -33)`}>
        <rect x={7} y={-35} width={6} height={15} rx={3} fill={color} />
        <circle cx={10} cy={-20} r={3.4} fill={SKIN} />
      </g>
      <g transform={`rotate(${50 - a} -9 -33)`}>
        <rect x={-13} y={-35} width={6} height={15} rx={3} fill={color} />
        <circle cx={-10} cy={-20} r={3.4} fill={SKIN} />
      </g>
      <circle cx={0} cy={-46} r={9} fill={SKIN} />
      <path d="M -9 -48 L -15 -54 L -8 -51 Z" fill={SKIN} />
      <path d="M 9 -48 L 15 -54 L 8 -51 Z" fill={SKIN} />
      <circle cx={-3} cy={-47} r={1.3} fill="#1d1d2b" />
      <circle cx={3} cy={-47} r={1.3} fill="#1d1d2b" />
      <path d="M -10 -51 Q 2 -78 18 -64 L 9 -53 Z" fill={COL.red} />
      <rect x={-11} y={-54} width={22} height={5} rx={2.5} fill="#fff" />
      <circle cx={18} cy={-64} r={3.2} fill="#fff" />
    </g>
  );
};

/* ---------------- Renne (profil, regarde à droite, origine = sabots) ---------------- */
export const Reindeer: React.FC<{ t: number; nose?: boolean; flying?: boolean }> = ({ t, nose = false, flying = true }) => {
  const ph = t * 0.45;
  const leg = (bx: number, by: number, ang: number, col: string) => (
    <g transform={`rotate(${ang} ${bx} ${by})`}>
      <rect x={bx - 3} y={by} width={6} height={26} rx={3} fill={col} />
      <rect x={bx - 3.5} y={by + 22} width={7} height={5} rx={2} fill="#3b2a22" />
    </g>
  );
  const fA = flying ? -35 + Math.sin(ph) * 25 : Math.sin(ph) * 25;
  const bA = flying ? 35 + Math.sin(ph + 1.2) * 25 : -Math.sin(ph) * 25;
  const body = "#a8744a";
  const dark = "#86583a";
  return (
    <g>
      {leg(-16, -36, bA + 10, dark)}
      {leg(18, -36, fA + 10, dark)}
      <ellipse cx={0} cy={-40} rx={30} ry={13} fill={body} />
      <ellipse cx={0} cy={-34} rx={22} ry={6} fill="#d9b48c" />
      <path d="M -29 -44 Q -38 -50 -34 -40 Z" fill="#f4f0e6" />
      {/* harnais */}
      <rect x={-6} y={-54} width={7} height={27} rx={2} fill={COL.red} />
      <circle cx={-2.5} cy={-30} r={3.4} fill={COL.gold} />
      {/* cou + tête */}
      <path d="M 16 -48 Q 24 -66 34 -70 L 40 -62 Q 30 -56 26 -40 Z" fill={body} />
      <ellipse cx={42} cy={-70} rx={12} ry={7.5} transform="rotate(14 42 -70)" fill={body} />
      <ellipse cx={34} cy={-79} rx={6} ry={3} transform="rotate(-30 34 -79)" fill={dark} />
      <circle cx={42} cy={-73} r={1.8} fill="#1d1d2b" />
      <path
        d="M 37 -77 Q 34 -94 26 -100 M 34 -88 Q 28 -90 24 -88 M 40 -78 Q 44 -95 52 -100 M 44 -90 Q 50 -90 54 -86"
        stroke="#6b4226"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      {nose ? (
        <g>
          <circle cx={53} cy={-66} r={10 + Math.sin(t * 0.4) * 2} fill="url(#redGlow)" opacity={0.8} />
          <circle cx={53} cy={-66} r={4} fill="#ff3b3b" />
        </g>
      ) : (
        <circle cx={53} cy={-66} r={3} fill="#3b2a22" />
      )}
      {leg(-10, -36, bA, body)}
      {leg(24, -36, fA, body)}
    </g>
  );
};

/* ---------------- Traîneau (profil, regarde à droite, origine = bas patins) ---------------- */
export const Sleigh: React.FC<{ t: number; gifts?: boolean; santa?: boolean; wave?: number }> = ({
  t,
  gifts = true,
  santa = true,
  wave = 0,
}) => {
  const body =
    "M -66 -16 L 44 -16 Q 62 -18 64 -36 Q 66 -52 52 -54 Q 42 -54 43 -44 L 43 -38 L -36 -38 Q -40 -68 -56 -74 Q -70 -76 -70 -62 Z";
  return (
    <g>
      {/* patins */}
      <path
        d="M -62 0 L 52 0 Q 76 0 74 -18 Q 72 -30 61 -26"
        stroke={COL.gold}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
      {[-44, -4, 36].map((x) => (
        <rect key={x} x={x - 2} y={-16} width={4} height={16} fill={COL.goldDeep} />
      ))}
      {/* cadeaux + sac */}
      {gifts && (
        <g>
          <path d="M -62 -40 Q -70 -86 -40 -90 Q -16 -88 -22 -40 Z" fill="#8a5a3c" />
          <rect x={-58} y={-70} width={20} height={20} fill="#2a9d8f" transform="rotate(-12 -48 -60)" />
          <rect x={-50} y={-66} width={4} height={20} fill={COL.gold} transform="rotate(-12 -48 -60)" />
          <rect x={-34} y={-62} width={16} height={16} fill="#e9c46a" transform="rotate(10 -26 -54)" />
          <rect x={-28} y={-62} width={3.5} height={16} fill={COL.red} transform="rotate(10 -26 -54)" />
        </g>
      )}
      {/* Père Noël assis */}
      {santa && (
        <g transform="translate(6 -30) scale(0.82)">
          <Santa sitting wave={wave} />
        </g>
      )}
      {/* coque avec épaisseur */}
      <path d={body} fill={COL.redDark} transform="translate(6 -6)" />
      <path d={body} fill={COL.red} />
      <path
        d="M -58 -24 L 40 -24 Q 54 -26 56 -38"
        stroke={COL.gold}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <path d="M -60 -60 Q -52 -64 -46 -52 Q -52 -46 -56 -50" stroke={COL.gold} strokeWidth={2.4} fill="none" />
      <circle cx={-24} cy={-28} r={3} fill={COL.gold} />
      <circle cx={0} cy={-28} r={3} fill={COL.gold} />
      <circle cx={24} cy={-28} r={3} fill={COL.gold} />
      {void t}
    </g>
  );
};

/** Attelage complet en profil (2 rennes) */
export const Team: React.FC<{ t: number; wave?: number; gifts?: boolean }> = ({ t, wave = 0, gifts = true }) => {
  const b1 = Math.sin(t * 0.45) * 4;
  const b2 = Math.sin(t * 0.45 + 1) * 4;
  return (
    <g>
      {/* rênes */}
      <path
        d={`M 18 -78 Q 70 ${-58 + b1} 128 ${-66 + b1} Q 170 ${-60 + b2} 228 ${-68 + b2}`}
        stroke="#5a3520"
        strokeWidth={2.2}
        fill="none"
      />
      <g transform={`translate(205 ${-26 + b2})`}>
        <Reindeer t={t + 6} nose />
      </g>
      <g transform={`translate(110 ${-24 + b1})`}>
        <Reindeer t={t} />
      </g>
      <Sleigh t={t} wave={wave} gifts={gifts} />
    </g>
  );
};

/** Attelage plaqué dans le plan isométrique */
export const IsoTeam: React.FC<{
  x: number;
  y: number;
  z: number;
  t: number;
  dir?: "+x" | "-y";
  s?: number;
  wave?: number;
  gifts?: boolean;
  tilt?: number;
}> = ({ x, y, z, t, dir = "-y", s = 1, wave = 0, gifts = true, tilt = 0 }) => (
  <IsoPlane axis={dir === "+x" ? "x" : "y"} x={x} y={y} z={z} s={s}>
    <g transform={`rotate(${tilt})`}>
      <Team t={t} wave={wave} gifts={gifts} />
    </g>
  </IsoPlane>
);
