# Stroke Action — « Chaque seconde compte » (HyperFrames)

Vidéo de présentation en motion design, 46 s, 1920×1080, 30 fps : `out/strokeaction-chaque-seconde-compte.mp4`.

| Temps | Scène |
|---|---|
| 0–5 s | L'urgence : 1 900 000 neurones perdus par minute, battement de cœur, tracé ECG |
| 5–9 s | Typo géante : « Chaque / seconde / compte. » |
| 9–14 s | L'AVC en chiffres : 12 M/an, 1 sur 4, 80 % évitables, 2ᵉ cause de mortalité |
| 14–19 s | La marque : logo, « Ensemble pour vaincre l'AVC », à qui s'adresse l'association |
| 19–25 s | Les 4 piliers (Éducation, Recherche, Formation, Soutien) + rappel FAST |
| 25–30 s | Le livre « Tout savoir sur l'AVC » du Dr Kamtchum (FR/EN, 1er octobre 2026) |
| 30–35 s | Le bureau exécutif (5 membres) + les autres membres |
| 35–41 s | Le site strokeaction.org qui défile, clic sur « Devenir membre » |
| 41–46 s | Abonnez-vous : réseaux sociaux, @strokeactionavc, carte de fin |

Style : charte du site (papier ivoire, Poppins, bleu #2A9DF4 / #1668A8, rouge #F42A2A, mots surlignés, annotations manuscrites Caveat), avec le cadre éditorial (HUD, timecode, barre de progression) des vidéos d'inspiration.

```bash
python3 scripts/soundtrack.py   # régénère la musique
npx hyperframes check           # contrôle qualité (contraste, chevauchements, mise en page)
npx hyperframes render -o out/strokeaction-chaque-seconde-compte.mp4 -q high
```
