---
title: Contribute to preCICE - Open projects
keywords: contribute, GSoC, google summer of code, student
summary: Open opportunities for contributing to preCICE
permalink: community-contribute-open-projects.html
toc: true
---

## Context

In case you skipped the [home page](index.html),
preCICE is a _coupling library_ for **numerical simulations** (think meshes, iterative solution, FEM, CFD)
and an _ecosystem_ of related components.
Scientists take two independent numerical simulation codes and make them work together on a more complex simulation,
which none of the individual codes could do alone.
For this, they use one of the many _adapters_ (think plugins for various simulation codes), or directly the core library.
While the latter is written in **C++**, many other languages are relevant as well: **Python, Julia, Matlab, C, Fortran, and Rust**,
while it is primarily used on **Linux** systems (with macOS and Windows possible as well).

Most of the preCICE development has been happening in a university context,
and student projects have played a vital role: Just look at the [list of contributors](community-contributors.html).
We are working on [GitHub](https://github.com/precice/), and we accept contributions by everyone.
We review pull requests trying to improve their quality together and bring them in line with the current project needs,
which can sometimes be a long but rewarding experience.
In the university context, we also closely mentor students,
we encourage participation in team events such as our coding days,
and several students have so far participated in workshops, conferences, and publications.

If you want to contribute with a student project (typically a thesis), see the [university groups behind preCICE](https://precice.org/about.html).
This page highlights specific projects that we have in mind, but there is certainly much more than that.
Some of these projects we advertise publicly, in programs such as the Google Summer of Code.

{% tip %}
Are you looking for or offering a thesis / PhD / other related job? Have a look also at [our forum](https://precice.discourse.group/c/jobs/13).
{% endtip %}

## Google Summer of Code

The [Google Summer of Code](https://summerofcode.withgoogle.com/) is _"a global, online program focused on bringing new contributors into open source software development. GSoC Contributors work with an open source organization on a 12+ week programming project under the guidance of mentors."_.

For 2026, we have prepared the following topics, for different sets of skills.
Since this is our first year, and since we are a rather small project, we might not be able to accommodate applicants to all of these projects.
Introduce yourself in the [forum](https://precice.discourse.group/c/jobs/gsoc/15) and let us know more about your background and motivation, so that we can find out together if these topics are a good fit.

### Project: Website modernization

This website is built with [Jekyll](https://jekyllrb.com/),
a straight-forward static site generator that has served us well,
but now starts to feel a bit restrictive
([GitHub repository](https://github.com/precice/precice.github.io), [documentation](https://precice.org/docs-meta-overview.html)).
We envy the dark theme, the nice footer that showcases contributions, and the nice search engine support
when we look at the documentation of other community projects, such as [GitLab](https://docs.gitlab.com/user/) or [Docker](https://docs.docker.com/get-started/).
Our technology stack is also a bit outdated:
For example, the front-end is using [Bootstrap](https://getbootstrap.com/docs/) 3.3.7, with some custom CSS on top.
We have done some [preliminary work](https://github.com/orgs/precice/projects/22/views/1),
but web development is not what we are good at.
As a first step, we would like to [upgrade to a newer Bootstrap version](https://github.com/precice/precice.github.io/issues/691).
After that, we would like to switch to the [Hugo static site generator](https://gohugo.io/),
aiming to have a framework that we can upgrade and maintain with minimal effort.

To figure out if this is for you, try [building the website locally](https://github.com/precice/precice.github.io/blob/master/README.md)
and adding and styling some new element in the [landing page](https://github.com/precice/precice.github.io/blob/master/content/index.html).
Be creative!

- Skills required: Web development (Jekyll/Hugo + CSS, JS)
- Project size: Medium (175h)
- Difficulty: Intermediate
- Mentors: [Frédéric Simonis](https://github.com/fsimonis) and [Gerasimos Chourdakis](https://github.com/MakisH)

## General guidelines

Be creative, be proactive, make your project your own, and write like appealing to colleagues with the same questions as you when you started.

We welcome all kinds of modern tools for assisting with code development, but we do value the human factor:
we want to see your work, in your own words, and we trust that you understand what you contribute.
No need to impress, we are happy to help understand every concept together!
