// js/forum-fetch.js — Production-Ready FAQ Fetcher

// --- Select proxy URL ---
const apiBase =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/forum"
    : "https://precice-forum-proxy.onrender.com/forum";

let DATA = null;
const el = (id) => document.getElementById(id);
const fmtDate = (s) => (s ? new Date(s).toLocaleString() : "");

// --- Timeout helper ---
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 10000 } = options; // 10 seconds
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, { ...options, signal: controller.signal });
  clearTimeout(id);
  return response;
}

// --- Retry helper ---
async function fetchWithRetry(url, retries = 2, delay = 1500) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt < retries) {
        console.warn(`Fetch attempt ${attempt + 1} failed, retrying in ${delay}ms...`, err);
        await new Promise((r) => setTimeout(r, delay));
      } else {
        throw err;
      }
    }
  }
}

// --- Filtering and sorting helpers ---
function matchQuery(t, q) {
  if (!q) return true;
  const hay = ((t.title || "") + " " + (t.excerpt || "")).toLowerCase();
  return hay.includes(q.toLowerCase());
}

function sortBy(arr, key) {
  const copy = [...arr];
  copy.sort((a, b) => {
    if (key === "created_at" || key === "last_posted_at") {
      return new Date(b[key] || 0) - new Date(a[key] || 0);
    }
    return (b[key] || 0) - (a[key] || 0);
  });
  return copy;
}

// --- Rendering logic ---
function render() {
  if (!DATA) return;

  const q = el("q").value.trim();
  const sortKey = el("sort").value;
  const topics = DATA.topic_list.topics.filter((t) => matchQuery(t, q));
  const sorted = sortBy(topics, sortKey);

  el("stats").textContent = `Showing ${sorted.length} FAQ threads`;
  const list = el("list");
  list.innerHTML = "";

  if (!sorted.length) {
    el("empty").style.display = "";
    return;
  }
  el("empty").style.display = "none";

  for (const t of sorted) {
    const card = document.createElement("article");
    card.style.cssText =
      "border:1px solid #e5e7eb;border-radius:12px;padding:12px;background:#fff;transition:box-shadow 0.2s ease;cursor:pointer;";
    card.onmouseenter = () => (card.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)");
    card.onmouseleave = () => (card.style.boxShadow = "none");

    card.innerHTML = `
      <a href="https://precice.discourse.group/t/${t.slug}/${t.id}" target="_blank" rel="noopener"
         style="font-weight:600;text-decoration:underline;">
        ${t.fancy_title || t.title}
      </a>
      <div style="font-size:0.9em;margin-top:4px;color:#666;">
        Created ${fmtDate(t.created_at)} · Last activity ${fmtDate(t.last_posted_at)}
      </div>
      <p style="margin-top:8px;">${(t.excerpt || "").replace(/\s+/g, " ").slice(0, 320)}</p>
      <div style="font-size:0.9em;margin-top:8px;display:flex;gap:12px;color:#555;">
        <span>Replies ${t.posts_count ? t.posts_count - 1 : 0}</span>
        <span>Views ${t.views || 0}</span>
        <span>Likes ${t.like_count || 0}</span>
      </div>
    `;
    list.appendChild(card);
  }
}

// --- Boot logic ---
async function boot() {
  const list = el("list");
  try {
    list.innerHTML = `<div style="text-align:center;padding:40px;color:#666;"> Loading FAQ topics…</div>`;
    el("stats").textContent = "";

    DATA = await fetchWithRetry(apiBase, 2, 1500);

    el("meta").textContent = `Source: preCICE Discourse · Generated ${fmtDate(new Date())}`;
    ["q", "sort"].forEach((id) => el(id).addEventListener("input", render));

    render();
  } catch (err) {
    console.error("Failed to load forum data:", err);
    list.innerHTML = `<div style="color:#b91c1c;text-align:center;padding:30px;">
      Unable to load FAQ topics. Please check your internet connection or try again later.
    </div>`;
    el("stats").textContent = "";
  }
}

// --- Initialize on DOM ready ---
window.addEventListener("DOMContentLoaded", boot);
