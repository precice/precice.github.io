document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("news-container");
  const loading = document.getElementById("loading-news");

  try {
    const response = await fetch("http://127.0.0.1:4001/news");
    const data = await response.json();
    loading.remove();

    data.slice(0, 3).forEach(item => {
      const col = document.createElement("div");
      col.className = "col-md-4 col-sm-6 col-xs-12";

      const card = document.createElement("a");
      card.href = item.url;
      card.target = "_blank";
      card.className = "adapter"; // reuse adapter styling

      card.innerHTML = `
        <div class="panel panel-primary">
          <div class="panel-body full-height">
            <p style="font-weight:600; color:#040606;">${item.title}</p>
            <p style="font-size:14px; color:#333;">${item.excerpt || ""}</p>
            <p style="font-size:12px; color:#777; margin-top:10px;">
              Last activity: ${new Date(item.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      `;

      col.appendChild(card);
      container.appendChild(col);
    });
  } catch (err) {
    console.error("Error fetching news:", err);
    loading.textContent = "Failed to load news.";
  }
});
