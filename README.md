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
bundle exec jekyll serve --safe -l
```

You can now view website locally in your browser at [localhost:4000](http://localhost:4000)

If you are a poor soul that is stuck developing on Windows the `--safe -l` flag is known to crash, so best try without.

## Update submodules

Submodules do not yet get updated automatically. This means if you change something in the OpenFOAM adapter documentation or the description of the tutorials, you need to explicitely trigger an update here:

```bash
git submodule update --remote --merge
```

This updates **all** submodules. You can call it from everywhere (you do not need to `cd` into the submodule).
Afterwards, commit and push.

Do not directly edit the content of the submodules from within the website repository. This might give ugly merge conflicts.

## Further information

If you would like to learn more about the preCICE documentation, a good start are the [documention of the documentation pages](https://precice.org/docs-meta-overview.html).
