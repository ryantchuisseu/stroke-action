import React from "react";
import { Composition } from "remotion";
import { DUREE_TOTALE, FPS } from "./config";
import { Lotissement } from "./Video";
import "./lib/fonts";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Lotissement-16x9" component={Lotissement} durationInFrames={Math.round(DUREE_TOTALE * FPS)} fps={FPS} width={1920} height={1080} />
    <Composition id="Lotissement-9x16" component={Lotissement} durationInFrames={Math.round(DUREE_TOTALE * FPS)} fps={FPS} width={1080} height={1920} />
  </>
);
