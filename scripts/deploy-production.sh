#!/bin/bash
set -euo pipefail

SERVER="appsvr@135.181.137.231"
cd "$(dirname "$0")/.."

echo "==> Building website..."
pnpm build

echo ""
echo "WARNING: This will replace the LIVE website at perioskoup.com"
read -p "Continue? (y/N) " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Aborted."
  exit 0
fi

echo "==> Deploying to WEB (production)..."
rsync -avz --delete dist/public/ "$SERVER:WEB/"

echo "==> Health check..."
sleep 2
curl -sf https://perioskoup.com > /dev/null 2>&1 \
  && echo "  Production: OK" \
  || echo "  Production: FAIL"

echo ""
echo "Production deploy complete: https://perioskoup.com"
