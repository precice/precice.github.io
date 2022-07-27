---
title: Get the deal.II adapter
permalink: adapter-dealii-get.html
keywords: adapter, dealii, building
summary: "Use CMake to install deal.II and build the individual programs."
---

This adapter is a collection of examples of a deal.II solver adapted for preCICE. To build the adapter, we first need to get the deal.II and preCICE header files and libraries. Afterwards, we can build the adapter using CMake and we can run a tutorial.

## Get deal.II

Building the adapter requires deal.II version 9.2 or greater. You can find all [available download options on the deal.II website](https://dealii.org/download.html).

### Binary packages

deal.II is available in several Linux distributions. For example, if you are using Ubuntu, you can get the [`libdeal.ii-dev`](https://packages.ubuntu.com/search?keywords=libdeal.ii-dev) package (see also the [backports ppa](https://launchpad.net/~ginggs/+archive/ubuntu/deal.ii-9.2.0-backports)):

{% note %}
The adapter requires at least deal.II version 9.2 or greater and it depends on your Linux distribution, if the available version of the `libdeal.ii-dev` package is recent enough.
{% endnote %}

```bash
sudo apt install libdeal.ii-dev libdeal.ii-doc cmake make g++
```

{% note %}
The package libdeal.ii-doc installs the deal.II own tutorials ('steps'), which are not necessarily required for the dealii-adapter. However, they can be helpful in order to test the correct installation of the deal.II library. The following steps copy and test the `step-1` tutorial of deal.II:
{% endnote %}

```bash
cp -r /usr/share/doc/libdeal.ii-doc/examples/step-1 .
cd step-1
cmake .
make run
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

### Advanced: Building in production

If you want to use deal.II in production, there may be several options you may want to tune. In this case, use ccmake or check the [deal.II CMake documentation](https://www.dealii.org/9.2.0/users/cmake_dealii.html). For example:

```bash
cmake \
    -D CMAKE_BUILD_TYPE="DebugRelease" \
    -D CMAKE_CXX_FLAGS="-march=native" \
    -D DEAL_II_CXX_FLAGS_RELEASE="-O3" \
    -D DEAL_II_WITH_UMFPACK="ON" \
    -D DEAL_II_WITH_THREADS="ON" \
    -D DEAL_II_COMPONENT_EXAMPLES="OFF" \
    -D CMAKE_INSTALL_PREFIX=/path/install/dir \
    ../dealii

make -j 4
```

Detailed installation instructions are given in the [installation section of the deal.II webpage](https://www.dealii.org/current/readme.html).

## Get preCICE

Have a look at our [preCICE installation guide](installation-overview.html).

## Build the adapter

If you have deal.II and preCICE globally installed in your system and want to run a tutorial, building the adapter is as simple as `cmake . && make`:

1. Clone the repository and navigate to the top-level directory

   ```bash
   git clone https://github.com/precice/dealii-adapter.git && cd dealii-adapter
   ```

2. The solvers are compiled into a single executable. Configuration is carried out using `cmake`:
   - If you have deal.II and preCICE installed globally on your system:

   ```bash
   cmake .
   ```

   - If you have deal.II and preCICE installed in a local directory:

   ```bash
   cmake -DDEAL_II_DIR=/path/to/deal.II -DpreCICE_DIR=/path/to/precice .
   ```

   where `*_DIR` points to your installation (not source) directory. This should be the same as the `CMAKE_INSTALL_PREFIX` you used when installing the respective library. If you have set either of these variables globally, you could skip it in the command above.
3. Run

   ```bash
   make
   ```

   to build the adapter. This will generate the `elasticity` executable.

4. Ensure that the executable is run-time discoverable by adding it to your `PATH` variable, e.g. for bash

   ```bash
   export PATH="/path/to/the/directory/containing/elasticity:${PATH}"
   ```

{% tip %}
Our [tutorials](tutorials.html) include scripts (`run.sh`) in order to start individual cases. The deal.II adapter scripts accept an option `-e=<executable_to_run>` to locate the executable, in case it is not globally discoverable.
{% endtip %}

### 2D vs 3D simulations

By default, the adapter is built as a 2D example in release mode.
If you want to run a 3D example (quasi 2D, meaning that the out-of-plane direction is clamped but we use real cells for the calculation), you can define this when configuring:

```bash
cmake -DDIM=3 .
```

Note that you need to run `make distclean` if you switch from one to another dimension in order to overwrite the dimension value.

### Debug vs Release mode

You can switch between debug and release mode using `make debug` or `make release`. By default, programs are built in release mode.

## Next steps

To run the deal.II codes, copy the parameter file (`parameters.prm`) into your target directory, e.g. `solid-dealii/`. Afterwards, run the executable as

```bash
./elasticity path/to/parameters.prm
```

Example cases can be found in our [FSI tutorial cases](tutorials.html).
{% note %}
The deal.II related examples have already a pre-configured parameter file, so that the parameter file doesn't need to be copied.
{% endnote %}
