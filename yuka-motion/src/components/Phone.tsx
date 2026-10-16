import React from "react";
import { UI } from "../theme";

export const SCREEN_W = 390;
export const SCREEN_H = 844;

/** Smartphone générique ; le contenu est dessiné en 390×844 « points » puis mis à l'échelle. */
export const Phone: React.FC<{ width: number; children: React.ReactNode; style?: React.CSSProperties; glare?: number }> = ({
  width,
  children,
  style,
  glare = 0,
}) => {
  const bezel = width * 0.035;
  const innerW = width - bezel * 2;
  const s = innerW / SCREEN_W;
  const height = SCREEN_H * s + bezel * 2;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: width * 0.15,
        background: "linear-gradient(145deg, #2b2f2e, #0d0f0f)",
        padding: bezel,
        boxShadow: "0 40px 90px rgba(10,40,25,0.35), 0 12px 30px rgba(10,40,25,0.25), inset 0 0 0 2px #3c4241",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          width: innerW,
          height: SCREEN_H * s,
          borderRadius: width * 0.12,
          overflow: "hidden",
          position: "relative",
          background: "#fff",
        }}
      >
        <div style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${s})`, transformOrigin: "0 0", position: "relative", fontFamily: UI }}>
          {children}
        </div>
        {/* encoche */}
        <div
          style={{
            position: "absolute",
            top: 10 * s,
            left: "50%",
            width: 110 * s,
            height: 32 * s,
            marginLeft: -55 * s,
            borderRadius: 20 * s,
            background: "#0d0f0f",
          }}
        />
        {glare > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(115deg, rgba(255,255,255,0) ${glare * 100 - 20}%, rgba(255,255,255,0.35) ${glare * 100}%, rgba(255,255,255,0) ${glare * 100 + 20}%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export const StatusBar: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const c = dark ? "#fff" : "#111";
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 30px 0", zIndex: 5 }}>
      <span style={{ fontWeight: 700, fontSize: 16, color: c }}>9:41</span>
      <svg width={70} height={14} viewBox="0 0 70 14">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={i * 5} y={10 - i * 3} width={3.5} height={4 + i * 3} rx={1} fill={c} />
        ))}
        <path d="M30 6 q7 -7 14 0 M33 9 q4 -4 8 0" stroke={c} strokeWidth={2} fill="none" />
        <rect x={48} y={2} width={20} height={10} rx={3} fill="none" stroke={c} strokeWidth={1.5} />
        <rect x={50} y={4} width={14} height={6} rx={1.5} fill={c} />
      </svg>
    </div>
  );
};
