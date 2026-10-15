import { useThree } from "@react-three/fiber";
import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import { useVideoConfig } from "remotion";
import { BLADE, dozerAt, IMPACT_T, MAIN_Z } from "../lib/layout";
import { DRONE, fin, lerp, P, prog } from "../lib/timeline";

/** Pose drone : cible + coordonnées sphériques (degrés) */
export type Pose = { tx: number; ty: number; tz: number; az: number; el: number; dist: number };

const mixPose = (a: Pose, b: Pose, k: number): Pose => ({
  tx: lerp(a.tx, b.tx, k),
  ty: lerp(a.ty, b.ty, k),
  tz: lerp(a.tz, b.tz, k),
  az: lerp(a.az, b.az, k),
  el: lerp(a.el, b.el, k),
  dist: Math.exp(lerp(Math.log(a.dist), Math.log(b.dist), k)),
});
const pose = (tx: number, ty: number, tz: number, az: number, el: number, dist: number): Pose => ({ tx, ty, tz, az, el, dist });


/** Chaque plan : sa propre trajectoire (portrait = format 9:16) */
const PLANS: [number, (t: number, portrait: boolean) => Pose][] = [
  // 1 — survol drone descendant
  [
    P.terrainBrut,
    (t) => {
      const k = prog(t, 0, fin("terrainBrut") + 0.6, DRONE);
      return pose(0, 0, 0, lerp(-25, 12, k), lerp(64, 36, k), lerp(170, 70, k));
    },
  ],
  // 2 — le bulldozer : zoom rapide, travelling latéral, gros plan lame, dézoom
  [
    P.bulldozer,
    (t) => {
      const d = dozerAt(t);
      const follow = pose(d.x + 1.2, 1.1, d.z, 22, 15, 15);
      const close = pose(d.x + BLADE - 0.2, 0.8, d.z, 42, 20, 7.5);
      const wide = pose(d.x + 2, 1, d.z - 4, 14, 30, 34);
      const c = prog(t, P.bulldozer + 3.9, P.bulldozer + 4.4, DRONE) * (1 - prog(t, P.bulldozer + 5.3, P.bulldozer + 5.9, DRONE));
      const w = prog(t, P.bulldozer + 5.6, fin("bulldozer") + 0.3, DRONE);
      let p = mixPose(follow, close, c);
      p = mixPose(p, wide, w);
      return p;
    },
  ],
  // 3 — terrassement : vue aérienne
  [
    P.terrassement,
    (t, portrait) => {
      const k = prog(t, P.terrassement, fin("terrassement"), DRONE);
      return pose(0, 0, 0, lerp(18, -4, k) + (portrait ? 90 : 0), 58, 82);
    },
  ],
  // 4 — bornage : plongée zénithale qui tourne lentement
  [
    P.bornage,
    (t, portrait) => {
      const k = prog(t, P.bornage, fin("bornage"), (x) => x);
      return pose(0, 0, 0, lerp(-4, 30, k) + (portrait ? 90 : 0), 86, 80);
    },
  ],
  // 5 — viabilisation
  [
    P.viabilisation,
    (t, portrait) => {
      const k = prog(t, P.viabilisation, fin("viabilisation"), DRONE);
      return pose(0, 0, MAIN_Z, lerp(32, 62, k) + (portrait ? 30 : 0), lerp(55, 44, k), 62);
    },
  ],
  // 6 — le quartier prend vie : orbite descendante
  [
    P.quartier,
    (t) => {
      const k = prog(t, P.quartier, fin("quartier") + 0.5, DRONE);
      return pose(0, 0, MAIN_Z, lerp(62, 165, k), lerp(38, 21, k), lerp(56, 40, k));
    },
  ],
  // 7 — appel à l'action : la caméra monte et s'éloigne
  [
    P.appel,
    (t, portrait) => {
      const k = prog(t, P.appel, fin("appel"), DRONE);
      // décale le lotissement à droite (16:9) ou vers le haut (9:16) pour laisser la place à la carte finale
      const sx = portrait ? -6 : 15;
      const sz = portrait ? -13 : 0;
      return pose(lerp(0, sx, k), 0, lerp(MAIN_Z, MAIN_Z + sz, k), lerp(165, 192, k), lerp(21, 52, k), lerp(40, portrait ? 66 : 82, k));
    },
  ],
];

const BLEND = 0.75; // demi-durée des raccords entre plans (s)

export const cameraPose = (t: number, portrait: boolean): Pose => {
  let p = PLANS[0][1](t, portrait);
  for (let i = 1; i < PLANS.length; i++) {
    const b = PLANS[i][0];
    const w = prog(t, b - BLEND, b + BLEND, DRONE);
    if (w <= 0) break;
    p = mixPose(p, PLANS[i][1](t, portrait), w);
  }
  return p;
};

/** Position caméra + cible dans le monde (sert aussi à masquer les plantes gênantes) */
export const cameraWorld = (t: number, portrait: boolean) => {
  const p = cameraPose(t, portrait);
  const az = THREE.MathUtils.degToRad(p.az);
  const el = THREE.MathUtils.degToRad(p.el);
  const dist = p.dist * (portrait ? 1.22 : 1);
  return {
    pos: [p.tx + dist * Math.cos(el) * Math.sin(az), p.ty + dist * Math.sin(el), p.tz + dist * Math.cos(el) * Math.cos(az)] as [number, number, number],
    target: [p.tx, p.ty, p.tz] as [number, number, number],
  };
};

export const CameraRig: React.FC<{ t: number }> = ({ t }) => {
  const { camera } = useThree();
  const { width, height } = useVideoConfig();
  const portrait = height > width;

  useLayoutEffect(() => {
    const p = cameraPose(t, portrait);
    const az = THREE.MathUtils.degToRad(p.az);
    const el = THREE.MathUtils.degToRad(p.el);
    const dist = p.dist * (portrait ? 1.22 : 1);
    // petit rebond caméra à l'impact de la lame
    const dt = t - IMPACT_T;
    const bump = dt > 0 ? Math.exp(-dt * 7) * Math.sin(dt * 38) * 0.22 : 0;
    camera.position.set(
      p.tx + dist * Math.cos(el) * Math.sin(az),
      p.ty + dist * Math.sin(el) + bump,
      p.tz + dist * Math.cos(el) * Math.cos(az),
    );
    camera.lookAt(p.tx, p.ty + bump * 0.5, p.tz);
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = portrait ? 58 : 38;
    cam.near = 0.3;
    cam.far = 900;
    cam.updateProjectionMatrix();
  });
  return null;
};
