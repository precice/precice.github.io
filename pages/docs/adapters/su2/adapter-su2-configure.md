---
title: Running simulations
permalink: adapter-su2-configure.html
keywords: adapter, su2, development, modules
summary: "Modify SU2 configuration file, specify interfaces by SU2 markers, run SU2 either serial or parallel"
---

## SU2 configuration file

The adapter is turned on or off via the native SU2 configuration file. If it is turned off, SU2 executes in its original version. Moreover, the adapter is configured in the SU2 configuration file. The following adapter-related options are currently available (default values given in brackets):

1. `PRECICE_USAGE` (NO): Determines whether a preCICE-coupled simulation is run or not.
2. `PRECICE_VERBOSITYLEVEL_HIGH` (NO): Produces more output, mainly for debugging purposes.
3. `PRECICE_LOADRAMPING` (NO): Allows to linearly ramp up the load on the structural component at the beginning of the simulation. This may resolve stability issues due to large loads at the beginning of simulations.
4. `PRECICE_CONFIG_FILENAME` (precice-config.xml): Location and name of the preCICE configuration file.
5. `PRECICE_PARTICIPANT_NAME` (SU2): Name of the participant in the preCICE configuration file.
6. `PRECICE_MESH_NAME` (SU2-Mesh): Name of the mesh in the preCICE configuration file.
7. `PRECICE_READ_DATA_NAME` (Displacements): Name of the read data in the preCICE configuration file. The SU2-adapter supports reading absolute displacements and relative displacements. The adapter picks up the respective data field according to the name: 'Displacement' for absolute displacement and 'DisplacementDelta' for relative displacement. {% important %}
 Note that reading 'Displacement' data has been added for compatibility reasons with our tutorials and it cannot be used with `extrapolation` in your configuration. Only the relative `DisplacementDelta` data supports this feature.
{% endimportant %}
8. `PRECICE_WRITE_DATA_NAME` (Forces): Name of the write data in the preCICE configuration file.
9. `PRECICE_WETSURFACE_MARKER_NAME` (wetSurface): Name of the marker, which identifies the FSI interface in the geometry file of SU2.
10. `PRECICE_LOADRAMPING_DURATION` (1): Number of time steps, in which the load ramping is active, counting from the beginning of the simulation. The ramped load increases linearly with each time step.
11. `PRECICE_NUMBER_OF_WETSURFACES` (1): In case multiple FSI-interfaces exist, their count needs to specified here.

If multiple interfaces exist, the names of all related entries (`PRECICE_WETSURFACE_MARKER_NAME`, `PRECICE_READ_DATA_NAME`,`PRECICE_WRITE_DATA_NAME`, `PRECICE_MESH_NAME`) must be appended by consecutive numbers. Hence, the names (also in the geometry file) need to be alike differing only by the appending number, which must be successively increasing from zero. E.g. for three interfaces, the marker name could be defined as `PRECICE_WETSURFACE_MARKER_NAME= wetSurface` in the SU2 configuration file, while the markers in the geometry file would need to be named *wetSurface*, *wetSurface1* and *wetSurface2*.

Moreover, in the SU2 configuration file grid movement must be allowed: `GRID_MOVEMENT= YES` and the type of grid movement must be set correctly for preCICE-coupled simulations: `GRID_MOVEMENT_KIND= PRECICE_MOVEMENT`. Also, the boundary, which is allowed to move needs to be specified. Here the name of the FSI-interface marker including its appending identifying number as stated above needs to be used, e.g., `MARKER_MOVING= ( wetSurface0 )`. If multiple FSI-interfaces exist (as in the example above), this may look like `MARKER_MOVING= ( wetSurface, wetSurface1, wetSurface2 )`.

## Running the adapted SU2 executable

Since the adapter (as well as its options) is turned on or off via the SU2 configuration file, the execution procedure is just as for the original version of SU2. For execution with one process working on the fluid domain from the directory, in which both the SU2_CFD executable and the SU2 configuration file are located:

`./SU2_CFD su2ConfigurationFile.cfg`

The adapter is designed such that it can be executed in an intra-parallel manner meaning that the flow domain is decomposed into several parts. The execution is then as follows (again assuming that executable and configuration file are within the current directory; exemplifying a decomposition of the fluid domain with eight processes):

`mpirun -n 8 ./SU2_CFD su2ConfigurationFile.cfg`
