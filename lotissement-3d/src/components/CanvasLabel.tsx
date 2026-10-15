import * as THREE from "three";
import { POLICE } from "../config";

/** Vrai dès que la police est disponible (les textures sont alors régénérées). */
export const useFontReady = () => document.fonts.check(`800 64px ${POLICE.famille}`);

/** Texture texte dessinée dans un canvas 2D */
export const makeLabel = (
  lines: { text: string; size: number; weight?: number; color?: string }[],
  w = 512,
  h = 512,
  bg?: { color: string; radius: number },
) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  if (bg) {
    ctx.fillStyle = bg.color;
    ctx.beginPath();
    ctx.roundRect(0, 0, w, h, bg.radius);
    ctx.fill();
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const total = lines.reduce((s, l) => s + l.size * 1.15, 0);
  let y = h / 2 - total / 2;
  for (const l of lines) {
    y += (l.size * 1.15) / 2;
    ctx.font = `${l.weight ?? 800} ${l.size}px ${POLICE.famille}`;
    ctx.fillStyle = l.color ?? "#ffffff";
    ctx.fillText(l.text, w / 2, y);
    y += (l.size * 1.15) / 2;
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
};
