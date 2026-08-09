---
title: The G+Smo adapter
permalink: adapter-gismo.html
keywords: adapter, G+Smo, Isogeometric Analysis, IGA
summary: "The G+Smo adapter can be used to couple G+Smo to CFD solvers for FSI applications or even to couple G+Smo to itself for advanced structural simulations."
---

## What is G+Smo?

G+Smo (pronounced gismo or gizmo) is a C++ library for isogeometric analysis (IGA). Geometry plus simulation modules aims at the seamless integration of Computer-aided Design (CAD) and Finite Element Analysis (FEA).

## What can it do?

This adapter can read/write the following fields in a surface coupling setup:

- Temperature (read + write)
- Temperature surface-normal gradient (read + write)
- Heat flux (read + write)
- Stress (read)
- Force (read)
- Displacement (read + write)
- Pressure (read)
- Velocity (write)
- Velocity surface-normal gradient (write)
  
All features of preCICE are supported, including implicit coupling, nearest-projection mapping and radial basis function based mapping.

## Aim of the adapter

The G+Smo adapter provides a collection of examples demonstrating the use of G+Smo solvers adapted for preCICE. A particular focus lies on the IGA functionality of G+Smo.

## Install G+Smo and the adapter

The [G+Smo adapter](https://github.com/gismo/gsPreCICE) is a submodule of the [G+Smo library](https://github.com/gismo/gismo) and relies on the core functionality of the main library. The adapter is automatically cloned into the main library if configured.

Clone G+Smo and build a specific solver:

```bash
git clone https://github.com/gismo/gismo.git
cd gismo
mkdir build & cd build
cmake .. -DGISMO_OPTIONAL="<additional submodules>;gsPreCICE"
make <solver_name>
```

Depending on the solver, different submodules need to be added. These `<additional submodules>` can be [`gsElasticity`](https://github.com/gismo/gsElasticity), [`gsKLShell`](https://github.com/gismo/gsKLShell) and [`gsStructuralAnalysis`](https://github.com/gismo/gsStructuralAnalysis).

For example, to build the solver `perpendicular-flap-vertex-gismo`, configure and build with:

```bash
cmake .. -DGISMO_OPTIONAL="gsElasticity;gsStructuralAnalysis;gsPreCICE"
make perpendicular-flap-vertex-gismo
```

For more details, refer to the documentation and examples within each submodule. Available solvers:

| **Solver**                          | **Additional submodules**                                           |
|------------------------------------|-------------------------------------------------------------------|
| `perpendicular-flap-vertex-gismo` | [`gsElasticity`](https://github.com/gismo/gsElasticity),[`gsStructuralAnalysis`](https://github.com/gismo/gsStructuralAnalysis)   |

Finally, make the solver discoverable, e.g. by installation (by default, to `/usr/local/`, which might not be in your `LD_LIBRARY_PATH`):

```bash
make install <solver_name>
```

## History

The adapter has been developed by Jingya Li ([@Crazy-Rich-Meghan](https://github.com/Crazy-Rich-Meghan)) and Hugo Verhelst ([@hverhelst](https://github.com/hverhelst)).

## How to cite

There is a [FAQ entry](https://github.com/gismo/gismo/wiki/Frequently-asked-questions#user-content-How_can_I_cite_GSmo_in_a_publicationpresentation_) on how to cite G+Smo itself.
