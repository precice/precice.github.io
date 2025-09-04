import json, time, sys, pathlib, re
from urllib.parse import urljoin
import requests

BASE = "https://precice.discourse.group"
HEADERS = {
    "User-Agent": "precice-forum-sync/1.0",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
}

def get(url, max_retries=5):
    """GET JSON with retries, redirect support, and good error messages."""
    backoff = 0.8
    for attempt in range(1, max_retries + 1):
        r = requests.get(url, headers=HEADERS, timeout=30, allow_redirects=True)
        ct = r.headers.get("Content-Type", "")
        if r.status_code == 429:
            # Discourse rate limit -> wait and retry
            wait = int(r.headers.get("Retry-After", 3)) or 3
            time.sleep(wait)
            continue
        if r.ok and "application/json" in ct.lower():
            return r.json()
        # sometimes Discourse serves JSON with charset, still fine if it contains 'application/json'
        if r.ok and ct.lower().startswith("application/json"):
            return r.json()
        # Non-JSON or error -> log a helpful snippet and retry/backoff
        snippet = (r.text or "")[:250].replace("\n", " ")
        if attempt == max_retries:
            raise RuntimeError(f"GET {url} failed: status={r.status_code}, content-type={ct}, body[:250]={snippet}")
        time.sleep(backoff)
        backoff *= 1.6


def fetch_categories():
    data = get(urljoin(BASE, "/categories.json"))
    return [{"id": c["id"], "name": c["name"], "slug": c["slug"]}
            for c in data.get("category_list", {}).get("categories", [])
            if c.get("id") and c.get("slug")]

def fetch_category_topics(cat):
    topics, next_url = [], f"/c/{cat['slug']}/{cat['id']}.json"
    while next_url:
        data = get(urljoin(BASE, next_url))
        tl = data.get("topic_list", {})
        topics.extend(tl.get("topics", []))
        next_url = tl.get("more_topics_url")
        time.sleep(0.2)
    return topics

def fetch_topic_full(topic_id):
    data = get(urljoin(BASE, f"/t/{topic_id}.json"))
    t = {
        "id": data.get("id"),
        "title": data.get("title"),
        "slug": data.get("slug"),
        "created_at": data.get("created_at"),
        "last_posted_at": data.get("last_posted_at"),
        "posts_count": data.get("posts_count"),
        "views": data.get("views"),
        "like_count": data.get("like_count"),
        "tags": data.get("tags", []),
        "category_id": data.get("category_id"),
        "fancy_title": data.get("fancy_title"),
        "archived": data.get("archived"),
        "closed": data.get("closed"),
        "pinned": data.get("pinned"),
        "url": urljoin(BASE, f"/t/{data.get('slug')}/{data.get('id')}"),
        "first_post_excerpt": None,
        "participants": [],
    }
    posts = data.get("post_stream", {}).get("posts", [])
    if posts:
        cooked = posts[0].get("cooked", "")
        excerpt = re.sub("<[^<]+?>", "", cooked)
        t["first_post_excerpt"] = excerpt[:400].strip()
    users = {u["id"]: u for u in data.get("details", {}).get("participants", [])}
    t["participants"] = [{"id": u["id"], "username": u["username"], "name": u.get("name")} for u in users.values()]
    return t

def main():
    repo_root = pathlib.Path(__file__).resolve().parents[1]
    out_path = repo_root / "assets" / "data" / "forum" / "topics.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)

    cats = fetch_categories()
    cat_map = {c["id"]: c for c in cats}

    seen, index = set(), []
    for c in cats:
        for t in fetch_category_topics(c):
            tid = t.get("id")
            if tid and tid not in seen:
                seen.add(tid); index.append({"id": tid, "category_id": c["id"]})

    full = []
    for i, item in enumerate(index, 1):
        try:
            t = fetch_topic_full(item["id"])
            t["category"] = cat_map.get(t.get("category_id"), {}).get("name")
            full.append(t)
        except Exception as e:
            print(f"Warn: topic {item['id']} failed: {e}", file=sys.stderr)
        if i % 25 == 0: print(f"Fetched {i}/{len(index)}")
        time.sleep(0.2)

    payload = {
        "source": BASE,
        "categories": cats,
        "topics": full,
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    out_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {out_path}")

if __name__ == "__main__":
    main()
