import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { COULEURS, ENTREPRISE, POLICE, TEXTES } from "../config";
import { easeOut, fin, P, prog, springAt, useTime } from "../lib/timeline";

const F = POLICE.famille;

/** Logo provisoire : pastille jaune avec initiales */
const Logo: React.FC<{ size: number }> = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.26,
      background: COULEURS.marque,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* petit motif « parcelles » */}
    <div style={{ position: "absolute", inset: size * 0.12, border: `${size * 0.035}px solid rgba(29,29,29,0.25)`, borderRadius: size * 0.12 }} />
    <div style={{ position: "absolute", left: "50%", top: size * 0.12, bottom: size * 0.12, width: size * 0.035, background: "rgba(29,29,29,0.25)" }} />
    <span style={{ fontFamily: F, fontWeight: 900, fontSize: size * 0.4, color: "#1d1d1d", letterSpacing: -1, position: "relative" }}>
      {ENTREPRISE.initiales}
    </span>
  </div>
);

/** Titre de plan : barre jaune + texte qui glisse */
const Title: React.FC<{ text: string; step: string; a: number; b: number }> = ({ text, step, a, b }) => {
  const t = useTime();
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const u = width / 1920; // unité relative
  const pin = prog(t, a, a + 0.7, easeOut);
  const pout = prog(t, b - 0.5, b);
  const o = pin * (1 - pout);
  if (o <= 0) return null;
  const bar = prog(t, a, a + 0.5, easeOut);
  const size = portrait ? 100 : 76 * u * 1.2;
  return (
    <div
      style={{
        position: "absolute",
        left: portrait ? 70 : 110 * u,
        right: portrait ? 70 : undefined,
        top: portrait ? 300 : undefined,
        bottom: portrait ? undefined : 120 * u,
        opacity: o,
        transform: `translateY(${(1 - pin) * 30 - pout * 20}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: portrait ? "center" : "flex-start",
        textAlign: portrait ? "center" : "left",
      }}
    >
      <div
        style={{
          fontFamily: F,
          fontWeight: 800,
          fontSize: size * 0.32,
          letterSpacing: size * 0.06,
          color: "#1d1d1d",
          background: COULEURS.marque,
          padding: `${size * 0.06}px ${size * 0.18}px`,
          borderRadius: size * 0.1,
          marginBottom: size * 0.22,
          transform: `scaleX(${bar})`,
          transformOrigin: portrait ? "center" : "left",
        }}
      >
        ÉTAPE {step}
      </div>
      <div
        style={{
          fontFamily: F,
          fontWeight: 900,
          fontSize: size,
          lineHeight: 1.05,
          color: COULEURS.texte,
          letterSpacing: -1,
          textShadow: "0 4px 24px rgba(30,20,10,0.55), 0 2px 4px rgba(30,20,10,0.4)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

/** Pictogramme téléphone / WhatsApp */
const PhoneIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#25D366" />
    <path
      d="M8.6 6.8c.3-.1.6 0 .8.3l1 1.8c.2.3.1.7-.1.9l-.7.7c.5 1.1 1.4 2 2.5 2.6l.7-.7c.3-.2.6-.3.9-.1l1.8 1c.3.2.4.5.3.8-.3 1.1-1.3 1.8-2.4 1.6-3.2-.6-5.7-3.1-6.3-6.3-.2-1.1.5-2.1 1.5-2.6z"
      fill="#fff"
    />
  </svg>
);

/** Carte finale : appel à l'action */
const EndCard: React.FC = () => {
  const t = useTime();
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const s0 = P.appel + 1.6;
  const a = prog(t, s0, s0 + 0.8, easeOut);
  if (a <= 0) return null;
  const logo = Math.max(0, springAt(t, s0 + 0.2, 6, 2.2));
  const line = (k: number) => prog(t, s0 + 0.35 + k * 0.18, s0 + 0.95 + k * 0.18, easeOut);
  const u = portrait ? 1 : width / 1920;
  const W = portrait ? width - 120 : 760 * u;
  const item = (k: number): React.CSSProperties => ({ opacity: line(k), transform: `translateY(${(1 - line(k)) * 20}px)` });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: portrait ? 60 : 100 * u,
          top: portrait ? undefined : "50%",
          bottom: portrait ? 170 : undefined,
          width: W,
          transform: portrait ? `translateY(${(1 - a) * 40}px)` : `translateY(-50%) translateX(${(1 - a) * -40}px)`,
          opacity: a,
          background: "rgba(22, 30, 24, 0.42)",
          backdropFilter: "blur(18px) saturate(1.2)",
          WebkitBackdropFilter: "blur(18px) saturate(1.2)",
          border: "1px solid rgba(255,255,255,0.22)",
          borderRadius: 34 * u,
          padding: `${54 * u}px ${56 * u}px`,
          boxShadow: "0 30px 80px rgba(20,10,0,0.35)",
          color: COULEURS.texte,
          fontFamily: F,
          display: "flex",
          flexDirection: "column",
          alignItems: portrait ? "center" : "flex-start",
          textAlign: portrait ? "center" : "left",
        }}
      >
        <div style={{ transform: `scale(${logo})`, opacity: Math.min(1, logo * 1.5), transformOrigin: portrait ? "center" : "left center" }}>
          <Logo size={120 * u} />
        </div>
        <div style={{ ...item(0), fontWeight: 900, fontSize: 64 * u, lineHeight: 1.05, marginTop: 30 * u, letterSpacing: -1 }}>{ENTREPRISE.nom}</div>
        <div style={{ ...item(1), fontWeight: 700, fontSize: 36 * u, color: COULEURS.marque, marginTop: 14 * u }}>{ENTREPRISE.slogan}</div>
        <div style={{ ...item(2), width: 90 * u, height: 5 * u, background: COULEURS.marque, borderRadius: 4, margin: `${30 * u}px 0` }} />
        <div style={{ ...item(2), fontWeight: 600, fontSize: 34 * u }}>{TEXTES.carteVille(ENTREPRISE.ville)}</div>
        <div
          style={{
            ...item(3),
            marginTop: 26 * u,
            display: "flex",
            alignItems: "center",
            gap: 18 * u,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 999,
            padding: `${14 * u}px ${30 * u}px ${14 * u}px ${16 * u}px`,
          }}
        >
          <PhoneIcon size={54 * u} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 20 * u, fontWeight: 600, opacity: 0.8, letterSpacing: 1 }}>{TEXTES.carteTel}</div>
            <div style={{ fontSize: 42 * u, fontWeight: 900, letterSpacing: 1 }}>{ENTREPRISE.telephone}</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Signature discrète en haut à gauche pendant le film */
const Corner: React.FC = () => {
  const t = useTime();
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const u = portrait ? 1 : width / 1920;
  const o = prog(t, 0.6, 1.4, easeOut) * (1 - prog(t, P.appel + 1.2, P.appel + 1.7));
  if (o <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 60 * u, top: portrait ? 90 : 56 * u, display: "flex", alignItems: "center", gap: 16 * u, opacity: o }}>
      <Logo size={64 * u} />
      <div style={{ fontFamily: F, fontWeight: 800, fontSize: 26 * u, color: "#fff", textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}>{ENTREPRISE.nom}</div>
    </div>
  );
};

export const Overlays: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    {/* légère vignette pour la lisibilité */}
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 80% at 50% 45%, rgba(0,0,0,0) 60%, rgba(40,20,5,0.28) 100%)" }} />
    <Corner />
    <Title text={TEXTES.plan1} step="01" a={0.8} b={fin("terrainBrut") - 0.1} />
    <Title text={TEXTES.plan3} step="02" a={P.terrassement + 0.3} b={fin("terrassement") - 0.1} />
    <Title text={TEXTES.plan4} step="03" a={P.bornage + 0.5} b={fin("bornage") - 0.2} />
    <Title text={TEXTES.plan5} step="04" a={P.viabilisation + 0.4} b={fin("viabilisation") - 0.2} />
    <Title text={TEXTES.plan6} step="05" a={P.quartier + 0.6} b={fin("quartier") - 0.1} />
    <EndCard />
  </AbsoluteFill>
);
