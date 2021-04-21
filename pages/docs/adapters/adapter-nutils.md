---
title: The Nutils adapter
permalink: adapter-nutils.html
keywords: FEM, adapter, heat conduction, finite element
summary: "There is currently not really such a thing as a Nutils adapter. Coupling Nutils is so simple that directly calling the preCICE Python API from the application scripts is the way to go."
---

The best way to learn how to couple a [Nutils](http://www.nutils.org/en/latest/) application script is to look at some examples:
* [Two heat conduction scripts coupled to one another](https://github.com/precice/tutorials/blob/master/partitioned-heat-conduction/nutils/heat.py)
* [A heat conduction script coupled to CFD for conjugate heat transfer](https://github.com/precice/tutorials/blob/master/flow-over-heated-plate/solid-nutils/solid.py)
* [An ALE incompressible Navier-Stokes solver coupled to solid mechanics for fluid-structure interaction](https://github.com/precice/tutorials/blob/master/perpendicular-flap/fluid-nutils/fluid.py)
* [A fracture mechanics solver volume-coupled to a dummy electro-chemistry corrosion model](https://github.com/uekerman/Coupled-Brittle-Fracture/blob/master/fracture.py)
* [A 1D compressible fluid solver coupled to a 3D compressible fluid solver](https://gitlab.lrz.de/precice/ofw2019-experiments/-/blob/master/D/nutils/sonicLiquid.py) (uses deprecated version of Python bindings)
