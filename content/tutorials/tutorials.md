---
title: A handful of exciting tutorials
permalink: tutorials.html
keywords: tutorials, examples, cases
summary: A handful of ready-to-run cases for you to build upon.
---

Tutorials are meant as starting points to build your own coupled simulations. Our collection has grown rapidly over the past few years and [your contribution is very welcome](community-contribute-to-precice.html)!

{% tip %}
Is this your your first time trying our preCICE? Read first the [Quickstart](quickstart.html) guide or [watch a talk on YouTube](https://www.youtube.com/c/preCICECoupling/).
{% endtip %}

You can find all tutorial case files in the [tutorials repository](https://github.com/precice/tutorials). Get the [latest release](https://github.com/precice/tutorials/releases/latest), or clone the Git repository with the latest state, which makes it easier to get updates in the future or contribute back:

```bash
git clone https://github.com/precice/tutorials.git
```

If you don't need the full history (to save space and data), you can use the `--depth 1` option.

## Basic cases

We recommend that you start from one of the following cases, which you can quickly run on your laptop:

- [Flow over a heated plate](tutorials-flow-over-heated-plate.html): A **conjugate heat transfer** scenario. Try OpenFOAM, FEniCS, or Nutils.
- [Partitioned heat conduction](tutorials-partitioned-heat-conduction.html): The mathematician's dream: split the **heat equation** in two and glue it again. Pick your Dirichlet and Neumann solvers among FEniCS, Nutils, and OpenFOAM.
- Flow in a channel with an elastic [perpendicular flap](tutorials-perpendicular-flap.html): A **fluid-structure interaction** scenario. Feel free to combine different solvers, among OpenFOAM, SU2, deal.II, FEniCS, Nutils, CalculiX, and DUNE.

<p style="text-align: center">
<a href="tutorials-flow-over-heated-plate.html" title="Tutorial: Flow over heated plate"><img src="images/tutorials-flow-over-heated-plate-example.png" style="margin-left:3%; max-width:31%; max-height:100px;" alt="Flow over heated plate"></a>
<a href="tutorials-partitioned-heat-conduction.html" title="Tutorial: Partitioned heat conduction"><img src="images/tutorials-partitioned-heat-conduction-setup.png" style="max-width:31%; max-height:100px;" alt="Partitioned heat conduction"></a>
<a href="tutorials-perpendicular-flap.html" title="Tutorial: Perpendicular flap"><img src="images/tutorials-perpendicular-flap-physics.png" style="margin-left:3%; max-width:31%; max-height:100px;" alt="Flow with a perpendicular flap"></a>
</p>

## All cases

In the following cases, you can explore different aspects of preCICE:

- [ASTE turbine](tutorials-aste-turbine.html): An example case for ASTE to investigate different preCICE mappings using a turbine geometry.
- [Breaking dam with flexible pillar 2D](tutorials-breaking-dam-2d.html): A two-phase flow fluid-structure interaction problem, with OpenFOAM and CalculiX.
- Channel transport collection
  - [Basic variant](tutorials-channel-transport.html): A channel flow coupled to a transport (of, e.g., a chemistry species) in a uni-directional way, with Nutils.
  - [Transport + reaction variant](tutorials-channel-transport-reaction.html): A channel flow coupled to a transport of a chemical species with reaction in a uni-directional way, with FEniCS.
- [Elastic tube 1D](tutorials-elastic-tube-1d.html): A 1D fluid-structure interaction scenario, with toy solvers in Python, C++ and Rust.
- [Elastic tube 3D](tutorials-elastic-tube-3d.html): A 3D fluid-structure interaction scenario, with OpenFOAM, CalculiX, and FEniCS.
- [Flow around controlled moving cylinder](tutorials-flow-around-controlled-moving-cylinder.html): A flow around a rigid moving cylinder with an FMI-based controller to dampen out the oscillation.
- Flow over a heated plate collection
  - [Basic variant](tutorials-flow-over-heated-plate.html) (as in "featured")
  - [Nearest-projection mapping variant](tutorials-flow-over-heated-plate-nearest-projection.html): A nearest-projection mapping version, with two OpenFOAM solvers.
  - [Steady-state variant](tutorials-flow-over-heated-plate-steady-state.html): A steady-state version, with OpenFOAM and code_aster.
  - [Two interface meshes variant](tutorials-flow-over-heated-plate-two-meshes.html): A variant where the mesh used to transfer temperature is not the same as the one transferring heat fluxes. This allows us to use CalculiX as a solid solver.
- [Heat exchanger](tutorials-heat-exchanger.html): A three-field conjugate heat transfer case (explicit coupling, steady state, Robin-Robin coupling), with OpenFOAM and CalculiX.
- [Heat exchanger: simplified](tutorials-heat-exchanger-simplified.html): A simplified version of the heat exchanger tutorial. Apart from a simpler geometry, that case is transient and using the implicit multi-coupling scheme, with Dirichlet-Neumann coupling..
- [Multiple perpendicular flaps](tutorials-multiple-perpendicular-flaps.html): A three-field fluid-structure interaction case (fully implicit coupling, transient).
- [Oscillator](tutorials-oscillator.html): A simple mass-spring oscillator with two masses, coupling two instances of a Python solver.
- [Oscillator overlap](tutorials-oscillator-overlap.html): An overlapping Schwartz method variant of the Oscillator tutorial, coupling two Dirichlet participants.
- [Partitioned elastic beam](tutorials-partitioned-elastic-beam.html): An experimental structure-structure coupling scenario, with two CalculiX solvers.
- Partitioned flow collection
  - [Partitioned flow over a backwards-facing step](tutorials-partitioned-backwards-facing-step.html): A fluid-fluid coupling scenario, demonstrating inlet-outlet boundary conditions in OpenFOAM.
  - [Partitioned flow over a heated plate](tutorials-flow-over-heated-plate-partitioned-flow.html): A three-participant case, similar to the flow over a heated plate with OpenFOAM solvers, but with a partitioned channel flow.
  - [Partitioned pipe](tutorials-partitioned-pipe.html): A fluid-fluid coupling scenario, with two OpenFOAM solvers.
  - [Partitioned pipe two-phae](tutorials-partitioned-pipe-two-phase.html): A two-phase variant of the partitioned pipe tutorial.
- Partitioned heat conduction collection
  - [Basic variant](tutorials-partitioned-heat-conduction.html) (as in "featured")
  - [Complex variant](tutorials-partitioned-heat-conduction-complex.html): A partitioned heat conduction case with FEniCS, showcasing advanced features and geometries.
  - [Direct mesh access variant](tutorials-partitioned-heat-conduction-direct.html): A partitioned heat conduction case with Nutils, showcasing the direct mesh access feature.
  - [Overlapping Schwarz variant](tutorials-partitioned-heat-conduction-overlap.html): An overlapping Schwarz method of the partitioned heat conduction case, coupling two Dirichlet participants.
- Perpendicular flap collection
  - [Basic variant](tutorials-perpendicular-flap.html) (as in "featured")
  - [Stress variant](tutorials-perpendicular-flap-stress.html)
- [Resonant circuit](tutorials-resonant-circuit.html): The basic LC circuit, with two MATLAB solvers.
- [Two-scale heat conduction](tutorials-two-scale-heat-conduction.html): A heat conduction scenario with an underlying micro-structure which is resolved to get the constitutive properties on the macro scale.
- [Turek-Hron FSI3](tutorials-turek-hron-fsi3.html): The well-known fluid-structure interaction benchmark, with OpenFOAM and deal.II. Nutils participants are also available.
- [Volume-coupled diffusion](tutorials-volume-coupled-diffusion.html): An experimental volume coupling scenario, with two FEniCS solvers.
- [Volume-coupled flow](tutorials-volume-coupled-flow.html): An experimental volume coupling scenario, coupling a source term coded in Nutils with a flow in OpenFOAM.

## Community projects

Apart from these simple tutorial cases, the community has tried preCICE in different setups. Check out our new [community projects](https://precice.discourse.group/c/community-projects/11) section in our forum, or read the [community stories](community-projects.html).

## General hints

You can start any tutorial by opening multiple terminals, navigating to each participant case, and running `./run.sh`. To make the "multiple terminals" part easier, it is often convenient to use a terminal multiplexer, such as [Tilix](https://gnunn1.github.io/tilix-web/) or [tmux](https://github.com/tmux/tmux/wiki).

Before running a case again, cleanup previous results with the included cleaning scripts.

Are you wondering how to visualize the various results generated? Have a look in our [visualization hints](tutorials-visualization.html).
