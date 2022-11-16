# preCICE Webpage - [precice.org](https://precice.org/)

## Local development

The website is using [Jekyll](https://jekyllrb.com/) static website generator and [Github pages](https://pages.github.com/).
To run and develop it locally you would need [Ruby](https://www.ruby-lang.org/en/) and [Bundler](https://bundler.io/).
With Ruby, you can install bundler using `gem install bundler`.

After that all you need is:

```bash
git clone https://github.com/precice/precice.github.io && cd precice.github.io
bundle install
git submodule init
git submodule update
bundle exec jekyll serve -l
```

You can now view website locally in your browser at `localhost:4000`.

## Update submodules

Submodules do not yet get updated automatically. This means if you change something in the OpenFOAM adapter documentation or the description of the tutorials, you need to explicitly trigger an update here:

```bash
git submodule update --remote --merge
```

This updates **all** submodules. You can call it from everywhere (you do not need to `cd` into the submodule).
Afterwards, commit and push.

Do not directly edit the content of the submodules from within the website repository. This might give ugly merge conflicts.

## Further information

If you would like to learn more about the preCICE documentation, a good start are the [documentation of the documentation pages](https://precice.org/docs-meta-overview.html).

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
