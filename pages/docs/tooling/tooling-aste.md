---
title: Artificial Solver Testing Environment (ASTE)
permalink: tooling-aste.html
keywords: tooling, aste
---

## Motivation

ASTE is a tool which can be used to understand the dynamics of preCICE, how the data is goes in and out. It consist of C++ and Python modules.
## Installation

Please make sure that dependencies are installed.
### C++ modules
#### Required

- preCICE
- MPI
- CMake

##### Optional

- METIS

### Python modules
#### Required

- NumPy
- vtk (Visualization Toolkit)

### Building 

```bash
mkdir build
cd build
cmake ..
make
```

If precice is not installed in `$PRECICE_ROOT/build` do `cmake -DCMAKE_LIBRARY_PATH=$PRECICE_INSTALL_DIR ..` with the correct installation directory.

After building, add the `build/` directory to your `PATH`.

### on SuperMUC

Initialize environment, e.g., put in your `.bashrc`
```
# METIS for aste
module load metis
export METIS_DIR=$METIS_BASE # so that cmake finds metis
export CPLUS_INCLUDE_PATH="$METIS_BASE/include:$CPLUS_INCLUDE_PATH"
```
and execute cmake like `cmake -DCMAKE_C_COMPILER=gcc -DCMAKE_CXX_COMPILER=g++ ..` and `make`.

## Usage

## C++ modules

### preciceMap

The main tool used for mapping. 


| Flag      | Explanation                                            |
| --------- | ------------------------------------------------------ |
| -v        | Enables verbose output                                 |
| -c        | To specify preCICE config file (default="precice.xml") |
| -p        | Participant name either A or B                         |
| --runName | Name of run (default="")                               |
| --data    | Name of data array to be mapped                        |
| --mesh    | Mesh prefix                                            |
| --output  | Output filename (default=output)                       |
| --vector  | A bool switch to specify vector data (default=False)   |

Sample usage is 

```bash
preciceMap -v -p A --mesh fine_mesh/fine_mesh --data "x + y" 
```

## Python modules

### vtk_calculator.py

Reads a mesh as either `.vtk` or `.vtu` and evaluates a function given by `-f` on it. Using the `-d` flag, it can compute the difference between the mesh values and the values of the analytical solution (usually applied after a mapping).

| Flag | Explanation                                                                         |
| ---- | ----------------------------------------------------------------------------------- |
| -o   | Output meshname if it is not given data appended to input mesh                      |
| -t   | Tag for the data created (default="MyScalar")                                       |
| -it  | The tag for input data. Used in diff mode. If not given tag is used.                |
| -l   | Logging level (default="INFO")                                                      |
| -d   | Calculate the difference to present data.                                           |
| -s   | Store stats of the difference calculation as the separate file inputmesh.stats.json |


Sample usage is 

```bash
vtk_calculator.py MeshA.vtk -f x+y -t "x + y"
vtk_calculator.py MappedData.vtk x+y -t difference -it "x + y" --diff
```

### partition_mesh.py

Reads a mesh either `.vtk` or `.vtu` , partitions it and stores the parts `output_1.vtu, output_2.vtu, ...`. For partitioning, there are two algorithms available. The meshfree algorithm does not need any mesh topology information, whereas the topological algorithm needs topology information. This python module needs the C++ module `libmetisAPI.so` if the topological algorithm is used.

| Flag | Explanation                                                                                 |
| ---- | ------------------------------------------------------------------------------------------- |
| -o   | The output mesh name. (default="partitioned_mesh")                                          |
| -n   | The number of parts to split into                                                           |
| -a   | Algorithm used for determining the partitioning (options="meshfree", "topology", "uniform") |


Sample usage:

```
partition_mesh.py MeshA.vtk -a topology -n 2 -o fine_mesh
```

### join_mesh.py

Reads a partitioned mesh from a given prefix (looking for `<prefix>_<#filerank>.vtu)`) and saves it to a single `.vtk` or `.vtu` file.
Using the `-r` flag, it also recovers the connectivity information from a mesh. Notice that for recovery, partitions should contain `GlobalIDs` data.



| Flag | Explanation                                                                                           |
| ---- | ----------------------------------------------------------------------------------------------------- |
| -o   | The output mesh. Can be VTK or VTU format. If it is not given `<inputmesh>_joined.vtk` will be used." |
| -r   | The path to the recovery file to fully recover it's state.                                            |
| -n   | The number of parts to read from the input mesh. By default the entire mesh is read.                  |
| -l   | Logging level (default="INFO")                                                                        |



```bash
./join_mesh.py partitoned_mesh_directory/partitioned_mesh -r partitioned_directory -o rejoined_mesh.vtk
```

### libMetisAPI

This is a small C++ wrapper around METIS. It is only required if `partition_mesh.py` should use a topological algorithm. 



