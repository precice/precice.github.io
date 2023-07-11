---
title: The preCICE distribution
permalink: installation-distribution.html
keywords: installation, versions, compatibility, distribution
summary: "A frozen state of component versions that work together."
---

## What is the preCICE distribution?

preCICE is much more than the core library: it is a larger ecosystem that includes
language bindings, adapters for popular solvers, tutorials, and more. We know that it
can be difficult to figure out which versions to install, therefore we will be
publishing here lists of known-to-work versions.

Releases of the preCICE distribution are irregular. The version of each distribution is `yymm.r`, reflecting the year, the month, and the revision (bugfixes) of the distribution. Bindings versions reflect compatibility with a specific preCICE version, while adapters use a completely independent versioning scheme. The tutorials follow a `yyyymm.r` scheme and are targeting the released versions of each component. The VM version is based on the tutorials version, followed by the VM revision. While the distribution uses two year digits for convenience, the tutorials and the VM use four digits to allow version comparisons with previous releases that already used four digits.

## v2211.0

[![preCICE distribution v2211.0](https://img.shields.io/badge/doi-10.18419%2Fdarus--3576-d45815.svg)](https://doi.org/10.18419/darus-3576)

This is the last release that works with preCICE v2.x.

It comprises the following components:

- preCICE: [v2.5.0](https://github.com/precice/precice/releases/tag/v2.5.0)
- Tools:
  - ASTE: [v3.0.0](https://github.com/precice/aste/releases/tag/v3.0.0) (new)
  - config-visualizer: commit [60f2165](https://github.com/precice/config-visualizer/tree/60f2165f25352c8261f370dc4ceb64a8b422d4ec) (new)
  - ci-images: commit [f48c7e8](https://github.com/precice/ci-images/tree/f48c7e87fa1a8093e0f046c04d890bdf5dc3b77d) (new)
- Bindings:
  - Fortran module: commit [9e3f405](https://github.com/precice/fortran-module/tree/9e3f40569a4ac0538aea7abb8e0f453141c700cd)
  - Julia bindings: [v2.5.0](https://github.com/precice/PreCICE.jl/releases/tag/v2.5.0) (new and experimental)
  - Matlab bindings: [v2.5.0.0](https://github.com/precice/matlab-bindings/releases/tag/v2.5.0.0)
  - Python bindings: [v2.5.0.1](https://github.com/precice/python-bindings/releases/tag/v2.5.0.1)
- Adapters:
  - CalculiX adapter: [v2.20.0](https://github.com/precice/calculix-adapter/releases/tag/v2.20.0)
  - code_aster adapter: commit [ce995e0](https://github.com/precice/code_aster-adapter/tree/ce995e0c41b26fe891ce04fd47fd52cbeff854e9) (same as in v2202.0)
  - deal.II adapter: [dbb25be](https://github.com/precice/dealii-adapter/tree/dbb25bea51531b7e4e0c9b5e4def3a7fadf8367c)
  - DUNE adapter: commit [5f2364d](https://github.com/precice/dune-adapter/tree/5f2364d57b517698914cb1d5f9979efe692d9254) (same as in v2202.0, experimental)
  - FEniCS adapter: [v1.4.0](https://github.com/precice/fenics-adapter/releases/tag/v1.4.0)
  - OpenFOAM adapter: [v1.2.0](https://github.com/precice/openfoam-adapter/releases/tag/v1.2.0)
  - SU2 adapter: [ab84387](https://github.com/precice/su2-adapter/tree/ab843878c1d43302a4f0c66e25dcb364b7787478) (same as in v2202.0)
- Tutorials: [v202211.0](https://github.com/precice/tutorials/releases/tag/v202211.0)
- vm: [v202211.0.0](https://github.com/precice/vm/releases/tag/v202211.0.0)
- Website and documentation: [v202211.0.0](https://github.com/precice/precice.github.io/releases/tag/v202211.0.0), [libprecice2_2.2.5_docs_v202211.0.0.pdf](https://github.com/precice/precice.github.io/releases/download/v202211.0.0/libprecice2_2.2.5_docs_v202211.0.0.pdf)

## v2202.0

[![preCICE distribution v2202.0](https://img.shields.io/badge/doi-10.18419%2Fdarus--2613-d45815.svg)](https://doi.org/10.18419/darus-2613)

This is a scheduled release in the context of the [preCICE Workshop 2022](precice-workshop-2022.html).

It comprises the following components:

- preCICE: [v2.3.0](https://github.com/precice/precice/releases/tag/v2.3.0)
- Bindings:
  - Fortran module: commit [38fe542](https://github.com/precice/fortran-module/tree/38fe54233754fde53ceeddb19d4ae4cb1828d0a9)
  - Matlab bindings: [v2.3.0.1](https://github.com/precice/matlab-bindings/releases/tag/v2.3.0.1)
  - Python bindings: [v2.3.0.1](https://github.com/precice/python-bindings/releases/tag/v2.3.0.1)
- Adapters:
  - CalculiX adapter: [v2.19.0](https://github.com/precice/calculix-adapter/releases/tag/v2.19.0) (first tagged release)
  - code_aster adapter: commit [ce995e0](https://github.com/precice/code_aster-adapter/tree/ce995e0c41b26fe891ce04fd47fd52cbeff854e9) (same as in v2104.0)
  - deal.II adapter: commit [005933d](https://github.com/precice/dealii-adapter/tree/005933d6b45f885a64aee7ce597a3d7d81d54aff)
  - DUNE adapter: commit [5f2364d](https://github.com/precice/dune-adapter/tree/5f2364d57b517698914cb1d5f9979efe692d9254) (new and experimental)
  - FEniCS adapter: [v1.3.0](https://github.com/precice/fenics-adapter/releases/tag/v1.3.0)
  - OpenFOAM adapter: [v1.1.0](https://github.com/precice/openfoam-adapter/releases/tag/v1.1.0)
  - SU2 adapter: commit [ab84387](https://github.com/precice/su2-adapter/tree/ab843878c1d43302a4f0c66e25dcb364b7787478) (same as in v2104.0)
- Tutorials: [v202202.0](https://github.com/precice/tutorials/releases/tag/v202202.0)
- vm: [v202202.0.0](https://github.com/precice/vm/releases/tag/v202202.0.0)
- Website and documentation: [v202202.0.0](https://github.com/precice/precice.github.io/releases/tag/v202202.0.0)

## v2104.0

[![preCICE distribution v2104.0](https://img.shields.io/badge/doi-10.18419%2Fdarus--2125-d45815.svg)](https://doi.org/10.18419/darus-2125)

This is the first preCICE distribution version, coming after the restructuring of our tutorials.

It comprises the following components:

- preCICE: [v2.2.0](https://github.com/precice/precice/releases/tag/v2.2.0)
- Python bindings: [v2.2.0.2](https://github.com/precice/python-bindings/releases/tag/v2.2.0.2)
- Fortran module: commit [9826f27](https://github.com/precice/fortran-module/tree/9826f277e3302cc1aef50741530538bd9d8d23c7)
- Matlab bindings: [v2.2.0.1](https://github.com/precice/matlab-bindings/releases/tag/v2.2.0.1)
- OpenFOAM adapter: [v1.0.0](https://github.com/precice/openfoam-adapter/releases/tag/v1.0.0)
- deal.II adapter: commit [685508e](https://github.com/precice/dealii-adapter/tree/685508e8c3391f29b74d7851c15318faa226fa1c)
- FEniCS adapter: [v1.1.0](https://github.com/precice/fenics-adapter/releases/tag/v1.1.0)
- CalculiX adapter: commit [9fefcef](https://github.com/precice/calculix-adapter/tree/9fefcef8ade330280cb300c25c78df6827b44684)
- SU2 adapter: commit [ab84387](https://github.com/precice/su2-adapter/tree/ab843878c1d43302a4f0c66e25dcb364b7787478)
- code_aster adapter: commit [ce995e0](https://github.com/precice/code_aster-adapter/tree/ce995e0c41b26fe891ce04fd47fd52cbeff854e9)
- Tutorials: [v202104.1.1](https://github.com/precice/tutorials/releases/tag/v202104.1.1)
- vm: [v202104.1.0](https://github.com/precice/vm/releases/tag/v202104.1.0)
- Website and documentation: commit [928fd8d](https://github.com/precice/precice.github.io/tree/928fd8d2b701a3d6252af9407655005652daa066)
