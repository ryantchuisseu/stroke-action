# Flyer de bienvenue — nouveaux membres

Modèle officiel du post de bienvenue Stroke Action (version 7, validée).
Format **1080 × 1350** (Instagram, Facebook, LinkedIn), en **français et en anglais**.

Ce dossier n'est **pas publié** sur le site : seuls `public/` et `src/` le sont.

## Pour un nouveau membre

1. **Photo** : déposer la photo dans `membres/photos/` (format carré de préférence, visage bien visible, tête entière).
2. **Fiche** : copier `membres/_modele.json` en `membres/<nom>.json` et remplir :
   - `prenom`, `nom` (le nom de famille apparaît en blanc sur le bandeau rouge)
   - `note` : petite phrase manuscrite à côté de la photo (`<br>` pour aller à la ligne)
   - `etiquette1` (étiquette bleue) et `etiquette2` (étiquette en contour)
   - `bio` : 3 à 4 phrases. Mots clés surlignés : `[[r:texte]]` en rouge, `[[b:texte]]` en bleu
3. **Générer** depuis la racine du projet :

   ```bash
   node outils/flyer-bienvenue/generer.js outils/flyer-bienvenue/membres/<nom>.json
   ```

4. Les visuels sont dans `outils/flyer-bienvenue/sortie/` : `bienvenue-<nom>-fr.png` et `-en.png`.
5. **Faire valider par le Dr Kamtchum avant publication.**

Si la biographie est trop longue, le script affiche un avertissement : raccourcir le texte.

## Avec Claude

Il suffit de dire : « Fais le flyer de bienvenue pour [nom] » en envoyant la photo et la biographie.
Claude remplit la fiche et génère les visuels avec ce modèle.

## Charte

- Bleu Stroke Action `#2A9DF4`, rouge `#F42A2A`, bleu nuit `#0b1d36`
- Polices : Anton (« BIENVENUE »), Archivo (textes), Caveat (note manuscrite)
- Exemple : `membres/teffo.json` (Mme Hornela TEFFO)
