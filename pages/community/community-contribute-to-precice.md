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
and we will discuss it with you over a few review iterations.

A few guidelines:
- Contribute only the files necessary for running the tutorial (no results or user-specific files).
- Provide a `README.md` file documenting the scenario setup, the dependencies, how to run it, how to visualize the results, and an example picture or video of the results.
- Provide run scripts (`runFluid`, `runSolid`, potentially `Allrun`) to run your cases.
- Provide an `Allclean` script to clean any derived files of the simulation.
- If there is already a `precice-config.xml` for the case you are simulating, please use the same one (or contribute changes to that). We want that all solvers that can simulate a given case use the same preCICE configuation file.
- Clean-up the files: remove commented-out code, remove scripts that are not needed.
- Naming conventions:
    - Directories use `-` to separate words, not `_`, and only use lowercase.
    - Data and mesh names should start with uppercase and use `-` as separator.
    - Data names are in singular, e.g. `Stress`, `Displacement`.
    - Mesh names start with the participant/domain name, e.g. `Fluid-Mesh`.
    - Watchpoints should be describing the point, not use a generic name. 

We are currently working in [restructuring our tutorials](https://github.com/orgs/precice/projects/5) and we will be able to provide more guidelines soon.

## Contributing code

You can pick up issues that you would like to work on from any repository you like. You may be particularly interested in the [good first issues](https://github.com/precice/precice/labels/good%20first%20issue) and we definitely need help in the [help wanted issues](https://github.com/precice/precice/labels/help%20wanted). The same labels exist in every repository.

Look for [contributing guidelines](https://github.com/precice/precice/blob/develop/docs/CONTRIBUTING.md) in each repository. The [developers' documentation](dev-docs-dev-overview.html) will also be useful.

## Helping other users

We would really appreciate it if you followed our [community channels](community-channels.html) and joined us in answering questions.
It is often much easier that you think!