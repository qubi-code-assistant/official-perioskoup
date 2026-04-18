#!/bin/bash
set -euo pipefail

SERVER="appsvr@135.181.137.231"
cd "$(dirname "$0")/.."

echo "==> Building website..."
pnpm build

echo "==> Deploying to STAGING..."
rsync -avz --delete dist/public/ "$SERVER:STAGING/"

echo "==> Health check..."
sleep 2
curl -sf https://staging.perioskoup.com > /dev/null 2>&1 \
  && echo "  Staging: OK" \
  || echo "  Staging: FAIL"

echo ""
echo "Staging deploy complete: https://staging.perioskoup.com"
