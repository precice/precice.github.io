---
title: Tools for preCICE
permalink: tooling-overview.html
keywords: tools
---

Creating your own simulation or doing a rigorous performance study of a method?
There are probably a few common tasks that could use some automation for.

Here you will find a few tools to:

- [Simulate and replay coupled simulations in an artificial environment](tooling-aste.html) without actual solvers and adapters.
- [Check your configuration file](tooling-builtin.html) without starting a whole simulation.
- [Visualize the preCICE configuration file](tooling-config-visualization.html) to understand if you are really asking preCICE to do what you meant to.
- [Couple your simulation to FMU models](tooling-fmi-runner.html) following the FMI standard.
- [Set up a coupling between solvers at different scales](tooling-micro-manager-overview.html) to resolve two-scale coupled scenarios using preCICE.
- [Analyze the performance of the coupled simulation](tooling-performance-analysis.html) to understand where the runtime comes from.
- [Compute parameters for the RBF mapping configuration](tooling-rbf-shape.html) to optimize the accuracy and performance of your RBF mapping.

## Tools from the preCICE community

The following tools are made with ❤️ by the preCICE community (add your own):

- [`ajaust/parameter-study-precice`](https://github.com/ajaust/parameter-study-precice): Scripts for easy generation of preCICE configuration files for parameter studies
- [MaMiCo](https://github.com/HSU-HPC/MaMiCo): Couple molecular dynamics simulations (e.g. [ls1 MarDyn](https://www.ls1-mardyn.de/home.html)) via preCICE to any preCICE-adapted CFD solver
