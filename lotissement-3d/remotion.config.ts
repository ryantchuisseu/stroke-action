import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setOverwriteOutput(true);
// WebGL logiciel (SwiftShader) : fonctionne sur toute machine, même sans GPU.
// Sur une machine avec GPU, remplacez par "angle" pour un rendu plus rapide.
Config.setChromiumOpenGlRenderer("swangle");
if (process.env.REMOTION_CHROME) Config.setBrowserExecutable(process.env.REMOTION_CHROME);
