console.log(">>> USING JS FILE: news-collect.js LOADED <<<");

document.addEventListener("DOMContentLoaded", async function () {
  const newsContainer = document.getElementById("news-container");
  const loadingText = document.getElementById("loading-news");

  try {
    const response = await fetch("/assets/data/news.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    let topics = data.topics || [];

    if (!topics.length) throw new Error("No topics found");

    topics.sort((a, b) => new Date(b.last_posted_at) - new Date(a.last_posted_at));
    loadingText.style.display = "none";

for (const topic of topics.slice(0, 3)) {
  const col = document.createElement("div");
  col.className = "col-md-4 col-sm-6 col-xs-12";

  const card = document.createElement("div");
  card.className = "news-card";

  card.innerHTML = `
    <h4><strong>${topic.title}</strong></h4>
    <p>${topic.description}</p>
    <p>
      <a href="${topic.url}" target="_blank" rel="noopener noreferrer" class="no-external-marker">
        Read more about this update
      </a>
    </p>
    <p class="text-muted"><small>
      Last activity: ${new Date(topic.last_posted_at).toLocaleDateString("en-GB")}
    </small></p>
  `;

  col.appendChild(card);
  newsContainer.appendChild(col);
}

  } catch (err) {
    console.error(err);
    loadingText.textContent = "Failed to load latest news.";
  }
});
