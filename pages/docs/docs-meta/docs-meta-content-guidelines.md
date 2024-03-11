---
title: Content guidelines
permalink: docs-meta-content-guidelines.html
keywords: pages, migration, guideline, content, best practices, style guide
summary: "Learn which style to follow when writing documentation and how to write good titles, content, and page summaries."
---

## Language & style

This is the style we aim for, even if not all documentation pages are currently ticking all the boxes (nice opportunity for [contributing](community-contribute-to-precice.html)):

- Target group: scientists & engineers with some but limited experience with programming and with Linux, but extended experience with simulations.
- Informal style and active voice: imagine you are explaining each concept to a colleague over coffee.
- Concise, yet complete: short pages are completely fine and even preferred, as long as all the important information is there.
- Incomplete/imperfect documentation is better than no documentation: try to contribute anything you can, and we can always improve it.
- We use `Sentence case for headings`, not `Title Case for Headings`. The reason is that we find that it is visually clearer, easier to keep it consistent, and we do not need to mix content with style.
- Descriptive links: avoid forms such as `you can find the documentation [here](target)`, prefer forms such as `see the [documentation](target)`.
- We use American English.

## Titles

- Always specify a `title:`
- Keep it short, specific, and avoid boilerplate.
- Avoid duplicate titles.
- Don't include navigational context such as `preCICE.org |`, `preCICE Documentaion -`. Jekyll does this automatically.

More information on the [title link guide from Google](https://developers.google.com/search/docs/appearance/title-link#page-titles).

## Page summary

- Always specify a `summary:`
- This text may be chosen as the preview text under a search result.
- Write a flowing text. Multiple sentences are fine.
- Summarize the whole page and be specific.
- Include important information like dates.

See full [snippet and meta-description guide from Google](https://developers.google.com/search/docs/appearance/snippet#meta-descriptions)

## Images

- Always specify a textual description using the full Markdown syntax: `![DESCRIPTION](LINK TO IMAGE)`. This is important both for crawlers and for screen readers.
- For rasterized graphics use PNG or [`WebP`](https://repology.org/project/libwebp/versions). For the latter, convert images using [`img2webp`](https://developers.google.com/speed/webp/docs/img2webp) with `img2webp image.png -o image.webp`.
- For animations use [`WebP`](https://repology.org/project/libwebp/versions). Convert exisiting GIFs using [`gif2webp`](https://developers.google.com/speed/webp/docs/gif2webp) or create new animations with `ffmpeg -i image%d.png -loop 0 output.webp`.
- For vectorized graphics use SVG. Make sure text renders correctly outside your browser by using common fonts or converting text to paths. In case of the latter, also add the original SVG to simplify future modifications.
- Choose a descriptive filename

See full [image best practices from Google](https://developers.google.com/search/docs/appearance/google-images).

## General content

- Avoid boilerplate content and get to the point as quickly as possible.
- If content already exists on another side, prefer linking to it. Simplifying, customizing, or summarizing external content is fine. Don't copy chunks of documentation.
- Follow the guide on [creating helpful, reliable, people-first content by Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
