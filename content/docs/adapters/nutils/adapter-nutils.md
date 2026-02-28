---
title: The Nutils adapter
permalink: adapter-nutils.html
keywords: FEM, adapter, heat conduction, finite element
summary: "There is currently not really such a thing as a Nutils adapter. Coupling Nutils is so simple that directly calling the preCICE Python API from the application scripts is the way to go."
---

The best way to learn how to couple a [Nutils](http://www.nutils.org/) application script is to look at some examples:

* [Two heat conduction scripts coupled to one another](https://github.com/precice/tutorials/tree/master/partitioned-heat-conduction) (Nutils 6 and 7)
* [A heat conduction script coupled to CFD for conjugate heat transfer](https://github.com/precice/tutorials/blob/master/flow-over-heated-plate/solid-nutils/solid.py) (Nutils 7)
* [An ALE incompressible Navier-Stokes solver coupled to solid mechanics for fluid-structure interaction](https://github.com/precice/tutorials/blob/master/perpendicular-flap/fluid-nutils/fluid.py) (Nutils 6)
* [A linear solid mechanics solver coupled to fluid mechanics for fluid-structure interaction](https://github.com/precice/tutorials/blob/master/perpendicular-flap/solid-nutils/solid.py) (Nutils 8)
* [A channel flow solver coupled to a transport problem solver](https://github.com/precice/tutorials/tree/master/channel-transport) (Nutils 7)
* [A fracture mechanics solver volume-coupled to a dummy electro-chemistry corrosion model](https://github.com/uekerman/Coupled-Brittle-Fracture/blob/master/fracture.py) (Nutils 6)
* [A 1D compressible fluid solver coupled to a 3D compressible fluid solver](https://gitlab.lrz.de/precice/ofw2019-experiments/-/blob/master/D/nutils/sonicLiquid.py) (uses deprecated version of Python bindings) (Nutils 5)

We recommend using a Python virtual environment to install different Nutils versions. See the `requirements.txt` and the `run.sh` of the cases included in the preCICE tutorials for an example.

Version 8 requires `bottombar` as a dependency. `pip` might automatically install version `2.0`, which has [known issues](https://github.com/precice/precice/issues/1443) when used with preCICE. A [patch](https://github.com/evalf/bottombar/commit/fd2dc3a76db282e5ba1f12047683100a299cf651) was implemented in version `2.1`, thus a workaround is to explicitly re-install version `2.1`: `pip3 install bottombar==2.1` (in the same [virtual environment](https://docs.python.org/3/library/venv.html#creating-virtual-environments)).
