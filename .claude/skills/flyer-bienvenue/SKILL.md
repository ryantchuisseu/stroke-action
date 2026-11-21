---
name: flyer-bienvenue
description: Crée le flyer / post de bienvenue Stroke Action (FR + EN, 1080×1350) pour un nouveau membre, à partir de sa photo et de sa biographie, avec le modèle validé. À utiliser dès qu'on parle de post de bienvenue, flyer de bienvenue, visuel pour un nouveau membre ou « welcome post ».
---

# Flyer de bienvenue Stroke Action

Le modèle validé par le Dr Kamtchum est dans `outils/flyer-bienvenue/` (voir `LISEZ-MOI.md`). Ne pas changer le design sans demande explicite : toujours réutiliser `modele.html`.

## Étapes

1. Photo du membre → `outils/flyer-bienvenue/membres/photos/<slug>.jpg`, recadrée en carré (Pillow), visage et tête entière visibles. Si la photo est une capture d'écran, retirer l'interface (heure, bordures).
2. Copier `membres/_modele.json` en `membres/<slug>.json` et le remplir à partir de la biographie :
   - `bio` FR et EN de 3 à 4 phrases, en reprenant les faits de la biographie fournie, sans rien inventer ;
   - 2 à 3 mots clés surlignés : `[[r:…]]` (rouge) et `[[b:…]]` (bleu) ;
   - `note` manuscrite courte (« notre nouveau membre ! », « notre nouvelle chercheure ! »…), accordée au genre de la personne seulement si la biographie l'indique.
3. Générer : `node outils/flyer-bienvenue/generer.js outils/flyer-bienvenue/membres/<slug>.json`
4. Regarder les deux PNG de `outils/flyer-bienvenue/sortie/`. Si un avertissement de longueur apparaît, raccourcir la bio et relancer.
5. Envoyer les visuels à l'utilisateur avec des légendes FR/EN pour LinkedIn, Facebook, Instagram, et rappeler que le Dr Kamtchum doit valider avant publication.
6. Committer la fiche `.json` et la photo (pas le dossier `sortie/`, ignoré par git).
