import React from "react";
import { Composition } from "remotion";
import { SantaLogistics, TOTAL } from "./Video";
import { S1Intro } from "./scenes/S1Intro";
import { S2Factory } from "./scenes/S2Factory";
import { S3Takeoff } from "./scenes/S3Takeoff";
import { S4City } from "./scenes/S4City";
import { S5Chimney } from "./scenes/S5Chimney";
import { S6Kpi } from "./scenes/S6Kpi";
import { S7Outro } from "./scenes/S7Outro";

const scenes: [string, React.FC, number][] = [
  ["S1", S1Intro, 120],
  ["S2", S2Factory, 210],
  ["S3", S3Takeoff, 150],
  ["S4", S4City, 330],
  ["S5", S5Chimney, 300],
  ["S6", S6Kpi, 210],
  ["S7", S7Outro, 180],
];

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="SantaLogistics" component={SantaLogistics} durationInFrames={TOTAL} fps={30} width={1920} height={1080} />
    {scenes.map(([id, C, d]) => (
      <Composition key={id} id={id} component={C} durationInFrames={d} fps={30} width={1920} height={1080} />
    ))}
  </>
);
