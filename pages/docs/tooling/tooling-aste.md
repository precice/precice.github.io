---
title: Artificial Solver Testing Environment (ASTE)
permalink: tooling-aste.html
keywords: tooling, aste
summary: "A guide to usage of artifical solver testing environment (ASTE) tool"
---

## Motivation

ASTE is a tool that can be used to understand the dynamics of preCICE. It is a lightweight wrapper around preCICE which allows investigating different mapping setups in terms of both runtime and accuracy. It can replace individual participants for development purposes. It consists of C++ and Python modules.

## Installation

ASTE relies on following requirements

### C++ modules

#### Required dependencies for C++

- C++ compiler (with support for C++14, e.g. GCC version >= 5)
- preCICE (version >= 2.0)
- MPI
- CMake (version >= 3.1)
- Boost (version >= 1.65.1)
- vtk (Visualization ToolKit)

For CMake, Boost, and MPI installation, please check [preCICE Installation Guide](https://precice.org/installation-overview.html).

VTK library can be installed on Ubuntu via apt

On Ubuntu 18.04 and later,

```bash
sudo apt-get install libvtk7-dev
```

However it highly recommended usage of higher version on Ubuntu 20.04 and later.

```bash
sudo apt-get install libvtk9-dev
```

##### Optional dependencies for C++

- METIS

METIS is a graph partitioning library used for topological partitioning in a mesh partitioner.

METIS library can be installed on Ubuntu 18.04 and later via apt

```bash
sudo apt-get install libmetis-dev
```

### Python modules

#### Required packages for Python

- NumPy
- vtk (Visualization Toolkit)

Requirements can be installed easily using pip

```bash
pip3 install -r requirements.txt
```

### Building and Installation

In order to install ASTE on your system you can follow these steps:

```bash
mkdir build
cd build
cmake ..
make
sudo make install
```

## Usage Cases

There are some flags are common in every module here is a list of them.

| Flag     | Explanation          |
| -------- | -------------------- |
| --mesh   | Mesh filename/prefix |
| --data   | Name of data array   |
| --output | Output filename      |

For demo usage please check [ASTE Tutorial](https://github.com/precice/tutorials/tree/develop).

### preciceMap

The main tool used for mapping. It is a wrapper around the preCICE interface. It can be run in serial or parallel. There are two modes available, namely, mapper mode and replay mode. The first mode is used to assess mapping data from one mesh to another; later, one is mainly developed for diagnostic and adapter development purposes. In Replay mode, ASTE replicates one participant of preCICE.

| Flag          | Explanation                                                   |
| ------------- | ------------------------------------------------------------- |
| --aste-config | ASTE configuration file for replay mode                       |
| -v            | Enables verbose output                                        |
| -c            | To specify preCICE config file (default="precice-config.xml") |
| -p            | Participant name (A or B)                                     |
| --vector      | A bool switch to specify vector data (default=False)          |

Important note: For the mapper mode, `--mesh` option can be different from the one defined in the configuration file. The filename prefix should be passed. When using in mapper mode, please use `precice-config.xml` in `tests/example/precice-config.xml` and change only the required mapping method.

For example, mapping the data "x + y" from a mesh named fine_mesh in directory fine_mesh to anotherMesh and save into "mappedData" and "mappedMesh":

```bash
preciceMap -v -p A --mesh fine_mesh/fine_mesh --data "x + y" 
mpirun -n 4 -v -p B --mesh anotherMesh --data "mappedData" --output mappedMesh
```

For the Replay mode ASTE uses a configuration file in JSON format as follows

```json
{
  "participant": "Participant-Name",
  "startdt": "PreCICE mesh dt number (>= 1)",
  "meshes": [
    {
      "mesh": "Mesh name in preCICE config file",
      "meshfileprefix": "/path/to/mesh/file/with/prefix/Mesh-Participant-A",
      "read-data": {
        "vector": [
          "Vector dataname in preCICE config which has a read type"
        ],
        "scalar": [
          "Scalar dataname in preCICE config which has a read type"
        ]
      },
      "write-data": {
        "vector": [
          "Vector dataname in preCICE config which has a write type"
        ],
        "scalar": [
          "Scalar dataname in preCICE config which has a write type"
        ]
      }
    }
  ],
  "precice-config": "/path/to/precice/config/file/precice-config.xml"
}
```

The above configuration file is an example of a participant with one mesh. The user can add as many meshes as required.

### vtk_calculator.py

Reads a mesh as either `.vtk` or `.vtu` and evaluates a function given by `--function` on it. Using the `--diff` flag can compute the difference between the mesh values and the values of the analytical solution (usually applied after a mapping).

| Flag             | Explanation                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| --function       | The function which will be calculated on mesh                                       |
| --list-functions | Prints a list of predefined functions                                               |
| --diffdata       | The name for difference data. Used in diff mode. If not given, --data is used.      |
| --log            | Logging level (default="INFO")                                                      |
| --dir            | Output directory (optional)                                                         |
| --diff           | Calculates the difference between --diffdata and given function.                    |
| --stat           | Store stats of the difference calculation as the separate file inputmesh.stats.json |

There are also some predefined common interpolation functions can by specified here a list of them:

| Function   | Explanation                                                                             |
| ---------- | --------------------------------------------------------------------------------------- |
| franke     | Franke's function has two Gaussian peaks of different heights, and a smaller dip.       |
| eggholder  | A function has many local maxima. It is difficult to optimize.                          |
| rosenbrock | A function that is unimodal, and the global minimum lies in a narrow, parabolic valley. |

All function provided has 3D and 2D variants. For example, to calculate Egg-Holder function on different meshes:

```bash
vtk_calculator.py --mesh 3DMesh.vtk --function "eggholder3d" --data "EggHolder"
vtk_calculator.py --mesh 2DMeshonXY.vtk --function "eggholder2d(xy)" --data "EggHolder"
vtk_calculator.py --mesh 2DMeshonXZ.vtk --function "eggholder2d(xz)" --data "EggHolder"
vtk_calculator.py --mesh 2DMeshonYZ.vtk --function "eggholder2d(yz)" --data "EggHolder"
```

For example, calculate function "sin(x)+exp(y)" on mesh MeshA and store in "MyFunc" or calculation of difference between mapped data and function "x+y" and "MappedData" and store it in "Error":

```bash
vtk_calculator.py --mesh MeshA.vtk --function "sin(x)+exp(y)" --data "MyFunc"
vtk_calculator.py --mesh Mapped.vtk --function "x+y" --data "Error" --diffdata "MappedData" --diff
```

### partition_mesh.py

Reads a mesh either `.vtk` or `.vtu` , partitions it and stores the parts `output_1.vtu, output_2.vtu, ...`. For partitioning, there are there algorithms available. The meshfree and uniform algorithm does not need any mesh topology information, whereas the topological algorithm needs topology information. This python module needs the C++ module `libmetisAPI.so` if the topological algorithm is used.

| Flag        | Explanation                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- |
| --directory | Output directory (optional)                                                                 |
| --numparts  | The number of parts to split into                                                           |
| --algorithm | Algorithm used for determining the partitioning (options="meshfree", "topology", "uniform") |

For example, to divide a mesh into 2 parts using topological partitioning and store it in a directory:

```bash
partition_mesh.py --mesh MeshA.vtk --algorithm topology --numparts 2 --output fine_mesh --directory partitioned_mesh
```

#### libMetisAPI

This is a small C++ wrapper around METIS. It is only required if `partition_mesh.py` should use a topological algorithm.

### join_mesh.py

Reads a partitioned mesh from a given prefix (looking for `<prefix>_<#filerank>.vtu)`) and saves it to a single `.vtk` or `.vtu` file.
The `-r` flag also recovers the connectivity information from a mesh. Notice that for recovery, partitions should contain `GlobalIDs` data.

| Flag       | Explanation                                                                           |
| ---------- | ------------------------------------------------------------------------------------- |
| --recovery | The path to the recovery file to fully recover its state.                             |
| --numparts | The number of parts to read from the input mesh. By default, the entire mesh is read. |
| --log      | Logging level (default="INFO")                                                        |

For example, to join a partitioned mesh using a recovery file:

```bash
./join_mesh.py --mesh partitoned_mesh_directory/partitioned_mesh --recovery partitioned_directory --output rejoined_mesh.vtk
```
