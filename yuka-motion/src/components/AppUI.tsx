import React from "react";
import { back, expoOut, out, pop, prog, range } from "../anim";
import { C, DISPLAY, scoreColor, scoreLabel } from "../theme";
import { StatusBar } from "./Phone";

/* ---------------- pictogrammes ---------------- */
export type IconName = "additive" | "flame" | "sugar" | "salt" | "fiber" | "protein" | "fruit" | "bio";
export const Icon: React.FC<{ name: IconName; size?: number; color?: string }> = ({ name, size = 24, color = "#2b3431" }) => {
  const p = { stroke: color, strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {name === "additive" && (
        <g {...p}>
          <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
          <path d="M7.5 15h9" />
        </g>
      )}
      {name === "flame" && <path {...p} d="M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 2-7 2 1 3 3 3 5 1-2 1-6 1-9z" />}
      {name === "sugar" && (
        <g {...p}>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
          <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
        </g>
      )}
      {name === "salt" && (
        <g {...p}>
          <rect x={7} y={8} width={10} height={13} rx={2} />
          <path d="M8 8l1-4h6l1 4M10 12h.01M14 12h.01M12 15h.01" />
        </g>
      )}
      {name === "fiber" && <path {...p} d="M12 21V9M12 9c-3-1-4-4-4-6 3 1 4 3 4 6zm0 0c3-1 4-4 4-6-3 1-4 3-4 6zm0 5c-3-1-5-3-5-5 3 0 5 2 5 5zm0 0c3-1 5-3 5-5-3 0-5 2-5 5z" />}
      {name === "protein" && <path {...p} d="M3 12c3-4 8-5 12-3l4-3v12l-4-3c-4 2-9 1-12-3zM8 11h.01" />}
      {name === "fruit" && (
        <g {...p}>
          <circle cx={12} cy={14} r={7} />
          <path d="M12 7c0-2 1-4 3-4" />
        </g>
      )}
      {name === "bio" && <path {...p} d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14zm0 0l7-7" />}
    </svg>
  );
};

export const Dot: React.FC<{ color: string; size?: number }> = ({ color, size = 12 }) => (
  <span style={{ display: "inline-block", width: size, height: size, borderRadius: size, background: color }} />
);

/* ---------------- scanner ---------------- */
export const ScannerView: React.FC<{
  f: number;
  start: number;
  detectAt: number;
  children: React.ReactNode; // le produit vu par la caméra
  enter?: number; // 0..1 entrée du produit dans le cadre
}> = ({ f, start, detectAt, children, enter = 1 }) => {
  const det = f >= detectAt;
  const flash = range(f, [detectAt, detectAt + 2, detectAt + 10], [0, 0.7, 0]);
  const laser = ((f - start) % 26) / 26;
  const lockP = pop(f, detectAt, 10, 220);
  const frameCol = det ? C.green : "#ffffff";
  const corner = (r: number) => (
    <div
      style={{
        position: "absolute",
        width: 42,
        height: 42,
        borderColor: frameCol,
        borderStyle: "solid",
        borderWidth: 0,
        ...(r === 0 && { top: 0, left: 0, borderTopWidth: 6, borderLeftWidth: 6, borderTopLeftRadius: 16 }),
        ...(r === 1 && { top: 0, right: 0, borderTopWidth: 6, borderRightWidth: 6, borderTopRightRadius: 16 }),
        ...(r === 2 && { bottom: 0, left: 0, borderBottomWidth: 6, borderLeftWidth: 6, borderBottomLeftRadius: 16 }),
        ...(r === 3 && { bottom: 0, right: 0, borderBottomWidth: 6, borderRightWidth: 6, borderBottomRightRadius: 16 }),
      }}
    />
  );
  return (
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 45%, #5d6763 0%, #2a302e 70%, #1b1f1e 100%)", overflow: "hidden" }}>
      <StatusBar dark />
      {/* produit vu par l'objectif (léger flou de bougé) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${(1 - enter) * 500}px) rotate(${(1 - enter) * 12 + Math.sin(f * 0.15) * 0.8}deg)`,
          filter: `blur(${(1 - enter) * 4}px)`,
        }}
      >
        {children}
      </div>
      {/* cadre de visée */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 330,
          height: 190,
          transform: `scale(${det ? 1 - 0.06 * lockP + 0.06 : 1})`,
        }}
      >
        {[0, 1, 2, 3].map(corner)}
        {!det && (
          <div
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              top: 10 + laser * 170,
              height: 3,
              background: C.mauvais,
              boxShadow: `0 0 14px 4px ${C.mauvais}`,
              borderRadius: 3,
            }}
          />
        )}
        {det && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 70,
              height: 70,
              marginLeft: -35,
              marginTop: -35,
              borderRadius: 70,
              background: C.green,
              transform: `scale(${lockP})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <svg width={36} height={36} viewBox="0 0 24 24">
              <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" strokeWidth={3.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, textAlign: "center", color: "#fff", fontSize: 17, fontWeight: 600, opacity: 0.9 }}>
        {det ? "Produit trouvé !" : "Visez le code-barres"}
      </div>
      {/* bouton déclencheur */}
      <div style={{ position: "absolute", bottom: 36, left: "50%", marginLeft: -32, width: 64, height: 64, borderRadius: 64, border: "4px solid #fff", opacity: 0.85 }} />
      <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash }} />
    </div>
  );
};

/* ---------------- fiche produit ---------------- */
export type Row = { icon?: IconName; title: string; sub?: string; value?: string; color: string };

export const ScoreBadge: React.FC<{ score: number; size?: number }> = ({ score, size = 16 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <Dot color={scoreColor(score)} size={size} />
    <div>
      <div style={{ fontWeight: 800, fontSize: size * 1.25, color: C.ink, lineHeight: 1 }}>{Math.round(score)}/100</div>
      <div style={{ fontWeight: 600, fontSize: size, color: C.grey, marginTop: 3 }}>{scoreLabel(score)}</div>
    </div>
  </div>
);

export const ProductSheet: React.FC<{
  f: number;
  start: number;
  thumb: React.ReactNode;
  name: string;
  brand: string;
  score: number;
  sections: { title: string; rows: Row[] }[];
  highlight?: { row: number; at: number }; // ligne mise en avant
  scroll?: number; // défilement (px)
  cosmetic?: boolean;
}> = ({ f, start, thumb, name, brand, score, sections, highlight, scroll = 0, cosmetic }) => {
  const up = prog(f, start, 16, expoOut);
  const counted = score * prog(f, start + 8, 22, out);
  let rowIndex = 0;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: "#fff",
        transform: `translateY(${(1 - up) * 860}px)`,
        boxShadow: "0 -10px 40px rgba(0,0,0,0.2)",
      }}
    >
      <StatusBar />
      <div style={{ transform: `translateY(${-scroll}px)` }}>
        {/* en-tête */}
        <div style={{ display: "flex", gap: 18, padding: "64px 24px 22px", borderBottom: `1px solid ${C.line}` }}>
          <div style={{ width: 96, height: 112, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pop(f, start + 4)})` }}>{thumb}</div>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 19, color: C.ink, lineHeight: 1.25 }}>{name}</div>
            <div style={{ fontSize: 15, color: C.grey, marginTop: 4 }}>{brand}</div>
            <div style={{ marginTop: 14, transform: `scale(${0.6 + 0.4 * pop(f, start + 8)})`, transformOrigin: "left center" }}>
              <ScoreBadge score={counted} />
            </div>
          </div>
        </div>
        {sections.map((s, si) => (
          <div key={si}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 24px 6px", fontWeight: 700, fontSize: 18, color: C.ink }}>
              {s.title}
              {cosmetic && si === 0 && <span style={{ fontWeight: 600, fontSize: 14, color: C.grey }}>Voir tout</span>}
            </div>
            {s.rows.map((r) => {
              const idx = rowIndex++;
              const a = prog(f, start + 18 + idx * 4, 14, back);
              const hl = highlight && highlight.row === idx ? pop(f, highlight.at, 11, 150) : 0;
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: cosmetic ? "15px 24px" : "13px 24px",
                    borderBottom: `1px solid ${C.line}`,
                    opacity: Math.min(1, a * 1.5),
                    transform: `translateX(${(1 - a) * 60}px) scale(${1 + hl * 0.06})`,
                    background: "#fff",
                    position: "relative",
                    zIndex: hl > 0 ? 3 : 1,
                    boxShadow: hl > 0 ? `0 ${12 * hl}px ${30 * hl}px rgba(0,0,0,${0.18 * hl})` : undefined,
                    borderRadius: hl > 0 ? 14 * hl : 0,
                  }}
                >
                  {r.icon && <Icon name={r.icon} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.ink }}>{r.title}</div>
                    {r.sub && <div style={{ fontSize: 13.5, color: C.grey, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.sub}</div>}
                  </div>
                  {r.value && <span style={{ fontSize: 15, color: C.grey, fontWeight: 500 }}>{r.value}</span>}
                  <Dot color={r.color} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- comparaison alternative ---------------- */
export const AltCard: React.FC<{ thumb: React.ReactNode; title: string; brand: string; score: number; good?: boolean; glow?: number }> = ({
  thumb,
  title,
  brand,
  score,
  good,
  glow = 0,
}) => (
  <div
    style={{
      flex: 1,
      background: "#fff",
      border: `2px solid ${good && glow > 0 ? C.excellent : C.line}`,
      borderRadius: 18,
      padding: "18px 10px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      boxShadow: good ? `0 ${14 * glow}px ${34 * glow}px rgba(31,157,76,${0.3 * glow})` : "0 4px 14px rgba(0,0,0,0.05)",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        width: 26,
        height: 26,
        borderRadius: 26,
        background: good ? C.excellent : C.mauvais,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={14} height={14} viewBox="0 0 24 24">
        {good ? (
          <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
        ) : (
          <path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
        )}
      </svg>
    </div>
    <div style={{ height: 130, display: "flex", alignItems: "center" }}>{thumb}</div>
    <div style={{ fontWeight: 700, fontSize: 16, color: C.ink, marginTop: 8, textAlign: "center" }}>{title}</div>
    <div style={{ fontSize: 13, color: C.grey, marginTop: 2 }}>{brand}</div>
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 10, fontWeight: 600, fontSize: 14, color: C.ink }}>
      <Dot color={scoreColor(score)} size={11} /> {scoreLabel(score)}
    </div>
  </div>
);

export const AppHeader: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ padding: "62px 24px 14px", fontFamily: DISPLAY, fontWeight: 700, fontSize: 24, color: C.ink }}>{title}</div>
);
