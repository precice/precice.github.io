import json
import os
import re
import time
import urllib.request

DISCOURSE_URL = "https://precice.discourse.group/c/news/5.json"
OUTPUT_FILE = "./static/assets/data/news.json"
VIEW_THRESHOLD = 50
USER_AGENT = "preCICE-Website-Updater/1.0 (https://precice.org)"


def fetch_json(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read().decode("utf-8"))


def strip_html(html: str) -> str:
    return re.sub(r"<[^>]*>", "", html)


def load_existing_topics() -> dict:
    if not os.path.exists(OUTPUT_FILE):
        return {}
    try:
        with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            return {t["id"]: t for t in data.get("topics", []) if "id" in t}
    except Exception:
        return {}


def main():
    try:
        data = fetch_json(DISCOURSE_URL)
        topics = data.get("topic_list", {}).get("topics", [])

        existing_topics = load_existing_topics()
        news = []
        for topic in topics:
            topic_id = topic["id"]
            new_views = topic.get("views", 0) or 0
            new_last_posted = topic.get("last_posted_at")

            old_topic = existing_topics.get(topic_id, {})
            old_views = old_topic.get("views", 0) or 0
            old_description = old_topic.get("description", "")

            # Preserve view count if difference is below threshold
            if topic_id in existing_topics:
                if abs(new_views - old_views) < VIEW_THRESHOLD:
                    views = old_views
                else:
                    views = new_views
            else:
                views = new_views

            # Only fetch detail if topic is new, updated, or missing description
            if old_description and old_topic.get("last_posted_at") == new_last_posted:
                excerpt = old_description
            else:
                try:
                    time.sleep(0.1)
                    detail = fetch_json(f"https://precice.discourse.group/t/{topic_id}.json")
                    cooked = detail.get("post_stream", {}).get("posts", [{}])[0].get("cooked", "")
                    text = strip_html(cooked).strip()
                    excerpt = " ".join(text.split()[:30]) + "..." if text else old_description
                except Exception as e:
                    print(f"Could not fetch detail for news topic {topic_id}: {e}")
                    excerpt = old_description

            news.append({
                "id": topic_id,
                "title": topic["title"],
                "slug": topic["slug"],
                "url": f"https://precice.discourse.group/t/{topic['slug']}/{topic_id}",
                "created_at": topic.get("created_at"),
                "last_posted_at": new_last_posted,
                "like_count": topic.get("like_count"),
                "posts_count": topic.get("posts_count"),
                "views": views,
                "description": excerpt,
            })

        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump({"topics": news}, f, indent=2)

        print(f"News data saved to {OUTPUT_FILE}")

    except Exception as e:
        print("Error fetching news:", e)


if __name__ == "__main__":
    main()
