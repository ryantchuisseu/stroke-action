import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Polices variables embarquées (Fredoka pour l'affichage, Inter pour l'UI)
loadFont({ family: "Fredoka", url: staticFile("fonts/Fredoka.woff2"), weight: "300 700" });
loadFont({ family: "Inter", url: staticFile("fonts/Inter.woff2"), weight: "100 900" });

export const display = "Fredoka, sans-serif";
export const ui = "Inter, sans-serif";

export const COL = {
  night0: "#070b26",
  night1: "#121a4a",
  night2: "#24307a",
  snow: "#eef3ff",
  snowShade: "#c9d4f2",
  ice: "#8fc3ef",
  red: "#e63946",
  redDark: "#b3202c",
  green: "#1f8a64",
  greenDark: "#14634a",
  gold: "#ffc94a",
  goldDeep: "#f2a516",
  warm: "#ffd27a",
  window: "#2b3370",
  wood: "#a66a3f",
  earth: "#5a4466",
  ink: "#0e1235",
  white: "#ffffff",
};

export const HOUSE_COLORS = ["#e76f51", "#2a9d8f", "#e9c46a", "#f4a261", "#7fb069", "#c8553d", "#5e81ac", "#b56576", "#6d9dc5"];
