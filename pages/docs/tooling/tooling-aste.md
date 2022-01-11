---
title: Artificial Solver Testing Environment (ASTE)
permalink: tooling-aste.html
keywords: tooling, aste
summary: "A guide to usage of artifical solver testing environment tool"
---

## Motivation

ASTE is a tool which can be used to understand the dynamics of preCICE. It is a lightweight wrapper around preCICE which allows to investigate different mapping setups in terms of both runtime and accuracy. It can be replace individual participant for development purpouses. It consist of C++ and Python modules.

## Installation

ASTE relies on following requirements

### C++ modules

#### Required modules for C++

- preCICE
- MPI
- CMake (also required for preCICE)
- vtk (Visualization Toolkit)

##### Optional modules for C++

- METIS

### Python modules

#### Required packages for python

- NumPy
- vtk (Visualization Toolkit)

Can be installed easily using pip

```bash
pip3 install numpy vtk
```

### Building

```bash
mkdir build
cd build
cmake ..
make
```

If precice is not installed in `$PRECICE_ROOT/build` do `cmake -DCMAKE_LIBRARY_PATH=$PRECICE_INSTALL_DIR ..` with the correct installation directory.

### Install on system

```bash
sudo make install
```

### on SuperMUC

Initialize environment, e.g., put in your `.bashrc`

```bash
# METIS for aste
module load metis
export METIS_DIR=$METIS_BASE # so that cmake finds metis
export CPLUS_INCLUDE_PATH="$METIS_BASE/include:$CPLUS_INCLUDE_PATH"
```

and execute cmake like `cmake -DCMAKE_C_COMPILER=gcc -DCMAKE_CXX_COMPILER=g++ ..` and `make`.

## Usage

There are some flags are common in every module here is a list of them.

| Flag     | Explanation                      |
| -------- | -------------------------------- |
| --mesh   | Mesh prefix                      |
| --data   | Name of data array to be mapped  |
| --output | Output filename (default=output) |

## Usage of C++ modules

### preciceMap

The main tool used for mapping. It is a wrapper around preCICE interface. It can be run in serial or parallel. Mapped data can be a vector or scalar.

| Flag      | Explanation                                            |
| --------- | ------------------------------------------------------ |
| -v        | Enables verbose output                                 |
| -c        | To specify preCICE config file (default="precice.xml") |
| -p        | Participant name either A or B                         |
| --runName | Name of run (default="")                               |
| --vector  | A bool switch to specify vector data (default=False)   |

Sample usage is

```bash
preciceMap -v -p A --mesh fine_mesh/fine_mesh --data "x + y" 
mpirun -n 4 -v -p A --mesh anotherMesh --data "MyData" 
```

## Usage of Python modules

### vtk_calculator.py

Reads a mesh as either `.vtk` or `.vtu` and evaluates a function given by `--function` on it. Using the `--diff` flag, it can compute the difference between the mesh values and the values of the analytical solution (usually applied after a mapping).

| Flag       | Explanation                                                                         |
| ---------- | ----------------------------------------------------------------------------------- |
| --function | The function which will be calculated on mesh                                       |
| --diffdata | The tag for difference data. Used in diff mode. If not given tag is used.           |
| --log      | Logging level (default="INFO")                                                      |
| --dir      | Output directory (optional)                                                         |
| --diff     | Calculate the difference to present data.                                           |
| --stat     | Store stats of the difference calculation as the separate file inputmesh.stats.json |

Sample usage is

```bash
vtk_calculator.py --mesh MeshA.vtk --function x+y --data "x + y"
vtk_calculator.py --mesh MappedData.vtk --function x+y --data difference --diffdata "x + y" --diff
```

### partition_mesh.py

Reads a mesh either `.vtk` or `.vtu` , partitions it and stores the parts `output_1.vtu, output_2.vtu, ...`. For partitioning, there are there algorithms available. The meshfree and uniform algorithm does not need any mesh topology information, whereas the topological algorithm needs topology information. This python module needs the C++ module `libmetisAPI.so` if the topological algorithm is used.

| Flag        | Explanation                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- |
| --directory | Output directory (optional)                                                                 |
| --numparts  | The number of parts to split into                                                           |
| --algorithm | Algorithm used for determining the partitioning (options="meshfree", "topology", "uniform") |

Sample usage:

```bash
partition_mesh.py --mesh MeshA.vtk --algorithm topology --numparts 2 --output fine_mesh --directory partitioned_mesh
```

### join_mesh.py

Reads a partitioned mesh from a given prefix (looking for `<prefix>_<#filerank>.vtu)`) and saves it to a single `.vtk` or `.vtu` file.
Using the `-r` flag, it also recovers the connectivity information from a mesh. Notice that for recovery, partitions should contain `GlobalIDs` data.

| Flag       | Explanation                                                                          |
| ---------- | ------------------------------------------------------------------------------------ |
| --recovery | The path to the recovery file to fully recover it's state.                           |
| --numparts | The number of parts to read from the input mesh. By default the entire mesh is read. |
| --log      | Logging level (default="INFO")                                                       |

```bash
./join_mesh.py --mesh partitoned_mesh_directory/partitioned_mesh --recovery partitioned_directory --output rejoined_mesh.vtk
```

### libMetisAPI

This is a small C++ wrapper around METIS. It is only required if `partition_mesh.py` should use a topological algorithm.
