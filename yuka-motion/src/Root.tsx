import React from "react";
import { Composition } from "remotion";
import { T } from "./anim";
import { YukaAd } from "./Video";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Yuka-9x16" component={YukaAd} durationInFrames={T.end} fps={30} width={1080} height={1920} />
    <Composition id="Yuka-16x9" component={YukaAd} durationInFrames={T.end} fps={30} width={1920} height={1080} />
  </>
);
