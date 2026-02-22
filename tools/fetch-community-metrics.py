#!/usr/bin/env python3
import json
import os
import re
import urllib.error
import urllib.request
from datetime import datetime, timezone

GITHUB_API_BASE = "https://api.github.com"
DISCOURSE_ABOUT_URL = "https://precice.discourse.group/about.json"
OUTPUT_FILE = "./assets/data/community-metrics.json"

GITHUB_HEADERS = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "precice-community-metrics-bot",
}

REPOSITORIES = [
    {"id": "core", "owner": "precice", "repo": "precice", "label": "preCICE core"},
    {"id": "tutorials", "owner": "precice", "repo": "tutorials", "label": "Tutorials"},
]


def http_get_json(url, headers=None):
    request = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(request) as response:
        payload = json.load(response)
        return payload, response.headers


def parse_last_page(link_header):
    if not link_header:
        return None

    for link_part in link_header.split(","):
        if 'rel="last"' not in link_part:
            continue
        match = re.search(r"[?&]page=(\d+)", link_part)
        if match:
            return int(match.group(1))
    return None


def fetch_contributor_count(owner, repo):
    endpoint = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/contributors?anon=1&per_page=1"
    try:
        contributors, headers = http_get_json(endpoint, GITHUB_HEADERS)
    except urllib.error.HTTPError as error:
        print(f"Could not fetch contributors for {owner}/{repo}: HTTP {error.code}")
        return None
    except urllib.error.URLError as error:
        print(f"Could not fetch contributors for {owner}/{repo}: {error}")
        return None

    if not contributors:
        return 0

    last_page = parse_last_page(headers.get("Link"))
    return last_page if last_page is not None else len(contributors)


def fetch_latest_release(owner, repo):
    endpoint = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/releases/latest"
    try:
        release, _ = http_get_json(endpoint, GITHUB_HEADERS)
    except urllib.error.HTTPError as error:
        # Some repositories may not have a latest release.
        if error.code == 404:
            return None
        print(f"Could not fetch latest release for {owner}/{repo}: HTTP {error.code}")
        return None
    except urllib.error.URLError as error:
        print(f"Could not fetch latest release for {owner}/{repo}: {error}")
        return None

    assets = release.get("assets", [])
    return {
        "name": release.get("name") or release.get("tag_name"),
        "tag_name": release.get("tag_name"),
        "published_at": release.get("published_at"),
        "url": release.get("html_url"),
        "assets_count": len(assets),
        "downloads_count": sum(asset.get("download_count", 0) for asset in assets),
    }


def fetch_github_repo_metrics(repo_data):
    owner = repo_data["owner"]
    repo = repo_data["repo"]
    endpoint = f"{GITHUB_API_BASE}/repos/{owner}/{repo}"

    try:
        repository, _ = http_get_json(endpoint, GITHUB_HEADERS)
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"Could not fetch repository {owner}/{repo}: HTTP {error.code}") from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"Could not fetch repository {owner}/{repo}: {error}") from error

    return {
        "id": repo_data["id"],
        "label": repo_data["label"],
        "full_name": repository.get("full_name"),
        "url": repository.get("html_url"),
        "description": repository.get("description"),
        "stars": repository.get("stargazers_count"),
        "forks": repository.get("forks_count"),
        "open_issues": repository.get("open_issues_count"),
        "watchers": repository.get("subscribers_count"),
        "contributors": fetch_contributor_count(owner, repo),
        "latest_commit_at": repository.get("pushed_at"),
        "latest_release": fetch_latest_release(owner, repo),
    }


def fetch_discourse_metrics():
    data, _ = http_get_json(DISCOURSE_ABOUT_URL)
    about = data.get("about", {})
    stats = about.get("stats", {})

    return {
        "url": "https://precice.discourse.group",
        "title": about.get("title"),
        "site_creation_date": about.get("site_creation_date"),
        "users_count": stats.get("users_count"),
        "topics_count": stats.get("topics_count"),
        "posts_count": stats.get("posts_count"),
        "active_users_30_days": stats.get("active_users_30_days"),
        "topics_30_days": stats.get("topics_30_days"),
        "posts_30_days": stats.get("posts_30_days"),
    }


def main():
    print("Fetching GitHub metrics...")
    github_repositories = [fetch_github_repo_metrics(repo) for repo in REPOSITORIES]

    print("Fetching Discourse metrics...")
    discourse = fetch_discourse_metrics()

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "github": {"repositories": github_repositories},
        "discourse": discourse,
    }

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        json.dump(payload, file, indent=2)

    print(f"Community metrics saved to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
