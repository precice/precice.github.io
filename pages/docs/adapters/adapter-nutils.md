---
title: The Nutils adapter
permalink: adapter-nutils.html
keywords: FEM, adapter, heat conduction, finite element
summary: "There is currently not really such a thing as a Nutils adapter. Coupling Nutils is so simple that directly calling the preCICE Python API from the application scripts is the way to go."
---

The best way to learn how to couple a [Nutils](http://www.nutils.org/) application script is to look at some examples:

* [Two heat conduction scripts coupled to one another](https://github.com/precice/tutorials/blob/master/partitioned-heat-conduction/nutils/heat.py) (Nutils 6 and 7)
* [A heat conduction script coupled to CFD for conjugate heat transfer](https://github.com/precice/tutorials/blob/master/flow-over-heated-plate/solid-nutils/solid.py) (Nutils 7)
* [An ALE incompressible Navier-Stokes solver coupled to solid mechanics for fluid-structure interaction](https://github.com/precice/tutorials/blob/master/perpendicular-flap/fluid-nutils/fluid.py) (Nutils 6, [needs update](https://github.com/precice/tutorials/issues/217))
* [A channel flow solver coupled to a transport problem solver](https://github.com/precice/tutorials/tree/master/channel-transport) (Nutils 7)
* [A fracture mechanics solver volume-coupled to a dummy electro-chemistry corrosion model](https://github.com/uekerman/Coupled-Brittle-Fracture/blob/master/fracture.py) (Nutils 6)
* [A 1D compressible fluid solver coupled to a 3D compressible fluid solver](https://gitlab.lrz.de/precice/ofw2019-experiments/-/blob/master/D/nutils/sonicLiquid.py) (uses deprecated version of Python bindings) (Nutils 5)

To install a specific version of Nutils use, for example: `pip3 install --user nutils==6.3`.
