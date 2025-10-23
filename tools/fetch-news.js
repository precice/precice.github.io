import fs from "fs";
import fetch from "node-fetch";

const DISCOURSE_URL = "https://precice.discourse.group/c/news/5.json";
const OUTPUT_FILE = "./assets/data/news.json";

async function fetchNews() {
  try {
    const res = await fetch(DISCOURSE_URL);
    const data = await res.json();
    const topics = data.topic_list.topics || [];

    const news = [];

    for (const topic of topics) {
      // Fetch full topic content
      const detailRes = await fetch(`https://precice.discourse.group/t/${topic.id}.json`);
      const detail = await detailRes.json();

      // Extract plain text description (first 30 words)
      const cooked = detail.post_stream?.posts?.[0]?.cooked || "";
      const textOnly = cooked.replace(/<[^>]*>?/gm, "");
      const excerpt = textOnly.split(/\s+/).slice(0, 30).join(" ") + "...";

      news.push({
        id: topic.id,
        title: topic.title,
        slug: topic.slug,
        url: `https://precice.discourse.group/t/${topic.slug}/${topic.id}`,
        last_posted_at: topic.last_posted_at,
        like_count: topic.like_count,
        posts_count: topic.posts_count,
        views: topic.views,
        description: excerpt,
      });
    }

    fs.mkdirSync("./assets/data", { recursive: true });
    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify({ generated_at: new Date().toISOString(), topics: news }, null, 2)
    );

    console.log(`News data saved to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error("Error fetching news:", err);
  }
}

fetchNews();
