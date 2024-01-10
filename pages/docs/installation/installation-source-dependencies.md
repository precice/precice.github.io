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

After all dependencies are ready to use, proceed with [configuring preCICE](installation-source-configuration).

## Dependencies

This section lists all dependencies alongside required versions and steps on how to install them from source.
Meaning, installing dependencies based on the steps in this section should be the _last resort_ for normal users.
Prefer to follow the [system guides](#system-guides) and only install custom versions if you have a reason to do so.

### Overview

The following is an overview of the required dependencies of the latest preCICE release.
Note that we always strive to be forwards-compatible.
If you find a problem with preCICE and a latest versions of these dependencies, please let us know.

#### Required dependencies

| preCICE | {{ site.precice_version }} |
| [C++ compiler](#c-compiler) | C++14 |
| [CMake](#cmake) | >= 3.16.1 |
| [Eigen](#eigen) | >= 3.3.7 |
| [Boost](#boost) | >= 1.71.0 |
| [libxml2](#libxml2) | >= 2 |

#### Required optional dependencies

| preCICE | {{ site.precice_version }} |
| [MPI](#mpi) | implementation of MPI-3 |
| [PETSc](#petsc) | >= 3.12 |
| [Python](#python) | >= 3 |

### C++ compiler

preCICE requires a [C++ compiler with full C++14 support](https://en.cppreference.com/w/cpp/compiler_support#cpp14).
The following table lists the minimal requirement for compiler versions:

| Toolchain | Minimal Version | Note |
| GCC | `5` | |
| Intel | `17` | also requires GCC `5` |
| Cray | `8.6` | also requires GCC `5` |
| Clang | `3.4`| |
| MSVC | `19.10` | _For future reference_ |

If you are using Debian/Ubuntu, the `build-essential` package will install everything needed.

When compiling with MPI enabled (the default) and using your MPI compiler wrapper as compiler, then it needs to use a suitable compiler.
For example, check if the `mpicxx --version` reports a compatible compiler version.
Check the section on [MPI](#mpi) for more information.j

### CMake

| preCICE  |     | 1.4    | 2.4    |
| Required | 3.5 | 3.10.2 | 3.16.3 |

preCICE requires the build system CMake at a minimal version of `3.16.1`.
You can check your CMake version using `cmake --version`.

Depending on the versions of CMake and Boost, CMake may not find all libraries in boost and display warnings when configuring preCICE.
This can be safely ignored as preCICE does not use problematic libraries.
[Fixing this requires to upgrade CMake.](https://stackoverflow.com/a/42124857/5158031).

#### Download CMake binaries

Download the [official binaries](https://cmake.org/download/#latest) for your platform and extract them into a folder.
Then extend the path environment variable by executing the following:

```bash
export PATH=$PATH:/path/to/extracted/location/version/bin
cmake --version
```

This should now display the version of the latest release.
If the version is correct, you can make this change persistent by appending the above export statement to your `.bashrc` or similar.

### Eigen

| preCICE  |     | 1.5   |
| Required | 3.2 | 3.3.7 |

preCICE uses [Eigen](http://eigen.tuxfamily.org/) for linear algebra computations and for a version of RBF mappings which does not require PETSc.

#### Download the Eigen headers

Eigen is a header-only library, i.e. it is compiled into preCICE and does not require linkage.
Download the sources from their [latest release](https://gitlab.com/libeigen/eigen/-/releases/) and extract them to some location.
The folder of your choice should now contain a folder called `eigen-x.y.z` for version `x.y.z`.
Set the environment variable `Eigen3_ROOT` to the `eigen-x.y.z` folder by adding this to your `~.bashrc`.

```bash
export Eigen3_ROOT=/path/to/eigen/eigen-x.y.z
```

### Boost

preCICE uses [Boost](http://www.boost.org/) for several features.
Boost 1.67 and newer, it may complicate how you install adapters that use yaml-cpp.
Note that users have experienced problems building Boost 1.68 and 1.69 with some compilers.

| preCICE      |        | 1.4.0  | 2.0.2  | 2.1.1  | 2.3.0  | 2.4.0  |
| Required     | 1.60.0 | 1.65.1 | <-     | <-     | <-     | 1.71.0 |
| Incompatible | 1.72.0 | <-     | <-     | 1.74.0 | 1.78.0 | None   |

You might save some time and space by installing only the necessary libraries:

* `boost_log`
* `boost_log_setup`
* `boost_thread`
* `boost_system`
* `boost_filesystem`
* `boost_program_options`
* `boost_unit_test_framework`

These libraries may also depend on other Boost libraries. Make sure that these get installed, too.

The following header-only Boost libraries are also needed: 'asio', `vmd`, `geometry`, `signals2`, `container`, `ranges`.

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

4. If you selected `/usr/local` as prefix, update the dynamic linker's run-time bindings:

   ```bash
   sudo ldconfig
   ```

5. If you did not select `/usr/local` as prefix, you need to make the boost installation visible to the linker and compiler.
  Add the following to your `~/.bashrc`:

  ```bash
  export BOOST_ROOT=<prefix>
  export LIBRARY_PATH=$BOOST_ROOT/lib:$LIBRARY_PATH
  export LD_LIBRARY_PATH=$BOOST_ROOT/lib:$LD_LIBRARY_PATH
  export CPLUS_INCLUDE_PATH=$BOOST_ROOT/include:$CPLUS_INCLUDE_PATH
  ```

For more information, please refer to the "[Getting Started](http://www.boost.org/doc/libs/release/more/getting_started/unix-variants.html#easy-build-and-install)" instructions of Boost.

### libxml2

preCICE uses [libxml2](http://www.xmlsoft.org/) for parsing the configuration file.

{% note %}
libxml2 is available on close to any system you can imagine.  
Please double check if there are no system packages before attempting to build this dependency from source.
{% endnote %}

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
  export LIBRARY_PATH=<prefix>/lib:$LIBRARY_PATH
  export LD_LIBRARY_PATH=<prefix>/lib:$LD_LIBRARY_PATH
  export CPLUS_INCLUDE_PATH=<prefix>/include:$CPLUS_INCLUDE_PATH
  export PKG_CONFIG_PATH=<prefix>/lib/pkgconfig:$PKG_CONFIG_PATH
  ```

### PETSc

| preCICE      |      | 2.1.0 |
| Required     | 3.6  | 3.12  |
| Incompatible | 3.12 |  <-   |

[PETSc](https://www.mcs.anl.gov/petsc/) is used for RBF mappings and is highly recommended for large cases. For small/medium-size cases, preCICE can still do an RBF mapping in parallel without PETSc. If you don't need this feature, you may specify `-DPRECICE_PETScMapping=off` when building preCICE.

We require at least version 3.12. For preCICE versions earlier than v2.1.0, PETSc version between 3.6 and 3.12 might still work, but needs to be built with 64bit index sizes. In particular on [Ubuntu 18.04, we require at least 3.12](https://github.com/precice/precice/issues/115).

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
   export PETSC_DIR=/path/to/petsc
   export PETSC_ARCH=arch-linux-c-opt
   export LD_LIBRARY_PATH=$PETSC_DIR/$PETSC_ARCH/lib:$LD_LIBRARY_PATH
   ```

### Python

| preCICE                |      | 2.0.0 |
| Required libypthon     | 2.7  |  3    |
| Incompatible libypthon | 2.8  |  None |
| Required NumPy         |      |  1.17 |
| Incompatible NumPy     | 1.17 |  None |

You only need [Python](https://www.python.org/) if you want to use the Python action interface (only used for rare applications). If you don't need this feature, you may specify `-DPRECICE_PythonActions=off`.
In particular, you don't need to build with Python if you only want to use the [preCICE Python bindings](installation-bindings-python.html).

You probably already have Python installed. However, in order to use the Python interface, you also need to install NumPy and the header files for Python and NumPy. On Debian/Ubuntu, install the packages `python3-numpy` and `python3-dev`.

### MPI

preCICE requires an implementation of the MPI-3 specification, which is provided by all major vendors including OpenMPI, MPICH, and Intel MPI.

You can build preCICE without [MPI](https://en.wikipedia.org/wiki/Message_Passing_Interface#Official_implementations) in case of compatibility issues with a certain solver (e.g. a closed source solver with a binary-distributed MPI version, or when running on Windows). To do so, use `-DPRECICE_MPICommunication=OFF` when building with CMake. In such a case, you can still use TCP/IP sockets instead. This might, however, result in lower performance and is, therefore, not recommended if not necessary.

Please note that many MPI implementations implement the client-server functionality in various ways.
They often require special setup such as environment variables, servers or infrastructure setup.

Keep in mind that already [PETSc](installation-source-dependencies.html#petsc) should have installed MPI.

{% important %}
Make sure that PETSc, preCICE, and your solvers are all compiled with the same MPI version!
{% endimportant %}

## System guides

If you want build preCICE on your own computer and you are using one of the following Linux distributions, we provide a summary here to quickly install everything you need. If everything works, you may ignore the rest of this page.

Other modern versions of popular Linux distributions are also perfectly compatible, here we just list a few popular options. Since our users have tried preCICE on various distributions, you may as well ask on our [forum](https://precice.discourse.group/) for any questions.

### Ubuntu 22.04 LTS Jammy Jellyfish

With every release, we also ship [binary packages for Ubuntu 22.04](https://github.com/precice/precice/releases). However, if you still want to build from source, everything is available through the distribution's repositories:

```bash
sudo apt update && \
sudo apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev petsc-dev python3-dev python3-numpy
```

The same instructions apply for later Ubuntu releases.

### Ubuntu 20.04 LTS Focal Fossa

Follow the same instructions as for Ubuntu 22.04.

### Ubuntu 18.04 Bionic Beaver

{% warning %}
The last release of preCICE to support Ubuntu 18.04 was [preCICE v2.3.0](https://github.com/precice/precice/releases/tag/v2.3.0).
{% endwarning %}

With every release, we also ship [binary packages for Ubuntu 18.04](https://github.com/precice/precice/releases).
However, if you still want to build from source, almost everything is available through the distribution's repositories:

```bash
sudo apt update && \
sudo apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev python3-dev python3-numpy
```

If you don't plan to use RBF mappings in large parallel cases you can continue without installing PETSc and build with `-DPRECICE_PETScMapping=OFF`.
If you need PETSc, follow the steps in the [PETSc](#petsc) section and you are done.

### Debian 11 Bullseye

Everything is available from the distribution's repositories:

```bash
su
apt update && \
apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev petsc-dev python3-dev python3-numpy
```

### Debian 10 Buster

In Debian 10.5, almost everything is available through the distribution's repositories:

```bash
su
apt update && \
apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev python3-dev python3-numpy
```

If you don't plan to use RBF mappings in large parallel cases you can continue without installing PETSc and build with `-DPRECICE_PETScMapping=OFF`.
If you need PETSc, follow the steps in the [PETSc](#petsc) section and you are done.

### Fedora 36

In Fedora, everything is available through the distribution's repositories:

```bash
sudo dnf update
sudo dnf install gcc-c++ cmake libxml2-devel boost-devel openmpi-devel petsc-openmpi-devel hdf5-openmpi-devel eigen3-devel python3-devel
```

Note that `hdf5-openmpi-devel` is only needed to detect the PETSc installation ([details](https://github.com/precice/precice.github.io/pull/179#issuecomment-1207865435)).

Afterwards, start a new terminal, to make MPI discoverable (read more about [MPI on Fedora](https://docs.fedoraproject.org/en-US/neurofedora/mpi/)). Before configuring & building preCICE, load MPI using the module:

```bash
module load mpi/openmpi-x86_64
```

(if `module` is not available, you may need to log out and in again)

{% note %}
In case you use the docker image of fedora, you need to install the support for environment modules first: `sudo dnf install environment-modules`
{% endnote %}

If you don't plan to use RBF mappings in large parallel cases you can continue without installing PETSc and build with `-DPRECICE_PETScMapping=OFF`. You may need this with older preCICE and Fedora versions (e.g. preCICE v2.1 on Fedora 32 or earlier, see a [related issue](https://github.com/precice/precice/issues/864).

### Rocky Linux 9

Rocky Linux very closely follows the conventions previously set by CentOS. We first need to install common development tools, enable the [CRB repository](https://wiki.rockylinux.org/rocky/repo/) (only for Eigen), install the dependencies, load the MPI module, and continue with building preCICE.

1. First,  install the [Development Tools](https://serverfault.com/questions/814671/centos-how-do-i-check-if-development-tools-is-installed) group (compilers, Git, make, pkg-config, ...):

   ```bash
   sudo dnf update
   sudo dnf install dnf-plugins-core
   sudo dnf groupinstall "Development Tools"
   ```

2. Then, install the available preCICE dependencies:

   ```bash
   sudo dnf install cmake libxml2-devel boost-devel openmpi-devel eigen3-devel python3-devel
   ```

3. Before configuring & building preCICE, load MPI (you may need to log out and in again, if `module` is not found):

   ```bash
   module load mpi/openmpi-x86_64
   ```

4. Unfortunately, [PETSc does not seem to be available in this distribution.](https://pkgs.org/search/?q=petsc), so we need to switch that off later when building preCICE. If you don't plan to use RBF mappings in large parallel cases, you can continue without installing PETSc and build preCICE with `-DPRECICE_PETScMapping=OFF`. If you need PETSc, follow the steps in the [PETSc](#petsc) section and you are done.

### CentOS 8

{% warning %}
The last release of preCICE to support CentOS 8 was [preCICE v2.3.0](https://github.com/precice/precice/releases/tag/v2.3.0).
{% endwarning %}

(The same instructions apply also to Rocky Linux 8)

This system requires to install some tools in a fixed order.

1. First, make sure that a few common dependencies are installed.
   You need to enable the [PowerTools](https://serverfault.com/questions/997896/how-to-enable-powertools-repository-in-centos-8) repository (for Eigen) and to
   install the [Development Tools](https://serverfault.com/questions/814671/centos-how-do-i-check-if-development-tools-is-installed) group (compilers, Git, make, pkg-config, ...).

   ```bash
   sudo dnf update
   sudo dnf install dnf-plugins-core
   sudo dnf groupinstall "Development Tools"
   sudo dnf config-manager --set-enabled powertools
   sudo dnf update
   ```

   Note that, instead of `dnf`, you can also type `yum` with the same options.
2. Then, install the available preCICE dependencies:

   ```bash
   sudo dnf install cmake libxml2-devel boost-devel openmpi-devel eigen3-devel python3-devel
   pip3 install --user numpy
   ```

3. Before configuring & building preCICE, load MPI (you may need to log out and in again, if `module` is not found):

   ```bash
   module load mpi/openmpi-x86_64
   ```

4. Unfortunately, the PETSc package (`petsc-openmpi-devel`) in this distribution is too old. If you don't plan to use RBF mappings in large parallel cases you can continue without installing PETSc, and build preCICE with `-DPRECICE_PETScMapping=OFF`. If you need PETSc, follow the steps in the [PETSc](#petsc) section and you are done.

### CentOS 7

{% warning %}
The last release of preCICE to support CentOS 7 was [preCICE v2.3.0](https://github.com/precice/precice/releases/tag/v2.3.0).
{% endwarning %}

This system requires to install some tools in a fixed order.

1. First install the group 'Development Tools'.

   ```bash
   sudo yum groupinstall 'Development Tools'
   sudo yum update
   ```

2. Then install available dependencies from the repositories:

   ```bash
   sudo yum install cmake3 libxml2-devel eigen3 openmpi-devel python3-devel boost169-devel
   ```

3. Then add the following to your `~./bashrc`:

   ```bash
   export PATH=/usr/lib64/openmpi/bin:$PATH
   export CC=/opt/rh/devtoolset-7/root/usr/bin/gcc
   export BOOST_LIBRARYDIR=/usr/lib64/boost169/
   export BOOST_INCLUDEDIR=/usr/include/boost169/
   ```

4. Then install install a newer version of gcc using a software development package:

  ```bash
  sudo yum install centos-release-scl
  sudo yum install devtoolset-7
  ```

  To enable the new gcc compiler in a terminal:
  
  ```bash
  scl enable devtoolset-7 bash
  ```

{% important %}
Use `cmake3` instead of `cmake` to configure preCICE!
{% endimportant %}

### OpenSUSE Leap 15.4

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
cmake -DPRECICE_MPICommunication=OFF -DPRECICE_PETScMapping=OFF <options as usual>
```

See also a related [discussion on the preCICE forum](https://precice.discourse.group/t/compiling-precice-on-opensuse-leap/1148/4) for more details.

### Arch Linux

(The same applies to Manjaro and other derived distributions)

Good news: [preCICE is already on AUR](https://aur.archlinux.org/packages/precice/), so you can directly use or modify the respective `PKGBUILD`.

### macOS

These instructions were written for macOS Catalina (10). We are aware of users using preCICE in newer macOS versions, including macOS Big Sur (11), while our [automated tests](https://github.com/precice/precice/actions/workflows/build-and-test-mac.yml) run on the [GitHub Actions macos-latest runner](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources). Contributions to this section would be particularly helpful.

First, install `XCode Command Line Tools` from the [Apple Developer page](https://developer.apple.com/download/more/) or from XCode.

You can then install all dependencies using [Homebrew](https://brew.sh/):

```bash
brew install cmake eigen libxml2 boost petsc openmpi python3 numpy
```

or, alternatively, using [MacPorts](https://www.macports.org/)

```bash
port install cmake eigen3 libxml2 boost petsc openmpi python3 numpy
```
