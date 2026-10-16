import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { back, expoOut, inOut, lerp, out, pop, prog, range, rnd, T } from "./anim";
import "./theme";
import { AltCard, AppHeader, Dot, ProductSheet, Row, ScannerView } from "./components/AppUI";
import { Phone, SCREEN_W } from "./components/Phone";
import {
  Barcode,
  BiscuitBox,
  CerealBox,
  ChipsBag,
  CreamTube,
  DeoNatural,
  DeoStick,
  OatBox,
  ShampooBottle,
  SodaCan,
  YogurtCup,
} from "./components/Products";
import { C, DISPLAY, scoreColor, scoreLabel, UI } from "./theme";

/* ================= contenus (produits fictifs) ================= */
const FOOD_ROWS: { title: string; rows: Row[] }[] = [
  {
    title: "Défauts",
    rows: [
      { icon: "additive", title: "Additifs", sub: "Contient des additifs à éviter", value: "4", color: C.mauvais },
      { icon: "flame", title: "Calories", sub: "Un peu trop calorique", value: "476 kcal", color: C.mediocre },
      { icon: "sugar", title: "Sucre", sub: "Trop sucré", value: "31 g", color: C.mauvais },
      { icon: "salt", title: "Sel", sub: "Un peu trop salé", value: "0,9 g", color: C.mediocre },
    ],
  },
  {
    title: "Qualités",
    rows: [
      { icon: "fiber", title: "Fibres", sub: "Quelques fibres", value: "3,1 g", color: C.bon },
      { icon: "protein", title: "Protéines", sub: "Quelques protéines", value: "6,2 g", color: C.bon },
    ],
  },
];

const COSMETIC_ROWS: { title: string; rows: Row[] }[] = [
  {
    title: "Composition",
    rows: [
      { title: "BHT", value: "À risque", color: C.mauvais },
      { title: "Aluminium chlorohydrate", value: "Risque modéré", color: C.mediocre },
      { title: "Paraffinum liquidum", value: "Risque modéré", color: C.mediocre },
      { title: "PEG-8 Distearate", value: "Risque faible", color: C.yellow },
      { title: "Glycerin", value: "Sans risque", color: C.bon },
      { title: "Aqua", value: "Sans risque", color: C.bon },
    ],
  },
];

/* ================= éléments de mise en page ================= */
const useLayout = () => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const phoneW = portrait ? 590 : 470;
  const bezel = phoneW * 0.035;
  const s = (phoneW - bezel * 2) / SCREEN_W;
  const phoneH = 844 * s + bezel * 2;
  const phoneX = portrait ? (width - phoneW) / 2 : 1210;
  const phoneY = portrait ? 650 : (height - phoneH) / 2;
  /** point de l'écran (en points 390×844) → pixels vidéo */
  const scr = (x: number, y: number): [number, number] => [phoneX + bezel + x * s, phoneY + bezel + y * s];
  return { width, height, portrait, phoneW, phoneH, phoneX, phoneY, scr, s };
};

/** Titre de séquence : pastille d'étape + titre + sous-titre */
const Headline: React.FC<{ step?: string; title: string; sub?: string; a: number; b: number; accent?: string }> = ({ step, title, sub, a, b, accent }) => {
  const f = useCurrentFrame();
  const L = useLayout();
  const o = 1 - prog(f, b - 8, 8);
  if (f < a || f > b) return null;
  const words = title.split(" ");
  const subA = prog(f, a + 10, 14, expoOut);
  const size = L.portrait ? 96 : 92;
  return (
    <div
      style={{
        position: "absolute",
        left: L.portrait ? 70 : 140,
        right: L.portrait ? 70 : undefined,
        top: L.portrait ? 170 : 300,
        width: L.portrait ? undefined : 860,
        textAlign: L.portrait ? "center" : "left",
        opacity: o,
        transform: `translateY(${(1 - o) * -20}px)`,
      }}
    >
      {step && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(255,255,255,0.18)",
            border: "2px solid rgba(255,255,255,0.35)",
            borderRadius: 999,
            padding: "8px 22px 8px 8px",
            color: "#fff",
            fontFamily: UI,
            fontWeight: 700,
            fontSize: 26,
            marginBottom: 22,
            transform: `scale(${pop(f, a)})`,
            transformOrigin: L.portrait ? "center" : "left center",
          }}
        >
          <span style={{ width: 44, height: 44, borderRadius: 44, background: "#fff", color: C.greenDeep, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
            {step}
          </span>
          ÉTAPE {step}
        </div>
      )}
      <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: size, lineHeight: 1.04, color: "#fff", letterSpacing: -1.5 }}>
        {words.map((w, i) => {
          const p = prog(f, a + 3 + i * 3, 16, expoOut);
          return (
            <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: 8 }}>
              <span style={{ display: "inline-block", transform: `translateY(${(1 - p) * 110}%)`, color: accent && w.includes(accent) ? C.yellow : undefined }}>
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            </span>
          );
        })}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: UI,
            fontWeight: 500,
            fontSize: L.portrait ? 38 : 34,
            lineHeight: 1.3,
            color: "rgba(255,255,255,0.92)",
            marginTop: 18,
            opacity: subA,
            transform: `translateY(${(1 - subA) * 16}px)`,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
};

/** Bulle flottante (annotation hors du téléphone) */
const Bubble: React.FC<{ x: number; y: number; a: number; b: number; children: React.ReactNode; anchor?: "left" | "right"; w?: number }> = ({
  x,
  y,
  a,
  b,
  children,
  anchor = "left",
  w = 380,
}) => {
  const f = useCurrentFrame();
  if (f < a || f > b) return null;
  const p = pop(f, a, 11, 170);
  const o = 1 - prog(f, b - 8, 8);
  return (
    <div
      style={{
        position: "absolute",
        left: anchor === "left" ? x : x - w,
        top: y,
        width: w,
        background: "#fff",
        borderRadius: 26,
        padding: "22px 26px",
        boxShadow: "0 24px 60px rgba(10,50,25,0.28)",
        transform: `scale(${p}) translateY(${Math.sin(f * 0.08) * 4}px)`,
        transformOrigin: anchor === "left" ? "left center" : "right center",
        opacity: o,
        fontFamily: UI,
        color: C.ink,
        zIndex: 20,
      }}
    >
      {children}
    </div>
  );
};

/** Fond vert de marque avec bulles qui dérivent */
const GreenBg: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, #56c77e 0%, ${C.green} 45%, ${C.greenDeep} 100%)` }}>
      <svg width={width} height={height} style={{ position: "absolute" }}>
        {Array.from({ length: 14 }).map((_, i) => {
          const r = 40 + rnd(i * 3) * 160;
          const x = rnd(i * 7) * width + Math.sin(f * 0.01 + i) * 40;
          const y = ((rnd(i * 11) * (height + 400) - f * (0.4 + rnd(i) * 0.8)) % (height + 400) + height + 400) % (height + 400) - 200;
          return <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" opacity={0.05 + rnd(i * 5) * 0.05} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

/* ================= 1. accroche : le rayon ================= */
const Shelf: React.FC = () => {
  const f = useCurrentFrame();
  const L = useLayout();
  const zoom = prog(f, 58, 30, inOut);
  const rows = L.portrait ? 3 : 2;
  const items = [
    (w: number) => <CerealBox w={w} />,
    (w: number) => <SodaCan w={w * 0.62} />,
    (w: number) => <ShampooBottle w={w * 0.55} />,
    (w: number) => <BiscuitBox w={w} />,
    (w: number) => <ChipsBag w={w} />,
    (w: number) => <YogurtCup w={w * 0.8} />,
    (w: number) => <CreamTube w={w * 0.42} />,
    (w: number) => <DeoStick w={w * 0.5} />,
    (w: number) => <SodaCan w={w * 0.62} color="#2c9a5b" />,
  ];
  const perRow = L.portrait ? 3 : 5;
  const unit = L.portrait ? 230 : 210;
  const shelfTop = L.portrait ? 700 : 400;
  const rowH = L.portrait ? 380 : 340;
  // le biscuit (index 3) est la cible du zoom
  const targetIdx = 3;
  const tRow = Math.floor(targetIdx / perRow);
  const tCol = targetIdx % perRow;
  const colX = (c: number) => (L.width - perRow * unit) / 2 + c * unit + unit / 2;
  const tx = colX(tCol);
  const ty = shelfTop + tRow * rowH + rowH * 0.55;
  const sc = lerp(1, L.portrait ? 3.2 : 3.6, zoom);
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #f3faf5 0%, #e3f3e8 100%)", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: `${tx}px ${ty}px`,
          transform: `scale(${sc}) translate(${(L.width / 2 - tx) * zoom * 0.3}px, ${(L.height * 0.55 - ty) * zoom * 0.3}px)`,
        }}
      >
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r}>
            <div
              style={{
                position: "absolute",
                left: 40,
                right: 40,
                top: shelfTop + r * rowH + rowH - 30,
                height: 26,
                borderRadius: 8,
                background: "linear-gradient(180deg, #d9c2a0, #b89a72)",
                boxShadow: "0 12px 20px rgba(80,60,30,0.18)",
                transform: `scaleX(${prog(f, r * 4, 16, expoOut)})`,
              }}
            />
            {Array.from({ length: perRow }).map((__, c) => {
              const idx = (r * perRow + c) % items.length;
              const isTarget = r === tRow && c === tCol;
              const p = pop(f, 6 + (r * perRow + c) * 2.5, 10, 170);
              const q = range(f, [20 + c * 3 + r * 5, 30 + c * 3 + r * 5], [0, 1]) * (1 - prog(f, 54, 8));
              return (
                <div
                  key={c}
                  style={{
                    position: "absolute",
                    left: colX(c),
                    top: shelfTop + r * rowH + rowH - 30,
                    transform: `translate(-50%, -100%) scale(${p})`,
                    transformOrigin: "50% 100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* point d'interrogation au-dessus des produits */}
                  <div
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 800,
                      fontSize: 44,
                      color: isTarget ? C.mauvais : C.greenDeep,
                      opacity: q,
                      transform: `translateY(${(1 - q) * 20 + Math.sin(f * 0.15 + c) * 5}px)`,
                      marginBottom: 6,
                    }}
                  >
                    ?
                  </div>
                  {items[idx](unit * 0.78)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* titre d'accroche */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: L.portrait ? 200 : 90,
          textAlign: "center",
          fontFamily: DISPLAY,
          fontWeight: 800,
          fontSize: L.portrait ? 92 : 80,
          lineHeight: 1.05,
          color: C.ink,
          letterSpacing: -1.5,
          opacity: 1 - prog(f, 56, 10),
        }}
      >
        {["Que", "contient", "vraiment", "ce", "que", "vous", "achetez", "?"].map((w, i) => {
          const p = prog(f, 8 + i * 3, 16, expoOut);
          return (
            <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: 8 }}>
              <span style={{ display: "inline-block", transform: `translateY(${(1 - p) * 110}%)`, color: w === "vraiment" ? C.greenDeep : undefined }}>
                {w}
                {" "}
              </span>
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ================= écran du téléphone (toute la démo) ================= */
const Screen: React.FC = () => {
  const f = useCurrentFrame();
  const foodOut = prog(f, T.cosmetic, 14, inOut);
  const cosmeticScan = f >= T.cosmetic;
  const altIn = prog(f, T.alt, 16, expoOut);
  return (
    <>
      {/* scan n°1 : biscuits */}
      {!cosmeticScan && (
        <ScannerView f={f} start={T.phoneIn} detectAt={T.scan1 + 32} enter={prog(f, T.scan1, 22, expoOut)}>
          <div style={{ position: "relative", transform: "translateY(40px)" }}>
            <BiscuitBox w={360} style={{ filter: "blur(1.5px)" }} />
            <div style={{ position: "absolute", left: 60, top: 92 }}>
              <Barcode w={240} seed={5} />
            </div>
          </div>
        </ScannerView>
      )}
      {/* scan n°2 : déodorant */}
      {cosmeticScan && (
        <ScannerView f={f} start={T.cosmetic} detectAt={T.cosmetic + 34} enter={prog(f, T.cosmetic + 6, 20, expoOut)}>
          <div style={{ position: "relative", transform: "translateY(60px)" }}>
            <DeoStick w={230} style={{ filter: "blur(1.5px)" }} />
            <div style={{ position: "absolute", left: -5, top: 140 }}>
              <Barcode w={240} seed={17} digits="8 710447 318427" />
            </div>
          </div>
        </ScannerView>
      )}
      {f >= T.food && f < T.cosmetic + 16 && (
        <div style={{ position: "absolute", inset: 0, transform: `translateY(${foodOut * 860}px)` }}>
          <ProductSheet
            f={f}
            start={T.food}
            thumb={<BiscuitBox w={92} />}
            name="Biscuits fourrés chocolat"
            brand="Croc'Choco"
            score={18}
            sections={FOOD_ROWS}
            highlight={{ row: 0, at: T.food + 52 }}
          />
        </div>
      )}
      {f >= T.cosmetic + 40 && (
        <ProductSheet
          f={f}
          start={T.cosmetic + 40}
          thumb={<DeoStick w={44} />}
          name="Déodorant Fresh 48h"
          brand="Fresh"
          score={12}
          sections={COSMETIC_ROWS}
          highlight={{ row: 0, at: T.cosmetic + 72 }}
          cosmetic
        />
      )}
      {/* alternatives */}
      {f >= T.alt && (
        <div style={{ position: "absolute", inset: 0, background: C.bg, transform: `translateX(${(1 - altIn) * 400}px)` }}>
          <AppHeader title="Meilleures alternatives" />
          {[
            { bad: <DeoStick w={50} />, good: <DeoNatural w={50} />, cat: "Déodorant", b: ["Fresh", "Natura"], s: [12, 88], at: T.alt + 14 },
            { bad: <BiscuitBox w={110} />, good: <OatBox w={110} />, cat: "Biscuits", b: ["Croc'Choco", "Avéna"], s: [18, 82], at: T.alt + 30 },
          ].map((r, i) => {
            const a = pop(f, r.at, 12, 150);
            const glow = prog(f, r.at + 16, 14, out);
            const arrow = prog(f, r.at + 8, 16, back);
            return (
              <div key={i} style={{ display: "flex", gap: 14, padding: "8px 18px", alignItems: "center", transform: `translateY(${(1 - a) * 80}px)`, opacity: Math.min(1, a * 1.4) }}>
                <AltCard thumb={r.bad} title={r.cat} brand={r.b[0]} score={r.s[0]} />
                <div style={{ transform: `rotate(${(1 - arrow) * -180}deg) scale(${arrow})`, color: C.grey, fontSize: 22, fontWeight: 800 }}>⇄</div>
                <AltCard thumb={r.good} title={r.cat} brand={r.b[1]} score={r.s[1]} good glow={glow} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

/* ================= démo : téléphone + annotations ================= */
const Demo: React.FC = () => {
  const f = useCurrentFrame();
  const L = useLayout();
  const enter = pop(f, T.phoneIn, 14, 110);
  const exit = prog(f, T.proof, 18, Easing3);
  const tilt = Math.sin(f * 0.03) * 3;
  const scoreNut = prog(f, T.food + 104, 26, out);
  // boîte « réelle » scannée à côté du téléphone
  const boxIn = prog(f, T.scan1 - 8, 20, expoOut) * (1 - prog(f, T.food - 6, 14, inOut));
  const deoIn = prog(f, T.cosmetic, 18, expoOut) * (1 - prog(f, T.cosmetic + 36, 14, inOut));
  const [ax, ay] = L.scr(390, 210); // bord droit, ligne « Additifs »
  const [cx, cy] = L.scr(390, 300);
  const altPop = pop(f, T.alt + 62, 11, 140);
  return (
    <AbsoluteFill>
      {/* objets réels scannés */}
      <div
        style={{
          position: "absolute",
          left: L.portrait ? 30 : L.phoneX + L.phoneW - 40,
          top: L.portrait ? L.phoneY + L.phoneH - 420 : L.phoneY + 300,
          transform: `translateX(${(1 - boxIn) * (L.portrait ? -500 : 700)}px) rotate(${-14 + (1 - boxIn) * -20}deg)`,
          zIndex: 10,
        }}
      >
        <BiscuitBox w={300} />
      </div>
      <div
        style={{
          position: "absolute",
          left: L.portrait ? 60 : L.phoneX + L.phoneW,
          top: L.portrait ? L.phoneY + L.phoneH - 460 : L.phoneY + 260,
          transform: `translateX(${(1 - deoIn) * (L.portrait ? -500 : 700)}px) rotate(${-10 + (1 - deoIn) * -20}deg)`,
          zIndex: 10,
        }}
      >
        <DeoStick w={150} />
      </div>
      {/* téléphone */}
      <div
        style={{
          position: "absolute",
          left: L.phoneX,
          top: L.phoneY,
          transform: `translateY(${(1 - enter) * 1500 + exit * 1600}px) perspective(1800px) rotateY(${tilt}deg) rotateZ(${(1 - enter) * 8}deg)`,
          zIndex: 5,
        }}
      >
        <Phone width={L.phoneW} glare={range(f, [T.phoneIn + 10, T.phoneIn + 40], [0, 1.4])}>
          <Screen />
        </Phone>
      </div>

      {/* annotation additifs */}
      <Bubble x={L.portrait ? L.width - 470 : L.phoneX - 410} y={L.portrait ? ay + 40 : ay + 170} a={T.food + 56} b={T.food + 104} w={L.portrait ? 440 : 380}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 800, fontSize: 30 }}>
          <Dot color={C.mauvais} size={18} /> 4 additifs à éviter
        </div>
        <div style={{ fontSize: 22, color: C.grey, marginTop: 6 }}>E250 · E320 · E450 · E471</div>
      </Bubble>

      {/* méthode de notation */}
      <Bubble
        x={L.portrait ? 60 : 140}
        y={L.portrait ? L.phoneY + L.phoneH - 330 : 660}
        a={T.food + 100}
        b={T.cosmetic - 2}
        w={L.portrait ? 960 : 820}
      >
        <div style={{ fontWeight: 800, fontSize: 30 }}>Comment est calculée la note ?</div>
        <div style={{ display: "flex", height: 34, borderRadius: 17, overflow: "hidden", marginTop: 18, background: C.line }}>
          {[
            { k: 60, c: C.greenDeep },
            { k: 30, c: C.mediocre },
            { k: 10, c: C.bon },
          ].map((s, i) => (
            <div key={i} style={{ width: `${s.k * range(scoreNut, [i * 0.25, i * 0.25 + 0.5], [0, 1])}%`, background: s.c }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 24, fontWeight: 600 }}>
          <span>
            <b style={{ color: C.greenDeep }}>60 %</b> nutrition
          </span>
          <span>
            <b style={{ color: C.mediocre }}>30 %</b> additifs
          </span>
          <span>
            <b style={{ color: C.bon }}>10 %</b> bio
          </span>
        </div>
      </Bubble>

      {/* annotation BHT */}
      <Bubble x={L.portrait ? 60 : 140} y={L.portrait ? L.phoneY + L.phoneH - 360 : 770} a={T.cosmetic + 76} b={T.alt - 2} w={L.portrait ? 960 : 640}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 800, fontSize: 30 }}>
          <Dot color={C.mauvais} size={18} /> BHT · À risque
        </div>
        <div style={{ fontSize: 23, color: C.grey, marginTop: 6 }}>Perturbateur endocrinien suspecté</div>
        <div style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 19, fontWeight: 600, color: C.ink, flexWrap: "wrap" }}>
          {[
            [C.bon, "Sans risque"],
            [C.yellow, "Faible"],
            [C.mediocre, "Modéré"],
            [C.mauvais, "À risque"],
          ].map(([c, t]) => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Dot color={c} size={12} /> {t}
            </span>
          ))}
        </div>
      </Bubble>

      {/* l'alternative jaillit du téléphone */}
      {f >= T.alt + 62 && f < T.proof + 10 && (
        <div
          style={{
            position: "absolute",
            left: L.portrait ? cx - 330 : L.phoneX - 420,
            top: L.portrait ? cy - 640 : L.phoneY + 520,
            transform: `scale(${altPop}) rotate(${(1 - altPop) * 30 + Math.sin(f * 0.1) * 2}deg)`,
            opacity: 1 - prog(f, T.proof - 4, 12),
            display: "flex",
            alignItems: "flex-end",
            gap: 18,
            zIndex: 15,
          }}
        >
          <OatBox w={L.portrait ? 230 : 250} />
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: "16px 22px",
              boxShadow: "0 24px 60px rgba(10,50,25,0.3)",
              fontFamily: UI,
              marginBottom: 30,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Dot color={C.excellent} size={20} />
              <span style={{ fontWeight: 800, fontSize: 40, color: C.ink }}>{Math.round(82 * prog(f, T.alt + 66, 20, out))}/100</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 26, color: C.excellent, marginTop: 2 }}>Excellent</div>
          </div>
        </div>
      )}
      {/* étincelles de validation */}
      {f >= T.alt + 46 &&
        Array.from({ length: 10 }).map((_, i) => {
          const p = prog(f, T.alt + 46 + i, 26, out);
          if (p <= 0 || p >= 1) return null;
          const ang = (i / 10) * Math.PI * 2;
          const [px, py] = L.scr(300, 330);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: px + Math.cos(ang) * 160 * p,
                top: py + Math.sin(ang) * 160 * p,
                width: 16,
                height: 16,
                borderRadius: 4,
                background: i % 2 ? C.yellow : "#fff",
                opacity: 1 - p,
                transform: `rotate(${p * 200}deg)`,
                zIndex: 16,
              }}
            />
          );
        })}
    </AbsoluteFill>
  );
};
const Easing3 = (t: number) => t * t * t;

/* ================= preuves : indépendance & audience ================= */
const Proof: React.FC = () => {
  const f = useCurrentFrame();
  const L = useLayout();
  const a = T.proof + 6;
  const n = Math.round(80 * prog(f, a, 36, out));
  const pillars = [
    { t: "100 % indépendante", d: "Aucune marque ne paie pour être notée" },
    { t: "Zéro publicité", d: "Des conseils neutres et transparents" },
    { t: "Pour tout le monde", d: "Parents, sportifs, curieux…" },
  ];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily: UI, color: "#fff", padding: 60 }}>
      <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: L.portrait ? 230 : 210, lineHeight: 0.95, letterSpacing: -4, transform: `scale(${0.7 + 0.3 * pop(f, a)})` }}>
        {n}
        <span style={{ fontSize: "0.42em", letterSpacing: -1 }}> millions</span>
      </div>
      <div style={{ fontSize: L.portrait ? 44 : 40, fontWeight: 600, marginTop: 10, opacity: prog(f, a + 10, 14), textAlign: "center" }}>d'utilisateurs font déjà leurs courses avec Yuka</div>
      <div style={{ display: "flex", flexDirection: L.portrait ? "column" : "row", gap: 26, marginTop: L.portrait ? 80 : 60 }}>
        {pillars.map((p, i) => {
          const k = pop(f, a + 26 + i * 8, 12, 150);
          return (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.14)",
                border: "2px solid rgba(255,255,255,0.3)",
                borderRadius: 28,
                padding: "26px 34px",
                width: L.portrait ? 860 : 500,
                transform: `translateY(${(1 - k) * 60}px)`,
                opacity: Math.min(1, k * 1.4),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, fontWeight: 800, fontSize: 36 }}>
                <span style={{ width: 40, height: 40, borderRadius: 40, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width={24} height={24} viewBox="0 0 24 24">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke={C.greenDeep} strokeWidth={3.5} fill="none" strokeLinecap="round" />
                  </svg>
                </span>
                {p.t}
              </div>
              <div style={{ fontSize: 26, opacity: 0.9, marginTop: 8, paddingLeft: 54 }}>{p.d}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ================= fin : logo + appel à l'action ================= */
export const YukaLogo: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.22 }}>
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: C.green,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 16px 40px rgba(30,120,60,0.35)",
      }}
    >
      {/* carotte stylisée */}
      <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 64 64">
        <path d="M30 22 C40 20 46 26 44 34 L26 58 C24 61 20 59 21 56 L28 30 C28 26 28 23 30 22 Z" fill={C.carrot} />
        <path d="M30 34 l6 2 M28 42 l5 2 M26 50 l4 1" stroke="#d96d14" strokeWidth={2.5} strokeLinecap="round" />
        <path d="M36 22 C34 12 38 6 42 4 C42 12 40 17 38 22 Z" fill="#fff" />
        <path d="M38 23 C44 14 52 13 56 14 C52 20 46 23 40 25 Z" fill="#fff" />
      </svg>
    </div>
    <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: size * 0.86, color: C.ink, letterSpacing: -2 }}>yuka</span>
  </div>
);

const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const L = useLayout();
  const a = T.outro;
  const reveal = prog(f, a, 18, inOut);
  const logo = pop(f, a + 10, 11, 130);
  const tag = ["Scannez.", "Comprenez.", "Choisissez mieux."];
  const orbit = [
    { el: <OatBox w={170} />, s: 82 },
    { el: <DeoNatural w={80} />, s: 88 },
    { el: <YogurtCup w={150} />, s: 64 },
    { el: <CerealBox w={150} />, s: 41 },
  ];
  return (
    <AbsoluteFill style={{ clipPath: `circle(${reveal * 150}% at 50% 50%)`, background: "#fff" }}>
      {/* produits qui gravitent */}
      {orbit.map((o, i) => {
        const spots = L.portrait
          ? [
              [210, 330],
              [870, 380],
              [200, 1590],
              [870, 1560],
            ]
          : [
              [250, 260],
              [1670, 280],
              [260, 820],
              [1660, 820],
            ];
        const [px, py] = spots[i];
        const k = pop(f, a + 18 + i * 4, 12, 140);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py + Math.sin(f * 0.07 + i * 1.7) * 14,
              transform: `translate(-50%, -50%) scale(${k * 0.9}) rotate(${Math.sin(f * 0.05 + i) * 5}deg)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            {o.el}
            <span style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: 999, padding: "6px 14px", boxShadow: "0 8px 20px rgba(0,0,0,0.12)", fontFamily: UI, fontWeight: 700, fontSize: 22, color: C.ink, whiteSpace: "nowrap" }}>
              <Dot color={scoreColor(o.s)} size={14} /> {o.s}/100 · {scoreLabel(o.s)}
            </span>
          </div>
        );
      })}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ transform: `scale(${logo})` }}>
          <YukaLogo size={L.portrait ? 170 : 150} />
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 40, flexWrap: "wrap", justifyContent: "center" }}>
          {tag.map((t, i) => {
            const p = prog(f, a + 22 + i * 6, 16, expoOut);
            return (
              <span
                key={i}
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: L.portrait ? 62 : 56,
                  color: i === 2 ? C.greenDeep : C.ink,
                  opacity: p,
                  transform: `translateY(${(1 - p) * 30}px)`,
                  letterSpacing: -1,
                }}
              >
                {t}
              </span>
            );
          })}
        </div>
        <div style={{ marginTop: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, transform: `scale(${pop(f, a + 44, 12, 140)})` }}>
          <div style={{ background: C.green, color: "#fff", fontFamily: UI, fontWeight: 800, fontSize: 36, borderRadius: 999, padding: "22px 54px", boxShadow: "0 16px 40px rgba(30,120,60,0.35)" }}>
            Téléchargez Yuka gratuitement
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {["App Store", "Google Play"].map((s) => (
              <div key={s} style={{ background: C.ink, color: "#fff", fontFamily: UI, fontWeight: 700, fontSize: 26, borderRadius: 14, padding: "14px 28px" }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ================= composition ================= */
export const YukaAd: React.FC = () => {
  const f = useCurrentFrame();
  const L = useLayout();
  const greenReveal = prog(f, T.phoneIn - 6, 20, inOut);
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      {f < T.phoneIn + 16 && <Shelf />}
      {f >= T.phoneIn - 6 && (
        <AbsoluteFill style={{ clipPath: `circle(${greenReveal * 140}% at 50% ${L.portrait ? 55 : 60}%)` }}>
          <GreenBg />
          <Headline step="1" title="Scannez." sub="Le code-barres de n'importe quel produit." a={T.phoneIn + 8} b={T.food + 2} />
          <Headline step="2" title="Comprenez." sub="Une note sur 100, claire et justifiée." a={T.food + 4} b={T.cosmetic} />
          <Headline step="2" title="Cosmétiques aussi." sub="Chaque ingrédient évalué selon son niveau de risque." a={T.cosmetic + 2} b={T.alt} accent="aussi" />
          <Headline step="3" title="Choisissez mieux." sub="Des alternatives plus saines en un instant." a={T.alt + 2} b={T.proof} accent="mieux" />
          <Demo />
          {f >= T.proof && <Proof />}
        </AbsoluteFill>
      )}
      {f >= T.outro && <Outro />}
      <Audio src={staticFile("audio/soundtrack.wav")} />
    </AbsoluteFill>
  );
};
