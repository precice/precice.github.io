---
title: Landing page layout
keywords: landing page
summary: ""
permalink: docs-meta-landing-page.html
---

## So you want to edit the landing page

The preCICE documentation uses [Bootstrap 5.3.8](https://getbootstrap.com/docs/5.3/), based on [documentation-theme-jekyll](docs-meta-overview.html). The general idea is to adapt the layout and styling of the original theme as little as possible and style the landing page `index.html` relative to the original styling.

## Style sheets

The original theme consists (mainly) of

- `customstyles.css`: main style sheet
- `theme-blue.css`: assembly of color-affecting styles

For the preCICE site these have been adapted to

- `customstyles.css`: as before
- `customstyles-precice.css`: material changes to the above style sheet
- `theme-precice.css`: adaptation of color schemes
- `landing-page.css`: styles specific to the landing page.

## Full-bleed layout

Currently the landing uses a full-bleed layout with three different background colours, white (default), light blue and dark blue. The default white (i.e. no `background-color` set) is implemented through:

```html
<div class="container">
  <div class="section">
    <div class="row">
      <div class="col-lg-12">
        Some content
      </div>
    </div>
  </div>
</div>
```

A non-white background is achieve by wrapping the above in `<div class="background-light"></div>` or  `<div class="background-dark"></div>`.

## Bootstrap grid

Let's further break down the structure of the code example.

```html
<div class="container">       <!-- Bootstrap grid -->
  <div class="section">
    <div class="row">         <!-- Bootstrap grid -->
      <div class="col-lg-12"> <!-- Bootstrap grid -->
        Some content
      </div>
    </div>
  </div>
</div>
```

The highlighted classes implement the [Bootstrap grid](https://getbootstrap.com/docs/5.3/layout/grid/) whereas `.section` is a custom style.
As a quick visual example, when the following `.row`s are placed in `.container` we use column classes like `.col-md-8` or `.col-lg-12`: the middle token is the breakpoint (`sm`, `md`, `lg`, `xl`, `xxl`) and the number is the span from 1–12. For more information see the [Bootstrap docs](https://getbootstrap.com/docs/5.3/layout/grid/).

Code:

```html
<div class="row">
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
</div>
<div class="row">
  <div class="col-md-8">.col-md-8</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-6">.col-md-6</div>
  <div class="col-md-6">.col-md-6</div>
</div>
```

Output:
<style>
.demo-grid {
  background-color: aliceblue;
  border: 1px solid darkgrey;
  margin-bottom: 10px;
  padding: 10px;
}
</style>
 <div class="row">
   <div class="col-md-1 demo-grid">.col-md-1</div>
   <div class="col-md-1 demo-grid">.col-md-1</div>
   <div class="col-md-1 demo-grid">.col-md-1</div>
   <div class="col-md-1 demo-grid">.col-md-1</div>
   <div class="col-md-1 demo-grid">.col-md-1</div>
   <div class="col-md-1 demo-grid">.col-md-1</div>
   <div class="col-md-1 demo-grid">.col-md-1</div>
   <div class="col-md-1 demo-grid">.col-md-1</div>
   <div class="col-md-1 demo-grid">.col-md-1</div>
   <div class="col-md-1 demo-grid">.col-md-1</div>
   <div class="col-md-1 demo-grid">.col-md-1</div>
   <div class="col-md-1 demo-grid">.col-md-1</div>
 </div>
 <div class="row">
   <div class="col-md-8 demo-grid">.col-md-8</div>
   <div class="col-md-4 demo-grid">.col-md-4</div>
 </div>
 <div class="row">
   <div class="col-md-4 demo-grid">.col-md-4</div>
   <div class="col-md-4 demo-grid">.col-md-4</div>
   <div class="col-md-4 demo-grid">.col-md-4</div>
 </div>
 <div class="row">
   <div class="col-md-6 demo-grid">.col-md-6</div>
   <div class="col-md-6 demo-grid">.col-md-6</div>
 </div>
## Typical example

In the case of the landing page a typical example looks like this:

```html
<div class="background-light">
  <div class="container">
    <div class="section">

      <div class="row">
        <div class="col-lg-12">
          <h2 class="section-header">A new section that wasn't there before</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 col-sm-6">
        </div>
        <div class="col-md-4 col-sm-6">
        </div>
        <div class="col-md-4 col-sm-6">
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <a href="#" class="btn btn-primary no-icon" role="button">Link &nbsp;<i class="fas fa-chevron-right"></i></a>
        </div>
      </div>

    </div> <!-- section -->
  </div> <!-- container -->
</div> <!-- background-light -->
```

This proto-example of

 1. a section header,
 2. some content, and a
 3. concluding link

consists of a separate `.row` for each of the three elements, followed by one or more `.col-X-Y` that make up a total width of 12.
