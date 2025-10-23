console.log("news-collect.js loaded into the page!");

document.addEventListener("DOMContentLoaded", async function () {
  console.log("news-collect.js is running!");

  const newsContainer = document.getElementById("news-container");
  const loadingText = document.getElementById("loading-news");

  try {
    // Fetch locally built JSON from CI
    const response = await fetch("/assets/data/news.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    let topics = data.topics || [];

    if (!topics.length) throw new Error("No topics found in news.json");

    // Sort by most recent
    topics.sort(
      (a, b) => new Date(b.last_posted_at) - new Date(a.last_posted_at)
    );

    loadingText.style.display = "none";

    // Render only the top 3 topics
    for (const topic of topics.slice(0, 3)) {
      const description =
        topic.description && topic.description.trim().length > 0
          ? topic.description
          : "No description available.";

      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <h4><strong>${topic.title}</strong></h4>
        <p>${description}</p>
        <p>
          <a href="${topic.url}" 
             target="_blank" rel="noopener noreferrer"
             class="no-external-marker">
            Read more about this update
          </a>
        </p>
        <p class="text-muted"><small>Last activity: 
          ${new Date(topic.last_posted_at).toLocaleDateString()}
        </small></p>
      `;
      newsContainer.appendChild(card);
    }
  } catch (error) {
    console.error("Error loading news:", error);
    loadingText.textContent = "Failed to load latest news.";
  }
});
