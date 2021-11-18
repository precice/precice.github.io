---
title: Notes on CMake
permalink: installation-source-cmake.html
keywords: configuration, basics, cmake, installation, building, source
---

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
* Use `-DBUILD_SHARED_LIBS=ON` to build shared libraries, `-DBUILD_SHARED_LIBS=OFF` to build static libraries. In preCICE, we default to `ON` since v2.3.
* To use `ccache`or `distcc`with cmake please set the variable [CXX_COMPILER_LAUNCHER](https://cmake.org/cmake/help/latest/prop_tgt/LANG_COMPILER_LAUNCHER.html#prop_tgt:%3CLANG%3E_COMPILER_LAUNCHER).
* Use `-DCMAKE_INSTALL_PREFIX=/path/to/dir/` to specify the install prefix. Default is `/usr/local` on unix. [Read more](https://cmake.org/cmake/help/latest/variable/CMAKE_INSTALL_PREFIX.html)
