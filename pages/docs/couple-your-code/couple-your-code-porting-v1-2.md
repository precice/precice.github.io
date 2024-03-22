---
title: Porting from 1.x to 2.x
permalink: couple-your-code-porting-v1-2.html
keywords: api, adapter, version, time step, action
summary: "This guide helps you to upgrade from preCICE 1.x to preCICE 2.x."
redirect_from: couple-your-code-porting-adapters.html
---

## preCICE API

### Single-step setup

This is described in detail in [#614](https://github.com/precice/precice/pull/614) and was done to simplify the setup. Change:

```diff
-  SolverInterface interface(solverName, commRank, commSize);
-  interface.configure(configFileName);
+  SolverInterface interface(solverName, configFileName, commRank, commSize);
```

Typical error message that should lead you here:

```text
error: no matching function for call to ‘precice::SolverInterface::SolverInterface(std::__cxx11::string&, int, Foam::label)’
         precice_ = new precice::SolverInterface(participantName_, Pstream::myProcNo(), Pstream::nProcs());
```

and

```text
note: candidate: precice::SolverInterface::SolverInterface(const string&, const string&, int, int)
   SolverInterface(
   ^
.../SolverInterface.hpp:52:3: note:   candidate expects 4 arguments, 3 provided
```

### Sorted out duplicate meaning of time step

- Renamed API function `isTimestepComplete` to `isTimeWindowComplete` ([#619](https://github.com/precice/precice/pull/619))

### Clarified `fulfilledAction`

- `fulfilledAction` was renamed to `markActionFulfilled` ([#631](https://github.com/precice/precice/pull/631))

## Language bindings

### C

- Moved to `extras/bindings/c`.
- Separated into `include` (header) and `src` (implementation).
- Renamed `precicec_isCouplingTimestepComplete` to `precicec_isTimeWindowComplete`.

### Fortran

- Moved the intrinsic Fortran bindings to `extras/bindings/fortran`.
- Renamed the "Fortran 2003 bindings" to "Fortran module" and `Precice_solver_if_module` to `precice`. Moved them to [precice/fortran-module](https://github.com/precice/fortran-module).

### Python

- [python bindings migration guide](https://github.com/precice/python-bindings/blob/develop/docs/MigrationGuide.md)

## preCICE configuration file

- Renamed `mapping:petrbf` to `mapping:rbf` (see [#572](https://github.com/precice/precice/pull/572)).
- Remove `master:mpi-single` tags.
  preCICE defaults to `master:mpi-single` for parallel participants (see [#572](https://github.com/precice/precice/pull/572)).
- Remove `distribution-type="..."` from `m2n` tags.
  It now defaults to `point-to-point`, use the attribute `enforce-gather-scatter=1` if this is not desired (see [#572](https://github.com/precice/precice/pull/572)).
- Renamed `coupling-scheme` configuration option `timestep-length` to `time-window-size`
- Renamed `coupling-scheme` configuration option `max-timesteps` to `max-time-windows`
- Renamed `post-processing` to `acceleration`
- Renamed `acceleration` configuration option `timesteps-reused` to `time-windows-reused`
- Renamed `acceleration` configuration option `reused-timesteps-at-restart` to `reused-time-windows-at-restart`
- Renamed `export` configuration option `timestep-interval` to `every-n-time-windows`
- Renamed `action` configuration option `on-timestep-complete-post` to `on-time-window-complete-post`

## Building

- Renamed CMake variables ([#609](https://github.com/precice/precice/pull/609))
  - `MPI` to `PRECICE_MPICommunication`
  - `PETSC` to `PRECICE_PETScMapping`
  - `PYTHON` to `PRECICE_PythonActions`
- CMake `CMAKE_BUILD_TYPE` is automatically set to `Debug`, if empty
- CMake variables for enabling C and Fortran
- Removed SCons completely. You can do everything and much more with [CMake](installation-source-configuration.html).

## Side-changes

All the tutorials are adapted for preCICE v2. You can still find a [version compatible with preCICE v1.6.1 here](https://github.com/precice/tutorials/tree/precice-v1.6).

Most of the adapters (all apart from the "under initial development" ones) are only supporting the latest version of preCICE. Make sure also that you are using the correct branch: an adapter's `develop` is supposed to work with preCICE `develop`, and similar for `master`.

At the same time as preCICE v2, we also changed the configuration format of the OpenFOAM adapter: Instead of a yaml file, it is now an OpenFOAM dictionary, making installation even easier. Please refer to the [Configuration](adapter-openfoam-config.html) page for more details.
