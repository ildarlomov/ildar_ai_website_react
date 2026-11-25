#!/usr/bin/env python3
"""GEO check in DeepSeek's own search engine (Search API, ~$0.75 / 1000 queries).

For each query prints where www.ildarlomov.com ranks, with DeepSeek's own scores:
authority (0-4, -1 unknown) and rerank_score (>= 1.5 = good). Key: ~/.config/deepseek/api_key.
Run:  python3 scripts/deepseek_geo.py
"""
import json, os, sys, urllib.request

KEY = open(os.path.expanduser("~/.config/deepseek/api_key")).read().strip()
DOMAIN = "ildarlomov.com"
QUERIES = [
    "site:ildarlomov.com",
    "Ильдар Ломов",
    "Ildar Lomov",
    "ildarlomov.com",
    "настройка персонального ИИ-агента под ключ",
    "разработчик Telegram-ботов и ИИ-агентов",
]


def search(q, count=20):
    req = urllib.request.Request(
        "https://api.deepseek.com/v1/tools/search",
        data=json.dumps({"query": q, "count": count, "need_content": False}).encode(),
        headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def items(resp):
    # The exact response shape is not documented for us yet: take the first list of dicts with a url.
    if isinstance(resp, list):
        return resp
    for k in ("results", "data", "items", "web_pages", "value"):
        v = resp.get(k) if isinstance(resp, dict) else None
        if isinstance(v, list):
            return v
        if isinstance(v, dict):
            inner = items(v)
            if inner:
                return inner
    return []


for q in QUERIES:
    try:
        resp = search(q)
    except urllib.error.HTTPError as e:
        print(f"{q!r}: HTTP {e.code} {e.read()[:200]!r}")
        sys.exit(1)
    rows = items(resp)
    ours = [(i + 1, r) for i, r in enumerate(rows) if DOMAIN in str(r.get("url", ""))]
    print(f"\n== {q}  ({len(rows)} results)")
    if not rows:
        print("   raw:", json.dumps(resp, ensure_ascii=False)[:400])
    for pos, r in ours:
        print(f"   #{pos} {r.get('url')}  authority={r.get('authority')}  rerank={r.get('rerank_score')}")
    if rows and not ours:
        print("   not in results; top 3:", [r.get("url") for r in rows[:3]])
