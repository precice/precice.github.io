---
title: Documentation cheatsheet
permalink: docs-meta-cheatsheet.html
keywords: pages, migration, cheatsheet
summary:
---

## Frontmatter

```yaml
---
title: Configuration Basics
permalink: configuration-introduction.html
keywords: configuration, basics, overview
summary: "Usually the first paragraph of the page. If not create one or simple leave the field blank"
toc: true # optional use false to disable toc
tocheaders: h2,h3,h4 # optional use this to control which headers to show on the page
---
```

## Sidebar

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

## Alerts

[Link to documentation](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_alerts.html)

```liquid
{%raw%}{% note %}
This is my note.
{% endnote %}

{% tip %}
This is my tip.
{% endtip  %}

{% warning %}
This is my warning.
{% endwarning %}

{% important %}
This is my important info.
{% endimportant %}

{% experimental %}
This is an experimental feature.
{% endexperimental %}

{% disclaimer %}
This is my important info.
{% enddisclaimer %}{%endraw%}
```

{% note %}
This is my note.
{% endnote %}

{% tip %}
This is my tip.
{% endtip %}

{% warning %}
This is my warning.
{% endwarning %}

{% important %}
This is my important info.
{% endimportant %}

{% experimental %}
This is an experimental feature.
{% endexperimental %}

{% disclaimer %}
This is my important info.
{% enddisclaimer %}

## Version information

```liquid
{% raw %}{% version %}
No explicit version information.
{% endversion %}

{% version 1.0.0 %}
Feature new in 1.0.0
{% endversion %}

{% version 9.0.0 %}
Feature new in 9.0.0. Useful for publishing documentation of an upcoming version.
{% endversion %}{% endraw %}
```

{% version %}
No explicit version information
{% endversion %}

{% version 1.0.0 %}
Feature new in 1.0.0
{% endversion %}

{% version 9.0.0 %}
Feature new in 9.0.0. Useful for publishing documentation of an upcoming version.
{% endversion %}

## Code blocks in a list

Indent the code block as follows:

````markdown
 * first bullet point

    ```cpp
    some code
    ```

 * second bullet point
````

Result:

* first bullet point

  ```cpp
  some code
  ```

* second bullet point

## Links and Images

```md
[Some internal link](docs-meta-cheatsheet.html#links-and-images)

![alt text](images/image.png)
```

### Resize: 100% width svg

```html
<img class="img-responsive" src="images/docs/couple-your-code-parallel-coupling.svg" alt="Parallel coupling flow" style="width: 100%">
```

Use the class 'img-responsive' and style 'width: 100%'.

[Reference](https://stackoverflow.com/questions/21943108/bootstrap-3-img-responsive-images-are-not-responsive-inside-fieldset-in-firefox)

### Center

In addition to the last example add class 'center-block', an absolute 'width' and values 'margin: auto;' to the element's style.

```html
<img class="img-responsive center-block" src="images/events/precice2021.svg" alt="preCICE Workshop banner" style="width: 500px; margin: auto;">
```

## Markdown in HTML block

```html
<details markdown="1">
* `regular-prior`: In every `advance` call (also for subcycling) and in ...
</details>
```

## LaTeX Math Syntax

Use two dollar signs \$$ to delimit math syntax:

```latex
$$ \sqrt{3x-1}+(1+x)^2 $$
```

$$ \sqrt{3x-1}+(1+x)^2 $$

Please note that you already start in math mode. As a result KaTeX does not support the `align` environment because LaTeX doesn't support `align` in math mode. The `aligned` environment offers the same functionality but in math mode, so use that instead. See the [KaTeX common issues page](https://katex.org/docs/issues.html) for further information.

A failed example using `align` looks like this:

$$
\begin{align}
  \begin{cases}
    \rho \ddot{\mathbf{u}} &= \nabla \cdot \boldsymbol{\sigma}+\mathbf{b} \\
    \boldsymbol{\sigma} &= \mathbf{C} : \boldsymbol{\varepsilon} \\
    \boldsymbol{\varepsilon} &= \frac{1}{2}\left(\nabla \mathbf{u}+\left(\nabla\mathbf{u}\right)^T\right)
  \end{cases}
\end{align}
$$
&nbsp;

Now the same example with `aligned`, which is displayed properly:

```latex
$$
\begin{aligned}
  \begin{cases}
    \rho \ddot{\mathbf{u}} &= \nabla \cdot \boldsymbol{\sigma}+\mathbf{b} \\
    \boldsymbol{\sigma} &= \mathbf{C} : \boldsymbol{\varepsilon} \\
    \boldsymbol{\varepsilon} &= \frac{1}{2}\left(\nabla \mathbf{u}+\left(\nabla\mathbf{u}\right)^T\right)
  \end{cases}
\end{aligned}
$$
```

$$
\begin{aligned}
  \begin{cases}
    \rho \ddot{\mathbf{u}} &= \nabla \cdot \boldsymbol{\sigma}+\mathbf{b} \\
    \boldsymbol{\sigma} &= \mathbf{C} : \boldsymbol{\varepsilon} \\
    \boldsymbol{\varepsilon} &= \frac{1}{2}\left(\nabla \mathbf{u}+\left(\nabla\mathbf{u}\right)^T\right)
  \end{cases}
\end{aligned}
$$

In the future we might implement [server-side rendering](https://gendignoux.com/blog/2020/05/23/katex.html).

## Heading Styles

## H2 Heading

“Lorem Ipsum” is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

### H3 Heading

“Lorem Ipsum” is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

#### H4 Heading

“Lorem Ipsum” is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

##### H5 Heading

“Lorem Ipsum” is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
