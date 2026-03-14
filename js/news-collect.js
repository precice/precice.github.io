document.addEventListener("DOMContentLoaded", async function () {
  const newsContainer = document.getElementById("news-container");
  const loadingText = document.getElementById("loading-news");

  function isSafeUrl(url) {
    try {
      var parsed = new URL(url, window.location.origin);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch (e) {
      return false;
    }
  }

  try {
    const response = await fetch("/assets/data/news.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    let topics = data.topics || [];

    if (!topics.length) throw new Error("No topics found");

    topics.sort((a, b) => new Date(b.created_at || b.last_posted_at) - new Date(a.created_at || a.last_posted_at));
    loadingText.style.display = "none";

    for (const topic of topics.slice(0, 3)) {
      const col = document.createElement("div");
      col.className = "col-md-4 col-sm-6 col-xs-12";

      const card = document.createElement("div");
      card.className = "news-card";

      const date = new Date(topic.created_at || topic.last_posted_at).toLocaleDateString("en-GB");

      const link = document.createElement("a");
      if (isSafeUrl(topic.url)) {
        link.setAttribute("href", topic.url);
      }
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.className = "news-link no-external-marker";

      const h4 = document.createElement("h4");
      const strong = document.createElement("strong");
      strong.textContent = topic.title;
      h4.appendChild(strong);

      const descP = document.createElement("p");
      descP.textContent = topic.description;

      const dateP = document.createElement("p");
      dateP.className = "text-muted";
      const small = document.createElement("small");
      small.textContent = date;
      dateP.appendChild(small);

      link.appendChild(h4);
      link.appendChild(descP);
      link.appendChild(dateP);
      card.appendChild(link);
      col.appendChild(card);
      newsContainer.appendChild(col);
    }

  } catch (err) {
    console.error(err);
    loadingText.textContent = "Failed to load latest news.";
  }
});
