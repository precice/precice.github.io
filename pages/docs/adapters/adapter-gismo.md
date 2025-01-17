---
title: The G+Smo adapter
permalink: adapter-gismo.html
keywords: adapter, G+Smo, Isogeometric Analysis
summary: "The G+Smo adapter can be used to couple G+Smo to CFD solvers for FSI applications or even to couple G+Smo to itself for advanced structural simulations."
---

## What is G+Smo?

G+Smo (pronounced gismo or gizmo) is a C++ library for isogeometric analysis (IGA). Geometry plus simulation modules aims at the seamless integration of Computer-aided Design (CAD) and Finite Element Analysis (FEA).


## Install G+Smo
The G+Smo adapter is a submodule of the G+Smo library, relies on the core functionality of the main library.  To get started, you need to install G+Smo on your system first.


This adapter provides a collection of examples demonstrating the use of a G+Smo solver adapted for preCICE. 


### Clone the Adapter
After downloading [G+Smo](https://github.com/gismo/gismo), clone the G+Smo adapter submodule:

```
cd gismo/build
cmake .. -DGISMO_OPTIONAL="<Other submodules>;gsPreCICE" 
```
_Note:_ For example, `<Other submodules>` can be [`gsElasticity`](https://github.com/gismo/gsElasticity), [`gsKLShell`](https://github.com/gismo/gsKLShell) and [`gsStructuralAnalysis`](https://github.com/gismo/gsStructuralAnalysis). See these submodules for extra information.

### Build and install a tutorial

To build and install a tutorial with `<tutorial name>`, run the following:

```
make <tutorial name> -j <number of threads>
```

Make the tutorial systemwide discoverable:
```
make install <tutorial name>
```



