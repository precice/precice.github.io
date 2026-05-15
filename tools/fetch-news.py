import json
import os
import re
from urllib.request import urlopen

DISCOURSE_URL = "https://precice.discourse.group/c/news/5.json"
OUTPUT_FILE = "./assets/data/news.json"


def fetch_json(url: str):
    with urlopen(url) as res:
        return json.loads(res.read().decode("utf-8"))


def strip_html(html: str) -> str:
    return re.sub(r"<[^>]*>", "", html)


def main():
    try:
        data = fetch_json(DISCOURSE_URL)
        topics = data.get("topic_list", {}).get("topics", [])

        news = []
        for topic in topics:
            detail = fetch_json(f"https://precice.discourse.group/t/{topic['id']}.json")
            cooked = detail.get("post_stream", {}).get("posts", [{}])[0].get("cooked", "")
            text = strip_html(cooked).strip()

            excerpt = " ".join(text.split()[:30]) + "..."

            news.append({
                "id": topic["id"],
                "title": topic["title"],
                "slug": topic["slug"],
                "url": f"https://precice.discourse.group/t/{topic['slug']}/{topic['id']}",
                "created_at": topic.get("created_at"),
                "last_posted_at": topic.get("last_posted_at"),
                "like_count": topic.get("like_count"),
                "posts_count": topic.get("posts_count"),
                "views": topic.get("views"),
                "description": excerpt,
            })

        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump({"generated_at": __import__("datetime").datetime.utcnow().isoformat(), "topics": news}, f, indent=2)

        print(f"News data saved to {OUTPUT_FILE}")

    except Exception as e:
        print("Error fetching news:", e)


if __name__ == "__main__":
    main()
