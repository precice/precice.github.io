# preCICE website - [precice.org](https://precice.org/)

## Building the website locally

The website uses the [Hugo](https://gohugo.io/) static site generator and
[GitHub Pages](https://pages.github.com/). Install Hugo Extended and Go using
the versions configured in the GitHub Actions workflows. Follow Hugo's
[installation guide](https://gohugo.io/installation/) and Go's
[installation guide](https://go.dev/doc/install); Hugo Extended is required for
the site's asset pipeline. Hugo Modules require Git and Go, as described in the
[Hugo Modules documentation](https://gohugo.io/hugo-modules/use-modules/). Node.js
is only needed when working on Algolia search.

After installation, check the tools before building:

```bash
hugo version
go version
```

Clone the repository and start the local development server:

```bash
git clone https://github.com/precice/precice.github.io.git
cd precice.github.io
hugo server
```

You can now view the website locally at <http://localhost:1313/>. On the first
build, Hugo automatically downloads the module versions recorded in `go.mod`.

## Contributing

First install [pre-commit](https://pre-commit.com/) using its
[installation instructions](https://pre-commit.com/#install) to keep commits
clean:

```bash
pre-commit install
```

Before opening a pull request, run the production build and verify that all checks pass:

```bash
hugo mod verify
hugo --gc --minify --cleanDestinationDir --environment production
pre-commit run --all-files
```

## Update imported documentation

Adapter, tutorial, and tooling documentation is included through Hugo Modules.
The `Update Hugo modules` workflow checks the upstream repositories daily and
records the selected revisions in `go.mod` and `go.sum`.

To update the imported documentation locally, run:

```bash
python3 tools/sync_hugo_modules.py
```

Review and commit the resulting `go.mod` and `go.sum` changes. Do not edit
downloaded module files from this repository; make documentation changes in the
repository that owns them.

Adding a new imported project requires an import and mounts in
`config/_default/module.toml`, an edit-link mapping in
`config/_default/params.toml`, and a navigation entry where appropriate. Adding
a tutorial currently also requires an entry in
`data/sidebars/tutorials_sidebar.yml`.

## Search

Hugo writes the search export to `public/algolia.json`. Validate the generated
records without uploading them with:

```bash
npm --prefix tools ci
npm --prefix tools run test:algolia
hugo --gc --minify --cleanDestinationDir --environment production
npm --prefix tools run algolia:index -- --dry-run
```

See [the search documentation](content/docs/docs-meta/search.md) for
configuration and credential setup.

## Further information

The [documentation of the documentation pages](https://precice.org/docs-meta-overview.html)
explains the website structure, navigation, front matter, and imported content.

## Changing the news banner

Edit [`layouts/partials/news_banner.html`](layouts/partials/news_banner.html).
The partial explains how to enable or disable the banner, change its text and
link, and choose whether it appears on the landing page or on other pages.

## Common issues while building the site

- If Hugo cannot download a module, first check that Git and Go are installed,
  then run `hugo mod verify`. A fresh clone needs network access to download the
For further information, see [common issues](content/docs/docs-meta/common-issues.md).

## Licenses

The content of the preCICE webpage is licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en). Third-party
licenses are collected in the `licenses` subfolder. preCICE itself is licensed
under [LGPL v3](https://www.gnu.org/licenses/lgpl-3.0.en.html).
