---
title: Building the Calculix adapter with PaStiX (and CalculiX 2.17)
permalink: adapter-calculix-pastix-build.html
keywords: adapter, calculix, pastix
summary: "Since version 2.17, CalculiX can be built with the PaStiX library to increase performance with CUDA. Building the preCICE adapter
is somehow harder with this version. This page gives a detailed walkthrough to build the modified adapter."
---

## Overview

To build the preCICE adapter for CalculiX with PaStiX, it is first necessary to build PaStiX. A manual build is necessary for most steps, as specific compilation flags must be used for the dependencies : their standard distribution cannot be used. In particular, PaStiX (and CalculiX) must be compiled with flags to use 8 bytes integer. On this page, we provide a step-by-step build of the adapter, tested on Ubuntu 20.04. (LTS)
This should work with some modifications on other systems.

## Required packages

Make sur you have a working installation of preCICE. Also run these installation commands, (after a call to `sudo apt update` and `sudo apt upgrade`) :
`sudo apt install build-essential cmake git gfortran flex bison zlib1g-dev nvidia-cuda-toolkit-gcc libspooles-dev libyaml-cpp-dev`

nvidia-cuda-toolkit-gcc ? liblapacke-dev ? 64 ?

## Downloading CalculiX source

Build scripts assume that CalculiX' source code is in `/usr/local`. Donwload it, extract it there and add read/write access to the folder.

```
    cd /usr/local/ && sudo wget http://www.dhondt.de/ccx_2.17.src.tar.bz2
    sudo bunzip2 ccx_2.17.src.tar.bz2
    sudo tar -xvf ccx_2.17.src.tar
    sudo chmod -R a+rw /usr/local/CalculiX

```

This contains the source code of CalculiX, but also scripts useful for building some libraries below with the correct flags.

## Building PaStiX dependencies

It is assumed that all these libraries will be built on the user home folder, `~`. Minor modifications will be required otherwise.
PaStiX requires OpenBLAS, hwloc, Scotch and PaRSEC. All of these will be built before PaStiX itself.

### Building OpenBLAS

Clone OpenBLAS source code and build it with 8 bytes integers option.

```
    cd ~ 
    git clone https://github.com/xianyi/OpenBLAS.git 
    mv OpenBLAS ./OpenBLAS_i8
    cd OpenBLAS_i8 
    make -j 4 INTERFACE64=1 
    mkdir ~/OpenBLAS_i8_install
    make install PREFIX=~/OpenBLAS_i8_install

```

### Building hwloc

This library will be put in a subfolder of the PaStiX folder.
```
    mkdir -p ~/PaStiX/ 
    cd ~/PaStiX/ 
    wget https://download.open-mpi.org/release/hwloc/v2.1/hwloc-2.1.0.tar.bz2
    bunzip2 hwloc-2.1.0.tar.bz2 && tar -xf hwloc-2.1.0.tar
    sudo cp /usr/local/CalculiX/ccx_2.17/src/make_hwloc.sh ~/PaStiX/hwloc-2.1.0/make_hwloc.sh
    cd hwloc-2.1.0
    ./configure --prefix=$HOME/PaStiX/hwloc_i8 CC=gcc CXX=g++
    make -j8
    make install


```

### Building PaRSEC

```
    cd ~/PaStiX && git clone -b pastix-6.0.2 --single-branch https://bitbucket.org/mfaverge/parsec.git
    cd parsec
    cp /usr/local/CalculiX/ccx_2.17/src/make_parsec.sh ~/PaStiX/parsec
    ./make_parsec.sh

```

### Building Scotch 

```
    cd ~/PaStiX
    wget https://gforge.inria.fr/frs/download.php/file/38114/scotch_6.0.8.tar.gz
    tar -xf scotch_6.0.8.tar.gz
    cp /usr/local/CalculiX/ccx_2.17/src/make_scotch.sh ~/PaStiX/scotch_6.0.8
    cd scotch_6.0.8
    ./make_scotch.sh

```


## Building PaStiX

```
    git clone https://github.com/Dhondtguido/PaStiX4CalculiX 
    mv PaStiX4CalculiX pastix_src
    cd pastix_src
    rm make_pastix.sh
    cp /usr/local/CalculiX/ccx_2.17/src/make_pastix.sh .
    ./make_pastix.sh

```

The github repository contains a `make_pastix.sh` file; be sure to use the one in the CalculiX folder and not this one !

### Troubleshooting

- On some occasions, a Python script called by CMake generates an incorrect Makefile because of errors in regular expressions. (The script being `cmake_modules/morse_cmake/modules/precision_generator/genDependencies.py`) This should be fixed by calling `pip install regex` (which requires installing the `python3-pip` Ubuntu package). You may also need to replace the `import re` line in that script by `import regex as re`, but the necessity seems to fluctuate among different machines.
- Some parts of the code require older versions of the GNU compilers. You may have to replace `gcc` by `gcc-7` and similarly for `g++` and `gfortran` in the `make_pastix.sh` script. This requires installing the relevant Ubuntu packages.

## Building ARPACK, a CalculiX dependency

- PLAT=INTEL
- FFLAGS : -fdefault-integer-8
- Home path
- Comment cg89 ?
- UTIL/second.f
- make lib

## Building the adapter

TODO : adapt makefile

### Fixing the code

### Updating shared libraries


## Start here

1. [Get CalculiX and the dependencies](adapter-calculix-get-calculix.html)
2. [Build the Adapter](adapter-calculix-get-adapter.html)
3. [Configure and run simulations](adapter-calculix-config.html)
4. Follow a tutorial:
   * [Tutorial for CHT with OpenFOAM and CalculiX](https://github.com/precice/precice/wiki/Tutorial-for-CHT-with-OpenFOAM-and-CalculiX): Flow in a shell-and-tube heat exchanger
   * [Tutorial for FSI with OpenFOAM and CalculiX](https://github.com/precice/precice/wiki/Tutorial-for-FSI-with-OpenFOAM-and-CalculiX): Flow in a channel with an elastic flap, either perpendicular, or parallel to the flow and attached to a cylinder.
   * [Tutorial on structure-structure coupling](https://github.com/precice/precice/wiki/Tutorial-for-SSI-with-CalculiX): Elastic beam artificially cut into two halves.

Are you encountering an unexpected error? Have a look at our [Troubleshooting](adapter-calculix-troubleshooting.html) page.

Do you Want to build on a cluster? Look at our [instructions for SuperMUC](adapter-calculix-supermuc.html) (outdated).

## Versions

Please check the [Calculix adapter README](https://github.com/precice/calculix-adapter/blob/master/README.md) for the newest compatible CalculiX version.

Adapters for older versions of CalculiX and preCICE are available in various branches. Branches compatible with **preCICE v2.x:**

* master
* v2.15_preCICE2.x

All other branches are compatible with **preCICE v1.x**.

## History

The adapter was initially developed for conjugate heat transfer (CHT) simulations via preCICE by Lucia Cheung in the scope of her master’s thesis [[1]](https://www5.in.tum.de/pub/Cheung2016_Thesis.pdf) in cooperation with [SimScale](https://www.simscale.com/). For running the adapter for CHT simulations refer to this thesis. The adapter was extended to fluid-structure interaction by Alexander Rusch [[2]](https://www.gacm2017.uni-stuttgart.de/registration/Upload/ExtendedAbstracts/ExtendedAbstract_0138.pdf).

## References

[1] Lucia Cheung Yau. Conjugate heat transfer with the multiphysics coupling library precice. Master’s thesis, Department of Informatics, Technical University of Munich, 2016.

[2] Benjamin Uekermann, Hans-Joachim Bungartz, Lucia Cheung Yau, Gerasimos Chourdakis and Alexander Rusch. Official preCICE Adapters for Standard Open-Source Solvers. In Proceedings of the _7th GACM Colloquium on Computational Mechanics for Young Scientists from Academia_, 2017.
