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

<div class="faq-search-wrapper">
  <input id="q" placeholder="Search questions..." class="faq-search-input">
  <select id="sort" class="faq-search-select">
    <option value="last_posted_at">Sort by last activity</option>
    <option value="created_at">Sort by creation date</option>
    <option value="posts_count">Sort by replies</option>
    <option value="views">Sort by views</option>
    <option value="like_count">Sort by likes</option>
  </select>
</div>

<p id="meta" class="faq-meta-text"></p>
<p id="stats" class="faq-stats-text"></p>

<div id="list" class="faq-results-grid"></div>
<div id="empty" class="faq-empty-state">No results found.</div>

<script src="/js/forum-fetch.js"></script>
