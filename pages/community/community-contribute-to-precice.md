---
title: Contribute to preCICE
permalink: community-contribute-to-precice.html
keywords: contribute, develop
summary:
toc: true
---

Do you enjoy improving whatever you can? Did you find a bug in preCICE or one of the adapters? Have you developed a new simulation that could serve as a tutorial? We can use your help!

<p style="text-align: center">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/oPorUPZA9XE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

## Contributing documentation

You (yes, you) have already found something that can be improved in this website:
maybe an unclear part, maybe a broken link, maybe even a small typo.
Click the `Edit me` button at the top of the respective page to see
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
If you roughly follow the guidelines in this section, your contribution could be merged very quickly.

{% tip %}
Get in touch with us early and we will be very happy to help you with every step! Open a first draft Pull Request on GitHub and we can together bring it into a fitting shape.
{% endtip %}

First time working with Git? Watch a [short lecture on the GitHub workflow](https://www.youtube.com/watch?v=kAqp2hhv-DU), or a [longer lecture on Git](https://missing.csail.mit.edu/2020/version-control/).

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
- Start a draft [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) early on, so that people know that someone is working on this. In the description, gradually include everything we may need to review and run your tutorial:
  - Why is this case a good fit for our tutorials? What is different from other tutorials?
  - How did you create the setup? Do we need any additional tools?
  - Which versions of preCICE, adapters, and solvers have you tried?
  - If it is a solver we don't already support, how can we get it?
  - How should the results look like? A screenshot would be very helpful.
- In the `README.md` file, document the scenario setup, the dependencies, how to run it, how to visualize the results, and an example picture or video of the results. Follow the general structure in the existing tutorials. Don't forget to adapt the `permalink:` field in the beginning of the file.
- The run scripts (`run.sh`) should be very short. You can probably reuse some of the scripts we already provide.
- For the `clean.sh` script, you can use the functions provided in `tools/cleaning-tools.sh`
- If there is already a `precice-config.xml` for the case you are simulating, please use the same one (or contribute changes to that). We want that all solvers that can simulate a given case use the same preCICE configuration file.
- If you add a complete new tutorial case, the case also needs to be added to the [tutorials sidebar](https://github.com/precice/precice.github.io/blob/master/_data/sidebars/tutorial_sidebar.yml) on the [tutorials website section](tutorials.html). Please open a pull request to the [website repository](https://github.com/precice/precice.github.io). Please note that we will only merge this one with the next release of the tutorials, such that the list of tutorial cases on the website does not deviate from the list of released tutorial cases.

### Naming conventions

- Directories use `-` to separate words, not `_`, and only use lowercase.
- Data and mesh names should start with uppercase and use `-` as separator.
- Data names are in singular, e.g. `Stress`, `Heat-Flux`.
- Mesh names start with the participant/domain name, e.g. `Fluid-Mesh`.
- Mesh names of participants with multiple interfaces contain the interface in the mesh name, e.g. `Fluid-Upstream-Mesh`. For meshes on which it is important to distinguish between face centers and face nodes, the modifier comes at the end, e.g. `Fluid-Upstream-Mesh-Centers`.
- Watchpoint names should be describing the point, not be a generic name.
- Images need to be named as `tutorials-<tutorial>-<image>.png` to be correctly displayed on the website. You can then refer to them as `![title](images/tutorials-<tutorial>-<image>.png)`. Subdirectories are not allowed.

### Optional: Help us with some checks

There are a few technical things to take care of before we can merge your contribution. If you find any of these steps to be complicated, we will be happy to directly edit your branch to apply them.

<details markdown="1"><summary>(click to read all the steps)</summary>

- Clean-up the files: remove commented-out code, remove scripts that are not needed, add case-specific files in a `.gitignore`.
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

- Format your Python scripts with [PEP 8](https://pep8.org/):

  ```bash
  autopep8 --in-place --aggressive --aggressive --max-line-length 120 <file>.py
  ```

- Check your `precice-config.xml` file with the [config-visualizer](tooling-config-visualization.html). Are there any unused meshes or data?
- Remove any comments and any explicitly-set defaults from the `precice-config.xml`. Don't worry if this sounds complicated, we will let you know in the review.
- Check your documentation (Markdown) files with [markdownlint](https://github.com/DavidAnson/markdownlint). Install an extension for your editor, or use [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli):

  ```bash
  npm install -g markdownlint-cli
  # See also https://stackoverflow.com/a/54170648/2254346
  markdownlint .
  ```

We automate many of these checks with [GitHub actions](https://github.com/features/actions), which you will see running at the bottom of each pull request. To avoid pushing and waiting for the actions to run while you develop, you can alternatively install [act](https://github.com/nektos/act) to execute all or specific workflows locally, running `act` or `act -j <job_name>`. It requires [Docker](https://www.docker.com/) and you can get the latest binary from the [act releases](https://github.com/nektos/act/releases/latest).
</details>

### Adding a new tutorial to the website

The content of the tutorials is sourced from the develop branch of the tutorials repository, which is specified in the `.gitmodules` file of the website repository. Hence, in general, anything merged to develop in the tutorials appears on the website. Consider putting some `note` [alert box](docs-meta-cheatsheet.html#alerts) on top of your new tutorial page to describe any unreleased requirements.

*New* tutorials will not directly appear on the website, but they need some additional steps. After merging to the tutorials develop, open a pull request with the following changes in the [website repository](https://github.com/precice/precice.github.io) ([example](https://github.com/precice/precice.github.io/pull/275)):

1. Trigger the [update submodules workflow](https://github.com/precice/precice.github.io/actions/workflows/update-submodules.yml) and, after it completes, create a new branch and pull request (this may also happen automatically, or someone from the preCICE team may have to do it for you).
2. Edit the [`_config.yml` file](https://github.com/precice/precice.github.io/blob/master/_config.yml) to append the directory name of your tutorial under `subprojects:`.
3. Edit the [tutorials sidebar](https://github.com/precice/precice.github.io/blob/master/_data/sidebars/tutorial_sidebar.yml) to add your tutorial permalink (defined in the heading of the `README.md` you created) to a fitting place, next to a similar tutorial.
4. Edit the [tutorials landing page](https://github.com/precice/precice.github.io/blob/sidebar-ff-tuts/pages/tutorials/tutorials.md) to add your tutorial to the overview.

After your PR gets reviewed, approved, and merged, the website will be built automatically, and your tutorial will appear online in a couple of minutes.

## Sharing a simulation case

Did you create a nice simulation case that could be useful for more people, but is not simple enough to serve as a tutorial? You can alternatively share it in the [community projects](https://precice.discourse.group/c/community-projects/11) category of our forum.

## Contributing code

You can pick up issues that you would like to work on from any repository you like. You may be particularly interested in the [good first issues](https://github.com/precice/precice/labels/good%20first%20issue) and we definitely need help in the [help wanted issues](https://github.com/precice/precice/labels/help%20wanted). The same labels exist in every repository.

Look for [contributing guidelines](https://github.com/precice/precice/blob/develop/docs/CONTRIBUTING.md) in each repository. The [developer documentation](dev-docs-overview.html) will also be useful.

{% tip %}
Read on our [Roadmap](fundamentals-roadmap.html) what is already in our to-do list before starting to write large parts of code.
{% endtip %}

## Helping other users

We would really appreciate it if you followed our [community channels](community-channels.html) and joined us in answering questions.
It is often much easier that you think!

If you want to help there, then you may also want bookmark and visit the forum and/or chatroom regularly. You can also try to answer some of the [still unanswered forum questions](https://precice.discourse.group/search?expanded=true&q=status%3Aunsolved%20order%3Alatest). There is a special place in our hearts for users that help each other! 🤗
