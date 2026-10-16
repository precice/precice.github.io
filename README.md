# preCICE website - [precice.org](https://precice.org/)

## Building the website locally

The website uses the [Hugo](https://gohugo.io/) static site generator and [GitHub Pages](https://pages.github.com/).
Install Hugo Extended and Go using the versions configured in the GitHub Actions workflows.
Follow Hugo's [installation guide](https://gohugo.io/installation/) and Go's [installation guide](https://go.dev/doc/install); Hugo Extended is required for the site's asset pipeline.
Hugo Modules require Git and Go, as described in the [Hugo Modules documentation](https://gohugo.io/hugo-modules/use-modules/).
Node.js is only needed when working on Algolia search.

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

You can now view the website locally at <http://localhost:1313/>.
On the first build, Hugo automatically downloads the module versions recorded in `go.mod`.

## Build inside a Docker container

Instead of building on your system (which requires some setup the first time), you can directly serve the website from a Docker container (using the [official Hugo image](https://github.com/gohugoio/hugo/pkgs/container/hugo) - [Dockerfile](https://github.com/gohugoio/hugo/blob/master/Dockerfile)).
In this directory, run the following:

```shell
docker run --rm --volume="$PWD:/project:Z" -p 1313:1313 -it ghcr.io/gohugoio/hugo:latest serve  --bind 0.0.0.0
```

Arguments:

- `docker run`: The Docker command to run a container from an existing image
- `--rm`: Automatically remove (or not) the container when it exists
- `--volume`: Mount the current directory (`$PWD`) to a directory in the container (`/project/`), so that only the current container can see the content (`:Z`)
- `--publish`: Publish the container's port 1313 (where Hugo serves the website) to the host port 1313
- `-it`: Interactive container, capturing signals (such as `Ctrl-C`)
- `ghcr.io/gohugoio/hugo:latest`: The image. If `latest` fails, v0.166.0 is known to work.
- `serve`: The Hugo command to run
- `--bind 0.0.0.0`: Bind all network addresses to the 0.0.0.0 interface (important to access the website from the host).

## Contributing

First install [pre-commit](https://pre-commit.com/) using its [installation instructions](https://pre-commit.com/#install) to keep commits clean:

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
The `Update Hugo modules` workflow checks the upstream repositories daily and records the selected revisions in `go.mod` and `go.sum`.

To update the imported documentation locally, run:

```bash
python3 tools/sync_hugo_modules.py
```

Review and commit the resulting `go.mod` and `go.sum` changes.
Do not edit downloaded module files from this repository; make documentation changes in the repository that owns them.

Adding a new imported project requires an import and mounts in `config/_default/module.toml`, an edit-link mapping in `config/_default/params.toml`, and a navigation entry where appropriate.
Adding a tutorial currently also requires an entry in `data/sidebars/tutorials_sidebar.yml`.

## Further information

The [documentation of the documentation pages](content/docs/docs-meta/overview.md) (or on the [website](https://precice.org/docs-meta-overview.html)) explains the website structure, navigation, front matter, and imported content.
See the [search documentation](content/docs/docs-meta/search.md) for details on Algolia search indexing and configuration.

## Changing the news banner

Edit [`layouts/partials/news_banner.html`](layouts/partials/news_banner.html).
The partial explains how to enable or disable the banner, change its text and link, and choose whether it appears on the landing page or on other pages.

## Common issues while building the site

If Hugo cannot download a module, first check that Git and Go are installed, then run `hugo mod verify`.
A fresh clone needs network access to download the hugo modules.
For further information, see [common issues](content/docs/docs-meta/common-issues.md).

## Licenses

The website in this repository (https://precice.org/) is maintained by the preCICE developers.
It is based on the following dependencies (as licensed), with modifications or additional code licensed under the MIT license.

Dependencies:

- [Hugo](https://gohugo.io/), which is [available on GitHub](https://github.com/gohugoio/hugo) under an [Apache 2.0 license](https://github.com/gohugoio/hugo/blob/master/LICENSE).
- Previous versions of this website were based on [Jekyll](https://jekyllrb.com/), which is [available on GitHub](https://github.com/jekyll/jekyll) under an [MIT license](https://github.com/jekyll/jekyll/blob/master/LICENSE).
- The theme is based on [documentation-theme-jekyll](https://idratherbewriting.com/documentation-theme-jekyll/), which is [available on GitHub](https://github.com/tomjoht/documentation-theme-jekyll) under an [MIT license](https://github.com/tomjoht/documentation-theme-jekyll/blob/gh-pages/LICENSE).
- The table of contents is generated using a modified version of [jekyll-table-of-contents](https://github.com/ghiculescu/jekyll-table-of-contents).
- Linked JavaScript libraries:
  - [Algolia instantsearch.js](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js), which is [available on GitHub](https://github.com/algolia/instantsearch) under an [MIT license](https://github.com/algolia/instantsearch/blob/master/LICENSE).
  - [anchorjs](https://www.bryanbraun.com/anchorjs/), which is [available on GitHub](https://github.com/bryanbraun/anchorjs) under an [MIT license](https://github.com/bryanbraun/anchorjs/blob/main/LICENSE).
  - [asciinema-player](https://docs.asciinema.org/manual/player/), which is [available on GitHub](https://github.com/asciinema/asciinema-player) under an [Apache 2.0 license](https://github.com/asciinema/asciinema-player/blob/develop/LICENSE).
  - [Boostrap](https://getbootstrap.com/), which is [available on GitHub](https://github.com/twbs/bootstrap) under an [MIT license](https://github.com/twbs/bootstrap/blob/main/LICENSE).
  - [FontAwesome free](https://fontawesome.com/license/free), which is [available on GitHub](https://github.com/FortAwesome/Font-Awesome) and [licensed](https://github.com/FortAwesome/Font-Awesome/blob/6.x/LICENSE.txt) as follows: Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License.
  - [jQuery](https://jquery.com/), which is [available on GitHub](https://github.com/jquery/jquery) under an [MIT license](https://jquery.com/license/).
  - [KaTeX](https://katex.org/), which is [available on GitHub](https://github.com/KaTeX/KaTeX) under an [MIT license](https://github.com/KaTeX/KaTeX/blob/main/LICENSE).
  - [Moment.js](https://momentjs.com/), which is [available on GitHub](https://github.com/moment/moment/) under an [MIT license](https://github.com/moment/moment/blob/develop/LICENSE).
  - [qrcode-generator](https://kazuhikoarase.github.io/qrcode-generator/js/demo/), which is [available on GitHub](https://github.com/kazuhikoarase/qrcode-generator/) under an [MIT license](https://github.com/kazuhikoarase/qrcode-generator/blob/master/LICENSE).
