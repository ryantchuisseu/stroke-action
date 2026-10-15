#!/bin/bash
# Aperçu d'images clés : scripts/stills.sh 16x9 6.5 9.5   (temps en secondes)
export REMOTION_CHROME=${REMOTION_CHROME:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}
fmt=$1; shift
for s in "$@"; do
  fr=$(python3 -c "print(round($s*30))")
  npx remotion still "Lotissement-$fmt" "out/${fmt}_${s}.png" --frame="$fr" --scale=0.5 2>&1 | grep -iE "error|✗|failed" | head -5
done
