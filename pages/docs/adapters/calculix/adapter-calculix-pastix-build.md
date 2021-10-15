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
    sudo make install

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

Calculix relies on ARPACK, and when built with PaStiX, we cannot rely on standard distributions of that library, because it doesn't feature 8-bytes integers by default. We need to compile it ourself. The source code can be found [here](https://www.caam.rice.edu/software/ARPACK/), or by running these commands : 

```
cd ~
wget https://www.caam.rice.edu/software/ARPACK/SRC/arpack96.tar.gz
wget https://www.caam.rice.edu/software/ARPACK/SRC/patch.tar.gz
zcat arpack96.tar.gz | tar -xvf -
zcat patch.tar.gz    | tar -xvf -

```

Before building the library, the following modifications are required : 
+ In `ARmake.inc`, change `PLAT` by the appropriate suffix (the adapter's makefile assumes INTEL)
+ In `ARmake.inc`, change the Fortran compilation flags to add `-fdefault-integer-8`. You may also need to remove the flag `-cg89`.
+ If you extracted the archive on another folder than your home repository, update `home` in `ARmake.inc` accordingly.
+ In the file `UTIL/second.f`, comment with a star the line containing `EXTERNAL ETIME`.

Once all of these are done, simply run `make lib` in the `ARPACK` folder.

## Building the adapter

To build the adapter, clone its repository and checkout the `2.17` branch : 

```
    git clone -b v2.17 https://github.com/precice/calculix-adapter
    cd calculix-adapter
```

### Fixing the code

Due to some conflicts between CalculiX, PaStiX and the adapter (both CalculiX and PaStiX have a `pastix.h` file, and neither of them is local from the point of view of the adapter), some changes are required in the CalculiX codebase. We provide a script, `pastix_pre_build.sh` that does these changes. Run it.

```
    ./pastix_pre_build.sh
```


### Compilation

To build the adapter, use the provided `Makefile_i8_PaStiX` : the regular Makefile would build the adapter without PaStiX. Assuming you followed the previous steps, it should be useable without modifications; otherwise, some paths updates could be required. Run this command in the `calculix-adapter` (and be sure to checkout the `2.17` branch) folder :


```
    make -f Makefile_i8_PaStiX -j 4 
```

Once the build is successful, the adapter should be in `./bin/ccx_preCICE`.


### Updating shared libraries

Running the adapter at this point should fail because of a missing shared library : `libparsec.so.2`. A possible fix to this is to copy it in your local library folder and run `ldconfig` : 

```
    sudo cp ~/PaStiX/parsec_i8/lib/libparsec.so.2 /usr/local/lib
    sudo ldconfig
```
