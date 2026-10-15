#!/bin/bash
# usage: scripts/stills.sh S2 20 90 180
export REMOTION_CHROME=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
comp=$1; shift
for fr in "$@"; do
  npx remotion still "$comp" "out/${comp}_${fr}.png" --frame="$fr" --scale=0.5 2>&1 | grep -E "Error|error|✗" | head -5
done
