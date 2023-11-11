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

You can find all tutorial case files in the [tutorials repository](https://github.com/precice/tutorials). Get the [latest release](https://github.com/precice/tutorials/releases/latest), or clone the Git repository to easily update them in the future:

```bash
git clone --branch=master --depth 1 https://github.com/precice/tutorials.git
```

## Basic cases

We recommend that you start from one of the following cases, which you can quickly run on your laptop:

- [Flow in a channel with an elastic perpendicular flap](tutorials-perpendicular-flap.html): A **fluid-structure interaction** scenario. Feel free to combine different solvers, among OpenFOAM, SU2, deal.II, FEniCS, Nutils, CalculiX, and DUNE.
- [Flow over a heated plate](tutorials-flow-over-heated-plate.html): A **conjugate heat transfer** scenario. Try OpenFOAM, FEniCS, or Nutils.
- [Partitioned heat conduction](tutorials-partitioned-heat-conduction.html): The mathematician's dream: split the **heat equation** in two and glue it again. Pick your Dirichlet and Neumann solvers among FEniCS, Nutils, and OpenFOAM.

<p style="text-align: center">
<a href="tutorials-perpendicular-flap.html" title="Tutorial: Perpendicular flap"><img src="images/tutorials-perpendicular-flap-physics.png" style="margin-left:3%; max-width:31%; max-height:100px;" alt="Flow with a perpendicular flap"></a>
<a href="tutorials-flow-over-heated-plate.html" title="Tutorial: Flow over heated plate"><img src="images/tutorials-flow-over-heated-plate-example.png" style="margin-left:3%; max-width:31%; max-height:100px;" alt="Flow over heated plate"></a>
<a href="tutorials-partitioned-heat-conduction.html" title="Tutorial: Partitioned heat conduction"><img src="images/tutorials-partitioned-heat-conduction-setup.png" style="max-width:31%; max-height:100px;" alt="Partitioned heat conduction"></a>
</p>

## Further cases

In the following cases, you can explore different aspects of preCICE:

- [Turek-Hron FSI3](tutorials-turek-hron-fsi3.html): The well-known fluid-structure interaction benchmark, with OpenFOAM and deal.II.
- [Multiple perpendicular flaps](tutorials-multiple-perpendicular-flaps.html): A three-field fluid-structure interaction case (fully implicit coupling, transient).
- [3D elastic tube](tutorials-elastic-tube-3d.html): A 3D fluid-structure interaction scenario, with OpenFOAM, CalculiX, and FEniCS.
- [1D elastic tube](tutorials-elastic-tube-1d.html): A 1D fluid-structure interaction scenario, with toy solvers in Python and C++.
- [Flow over a heated plate: nearest projection](tutorials-flow-over-heated-plate-nearest-projection.html): A nearest-projection mapping version, with two OpenFOAM solvers.
- [Flow over a heated plate: two meshes](tutorials-flow-over-heated-plate-two-meshes.html): A variant where the mesh used to transfer temperature is not the same as the one transferring heat fluxes. This allows us to use CalculiX as a solid solver.
- [Flow over a heated plate: steady-state](tutorials-flow-over-heated-plate-steady-state.html): A steady-state version, with OpenFOAM and code_aster.
- [Heat exchanger](tutorials-heat-exchanger.html): A three-field conjugate heat transfer case (explicit coupling, steady state, Robin-Robin coupling), with OpenFOAM and CalculiX.
- [Heat exchanger: simplified](tutorials-heat-exchanger-simplified.html): A simplified version of the heat exchanger tutorial. Apart from a simpler geometry, that case is transient and using the implicit multi-coupling scheme, with Dirichlet-Neumann coupling..
- [Partitioned heat conduction: complex setup](tutorials-partitioned-heat-conduction-complex.html): A partitioned heat conduction case with FEniCS, showcasing advanced features and geometries.
- [Partitioned heat conduction: direct access](tutorials-partitioned-heat-conduction-direct.html): A partitioned heat conduction case with Nutils, showcasing the direct mesh access feature.
- [Partitioned elastic beam](tutorials-partitioned-elastic-beam.html): An experimental structure-structure coupling scenario, with two CalculiX solvers.
- [Partitioned pipe](tutorials-partitioned-pipe.html): A fluid-fluid coupling scenario, with two OpenFOAM solvers.
- [Partitioned flow over a backwards-facing step](tutorials-partitioned-backwards-facing-step.html): A fluid-fluid coupling scenario, demonstrating inlet-outlet boundary conditions in OpenFOAM.
- [Partitioned flow over a heated plate](tutorials-flow-over-heated-plate-partitioned-flow.html): A three-participant case, similar to the flow over a heated plate with OpenFOAM solvers, but with a partitioned channel flow.
- [Oscillator](tutorials-oscillator.html): A simple mass-spring oscillator with two masses, coupling two instances of a Python solver.
- [Volume-coupled diffusion](tutorials-volume-coupled-diffusion.html): An experimental volume coupling scenario, with two FEniCS solvers.
- [ASTE turbine](tutorials-aste-turbine.html): An example case for ASTE to investigate different preCICE mappings using a turbine geometry.
- [Channel transport](tutorials-channel-transport.html): A channel flow coupled to a transport (of, e.g., a chemistry species) in a uni-directional way, with Nutils.
- [Channel transport reaction](tutorials-channel-transport-reaction.html): A channel flow coupled to a transport of a chemical species with reaction in a uni-directional way, with FEniCS.

## Community projects

Apart from these simple tutorial cases, the community has tried preCICE in different setups. Check out our new [community projects](https://precice.discourse.group/c/community-projects/11) section in our forum, or read the [community stories](community-projects.html).

## General hints

You can start any tutorial by opening multiple terminals, navigating to each participant case, and running `./run.sh`. To make the "multiple terminals" part easier, it is often convenient to use a terminal multiplexer, such as [Tilix](https://gnunn1.github.io/tilix-web/) or [tmux](https://github.com/tmux/tmux/wiki).

Before running a case again, cleanup previous results with the included cleaning scripts.

### Visualization

When visualizing partitioned simulation results, there are a few hints you may want to consider.

#### Synchronizing results

Most of the solvers support a format that [ParaView](https://www.paraview.org/) can read. However, the results may not always be synchronized, as some solvers include timestamps in the file names, while others only include a counter. You may want to use the [TemporalShiftScale](https://kitware.github.io/paraview-docs/v5.9.0/python/paraview.simple.TemporalShiftScale.html) filter of ParaView to map from a constant time step size to a time.

#### Visualizing OpenFOAM results

To visualize OpenFOAM results, you can either use the bundled OpenFOAM file reader (open the empty `.foam` or `.OpenFOAM` file you can find at the case directory), or convert the results to VTK with `foamToVTK` and load these files in ParaView.

Some versions of OpenFOAM [produce additional empty result files](https://github.com/precice/openfoam-adapter/issues/26) when using the preCICE-OpenFOAM adapter, which may lead to a strange "flashing" effect in animations. To work around this, we are [deleting such files in the end of each simulation](https://github.com/precice/tutorials/blob/master/tools/openfoam-remove-empty-dirs.sh).

#### Visualizing CalculiX results

CalculiX exports results in its own `.frd` format, which you can visualize in CalculiX CGX (`cgx flap.frd`). In the CGX window, you can click-and-hold to select different times and fields, or to animate the geometry.

If you prefer to work with VTK files, you can also use tools such as [ccx2paraview](https://github.com/calculix/ccx2paraview) or a converter included in the [calculix-adapter/tools](https://github.com/precice/calculix-adapter/tree/master/tools) directory. A more complete pre- and post-processing tool for CalculiX is [PrePoMax](https://prepomax.fs.um.si/) (open-source, only available for Windows).

Are you new to CalculiX? Watch this [contributed video tutorial](https://www.youtube.com/playlist?list=PLWHQIdms-YHT8Ybt9psE8lJpaWRyy3fNf) to find out more about pre- and post-processing CalculiX cases for preCICE.

#### Visualizing results of other solvers

- Our FEniCS examples write `.pvd` files, which you can open in ParaView.
- Our deal.II examples write `.vtk` files.
- SU2 writes `.vtk` files.
- code_aster writes `.rmed` files, which you can open in [GMSH](https://gmsh.info/). [See an example](tutorials-flow-over-heated-plate-steady-state.html).
