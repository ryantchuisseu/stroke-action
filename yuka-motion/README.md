# Yuka — pub explicative en motion design (Remotion)

Pub de 25 s en **9:16 (1080×1920)** et **16:9 (1920×1080)**, 30 fps : `out/yuka-9x16.mp4` et `out/yuka-16x9.mp4`.

| Temps | Séquence |
|---|---|
| 0–3 s | Accroche : un rayon de supermarché et la question « Que contient vraiment ce que vous achetez ? » |
| 3–5 s | **Étape 1 — Scannez** : le téléphone lit le code-barres d'un paquet de biscuits |
| 5–11 s | **Étape 2 — Comprenez** : fiche produit, note 18/100, additifs à éviter, calcul de la note (60 % nutrition, 30 % additifs, 10 % bio) |
| 11–15 s | Cosmétiques : scan d'un déodorant, niveau de risque de chaque ingrédient |
| 15–19 s | **Étape 3 — Choisissez mieux** : alternatives plus saines, l'une d'elles sort du téléphone |
| 19–22 s | Preuves : 80 millions d'utilisateurs, 100 % indépendante, zéro publicité |
| 22–25 s | Logo, accroche finale « Scannez. Comprenez. Choisissez mieux. », téléchargement |

**Les produits notés sont fictifs** (Croc'Choco, Fresh, Avéna, Natura…). Aucune vraie marque ne reçoit de note inventée.
Le logo et l'interface de l'app sont redessinés en code, d'après les captures publiques de l'App Store.
Les chiffres (80 millions d'utilisateurs, la répartition 60/30/10 de la note) viennent du site, de l'App Store et du centre d'aide de Yuka.

```bash
npm install
npm run dev                       # prévisualisation (Remotion Studio)
python3 scripts/soundtrack.py     # régénère la musique et les bruitages
npm run render                    # rend les deux formats
scripts/stills.sh 9x16 30 200     # images clés (numéros de frame)
```

Pour retoucher le rythme, modifiez les repères `T` dans `src/anim.ts`, puis reportez-les dans `scripts/soundtrack.py`.
