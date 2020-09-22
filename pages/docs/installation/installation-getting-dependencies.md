---
title: Required Dependencies
permalink: installation-getting-dependencies.html
keywords: configuration, basics, installation, building
summary: "Usually the first paragraph of the page. If not create one or simple leave the field blank"
---
This page describes the dependencies used by preCICE and how to install or build them.
After you install them, you may proceed with [building preCICE](installation-getting-source.html).

## Required Dependencies

* [C++ compiler](#c-compiler) (with support for C++11, e.g. GCC version >= 5)
* [CMake](#cmake) (version >= 3.10.1)
* [Eigen](#eigen)
* [Boost](#boost) (version >= 1.65.1)
* [libxml2](#libxml2)

## Optional Dependencies

* [MPI](#mpi-optional)
* [PETSc](#petsc-optional) (version >= 3.12)
* [Python](#python-optional) (with NumPy)

## Dependencies In-Depth

### C++ compiler
A [C++ compiler with full  support for C++11](https://en.cppreference.com/w/cpp/compiler_support#cpp11) is needed to build preCICE. We plan to increase this requirement to C++14 soon.

If you are using the [GNU Compiler Collection](https://gcc.gnu.org/), at least version 5 is required.

If you are using Debian/Ubuntu, the `build-essential` package will install everything needed.

When compiling with `PRECICE_MPICommunication=on`, you need to use a compatible MPI compiler/wrapper. For example, check if the `mpicxx --version` reports a compatible GCC version.

### Eigen
preCICE uses [Eigen](http://eigen.tuxfamily.org/) for linear algebra computations and the latest version should work.

**Option 1: Install Eigen through your package manager**

You may as well install Eigen through your package manager (e.g. package `libeigen3-dev`).

**Option 2: Download the Eigen headers**

Eigen is a header-only library, i.e. it's being compiled into preCICE.
Download the source from [their website](http://eigen.tuxfamily.org) and extract it to some folder.
Set the environment variable `Eigen3_ROOT` to the extracted folder.

### CMake

We recommend that you build preCICE using CMake. However, [your CMake version might be too old for your Boost version](https://stackoverflow.com/a/42124857/5158031). You can check your CMake version using `cmake --version`

**Option 1: Install cmake from your package manager**

If you use Ubuntu, you get cmake through your distribution:
```
sudo apt update && \
sudo apt install cmake
```
**Warning:** the CMake version provided by your package manager might be too old (see above). Then you have to continue with option 2.

**Option 2: Install CMake from source**

See [this page for instructions](https://askubuntu.com/questions/355565/how-do-i-install-the-latest-version-of-cmake-from-the-command-line/865294#865294).

### Boost
preCICE uses [Boost](http://www.boost.org/) for several features and at least version 1.65.1 or higher is required. While Boost 1.67 or newer also works with preCICE, it may complicate how you install adapters that use yaml-cpp. Note that users have experienced problems building Boost 1.69 with some compilers.
Boost 1.73.0 is not supported before preCICE 2.1.0.

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

**Option 1: Install Boost from your package manager**
If you use Ubuntu, at least version 18.04, you get a suitable version through your distribution:
```
sudo apt update && \
sudo apt install libboost-dev libboost-log-dev libboost-thread-dev libboost-system-dev libboost-filesystem-dev libboost-program-options-dev libboost-test-dev
```

If, for any reason, the dependencies of Boost on itself are not resolved correctly, try installing the complete colection: `libboost-all-dev`.

**Option 2: Build Boost from source**
If your distribution provides an older version of Boost, you need to build it from source. Here is an example for Ubuntu 16.04 and Boost 1.66:
1. [Download](http://www.boost.org/users/download/) and extract Boost into any directory. Switch to that directory.
2. Prepare the installation, selecting only the libraries that need to be built (this does not affect the header-only libraries). We will later move these files to the system directory `/usr/local`. On systems using modules, we recommend to specify the toolset manually by additionally passing `--with-toolset=gcc` (or `intel`).  
Execute: 
   ```
   ./bootstrap.sh --with-libraries=log,thread,system,filesystem,program_options,test --prefix=/usr/local
   ```
3. Install the libraries. Since `/usr/local` is a system directory, we need root access: 
   ```
   sudo ./b2 install
   ```
   This will copy the libraries to `/usr/local/lib` and the all the Boost headers to `/usr/local/include`. You may then remove the Boost directory.
4. Update the dynamic linker's run-time bindings:
   ```
   sudo ldconfig
   ```

For more information, please refer to the "[Getting Started](http://www.boost.org/doc/libs/1_65_0/more/getting_started/unix-variants.html#easy-build-and-install)" instructions of Boost.

*If you do not have root access*, choose another prefix and set the appropriate environment variables:
```
# ==== boost ====
BOOST_ROOT=$HOME/software/boost # replace with the actual path
export LIBRARY_PATH=$BOOST_ROOT/lib:$LIBRARY_PATH
export LD_LIBRARY_PATH=$BOOST_ROOT/lib:$LD_LIBRARY_PATH
export CPLUS_INCLUDE_PATH=$BOOST_ROOT/include:$CPLUS_INCLUDE_PATH
```

Note: You may already have an older version, e.g. as part of a solver installation (e.g. OpenFOAM). Be cautious, as auto-removing the old version may uninstall your solver.

### libxml2
preCICE uses [libxml2](http://www.xmlsoft.org/) for parsing the configuration file and the latest version should work.

Most likely, the library is already installed. In order to compile preCICE, you also need the development package (`libxml2-dev` on Debian/Ubuntu).

### PETSc
[PETSc](https://www.mcs.anl.gov/petsc/) is used for RBF mappings and is highly recommended for large cases. For small/medium-size cases, preCICE can still do an RBF mapping in parallel without PETSc. If you don't need this feature, you may specify `PRECICE_PETScMapping=off` when building preCICE.

We require at least version 3.12. For preCICE versions earlier than v2.1.0, PETSc version between 3.6 and 3.12 might still work, but need to be build with 64bit index sizes. In particular on [Ubuntu 18.04, we require at least 3.12](https://github.com/precice/precice/issues/115).

**Option 1: Install PETSc through your package manager**
In Debian/Ubuntu, install the package `petsc-dev`. For version 3.12, you need at least Ubuntu 20.04. 

Then set the environment variables `PETSC_DIR` and `PETSC_ARCH` in your `~/.bashrc`. For *example*:
```
export PETSC_DIR=/usr/lib/petscdir/3.12.4/
export PETSC_ARCH=x86_64-linux-gnu-real
```

**Option 2: Build PETSc from source**
If you prefer to install the most recent version from source, do the following:

1. Get it from http://www.mcs.anl.gov/petsc/download/index.html or using ```git clone -b maint https://bitbucket.org/petsc/petsc petsc```
2. Change into that directory and compile with or without debugging: ```./configure --with-debugging=0``` (disable debugging for optimal performance)
3. Use the make command like the configure script proposes, e.g.
```make PETSC_DIR=/data2/scratch/lindner/petsc PETSC_ARCH=arch-linux2-c-opt all```
Further documentation see: http://www.mcs.anl.gov/petsc/documentation/installation.html
4. Usage: You will need to add petsc to your dynamic linker search path (`LD_LIBRARY_PATH` on Linux or `DYLD_LIBRARY_PATH` on macOS). You may also need to set the `$PETSC_ARCH`.


Finally, in some cases you may need to have PETSc in your `CPATH`, `LIBRARY_PATH`, or `PYTHONPATH`. Here is an *example*:
   ```
   export PETSC_DIR=/path/to/petsc
   export PETSC_ARCH=arch-linux2-c-debug
   export LD_LIBRARY_PATH=$PETSC_DIR/$PETSC_ARCH/lib:$LD_LIBRARY_PATH
   ```

### Python (optional) 

You only need [Python](https://www.python.org/) if you want to use the Python action interface (only used for rare applications). If you don't need this feature, you may specify `PRECICE_PythonActions=off`.
In particular, you don't need to build with Python if you only want to use the Python bindings.

You probably already have Python installed. Howewer, in order to use the Python interface, you also need to install NumPy and the header files for Python and NumPy. On Debian/Ubuntu, install the packages `python3-numpy` and `python3-dev`.

### MPI (optional)

You can build preCICE without [MPI](https://en.wikipedia.org/wiki/Message_Passing_Interface#Official_implementations) in case of compatibility issues with a certain solver (e.g. a closed source solver with a binary-distributed MPI version, or when running on Windows). To do so, use `-DPRECICE_MPICommunication=OFF` when building with CMake. In such a case, you can still use TCP/IP sockets instead. This might, however, result in lower performance and is, therefore, not recommended if not necessary. 

Please note that OpenMPI does not currently fully support the MPI ports functionality [citation needed]. In case you link to OpenMPI, you cannot use MPI for the m2n communication of preCICE. With preCICE versions earlier than 2.1.0, [the tests for MPI Ports will fail](https://github.com/precice/precice/wiki/Tests#troubleshooting).

Keep in mind that already [PETSc](Dependencies#petsc-optional) should have installed MPI. **Make sure that PETSc, preCICE, and your solvers are all compiled with the same MPI version!**


## System Guide

If you want build preCICE on your own computer and you are using one of the following Linux distributions, we provide a summary here to quickly install everything you need. If everything works, you may ignore the rest of this page.

Other modern versions of popular Linux distributions are also perfectly compatible, here we just list a few popular options. Since our users have tried preCICE on various distributions, you may as well ask on our [forum](https://precice.discourse.group/) for any questions.

### Ubuntu 20.04 Focal Fossa

With every release, we also ship [binary packages for Ubuntu 20.04](https://github.com/precice/precice/releases). However, if you still want to build from source, everything is available through the distribution's repositories:

```
sudo apt update && \
sudo apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev petsc-dev python3-dev python3-numpy
```

### Ubuntu 18.04 Bionic Beaver

<details><summary>Please upgrade, or click to read more (...)</summary>

With every release, we also ship [binary packages for Ubuntu 18.04](https://github.com/precice/precice/releases). However, if you still want to build from source, almost everything is available through the distribution's repositories:

```
sudo apt update && \
sudo apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev python3-dev python3-numpy
```

(optional) Please [build PETSc from source](Dependencies#petsc-optional) or [build with `-DPRECICE_PETScMapping=OFF`](Building:-Using-CMake#options) (only needed for large cases with RBF mapping).
</details>

### Ubuntu 16.04 Xenial Xerus

<details><summary>Please upgrade, or click to read more (...)</summary>

In Ubuntu 16.04, almost everything is available through the distribution's repositories. You only have to install Boost in another way, since only an older, incompatible version is available.

1. Install all the available dependencies through APT:
   ```
   sudo apt update && \
   sudo apt install build-essential cmake libxml2-dev python3-dev python3-numpy
   ```
2. Install Boost. In the Ubuntu 16.04 repositories, only Boost 1.58 is avaiable, so you need to build an appropriate Boost version from source (see [option 2](Dependencies#boost)). Also, you need to build petsc from the source if you are to use OpenFOAM adapter (see below how to install it from the source).
3. [Get Eigen from source](Dependencies#eigen). You could alternatively install the package `libeigen3-dev`, but you may face [issues with nearest-projection mapping](https://github.com/precice/precice/issues/603#issuecomment-573139840).
4. Get a [recent version of CMake](Dependencies#cmake).
5. (optional) [Get PETSc from source](Dependencies#petsc-optional) or [build with `-DPRECICE_PETScMapping=OFF`](Building:-Using-CMake#options) (only needed for large cases with RBF mapping)
</details>

### Debian 11 Bullseye

Everything is available from the distribution's repositories:

```
su
apt update && \
apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev petsc-dev python3-dev python3-numpy
```

### Debian 10 Buster

<details><summary>Please upgrade, or click to read more (...)</summary>

In Debian 10.5, almost everything is available through the distribution's repositories:

```
su
apt update && \
apt install build-essential cmake libeigen3-dev libxml2-dev libboost-all-dev python3-dev python3-numpy
```

(optional) Please [build PETSc from source](Dependencies#petsc-optional) or [build with `-DPRECICE_PETScMapping=OFF`](Building:-Using-CMake#options) (only needed for large cases with RBF mapping).
</details>

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

If you need PETSc (for large parallel cases with RBF mapping), [build it from source](Dependencies#petsc-optional). Otherwise, build preCICE with `-DPRECICE_PETScMapping=OFF`. There is also the package `petsc-openmpi-devel`, which provides a recent enough version, however CMake cannot find it out-of-the-box (if you find a solution, please let us know).

Currently [a preCICE test case is failing on Fedora](https://github.com/precice/precice/issues/847), so proceed with caution.

### CentOS 8

1. First, make sure that a few common dependencies are installed. You need to install the [Development Tools](https://serverfault.com/questions/814671/centos-how-do-i-check-if-development-tools-is-installed) (compilers, Git, make, pkg-config, ...) and to enable the [PowerTools](https://serverfault.com/questions/997896/how-to-enable-powertools-repository-in-centos-8) repository (eigen).
   ```bash
   su # Enter superuser mode
   yum install dnf-plugins-core
   yum config-manager --set-enabled PowerTools
   yum groupinstall 'Development Tools'
   yum update
   ```
2. Then, install the preCICE dependencies:
   ```bash
   yum install cmake libxml2-devel boost-devel openmpi-devel eigen3-devel python3-devel
   pip3 install --user numpy
   exit # Exit superuser mode
   ```
3. By default, OpenMPI is not globally available. Add to your `~/.bashrc` (exit root first):
   ```bash
   export PATH=/usr/lib64/openmpi/bin:$PATH
   ```
4. If you need PETSc (for large parallel cases with RBF mapping), [build it from source](Dependencies#petsc-optional). Otherwise, build preCICE with `-DPRECICE_PETScMapping=OFF`.

Currently [a preCICE test case is failing on CentOS](https://github.com/precice/precice/issues/847), so proceed with caution.

### CentOS 7

<details><summary>Please upgrade, or click to read more (...)</summary>

1. Packages are installed as follows:

```
sudo yum groupinstall 'Development Tools'
sudo yum update
sudo yum install cmake3 libxml2-devel eigen3 openmpi-devel python3-devel

export PATH=/usr/lib64/openmpi/bin:$PATH
export CC=/opt/rh/devtoolset-7/root/usr/bin/gcc
```

2. Boost library installation is done as follows:
```
sudo yum install boost169-devel
export BOOST_LIBRARYDIR=/usr/lib64/boost169/
export BOOST_INCLUDEDIR=/usr/include/boost169/
```

3. The pre-installed gcc compiler is an older version which leads to the following [known error](https://stackoverflow.com/questions/14136833/stdput-time-implementation-status-in-gcc/14142342). Multiple versions of gcc can be installed:
* Installing a newer version of gcc via a software development package:
```
sudo yum install centos-release-scl
sudo yum install devtoolset-7
```
* To enable the new gcc compiler in a terminal:
```
scl enable devtoolset-7 bash
```

5. Use `cmake3` instead of `cmake` for the configuration of preCICE.

</details>

