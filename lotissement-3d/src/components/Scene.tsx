import React from "react";
import * as THREE from "three";
import { COULEURS } from "../config";
import { fin, P, prog, useTime } from "../lib/timeline";
import { Bornes } from "./Bornes";
import { Bulldozer } from "./Bulldozer";
import { Lots } from "./Lots";
import { Maisons } from "./Maisons";
import { Routes } from "./Routes";
import { CameraRig } from "./CameraRig";
import { Terrain } from "./Terrain";
import { Vegetation } from "./Vegetation";

const SUN_DAY = new THREE.Color("#ffdcae");
const SUN_GOLD = new THREE.Color("#ffb46b");

export const Scene: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const t = useTime();
  // le soleil se réchauffe pendant le plan 6
  const g = prog(t, P.quartier, fin("appel"));
  const sun = SUN_DAY.clone().lerp(SUN_GOLD, g);
  return (
    <>
      <CameraRig t={t} />
      <fog attach="fog" args={[COULEURS.peche, 120, 420]} />
      <hemisphereLight args={[COULEURS.ciel, "#7a6a45", 1.25]} />
      <ambientLight intensity={0.3} color="#ffe6cc" />
      <directionalLight
        position={[-70, 45 - g * 12, 40]}
        intensity={3.4}
        color={sun}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-55}
        shadow-camera-right={55}
        shadow-camera-top={55}
        shadow-camera-bottom={-55}
        shadow-camera-near={1}
        shadow-camera-far={260}
        shadow-bias={-0.0004}
        shadow-normalBias={0.04}
      />
      <Terrain />
      <Vegetation />
      <Bulldozer />
      <Bornes />
      <Lots />
      <Routes />
      <Maisons />
      {children}
    </>
  );
};
