(function () {
  var REPO_BLURBS = {
    core: "Core coupling library and ecosystem.",
    tutorials: "Ready-to-run tutorial cases for users and developers.",
  };

  function formatNumber(value) {
    if (typeof value !== "number") {
      return "n/a";
    }
    return new Intl.NumberFormat("en-US").format(value);
  }

  function formatDate(value) {
    if (!value) {
      return "n/a";
    }

    var parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "n/a";
    }

    return parsed.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function createItem(label, value) {
    return "<li><strong>" + label + ":</strong> " + value + "</li>";
  }

  function createCardColumn(title, description, items, linkUrl, linkLabel) {
    var column = document.createElement("div");
    column.className = "col-md-12";

    var card = document.createElement("div");
    card.className = "panel panel-primary panel-precice";
    card.style.marginBottom = "14px";

    var list = "<ul class=\"list-unstyled no-margin\">" + items.join("") + "</ul>";
    var descriptionHtml = description ? "<p class=\"text-muted\" style=\"font-size: 0.9em; margin-bottom: 8px;\">" + description + "</p>" : "";
    var linkHtml = "";
    if (linkUrl && linkLabel) {
      linkHtml =
        "<p class=\"no-margin\" style=\"margin-top: 10px;\"><a href=\"" +
        linkUrl +
        "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"no-external-marker\">" +
        linkLabel +
        " &nbsp;<i class=\"fas fa-chevron-right\"></i></a></p>";
    }

    card.innerHTML =
      "<div class=\"panel-heading-precice text-left\"><strong>" +
      title +
      "</strong></div>" +
      "<div class=\"panel-body\" style=\"font-size: 0.92em; line-height: 1.35;\">" +
      descriptionHtml +
      list +
      linkHtml +
      "</div>";

    column.appendChild(card);
    return column;
  }

  function createRepositoryCard(repo) {
    var latestRelease = repo.latest_release;
    var latestReleaseValue = "n/a";
    if (latestRelease && latestRelease.url) {
      latestReleaseValue =
        "<a href=\"" +
        latestRelease.url +
        "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"no-external-marker\">" +
        (latestRelease.tag_name || latestRelease.name || "Release") +
        "</a> (" +
        formatDate(latestRelease.published_at) +
        ")";
    }

    var releaseDownloads = latestRelease ? formatNumber(latestRelease.downloads_count) : "n/a";

    return createCardColumn(
      repo.label,
      REPO_BLURBS[repo.id] || "",
      [
        createItem("Stars", formatNumber(repo.stars)),
        createItem("Contributors", formatNumber(repo.contributors)),
        createItem("Open issues", formatNumber(repo.open_issues)),
        createItem("Latest commit", formatDate(repo.latest_commit_at)),
        createItem("Latest release", latestReleaseValue),
        createItem("Release downloads", releaseDownloads),
      ],
      repo.url,
      "Open repository"
    );
  }

  function createDiscourseCard(discourse) {
    return createCardColumn(
      "Discourse forum",
      "Community activity snapshot.",
      [
        createItem("Users", formatNumber(discourse.users_count)),
        createItem("Topics", formatNumber(discourse.topics_count)),
        createItem("Posts", formatNumber(discourse.posts_count)),
        createItem("Active users (30d)", formatNumber(discourse.active_users_30_days)),
        createItem("Topics (30d)", formatNumber(discourse.topics_30_days)),
        createItem("Posts (30d)", formatNumber(discourse.posts_30_days)),
      ],
      discourse.url,
      "Open forum"
    );
  }

  function showError(status, message) {
    if (status) {
      status.textContent = message;
    }
  }

  document.addEventListener("DOMContentLoaded", async function () {
    var container = document.getElementById("community-metrics");
    if (!container) {
      return;
    }

    var status = document.getElementById("community-metrics-status");

    try {
      var response = await fetch("/assets/data/community-metrics.json");
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      var metrics = await response.json();
      var repositories = (metrics.github && metrics.github.repositories) || [];
      var discourse = metrics.discourse;

      if (!repositories.length || !discourse) {
        throw new Error("Missing metrics data");
      }

      var row = document.createElement("div");
      row.className = "row";

      for (var i = 0; i < repositories.length; i += 1) {
        row.appendChild(createRepositoryCard(repositories[i]));
      }
      row.appendChild(createDiscourseCard(discourse));

      container.innerHTML = "";
      container.appendChild(row);

      if (status) {
        status.textContent =
          "Automatically generated metrics. Last updated " + formatDate(metrics.generated_at) + ".";
      }
    } catch (error) {
      console.error("Could not load community metrics:", error);
      showError(
        status,
        "Could not load the metrics right now. You can still browse all details on GitHub and in the forum."
      );
    }
  });
})();
