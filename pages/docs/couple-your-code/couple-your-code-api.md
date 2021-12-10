---
title: Application programming interface
permalink: couple-your-code-api.html
keywords: api, adapter, library, bindings, SolverInterface
summary: "This page gives an overview on available preCICE APIs and minimal reference implementations."
---

preCICE is written in C++. Thus, the native API language of preCICE is C++ as well. If you are new to the preCICE API, however, we recommended that you first follow the [step-by-step guide](couple-your-code-preparing-your-solver.html).

## Native API

The definite documentation of the C++ API is available on [the preCICE C++ API website](https://precice.org/doxygen/master/classprecice_1_1SolverInterface.html).

| Language       | Location                                                                                    | Installation                                                                  |
|----------------|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| C++            | [`precice/precice/tree/master/src/precice/SolverInterface.hpp`](https://github.com/precice/precice)       | Automatically included                                          |



## Bindings

Besides the C++ API, there are also bindings to other languages available:

| Language       | Location                                                                                    | Installation                                                                  |
|----------------|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| C              | [`precice/precice/tree/master/extras/bindings/c`](https://github.com/precice/precice)       | [native bindings](installation-source-advanced.html#disabling-native-bindings)|
| Fortran        | [`precice/precice/tree/master/extras/bindings/fortran`](https://github.com/precice/precice) | [native bindings](installation-source-advanced.html#disabling-native-bindings)|
| Fortran Module | [`precice/fortran-module`](https://github.com/precice/fortran-module)                       | [`make`](installation-bindings-fortran.html)                                  |
| Python         | [`precice/python-bindings`](https://github.com/precice/python-bindings)                     | [`pip3 install pyprecice`](installation-bindings-python.html)                 |
| Matlab         | [`precice/matlab-bindings`](https://github.com/precice/matlab-bindings)                     | [installation script](installation-bindings-matlab.html)                      |

## Minimal reference implementations

For all languages, we provide minimal reference implementations, so called _solver dummies_. They can be a great source to copy from.

| Language       | Location                                                                                                                          |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| C++            | [`precice/precice/examples/solverdummies/cpp`](https://github.com/precice/precice/tree/master/examples/solverdummies/cpp)         |
| C              | [`precice/precice/examples/solverdummies/c`](https://github.com/precice/precice/tree/master/examples/solverdummies/c)             |
| Fortran        | [`precice/precice/examples/solverdummies/fortran`](https://github.com/precice/precice/tree/master/examples/solverdummies/fortran) |
| Fortran Module | [`precice/fortran-module/examples/solverdummy`](https://github.com/precice/fortran-module/tree/master/examples/solverdummy)       |
| Python         | [`precice/python-bindings/solverdummy`](https://github.com/precice/python-bindings/tree/master/solverdummy)                       |
| Matlab         | [`precice/matlab-bindings/solverdummy`](https://github.com/precice/matlab-bindings/tree/master/solverdummy)                       |

## Architectural overview of bindings

All the language bindings are calling the C++ API of preCICE and some of them are interdependent. Here is an overview of what uses what:

![Architectural overview of bindings](images/docs/Bindings.png)
