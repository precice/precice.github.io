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

  function createMetricItem(label, value) {
    var item = document.createElement("li");
    item.innerHTML = "<strong>" + label + ":</strong> " + value;
    return item;
  }

  function createSection(title, description, metrics, linkUrl, linkLabel) {
    var section = document.createElement("section");
    section.style.marginBottom = "14px";

    var heading = document.createElement("h4");
    heading.textContent = title;
    heading.style.marginBottom = "4px";
    section.appendChild(heading);

    if (description) {
      var blurb = document.createElement("p");
      blurb.className = "text-muted";
      blurb.style.marginBottom = "6px";
      blurb.style.fontSize = "0.95em";
      blurb.textContent = description;
      section.appendChild(blurb);
    }

    var list = document.createElement("ul");
    list.className = "list-unstyled";
    list.style.marginBottom = "6px";

    for (var i = 0; i < metrics.length; i += 1) {
      var metric = metrics[i];
      list.appendChild(createMetricItem(metric[0], metric[1]));
    }
    section.appendChild(list);

    if (linkUrl && linkLabel) {
      var paragraph = document.createElement("p");
      paragraph.className = "no-margin";
      var link = document.createElement("a");
      link.href = linkUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "no-external-marker";
      link.innerHTML = linkLabel + " &nbsp;<i class=\"fas fa-chevron-right\"></i>";
      paragraph.appendChild(link);
      section.appendChild(paragraph);
    }

    return section;
  }

  function createRepositorySection(repo) {
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

    return createSection(
      repo.label,
      REPO_BLURBS[repo.id] || "",
      [
        ["Stars", formatNumber(repo.stars)],
        ["Contributors", formatNumber(repo.contributors)],
        ["Open issues", formatNumber(repo.open_issues)],
        ["Latest commit", formatDate(repo.latest_commit_at)],
        ["Latest release", latestReleaseValue],
        ["Release downloads", releaseDownloads],
      ],
      repo.url,
      "Open repository"
    );
  }

  function createDiscourseSection(discourse) {
    return createSection(
      "Discourse forum",
      "Community activity snapshot.",
      [
        ["Users", formatNumber(discourse.users_count)],
        ["Topics", formatNumber(discourse.topics_count)],
        ["Posts", formatNumber(discourse.posts_count)],
        ["Active users (30d)", formatNumber(discourse.active_users_30_days)],
        ["Topics (30d)", formatNumber(discourse.topics_30_days)],
        ["Posts (30d)", formatNumber(discourse.posts_30_days)],
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

      container.innerHTML = "";
      for (var i = 0; i < repositories.length; i += 1) {
        container.appendChild(createRepositorySection(repositories[i]));
      }
      container.appendChild(createDiscourseSection(discourse));

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
