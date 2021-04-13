---
title: Contribute to preCICE
permalink: community-contribute-to-precice.html
keywords: contribute, develop
summary:
toc: true
---

Do you enjoy improving whatever you can? Did you find a bug in preCICE or one of the adapters? Have you developed a new simulation that could serve as a tutorial? We can use your help!

## Contributing documentation

You (yes, you) have already found something that can be improved in this website:
maybe an unclear part, maybe a broken link, maybe even a small typo.
Simply click the `Edit me` button at the top of the respective page to see
the source file of the page. You can then click `Edit this file`
and submit your changes as a [Pull Request on GitHub](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests).
Don't worry: you cannot break anything! We will review your suggestions
and merge them as soon as possible.

These pages are written in [Markdown](https://guides.github.com/features/mastering-markdown/) (a very easy language)
and we also have a [cheatsheet](docs-meta-cheatsheet.html) specifically for this website.

We [migrated](docs-meta-migration-guide.html) our documentation from multiple different sources to this website in December 2020
and some topics may still be incomplete. This is a perfect opportunity to contribute!

## Reporting issues

After discussing a problem in one of our [community channels](community-channels.html), we may conclude that this is a bug
we should fix, or a nice feature we could add. In that case, we will ask you to [create a GitHub issue](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/creating-an-issue).

We keep each issue in the repository that contains the respective code, mainly:
- [`precice/precice`](https://github.com/precice/precice/issues)
- [`precice/tutorials`](https://github.com/precice/tutorials/issues)
- adapters

Please follow the issue template of each repository and provide as much information as possible, in particular the
affected versions, error logs, and configuration files involved. However, it would also help if you select the files you upload
and avoid sending complete simulation cases via cloud services.

In any case, you can use [Markdown](https://guides.github.com/features/mastering-markdown/) to format your message
and in particular your code/log snippets.

## Testing upcoming versions

When we try to fix an issue or to offer new functionality, we contribute and discuss in Pull Requests.
You can help us test the new features by [trying a pull request](https://precice.discourse.group/t/i-was-asked-to-try-a-pull-request-how-can-i-do-that/38).

You can also use preCICE from the [develop branch](https://github.com/precice/precice/tree/develop/) and report anything suspicious before we release it.

## Contributing tutorials

After working on your new simulation case, you may want to share it with the community to use as a starting point,
or to demonstrate a new feature. We welcome contributions to our [tutorials repository](https://github.com/precice/tutorials/)
and we will discuss it with you over a few [review](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/reviewing-proposed-changes-in-a-pull-request) iterations.

### Structure of a tutorial

Our tutorials generally follow a file structure similar to this:
```bash
- <tutorial>/               # e.g. perpendicular-flap/
  - README.md               # description of the case
  - precice.config.xml      # a works-with-all preCICE configuration file
  - clean-tutorial.sh       # a symbolic link (see ../tools/)
  - <visualization scripts> # gnuplot or simple Python scripts
  - images/                 # any images used by the documentation
  - <participant1-solver1>/ # e.g. fluid-openfoam/
    - run.sh                # a short script to run the solver1 case
    - clean.sh              # a short script to clean the solver1 case
    - <the solver1 files>
  - <participant2-solver2>/ # e.g. solid-dealii/
    - run.sh
    - clean.sh
    - <the solver2 files>
```
Your case may already fit into one of the existing tutorials. If not, feel free to start a new one!

### Guidelines and hints

- Contribute only the files necessary for running the tutorial (no results or user-specific files). You can check this by looking at the "Files changed" tab on GitHub.
- In the [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) description, include everything we may need to review and run your tutorial:
  - Why is this case a good fit for our tutorials? What is different from other tutorials?
  - How did you create the setup? Do we need any additional tools?
  - Which versions of preCICE, adapters, and solvers have you tried?
  - If it is a solver we don't already support, how can we get it?
  - How should the results look like? A screenshot would be very helpful.
- In the `README.md` file, document the scenario setup, the dependencies, how to run it, how to visualize the results, and an example picture or video of the results. Follow the general structure in the existing tutorials.
- The run scripts (`run.sh`) should be very short. You can probably reuse some of the scripts we already provide.
- For the `clean.sh` script, you can use the functions provided in `tools/cleaning-tools.sh`
- If there is already a `precice-config.xml` for the case you are simulating, please use the same one (or contribute changes to that). We want that all solvers that can simulate a given case use the same preCICE configuation file.

### Naming conventions

- Directories use `-` to separate words, not `_`, and only use lowercase.
- Data and mesh names should start with uppercase and use `-` as separator.
- Data names are in singular, e.g. `Stress`, `Heat-Flux`.
- Mesh names start with the participant/domain name, e.g. `Fluid-Mesh`.
- Watchpoint names should be describing the point, not be a generic name. 

### What to check before submitting
- Check your shell scripts with [shellcheck](https://github.com/koalaman/shellcheck/):
   ```bash
   shellcheck <script.sh>
   ```
   and format them with any formatter (e.g. make sure there is an empty line at the end of the script).
   Please start your shell scripts with `#!/bin/sh` and enable exit on error and undefined variables: `set -e -u`.
- Format your `precice-config.xml` file with the [preCICE formatting tools](dev-docs-dev-tooling.html#formatting-the-code):
  ```bash
  precice/tools/formatting/config-formatter -i precice-config.xml
  ```
- Format your Python scripts with PEP8:
   ```bash
   autopep8 --in-place --aggressive --aggressive --max-line-length 120 <file>.py
   ```
- Check your `precice-config.xml` file with the [config-visualizer](tooling-config-visualization.html). Are there any unused meshes or data?
- Remove any comments and any explicitly-set defaults from the `precice-config.xml`. Don't worry if this sounds complicated, we will let you know in the review.
- Clean-up the files: remove commented-out code, remove scripts that are not needed, add case-specific files in a `.gitignore`.

## Contributing code

You can pick up issues that you would like to work on from any repository you like. You may be particularly interested in the [good first issues](https://github.com/precice/precice/labels/good%20first%20issue) and we definitely need help in the [help wanted issues](https://github.com/precice/precice/labels/help%20wanted). The same labels exist in every repository.

Look for [contributing guidelines](https://github.com/precice/precice/blob/develop/docs/CONTRIBUTING.md) in each repository. The [developer documentation](dev-docs-overview.html) will also be useful.

## Helping other users

We would really appreciate it if you followed our [community channels](community-channels.html) and joined us in answering questions.
It is often much easier that you think!