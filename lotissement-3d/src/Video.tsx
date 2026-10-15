import { ThreeCanvas } from "@remotion/three";
import React from "react";
import * as THREE from "three";
import { AbsoluteFill, Audio, getStaticFiles, staticFile, useVideoConfig } from "remotion";
import { AUDIO, COULEURS } from "./config";
import { Overlays } from "./components/Overlays";
import { Scene } from "./components/Scene";

/** La musique est optionnelle : si public/music.mp3 est absent, on rend sans son. */
const hasMusic = () => {
  try {
    return getStaticFiles().some((f) => f.name === AUDIO.fichier);
  } catch {
    return false;
  }
};

export const Lotissement: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(to bottom, #6fa6d6 0%, ${COULEURS.ciel} 38%, #f3d2b0 72%, ${COULEURS.peche} 100%)`,
      }}
    >
      <ThreeCanvas
        width={width}
        height={height}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        camera={{ fov: 38, near: 0.3, far: 900, position: [0, 80, 120] }}
      >
        <Scene />
      </ThreeCanvas>
      <Overlays />
      {hasMusic() && <Audio src={staticFile(AUDIO.fichier)} volume={AUDIO.volume} />}
    </AbsoluteFill>
  );
};
