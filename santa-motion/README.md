# SANTA & Co. — film motion design 3D isométrique

Publicité fictive de 47 s (1920×1080, 30 fps) qui présente le Père Noël comme une entreprise de logistique.
Tout est **dessiné par du code** (SVG + React avec [Remotion](https://www.remotion.dev)). Aucune image, aucun asset 3D, aucune banque de sons.

## Storyboard

| # | Scène | Durée | Ce qu'on voit |
|---|-------|-------|---------------|
| 0 | Intro | 4 s | Un cadeau tombe sur un îlot enneigé, s'ouvre, faisceau doré, logo |
| 1 | Centre de production | 7 s | L'usine se construit, tapis roulant, lutins, contrôle qualité, compteur 2,4 Md |
| 2 | Décollage | 5 s | Compte à rebours, piste lumineuse, l'attelage décolle avec une traînée d'étincelles |
| 3 | La tournée | 11 s | Survol d'une ville iso : itinéraire GPS, cadeaux dans les cheminées, maisons qui s'allument, dézoom sur 526 M de foyers |
| 4 | Le dernier mètre | 10 s | Vue en coupe : le toit s'envole, conduit en rayons X, descente, cadeaux sous le sapin qui s'illumine |
| 5 | Performance | 7 s | Barres 3D isométriques animées (KPI) |
| 6 | Outro | 6 s | Silhouette du traîneau devant la lune, signature de marque |

## Techniques

- **Moteur isométrique maison** (`src/lib/iso.tsx`) : projection 30°, solides convexes avec élimination des faces cachées, ombrage par normale, toits, plans 2D plaqués en iso (`IsoPlane`), caméra avec zoom et travellings, masques de découpe (enveloppe convexe).
- **Animation** : ressorts (`spring`), easings expo, chorégraphies décalées, compteurs, callouts, tri en profondeur par image.
- **Son** (`scripts/soundtrack.py`) : musique originale à 120 BPM synthétisée en numpy (cloches FM, célesta, grelots, basse, kick) + bruitages calés à l'image près.

## Commandes

```bash
npm install
npm run studio                      # aperçu interactif
python3 scripts/soundtrack.py       # régénère la bande-son
npm run render                      # -> out/santa-logistics.mp4
```

Dans un conteneur sans Chrome téléchargeable : `REMOTION_CHROME=/chemin/vers/chrome npm run render`.
