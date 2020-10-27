---
title: Get the deal.II adapter
permalink: adapter-dealii-get.html
keywords: adapter, dealii, building
summary: "Use CMake to install deal.II and build the individual programs."
---

This adapter is a collection of examples of a deal.II solver adapted for preCICE. To build the adapter, we first need to get the deal.II and preCICE header files and libraries. Afterwards, we can build the adapter using CMake and we can run a tutorial.

## Get deal.II

The adapter currently requires deal.II version 9.2 or later. We also have a [separate branch for version 9.1](https://github.com/precice/dealii-adapter/tree/dealii-9.1), in case you need more time to upgrade.

You can find also [more download options on the deal.II website](https://dealii.org/download.html).

### Binary packages

deal.II is available in several Linux distribution. For example, if you are using Ubuntu, you can get the [`libdeal.ii-de`](https://packages.ubuntu.com/search?keywords=libdeal.ii-dev) package (see also the [backports ppa](https://launchpad.net/~ginggs/+archive/ubuntu/deal.ii-9.2.0-backports)):
```bash
sudo apt install libdeal.ii-dev
```

### Building from source

Get the latest release from the [deal.II repository](https://github.com/dealii/dealii) and build using CMake:
```bash
git clone https://github.com/dealii/dealii.git
mkdir build
cd build/

cmake \
    -D DEAL_II_WITH_UMFPACK="ON" \
    -D DEAL_II_WITH_THREADS="ON" \
    -D DEAL_II_COMPONENT_EXAMPLES="OFF" \
    ../dealii

make -j 4
```

The direct solvers in this examples require `UMFPACK`. The nonlinear-solver utilizes a shared-memory parallelization. We disable building the examples only to significantly reduce the building time and storage needs.


<details><summary>Click for more options...</summary>
If you want to use deal.II in production, there may be several options you may want to tune. In this case, use ccmake or check the [deal.II CMake documentation](https://www.dealii.org/9.2.0/users/cmake_dealii.html). For example:

```
cmake \
    -D CMAKE_BUILD_TYPE="DebugRelease" \
    -D CMAKE_CXX_FLAGS="-march=native \
    -D DEAL_II_CXX_FLAGS_RELEASE="-O3" \
    -D DEAL_II_WITH_UMFPACK="ON" \
    -D DEAL_II_WITH_THREADS="ON" \
    -D DEAL_II_COMPONENT_EXAMPLES="OFF" \
    -D CMAKE_INSTALL_PREFIX=/path/install/dir \
    ../dealii

make -j 4
```
</details>

Detailed installation instructions are given in the [installation section of the deal.II webpage](https://www.dealii.org/current/readme.html).

## Get preCICE

[Get preCICE](https://github.com/precice/precice/wiki/Get-preCICE), e.g. from [binary packages](https://github.com/precice/precice/releases/latest), or [build it from source](https://github.com/precice/precice/wiki/Building:-Using-CMake).

## Build the adapter

If you have deal.II and preCICE globally installed in your system and want to run a tutorial, building the adapter is as simple as `cmake . && make`:

1. Clone the repository:
   ```bash
   git clone https://github.com/precice/dealii-adapter.git
   ```
    
2. Each solver in this repository can be built independently. Therefore, get into the directory of a solver (e.g. `cd linear_elasticity/`) and configure it with
   `cmake`: 
   - If you have deal.II installed globally in your system:
   ```
   cmake .
   ```
   - If you have deal.II installed in a local directory:
   ```
   cmake -DDEAL_II_DIR=/path/to/deal.II .
   ```
    where `DEAL_II_DIR` points to your installation (not source) directory. This should be the same as the `CMAKE_INSTALL_PREFIX` you used when installing deal.II. If you have set the variable `DEAL_II_DIR` globally, you could skip it in the command above.
3. Run `make` to build the adapter.

### 2D vs 3D simulations

By default, the adapter is built as a 2D example in release mode.
If you want to run a 3D example (quasi 2D, meaning that the out-of-plane direction is clamped but we use real cells for the calculation), you can define this when configuring:
```bash
cmake -DDIM=3 .
``` 
Note that you need to run `make distclean` if you switch from one to another dimension in order to overwrite the dimension value.

### Debug vs Release mode

You can switch between debug and release mode using `make debug` or `make release`. By default, programs are build in release mode.

## Next steps

To run the deal.II codes, copy the executable and parameter file (`solver.prm`) in your target directory, e.g. `Solid/`. Afterwards, run the executable, e.g. by:
```
./nonlinear_elasticity path/to/nonlinear_elasticity.prm
``` 
Example cases can be found in the [tutorial cases for deal.II coupled with OpenFOAM](https://github.com/precice/precice/wiki/Tutorial-for-FSI-with-deal.II-and-OpenFOAM). 
{% include note.html content="The deal.II related examples have already a preconfigured parameter file, so that the parameter file doesn't need to be copied." %}
