---
title: Naming conventions
keywords: pages, development, naming
permalink: dev-docs-naming.html
summary: This page describes naming conventions for the preCICE ecosystem.
---

## The preCICE name

preCICE is always stylized with lowercase `pre` and uppercase `CICE`, even in the beginning of a sentence.

In technical contexts (e.g., a repository or package name), the lowercase `precice` is typically preferred.

The forms `PreCICE` or `PRECICE` should be avoided, if possible.

## Naming adapters

Wherever possible, adapters use composite names that start with the name of the code they adapt, followed by preCICE. For example, human-friendly names of adapters (e.g., appearing in a publication) are `FEniCS-preCICE` and `OpenFOAM-preCICE`.

The motivation behind this is to be seen as extensions of the respective simulation code, and be easily discoverable in the context of that code. Looking at a package distribution repository, `fenicsprecice` should be close to `fenics`.

The `adapter` is not part of the name, for concision reasons. The FEniCS community only wants to know that this package enables them to use preCICE with FEniCS. The "adapter" is preCICE-specific terminology.

When hosted under the preCICE organization on GitHub, repositories are named as `fenics-adapter`, `openfoam-adapter`, etc. The names are always lowercase, and the dash increases readability. The `-adapter` part is now part of the name, because in the context of the preCICE organization on GitHub, the relevance to preCICE is implied: `precice/fenics-adapter`, `precice/openfoam-adapter`.

## Naming tools

preCICE-related tools that are meant to be started as executables should be prepended by `precice-`. For example:

- `precice-tools`
- `precice-config-visualizer`
- `precice-micro-manager`
- `precice-aste`

This allows easy auto-completion and grouping or related tools.

As an exception, even if it is an executable developed in the context of preCICE, we consider the [fmiprecice](https://precice.org/tooling-fmi-runner.html) to follow the naming conventions of adapters, as it is seen from the perspective of the FMI community.

## Python packages

Packages on [PyPI](https://pypi.org/user/precice/) are named as follows:

- `pyprecice`: The `py` implies this is the Python integration. We don't name it just `precice`, because it does not install preCICE itself. That could be a separate package in the future, which could be a dependency of `pyprecice`. Still, the package enables `import precice`: a Python version of the preCICE API. This is intended, as it is clear this is not the C++ API of preCICE. It is also shorter and more intuitive for the user.
- preCICE tools (names prepended by `precice-`):
  - `precice-config-visualizer`
  - `precice-config-visualizer-gui`
  - `precice-micro-manager` (previously `micro-manager-precice`)
- preCICE adapters (names prepended by the respective code, the missing dash is not intentional):
  - `fenicsprecice`
  - `fmiprecice`

## Docker images

Images on [Docker Hub](https://hub.docker.com/u/precice) follow various names, which have not yet converged.

Since images are always scoped by the user, the `precice-` is omitted from the name. For example:

- `precice/precice` provides preCICE
- `precice/<language>-bindings` provide language bindings on top of preCICE
- `precice/<code>-precice` provide an adapter for a code
- `precice/ci-<platform>` do not provide preCICE, but dependencies and tools that are used to build preCICE in the CI
