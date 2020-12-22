---
title: Using spack
permalink: installation-spack.html
keywords: configuration, basics, installation, building, dependencies, spack
---

## What is Spack?

[Spack](https://spack.io/) is a
> multi-platform package manager that builds and installs multiple versions and configurations of software. It works on Linux, macOS, and many supercomputers.
> Spack is non-destructive: installing a new version of a package does not break existing installations, so many configurations of the same package can coexist.

It also has [amazing documentation](https://spack.readthedocs.io/en/latest/)!

## Why Spack?

You can install Spack locally, without root permissions and in an environment that will not affect the rest of your system.
Meanwhile, it allows to be chained to installed variants provided by your system administrators.

It builds preCICE and all its dependencies from source and allows you to load the installation into your running environment when needed.
It also allows you to build multiple versions and variants of preCICE, which then coexist on your system.
Spack also generates module files which can be useful on clusters.

A few hints to get you started:
* `spack info precice` displays the package info, versions, variants, and dependencies.
* `spack spec precice` displays all the dependencies that will be built.
* Want to use a system-installed compiler (e.g. Intel)? Try [`spack compiler find`](https://spack.readthedocs.io/en/latest/getting_started.html#spack-compiler-find).
* Want to build something special? If you ran `spack install precice@develop%gcc@7.3.0 ^openmpi@3.1.2 build_type=RelWithDebInfo`, this would install the `develop` version of preCICE, with the compiler GCC 7.3.0, OpenMPI version 3.1.2 and in `RelWithDebInfo` mode.
* Do you need a specific compiler version? You can build `gcc` and `llvm` from source and use them to compile your software.
* You can even edit the package/recipe using `spack edit precice`.
* For more advanced usage, you can create your own package repository and use it to build your software.

Where are the packages installed?
Just inside the `spack/` directory!
Deleting this directory will remove everything.


## Setting up Spack

Get and configure [Spack](https://spack.io/) on your laptop / supercomputer (no sudo required!):
```bash
git clone -b develop https://github.com/spack/spack.git
source spack/share/spack/setup-env.sh # Maybe put this in your ~/.bashrc
```

## Installing preCICE

To install the latest release of preCICE run:
```bash
spack install precice
```
That's it!
You just installed the latest release of precice in the default configuration.
To see installed variants of precice, run the following:
```bash
spack find precice
```

To load the preCICE module run:
```bash
spack load precice
```

You can now use preCICE normally and build any adapter following their respective instructions.

If you want to uninstall preCICE, `spack uninstall precice` or delete the complete `spack/` directory to remove everything.

:tada:

## Advanced tips

### Use dependencies from your system

You can instruct Spack to recognize specific dependencies that are already installed on your system.

This is done by modifying your preferences in `~/.spack/packages.yaml`(_Note_: If this is the first time you set preferences, the file might not exist and you have to create it yourself).

For example, to specify a locally installed MPI version, you could write:

```yaml
packages:
    openmpi:
        paths:
            openmpi@3.1.2: /opt/local
        buildable: False
```
Here we specify that a local install of OpenMPI version 3.1.2 exists in `/opt/local`. The `buildable` flag specifies that Spack is allowed to look for and build newer versions of the package if they exist instead of using the locally available one. Here we set it to `false` to prevent Spack from trying to build a newer version and add unnecessary installation time.

### Install preCICE without non-essential dependency extensions

You might want to opt out some default install options for some dependencies of preCICE as they can cause conflicts. Specifically the extensions of Eigen and Boost are known to cause errors (see [Troubleshooting](#Troubleshooting)).

To install only the essential boost libraries that are used by preCICE, you can strip away some default options of the Eigen and Boost packages:

```bash
$ spack install precice ^boost@1.65.1  -atomic -chrono -date_time -exception -graph -iostreams -locale -math -random -regex -serialization -signals -timer -wave ^eigen@3.3.1 -fftw -metis -mpfr -scotch -suitesparse ^openmpi@3.1.2
```
Note that we install preCICE specifically with boost 1.65.1 and eigen 3.3.1. We also demand OpenMPI version 3.1.2 as this allows Spack to use the local OpenMPI install we specified in the example `packages.yaml` above. This is not required, however, feel free to use other OpenMPI versions or just fully omit the `^openmpi` argument to let Spack decide.

After some installation time, preCICE will be installed in the folder `$SPACK_ROOT/opt/spack/<system-name>/<compiler-name>/` based on the compiler and the system. 

You can also view packages that are installed with  

```bash
$ spack find
autoconf@2.69    boost@1.60.0  boost@1.67.0  cmake@3.12.3   eigen@3.3.1  hwloc@1.11.9         libsigsegv@2.11  libxml2@2.9.8  ncurses@6.1     openmpi@3.1.2   perl@5.26.2    precice@working  util-macros@1.19.1  zlib@1.2.11
automake@1.16.1  boost@1.60.0  bzip2@1.0.6   diffutils@3.6  gdbm@1.14.1  libpciaccess@0.13.5  libtool@2.4.6    m4@1.4.18      numactl@2.0.11  openssl@1.0.2o  pkgconf@1.4.2  readline@7.0     xz@5.2.4
```
Note that `spack find` has several optional flags for additionally showing filepaths/compiler version/etc. , see `spack find --help` for more.
