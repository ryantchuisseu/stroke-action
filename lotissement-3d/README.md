# Lotissement 3D — vidéo promotionnelle (Remotion + React Three Fiber)

Vidéo de 45 s, 30 fps, en **16:9 (1920×1080)** et **9:16 (1080×1920)**.
Elle montre en 7 plans la transformation *brousse → terrain terrassé → lots bornés → voirie et réseaux → quartier habité*.

## Lancer

```bash
npm install
npm run dev            # prévisualisation dans Remotion Studio
npm run render         # rend les deux formats
npm run render:16x9    # -> out/lotissement.mp4
npm run render:9x16    # -> out/lotissement-9x16.mp4
```

## Tout modifier sans toucher à la 3D : `src/config.ts`

| Pour changer… | Clé dans `config.ts` |
|---|---|
| Nom, initiales du logo, ville, téléphone, slogan | `ENTREPRISE` |
| Titres de chaque plan, « DISPONIBLE », « Lot », « 500 m² » | `TEXTES` |
| Couleurs (vert, latérite, sable, ciel, jaune de la marque, toits…) | `COULEURS` |
| Durée de chaque plan (en secondes) | `PLANS` (la durée totale se recalcule) |
| Taille de la grille, lot mis en avant à la fin | `LOTISSEMENT` |
| Police | `POLICE` (fichier dans `public/fonts/`) |
| Musique | `AUDIO` |

## Musique (optionnelle)

Déposez `public/music.mp3`. Si le fichier est absent, la vidéo se rend quand même, sans son.

## Remarques techniques

- Toutes les animations dépendent uniquement de `useCurrentFrame()`, sans `requestAnimationFrame`. Le rendu est donc identique d'une fois à l'autre.
- Toutes les géométries sont low-poly et construites en code (aucun fichier `.glb`). Herbes, arbres, palmes, bornes, maisons, clôtures et lampadaires utilisent `InstancedMesh`.
- Composants (dossier `src/components/`) : `Terrain`, `Vegetation`, `Bulldozer`, `Bornes`, `Lots`, `Routes`, `Maisons`, `CameraRig`, `Overlays`.
- Le rendu utilise le WebGL logiciel (`swangle`, dans `remotion.config.ts`) pour fonctionner sur n'importe quelle machine. Sur un PC équipé d'une carte graphique, remplacez par `"angle"` pour un rendu bien plus rapide.
- Si Chrome ne peut pas être téléchargé, indiquez un navigateur existant : `REMOTION_CHROME=/chemin/vers/chrome npm run render`.
- Pour générer des images clés : `scripts/stills.sh 16x9 6.5 9.4 25` (format, puis les temps en secondes).
