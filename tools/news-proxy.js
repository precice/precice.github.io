// tools/news-proxy.js
const express = require("express");
const app = express();
const PORT = 4001;

app.get("/news", async (req, res) => {
  try {
    const response = await fetch("https://precice.discourse.group/c/news/l/latest.json");
    const data = await response.json();

    // Extract 3–4 most recent posts
    const posts = data.topic_list.topics.slice(0, 4).map(topic => ({
      title: topic.title,
      url: `https://precice.discourse.group/t/${topic.slug}/${topic.id}`,
      date: topic.last_posted_at,
      excerpt: topic.excerpt ? topic.excerpt.replace(/<\/?[^>]+(>|$)/g, "") : ""
    }));

    // Enable CORS for local testing
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(posts);

  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`News proxy running on http://127.0.0.1:${PORT}`);
});
