console.log("forum-fetch.js loaded!");

document.addEventListener("DOMContentLoaded", async function () {
  console.log("FAQ loader running...");

  const list = document.getElementById("list");
  const empty = document.getElementById("empty");
  const searchInput = document.getElementById("q");
  const sortSelect = document.getElementById("sort");

  const loadingText = document.createElement("p");
  loadingText.textContent = "Loading FAQs...";
  list.parentElement.insertBefore(loadingText, list);

  function isSafeUrl(url) {
    try {
      var parsed = new URL(url, window.location.origin);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch (e) {
      return false;
    }
  }

  try {
    const res = await fetch("/assets/data/faq.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const topics = data.topics || [];
    loadingText.remove();

    if (!topics.length) {
      empty.style.display = "block";
      return;
    }

    let visibleCount = 10;
    let filteredTopics = [...topics];

    function filterAndSort() {
      const q = searchInput.value.trim().toLowerCase();
      const sortKey = sortSelect.value;

      // Filter
      filteredTopics = topics.filter((t) =>
        (t.title + " " + (t.excerpt || "")).toLowerCase().includes(q)
      );

      // Sort
      filteredTopics.sort((a, b) => {
        if (sortKey === "created_at" || sortKey === "last_posted_at") {
          return new Date(b[sortKey]) - new Date(a[sortKey]);
        }
        return (b[sortKey] || 0) - (a[sortKey] || 0);
      });

      visibleCount = 10;
      renderTopics();
    }

    function renderTopics() {
      list.replaceChildren();

      const shown = filteredTopics.slice(0, visibleCount);

      if (!shown.length) {
        empty.style.display = "block";
        return;
      } else {
        empty.style.display = "none";
      }

      shown.forEach((t) => {
        const card = document.createElement("div");
        card.className = "faq-card";
        card.style.cssText =
          "border:1px solid #ddd;padding:12px;border-radius:8px;background:#fff;";

        const excerpt =
          t.excerpt && t.excerpt.trim().length > 0
            ? t.excerpt
            : "No description available.";

        var h4 = document.createElement("h4");
        h4.style.cssText = "margin-bottom:8px;";
        var strong = document.createElement("strong");
        strong.textContent = t.title;
        h4.appendChild(strong);

        var excerptP = document.createElement("p");
        excerptP.style.cssText = "color:#333;line-height:1.4;";
        excerptP.textContent = excerpt + " ";
        var readMore = document.createElement("a");
        if (isSafeUrl(t.url)) {
          readMore.setAttribute("href", t.url);
        }
        readMore.setAttribute("target", "_blank");
        readMore.setAttribute("rel", "noopener noreferrer");
        readMore.style.cssText = "text-decoration:none;color:#0069c2;";
        readMore.dataset.noicon = "";
        readMore.textContent = "Read more";
        excerptP.appendChild(readMore);

        var metaP = document.createElement("p");
        metaP.style.cssText = "color:#666;font-size:0.9em;";
        metaP.textContent =
          "Last updated: " +
          new Date(t.last_posted_at).toLocaleDateString("en-GB") +
          " | Replies: " +
          t.posts_count +
          " | Views: " +
          t.views;

        card.appendChild(h4);
        card.appendChild(excerptP);
        card.appendChild(metaP);
        list.appendChild(card);
      });

      if (visibleCount < filteredTopics.length) {
        const btn = document.createElement("button");
        btn.textContent = "Load more";
        btn.style.cssText =
          "padding:8px 16px;margin:12px 0 12px auto;display:block;border:1px solid #ccc;border-radius:8px;background:#f9f9f9;cursor:pointer;";
        btn.addEventListener("click", () => {
          visibleCount += 10;
          renderTopics();
        });
        list.appendChild(btn);
      }

      // JS-based CSS injection to remove external icon pseudo-element
      if (!document.getElementById("noicon-style")) {
        const style = document.createElement("style");
        style.id = "noicon-style";
        style.textContent = `
          [data-noicon]::after {
            content: none !important;
            background-image: none !important;
          }
        `;
        document.head.appendChild(style);
      }
    }

    // Event listeners
    searchInput.addEventListener("input", filterAndSort);
    sortSelect.addEventListener("change", filterAndSort);

    // Initial render
    filterAndSort();
  } catch (err) {
    console.error("Error loading FAQ:", err);
    loadingText.textContent = "Failed to load FAQs.";
  }
});
