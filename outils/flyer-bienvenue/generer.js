#!/usr/bin/env node
/**
 * Génère le flyer de bienvenue Stroke Action (FR + EN, 1080 × 1350) pour un nouveau membre.
 *
 * Usage :  node outils/flyer-bienvenue/generer.js outils/flyer-bienvenue/membres/teffo.json
 * Sortie : outils/flyer-bienvenue/sortie/bienvenue-<slug>-fr.png et -en.png
 *
 * Besoins : Node + Playwright (Chromium) et une connexion internet (polices Google Fonts).
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const DIR = __dirname;
const LOGO = path.resolve(DIR, "../../public/logo.png");
const TEXTES = {
  fr: { mot: "BIENVENUE", devise: "Ensemble pour vaincre l’AVC" },
  en: { mot: "WELCOME", devise: "Together to defeat stroke" },
};

const echapper = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Texte saisi → HTML : « <br> » autorisé, [[r:…]] = surligné rouge, [[b:…]] = surligné bleu.
const enHtml = (s) =>
  echapper(s)
    .replace(/&lt;br\s*\/?&gt;/g, "<br>")
    .replace(/\[\[(r|b):([^\]]+)\]\]/g, (_, c, t) => `<mark class="${c}">${t}</mark>`);

async function main() {
  const fichier = process.argv[2];
  if (!fichier) {
    console.error("Usage : node outils/flyer-bienvenue/generer.js <fichier membre .json>");
    process.exit(1);
  }
  const membre = JSON.parse(fs.readFileSync(fichier, "utf8"));
  const photo = path.resolve(path.dirname(fichier), membre.photo);
  for (const f of [photo, LOGO]) if (!fs.existsSync(f)) throw new Error("Fichier introuvable : " + f);

  const modele = fs.readFileSync(path.join(DIR, "modele.html"), "utf8");
  fs.mkdirSync(path.join(DIR, "sortie"), { recursive: true });

  const navigateur = await chromium.launch();
  const page = await navigateur.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const langue of ["fr", "en"]) {
    const t = membre[langue];
    if (!t) continue;
    const html = modele
      .replace("{{LOGO}}", "file://" + LOGO)
      .replace("{{PHOTO}}", "file://" + photo)
      .replace("{{MOT}}", TEXTES[langue].mot)
      .replace("{{DEVISE}}", TEXTES[langue].devise)
      .replace("{{PRENOM}}", echapper(membre.prenom))
      .replace("{{NOM}}", echapper(membre.nom))
      .replace("{{NOTE}}", enHtml(t.note))
      .replace("{{ETIQUETTE1}}", echapper(t.etiquette1))
      .replace("{{ETIQUETTE2}}", echapper(t.etiquette2))
      .replace("{{BIO}}", enHtml(t.bio))
      .replace("<html>", `<html lang="${langue}">`);
    const tmp = path.join(DIR, "sortie", `.tmp-${langue}.html`);
    fs.writeFileSync(tmp, html);
    await page.goto("file://" + tmp, { waitUntil: "networkidle" });
    await page.waitForSelector("body[data-ready]");
    // Contrôle : la biographie ne doit pas toucher le bandeau du bas.
    const marge = await page.evaluate(() => 1350 - 72 - document.querySelector(".bio").getBoundingClientRect().bottom);
    if (marge < 10) console.warn(`⚠ ${langue} : biographie trop longue (${Math.round(marge)} px de marge) — raccourcir le texte.`);
    const sortie = path.join(DIR, "sortie", `bienvenue-${membre.slug}-${langue}.png`);
    await page.screenshot({ path: sortie });
    fs.unlinkSync(tmp);
    console.log("✓", path.relative(process.cwd(), sortie));
  }
  await navigateur.close();
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
