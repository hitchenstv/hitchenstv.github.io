#!/usr/bin/env bash
# Rebuild the WASM artifacts (re-bake the mapping CSVs into the binary) and
# stage them under web/pkg/. Run this after every mapping update.
#
# Requires: cargo, rustup target add wasm32-unknown-unknown, wasm-pack.
# Rust deps install notes in the project root README.

set -euo pipefail

cd "$(dirname "$0")/.."

# Sanity: mappings must exist.
for f in SpellName.mapping.csv ItemSearchName.mapping.csv ZoneName.mapping.csv EncounterName.mapping.csv; do
  if [[ ! -s mappings/$f ]]; then
    echo "mappings/$f is missing or empty — run build_mappings.py first." >&2
    exit 1
  fi
done

echo "==> Cleaning old build"
rm -rf web/wapatcher
mkdir -p web/wapatcher

echo "==> Building WASM with mappings baked in…"
wasm-pack build wa-patcher --out-dir ../web/wapatcher --target web --release --features wasm

echo "==> Done. Static site is web/index.html."
echo "    To preview:  cd web && python3 -m http.server 8000"
