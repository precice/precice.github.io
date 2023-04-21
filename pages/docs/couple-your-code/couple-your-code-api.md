---
title: Application programming interface
permalink: couple-your-code-api.html
keywords: api, adapter, library, bindings, SolverInterface
summary: "This page gives an overview on available preCICE APIs and minimal reference implementations."
---

preCICE is written in C++. Thus, the native API language of preCICE is C++ as well. If you are new to the preCICE API, we recommended that you first follow the [step-by-step guide](couple-your-code-preparing-your-solver.html).

## Native API

The definite documentation of the C++ API is available on [the preCICE doxygen pages](https://precice.org/doxygen/main/classprecice_1_1SolverInterface.html).

| Language       | Location                                                                                    | Installation                                                                  |
|----------------|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| C++            | [`precice/precice/tree/main/src/precice/SolverInterface.hpp`](https://github.com/precice/precice/tree/main/src/precice/SolverInterface.hpp)       | Automatically included                                          |

## Bindings

Besides the C++ API, there are also bindings to other languages available:

| Language       | Location                                                                                    | Installation                                                                  |
|----------------|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| C              | [`precice/precice/tree/main/extras/bindings/c`](https://github.com/precice/precice/tree/main/extras/bindings/c)       | [native bindings](installation-source-advanced.html#disabling-native-bindings)|
| Fortran        | [`precice/precice/tree/main/extras/bindings/fortran`](https://github.com/precice/precice/tree/main/extras/bindings/fortran) | [native bindings](installation-source-advanced.html#disabling-native-bindings)|
| Fortran Module | [`precice/fortran-module`](https://github.com/precice/fortran-module)                       | [`make`](installation-bindings-fortran.html)                                  |
| Python         | [`precice/python-bindings`](https://github.com/precice/python-bindings)                     | [`pip3 install pyprecice`](installation-bindings-python.html)                 |
| Matlab         | [`precice/matlab-bindings`](https://github.com/precice/matlab-bindings)                     | [installation script](installation-bindings-matlab.html)                      |
| Julia          | [`precice/PreCICE.jl`](https://github.com/precice/PreCICE.jl)                               | [`add PreCICE`](installation-bindings-julia.html)                     |
| Rust           | [`precice/rust-bindings`](https://github.com/precice/rust-bindings)                         | [`cargo add precice`](installation-bindings-rust.html)                        |

The community is also working on the following bindings:

| Language       | Location                                                                                    | Notes                                                                  |
|----------------|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| Rust           | [`ajaust/rust-precice`](https://github.com/ajaust/rust-precice)                             | Experimental prototype / work in progress

## Minimal reference implementations

For all languages, we provide minimal reference implementations, so called _solver dummies_. They can be a great source to copy from.

| Language       | Location                                                                                                                          |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| C++            | [`precice/precice/examples/solverdummies/cpp`](https://github.com/precice/precice/tree/main/examples/solverdummies/cpp)         |
| C              | [`precice/precice/examples/solverdummies/c`](https://github.com/precice/precice/tree/main/examples/solverdummies/c)             |
| Fortran        | [`precice/precice/examples/solverdummies/fortran`](https://github.com/precice/precice/tree/main/examples/solverdummies/fortran) |
| Fortran Module | [`precice/fortran-module/examples/solverdummy`](https://github.com/precice/fortran-module/tree/master/examples/solverdummy)       |
| Python         | [`precice/python-bindings/examples/solverdummy`](https://github.com/precice/python-bindings/tree/master/examples/solverdummy)     |
| Matlab         | [`precice/matlab-bindings/solverdummy`](https://github.com/precice/matlab-bindings/tree/master/solverdummy)                       |
| Julia          | [`precice/PreCICE.jl/solverdummy`](https://github.com/precice/PreCICE.jl/tree/main/solverdummy)                                   |
| Rust           | [`precice/rust-bindings/examples/solverdummy`](https://github.com/precice/rust-bindings/tree/main/examples/solverdummy)           |

The community also maintains [MPI-parallel versions of some of these solver dummies](https://github.com/ajaust/precice-parallel-solverdummies).

## Architectural overview of bindings

All the language bindings are calling the C++ API of preCICE and some of them are interdependent. Here is an overview of what uses what:

![Architectural overview of bindings](images/docs/Bindings.png)
