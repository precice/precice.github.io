---
title: Contribute to preCICE - Open projects
keywords: contribute, GSoC, google summer of code, student
summary: Open opportunities for contributing to preCICE
toc: true
permalink: community-contribute-open-projects.html
redirect_from:
  - /gsoc/
---

## Context

In case you skipped the [home page](index.html),
preCICE is a _coupling library_ for **numerical simulations** (think meshes, iterative solution, FEM, CFD)
and an _ecosystem_ of related components.
Scientists take independent numerical simulation codes and make them work together on a more complex simulation,
which none of the individual codes could do alone.
For this, they use one of the many _adapters_ (think plugins for various simulation codes), or directly the core library.
While the latter is written in **C++**, more languages are relevant (**Python, Julia, Matlab, C, Fortran, and Rust**).
preCICE is primarily used on **Linux** systems, with a growing user-base on macOS and Windows.

Most of the preCICE development has been happening in a university context,
and student projects have played a vital role: Just look at the [list of contributors](community-contributors.html).
We are working on [GitHub](https://github.com/precice/), and we accept contributions by everyone.
We review pull requests trying to improve their quality together and bring them in line with the current project needs,
which can sometimes be a long but rewarding experience.
In the university context, we also closely mentor students,
we encourage participation in team events such as our coding days,
and several students have so far participated in workshops, conferences, and publications, or even done their PhD in the team.

If you want to contribute with a student project (typically a thesis), see the [university groups behind preCICE](about.html).
This page highlights a few specific projects that are not directly suitable for a thesis ([thesis-suitable issues in the core library](https://github.com/precice/precice/issues?q=is%3Aissue%20state%3Aopen%20label%3Athesis)), but are also a bit more than a [good first issue](https://github.com/precice/precice/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22).
Some of these projects we advertise publicly, in programs such as the Google Summer of Code.

{% tip %}
Are you looking for or offering a thesis / PhD / other related job? Have a look also at [our forum](https://precice.discourse.group/c/jobs/13).
{% endtip %}

## Google Summer of Code

The [Google Summer of Code](https://summerofcode.withgoogle.com/) is _"a global, online program focused on bringing new contributors into open source software development. GSoC Contributors work with an open source organization on a 12+ week programming project under the guidance of mentors."_.

For 2026, we have prepared the following topics, for different sets of skills.
Since this is our first year, and since we are a rather small project, we might not be able to accommodate applicants to all of these projects.
Before applying, introduce yourself in the [forum](https://precice.discourse.group/c/jobs/gsoc/15) and let us know more about your background and motivation:

- What motivates you spend this summer in GSoC instead of doing anything else?
- What interests you most about our project?
- Will you have any other commitments (e.g., work or study) while working on the project?
- What previous experience do you have with the respective technologies?
- What previous experience with Git and GitHub do you have, if any?

Additionally, show us what you have tried already (see "entry test" in each project and feel free to go beyond that), to support your application. If you have contributed anything to any preCICE repository, definitely mention this here.

We will contact you via replies and/or private messages in the forum, to find out together if these topics are a good fit. You can alternatively ask quick questions in the [Matrix chat](https://matrix.to/#/#precice_lobby:gitter.im?web-instance[element.io]=app.gitter.im). Don't miss the [guidelines](#general-guidelines) at the bottom of this page.

{% important %}
We are a small project, and we are experiencing a spike of activity, which is very difficult to review next to the usual work.
Please do not ask whether you can work on an issue - not without details. If you find something interesting to you that you feel it is clear enough for you to contribute, go ahead and submit a PR.
We value quality higher than quantity. If you find something interesting, take your time and focus on it.
We expect to work with the accepted GSoC participants in the summer. Our capacity to review external contributions before that is very limited.
{% endimportant %}

### Project: Website modernization

This website is built with [Jekyll](https://jekyllrb.com/),
a straight-forward static site generator that has served us well,
but now starts to feel a bit restrictive
([GitHub repository](https://github.com/precice/precice.github.io), [documentation](docs-meta-overview.html)).
We envy the dark theme, the nice footer that showcases contributions, and the nice search engine support
when we look at the documentation of other community projects, such as [GitLab](https://docs.gitlab.com/user/) or [Docker](https://docs.docker.com/get-started/).
We also required some hacky jekyll plugins to integrate multiple repositories into one jekyll website, which are a bit error-prone.
Our technology stack is also a bit outdated:
For example, the front-end is using [Bootstrap](https://getbootstrap.com/docs/) 3.3.7, with some custom CSS on top.
We have done some [preliminary work](https://github.com/orgs/precice/projects/22/views/1) porting to hugo,
but web development is not what we are good at.
As a first step, we would like to [upgrade to a newer Bootstrap version](https://github.com/precice/precice.github.io/issues/691).
After that, we would like to switch to the [Hugo static site generator](https://gohugo.io/),
aiming to have a framework that we can upgrade and maintain with minimal effort.

**Entry test:** To figure out if this is for you, try [building the website locally](https://github.com/precice/precice.github.io/blob/master/README.md)
and adding and styling some new element in the [landing page](https://github.com/precice/precice.github.io/blob/master/content/index.html).
Be creative!

- Skills required: Web development (Jekyll/Hugo + CSS, JS)
- Project size: Medium (175h)
- Difficulty: Easy/Intermediate - Requires upgrading the front-end framework and porting existing content from one framework and stack to another, but will be driven primarily by you on the "how".
- Mentors: [Frédéric Simonis](https://github.com/fsimonis) and [Gerasimos Chourdakis](https://github.com/MakisH)

### Project: System tests improvements

While the core library has several unit and integration tests,
some issues only show up when running complete simulations.
For this reason, preCICE has [system tests](dev-docs-system-tests.html),
which choose and install components from the ecosystem in Docker containers,
run complete simulations, and compare the numerical results against references.
These tests are integrated into the [GitHub Actions](https://docs.github.com/en/actions) CI infrastructure of preCICE.
While the system tests are already running every night and on many pull requests, several improvements are possible ([related issues](https://github.com/precice/tutorials/issues?q=is%3Aissue%20state%3Aopen%20label%3Asystemtests)):
running (much) faster test cases, running multiple test cases in parallel, better communicating what went wrong, integrating more repositories, and the list of possibilities goes on.

**Entry test:** To figure out if this is for you, [run the system tests locally](dev-docs-system-tests.html#running-specific-test-suites) and [add one more tutorial to the tests](dev-docs-system-tests.html#adding-tutorials).

- Skills required: Python, Docker, GitHub Actions
- Project size: Medium (175h) - Depending on the availability, small or large are also possible
- Difficulty: Intermediate - Requires combining multiple technologies and has an impact in multiple repositories, but includes mostly small and clear work packages.
- Mentors: [Gerasimos Chourdakis](https://github.com/MakisH) - Fallback: [Frédéric Simonis](https://github.com/fsimonis)

### Project: Error messages with configuration context

The core library needs a [preCICE configuration file](configuration-overview.html),
which currently needs to be written manually (we are working on higher-level configuration tools as well).
When one configures something wrong, preCICE throws an error message with details and recommendations (think git).
In this project, we want to attach context to these error messages,
referring to specific lines in the configuration file
(similarly to how a compiler would refer to code lines with errors):
see the [related issue](https://github.com/precice/precice/issues/751).

**Entry test:** To figure out if this is for you, try [building preCICE from source](installation-source-preparation.html),
running the [elastic tube 1D tutorial](tutorials-elastic-tube-1d.html),
and modifying the [configuration file](https://github.com/precice/tutorials/blob/master/elastic-tube-1d/precice-config.xml)
to trigger an error (e.g., remove one of the `<data>` tags).
Then, locate and modify the error message in the source code, to provide more information.

- Skills required: C++
- Project size: Small (90h)
- Difficulty: Intermediate - Requires significant modifications to the C++ codebase, but with limited impact to/from other work.
- Mentors: [Frédéric Simonis](https://github.com/fsimonis) - Fallback: [Benjamin Uekermann](https://github.com/uekerman)

### Project: Clean multi-step configuration

The core library parses its [configuration file](configuration-overview.html) using the [libxml2 library](https://gitlab.gnome.org/GNOME/libxml2/-/wikis/home).
The way this currently works is a bit rigid and the configuration of objects is directly tied to this parsing.
Instead, we could do this in multiple stages, introducing an additional abstract syntax tree, which we could then use as a layer for additional checks,
or to parse the configuration in a predefined order.
In this project, we want to refactor the configuration code to introduce a confguration AST (structured types), generated from the XML AST (nested tags and their attributes) built with libxml2.
See the [related issue](https://github.com/precice/precice/issues/982).

**Entry test:** To figure out if this is for you, try the same as in the [project idea above](#project-error-messages-with-configuration-context).

- Skills required: C++
- Project size: Medium (175h)
- Difficulty: Intermediate/Hard - Requires refactoring or modifying large parts of the C++ codebase, but with limited impact to/from other work.
- Mentors: [Frédéric Simonis](https://github.com/fsimonis) - Fallback: [Benjamin Uekermann](https://github.com/uekerman)

## General guidelines

1. Be creative, be proactive, and make your project your own.
2. When writing (e.g., a pull request description), think of writing to colleagues with the same questions as you when you started.
3. We welcome all kinds of modern tools for assisting with code development, but we do value the human factor:
we want to see your work, in your own words, and we trust that you understand what you contribute.
No need to impress, we are happy to help understand every concept together!
