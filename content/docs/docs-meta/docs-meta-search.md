---
title: Update the search index
keywords: search, Algolia, search index, update search index
summary:
permalink: docs-meta-search.html
---

## Overview

Our search is powered by Algolia, using their [free community plan](https://www.algolia.com/pricing/). Algolia conveniently provides the `jekyll-algolia` gem at [https://github.com/algolia/jekyll-algolia](https://github.com/algolia/jekyll-algolia) for a smooth integration with jekyll.

## Configuring search

In `_config.yml` the `algolia-jekyll` gem is configured as follows:

```yaml
algolia:
  application_id: XXX
  index_name:     XXX
  search_only_api_key: XXX
  nodes_to_index: 'p,code,table'
```

Of note is the last entry `nodes_to_index` that determines which HTML tags will be indexed.

There is an upper limit on how much information one such node, e.g. the content of a `<code></code>` block, may contain. In rare cases extra long `<code>` blocks may have to be broken up into several ones.

## Updating the index

The `jekyll-algolia` gem makes updating the index a breeze. Simply change into the root directory and execute:

```bash
ALGOLIA_API_KEY='XXX' bundle exec jekyll algolia
```

Result:

```text
Configuration file: E:/code/precice.github.io_new/_config.yml
Processing site...                                                             
        Subproject: imported/tutorials/quickstart
      Adding pages: README.md
        Subproject: imported/tutorials/elastic-tube-1d
      Adding pages: README.md
        Subproject: imported/tutorials/elastic-tube-3d
      Adding pages: README.md
        Subproject: imported/tutorials/flow-over-heated-plate
      Adding pages: README.md
        Subproject: imported/tutorials/flow-over-heated-plate-steady-state
      Adding pages: README.md
        Subproject: imported/tutorials/flow-over-heated-plate-nearest-projection
      Adding pages: README.md
        Subproject: imported/tutorials/heat-exchanger
      Adding pages: README.md
        Subproject: imported/tutorials/multiple-perpendicular-flaps
      Adding pages: README.md
        Subproject: imported/tutorials/partitioned-elastic-beam
      Adding pages: README.md
        Subproject: imported/tutorials/partitioned-heat-conduction
      Adding pages: README.md
        Subproject: imported/tutorials/partitioned-heat-conduction-complex
      Adding pages: README.md
        Subproject: imported/tutorials/perpendicular-flap
      Adding pages: README.md
        Subproject: imported/tutorials/turek-hron-fsi3
      Adding pages: README.md
        Subproject: imported/tutorials/partitioned-pipe
      Adding pages: README.md
        Subproject: imported/openfoam-adapter/docs
      Adding pages: config.md, extend.md, get.md, openfoam-support.md, README.md

Progress: |====================================================================|

Progress: |==========================================Settings are already up todate.
Getting list of existing records                                               
Updating records in index jekyll...                                            
Records to delete: 1582                                                        
Records to add: 1718                                                           

Progress: |====================================================================|
✔ Indexing complete                                                            
```

Be aware, that updates to the index count towards the limit of free operations, so it is recommended to update once a month.
