import React from "react";
import { useCurrentFrame } from "remotion";
import { expoOut, prog, range } from "../lib/anim";
import { COL, display, ui } from "../lib/theme";

/** Étiquette de chapitre en haut à gauche : « 02 — CENTRE DE TRI » */
export const ChapterTag: React.FC<{ n: string; label: string; start?: number; end?: number }> = ({
  n,
  label,
  start = 6,
  end = 9999,
}) => {
  const f = useCurrentFrame();
  const a = prog(f, start, 22, expoOut);
  const out = prog(f, end, 12);
  const line = prog(f, start + 6, 26, expoOut);
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 70,
        display: "flex",
        alignItems: "center",
        gap: 18,
        opacity: a * (1 - out),
        transform: `translateX(${(1 - a) * -40}px)`,
        fontFamily: ui,
        color: "#fff",
      }}
    >
      <div
        style={{
          fontFamily: display,
          fontWeight: 700,
          fontSize: 30,
          color: COL.ink,
          background: COL.gold,
          borderRadius: 10,
          padding: "4px 12px",
        }}
      >
        {n}
      </div>
      <div style={{ width: 70 * line, height: 2, background: "rgba(255,255,255,0.6)" }} />
      <div style={{ fontSize: 20, letterSpacing: 5, fontWeight: 600, opacity: 0.92 }}>{label}</div>
    </div>
  );
};

/** Titre animé mot par mot (masques) */
export const Headline: React.FC<{
  text: string;
  start: number;
  end?: number;
  x?: number;
  y?: number;
  size?: number;
  align?: "left" | "center" | "right";
  color?: string;
  accent?: string[];
  width?: number;
  stagger?: number;
}> = ({ text, start, end = 99999, x = 80, y = 820, size = 72, align = "left", color = "#fff", accent = [], width = 1100, stagger = 3 }) => {
  const f = useCurrentFrame();
  const words = text.split(" ");
  const out = prog(f, end, 14);
  return (
    <div
      style={{
        position: "absolute",
        left: align === "center" ? 960 - width / 2 : x,
        top: y,
        width,
        textAlign: align,
        fontFamily: display,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.05,
        color,
        letterSpacing: -0.5,
        textShadow: "0 6px 30px rgba(5,8,40,0.55)",
        opacity: 1 - out,
        transform: `translateY(${out * -20}px)`,
      }}
    >
      {words.map((w, i) => {
        const p = prog(f, start + i * stagger, 20, expoOut);
        const isAcc = accent.includes(w.replace(/[.,!?]/g, ""));
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: 6 }}>
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${(1 - p) * 110}%) rotate(${(1 - p) * 6}deg)`,
                color: isAcc ? COL.gold : undefined,
              }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export const Sub: React.FC<{
  text: string;
  start: number;
  end?: number;
  x?: number;
  y?: number;
  size?: number;
  align?: "left" | "center";
  width?: number;
  color?: string;
}> = ({ text, start, end = 99999, x = 80, y = 920, size = 26, align = "left", width = 1100, color = "rgba(255,255,255,0.82)" }) => {
  const f = useCurrentFrame();
  const a = prog(f, start, 20, expoOut);
  const out = prog(f, end, 12);
  return (
    <div
      style={{
        position: "absolute",
        left: align === "center" ? 960 - width / 2 : x,
        top: y,
        width,
        textAlign: align,
        fontFamily: ui,
        fontWeight: 500,
        fontSize: size,
        color,
        letterSpacing: 0.3,
        opacity: a * (1 - out),
        transform: `translateY(${(1 - a) * 16}px)`,
      }}
    >
      {text}
    </div>
  );
};

export const fmt = (n: number, dec = 0) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec }).replace(/ /g, " ");

/** Compteur style dashboard */
export const Counter: React.FC<{
  label: string;
  value: number;
  start: number;
  x: number;
  y: number;
  suffix?: string;
  align?: "left" | "right";
  dec?: number;
  end?: number;
}> = ({ label, value, start, x, y, suffix = "", align = "right", dec = 0, end = 99999 }) => {
  const f = useCurrentFrame();
  const a = prog(f, start, 20, expoOut);
  const out = prog(f, end, 12);
  return (
    <div
      style={{
        position: "absolute",
        [align === "right" ? "right" : "left"]: x,
        top: y,
        textAlign: align,
        opacity: a * (1 - out),
        transform: `translateY(${(1 - a) * -16}px)`,
        background: "rgba(10,14,50,0.55)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 18,
        padding: "16px 26px",
        backdropFilter: "blur(6px)",
      }}
    >
      <div style={{ fontFamily: ui, fontSize: 15, letterSpacing: 4, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: display,
          fontSize: 58,
          fontWeight: 700,
          color: "#fff",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1.1,
        }}
      >
        {fmt(value, dec)}
        <span style={{ color: COL.gold }}>{suffix}</span>
      </div>
    </div>
  );
};

/** Bandeau marque discret en bas à droite */
export const Brand: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <div
    style={{
      position: "absolute",
      right: 80,
      bottom: 60,
      fontFamily: display,
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: 2,
      color: "rgba(255,255,255,0.7)",
      opacity,
    }}
  >
    SANTA <span style={{ color: COL.gold }}>&amp;</span> Co.
  </div>
);

/** Callout : point + ligne + étiquette, en coordonnées écran SVG (centre 0,0) */
export const Callout: React.FC<{
  px: number;
  py: number;
  dx: number;
  dy: number;
  title: string;
  sub?: string;
  p: number;
}> = ({ px, py, dx, dy, title, sub, p }) => {
  if (p <= 0) return null;
  const l1 = Math.min(1, p * 2);
  const l2 = Math.max(0, p * 2 - 1);
  const ex = px + dx * l1;
  const ey = py + dy * l1;
  const side = dx >= 0 ? 1 : -1;
  const len2 = 60 * l2;
  return (
    <g>
      <circle cx={px} cy={py} r={14 * l1} fill={COL.gold} opacity={0.25} />
      <circle cx={px} cy={py} r={6} fill={COL.gold} />
      <line x1={px} y1={py} x2={ex} y2={ey} stroke="#fff" strokeWidth={2} />
      <line x1={ex} y1={ey} x2={ex + side * len2} y2={ey} stroke="#fff" strokeWidth={2} />
      <g opacity={l2} transform={`translate(${ex + side * (len2 + 14)} ${ey})`}>
        <text
          x={0}
          y={-4}
          textAnchor={side > 0 ? "start" : "end"}
          fontFamily={display}
          fontWeight={700}
          fontSize={30}
          fill="#fff"
        >
          {title}
        </text>
        {sub && (
          <text
            x={0}
            y={24}
            textAnchor={side > 0 ? "start" : "end"}
            fontFamily={ui}
            fontWeight={500}
            fontSize={18}
            fill="rgba(255,255,255,0.75)"
            letterSpacing={1}
          >
            {sub}
          </text>
        )}
      </g>
    </g>
  );
};

export const useFade = (start: number, dur = 15) => {
  const f = useCurrentFrame();
  return range(f, [start, start + dur], [0, 1]);
};
