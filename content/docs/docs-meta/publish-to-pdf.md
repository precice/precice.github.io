---
title: Generate PDF Documentation
permalink: docs-meta-publish-to-pdf.html
keywords: pdf, publish to pdf, generate pdf
summary:
---

## Overview and tools needed

At the core of PDF generation process is [Prince](https://www.princexml.com/), which converts HTML/CSS (and even some JS) to print quality PDF with bookmarks, links, page numbers etc. Unfortunately there are no open-source alternatives that operate at the same level as Prince (yet) - however, Prince offers a [non-commercial license](https://www.princexml.com/purchase/license_faq/#non-commercial) that is perfectly suited for our use-case. As a requisite a water-mark is displayed on the first page of the PDF and we must place prominent links to the Prince website at the places we intend to serve the PDF.

Prince can be downloaded [here](https://www.princexml.com/download/). The minimum version for MathJax 3 support is `20210624` which you can find [here](https://www.princexml.com/latest/).

On a Windows environment it makes sense to add the location of the Prince executable, e.g. `C:\Program Files (x86)\Prince\engine\bin`, to the `PATH`.

## Build process

The bash script 'pdf-docs.sh' in root can be used to build the PDF. It goes through the following steps

### Build a web target with jekll

First, let's kill all running instances of jekyll:

```bash
kill -9 $(ps aux | grep '[j]ekyll' | awk '{print $2}')
```

Then build the site locally with jekyll:

```bash
bundle exec jekyll serve --detach --config _config.yml,pdfconfigs/config_docs_pdf.yml
```

The `--detach` option is not strictly necessary, it detaches jekyll from the terminal. For debugging reasons it might actually be preferable to use two separate shells in parallel.

Note that in a Windows environment the `--detach` option will likely fail and that the  `--config` option, which specifies a list of `config.yml`s to be used, needs to be enclosed in `"`:

```bash
bundle exec jekyll serve --config "_config.yml,pdfconfigs/config_docs_pdf.yml"
```

At this point the site is up and can be accessed at `http://localhost:4000/`.

In the directory `pdfconfigs` there is a file called `prince-list.txt` that looks like this:

```liquid
{%raw%}{% for entry in sidebar %}
    {% for folder in entry.folders %}
        {% if folder.output contains "pdf" %}
            {% for folderitem in folder.folderitems %}
                {% if folderitem.output contains "pdf" %}

                {{folderitem.url}}

                {% endif %}
            {% endfor %}
        {% endif %}
      {% endfor %}
 {% endfor %}{%endraw%}
 ```

I.e. we loop through every item in the appropriate `sidebar.yml`, check whether `output` is `pdf`, and if so print the item's URI. As a result, after running jekyll, `prince-list.txt` contains a list of URIs for all items in `sidebar.yml`:

```txt
http://localhost:4000/titlepage.html
http://localhost:4000/tocpage.html
http://localhost:4000/docs.html
[...]
```

### Convert to PDF

This list is consumed by Prince and converted into PDF:

```bash
prince --javascript --input-list=_site/pdfconfigs/prince-list.txt -o pdf/docs.pdf
```

The final PDF can be found in `pdf/docs.pdf` as specified. The `--javascript` option enables JavaScript support.

## Styling

The web target built by

```bash
bundle exec jekyll serve --config "_config.yml,pdfconfigs/config_docs_pdf.yml"
```

is different from a usual build only in the way it specifies a second `config.yml` namely `pdfconfigs/config_docs_pdf.yml`. From a styling perspective the latter includes a different default layout of type `page_print`:

```yml
defaults:
  -
    scope:
      path: ""
      type: "pages"
    values:
      layout: "page_print"
      comments: true
      search: true
```

This layout type includes a separate `<head></head>` in the form of `_includes/head_print.html`. Apart from some minor changes, e.g. by referencing resources such as stylesheets, scripts and fonts locally, it also points to `css/printstyles.css`. This is where styles specific to the PDF are stored.

For further reference consult the [documentation of documentation-theme-jekyll](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_generating_pdfs.html).

## Contents, title page and table of contents

The PDF will contain every page of type `pdf` that is referenced in the sidebar `pdf_sidebar` in `pdfconfigs/config_docs_pdf.yml`. E.g. if

```yml
pdf_sidebar: docs_sidebar
```

and `docs_sidebar.yml` is

```yml
  - title: "A selection of fruits"
    output: web, pdf
    folderitems:

    - title: Apples
      url: /apples.html
      output: web, pdf

    - title: Oranges
      url: /oranges.html
      output: web
```

the PDF will contain `apples.html` but not `oranges.html`.

Furthermore two more pages have to be included in `docs_sidebar.yml`:

```yml
  - title:
    output: pdf
    type: frontmatter
    folderitems:

    - title:
      url: /titlepage.html
      output: pdf
      type: frontmatter

    - title:
      url: /tocpage.html
      output: pdf
      type: frontmatter
```

These two pages are located in `pdfconfigs/` and govern the layout of the title page as well as the table of contents.

For further information see [here](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_generating_pdfs.html).

## Troubleshooting and common issues

### Warnings by prince

Prince XML is different from a browser in the way it handles HTML/CSS more rigorously and will warn about every CSS property that are not 100% W3C compliant. Bootstrap, say, on the other hand, does make use of CSS hacks deliberately.

Prince also consumes one page at a time and doesn't cache common resources (stylesheets, scripts, etc) like a browser.

Due to these two points, taken together, Prince can output a long number of warnings in the conversion process.

### Make resources available locally

Because Prince consumes HTML pages one at a time, it is convenient to make resources (stylesheets, scripts, fonts etc.) available locally and not have them fetched from a CDN. For this purpose a separate `_includes/head_print.html` exists. Note that also secondary resources (resources referenced in resources) need to be held locally, e.g. `bootstrap.min.css` references `bootstrap.min.css.map`.

### Missing glyphs or fonts

If Prince complains about missing glyphs or fonts make sure that the specified fonts are either available as resources (as a `*.ttf`, `*.woff` etc) or installed on the local machine. In our case, at the time of writing, this includes

* Fira Sans Light, Regular, Medium, Bold, Italic (in `./fonts`)
* Fira Mono Regular (in `./fonts`)
* Font Awesome 5 (in `./webfonts`)
* Glyphicons halflings (in `./fonts`)
* KaTeX fonts (in `./css/fonts`)

The location of these fonts has to be relative to where they are referenced, e.g. `css/fontawesome5.14.0.min.css` mentions `url(../webfonts/fa-brands-400.woff2)`.

For further information see the [Prince documentation on missing fonts](https://www.princexml.com/doc/troubleshooting/).

### Troubleshooting

A useful hack is to modify `prince-list.txt` to only contain reference to a single html page, that can then be easily troubleshooted.

For further information see the [Prince documentation on troubleshooting](https://www.princexml.com/doc/troubleshooting/).

### Overriding bootstrap print styles

Bootstrap by default sets color values to black for all elements for `@media print`. To override this behaviour modify the (local) minified `bootstrap.min.css` from

```css
@media print{*,:after,:before{color:#000!important;text-shadow:none!important;background:0 0!important;-webkit-box-shadow:none!important;box-shadow:none!important}
```

to

```css
@media print{*,:after,:before{/*color:#000!important;*/text-shadow:none!important;/*background:0 0!important*/;-webkit-box-shadow:none!important;box-shadow:none!important}
```

This is considered a hack and needs to be repeated with every update of Bootstrap. For more information see [documentation-theme-jekyll docs](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_generating_pdfs.html#overriding-bootstrap-print-styles).

### KaTeX

We are using KaTeX for the rendering of LaTeX formulas in the documentation. In order for KaTeX to work with prince, a rendering script has been added in '_includes/head_print.html'.
