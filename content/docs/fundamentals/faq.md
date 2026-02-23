---
title: Frequently asked questions
permalink: /fundamentals-faq.html
keywords: faq, forum, questions
editme: false
toc: false
redirect_from:
  - faq.html
---

Search and filter frequently asked questions on the [preCICE Discourse forum](https://precice.discourse.group/tag/faq).

<div style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0;">
  <input id="q" placeholder="Search questions..." style="padding:8px;border:1px solid #ddd;border-radius:8px;min-width:240px;">
  <select id="sort" style="padding:8px;border:1px solid #ddd;border-radius:8px;">
    <option value="last_posted_at">Sort by last activity</option>
    <option value="created_at">Sort by creation date</option>
    <option value="posts_count">Sort by replies</option>
    <option value="views">Sort by views</option>
    <option value="like_count">Sort by likes</option>
  </select>
</div>

<p id="meta" style="margin:0 0 8px 0;color:#666;"></p>
<p id="stats" style="margin:0 0 16px 0;color:#666;"></p>

<div id="list" style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));"></div>
<div id="empty" style="display:none;color:#666;padding:16px 0;text-align:center;">No results found.</div>

<script src="/js/forum-fetch.js"></script>
