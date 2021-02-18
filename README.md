preCICE Webpage https://www.precice.org/

## Local development 
The website is using [Jekyll](https://jekyllrb.com/) static website generator and [Github pages](https://pages.github.com/). 
To run and develop it locally you would need [Ruby](https://www.ruby-lang.org/en/) and [Bundler](https://bundler.io/). 
With Ruby, you can install bundler using `gem install bundler`. 

After that all you need is: 

```
git clone https://github.com/precice/precice.github.io && cd precice.github.io
bundle install
git submodule init
git submodule update
bundle exec jekyll serve --safe -l
```
You can now view website locally in your browser at http://localhost:4000

## Update submodules

Submodules do not yet get updated automatically. This means if you change something in the OpenFOAM adapter documentation or the description of the tutorials, you need to explicitely trigger an update here:
```
git submodule update --remote --merge
``` 
This updates **all** submodules. You can call it from everywhere (you do not need to `cd` into the submodule).
Afterwards, commit and push.

Do not directly edit the content of the submodules from within the website repository. This might give ugly merge conflicts.   

## SASS

We use SCSS in our project, __NOT__ the semicolon and braceless style that is SASS.

We use the front-end framework foundation 6.5.1.
The sass files are located  in `_sass`, the main settings file is `_settings.scss`.
Due to the restrictions of jekyll's strict mode we are not allowed to specify multiple search paths.

Thus, the sass-roots of foundation and its dependecies are merged in the folder `foundation`.
Please leave this directory untouched as it greatly simplifies updating the foundation framework.

The folder `precice` contains project specific files, these are all imported by `_precice.scss` at the root.
Use this folder to add new css.

`css/main.scss` is the main css file that will be compiled and compressed into the final css file.
