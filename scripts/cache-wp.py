#!/usr/bin/env python3
"""Cache WordPress REST API responses to content/.wp-cache/"""
import json
import os
import time
import urllib.request

BASE = "https://www.srzcadca.sk/wp-json/wp/v2"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CACHE = os.path.join(ROOT, "content", ".wp-cache")
UA = "srz-cadca-import/1.0"


def get(url, retries=6):
    last = None
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=180) as r:
                return r.read(), {k.lower(): v for k, v in r.headers.items()}
        except Exception as e:
            last = e
            print(f"retry {i+1} {url} -> {e}", flush=True)
            time.sleep(2 * (i + 1))
    raise last


def main():
    os.makedirs(CACHE, exist_ok=True)

    data, _ = get(f"{BASE}/categories?per_page=50")
    open(os.path.join(CACHE, "categories.json"), "wb").write(data)
    print("categories", len(json.loads(data)), flush=True)

    for endpoint, name in [("pages", "pages"), ("portfolio", "portfolio")]:
        data, headers = get(f"{BASE}/{endpoint}?per_page=100&_embed=1")
        open(os.path.join(CACHE, f"{name}.json"), "wb").write(data)
        print(name, len(json.loads(data)), flush=True)
        time.sleep(1)

    all_posts = []
    page = 1
    while page <= 20:
        path = os.path.join(CACHE, f"posts-{page}.json")
        if os.path.exists(path) and os.path.getsize(path) > 200:
            chunk = json.load(open(path))
            print("cached posts page", page, len(chunk), flush=True)
        else:
            url = f"{BASE}/posts?per_page=20&page={page}&_embed=1"
            print("fetch", url, flush=True)
            data, headers = get(url)
            open(path, "wb").write(data)
            chunk = json.loads(data)
            print(
                "posts page",
                page,
                "items",
                len(chunk),
                "totalPages",
                headers.get("x-wp-totalpages"),
                flush=True,
            )
        if not chunk:
            break
        all_posts.extend(chunk)
        if len(chunk) < 20:
            break
        page += 1
        time.sleep(1.5)

    json.dump(
        all_posts,
        open(os.path.join(CACHE, "posts-all.json"), "w"),
        ensure_ascii=False,
    )
    print("TOTAL POSTS", len(all_posts), flush=True)


if __name__ == "__main__":
    main()
