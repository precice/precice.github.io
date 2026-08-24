---
title: Documentation of the documentation
keywords: pages, authoring, front matter, Hugo, modules
summary: "An introduction to developing the preCICE documentation with Hugo: local builds, navigation, page structure, front matter, and imported content."
permalink: docs-meta-overview.html
aliases:
  - /docs-meta-overview.html
---

## About the content

Most of this documentation focuses on the technical side of writing content.
See the [content guidelines](docs-meta-content-guidelines.html) to learn what
the content should look like.

## About the website

The website is built with [Hugo](https://gohugo.io/). Website-owned Markdown
pages live in `content/`, navigation data lives in `data/sidebars/`, and shared
templates live in `layouts/`. Hugo combines these with static files and
documentation imported from other preCICE repositories.

## Getting started

Install Hugo Extended and Go using the versions listed in the repository
`README.md`, then run:

```bash
hugo server
```

Open <http://localhost:1313/>. Hugo watches local files and rebuilds the site
when they change. On the first run, it downloads the module versions recorded
in `go.mod`.

Before opening a pull request, use the production build:

```bash
hugo mod verify
hugo --gc --minify --cleanDestinationDir --environment production
```

## How the website works in a nutshell

The two main ingredients behind the website are:

1. **The sidebar:** the navigation tree. The sidebar partial renders the YAML
   files in `data/sidebars/` into the navigation shown on each page.
2. **A set of pages:** Markdown files in `content/` and mounted Markdown files
   from imported repositories. Hugo renders them to HTML using the templates in
   `layouts/`.

### Sidebar

The sidebar data retains the established three-level structure. For example,
the following excerpt from `data/sidebars/docs_sidebar.yml` represents a page
with nested pages:

```yaml
entries:
- title: sidebar
  product: Documentation
  folders:
  - title: Configuration
    output: web, pdf
    folderitems:
    - title: Basics
      url: /configuration-introduction.html
      output: web, pdf
      subfolders:
      - title: Coupling scheme
        output: web, pdf
        subfolderitems:
        - title: Overview
          url: /configuration-coupling.html
          output: web, pdf
```

The `url` of each entry must match the rendered page URL. The `output` field
controls whether the entry appears on the website, in the compiled offline PDF
(`web, pdf`), or only on the website (`web`). For details on PDF target
filtering, see [Publish to PDF](/docs-meta-publish-to-pdf.html). Keep the
established `.html` URLs when moving an existing page, and use an alias when a
page URL must change.

### Where to save files

Save website-owned Markdown files below `content/` in the section that owns
them. The directory structure is meaningful to Hugo: a directory containing
`_index.md` is a section and its path contributes to page URLs.

```text
content/
└── docs/
    └── configuration/
        └── basics/
            └── introduction.md
```

To maintain backward compatibility with established top-level URLs (such as
`/configuration-introduction.html`) without breaking external links or
bookmarks, pages define `aliases` to redirect from flat URL patterns to
their nested location.

### Naming conventions

Hugo derives URLs from content paths, so file names no longer need to be unique
across the complete documentation tree. Use descriptive, lower-case file names
with hyphens instead of underscores, for example
`configuration-introduction.md`. Use the singular form where it reads
naturally. Preserve an existing public URL with `permalink` or `aliases` when a
file is moved.

### Minimal viable front matter

Every page needs a title. Existing pages should retain their `permalink` to
preserve public URLs; new pages usually derive their URL from their path. Add
keywords and a summary where they improve search and page metadata.

```yaml
---
title: Configuration basics
permalink: configuration-introduction.html
keywords: configuration, basics, overview
summary: "Configure participants, meshes, exchanged data, mappings, and coupling schemes."
---
```

Use `aliases` to redirect previous URLs to the page:

```yaml
aliases:
  - /configuration-introduction.html
```

The [documentation cheatsheet](docs-meta-cheatsheet.html) lists supported front
matter fields and Hugo shortcodes.

## Rendering content from external repositories

Some website content is maintained in the repository that owns the related
adapter, tutorial, or tool. This keeps documentation close to the code while
presenting it in one place on the website. Hugo Modules mount that source
content into the website's content tree.

To add a new imported repository:

1. Add its module import and mounts in `config/_default/module.toml`, and add
   the corresponding edit-link mapping in `config/_default/params.toml`.
2. Run `hugo mod get github.com/precice/my-project@<revision>` (to fetch and pin
   the target commit or branch in `go.mod`).
3. Run `hugo mod tidy` (to prune unused dependencies) and `hugo mod verify` (to
   validate checksums in `go.sum`).
4. Add the rendered pages to a sidebar file (`data/sidebars/`).
5. Build the website locally (`hugo server`) and verify the page URLs,
   edit links, and last-modified dates.

The `Update Hugo modules` workflow checks the imported repositories and updates
their selected revisions in `go.mod` and `go.sum`. Do not copy imported content
into this repository or edit the downloaded module cache. Make content changes
upstream, then update the recorded module revision.
