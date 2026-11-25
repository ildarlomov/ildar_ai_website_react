#!/usr/bin/env bash
# Ping IndexNow (Bing, Yandex, Seznam…) with every URL in the live sitemap.
# Run after a deploy that adds or changes pages:  bash scripts/indexnow.sh
# The key is public by design: it must be served at https://www.ildarlomov.com/<key>.txt (public/).
set -euo pipefail
KEY="2abfb29b8cc7d84a5855a9dd7e38a5ae"
HOST="www.ildarlomov.com"
URLS=$(curl -s "https://$HOST/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed -e 's/<loc>//' -e 's/<\/loc>//' | sort -u)
JSON=$(printf '%s\n' $URLS | python3 -c 'import json,sys; print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))')
echo "Submitting $(echo "$URLS" | wc -l | tr -d ' ') URLs"
curl -s -o /dev/null -w "IndexNow: HTTP %{http_code}\n" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEY.txt\",\"urlList\":$JSON}"
