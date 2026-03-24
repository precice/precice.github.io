---
title: Application programming interface
permalink: couple-your-code-api.html
keywords: api, adapter, library, bindings, Participant
summary: "This page gives an overview on available preCICE APIs and minimal reference implementations."
redirect_from:
  - dev-docs-sourcedocs.html
  - /doxygen/ # Also creates the doxygen/ directory - Important for deploying the Doxygen pages (see .github/workflows/deploy.yml)
---

preCICE is written in C++. Thus, the native API language of preCICE is C++ as well. If you are new to the preCICE API, we recommended that you first follow the [step-by-step guide](couple-your-code-preparing-your-solver.html). If you are using an older version, see the [porting guides](couple-your-code-porting-overview) to port an adapter between major version of preCICE.

Next to the native C++ API, bindings for further languages are also available. In this page, we provide an overview of all supported languages, including location, installation, and minimal reference implementations.

The reference implementations are the so called _solver dummies_, which can be a great source to copy from. The community also maintains [MPI-parallel versions of some of these solver dummies](https://github.com/ajaust/precice-parallel-solverdummies).

## C++ {#cpp}

This is the native API of preCICE.

- Location: [`precice/precice/src/precice/Participant.hpp`](https://github.com/precice/precice/tree/main/src/precice/Participant.hpp)
- Installation: Automatically included
- Usage: `#include "precice/precice.hpp"`
- Reference implementation: [`precice/precice/examples/solverdummies/cpp`](https://github.com/precice/precice/tree/main/examples/solverdummies/cpp)
- C++ API documentation: [latest release](https://api.precice.org/cpp/latest/classprecice_1_1Participant.html), [development version](https://api.precice.org/cpp/develop/classprecice_1_1Participant.html)

See also the source code documentation (Doxygen pages) for the [latest release](https://api.precice.org/cpp/latest/), or the [development version](https://api.precice.org/cpp/develop/).

## C

C bindings are included in the main repository.

- Location: [`precice/precice/extras/bindings/c`](https://github.com/precice/precice/tree/main/extras/bindings/c)
- Installation: [native bindings](installation-source-advanced.html#disabling-native-bindings)
- Usage: `#include "precice/preciceC.h"`
- Reference implementation: [`precice/precice/examples/solverdummies/c`](https://github.com/precice/precice/tree/main/examples/solverdummies/c)
- C API documentation: [latest release](https://api.precice.org/cpp/latest/preciceC_8h.html), [development version](https://api.precice.org/cpp/develop/preciceC_8h.html)

## Fortran

Fortran bindings are included in the main repository.

- Location: [`precice/precice/extras/bindings/fortran`](https://github.com/precice/precice/tree/main/extras/bindings/fortran)
- Installation: [native bindings](installation-source-advanced.html#disabling-native-bindings)
- Reference implementation: [`precice/precice/examples/solverdummies/fortran`](https://github.com/precice/precice/tree/main/examples/solverdummies/fortran)
- Fortran API documentation: [latest release](https://api.precice.org/cpp/latest/preciceFortran_8hpp.html), [development version](https://api.precice.org/cpp/develop/preciceFortran_8hpp.html)

## Fortran module

- Location: [`precice/fortran-module`](https://github.com/precice/fortran-module)
- Installation: [`make`](installation-bindings-fortran.html)
- Usage: `use precice`
- Reference implementation: [`precice/fortran-module/examples/solverdummy`](https://github.com/precice/fortran-module/tree/master/examples/solverdummy)

## Python

- Location:[`precice/python-bindings`](https://github.com/precice/python-bindings)
- Installation: [`pip3 install pyprecice`](installation-bindings-python.html)
- Usage: `import precice`
- Reference implementation: [`precice/python-bindings/examples/solverdummy`](https://github.com/precice/python-bindings/tree/master/examples/solverdummy)

## Matlab

- Location:[`precice/matlab-bindings`](https://github.com/precice/matlab-bindings)
- Installation: [installation script](installation-bindings-matlab.html)
- Reference implementation: [`precice/matlab-bindings/examples/solverdummy`](https://github.com/precice/matlab-bindings/tree/master/examples/solverdummy)

## Julia

- Location: [`precice/PreCICE.jl`](https://github.com/precice/PreCICE.jl)
- Installation: [`add PreCICE`](installation-bindings-julia.html)
- Usage: `using PreCICE`
- Reference implementation: [`precice/PreCICE.jl/solverdummy`](https://github.com/precice/PreCICE.jl/tree/main/solverdummy)

## Rust

- Location: [`precice/rust-bindings`](https://github.com/precice/rust-bindings)
- Installation:[`cargo add precice`](installation-bindings-rust.html)
- Reference implementation: [`precice/rust-bindings/examples/solverdummy`](https://github.com/precice/rust-bindings/tree/main/examples/solverdummy)  

## Architectural overview of bindings

All the language bindings are calling the C++ API of preCICE and some of them are interdependent. Here is an overview of what uses what:

![Architectural overview of bindings](images/docs/Bindings.png)
