#!/bin/bash
# Réinstalle HyperFrames (CLI vidéo HTML) en global au démarrage d'une session cloud,
# car le conteneur est recréé à chaque session.
if ! command -v hyperframes >/dev/null 2>&1; then
  npm install -g hyperframes >/dev/null 2>&1 && echo "HyperFrames installé : $(hyperframes --version)"
fi
# Navigateur de rendu de HyperFrames (téléchargé une seule fois)
hyperframes browser ensure >/dev/null 2>&1 || true
exit 0
