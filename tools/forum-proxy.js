// tools/forum-proxy.js
const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = "https://precice.discourse.group";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/forum", async (req, res) => {
  try {
    const tag = req.query.tag || "faq"; // Default tag is 'faq'
    const endpoint = `/tag/${encodeURIComponent(tag)}/l/latest.json`;

    console.log(`Fetching from: ${BASE_URL}${endpoint}`);

    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();

    res.json(json);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Failed to fetch forum data", details: String(err) });
  }
});

app.listen(PORT, () => console.log(`Forum proxy running on port ${PORT}`));
