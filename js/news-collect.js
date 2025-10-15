console.log("news-collect.js loaded into the page!");

document.addEventListener("DOMContentLoaded", async function () {
  console.log("news-collect.js is running!");

  const newsContainer = document.getElementById("news-container");
  const loadingText = document.getElementById("loading-news");

  const isLocal =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost";
  console.log(isLocal ? "Local mode: using proxy" : "Production mode: direct fetch");

  const topicsListUrl = isLocal
    ? "http://127.0.0.1:4001/news"
    : "https://precice.discourse.group/c/news/9.json";

  function getTopicContentUrl(topicId) {
    return isLocal
      ? `http://127.0.0.1:4001/t/${topicId}.json`
      : `https://precice.discourse.group/t/${topicId}.json`;
  }

  try {
    const response = await fetch(topicsListUrl);
    const data = await response.json();
    let topics = Array.isArray(data) ? data : data.topic_list?.topics || [];

    console.log("Fetched topics count:", topics.length);
    if (!topics.length) throw new Error("No topics found in response");

    // Filter pinned & "Welcome" posts
    topics = topics.filter(
      (topic) =>
        !topic.pinned &&
        !topic.title.toLowerCase().includes("welcome") &&
        topic.visible
    );

    loadingText.style.display = "none";

    // Build and insert the cards
    for (const topic of topics.slice(0, 3)) {
      try {
        const topicUrl = getTopicContentUrl(topic.id);
        const postResp = await fetch(topicUrl);
        const postData = await postResp.json();

        const rawContent = postData?.post_stream?.posts?.[0]?.cooked || "";
        const textOnly = rawContent.replace(/<[^>]*>?/gm, "");
        const excerpt = textOnly.split(/\s+/).slice(0, 25).join(" ") + "...";

        // Simplified, no Bootstrap wrappers
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <h4><strong>${topic.title}</strong></h4>
          <p>${excerpt}</p>
          <p>
            <a href="https://precice.discourse.group/t/${topic.slug}/${topic.id}" 
              target="_blank" rel="noopener noreferrer" 
              class="no-external-marker">
              Read more about this update
            </a>
          </p>
          <p class="text-muted"><small>Last activity: ${new Date(
            topic.last_posted_at
          ).toLocaleDateString()}</small></p>
        `;

        newsContainer.appendChild(card);
      } catch (topicError) {
        console.warn("Failed to fetch topic details for", topic.id, topicError);
      }
    }
  } catch (error) {
    console.error("Error loading news:", error);
    loadingText.textContent = "Failed to load latest news.";
  }
});
