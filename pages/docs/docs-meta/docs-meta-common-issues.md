---
title: Common Issues
permalink: docs-meta-common-issues.html
keywords: issues, troubleshooting, bugs, errors, warnings, documentation, jekyll, build locally
summary:
---

## Jekyll error '429 Too Many Requests'

When building the site locally in frequent succession, Jekyll might complain in the following way:

```txt
Error: 429 Too Many Requests
```

**Cause**

In order to retrieve the current number of citations on Google Scholar, we use the `nokogiri` gem to scrape [http://scholar.google.com/scholar?hl=en&cites=5053469347483527186](http://scholar.google.com/scholar?hl=en&cites=5053469347483527186) and extract the number of citations (for more information see `_plugins/googlescholar.rb`). Frequent scraping attempts can hot Google's rate limite and lead to a soft IP ban.

**Solution**

Either visit [http://scholar.google.com](http://scholar.google.com) in your browser and solve the Captcha or deactive the `googlescholar.rb` plugin temporarily, e.g. by renaming it to `googlescholar.rb_`.
