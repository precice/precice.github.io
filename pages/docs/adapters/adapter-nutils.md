---
title: The Nutils adapter
permalink: adapter-nutils.html
keywords: FEM, adapter, heat conduction, finite element
summary: "There is currently not really such a thing as a Nutils adapter. Coupling Nutils is so simple that directly calling the preCICE Python API from the application scripts is the way to go."
---

The best way to learn how to couple a [Nutils](http://www.nutils.org/en/latest/) application script is to look at some examples:
* Two heat conduction scripts coupled to one another: will come soon.
* [A heat conduction script coupled to CFD for conjugate heat transfer](https://github.com/precice/tutorials/blob/master/CHT/flow-over-plate/buoyantPimpleFoam-nutils/Nutils/cht.py)
* [An ALE incompressible Navier-Stokes solver coupled to solid mechanics for fluid-structure interaction](https://gitlab.lrz.de/precice/ijnme2019-experiments/-/blob/master/Fluid-Structure%20Interaction/physics/run-sc/Nutils-FEniCS/Nutils/nsale.py) (uses deprecated version fo Python bindings and only works for Nutils v5)
* [A fracture mechanics solver volume-coupled to a electro-chemistry corrosion model](https://github.com/uekerman/Coupled-Brittle-Fracture/blob/master/fracture.py)
* [A 1D compressible fluid solver coupled to a 3D compressible fluid solver](https://gitlab.lrz.de/precice/ofw2019-experiments/-/blob/master/D/nutils/sonicLiquid.py) (uses deprecated version fo Python bindings)
