#!/bin/bash
# Aperçu d'images clés : scripts/stills.sh 9x16 30 150 200   (numéros de frame)
export REMOTION_CHROME=${REMOTION_CHROME:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}
fmt=$1; shift
for fr in "$@"; do
  npx remotion still "Yuka-$fmt" "out/${fmt}_${fr}.png" --frame="$fr" --scale=0.5 2>&1 | grep -iE "error|✗" | head -5
done
