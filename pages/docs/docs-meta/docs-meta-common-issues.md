---
title: Troubleshooting and Common Issues
permalink: docs-meta-common-issues.html
keywords: issues, troubleshooting, bugs, errors, warnings, documentation, jekyll, build locally
summary:
---

## Jekyll error '429 Too Many Requests'

When building the site locally in frequent succession, Jekyll might complain in the following way:

```bash
 open-uri.rb:364:in `open_http': 429 Too Many Requests (OpenURI::HTTPError)
```

### Cause

In order to retrieve the current number of citations on Google Scholar, we use the `nokogiri` gem to scrape [http://scholar.google.com/scholar?hl=en&cites=5053469347483527186](http://scholar.google.com/scholar?hl=en&cites=5053469347483527186) and extract the number of citations (for more information see `_plugins/googlescholar.rb`). Frequent scraping attempts can hit Google's rate limit and lead to a soft IP ban.

### Solution

Either visit [http://scholar.google.com](http://scholar.google.com) in your browser and solve the Captcha or deactivate the `googlescholar.rb` plugin temporarily, e.g. by renaming it to `googlescholar.rb_`, or commenting out its comments.

## Jekyll crashes on Windows

Some of the flags (arguments) for running `jekyll build` or `jekyll serve` are known to crash on Windows, e.g. `--safe -l` or `--detach`. In most cases there is no workaround, because the features are simply not implemented or available in Windows, so run the command without the flag.
