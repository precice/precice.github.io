#!/usr/bin/env python3
import os
import json
import re
import urllib.request
from datetime import datetime

DISCOURSE_BASE = "https://precice.discourse.group"
OUTPUT_FILE = "./assets/data/faq.json"


def http_get_json(url: str):
    """GET URL and return parsed JSON using only stdlib."""
    with urllib.request.urlopen(url) as r:
        return json.load(r)


def strip_html(text: str) -> str:
    return re.sub(r"<[^>]+>", "", text)


def fetch_excerpt(topic_id: int) -> str:
    try:
        topic_data = http_get_json(f"{DISCOURSE_BASE}/t/{topic_id}.json")
        raw = topic_data.get("post_stream", {}).get("posts", [{}])[0].get("cooked", "")
        cleaned = strip_html(raw)
        return cleaned[:250] + ("…" if len(cleaned) > 250 else "")
    except Exception as e:
        print(f"Could not fetch excerpt for topic {topic_id}: {e}")
        return ""


def fetch_faq():
    try:
        print("Fetching FAQ topics from Discourse...")

        data = http_get_json(f"{DISCOURSE_BASE}/tag/faq/l/latest.json")
        topic_list = data.get("topic_list", {}).get("topics", [])
        print(f"Found {len(topic_list)} FAQ topics. Fetching excerpts...")

        topics = []
        for t in topic_list:
            excerpt = fetch_excerpt(t["id"])
            topics.append({
                "id": t["id"],
                "title": t["title"],
                "slug": t["slug"],
                "url": f"{DISCOURSE_BASE}/t/{t['slug']}/{t['id']}",
                "created_at": t.get("created_at"),
                "last_posted_at": t.get("last_posted_at"),
                "views": t.get("views"),
                "posts_count": t.get("posts_count"),
                "like_count": t.get("like_count"),
                "excerpt": excerpt,
            })

        payload = {
            "source": "preCICE Discourse (FAQ)",
            "generated_at": datetime.utcnow().isoformat(),
            "topics": topics,
        }

        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=2)

        print(f"Saved {len(topics)} FAQ topics to {OUTPUT_FILE}")

    except Exception as e:
        print("Failed to fetch FAQ data:", e)
        exit(1)


if __name__ == "__main__":
    fetch_faq()
