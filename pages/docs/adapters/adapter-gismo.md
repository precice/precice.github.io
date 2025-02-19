---
title: The G+Smo adapter
permalink: adapter-gismo.html
keywords: adapter, G+Smo, Isogeometric Analysis, IGA
summary: "The G+Smo adapter can be used to couple G+Smo to CFD solvers for FSI applications or even to couple G+Smo to itself for advanced structural simulations."
---

## What is G+Smo?

G+Smo (pronounced gismo or gizmo) is a C++ library for isogeometric analysis (IGA). Geometry plus simulation modules aims at the seamless integration of Computer-aided Design (CAD) and Finite Element Analysis (FEA).

## Aim of the adapter

The G+Smo adapter provides a collection of examples demonstrating the use of G+Smo solvers adapted for preCICE. A particular focus lies on the IGA functionality of G+Smo.

## Install G+Smo and the adapter

The [G+Smo adapter](https://github.com/gismo/gsPreCICE) is a submodule of the [G+Smo library](https://github.com/gismo/gismo) and relies on the core functionality of the main library. The adapter is automatically cloned into the main library if configured.

Clone G+Smo and build a specific solver:

```bash
git clone https://github.com/gismo/gismo.git
cd gismo
mkdir build & cd build
cmake .. -DGISMO_OPTIONAL="<Other submodules>;gsPreCICE"
make <solver_name>
```
Depending on the solver, different submodules need to be added.

`<Other submodules>` can be [`gsElasticity`](https://github.com/gismo/gsElasticity), [`gsKLShell`](https://github.com/gismo/gsKLShell) and [`gsStructuralAnalysis`](https://github.com/gismo/gsStructuralAnalysis). For more details, refer to the documentation and examples within each submodule.

| **Solver**                          | **Required Submodules**                                           | **Configuration**                                |
|------------------------------------|-------------------------------------------------------------------|---------------------------------------------------|
| **perpendicular-flap-vertex-gismo** | [`gsElasticity`](https://github.com/gismo/gsElasticity),[`gsStructuralAnalysis`](https://github.com/gismo/gsStructuralAnalysis)   | `cmake .. -DGISMO_OPTIONAL="gsPreCICE;gsElasticity;gsStructuralAnalysis"`| 


Finally, make the solver discoverable, e.g. by installation:

```
make install <solver_name>
```
