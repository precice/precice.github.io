#!/usr/bin/env python3
import os
import json
import re
import time
import urllib.request

DISCOURSE_BASE = "https://precice.discourse.group"
OUTPUT_FILE = "./static/assets/data/faq.json"
VIEW_THRESHOLD = 50
USER_AGENT = "preCICE-Website-Updater/1.0 (https://precice.org)"


def http_get_json(url: str):
    """GET URL and return parsed JSON using only stdlib."""
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def strip_html(text: str) -> str:
    return re.sub(r"<[^>]+>", "", text)


def load_existing_topics() -> dict:
    if not os.path.exists(OUTPUT_FILE):
        return {}
    try:
        with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            return {t["id"]: t for t in data.get("topics", []) if "id" in t}
    except Exception:
        return {}


def fetch_excerpt(topic_id: int) -> str:
    try:
        time.sleep(0.1)
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

        existing_topics = load_existing_topics()
        topics = []
        for t in topic_list:
            topic_id = t["id"]
            new_views = t.get("views", 0) or 0
            new_last_posted = t.get("last_posted_at")

            old_topic = existing_topics.get(topic_id, {})
            old_views = old_topic.get("views", 0) or 0
            old_excerpt = old_topic.get("excerpt", "")

            # Preserve view count if difference is below threshold
            if topic_id in existing_topics:
                if abs(new_views - old_views) < VIEW_THRESHOLD:
                    views = old_views
                else:
                    views = new_views
            else:
                views = new_views

            # Only fetch excerpt if topic is new, updated, or missing excerpt
            if old_excerpt and old_topic.get("last_posted_at") == new_last_posted:
                excerpt = old_excerpt
            else:
                fetched_excerpt = fetch_excerpt(topic_id)
                excerpt = fetched_excerpt if fetched_excerpt else old_excerpt

            topics.append({
                "id": topic_id,
                "title": t["title"],
                "slug": t["slug"],
                "url": f"{DISCOURSE_BASE}/t/{t['slug']}/{topic_id}",
                "created_at": t.get("created_at"),
                "last_posted_at": new_last_posted,
                "views": views,
                "posts_count": t.get("posts_count"),
                "like_count": t.get("like_count"),
                "excerpt": excerpt,
            })

        payload = {
            "source": "preCICE Discourse (FAQ)",
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
