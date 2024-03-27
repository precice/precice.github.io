---
title: The DuMuX adapter
permalink: adapter-dumux.html
keywords: DuMuX, porous media, C++
summary: "a DuMuX-specific adapter to couple to other codes using preCICE"
---

## Installation

The DuMuX-preCICE adapter is a DUNE module named `dumux-precice` which can be build using the [DUNE build system](https://www.dune-project.org/doc/installation/). The DUNE build system is build on top of CMake and comes with various tools that make installation and management of DUNE modules easier. Therefore, it is recommended to install `dumux-precice` using `dunecontrol`. Please check out the [DUNE installation instructions](https://www.dune-project.org/doc/installation/) to get an overview over the `dunecontrol` tools and how DUNE modules work.

### Prerequisites

- DuMuX **newer** than 3.7

    - Builds using the current `master` branch of DuMuX might fail.
    - If you run into trouble with a new DuMuX release, please open an issue in the repository and add the error message that you receive.
    - Needs UMFPack (available via SuiteSparse) as solver for linear systems of equations. This is needed to run the examples included in the adapter. Otherwise you can skip UMFPack.

- preCICE >=3.0.0

    - The adapter is build via the DUNE build system that is based on CMake. Thus, the CMake [link instructions for preCICE](https://precice.org/installation-linking.html#cmake) apply.

- `wget` or `git` to download the DuMuX-preCICE adapter.
- Optional: [`dune-subgrid`](https://www.dune-project.org/modules/dune-subgrid/) allows for modified grid geometries.
- Optional: [MkDocs](https://www.mkdocs.org/) if one wants to build the user documentation locally. The user documentation can also be found in the `doc/user/docs/` directory and is spread over several Markdown files.
- Optional: [Doxygen](https://www.doxygen.nl/) if one wants to build the API documentation locally.

The DuMuX-preCICE adapter should build fine if DuMuX, preCICE and their dependencies are installed.

### Detailed installation steps

1. Install [DuMuX](https://dumux.org/) and the needed dependencies. The easiest way is to follow [DuMuX's installation instructions](https://dumux.org/installation/). The DuMuX project provides a script that installs and DuMuX and the DUNE modules required by DuMuX. This means, after installing DuMuX via the provided script you should be good to go to use the DuMuX-preCICE adapter.

    After the installation you should have a root directory that contains the base DUNE modules, i.e. a  number of directories named like `dune-common`, `dune-geometry` etc., and a directory called `dumux`.

    - Note that extended features of DuMuX or the DuMuX-preCICE adapter may need additional DUNE modules.

2. Download the DuMuX-preCICE adapter to the same directory as the DUNE modules and the `dumux` folder. It is recommended to use the latest release of the adapter, which can be found by checking out the relevant release tag.

    ```text
    git clone -b v2.0.0 https://github.com/precice/dumux-adapter.git
    ```

    You can also try to clone the repository via SSH:

    ```text
    git clone -b v2.0.0 git@github.com:precice/dumux-adapter.git
    ```

3. Verify that the `dumux-adapter` folder is in the same directory as the DUNE module folders and the `dumux` folder.

4. Build and configure the adapter using `dunecontrol`. While being in the directory mentioned in the previous step via calling

    ```text
    ./dune-common/bin/dunecontrol --only=dumux-precice all
    ```

    After the build and configure step a new directory `build-cmake` was created inside the `dumux-precice` directory.

    You can configure the build and configuration process using advanced options by manipulating CMake variables. `dunecontrol` allows to pass an options file for that

    ```bash
    ./dune-common/bin/dunecontrol --opts=OPTSFILE.opts --only=dumux-precice all
    ```

    There is an `opts`-file provided by the adapter that resides in `test/`. You can use it as

    ```bash
    ./dune-common/bin/dunecontrol --opts=dumux-precice/test/cmake-test.opts --only=dumux-precice all
    ```

    This provided `cmake-test.opts` file turns off some system-dependent optimizations such that the tests create comparable results on different computers.

    For more ways do manipulate/adapt the build and configuration step, please consult the `dunecontrol` documentation.

5. Optional, but recommended: Build all tests to verify the installation. For this navigate in the `build-cmake/` directory and build the `build_tests` target.

    ```bash
    cd dumux-adapter/build-cmake
    make -j1 build_tests
    ```

    You may speed up the build process by using more than one build job, e.g., use `make -j4` in order to build with for processes at the same time.

    Afterwards you can run the tests from the `build-cmake` directory using

    ```bash
    ctest
    ```

    If any tests fails, you should verify if something went wrong with the installation.

There are advanced ways of managing DUNE modules, e.g. using the environment variable `DUNE_CONTROL_PATH`, that are beyond the scope of this short documentation. You can find more information in the [DUNE FAQ](https://www.dune-project.org/doc/installation/#faq).

## Documentation

### User documentation

The main user documentation is currently not available on an online service, but can be found in the `docs/user/docs` directory. Additionally, one may find interesting information in the API documentation (see below) as well as the test and example cases that are provided with this repository. If something is unclear or you would want something to be documented better, please open an [issue](https://github.com/precice/dumux-adapter/issues) and let us know.

### API documentation

The interface of the coupling adapter and also the internal (private) interface are documented using Doxygen. In order to build this documentation you need [Doxygen](https://www.doxygen.nl/index.html) installed. After configuring the project using CMake/`dunecontrol` you can build the documentation via navigating to the `build-cmake` directory and building the `doxygen_dumux-precice` target, i.e.,

```text
cd build-cmake
make doxygen_dumux-precice
```

This generates a HTML documentation which you can view in a browser of your choice. It is stored in `build-cmake/doc/doxygen/index.html`.

## Publications

### How to cite this code

There is no publication related to this code available yet.

### Publications using dumux-precice

- Jaust A., Weishaupt K., Mehl M., Flemisch B. (2020) Partitioned Coupling Schemes for Free-Flow and Porous-Media Applications with Sharp Interfaces. In: Klöfkorn R., Keilegavlen E., Radu F., Fuhrmann J. (eds) Finite Volumes for Complex Applications IX - Methods, Theoretical Aspects, Examples. FVCA 2020. Springer Proceedings in Mathematics & Statistics, vol 323. Springer, Cham. <https://doi.org/10.1007/978-3-030-43651-3_57>
