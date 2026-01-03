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

## Talk about your work

We are very interested to know how you use preCICE, and we are regularly looking for contributions to the [preCICE Workshop](precice-workshop.html), as well as to invited sessions in broader conferences. We are also interested to know if you are talking about preCICE in other conferences: Don't forget to mention preCICE by name in your abstract, so that we can find your talk when we are also attending the respective conference.

If you are contributing a talk to a workshop or session we organize, following these guidelines will help us a lot to follow your talk and understand how we can help you:

- Address an interdisciplinary audience: explain the general application first - probably nobody else in the room is working on something similar
- Show a figure clarifying the domains coupled and the data exchanged (as you would explain it to a friend)
- Show the [configuration visualization](tooling-config-visualization.html)
- Mention the preCICE and solver versions, as well as platform information (HPC cluster / laptop, Ubuntu/other)
- Clarify if you modified any adapters/preCICE itself, and where the modifications might be available. Mention any challenges you had to work around.
- Aim for few slow-paced slides, use the opportunity for backup slides

And hey! You have already worked with preCICE, so you can definitely contribute something in the following ways, if you have the time! 🤗

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
If you roughly follow the guidelines in this section, your contribution could be merged very quickly. Since we aim to maintain and update all tutorials, it is important for us that every tutorial merged follows the same structure and conventions.

{% tip %}
Get in touch with us early and we will be very happy to help you with every step! Open a first draft Pull Request on GitHub and we can together bring it into a fitting shape.
{% endtip %}

First time working with Git? Watch a [lecture on Git](https://missing.csail.mit.edu/2020/version-control/).

### What to contribute and where?

Your case may already fit into one of the existing tutorials. If not, feel free to start a new one! A new case typically needs a new preCICE configuration file.

Contribute only the files necessary for running the tutorial (no results or user-specific files). You can check this by looking at the "Files changed" tab on GitHub.

If there is already a `precice-config.xml` for the case you are simulating, please use the same one (or contribute changes to that). We want that all solvers that can simulate a given case use the same preCICE configuration file.

### Structure of a tutorial

Our tutorials generally follow a file structure similar to this:

```bash
- <tutorial>/                     # e.g. perpendicular-flap/
  - README.md                     # description of the case
  - precice.config.xml            # a works-with-all preCICE configuration file
  - clean-tutorial.sh             # a symbolic link (see ../tools/)
  - <participant1-solver1>/       # e.g. fluid-openfoam/
    - run.sh                      # a short script to run the solver1 case
    - clean.sh                    # a short script to clean the solver1 case
    - <the solver1 files>
  - <participant2-solver2>/       # e.g. solid-dealii/
    - run.sh
    - clean.sh
    - <the solver2 files>
```

Other files you may encounter are the following:

```bash
- <tutorial>/                     
  - <visualization scripts>       # gnuplot or simple Python scripts
  - images/                       # any images used by the documentation
  - solver-<code>/                # any configurable, tutorial-specific code, e.g., solver-fenics
  - reference-results/            # results from different case combinations, used for regression tests
    - <case_combination>.tar.gz   # Git LFS objects, generated from GitHub Actions
```

### The run.sh scripts

Each run script must be executable for a default case without any arguments. Optional arguments can include `-parallel`, or anything that triggers a special case. Such a uniform interface not only makes the workflow more predictable, but it also facilitates automation, avoiding special cases.

These scripts should generally be very short and not include too much automation that would obfuscate the main steps. Remember: The tutorials serve as examples to copy from and extend, most often by replacing one participant with another.

There are several helper scripts and functions in `tools/`; using these will make your scripts simpler.

### Tutorial-specific codes

In case a tutorial-specific code example is needed for this tutorial, and this can be reused among participants, add that in `solver-<code>/`. See, for example, the [partitioned heat conduction tutorial](https://github.com/precice/tutorials/tree/develop/partitioned-heat-conduction).

You don't need to have a participant-specific configuration file in a participant case (even though that would be nice). Instead, you can hard-code the configuration of each participant in the code and select the respective participant via a command-line argument. A case-specific `run.sh` that provides the participant as command-line argument is enough.

If you write any output, it would be very helpful to keep it tidy (e.g., in a dedicated `output/` directory).

### The README file

In the `README.md` file, following the general structure of the existing tutorials, document:

- the scenario setup,
- the dependencies,
- how to run the tutorial,
- how to visualize the results, and
- an example picture or video of the results.
- Don't forget to adapt the `permalink:` field in the beginning of the file.

{% note %}
If you add a complete new tutorial case, the case also needs to be added to the [tutorials sidebar](https://github.com/precice/precice.github.io/blob/master/_data/sidebars/tutorial_sidebar.yml) on the [tutorials website section](tutorials.html). Please open a pull request to the [website repository](https://github.com/precice/precice.github.io). Please note that we will only merge this one with the next release of the tutorials, such that the list of tutorial cases on the website does not deviate from the list of released tutorial cases.
{% endnote  %}

### Naming conventions

- Directories use `-` to separate words, not `_`, and only use lowercase.
  - We use `_` for separating case combinations, e.g., in the reference results: `fluid-openfoam_solid-calculix.tar.gz`.
- Data and mesh names should start with uppercase and use `-` as separator.
- Data names are in singular, e.g. `Stress`, `Heat-Flux`.
- Mesh names start with the participant/domain name, e.g. `Fluid-Mesh`.
- Mesh names of participants with multiple interfaces contain the interface in the mesh name, e.g. `Fluid-Upstream-Mesh`. For meshes on which it is important to distinguish between face centers and face nodes, the modifier comes at the end, e.g. `Fluid-Upstream-Mesh-Centers`.
- Watchpoint names should be describing the point, not be a generic name.
- Images need to be named as `tutorials-<tutorial>-<image>.png` to be correctly displayed on the website. You can then refer to them as `![title](images/tutorials-<tutorial>-<image>.png)`. Subdirectories are not allowed.

### Open a pull request

Start a draft [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) early on, so that people know that someone is working on this. In the description, gradually include everything we may need to review and run your tutorial:

- Why is this case a good fit for our tutorials? What is different from other tutorials?
- How did you create the setup? Do we need any additional tools?
- Which versions of preCICE, adapters, and solvers have you tried?
- If it is a solver we don't already support, how can we get it?
- How should the results look like? A screenshot would be very helpful.

### Optional: Help us with some checks

There are a few technical things to take care of before we can merge your contribution. If you find any of these steps to be complicated, we will be happy to directly edit your branch to apply them.

Clean-up the files: remove commented-out code, remove scripts that are not needed, add case-specific files in a `.gitignore`.

Install `pre-commit` and enable it in the repositories you plan to contribute to with `pre-commit install`. It automatically ensures consistent formatting and best practices before you even commit changes. You can also run these checks yourself on all files using `pre-commit run -va`

We automate many checks with [GitHub actions](https://github.com/features/actions), which you will see running at the bottom of each pull request. Using `pre-commit` yourself saves you some unnecessary trouble.

### Adding a new tutorial to the website

The content of the tutorials is sourced from the develop branch of the tutorials repository, which is specified in the `.gitmodules` file of the website repository. Hence, in general, anything merged to develop in the tutorials appears on the website. Consider putting some `note` [alert box](docs-meta-cheatsheet.html#alerts) on top of your new tutorial page to describe any unreleased requirements.

*New* tutorials will not directly appear on the website, but they need some additional steps. After merging to the tutorials develop, open a pull request with the following changes in the [website repository](https://github.com/precice/precice.github.io) ([example](https://github.com/precice/precice.github.io/pull/275)):

1. Trigger the [update submodules workflow](https://github.com/precice/precice.github.io/actions/workflows/update-submodules.yml) and, after it completes, create a new branch and pull request (this may also happen automatically, or someone from the preCICE team may have to do it for you).
2. Edit the [`_config.yml` file](https://github.com/precice/precice.github.io/blob/master/_config.yml) to append the directory name of your tutorial under `subprojects:`.
3. Edit the [tutorials sidebar](https://github.com/precice/precice.github.io/blob/master/_data/sidebars/tutorial_sidebar.yml) to add your tutorial permalink (defined in the heading of the `README.md` you created) to a fitting place, next to a similar tutorial.
4. Edit the [tutorials landing page](https://github.com/precice/precice.github.io/blob/master/content/tutorials/tutorials.md) to add your tutorial to the overview.

After your PR gets reviewed, approved, and merged, the website will be built automatically, and your tutorial will appear online in a couple of minutes.

## Sharing a simulation case

Did you create a nice simulation case that could be useful for more people, but is not simple enough to serve as a tutorial, or you don't want to invest any more time shaping it into a tutorial? You can alternatively share it in the [community projects](https://precice.discourse.group/c/community-projects/11) category of our forum.

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
