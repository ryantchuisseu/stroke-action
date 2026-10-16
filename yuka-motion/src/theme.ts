import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

for (const w of ["500", "600", "700", "800"]) loadFont({ family: "Poppins", url: staticFile(`fonts/Poppins-${w}.woff2`), weight: w });
loadFont({ family: "Inter", url: staticFile("fonts/Inter.woff2"), weight: "100 900" });

export const DISPLAY = "Poppins, sans-serif";
export const UI = "Inter, sans-serif";

export const C = {
  green: "#3fb56a",
  greenDeep: "#2a9a55",
  greenDark: "#1d7a40",
  mint: "#e8f7ee",
  excellent: "#1f9d4c",
  bon: "#7cc243",
  mediocre: "#f08c1a",
  mauvais: "#e5432f",
  yellow: "#f2c12e",
  ink: "#1c2421",
  grey: "#6b7672",
  line: "#eceeed",
  bg: "#f6f8f7",
  white: "#ffffff",
  carrot: "#f58a2c",
};

export const scoreColor = (s: number) => (s >= 75 ? C.excellent : s >= 50 ? C.bon : s >= 25 ? C.mediocre : C.mauvais);
export const scoreLabel = (s: number) => (s >= 75 ? "Excellent" : s >= 50 ? "Bon" : s >= 25 ? "Médiocre" : "Mauvais");
