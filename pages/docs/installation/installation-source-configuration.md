---
title: Building from source - Configuration
permalink: installation-source-configuration.html
keywords: configuration, basics, cmake, installation, building, source
---

preCICE uses [CMake](https://cmake.org/) to configure and build the library.
After this step, preCICE is ready to [be built](installation-source-building).

## Using presets

preCICE offers a range of CMake configuration presets, which all use the build directory `build`.

To see all available presets use:

```bash
cd precice-{{ site.precice_version }} # Enter the preCICE source directory
cmake --list-presets
```

Then, to configure preCICE, run:

```bash
cd precice-{{ site.precice_version }} # Enter the preCICE source directory
cmake --preset=production # Configure using the production preset
```

This will automatically create a build directory for you.

## Build directory

CMake keeps track of the source and the build directory separately.
This allows to cleanly create multiple build configurations for a single source directory.

Please create a build directory inside the preCICE source directory as follows:

```bash
cd precice-{{ site.precice_version }} # Enter the preCICE source directory
mkdir build
cd build
```

## Options

Now it is time to configure preCICE with the decisions taken in the [preparation steps](installation-source-preparation).
First, make sure that you changed into the `build/` directory.

If you need to configure a debug build with all default settings, run:

```bash
cmake ..
```

As you can see, you can pass variables to cmake using the syntax `-DNAME=VALUE`.
The following table lists the most important options to pass to CMake.

Assemble your CMake command and run it to configure preCICE.

This example builds the release version of preCICE with the PETSc mapping and the user-defined python actions off, which will be installed in the prefix `~/software/precice`.

```bash
cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=~/software/precice -DPRECICE_FEATURE_PETSC_MAPPING=OFF -DPRECICE_FEATURE_PYTHON_ACTIONS=OFF ..
```

Option | Type | Default | Description
--- | --- | --- | ---
[`BUILD_SHARED_LIBS`](https://cmake.org/cmake/help/v3.10/variable/BUILD_SHARED_LIBS.html?highlight=build_shared_libs) | Boolean | ON | Build as a shared library.
[`CMAKE_BUILD_TYPE`](https://cmake.org/cmake/help/v3.10/variable/CMAKE_BUILD_TYPE.html) | String | `Debug` | Choose Debug, Release, or RelWithDebInfo.
[`CMAKE_INSTALL_PREFIX`](https://cmake.org/cmake/help/v3.10/variable/CMAKE_INSTALL_PREFIX.html) | Path | `/usr/local` | The prefix used in the installation step.
`PRECICE_FEATURE_MPI_COMMUNICATION` | Boolean | ON | Build with MPI.
[`MPI_CXX_COMPILER`](https://cmake.org/cmake/help/v3.10/module/FindMPI.html#variables-for-locating-mpi) | Path | | MPI compiler wrapper to use for detection.
`PRECICE_FEATURE_PETSC_MAPPING` | Boolean | ON | Build with PETSc (for MPI-parallel RBF mapping), requires `PRECICE_FEATURE_MPI_COMMUNICATION=ON`.
`PRECICE_FEATURE_PYTHON_ACTIONS` | Boolean | ON | Build support for python actions.
`PYTHON_EXECUTABLE` | Path | | Path to the python interpreter to use.
[`BUILD_TESTING`](https://cmake.org/cmake/help/v3.10/module/CTest.html#module:CTest) | Boolean | ON | Build and register the tests.
`PRECICE_RELEASE_WITH_ASSERTIONS` | Boolean | OFF | Enables assertions in release builds.
`PRECICE_RELEASE_WITH_DEBUG_LOG` | Boolean | OFF | Enables debug logging in release builds.
`PRECICE_RELEASE_WITH_TRACE_LOG` | Boolean | OFF | Enables trace logging in release builds.
`PRECICE_InstallTest` | Boolean | OFF | Install `testprecice` and test configuration files.
`PRECICE_CONFIGURE_PACKAGE_GENERATION` | Boolean | ON | Enable package configuration.
`PRECICE_BINDINGS_C` | Boolean | ON | Enable the native C bindings.
`PRECICE_BINDINGS_FORTRAN` | Boolean | ON | Enable the native Fortran bindings.
`PRECICE_ALWAYS_VALIDATE_LIBS` | Boolean | OFF | Force CMake to always validate required libraries.
`PRECICE_TEST_TIMEOUT_LONG` | Integer | 180 | Timeout for big test suites
`PRECICE_TEST_TIMEOUT_SHORT` | Integer | 20 | Timeout for small test suites
`PRECICE_CTEST_MPI_FLAGS` | String | | Additional flags to pass to `mpiexec` when running the tests.
`CMAKE_INTERPROCEDURAL_OPTIMIZATION` | Boolean | OFF | Enable interprocedural/link-time optimization

{% version 2.4.0 %}
Version 2.4.0 introduces the CMake options `PRECICE_RELEASE_WITH_ASSERTIONS`, `..._DEBUG_LOG`, `..._TRACE_LOG`, which allow release builds with extended debugging functionality.
{% endversion %}

## The next step

preCICE is now configured and the build system has been generated.
The next step covers how to [build preCICE](installation-source-building).
