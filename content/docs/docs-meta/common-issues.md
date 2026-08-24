---
title: Troubleshooting and common issues
permalink: docs-meta-common-issues.html
aliases:
  - /docs-meta-common-issues.html
keywords: issues, troubleshooting, Hugo, modules, build locally
summary: "Solutions for common local Hugo and module build problems."
---

## Hugo cannot download a module

Hugo Modules require Git and Go. A fresh clone downloads the versions recorded
in `go.mod` when Hugo first builds the site, so it also requires network access.
Check the local tools and verify the configured modules with:

```bash
git --version
go version
hugo mod verify
```

## Hugo reports a checksum mismatch

If an upstream repository changes a revision that was already downloaded, Go
will reject it because its content no longer matches the checksum in `go.sum`.
Do not disable checksum verification. Instead, synchronize the affected module
revision, review the resulting `go.mod` and `go.sum` changes, and commit them
together:

```bash
python3 tools/sync_hugo_modules.py
hugo mod verify
```

## Local imported content is older than upstream content

Hugo builds imported documentation from the revisions pinned in `go.mod`, not
from another checkout on your computer. Run the `Update Hugo modules` workflow
or the synchronization command above to select newer upstream revisions.

## Stale assets or cache issues

If local builds retain stale assets or encounter cache permission issues, run Hugo with `--cleanDestinationDir` and `--gc` to purge unreferenced generated assets:

```bash
hugo --cleanDestinationDir --gc
```

You can also direct Hugo to use a custom local cache directory:

```bash
HUGO_CACHEDIR=/tmp/precice-hugo-cache hugo server
```

## Search results are stale

Building the site locally only creates `public/algolia.json`; it does not automatically upload records to Algolia.

See the [Search documentation](/docs-meta-search.html) for instructions on validating and publishing search records.
