import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { DEBUT, PLANS } from "../config";

/** Temps courant en secondes, dérivé exclusivement de la frame Remotion. */
export const useTime = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

export const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const DRONE = Easing.bezier(0.45, 0, 0.15, 1);
export const easeOut = Easing.out(Easing.cubic);
export const easeIn = Easing.in(Easing.cubic);
export const easeInOut = Easing.inOut(Easing.cubic);

/** 0→1 entre a et b (secondes) */
export const prog = (t: number, a: number, b: number, ease: (x: number) => number = (x) => x) =>
  interpolate(t, [a, b], [0, 1], { ...CL, easing: ease });

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** Ressort amorti (rebond léger) en fonction du temps écoulé depuis start */
export const springAt = (t: number, start: number, damping = 7, freq = 2.2) => {
  const x = t - start;
  if (x <= 0) return 0;
  return 1 - Math.exp(-damping * x) * Math.cos(freq * Math.PI * 2 * x * 0.5);
};

/** Pseudo-aléatoire déterministe */
export const rnd = (seed: number) => {
  const s = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
};

export const P = DEBUT;
export const D = PLANS;
export const fin = (k: keyof typeof PLANS) => DEBUT[k] + PLANS[k];
