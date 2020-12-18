---
title: Code_Aster adapter
permalink: adapter-code_aster.html
keywords: CHT, pyprecice
summary: "On this page, we give a step-by-step guide how to get and install Code_Aster and the Code_Aster adapter. The adapter currently supports usage of Code_Aster as solid solver for conjugate heat transfer problems. We use the Python command files of Code_Aster and call the preCICE Python bindings from there."
---


## Requirements

The adapter requires at least preCICE v2.0. It was developed and tested again [Code_Aster](https://www.code-aster.org) v14.4.

Since Code_Aster works with 'command files' that include integrated python code, you will need to the python bindings of preCICE to use this adapter:
* [Get preCICE](installation-overview.html)
* [Get Python bindings of preCICE](installation-bindings-python.html)

## Get Code_Aster

This part is meant as a brief overview for those who are not yet familiar with Code_Aster. Please consult the [official documentation of Code_Aster](https://www.code-aster.org/V2/spip.php?article274) for any issues.

There are two possible ways to install the Code_Aster solver on your system:

1. The easiest and most intuitive way, is to install Salome-Meca. This is a user-friendly Code_Aster implementation, that also provides pre- and post-processing software. It can be used to create the mesh and model, and it also provides the post-processing software ParaVis.
2. The second method to install Code_Aster on your system is to download a package containing the Code_Aster source code. This grants the possibility to run the Code_Aster solver from a script, but brings about some additional complexities during installation. This implementation of Code_Aster is supported for coupling with preCICE.

To install Code_Aster, download the full package on [code-aster.org](https://www.code-aster.org/), under [download](https://www.code-aster.org/spip.php?rubrique21). It is recommended to install a stable version of Code_Aster (here 14.4).

### Dependencies

Make sure to have the [code_aster dependencies](https://www.code-aster.org/V2/spip.php?article273) installed before building code_aster.

For Ubuntu, you may install the following packages:
```bash
bison cmake make flex g++ gcc gfortran\
grace liblapack-dev libblas-dev\
libboost-numpy-dev libboost-python-dev\
python3 python3-dev python3-numpy\
tk zlib1g-dev
```

### Configuration of the build system

Extract the package. Inside it you will find a folder `SRC/` which contains the source code for Code_Aster, and all the tools that it calls.

In the `setup.cfg` file you can set the root directory of the Code_Aster installation (the path where you extracted Code_Aster), the preferred compiler, and some paths to dependencies. The latter can be a good first thing to check if the installation of Code_Aster fails due to unresolved dependencies. For this guide, we only set the `ASTER_ROOT` and leave the rest of the `setup.cfg` unchanged.

### Installation

To initiate the installation of Code_Aster, redirect the terminal to the location of the `setup.py` file, and run the following command.
```
python3 setup.py install --prefix=$ASTER_ROOT
``` 
The installation will ask you to confirm the automatically-set environment soon after it starts. Make sure that none of the dependencies listed are missing, and that there are no unexpected messages. It can happen that some optional dependencies (such as nedit, geany or gvim) are not found, this is not a problem. Once confirmed that everything is correct, you can go ahead and tell the terminal to continue the installation.

![Example of configurations before the 'installation go-ahead'](images/docs/adapter-codeaster-configurations.png)

Code_Aster and the bundled dependencies will now be built. This can take a while.
After the installation is done, check that all tools have been installed correctly. If a tool was not installed correctly, one should go through the log file, and try to run the installation again. Alternatively, a tool can be installed manually, and its home directory can be set in `setup.cfg`. In this case, make sure that the required version of the tool is installed. For Code_Aster 14.4 the bundled dependency versions are:

* hdf5 1.10.3
* med 4.0.0
* gmsh 3.0.6
* scotch 6.0.4
* astk 2019.0
* metis 5.1.0
* tfel 3.2.1
* mumps 5.1.2
* homard 11.12

![Terminal output for a successfull installation](images/docs/adapter-codeaster-success.png)

Once the solver has been installed successfully, add the following line to the bashrc (run `gedit ~/.bashrc`) and start a new session:

```
source $ASTER_ROOT/etc/codeaster/profile.sh
```

where `$ASTER_ROOT` you should replace with the actual path where you build Code_Aster. This line will make sure that once the user runs the just built Code_Aster version with the `as_run` command. If your package manager suggests to install a binary package of Code_Aster (do not install it), you may have not set the `$ASTER_ROOT` path correctly.

### Testing

We can test the installation of Code_Aster with the following command: 
```
as_run --vers=14.4 --test forma01a
```

If everything is as expected, the output should be `--- DIAGNOSTIC JOB : OK`.

!['Diagnostic OK' output after a test was run successfully](images/docs/adapter-codeaster-testing.png)


## Get the Code_Aster adapter

1. [Download the adapter code](https://github.com/precice/code_aster-adapter/archive/master.zip) or, even better, clone the repository `https://github.com/precice/code_aster-adapter.git`
2. Place the file `cht/adapter.py` in the Code_Aster directory, under `$ASTER_ROOT/14.4/lib/aster/Execution`.

## Test cases

There is a tutorial available to help you get started with coupling Code_Aster through preCICE. In this tutorial, we couple Code_Aster as a solid solver, and OpenFOAM as a fluid solver for a flow-over-plate conjugate-heat-transfer scenario. To find more about this, click [here](https://github.com/precice/code_aster-adapter/wiki/Flow-over-plate-Code_Aster-Tutorial).

## History

The adapter was implemented as part of the [master thesis of Lucia Cheung](https://www5.in.tum.de/pub/Cheung2016_Thesis.pdf) in cooperation with [SimScale](https://www.simscale.com/). For quick access: [an excerpt of Lucia's thesis focusing on the adapter](https://github.com/precice/code_aster-adapter/blob/master/cht/documentation-excerpt.pdf)
