---
title: Building from source
permalink: installation-getting-source.html
keywords: configuration, basics, cmake, installation, building, source
summary: "Usually the first paragraph of the page. If not create one or simple leave the field blank"
---

## Main steps

1. Install the required [dependencies](Dependencies) and make sure you are using a recent CMake version.
   CMake versions can easily be added via the binaries [here](https://cmake.org/download/).

2. Download and unpack the _source code_ of the [latest release](https://github.com/precice/precice/releases/latest) of preCICE (replace `x.y.z` with the actual version):
   ```sh
   wget https://github.com/precice/precice/archive/vx.y.z.tar.gz
   tar -xzvf vx.y.z.tar.gz
   cd precice-x.y.z
   ```
3. Use CMake to configure and build preCICE.
   See [CMake Options](#options) for a list of common options to use and [Troubleshooting](#troubleshooting) in case of any issues. We strongly recommend to build preCICE as a shared library. Note that the default prefix is `/usr/local` and you may want to change that.

   ```sh
   mkdir build && cd build
   cmake -DBUILD_SHARED_LIBS=ON ..
   make -j $(nproc)
   ```

4. To test preCICE, run `ctest`
   This executes the base test set.
   To enable log output of the tests use `ctest -VV` or `ctest --output-on-failure`.
   To change the log level of the output, set the environment variable `export BOOST_TEST_LOG_LEVEL=all|test_suite|warning`

5. To install preCICE on your system, there are two ways: build a binary package to install with your package manager, or run `make install`. We recommend the first one.
   - Recommended: [build a binary package](#debian-packages).
   - Advanced: `make install` will install preCICE to your prefix.
   You may have to add `<prefix>/lib/pkconfig` to your `PKG_CONFIG_PATH` in order for pkgconfig to be able to locate it.
   You can run `make uninstall` to remove the files. However, this may not always work as expected. Keep track of the files that preCICE installs and remove them before an upgrade.

6. To use preCICE in your project, see the page [Linking to preCICE](Linking-to-preCICE).

## Options

The following options are important for configuring preCICE using CMake.
To set a variable, please pass it to CMake as follows:
```
$ cmake -DBUILD_SHARED_LIBS=ON -DPRECICE_MPICommunication=ON ..
```

We strongly recommend to build preCICE as a shared library!

Option               | Type    | Default            | Description
---                  | ---     | ---                | ---
BUILD_SHARED_LIBS    | Boolean | OFF                | Build as a shared library.
[CMAKE_BUILD_TYPE](https://cmake.org/cmake/help/v3.10/variable/CMAKE_BUILD_TYPE.html)     | String  | `Debug`            | Choose Debug, Release, or RelWithDebInfo.
[CMAKE_INSTALL_PREFIX](https://cmake.org/cmake/help/v3.10/variable/CMAKE_INSTALL_PREFIX.html) | Path    | `/usr/local`       | The prefix used in the installation step.
PRECICE_MPICommunication | Boolean | ON             | Build with MPI.
[MPI_CXX_COMPILER](https://cmake.org/cmake/help/v3.10/module/FindMPI.html#variables-for-locating-mpi)   | Path    |  | MPI compiler wrapper to use for detection.
PYTHON_EXECUTABLE    | Path    |                    | Path to the python interpreter to use.
PRECICE_PETScMapping | Boolean | ON                 | Build with PETSc (for MPI-parallel RBF mapping), requires PRECICE_MPICommunication=ON.
PRECICE_PythonActions | Boolean | ON                | Build support for python actions.
PRECICE_Packages     | Boolean | ON                 | Enable package configuration.
PRECICE_InstallTest  | Boolean | OFF                | Install `testprecice` and test configuration files.
PRECICE_ENABLE_C     | Boolean | ON                 | Enable the native C bindings.
PRECICE_ENABLE_FORTRAN | Boolean | ON                 | Enable the native Fortran bindings.
PRECICE_ALWAYS_VALIDATE_LIBS | Boolean | OFF | Force CMake to always validate required libraries.
PRECICE_TEST_TIMEOUT_LONG | Integer | 180 | Timeout for big test suites
PRECICE_TEST_TIMEOUT_SHORT | Integer | 20 | Timout for small test suites
PRECICE_CTEST_MPI_FLAGS | String |  | Additional flags to pass to `mpiexec` when running the tests.

## Disabling Native Bindings

The library provides native bindings for C and Fortran.
They are called native as they are compiled into the resulting library.
If you know what you are doing, you can disable them by specifying `-DPRECICE_ENABLE_C=OFF`, or `-DPRECICE_ENABLE_FORTRAN=OFF`.

**We highly discourage you to do this, as the resulting binaries will not be compatible with some adapters!**


## Running Tests

When building from source, you can run `make test_install` to check your installation. This will attempt to build the cpp solverdummy using the **installed** library. (This requires you to run `make install` first.)

To testing the Installation you can run ....
When building from source, you can run `make test_install` to check your installation. This will attempt to build the cpp solverdummy using the **installed** library. (This requires you to run `make install` first.)


## Debian packages

_Prefer to use the [provided packages](https://github.com/precice/precice/releases) attached to our releases._

To generate Debian packages, make sure to set the following variables:
```
$ cmake -DCMAKE_INSTALL_PREFIX=/usr -DBUILD_SHARED_LIBS=ON -DCMAKE_BUILD_TYPE=Release ..
$ make -j $(nproc) package
```

The directory should now contain a `.deb` package and the corresponding checksum file.
You can install this using your package manager (to be able to remove properly): `sudo apt install libprecicex.y.z.deb`

In case you want to remove, use your package manager: `sudo apt purge libprecicex.y.z` (replace `x.y.z` with your version)

## Static library

To build preCICE as a static library, you can set `-DBUILD_SHARED_LIBS=OFF` or simply omit the option.

__This is not recommended or supported by the preCICE developers!__ You may [contribute here](https://github.com/precice/precice/pull/343)

## Troubleshooting

### Finding Boost

* Boost versions prior to 1.70.0 use the [`FindBoost` module](https://cmake.org/cmake/help/latest/module/FindBoost.html). For custom install prefixes, simply set the `BOOST_ROOT=/path/to/prefix` CMake option or environment variable.
* Boost version 1.70.0 and later ship with their own config module, which you can find in `<prefix>/lib/cmake/Boost-x.xx.x/`. To detect it in custom prefixes, set the `Boost_DIR=<prefix>/lib/cmake/Boost-x.xx.x/`. Have a look at `<prefix>/lib/cmake/Boost-x.xx.x/BoostConfig.cmake` for additional options.

### Finding Python and NumPy

The NumPy detection is directly connected to the detected python interpreter.
The easiest solution to force CMake to use a python installation is to set the CMake Variable `PYTHON_EXECUTABLE` when configuring preCICE for the first time.
This is also the method of choice when using a [virtual environment](https://docs.python.org/3/library/venv.html#venv-def) or `pyenv`.

Example:
```
cmake -DPRECICE_PythonActions=ON -DPYTHON_EXECUTABLE=/usr/bin/python3.8 .
```

### PETSc could not be found

Note: PETSc is an optional dependency, only needed for parallel RBF mapping, which you can switch off. Since preCICE v2.1.0, single-node-parallel RBF mapping is also possible without PETSc.

There are multiple problems than can lead to FindPETSc failing:

1) `PETSC_DIR`and `PETSC_ARCH` not set, or set incorrectly.  
   In this case, FindPETSc fails **before** running tests.
2) _Pre 1.5.0:_ Compiler CXX not set to the compiler wrapper provided by your MPI distribution.  
   In this case, FindPETSc fails **after** running tests.

#### Tests fail

The end of your log output looks like this:
```
-- petsc_lib_dir /.../.../.../petsc/arch-linux2-c-debug/lib
-- Recognized PETSc install with single library for all packages
-- Performing Test MULTIPASS_TEST_1_petsc_works_minimal
-- Performing Test MULTIPASS_TEST_1_petsc_works_minimal - Failed
-- Performing Test MULTIPASS_TEST_2_petsc_works_allincludes
-- Performing Test MULTIPASS_TEST_2_petsc_works_allincludes - Failed
-- Performing Test MULTIPASS_TEST_3_petsc_works_alllibraries
-- Performing Test MULTIPASS_TEST_3_petsc_works_alllibraries - Failed
-- Performing Test MULTIPASS_TEST_4_petsc_works_all
-- Performing Test MULTIPASS_TEST_4_petsc_works_all - Failed
-- PETSc could not be used, maybe the install is broken.
CMake Error at /.../.../.../.../cmake/share/cmake-3.10/Modules/FindPackageHandleStandardArgs.cmake:137 (message):
  PETSc could not be found.  Be sure to set PETSC_DIR and PETSC_ARCH.
  (missing: PETSC_EXECUTABLE_RUNS) (found suitable version "3.10.2", minimum
  required is "3.12")
Call Stack (most recent call first):
  /.../.../.../.../cmake/share/cmake-3.10/Modules/FindPackageHandleStandardArgs.cmake:378 (_FPHSA_FAILURE_MESSAGE)
  tools/cmake-modules/FindPETSc.cmake:343 (find_package_handle_standard_args)
  CMakeLists.txt:60 (find_package)

-- Configuring incomplete, errors occurred!
See also "/.../.../CMakeFiles/CMakeOutput.log".
See also "/.../.../CMakeFiles/CMakeError.log".
```

In this case the library, includes, etc. were found, however, the tests do not compile.
Check that the compiler is set to the compiler wrapper provided by your MPI distribution (e.g. with `CXX=mpicxx cmake [options]`). You may need to delete and recreate the `build` directory.
For further information check the log file `./CMakeFiles/CMakeError.log` for the error thrown by the compiler invocation.

This is fixed in preCICE v1.5.0. Please let us know if you still get this error.

#### No tests run

The end of your log output looks like this:
```
CMake Error at /.../.../.../.../cmake/share/cmake-3.10/Modules/FindPackageHandleStandardArgs.cmake:137 (message):
  PETSc could not be found.  Be sure to set PETSC_DIR and PETSC_ARCH.
  (missing: PETSC_INCLUDES PETSC_LIBRARIES PETSC_EXECUTABLE_RUNS) (Required
  is at least version "3.12")
Call Stack (most recent call first):
  /.../.../.../.../cmake/share/cmake-3.10/Modules/FindPackageHandleStandardArgs.cmake:378 (_FPHSA_FAILURE_MESSAGE)
  tools/cmake-modules/FindPETSc.cmake:343 (find_package_handle_standard_args)
  CMakeLists.txt:60 (find_package)


-- Configuring incomplete, errors occurred!
See also "/.../.../CMakeFiles/CMakeOutput.log".
See also "/.../.../CMakeFiles/CMakeError.log".
```

In this case, the FindPETSc module cannot locate PETSc.
* Check the values of `PETSC_DIR` and `PETSC_ARCH`.
* Make sure `ls $PETSC_DIR/$PETSC_ARCH/include` does not result in an error.

### Overrides for Dependencies

#### BOOST
* `BOOST_ROOT` as described in the [CMake documentation](https://cmake.org/cmake/help/v3.10/module/FindBoost.html)

#### Eigen3
* `EIGEN3_INCLUDE_DIR` being the root of the repository.

#### LibXML2
* `LIBXML2_LIBRARIES` and `LIBXML2_INCLUDE_DIRS`

#### JSON
* `JSON_INCLUDE_DIR` this expects the scoped include to work `#include <nlohmann/json.hpp`

#### Prettyprint
* `PRETTYPRINT_INCLUDE_DIR` this expects the scoped include to work `#include <prettyprint/prettyprint.hpp`

#### PETSc
* Environment variables `PETSC_DIR` and `PETSC_ARCH`.

#### Python
* `PYTHON_LIBRARY`, `PYTHON_INCLUDE_DIR`, `NumPy_INCLUDE_DIR` (the two latter are often identical)

#### MPI - Build preCICE using non-default MPI implementation
* Set `CXX` to the compiler wrapper if you want to be sure that the right installation is picked.

For using a non-default MPI implementation one can steer the [CMake MPI discovery](https://cmake.org/cmake/help/v3.10/module/FindMPI.html#variables-for-locating-mpi) by setting the variable `MPI_CXX_COMPILER` to the path to the `mpicxx` compiler wrapper shipped with your MPI distribution of choice.

Example - building with MPICH:
```
$ cmake -DBUILD_SHARED_LIBS=ON -DPRECICE_MPICommunication=ON -DMPI_CXX_COMPILER=/usr/bin/mpicxx.mpich ..
```


## General information on CMake

* CMake is a tool for build system configuration.  
  It generates a chosen build system in the directory it was executed in.
  The build system to generate can be specified using the `-G` flag which defaults to `Makefile`.
  A list of all supported generators (e.g. for IDEs) can be found [here](https://cmake.org/cmake/help/latest/manual/cmake-generators.7.html#cmake-generators).
* Use the console tool `ccmake` or the gui `cmake-gui`for a more comfortable configuration.
* The generated build system automatically reconfigures cmake when necessary.
* It respects your environment variables `CXX`, `CXX_FLAGS`, ... during configuration.  
  Please use them to set your compiler and warning level of choice.
* Invoke `cmake` with `-DVariable=Value` to set the cmake-internal variable `Variable` to `Value`.  
  A complete list of variables recognised by cmake can be found [here](https://cmake.org/cmake/help/latest/manual/cmake-variables.7.html#cmake-variables-7).
* Use `-DCMAKE_BUILD_TYPE` to specify what type of build you would like `Debug, Release, RelWithDebInfo, MinSizeRel`  
  CMake will select appropriate flag for you (e.g. `-g`, `-O2`).
  Specifying no `BUILD_TYPE` results in an un-optimised non-debug build.
* The generated build system _knows_ where the source directory is.
  It is thus possible to have multiple configurations using the same (e.g. `build/debug/`, `build/release/`)
* Use `-DBUILD_SHARED_LIBS=ON` to build shared libraries.
* To use `ccache`or `distcc`with cmake please set the variable [CXX_COMPILER_LAUNCHER](https://cmake.org/cmake/help/latest/prop_tgt/LANG_COMPILER_LAUNCHER.html#prop_tgt:%3CLANG%3E_COMPILER_LAUNCHER).
* Use `-DCMAKE_INSTALL_PREFIX=/path/to/dir/` to specify the install prefix. Default is `/usr/local` on unix. [Read more](https://cmake.org/cmake/help/latest/variable/CMAKE_INSTALL_PREFIX.html)
