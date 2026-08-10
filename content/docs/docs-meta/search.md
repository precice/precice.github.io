---
title: Update the search index
keywords: search, Algolia, search index, update search index
summary: "Build, validate, and publish the Hugo-generated Algolia search index."
permalink: docs-meta-search.html
aliases:
  - /docs-meta-search.html
---

## Overview

The website search is powered by [Algolia](https://www.algolia.com/). Hugo
generates `public/algolia.json` from rendered page content, and the Node.js CLI
in `tools/algolia-index.mjs` converts that export into Algolia records and
atomically replaces the configured index. This replaces the former
`jekyll-algolia` plugin.

## Configuring search

The public frontend settings are configured under `[params.algolia]` in
`config/_default/hugo.toml`:

```toml
[params.algolia]
application_id = "your-application-id"
index_name = "your-index-name"
search_only_api_key = "your-search-only-key"
nodes_to_index = "p,code,table"
max_record_size = 20000
```

`nodes_to_index` controls which rendered HTML elements become search records.
`max_record_size` is the maximum serialized record size accepted by the target
Algolia plan; the indexer validates and splits records as needed. The
search-only key is visible in the browser and must be restricted to search
access. Never commit an indexing key.

## Updating the index

First install the Node.js dependencies and build the Hugo export:

```bash
npm ci
npm run test:algolia
hugo --gc --minify --cleanDestinationDir --environment production
npm run algolia:index -- --dry-run
```

The dry run validates the JSON schema, configured selector, record sizes, and
resulting records without contacting Algolia. To publish after that validation,
provide a restricted indexing key in the environment:

```bash
export ALGOLIA_APP_ID="your-application-id"
export ALGOLIA_WRITE_API_KEY="your-restricted-indexing-key"
export ALGOLIA_INDEX_NAME="your-index-name"
npm run algolia:index
```

The indexing key needs `addObject`, `deleteIndex`, and `editSettings`
permissions, and its index restriction must include the temporary index prefix
used for atomic replacement. Production updates run through the `Update the
Algolia search index` workflow, which reads these values from repository
secrets.

See [`docs/algolia.md`](https://github.com/precice/precice.github.io/blob/hugo/docs/algolia.md)
for complete dashboard, test-index, and query-validation instructions.
