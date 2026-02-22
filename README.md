# preCICE Webpage - [precice.org](https://precice.org/)

## Local development

First install [`pre-commit`](https://repology.org/project/python:pre-commit/versions) to keep your commits clean.

The website uses [Jekyll](https://jekyllrb.com/) and [GitHub Pages](https://pages.github.com/). For most contributors, the most reliable setup is to run Jekyll in Docker.

### Recommended: run Jekyll in Docker

```bash
git clone --recurse-submodules https://github.com/precice/precice.github.io && cd precice.github.io
pre-commit install
docker run --rm --volume="${PWD}:/srv/jekyll" --workdir /srv/jekyll --publish 127.0.0.1:4000:4000 -it jekyll/jekyll:4 bash -lc "bundle install && bundle exec jekyll serve -H 0.0.0.0"
```

You can now view the website locally at `http://localhost:4000/`.

### Optional: native Ruby setup

If you prefer a native setup, install [`rbenv`](https://rbenv.org/) and `ruby-build` (for example via `apt install rbenv ruby-build`), then run `rbenv init` and follow its shell setup instructions.

```bash
git clone --recurse-submodules https://github.com/precice/precice.github.io && cd precice.github.io
pre-commit install
rbenv init
rbenv install
bundle install
bundle exec jekyll serve
```

With `rbenv` installed and activated in your shell, you can now view the website locally at `http://localhost:4000/`.

## Update submodules

Submodules do not yet get updated automatically. This means if you change something in the OpenFOAM adapter documentation or the description of the tutorials, you need to explicitly trigger an update here:

```bash
git submodule update --remote --merge
```

This updates **all** submodules. You can call it from everywhere (you do not need to `cd` into the submodule).
Afterwards, commit and push.

Do not directly edit the content of the submodules from within the website repository. This might give ugly merge conflicts.

## Pull with submodules

To pull changes including submodules

```bash
git pull --recurse-submodules
```

## Build inside a Docker container

To run a one-off production build inside Docker:

```bash
docker run --rm --volume="${PWD}:/srv/jekyll" --workdir /srv/jekyll -it jekyll/jekyll:4 bash -lc "bundle install && bundle exec jekyll build"
```

Arguments:

* `docker run`: The Docker command to run a container from an existing image
* `--rm`: Automatically remove (or not) the container when it exists
* `--volume`: Mount the current directory (`$PWD`) to `/srv/jekyll` in the container. If your host uses SELinux, append `:Z`.
* `-it`: Interactive container, capturing signals (such as `Ctrl-C`).
* `jekyll/jekyll:4`: The image
* `bundle exec jekyll build`: The command to run

## Further information

If you would like to learn more about the preCICE documentation, a good start are the [documentation of the documentation pages](https://precice.org/docs-meta-overview.html).

## Changing the news banner

Edit [`_includes/news_banner.html`](_includes/news_banner.html).

A good starting point is the following:

```html
<div class="background-light banner-container">
  <div class="container">
    <div class="row no-margin">
      <div class="col-lg-12 banner">
        <p class="no-margin">
          This is the text of my news banner.
        </p>
      </div>
    </div>
  </div>
</div>
```

Use the following to selectively change appearance.

```html
{% if include.landing %}
  Displayed on the landing page.
{% else %}
  Displayed on other pages.
{% endif %}
```

## Common issues while building the site

* If you get permission issues to install gems, resist the impulse of `sudo`: you can install the dependencies locally by running `bundle config set --local path 'vendor/bundle'` before `bundle install`.

* If you get errors like `Gem::Ext::BuildError: ERROR: Failed to build gem native extension.` or `mkmf.rb can't find header files for ruby at /usr/lib/ruby/include/ruby.h`, then (as the error message suggests), you may need to install a Ruby development environment (e.g., `ruby-dev`).

* If you are a poor soul that is stuck developing on Windows, the `-l` flag is known to crash, so best try without.

* Should you get the warning

    ```bash
    Fetching citation data failed with OpenURI::HTTPError
    ```

    while building the site locally, then you have been rate limited by Google Scholar. The citation database won't be up to date. Alternatively open [http://scholar.google.com/](http://scholar.google.com/) in a browser and complete the Captcha.

For further information see the [documentation page on common issues](https://precice.org/docs-meta-common-issues.html).

## Licenses

The content of the preCICE webpage is licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en). Third-party licenses (e.g. of the framework we use) are collected in the `licenses` subfolder. Note that preCICE itself has a software license, [LGPL v3](https://www.gnu.org/licenses/lgpl-3.0.en.html).
