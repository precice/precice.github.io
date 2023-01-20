---
title: The preCICE documentation
keywords: overview, features, docs
summary: "This page gives an overview of the complete preCICE documentation, including building, configuration, literature, the API, and much more."
permalink: docs.html
redirect_from:
  - /features/
---

## The big picture

preCICE stands for Precise Code Interaction Coupling Environment. Its main component is a library that can be used for partitioned multi-physics simulations, including, but not restricted to fluid-structure interaction and conjugate heat transfer simulations. Partitioned (as opposite to monolithic) means that preCICE couples existing programs (solvers) which simulate a subpart of the complete physics involved in a simulation. This allows for the high flexibility that is needed to keep a decent time-to-solution for complex multi-physics scenarios, reusing existing components. preCICE runs efficiently on a wide spectrum of systems, from low-end laptops up to complete compute clusters and has [proven scalability](fundamentals-literature-guide.html#high-performance-computing) on 10000s of MPI Ranks.

The preCICE library offers parallel communication means, data mapping schemes, and methods for transient equation coupling. Additionally, we are actively developing methods for time interpolation and more features (see our [roadmap](fundamentals-roadmap.html)). preCICE is written in C++ and offers additional bindings for C, Fortran, Python, and Matlab.
Coupling your own solver is very easy, due to the minimally-invasive approach of preCICE.
Once you add the (very few) calls to the preCICE library in your code, you can couple
it with any other code at runtime. For well-known solvers such as OpenFOAM, deal.II, FEniCS, Nutils, CalculiX, or SU2, you can use one of our official adapters.

preCICE is free/open-source software, using the [GNU LGPL3 license](https://www.gnu.org/licenses/lgpl-3.0.en.html). This license ensures the open future of the project, while allowing you to use the library also in closed-source solvers. The code is publicly available and actively developed on [GitHub](https://github.com/precice/precice).

![Big-picture overview of preCICE](material/overview/precice-overview.png)

Writing about preCICE? [Get this image and more material](https://github.com/precice/precice.github.io/tree/master/material).

## Where to find what

This documentation explains how to use preCICE. We do not detail the numerical methods and HPC algorithms in the preCICE docs, but we refer to existing publications on preCICE for these topics. The [literature guide](fundamentals-literature-guide.html) gives an overview of the most important preCICE literature.

The preCICE docs are organized in several sections:

* [Installation](installation-overview.html): How to get and install preCICE on various systems.
* [Configuration](configuration-overview.html): At runtime, preCICE needs to be configured with an xml file. Here you learn how to do that.
* [Tooling](tooling-overview.html): Several helpful (but completely optional) tools around preCICE: tools for setting up your simulation, post-processing the results, and much more.
* [Provided adapters](adapters-overview.html): The preCICE community maintains ready-to-use adapters for many popular solvers. Here, you find the documentation of these adapters.
* [Running simulations](running-overview.html): Learing how to run preCICE simulations on various types of machines.
* [Couple your code](couple-your-code-overview.html): Getting familiar with the preCICE API.
* [Dev docs](dev-docs-overview.html): References that developers use. Are you maybe also thinking of [contributing](community-contribute-to-precice.html)?

Before you start reading: there are just some [preCICE-specific technical terms](fundamentals-terminology.html) that every user should read first.
