---
title: The preCICE docs
keywords: overview, features, docs
summary: "If you are new preCICE this is the right place to start. This page gives an overview of the complete preCICE docs including building, configuration, literature, the API, any many more."
permalink: docs.html
---

## The big picture

preCICE stands for Precise Code Interaction Coupling Environment. Its main component is a library that can be used for partitioned multi-physics simulations, including, but not restricted to fluid-structure interaction and conjugate heat transfer simulations. Partitioned means that preCICE couples existing programs (solvers) capable of simulating a subpart of the complete physics involved in a simulation. This allows for the high flexibility that is needed to keep a decent time-to-solution for complex multi-physics scenarios. preCICE runs efficiently on a wide spectrum of systems, from low-end workstations up to complete compute clusters and has proven scalability on 10000s of MPI Ranks.

The software offers parallel communication means, data mapping schemes, and methods for transient equation coupling. Methods for time interpolation are under active development. preCICE is written in C++ and offers additional bindings for C, Fortran, Matlab, and Python. Ready-to-use adapters for well-known commercial and open-source solvers, such as OpenFOAM, deal.II, FEniCS, SU2, or CalculiX, are available. Due to the minimally-invasive approach of preCICE, adapters for in-house codes can be implemented and validated in only a few weeks.


preCICE is an open-source software under the LGPL3 license and available on [GitHub](https://github.com/precice/precice).


![Big-picture overview of preCICE](images/precice_overview.png)

## Where to find what

The preCICE docs explain how to use preCICE. We do not detail the numerical methods and HPC algorithms in the preCICE docs, but refer to existing publications on preCICE for these topics. The [literature guide](fundamentals-literature-guide.html) gives an overview of the most important preCICE literature. 

The preCICE docs are organized in several sections:

* [Installation](installation-overview.html): How to get and install preCICE on various systems.
* [Configuration](configuration-overview.html): At runtime, preCICE needs to be configured with an xml file. Here you learn how to do that.
* [Tooling](tooling-overview.html): There are several helpful tools around preCICE. For pre- and post-processing and much more. Which ones we show here.
* [Provided adapters](adapters-overview.html): The preCICE community maintains ready-to-use adapters for many populare codes. Here, you find specific documentation for these adapters.
* [Couple your code](couple-your-code-overview.html): If you want to couple your own code you need to get familiar with the preCICE API, which we explain here.
* [Troubleshooting](troubleshooting-overview.html): Well ... troubleshooting.
* [Dev docs](dev-docs-overview.html): Documentation if you want to contribute directly to the preCICE library.

Before you start reading: there are just some terms that every preCICE user should know: [terminology](fundamentals-terminology.html)


