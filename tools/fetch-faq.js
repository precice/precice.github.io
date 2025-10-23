// tools/fetch-faq.js
const fs = require("fs");
const fetch = require("node-fetch");

const DISCOURSE_BASE = "https://precice.discourse.group";
const OUTPUT_FILE = "./assets/data/faq.json";

async function fetchExcerpt(topicId) {
  try {
    const res = await fetch(`${DISCOURSE_BASE}/t/${topicId}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const topicData = await res.json();
    // Get first post excerpt (trimmed and cleaned)
    const rawExcerpt =
      topicData.post_stream?.posts?.[0]?.cooked?.replace(/<[^>]+>/g, "") || "";
    return rawExcerpt.substring(0, 250) + (rawExcerpt.length > 250 ? "…" : "");
  } catch (err) {
    console.warn(`⚠️ Could not fetch excerpt for topic ${topicId}: ${err.message}`);
    return "";
  }
}

async function fetchFAQ() {
  try {
    console.log("📥 Fetching FAQ topics from Discourse...");

    const res = await fetch(`${DISCOURSE_BASE}/tag/faq/l/latest.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    const topicList = json.topic_list?.topics || [];
    console.log(`Found ${topicList.length} FAQ topics. Fetching excerpts...`);

    // Parallel fetch excerpts
    const topics = await Promise.all(
      topicList.map(async (t) => {
        const excerpt = await fetchExcerpt(t.id);
        return {
          id: t.id,
          title: t.title,
          slug: t.slug,
          url: `${DISCOURSE_BASE}/t/${t.slug}/${t.id}`,
          created_at: t.created_at,
          last_posted_at: t.last_posted_at,
          views: t.views,
          posts_count: t.posts_count,
          like_count: t.like_count,
          excerpt: excerpt,
        };
      })
    );

    const payload = {
      source: "preCICE Discourse (FAQ)",
      generated_at: new Date().toISOString(),
      topics,
    };

    fs.mkdirSync("./assets/data", { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2));
    console.log(`✅ Saved ${topics.length} FAQ topics with excerpts to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error("❌ Failed to fetch FAQ data:", err);
    process.exit(1);
  }
}

fetchFAQ();
