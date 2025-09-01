---
layout: default
title: Forum Browser
parent: Community
permalink: /community-forum-browser.html
---

<h1>preCICE Forum Browser</h1>
<p style="color:#666;">Search and filter discussions mirrored from the preCICE Discourse forum.</p>

<div style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0;">
  <input id="q" placeholder="Search title or excerpt" style="padding:8px;border:1px solid #ddd;border-radius:8px;min-width:220px;">
  <select id="category" style="padding:8px;border:1px solid #ddd;border-radius:8px;">
    <option value="">All categories</option>
  </select>
  <input id="tag" placeholder="Tag filter" style="padding:8px;border:1px solid #ddd;border-radius:8px;min-width:160px;">
  <select id="sort" style="padding:8px;border:1px solid #ddd;border-radius:8px;">
    <option value="last_posted_at">Sort by last activity</option>
    <option value="created_at">Sort by created</option>
    <option value="posts_count">Sort by replies</option>
    <option value="views">Sort by views</option>
    <option value="like_count">Sort by likes</option>
  </select>
</div>

<p id="meta" style="margin:0 0 8px 0;color:#666;"></p>
<p id="stats" style="margin:0 0 16px 0;color:#666;"></p>

<div id="list" style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));"></div>
<div id="empty" style="display:none;color:#666;padding:16px 0;text-align:center;">No results</div>

<script>
  // Path to the generated JSON file
  const dataUrl = "{{ '/assets/data/forum/topics.json' | relative_url }}";

  // guard: prevent navgoco crash if sidebar JS missing
  window.jQuery && (jQuery.fn.navgoco = jQuery.fn.navgoco || function(){ return this; });

  let DATA = null;
  const el = (id) => document.getElementById(id);
  const fmtDate = (s) => (s ? new Date(s).toLocaleString() : "");

  function matchQuery(t, q) {
    if (!q) return true;
    const hay = ((t.title || "") + " " + (t.first_post_excerpt || "")).toLowerCase();
    return hay.includes(q.toLowerCase());
  }
  const matchCategory = (t, c) => !c || t.category === c;
  function matchTag(t, tag) {
    if (!tag) return true;
    const tags = t.tags || [];
    return tags.some((x) => x.toLowerCase().includes(tag.toLowerCase()));
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

  function render() {
    if (!DATA) return;

    const q = el("q").value.trim();
    const cat = el("category").value;
    const tag = el("tag").value.trim();
    const sortKey = el("sort").value;

    const topics = DATA.topics
      .filter((t) => matchQuery(t, q))
      .filter((t) => matchCategory(t, cat))
      .filter((t) => matchTag(t, tag));
    const sorted = sortBy(topics, sortKey);

    el("stats").textContent = `Showing ${sorted.length} of ${DATA.topics.length} threads`;
    const list = el("list");
    list.innerHTML = "";
    if (!sorted.length) {
      el("empty").style.display = "";
      return;
    }
    el("empty").style.display = "none";

    for (const t of sorted) {
      const card = document.createElement("article");
      card.style.cssText = "border:1px solid #e5e7eb;border-radius:12px;padding:12px;background:#fff;";
      card.innerHTML = `
        <a href="${t.url}" target="_blank" rel="noopener" style="font-weight:600;text-decoration:underline;">${t.fancy_title || t.title}</a>
        <div style="font-size:0.9em;margin-top:4px;color:#666;">
          ${t.category || ""} · created ${fmtDate(t.created_at)} · last activity ${fmtDate(t.last_posted_at)}
        </div>
        <p style="margin-top:8px;">${(t.first_post_excerpt || "").replace(/\s+/g, " ").slice(0, 320)}</p>
        <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px;">
          ${(t.tags || []).map(tag => `<span style="font-size:0.75em;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:999px;padding:2px 8px;">${tag}</span>`).join("")}
        </div>
        <div style="font-size:0.9em;margin-top:8px;display:flex;gap:12px;color:#555;">
          <span>Replies ${t.posts_count ? t.posts_count - 1 : 0}</span>
          <span>Views ${t.views || 0}</span>
          <span>Likes ${t.like_count || 0}</span>
          ${t.closed ? '<span style="color:#b91c1c;">Closed</span>' : ''}
          ${t.pinned ? '<span style="color:#b45309;">Pinned</span>' : ''}
        </div>
      `;
      list.appendChild(card);
    }
  }

  async function boot() {
    try {
      el("stats").textContent = "Loading forum data…";
      const res = await fetch(dataUrl, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.status + " " + res.statusText);
      DATA = await res.json();

      // populate categories
      const cats = Array.from(new Set((DATA.topics || []).map((t) => t.category))).filter(Boolean).sort();
      for (const c of cats) {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        el("category").appendChild(opt);
      }

      el("meta").textContent = `Source ${DATA.source} · Generated ${fmtDate(DATA.generated_at)}`;
      ["q", "category", "tag", "sort"].forEach((id) => el(id).addEventListener("input", render));
      render();
    } catch (err) {
      console.error("Failed to load topics.json:", err);
      el("list").innerHTML = `<div style="color:#b91c1c;">Failed to load topics.json: ${String(err).replace(/</g,"&lt;")}</div>`;
      el("stats").textContent = "";
    }
  }

  boot();
</script>
