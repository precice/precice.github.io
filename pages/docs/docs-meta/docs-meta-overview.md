---
title: Documentation of the documentation
keywords: pages, authoring, exclusion, frontmatter
summary: "This page is an introduction to the development of the preCICE documentation, based on a jekyll theme called documentation-theme-jekyll. You will learn how to run jekyll locally, about the sidebar structure, how to name and where to save documentation pages and what a minimal frontmatter looks like."
permalink: docs-meta-overview.html
---

## About the theme

This site is based on a jekyll theme by technical writer Tom Joht called [documentation-theme-jekyll](https://github.com/tomjoht/documentation-theme-jekyll). At the time of writing this theme was the second most popular documentation-style jekyll theme on [jamstackthemes.dev](https://jamstackthemes.dev/themes/#ssg=jekyll) and has been selected for its rich feature set and clean, functional design out of the box.

In addition Tom did a great job documenting the theme (using the theme) and you can read about specific features and their implementation and use [in his documentation](https://idratherbewriting.com/documentation-theme-jekyll/index.html).

## Getting started

To develop the website locally it is recommended to install jekyll and run

```
bundle exec jekyll serve
```

The [theme's documentation page](https://idratherbewriting.com/documentation-theme-jekyll/index.html#2-install-jekyll) has a step-by-step guide to install jekyll and the plugin ("gem") manager `bundler`. When running jekyll for the first time you might have to install and/or update the gems first:

```
bundle install
bundle update
```

Now try again `bundle exec jekyll serve` and the site should be running at [http://localhost:4000/](http://localhost:4000/). Jekyll will refresh and rebuild when you change files.

## How documentation-theme-jekyll works in a nutshell

The two main ingredients behind this jekyll theme are

1.  **The sidebar**, i.e. the navigation tree. Jekyll builds the sidebar based on the `sidebar.yml` in the `_data/sidebars` directory. The YAML contains the relative structure of the navigation tree as well as the links to the html pages.
2.  **A set of pages**, i.e. Markdown or html files. Jekyll parses the Markdown or html files in the `pages` directory, renders them to html (in case of Markdown), and places them in the root folder.

### Sidebar

Here is a snippet from the `_data\sidebars\docs_sidebar.yml` that spans (the maximum) two levels:

```yaml
entries:
- title: sidebar
  product: Docs
  version: 2.1.0
  folders:

  - title: Configuration
    output: web, pdf
    folderitems:

    - title: Basics
      url: /configuration-basics.html
      output: web, pdf

      subfolders:
      - title: Coupling Scheme
        output: web, pdf
        subfolderitems:

        - title: Overview
          url: /configuration-coupling.html
          output: web, pdf

        - title: Multi Coupling
          url: /configuration-coupling-multi.html
          output: web, pdf

    - title: Acceleration
      url: /configuration-acceleration.html
      output: web, pdf
```
### Where to save files

Save Markdown files in the `pages` directory in an appropriate subdirectory. Jekyll is agnostic to this folder structure - subdirectories are for human ease of organisation only.

```
pages
|_ docs
  |_ configuration
    |_ configuration-basics.html
    |_ ...
  |_ installation
    |_ ...
```

### Naming conventions

{% include important.html content="Because of the flat hierarchy files have to be named uniquely." %}

This can be easily achieved by baking in the category/topic into the filename and adds some welcome robustness, e.g.

```
docs
|_ configuration
  |_ configuration-basics.html
  |_ configuration-coupling.html
  |_ configuration-coupling-multi.html
```

File names should contain hyphens `-` instead of underscores `_` following best practices for [SEO](https://support.google.com/webmasters/answer/76329?hl=en).

In addition use the singular form where possible, e.g. `configration-action.html` instead of `configuration-actions.html`.

### Minimal viable frontmatter

The minimal frontmatter contains only the options `title` and `permalink` (required) but should be complemented by `keywords` and `summary` (optional).

```yaml
---
title: Configuration Basics
permalink: configuration-basics.html
keywords: configuration, basics, overview
summary: "preCICE needs to be configured at runtime via an `xml` file, typically named `precice-config.xml`. Here, you specify which solvers participate in the coupled simulation, which coupling data values they exchange, which numerical methods are used for the data mapping and the fixed-point acceleration and many other things. "
---
```

The `permalink` has to be the full file name ending in `.html` with no leading slash `\`. During the build process jekyll processes the frontmatter and places the file at `permalink` value, i.e. in the root directory (by default is `_site`).

The [Migration Guide](docs-meta-migration-guide.html) contains more information on how to migrate preCICE documentation pages from the preCICE Github Wiki.
