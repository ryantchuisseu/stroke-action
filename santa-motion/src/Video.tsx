import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { linearTiming, TransitionPresentation, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { S1Intro } from "./scenes/S1Intro";
import { S2Factory } from "./scenes/S2Factory";
import { S3Takeoff } from "./scenes/S3Takeoff";
import { S4City } from "./scenes/S4City";
import { S5Chimney } from "./scenes/S5Chimney";
import { S6Kpi } from "./scenes/S6Kpi";
import { S7Outro } from "./scenes/S7Outro";

const T = 15; // durée des transitions (frames)
const SCENES: [React.FC, number][] = [
  [S1Intro, 120],
  [S2Factory, 210],
  [S3Takeoff, 150],
  [S4City, 330],
  [S5Chimney, 300],
  [S6Kpi, 210],
  [S7Outro, 180],
];
export const TOTAL = SCENES.reduce((s, [, d]) => s + d, 0) - T * (SCENES.length - 1);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transitionFor = (i: number): TransitionPresentation<any> =>
  i === 2 ? wipe({ direction: "from-bottom-left" }) : i === 3 ? wipe({ direction: "from-top" }) : fade();

export const SantaLogistics: React.FC = () => (
  <AbsoluteFill style={{ background: "#070b26" }}>
    <TransitionSeries>
      {SCENES.flatMap(([C, d], i) => {
        const nodes = [
          <TransitionSeries.Sequence key={`s${i}`} durationInFrames={d}>
            <C />
          </TransitionSeries.Sequence>,
        ];
        if (i < SCENES.length - 1)
          nodes.push(
            <TransitionSeries.Transition key={`t${i}`} presentation={transitionFor(i)} timing={linearTiming({ durationInFrames: T })} />,
          );
        return nodes;
      })}
    </TransitionSeries>
    <Audio src={staticFile("audio/soundtrack.wav")} />
  </AbsoluteFill>
);
