---
title: Documentation of the documentation
keywords: pages, authoring, exclusion, frontmatter
summary: "This page is an introduction to the development of the preCICE documentation, based on a jekyll theme called documentation-theme-jekyll. You will learn how to run jekyll locally, about the sidebar structure, how to name and where to save documentation pages and what a minimal frontmatter looks like."
permalink: docs-meta-overview.html
---

## About the theme

This site is based on a jekyll theme by technical writer Tom Joht called [documentation-theme-jekyll](https://github.com/tomjoht/documentation-theme-jekyll). At the time of writing this theme was the second most popular documentation-style jekyll theme on [jamstackthemes.dev](https://jamstackthemes.dev/#ssg=jekyll) and has been selected for its rich feature set and clean, functional design out of the box.

In addition Tom did a great job documenting the theme (using the theme) and you can read about specific features and their implementation and use [in his documentation](https://idratherbewriting.com/documentation-theme-jekyll/index.html).

## Getting started

To develop the website locally it is recommended to install jekyll and run

```bash
bundle exec jekyll serve
```

The [theme's documentation page](https://idratherbewriting.com/documentation-theme-jekyll/index.html#2-install-jekyll) has a step-by-step guide to install jekyll and the plugin ("gem") manager `bundler`. When running jekyll for the first time you might have to install and/or update the gems first:

```bash
bundle install
bundle update
```

Now try again `bundle exec jekyll serve` and the site should be running at `http://localhost:4000/`. Jekyll will refresh and rebuild when you change files.

## How documentation-theme-jekyll works in a nutshell

The two main ingredients behind this jekyll theme are

1. **The sidebar**, i.e. the navigation tree. Jekyll builds the sidebar based on the `sidebar.yml` in the `_data/sidebars` directory. The YAML contains the relative structure of the navigation tree as well as the links to the html pages.
2. **A set of pages**, i.e. Markdown or html files. Jekyll parses the Markdown or html files in the `pages` directory, renders them to html (in case of Markdown), and places them in the root folder.

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
      url: /configuration-introduction.html
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

```text
pages
|_ docs
  |_ configuration
    |_ configuration-introduction.html
    |_ ...
  |_ installation
    |_ ...
```

### Naming conventions

{% important %}
Because of the flat hierarchy files have to be named uniquely.
{% endimportant %}

This can be easily achieved by baking in the category/topic into the filename and adds some welcome robustness, e.g.

```text
docs
|_ configuration
  |_ configuration-introduction.html
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
permalink: configuration-introduction.html
keywords: configuration, basics, overview
summary: "preCICE needs to be configured at runtime via an `xml` file, typically named `precice-config.xml`. Here, you specify which solvers participate in the coupled simulation, which coupling data values they exchange, which numerical methods are used for the data mapping and the fixed-point acceleration and many other things. "
---
```

The `permalink` has to be the full file name ending in `.html` with no leading slash `\`. During the build process jekyll processes the frontmatter and places the file at `permalink` value, i.e. in the root directory (by default is `_site`).

The [Migration Guide](docs-meta-migration-guide.html) contains more information on how to migrate preCICE documentation pages from the preCICE Github Wiki.

## Language & style

As we recently (December 2020) migrated our documentation from multiple sources to this website, you may find different styles and inconsistencies among different pages. However, here is what we aim for:

- Target group: scientists & engineers with some but limited experience with programming and with Linux, but extended experience with simulations.
- Informal style and active voice: imagine you are explaining each concept to a colleague over coffee.
- Concise, yet complete: short pages are completely fine and even preferred, as long as all the important information is there.
- Incomplete/imperfect documentation is better than no documentation: try to contribute anything you can and we can always improve it.
- We use `Sentence case for headings`, not `Title Case for Headings`. The reason is that we find that it is visually clearer, easier to keep it consistent, and we do not need to mix content with style.
- Descriptive links: avoid forms such as `you can find the documentation [here](target)`, prefer forms such as `see the [documentation](target)`.

## Rendering content from external repositories

While the main content of this website is sourced from the same [repository](https://github.com/precice/precice.github.io) that hosts the mechanics of it, some content is sourced from separate repositories. The main reason is to keep the documentation next to the respective code, so that developers can view it without looking at the website and update it in the same contribution, while users can find everything in the same place. Read more about this concept in the [preCICE v2 reference paper](https://doi.org/10.12688/openreseurope.14445.2). This practice is not yet uniformly adopted, but we are working on migrating more content.

External repositories are included as Git submodules, specified in the [`.gitmodules`](https://github.com/precice/precice.github.io/blob/master/.gitmodules) file. One example is the [tutorials](tutorials), which is covered by [additional documentation for adding new tutorials](https://precice.org/community-contribute-to-precice.html#adding-a-new-tutorial-to-the-website).

To fetch content from an external repository/project (replace the `my-*` with the actual names):

1. Specify the new module: `git submodule add https://github.com/precice/my-project imported/my-project`.
2. Set the branch to track, if not the default: `git submodule set-branch --default my-branch imported/my-project`. This is particularly useful in case you are adding new documentation via a pull request. However, remember to reset the branch after merging.
3. The above commands should have modified the `.gitmodules` file and staged changes. Commit the result and push.
4. Update all submodules with `git submodule update --remote --merge`. If successful, you should see your new project in the `imported/` directory.
5. In your GitHub pull request to the website, at the "files changed" view, you should see a submodule with a Git reference to your new project in the `imported/` directory.

To render the fetched content on the website:

1. In the file [`_config.yml`](https://github.com/precice/precice.github.io/blob/master/_config.yml), specify the newly imported directory in the list of `subprojects:`.
2. In the same file, add an entry under the `defaults:` list, associating the subproject with some layout, sidebar, a path for the "Edit me" button, and more features.
3. Remember to make the new pages discoverable, e.g., by adding them to some [sidebar](https://github.com/precice/precice.github.io/tree/master/_data/sidebars), or linking from another page.

To update the content, push to your repository and then [manually trigger the "update submodules" workflow](https://github.com/precice/precice.github.io/actions/workflows/update-submodules.yml). Alternatively, add a GitHub Actions workflows to your repository, to [update the website automatically](https://github.com/precice/tutorials/blob/master/.github/workflows/update-website.yml).
