---
title: Building from source - Advanced
permalink: installation-source-advanced.html
keywords: configuration, basics, cmake, installation, building, source
---

## Debian packages

{% note %}
You may prefer to directly use the [provided packages](https://github.com/precice/precice/releases) attached to our releases.
{% endnote %}

To generate Debian packages, make sure to set the following variables:

```bash
cmake -DCMAKE_INSTALL_PREFIX=/usr -DCMAKE_BUILD_TYPE=Release ..
make -j $(nproc) package
```

The directory should now contain a `.deb` package and the corresponding checksum file.
You can install this using your package manager (to be able to remove properly): `sudo apt install ./libprecice{{ site.precice_version }}.deb`

In case you want to remove this package, use your package manager: `sudo apt purge libprecice{{ site.precice_version }}`.

## Static library

To build preCICE as a static library, you can set `-DBUILD_SHARED_LIBS=OFF`.

**This is not recommended or supported by the preCICE developers!** You may [contribute here](https://github.com/precice/precice/pull/343) (better support is [coming soon](https://github.com/precice/precice/pull/973)).

## Disabling native bindings

The library provides native bindings for C and Fortran.
They are called native as they are compiled into the resulting library.
If you know what you are doing, you can disable them by specifying `-DPRECICE_ENABLE_C=OFF`, or `-DPRECICE_ENABLE_FORTRAN=OFF`.

**We highly discourage you to do this, as the resulting binaries will not be compatible with C or Fortran adapters!**

## Overriding dependencies

### BOOST

* `BOOST_ROOT` as described in the [CMake documentation](https://cmake.org/cmake/help/v3.10/module/FindBoost.html)

### Eigen3

* `EIGEN3_INCLUDE_DIR` being the root of the repository.

### LibXML2

* `LIBXML2_LIBRARIES` and `LIBXML2_INCLUDE_DIRS`

### JSON

* `JSON_INCLUDE_DIR` this expects the scoped include to work `#include <nlohmann/json.hpp`

### Prettyprint

* `PRETTYPRINT_INCLUDE_DIR` this expects the scoped include to work `#include <prettyprint/prettyprint.hpp`

### PETSc

* Environment variables `PETSC_DIR` and `PETSC_ARCH`.

### Python

* `PYTHON_LIBRARY`, `PYTHON_INCLUDE_DIR`, `NumPy_INCLUDE_DIR` (the two latter are often identical)

### MPI - Build preCICE using non-default MPI implementation

* Set `CXX` to the compiler wrapper if you want to be sure that the right installation is picked.

For using a non-default MPI implementation one can steer the [CMake MPI discovery](https://cmake.org/cmake/help/v3.10/module/FindMPI.html#variables-for-locating-mpi) by setting the variable `MPI_CXX_COMPILER` to the path to the `mpicxx` compiler wrapper shipped with your MPI distribution of choice.

Example - building with MPICH:

```bash
cmake -DPRECICE_MPICommunication=ON -DMPI_CXX_COMPILER=/usr/bin/mpicxx.mpich ..
```
