---
title: Migration Cheatsheet
permalink: migration-cheatsheet.html
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

```
{%raw%}{% include note.html content="This is my note." %}
{% include tip.html content="This is my tip." %}
{% include warning.html content="This is my warning." %}
{% include important.html content="This is my important info." %}{%endraw%}
```

{% include note.html content="This is my note." %}

{% include tip.html content="This is my tip." %}

{% include warning.html content="This is my warning." %}

{% include important.html content="This is my important info." %}


## Code blocks in a list

Indent the code block as follows:

````
 * first bullet point

    ```
    some code
    ```

 * second bullet point
````

Result:

 * first bullet point

    ```
    some code
    ```

 * second bullet point

## Links and Images

```
[Some internal link](migration-cheatsheet.html#links-and-images)

![alt text](images/image.png)
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

$$\sqrt{3x-1}+(1+x)^2$$

In the future we might implement [server-side rendering](https://gendignoux.com/blog/2020/05/23/katex.html).