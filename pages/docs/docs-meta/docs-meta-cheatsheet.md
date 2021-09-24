---
title: Documentation cheatsheet
permalink: docs-meta-cheatsheet.html
keywords: pages, migration, cheatsheet
summary:
katex: True
---

## Frontmatter

```yaml
---
title: Configuration Basics
permalink: configuration-basics.html
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

## Alerts

[Link to documentation](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_alerts.html)

```liquid
{%raw%}{% include note.html content="This is my note." %}
{% include tip.html content="This is my tip." %}
{% include warning.html content="This is my warning." %}
{% include important.html content="This is my important info." %}{%endraw%}
```

{% include note.html content="This is my note." %}

{% include tip.html content="This is my tip." %}

{% include warning.html content="This is my warning." %}

{% include important.html content="This is my important info." %}

{% include disclaimer.html content="This is a disclaimer." %}

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

```
$$ \sqrt{3x-1}+(1+x)^2 $$
```

$$ \sqrt{3x-1}+(1+x)^2 $$

In the future we might implement [server-side rendering](https://gendignoux.com/blog/2020/05/23/katex.html).

## Heading Styles

# H1 Heading

“Lorem Ipsum” is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

## H2 Heading

“Lorem Ipsum” is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

### H3 Heading

“Lorem Ipsum” is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

#### H4 Heading

“Lorem Ipsum” is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

##### H5 Heading

“Lorem Ipsum” is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
