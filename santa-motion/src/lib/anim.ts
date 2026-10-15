import { Easing, interpolate, spring } from "remotion";

export const FPS = 30;
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Progression 0→1 entre start et start+dur, avec easing. */
export const prog = (f: number, start: number, dur: number, ease: (t: number) => number = Easing.inOut(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { ...CL, easing: ease });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const range = (f: number, input: number[], output: number[], ease?: (t: number) => number) =>
  interpolate(f, input, output, { ...CL, easing: ease });

/** Ressort « pop » typique motion design (léger dépassement). */
export const pop = (f: number, start: number, damping = 11, stiffness = 140) =>
  spring({ frame: f - start, fps: FPS, config: { damping, stiffness, mass: 0.7 } });

export const smooth = (f: number, start: number) =>
  spring({ frame: f - start, fps: FPS, config: { damping: 200 } });

export const easeOut = Easing.out(Easing.cubic);
export const easeIn = Easing.in(Easing.cubic);
export const easeInOut = Easing.inOut(Easing.cubic);
export const expoOut = Easing.out(Easing.exp);
export const expoInOut = Easing.inOut(Easing.exp);
export const backOut = Easing.out(Easing.back(1.6));

/** Pseudo-aléatoire déterministe */
export const rnd = (seed: number) => {
  const s = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
};
