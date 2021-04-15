---
title: A handful of exciting tutorials
permalink: tutorials.html
keywords: tutorials, examples, cases
summary: A handful of ready-to-run cases for you to build upon.
---

Tutorials are meant as starting points to build your own coupled simulations. Our collection has grown rapidly over the past few years and [your contribution is very welcome](community-contribute-to-precice.html)!

{% include tip.html content="Is this your your first time trying our preCICE? Read first the [Quickstart](quickstart.html) guide or [watch a talk on YouTube](https://www.youtube.com/c/preCICECoupling/)." %}

You can find all tutorial case files in the [tutorials repository](https://github.com/precice/tutorials). Get the [latest release](https://github.com/precice/tutorials/releases/latest), or clone the Git repository to easily update them in the future:
```
git clone --branch=master --depth 1 https://github.com/precice/tutorials.git
```

## Basic cases

We recommend that you start from one of the following cases, which you can quickly run on your laptop:
- [Flow in a channel with an elastic perpendicular flap](tutorials-perpendicular-flap.html): A **fluid-structure interaction** scenario. Feel free to combine different solvers, among OpenFOAM, SU2, deal.II, FEniCS, Nutils, and CalculiX.
- [Flow over a heated plate](tutorials-flow-over-heated-plate.html): A **conjugate heat transfer** scenario. Try OpenFOAM, FEniCS, or Nutils.
- [Partitioned heat conduction](tutorials-partitioned-heat-conduction.html): The mathematician's dream: split the **heat equation** in two and glue it again. Pick your Dirichlet and Neumann solvers among FEniCS and Nutils.

<p style="text-align: center">
<a href="tutorials-perpendicular-flap.html" title="Tutorial: Perpendicular flap"><img src="images/tutorials-perpendicular-flap-physics.png" style="margin-left:3%; max-width:31%; max-height:100px;" alt="Flow with a perpendicular flap"></a>
<a href="tutorials-flow-over-heated-plate.html" title="Tutorial: Flow over heated plate"><img src="images/tutorials-flow-over-heated-plate-example.png" style="margin-left:3%; max-width:31%; max-height:100px;" alt="Flow over heated plate"></a>
<a href="tutorials-partitioned-heat-conduction.html" title="Tutorial: Partitioned heat conduction"><img src="images/tutorials-partitioned-heat-conduction-setup.png" style="max-width:31%; max-height:100px;" alt="Partitioned heat conduction"></a>
</p>

## Further cases

In the following cases, you can explore different aspects of preCICE:

- [Turek-Hron FSI3](tutorials-turek-hron-fsi3.html): The well-known fluid-structure interaction benchmark, with OpenFOAM and deal.II.
- [Multiple perpendicular flaps](tutorials-multiple-perpendicular-flaps.html): A three-field fluid-structure interaction case (fully implicit coupling, transient).
- [3D elastic tube](tutorials-elastic-tube-3d.html): A 3D fluid-structure interaction scenario, with OpenFOAM and CalculiX.
- [1D elastic tube](tutorials-elastic-tube-1d.html): A 1D fluid-structure interaction scenario, with toy solvers in Python and C++.
- [Flow over a heated plate: nearest projection](tutorials-flow-over-heated-plate-nearest-projection.html): A nearest-projection mapping version, with two OpenFOAM solvers.
- [Flow over a heated plate: steady-state](tutorials-flow-over-heated-plate-steady-state.html): A steady-state version, with OpenFOAM and code_aster.
- [Heat exchanger](tutorials-heat-exchanger.html): A three-field conjugate heat transfer case (explicit coupling, steady state), with OpenFOAM and CalculiX.
- [Partitioned beam](tutorials-partitioned-elastic-beam.html): An experimental structure-structure coupling scenario, with two CalculiX solvers.
- [Partitioned pipe](tutorials-partitioned-pipe.html): An experimental fluid-fluid coupling scenario, with two OpenFOAM solvers.

## Community projects

Apart from these simple tutorial cases, the community has tried preCICE in different setups. Check out our new [community projects](https://precice.discourse.group/c/community-projects/11) section in our forum, or read the [community stories](community-projects.html).