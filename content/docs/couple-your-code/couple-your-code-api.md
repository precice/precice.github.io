---
title: Application programming interface
permalink: couple-your-code-api.html
keywords: api, adapter, library, bindings, Participant
summary: "This page gives an overview on available preCICE APIs and minimal reference implementations."
---

preCICE is written in C++. Thus, the native API language of preCICE is C++ as well. If you are new to the preCICE API, we recommended that you first follow the [step-by-step guide](couple-your-code-preparing-your-solver.html).

The API uses C++ bindings by default, but we provide bindings for different languages as well. Here we provide an overview of all supported languages, including location, installation and a minimal reference implementations.

The reference implementations are the so called _solver dummies_, which can be a great source to copy from. The community also maintains [MPI-parallel versions of some of these solver dummies](https://github.com/ajaust/precice-parallel-solverdummies).

## C++

Extensive documentation on the C++ API is available on [the preCICE API doxygen pages for the latest release](https://precice.org/doxygen/main/classprecice_1_1Participant.html), or [see more options](dev-docs-sourcedocs.html).

- Location: [`precice/precice/tree/main/src/precice/Participant.hpp`](https://github.com/precice/precice/tree/main/src/precice/Participant.hpp)
- Installation: Automatically included
- Reference implementation: [`precice/precice/examples/solverdummies/cpp`](https://github.com/precice/precice/tree/main/examples/solverdummies/cpp)  

## C

Yet C++ is the default, C bindings are included in the main repository.

- Location: [`precice/precice/tree/main/extras/bindings/c`](https://github.com/precice/precice/tree/main/extras/bindings/c)
- Installation: [native bindings](installation-source-advanced.html#disabling-native-bindings)
- Reference implementation: [`precice/precice/examples/solverdummies/c`](https://github.com/precice/precice/tree/main/examples/solverdummies/c)

## Fortran

Yet C++ is the default, Fortran bindings are included in the main repository.

- Location: [`precice/precice/tree/main/extras/bindings/fortran`](https://github.com/precice/precice/tree/main/extras/bindings/fortran)
- Installation: [native bindings](installation-source-advanced.html#disabling-native-bindings)
- Reference implementation: [`precice/precice/examples/solverdummies/fortran`](https://github.com/precice/precice/tree/main/examples/solverdummies/fortran)

## Fortran module

- Location: [`precice/fortran-module`](https://github.com/precice/fortran-module)
- Installation: [`make`](installation-bindings-fortran.html)
- Reference implementation: [`precice/fortran-module/examples/solverdummy`](https://github.com/precice/fortran-module/tree/master/examples/solverdummy)

## Python

- Location:[`precice/python-bindings`](https://github.com/precice/python-bindings)
- Installation: [`pip3 install pyprecice`](installation-bindings-python.html)
- Reference implementation: [`precice/python-bindings/examples/solverdummy`](https://github.com/precice/python-bindings/tree/master/examples/solverdummy)

## Matlab

- Location:[`precice/matlab-bindings`](https://github.com/precice/matlab-bindings)
- Installation: [installation script](installation-bindings-matlab.html)
- Reference implementation: [`precice/matlab-bindings/solverdummy`](https://github.com/precice/matlab-bindings/tree/master/solverdummy)

## Julia

- Location:  [`precice/PreCICE.jl`](https://github.com/precice/PreCICE.jl)
- Installation: [`add PreCICE`](installation-bindings-julia.html)
- Reference implementation: [`precice/PreCICE.jl/solverdummy`](https://github.com/precice/PreCICE.jl/tree/main/solverdummy)

## Rust

- Location:   [`precice/rust-bindings`](https://github.com/precice/rust-bindings)
- Installation:[`cargo add precice`](installation-bindings-rust.html)
- Reference implementation: [`precice/rust-bindings/examples/solverdummy`](https://github.com/precice/rust-bindings/tree/main/examples/solverdummy)  

## Architectural overview of bindings

All the language bindings are calling the C++ API of preCICE and some of them are interdependent. Here is an overview of what uses what:

![Architectural overview of bindings](images/docs/Bindings.png)
