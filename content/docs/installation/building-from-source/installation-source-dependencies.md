---
title: Building from source - Dependencies
permalink: installation-source-dependencies.html
keywords: configuration, basics, installation, building
summary: 'This page describes the dependencies used by preCICE, how to install them on various systems and how to build them.'
---

## How to use this page?

Start by checking if there is a [guide for your system](#system-guides). It will include all required steps to get preCICE ready to build.

If there is no guide for your system, find out if there are suitable system packages for the dependencies.
Then use the [dependencies](#dependencies) section to install all missing dependencies from source.

After all dependencies are ready to use, proceed with [configuring the preCICE build](installation-source-configuration).

## Overview

The following is an overview of the required dependencies of preCICE.
Note that we always strive to be forwards-compatible.
If you find a problem with preCICE and a latest versions of these dependencies, please let us know.

### Required dependencies

| Dependency | Version required | Availability |
| --- | --- | --- |
| [C++ compiler](#c-compiler) | C++17 | [C++17 compiler support](https://cppreference.com/w/cpp/compiler_support/17.html) |
| [CMake](#cmake) | >= 3.22.1 | [![Repology - CMake](https://img.shields.io/repology/repositories/cmake)](https://repology.org/project/cmake/versions) |
| [Eigen](#eigen) | >= 3.4.0 | [![Repology - Eigen](https://img.shields.io/repology/repositories/eigen)](https://repology.org/project/eigen/versions) |
| [Boost](#boost) | >= 1.74.0 | [![Repology - Boost](https://img.shields.io/repology/repositories/boost)](https://repology.org/project/boost/versions) |
| [libxml2](#libxml2) | >= 2 | [![Repology - libxml2](https://img.shields.io/repology/repositories/libxml2)](https://repology.org/project/libxml2/versions) |

Note that more recent versions of some dependencies (e.g., Boost) might also need more recent or upcoming releases of preCICE.

### Optional dependencies

| Dependency | Required for | Version required | Availability |
| --- | --- | --- | --- |
| [MPI](#mpi) | [Communication over MPI](configuration-communication.html) | implementation of MPI-3 | Various [implementations](https://en.wikipedia.org/wiki/Message_Passing_Interface#Official_implementations) |
| [PETSc](#petsc) | [Some RBF mappings](configuration-mapping.html#execution-backends) | >= 3.15 | [![Repology - PETSc](https://img.shields.io/repology/repositories/petsc)](https://repology.org/project/petsc/versions) |
| [Ginkgo](#ginkgo) | [Some RBF mappings](configuration-mapping.html#execution-backends) | >= 1.8, with Kokkos >= 4.1 | [![Repology - Ginkgo](https://img.shields.io/repology/repositories/ginkgo-linear-algebra)](https://repology.org/project/ginkgo-linear-algebra/versions) |
| [Python](#python) | [Python Action interface](configuration-action.html#python-callback-interface) | >= 3 | [![Repology - Python](https://img.shields.io/repology/repositories/python)](https://repology.org/project/python/versions) |

{% tip %}
This documentation concerns preCICE v{{ site.precice_version }}.
Read about [previous versions](fundamentals-previous-versions.html) or [how to upgrade](http://127.0.0.1:4000/couple-your-code-porting-overview.html).
{% endtip %}

## Dependencies

This section lists all dependencies alongside required versions and steps on how to install them from source.
Meaning, installing dependencies based on the steps in this section should be the _last resort_ for normal users.
Prefer to follow the [system guides](#system-guides) and only install custom versions if you have a reason to do so.

### C++ compiler

preCICE requires a [C++ compiler with full C++17 support](https://cppreference.com/w/cpp/compiler_support/17.html).
The following table lists the minimal requirement for compiler versions:

| Toolchain | Version | Notes                     |
| ---       | ---     | ---                       |
| GCC       | min 7   |                           |
| Intel     | all     | Classic: v19, OneAPI: all |
| Clang     | min 14  |                           |

If you are using Debian/Ubuntu, the `build-essential` package will install everything needed.

When compiling with MPI enabled (the default) and using your MPI compiler wrapper as compiler, then it needs to use a suitable compiler.
For example, check if the `mpicxx --version` reports a compatible compiler version.
Check the section on [MPI](#mpi) for more information.j

### CMake

preCICE requires the build system CMake at a minimal version of `3.22.1` (CMake 4 also works).
You can check your CMake version using `cmake --version`.

Depending on the versions of CMake and Boost, CMake may not find all libraries in boost and display warnings when configuring preCICE.
This can be safely ignored, and can be [fixed by upgrading CMake](https://stackoverflow.com/a/42124857/5158031).

History of required version:

| preCICE | CMake      |
| ---     | ---        |
| 1.4.0   | min 3.10.2 |
| 2.4.0   | min 3.16.3 |
| 3.2.0   | min 3.22.1 |
| 3.3.0   | as above   |

#### Download CMake binaries

Download the [official binaries](https://cmake.org/download/#latest) for your platform and extract them into a folder.
Then extend the path environment variable by executing the following:

```bash
export PATH="$PATH:/path/to/extracted/location/version/bin"
cmake --version
```

This should now display the version of the downloaded release.
If the version is correct, you can make this change persistent by appending the above export statement to your `.bashrc`.

### Eigen

preCICE uses [Eigen](http://eigen.tuxfamily.org/) for linear algebra computations and for a version of [global RBF mappings](configuration-mapping.html#execution-backends) which does not require PETSc.

History of required version:

| preCICE | Eigen     |
| ---     | ---       |
| older   | min 3.2.0 |
| 1.5.0   | min 3.3.7 |
| 3.3.0   | min 3.4.0 |

#### Download the Eigen headers

Eigen is a header-only library, i.e. it is compiled into preCICE and does not require linkage.
Download the sources from their [latest compatible release](https://gitlab.com/libeigen/eigen/-/releases/) and extract them to some location.
The folder of your choice should now contain a folder called `eigen-x.y.z` for version `x.y.z`.
Set the environment variable `Eigen3_ROOT` to the `eigen-x.y.z` folder by adding this to your `~.bashrc`.

```bash
export Eigen3_ROOT=/path/to/eigen/eigen-x.y.z
```

### Boost

preCICE uses [Boost](http://www.boost.org/) for several features.
The minimum required version is 1.74.0, but newer Boost versions are not always compatible to previous ones.

You might save some time and space by installing only the necessary libraries:

* `boost_log`
* `boost_log_setup`
* `boost_thread`
* `boost_system`
* `boost_filesystem`
* `boost_program_options`
* `boost_unit_test_framework`

These libraries may also depend on other Boost libraries. Make sure that these get installed, too.

The following header-only Boost libraries are also needed: `asio`, `vmd`, `geometry`, `signals2`, `container`, `ranges`.

History of required versions:

| preCICE | Boost required | Boost incompatible |
| ---     | ---            | ---                |
| older   | 1.60.0         | 1.72.0             |
| 1.4.0   | 1.65.1         | as above           |
| 2.0.2   | as above       | as above           |
| 2.1.1   | as above       | 1.74.0             |
| 2.3.0   | as above       | 1.78.0             |
| 2.4.0   | 1.71.0         | as above           |
| 3.1.2   | as above       | 1.86.0             |
| 3.2.0   | 1.74.0         | 1.89.0             |
| 3.3.0   | 1.74.0         | none known yet     |

For help, see also the ranges set in the [Spack recipe](https://github.com/spack/spack-packages/blob/develop/repos/spack_repo/builtin/packages/precice/package.py).

#### Build boost from source

1. [Download](http://www.boost.org/users/download/) and extract Boost into any directory. Switch to that directory.
2. Prepare the installation, selecting only the libraries that need to be built (this does not affect the header-only libraries).
   Select a prefix to install Boost to. This will later contain the directories `include` and `lib`.
   On systems using modules, we recommend to specify the toolset manually by additionally passing `--with-toolset=gcc` (or `intel`).

   Now run with the prefix of your choice:

   ```bash
   ./bootstrap.sh --with-libraries=log,thread,system,filesystem,program_options,test --prefix=<prefix>
   ```

3. Build and install the libraries. Depending on your choice, you may need root access.

   ```bash
   ./b2 install      # user has write access to the prefix
   sudo ./b2 install # user does not have sufficient permissions
   ```

   The directory you chose as prefix now contains libraries in `<prefix>/lib` and the all the Boost headers in `<prefix>/include`.
   You may now safely remove the boost directory from step 1.

4. If you selected `/usr/local` as prefix, you probably do not have to do anything else (depends on your system). If you used a custom `<prefix>`, you have to add the following line to your `.bashrc`:

   ```bash
   export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:<prefix>/lib/cmake/Boost-1.87.0
   ```

   The path points to the file `BoostConfig.cmake` which is required by CMake. If this path does not exist, you can also run `locate BoostConfig.cmake` to determine the path to the file.

For more information, please refer to the "[Getting Started](http://www.boost.org/doc/libs/release/more/getting_started/unix-variants.html#easy-build-and-install)" instructions of Boost.

### libxml2

preCICE uses [libxml2](http://www.xmlsoft.org/) for parsing the configuration file.

{% tip %}
libxml2 is available on close to any system you can imagine.  
Double check if there are any system packages before attempting to build this dependency from source.
{% endtip %}

#### Install libxml2 from source

1. Download the [latest release](https://gitlab.gnome.org/GNOME/libxml2/-/tags) of libxml.
2. Extract the sources to a location of your choice.
3. Choose a directory to install the library to and use it as `<prefix>`.
4. Build and install the library

   ```bash
   ./autogen --prefix=<prefix>
   make
   make install
   ```

5. If you did not select `/usr/local` as prefix, you need to make the installation visible to the linker and compiler.
  Add the following to your `~/.bashrc` replacing prefix with the chosen directory:

  ```bash
  export LIBRARY_PATH="<prefix>/lib:$LIBRARY_PATH"
  export LD_LIBRARY_PATH="<prefix>/lib:$LD_LIBRARY_PATH"
  export CPLUS_INCLUDE_PATH="<prefix>/include:$CPLUS_INCLUDE_PATH"
  export PKG_CONFIG_PATH="<prefix>/lib/pkgconfig:$PKG_CONFIG_PATH"
  ```

### PETSc

preCICE optionally uses [PETSc](https://petsc.org/) (at least 3.15) for some  [global RBF mappings](configuration-mapping.html#execution-backends) and is highly recommended for large cases. For small/medium-size cases, preCICE can still do a global RBF mapping in parallel without PETSc. If you don't need this feature, you may specify `-DPRECICE_FEATURE_PETSC_MAPPING=off` when building preCICE.

History of required versions:

| preCICE | PETSc required             | PETSc incompatible |
| ---     | ---                        | ---                |
| older   | 3.6.0 (with 64bit indices) | 3.12.0             |
| 2.1.0   | 3.12.0                     | none known yet     |
| 3.2.0   | 3.15.0                     | as above           |
| 3.3.0   | as above                   | as above           |

#### Build PETSc from source

If you prefer to install the most recent version from source, do the following:

1. [Download it](https://petsc.org/release/download) or get the repository using `git clone -b release https://gitlab.com/petsc/petsc.git petsc`
2. Change into that directory and compile with or without debugging: `./configure --with-debugging=0` (disable debugging for optimal performance)
3. Use the `make` command as the configure script proposes, e.g.
  `make PETSC_DIR=/path/to/petsc PETSC_ARCH=arch-linux-c-opt all`
  Further documentation see the [PETSc installation documentation](https://petsc.org/release/install/).
4. Usage: You will need to add PETSc to your dynamic linker search path (`LD_LIBRARY_PATH` on Linux or `DYLD_LIBRARY_PATH` on macOS). You may also need to set the `$PETSC_ARCH`.

Finally, in some cases you may need to have PETSc in your `CPATH`, `LIBRARY_PATH`, or `PYTHONPATH`. Here is an example:

   ```bash
   export PETSC_DIR="/path/to/petsc"
   export PETSC_ARCH="arch-linux-c-opt"
   export LD_LIBRARY_PATH="$PETSC_DIR/$PETSC_ARCH/lib:$LD_LIBRARY_PATH"
   ```

### Python

preCICE optionally uses [Python](https://www.python.org/) for the [Python action interface](configuration-action.html#python-callback-interface) (only used for rare applications). If you don't need this feature, you may specify `-DPRECICE_FEATURE_PYTHON_ACTIONS=off`.
In particular, you don't need to build with Python if you only want to use the [preCICE Python bindings](installation-bindings-python.html).

You probably already have Python installed. However, in order to use the Python action interface, you also need to install NumPy and the header files for Python and NumPy.

History of required versions:

| preCICE | Python required            | Python incompatible | NumPy required | NumPy incompatible |
| ---     | ---                        | ---                 | ---            | ---                |
| older   | 2.7                        | 2.8                 | not defined    | 1.17               |
| 2.0.0   | 3                          | None known yet      | 1.17           | None known yet     |
| 3.3.0   | same as above              | same as above       | same as above  | same as above      |

### MPI

preCICE optionally requires an implementation of the MPI-3 specification for [communication](configuration-communication.html), which is [provided by all major vendors](https://en.wikipedia.org/wiki/Message_Passing_Interface#Official_implementations) including OpenMPI, MPICH, and Intel MPI.

You can build preCICE without MPI in case of compatibility issues with a certain solver (e.g. a closed source solver with a binary-distributed MPI version, or when running on Windows). To do so, use `-DPRECICE_FEATURE_MPI_COMMUNICATION=OFF`. In such a case, you can still use TCP/IP sockets for inter- and intra-participant communication, instead. This might, however, result in lower performance and is, therefore, not recommended if not necessary.

Keep in mind that, if you already installed [PETSc](installation-source-dependencies.html#petsc), MPI must also already be installed.

{% important %}
Make sure that PETSc, preCICE, and your solvers are all compiled with the same MPI version!
{% endimportant %}

### Ginkgo

preCICE optionally uses [Ginkgo](https://ginkgo-project.github.io/) for GPU- and OpenMP-accelerated [global radial-basis function mappings](configuration-mapping.html#execution-backends). To enable the feature in preCICE, use the CMake option `-DPRECICE_FEATURE_GINKGO_MAPPING=ON`. Using this feature in preCICE requires additionally [Kokkos](https://kokkos.org/).

Both packages follow the usual CMake build instructions and can be downloaded on the GitHub release page for [Ginkgo](https://github.com/ginkgo-project/ginkgo/releases) and [Kokkos](https://github.com/kokkos/kokkos/releases).
For Kokkos, system packages might be available through your package manager as well.

History of required versions:

| preCICE | Ginkgo required | Kokkos required |
| ---     | ---             | ---             |
| 3.2.0   | 1.8.0           | 4.1.0           |
| 3.3.0   | same as above   | same as above   |

## System guides

If you want build preCICE on your own computer and you are using one of the following Linux distributions, we provide a summary here to quickly install everything you need. If everything works, you may ignore the rest of this page.
Contributions to this section are particularly welcome (click "Edit me").

Other modern versions of popular Linux distributions are also perfectly compatible, here we just list a few popular options. Since our users have tried preCICE on various distributions, you may as well ask on our [forum](https://precice.discourse.group/) for any questions.

### Ubuntu

With every release, we also ship [binary packages for Ubuntu](https://github.com/precice/precice/releases). However, if you still want to build from source, everything is available through the distribution's repositories:

```bash
sudo apt update && \
sudo apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev petsc-dev python3-dev python3-numpy
```

These instructions are known to work for Ubuntu 22.04, 24.04, and they should apply to later releases as well ([release history](https://endoflife.date/ubuntu)).
See also the [Ubuntu Dockerfile used in the preCICE tests](https://github.com/precice/ci-images/blob/master/ci-ubuntu-2404.dockerfile).

### Debian

With every release, we also ship [binary packages for Debian](https://github.com/precice/precice/releases). However, if you still want to build from source, everything is available through the distribution's repositories:

```bash
su
apt update && \
apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev petsc-dev python3-dev python3-numpy
```

These instructions are known to work with Debian 10, and should apply to later releases as well ([release history](https://endoflife.date/debian)).

### Fedora

In Fedora, everything is available through the distribution's repositories:

```bash
sudo dnf update
sudo dnf install gcc-c++ cmake libxml2-devel boost-devel openmpi-devel petsc-openmpi-devel eigen3-devel python3-devel
```

Afterwards, start a new terminal, to make MPI discoverable (read more about [MPI on Fedora](https://docs.fedoraproject.org/en-US/neurofedora/mpi/)). Before configuring & building preCICE, load MPI using the module:

```bash
module load mpi/openmpi-x86_64
```

{% note %}
In case `module` is not available, you may need to log out and in again first.
If you use the docker image of fedora, you need to install the support for environment modules: `sudo dnf install environment-modules`
{% endnote %}

These instructions are known to work with Fedora 43, and should apply to later releases as well ([release history](https://endoflife.date/fedora)).
See also the [Fedora Dockerfile used in the preCICE tests](https://github.com/precice/ci-images/blob/master/ci-fedora.dockerfile).

### Rocky Linux

Rocky Linux very closely follows the conventions previously set by CentOS. We first need to install common development tools, enable the [CRB repository](https://wiki.rockylinux.org/rocky/repo/) (only for Eigen), install the dependencies, load the MPI module, and continue with building preCICE.

1. First,  install the [Development Tools](https://serverfault.com/questions/814671/centos-how-do-i-check-if-development-tools-is-installed) group (compilers, Git, make, pkg-config, ...):

   ```bash
   sudo dnf update
   sudo dnf install dnf-plugins-core
   sudo dnf groupinstall "Development Tools"
   ```

2. Then, enable the CRB repostitory to install Eigen3, and the install the rest of the available preCICE dependencies:

   ```bash
   sudo dnf config-manager --set-enabled crb
   sudo dnf install eigen3-devel
   sudo dnf install cmake libxml2-devel boost-devel openmpi-devel python3-devel
   ```

3. Before configuring & building preCICE, load MPI (you may need to log out and in again, if `module` is not found):

   ```bash
   module load mpi/openmpi-x86_64
   ```

4. Unfortunately, [PETSc does not seem to be available in this distribution.](https://pkgs.org/search/?q=petsc), so we need to switch that off later when building preCICE. If you don't plan to use RBF mappings in large parallel cases, you can continue without installing PETSc and build preCICE with `-DPRECICE_FEATURE_PETSC_MAPPING=OFF`. If you need PETSc, follow the steps in the [PETSc](#petsc) section and you are done.

These instructions are known to work with Rocky 9, 10, and should apply to later releases as well ([release history](https://endoflife.date/rocky-linux)).

### OpenSUSE

In OpenSUSE Leap 15.4, things are a bit more complicated (please contribute in this section). Get the basic dependencies:

```bash
sudo zypper refresh
sudo zypper install gcc-c++ make cmake libxml2-devel \
libboost_log1_75_0-devel libboost_thread1_75_0-devel libboost_system1_75_0-devel libboost_filesystem1_75_0-devel libboost_program_options1_75_0-devel libboost_test1_75_0-devel \
eigen3-devel python3-devel
```

Furthermore, Numpy is needed. It can be installed through pip: `pip3 install --user numpy`.
You may need to set the Eigen location when configuring preCICE:

```bash
cmake -DEIGEN3_INCLUDE_DIR=/usr/include/eigen3 <options as usual>
```

If you don't already have a fitting combination of MPI and PETSc (not shown here), disable the respective features when configuring preCICE:

```bash
cmake -DPRECICE_FEATURE_MPI_COMMUNICATION=OFF -DPRECICE_FEATURE_PETSC_MAPPING=OFF <options as usual>
```

See also a related [discussion on the preCICE forum](https://precice.discourse.group/t/compiling-precice-on-opensuse-leap/1148/4) for more details.

These instructions are known to work with OpenSUSE Leap 15.4, and should apply to later releases as well ([release history](https://endoflife.date/opensuse)).

### Arch Linux

(The same applies to Manjaro, EndeavourOS, and other derived distributions)

Good news: [preCICE is already on AUR](https://aur.archlinux.org/packages/precice/), so you can directly use or modify the respective `PKGBUILD`.

See also the [Arch Linux Dockerfile used in the preCICE tests](https://github.com/precice/ci-images/blob/master/ci-archlinux.dockerfile).

### macOS

First, install `XCode Command Line Tools` from the [Apple Developer page](https://developer.apple.com/download/more/) or from XCode.

You can then install all dependencies using [Homebrew](https://brew.sh/):

```bash
brew install cmake eigen libxml2 boost petsc openmpi python3 numpy
```

or, alternatively, using [MacPorts](https://www.macports.org/)

```bash
port install cmake eigen3 libxml2 boost petsc openmpi python3 numpy
```

These instructions were written for macOS Catalina (10) ([release history](https://endoflife.date/macos)).
We are aware of users using preCICE in newer macOS versions, while our [automated tests](https://github.com/precice/precice/blob/develop/.github/workflows/build-and-test.yml)
run on the [GitHub Actions macos-latest runner](https://docs.github.com/en/actions/reference/runners/github-hosted-runners).
Contributions to this section would be particularly helpful.