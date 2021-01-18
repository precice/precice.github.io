---
title: Dependencies
permalink: installation-source-dependencies.html
keywords: configuration, basics, installation, building
summary: 'This page describes the dependencies used by preCICE, how to install them on various systems and how to build them.'
---

## How to use this page?

Start by checking if there is a [guide for your system](#system-guides). It will include all required steps to get preCICE ready to build.

If there is no guide for your system, find out if there are suitable system packages for the dependencies.
Then use the [dependencies](#dependencies) section to install all missing dependencies from source.

After all dependencies are ready to use, proceed with [configuring preCICE](installation-source-configuration).'

## Dependencies

This section lists all dependencies alongside required versions and steps on how to install them from source.
Meaning, installing dependencies based on the steps in this section should be the _last resort_ for normal users.
Prefer to follow the [system guides](#system-guides) and only install custom versions if you have a reason to do so.

### Overview

#### Required dependencies

* [C++ compiler](#c-compiler) (with support for C++14, e.g. GCC version >= 5)
* [CMake](#cmake) (version >= 3.10.1)
* [Eigen](#eigen)
* [Boost](#boost) (version >= 1.65.1)
* [libxml2](#libxml2)

#### Optional dependencies

* [MPI](#mpi)
* [PETSc](#petsc) (version >= 3.12)
* [Python](#python) (with NumPy)

### C++ compiler

preCICE requires a [C++ compiler with full C++14 support](https://en.cppreference.com/w/cpp/compiler_support#cpp14).
The following table lists the minimal requirement for compiler versions:

| Toolchain | Minimal Version | Note |
| GCC | `5` | |
| LLVM | `3.8` | |
| Intel | `17` | also requires GCC `5` |
| Cray | `8.6` | also requires GCC `5` |
| Clang | `3.4`| |
| MSVC | `19.10` | _For future reference_ |

If you are using Debian/Ubuntu, the `build-essential` package will install everything needed.

When compiling with MPI enabled (the default) and using your MPI compiler wrapper as compiler, then it needs to use a suitable compiler.
For example, check if the `mpicxx --version` reports a compatible compiler version.
Check the section on [MPI](#mpi) for more information.j

### CMake

preCICE required the build system CMake at a minimal version of `3.10`.
You can check your CMake version using `cmake --version`.

Depending on the versions of CMake and Boost, CMake may not find all libraries in boost and display warnings when configuring preCICE.
This can be safely ignored as preCICE does not use problematic libraries.
[Fixing this requires to upgrade CMake.](https://stackoverflow.com/a/42124857/5158031).

**Download CMake binaries**

Download the [official binaries](https://cmake.org/download/#latest) for your platform and extract them into a folder.
Then extend the path environment variable by executing the following:
```bash
export PATH=$PATH:/path/to/extracted/location/version/bin
cmake --version
```
This should now display the version of the latest release.
If the version is correct, you can make this change persistent by appending the above export statement to your `.bashrc` or similar.


### Eigen

preCICE uses [Eigen](http://eigen.tuxfamily.org/) for linear algebra computations and for a version of RBF mappings which does not require PETSc.

**Download the Eigen headers**

Eigen is a header-only library, i.e. it is compiled into preCICE and does not require linkage.
Download the sources from their [latest release](https://gitlab.com/libeigen/eigen/-/releases/) and extract them to some location.
The folder of your choice should now contain a folder called `eigen-x.y.z` for version `x.y.z`.
Set the environment variable `Eigen3_ROOT` to the `eigen-x.y.z` folder by adding this to your `~.bashrc`.

```bash
export Eigen3_ROOT=/path/to/eigen/eigen-x.y.z
```

### Boost

preCICE uses [Boost](http://www.boost.org/) for several features and requires version 1.65.1 or higher.
While Boost 1.67 or newer also works with preCICE, it may complicate how you install adapters that use yaml-cpp.
Note that users have experienced problems building Boost 1.69 with some compilers.

{% include note.html content="Boost 1.73.0 is not supported before preCICE 2.1.0." %}

You might save some time and space by installing only the necessary libraries:
* `boost_log`
* `boost_log_setup`
* `boost_thread` 
* `boost_system` 
* `boost_filesystem` 
* `boost_program_options` 
* `boost_unit_test_framework`

These libraries may also depend on other Boost libraries. Make sure that these get installed, too.

The following header-only Boost libraries are also needed: `vmd`, `geometry`, `signals2`, `container`, `ranges`.

**Build boost from source**
1. [Download](http://www.boost.org/users/download/) and extract Boost into any directory. Switch to that directory.
2. Prepare the installation, selecting only the libraries that need to be built (this does not affect the header-only libraries).
   Select a prefix to install boost to. This will later contain the directories `include` and `lib`.
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
4. If you selected `/usr/local` as prefix, update the the dynamic linker's run-time bindings:
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

For more information, please refer to the "[Getting Started](http://www.boost.org/doc/libs/1_65_0/more/getting_started/unix-variants.html#easy-build-and-install)" instructions of Boost.

### libxml2
preCICE uses [libxml2](http://www.xmlsoft.org/) for parsing the configuration file.

{% include note.html content="
libxml2 is available on close to any system you can imagine.  
Please double check if there are no system packages before attempting to build this dependency from source.
" %}

**Install from source**
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
  ```

### PETSc
[PETSc](https://www.mcs.anl.gov/petsc/) is used for RBF mappings and is highly recommended for large cases. For small/medium-size cases, preCICE can still do an RBF mapping in parallel without PETSc. If you don't need this feature, you may specify `PRECICE_PETScMapping=off` when building preCICE.

We require at least version 3.12. For preCICE versions earlier than v2.1.0, PETSc version between 3.6 and 3.12 might still work, but need to be build with 64bit index sizes. In particular on [Ubuntu 18.04, we require at least 3.12](https://github.com/precice/precice/issues/115).

**Build PETSc from source**
If you prefer to install the most recent version from source, do the following:

1. Get it from http://www.mcs.anl.gov/petsc/download/index.html or using `git clone -b maint https://bitbucket.org/petsc/petsc petsc`
2. Change into that directory and compile with or without debugging: `./configure --with-debugging=0` (disable debugging for optimal performance)
3. Use the make command like the configure script proposes, e.g.
  `make PETSC_DIR=/data2/scratch/lindner/petsc PETSC_ARCH=arch-linux2-c-opt all`
  Further documentation see: http://www.mcs.anl.gov/petsc/documentation/installation.html
4. Usage: You will need to add petsc to your dynamic linker search path (`LD_LIBRARY_PATH` on Linux or `DYLD_LIBRARY_PATH` on macOS). You may also need to set the `$PETSC_ARCH`.


Finally, in some cases you may need to have PETSc in your `CPATH`, `LIBRARY_PATH`, or `PYTHONPATH`. Here is an *example*:
   ```
   export PETSC_DIR=/path/to/petsc
   export PETSC_ARCH=arch-linux2-c-debug
   export LD_LIBRARY_PATH=$PETSC_DIR/$PETSC_ARCH/lib:$LD_LIBRARY_PATH
   ```

### Python

You only need [Python](https://www.python.org/) if you want to use the Python action interface (only used for rare applications). If you don't need this feature, you may specify `PRECICE_PythonActions=off`.
In particular, you don't need to build with Python if you only want to use the Python bindings.

You probably already have Python installed. Howewer, in order to use the Python interface, you also need to install NumPy and the header files for Python and NumPy. On Debian/Ubuntu, install the packages `python3-numpy` and `python3-dev`.

### MPI

You can build preCICE without [MPI](https://en.wikipedia.org/wiki/Message_Passing_Interface#Official_implementations) in case of compatibility issues with a certain solver (e.g. a closed source solver with a binary-distributed MPI version, or when running on Windows). To do so, use `-DPRECICE_MPICommunication=OFF` when building with CMake. In such a case, you can still use TCP/IP sockets instead. This might, however, result in lower performance and is, therefore, not recommended if not necessary. 

Please note that OpenMPI does not currently fully support the MPI ports functionality [citation needed]. In case you link to OpenMPI, you cannot use MPI for the m2n communication of preCICE. With preCICE versions earlier than 2.1.0, [the tests for MPI Ports will fail](https://github.com/precice/precice/wiki/Tests#troubleshooting).

Keep in mind that already [PETSc](Dependencies#petsc) should have installed MPI. **Make sure that PETSc, preCICE, and your solvers are all compiled with the same MPI version!**


## System guides

If you want build preCICE on your own computer and you are using one of the following Linux distributions, we provide a summary here to quickly install everything you need. If everything works, you may ignore the rest of this page.

Other modern versions of popular Linux distributions are also perfectly compatible, here we just list a few popular options. Since our users have tried preCICE on various distributions, you may as well ask on our [forum](https://precice.discourse.group/) for any questions.

### Ubuntu 20.04 LTS Focal Fossa

With every release, we also ship [binary packages for Ubuntu 20.04](https://github.com/precice/precice/releases). However, if you still want to build from source, everything is available through the distribution's repositories:

```
sudo apt update && \
sudo apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev petsc-dev python3-dev python3-numpy
```

### Ubuntu 18.04 Bionic Beaver

With every release, we also ship [binary packages for Ubuntu 18.04](https://github.com/precice/precice/releases).
However, if you still want to build from source, almost everything is available through the distribution's repositories:

```
sudo apt update && \
sudo apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev python3-dev python3-numpy
```

If you don't plan to use RBF mappings in large parallel cases you can continue without installing PETSc and [build with `-DPRECICE_PETScMapping=OFF`](Building:-Using-CMake#options).
If you need PETSc, follow the steps in the [PETSc](#petsc) section and you are done.

### Ubuntu 16.04 Xenial Xerus

In Ubuntu 16.04, only a fraction of packages is available through the distribution's repositories.
Further packages needs to be build from source.
First install the available packages:

```
sudo apt update && \
sudo apt install build-essential g++-5 libxml2-dev python3-dev python3-numpy
```

Next, you need to install [CMake](#cmake), [Eigen](#eigen) and [boost](#boost) as descibed in their respective sections.

If you don't plan to use RBF mappings in large parallel cases you can continue without installing PETSc and [build with `-DPRECICE_PETScMapping=OFF`](Building:-Using-CMake#options).
If you need PETSc, follow the steps in the [PETSc](#petsc) section and you are done.

{% include note.html content="
The repositories contain a package `libeigen3-dev`, however, unsing it results in [issues with nearest-projection mapping](https://github.com/precice/precice/issues/603#issuecomment-573139840).
" %}

### Debian 11 Bullseye

Everything is available from the distribution's repositories:

```
su
apt update && \
apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev petsc-dev python3-dev python3-numpy
```

### Debian 10 Buster

In Debian 10.5, almost everything is available through the distribution's repositories:

```
su
apt update && \
apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev python3-dev python3-numpy
```

If you don't plan to use RBF mappings in large parallel cases you can continue without installing PETSc and [build with `-DPRECICE_PETScMapping=OFF`](Building:-Using-CMake#options).
If you need PETSc, follow the steps in the [PETSc](#petsc) section and you are done.

### Fedora 32

In Fedora 32, almost everything is available through the distribution's repositories:

```
dnf update
sudo dnf groupinstall "Development Tools"
sudo dnf install cmake libxml2-devel boost-devel openmpi-devel eigen3-devel python3-devel
pip3 install --user numpy
```

Before configuring & building preCICE, load MPI:
```
module load mpi/openmpi-x86_64
```

If you don't plan to use RBF mappings in large parallel cases you can continue without installing PETSc and build with `-DPRECICE_PETScMapping=OFF`.
If you need PETSc, follow the steps in the [PETSc](#petsc) section and you are done.
There is also the package `petsc-openmpi-devel`, which provides a recent enough version, however CMake cannot find it out-of-the-box.
This [preCICE issue](https://github.com/precice/precice/issues/864) may resolve the problem.

{% include warning.html content="
Currently [a preCICE test case is failing on Fedora](https://github.com/precice/precice/issues/847), so proceed with caution.
" %}

### CentOS 8

This system requires to install some tools in a fixed order.

1. First, make sure that a few common dependencies are installed.
   You need to enable the [PowerTools](https://serverfault.com/questions/997896/how-to-enable-powertools-repository-in-centos-8) repository (for eigen) and to
   install the [Development Tools](https://serverfault.com/questions/814671/centos-how-do-i-check-if-development-tools-is-installed) group (compilers, Git, make, pkg-config, ...).
   ```bash
   su # Enter superuser mode
   yum install dnf-plugins-core
   yum config-manager --set-enabled PowerTools
   yum groupinstall 'Development Tools'
   yum update
   ```
2. Then, install the available preCICE dependencies:
   ```bash
   yum install cmake libxml2-devel boost-devel openmpi-devel eigen3-devel python3-devel
   pip3 install --user numpy
   exit # Exit superuser mode
   ```
3. By default, OpenMPI is not globally available. You need to add the following to your `~/.bashrc` (exit root first):
   ```bash
   export PATH=/usr/lib64/openmpi/bin:$PATH
   ```
4. If you don't plan to use RBF mappings in large parallel cases you can continue without installing PETSc and build with `-DPRECICE_PETScMapping=OFF`.
   If you need PETSc, follow the steps in the [PETSc](#petsc) section and you are done.

{% include warning.html content="
Currently [a preCICE test case is failing on CentOS](https://github.com/precice/precice/issues/847), so proceed with caution.
" %}

### CentOS 7

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
  ```
  sudo yum install centos-release-scl
  sudo yum install devtoolset-7
  ```
  To enable the new gcc compiler in a terminal:
  ```
  scl enable devtoolset-7 bash
  ```

{% include note.html content="Use `cmake3` instead of `cmake` to configure preCICE!" %}

### macOS Catalina 10.15
First, `XCode Command Line Tools` should be installed from [Apple Developer page](https://developer.apple.com/download/more/) or from XCode application.

Then, all the dependencies can be installed using `Homebrew` or `MacPorts` package managers.

```bash
brew install cmake eigen libxml2 boost petsc openmpi python3 numpy
```
or

```bash
port install cmake libxml2 boost petsc openmpi python3 numpy
```

