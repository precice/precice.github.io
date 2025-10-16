const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow all origins (for frontend CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/forum", async (req, res) => {
  try {
    const [topicsRes, catsRes] = await Promise.all([
      fetch("https://precice.discourse.group/latest.json"),
      fetch("https://precice.discourse.group/categories.json"),
    ]);

    const topicsJson = await topicsRes.json();
    const catsJson = await catsRes.json();

    const catMap = {};
    catsJson.category_list.categories.forEach((c) => (catMap[c.id] = c.name));

    const topics = topicsJson.topic_list.topics.map((t) => ({
      id: t.id,
      slug: t.slug,
      title: t.title,
      fancy_title: t.fancy_title,
      url: `https://precice.discourse.group/t/${t.slug}/${t.id}`,
      category: catMap[t.category_id] || "General",
      tags: t.tags || [],
      created_at: t.created_at,
      last_posted_at: t.last_posted_at,
      excerpt: t.excerpt,
      posts_count: t.posts_count,
      views: t.views,
      like_count: t.like_count,
      closed: t.closed,
      pinned: t.pinned,
    }));

    res.json({
      source: "preCICE Discourse (live)",
      generated_at: new Date().toISOString(),
      topics,
    });
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Failed to fetch forum data" });
  }
});

app.listen(PORT, () => console.log(`Forum proxy running on port ${PORT}`));
