---
title: The SU2 adapter
permalink: adapter-su2-overview.html
redirect_from: adapter-su2.html
keywords: adapter, su2, development, modules
summary: "Modify native SU2 files to couple with other solvers or SU2 itself"
---

## What is this?

The SU2-preCICE adapter is an extended version of the compressible SU2 CFD-solver, that allows to couple SU2 to other solvers via preCICE. In the moment it can be used for FSI simulations with any respective CSM-solver that has an adapter to preCICE. The SU2-preCICE adapter represents the Fluid part of the FSI-simulation and is able to write forces to and read displacementdeltas from its structural counterpart via preCICE.

## Try

Here you will find how to [get the adapter](adapter-su2-get.html) and [how to configure](adapter-su2-configure.html) a case.
A tutorial case that uses this adapter is the [perpendicular flap tutorial](tutorials-perpendicular-flap.html).

## References

[1] Alexander Rusch. [Extending SU2 to Fluid-Structure Interaction via preCICE](http://www5.in.tum.de/pub/Rusch2016_BA.pdf). Bachelor's thesis, Munich School of Engineering, Technical University of Munich, 2016.
