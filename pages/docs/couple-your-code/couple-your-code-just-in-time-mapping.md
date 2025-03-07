---
title: Just-in-time data mapping
permalink: couple-your-code-just-in-time-mapping.html
keywords: api, adapter, mapping, meshes, just-in-time, mesh-particle coupling, DEM
summary: "You can read and write data at dynamic coordinates instead of static vertex IDs using specific optional API functions."
---

{% version 3.2.0 %}
This feature is new in preCICE version 3.2.0.
{% endversion %}

{% experimental %}
This is an experimental feature and might change in future (minor) releases of preCICE. Enable it using `<precice-configuration experimental="true">` in the preCICE configuration.
{% endexperimental %}

Just-in time data mapping combines the idea of [direct-mesh access](couple-your-code-direct-access.html) with the [conventional mapping](configuration-mapping.html) methods in preCICE: a solver does not provide a static mesh during the initialization phase, but instead defines an access region, in which vertices and data can be read and written to and from preCICE just-in-time. Using the just-in-time API (see below) of preCICE comes with performance implications: reading and writing becomes more expensive, but it gives the user more flexibility for moving meshes. The feature was originally designed with mesh-particle coupling in mind: one participant (the mesh-based participant) defines a static mesh during initialization, and the other participant (particle participant) defines a spatial access region, where data can be provided just-in-time along with the current particle position. The feature might be useful for other scenarios as well. The following sections describe the API, the configuration, and the limitations of the current implementation.

## Concept and API

Using just-in-time mapping requires small configuration changes in the preCICE configuration file and the source code of the adapter. The following configuration is an example for a just-in-time mapping configuration of an example participant called "SolverOne":

```xml
  <participant name="SolverOne">
    <receive-mesh name="ReceivedMeshName" from="SolverTwo" api-access="true" />
    <!-- data reading and writing is performed on ReceivedMeshName, which is a received mesh with api-access enabled -->
    <read-data name="Velocity" mesh="ReceivedMeshName" />
    <write-data name="Force" mesh="ReceivedMeshName" />
    <!-- define the just-in-time mapping (read-consistent) to read the velocities, note the empty "to" mesh for the read direction-->
    <mapping:nearest-neighbor direction="read" from="ReceivedMeshName" constraint="consistent" />
    <!-- define the just-in-time mapping (write-conservative) to write forces, note the empty "from" mesh for the write direction-->
    <mapping:nearest-neighbor direction="write" to="ReceivedMeshName" constraint="conservative" />
  </participant>
```

"SolverOne" defines access through just-in-time mappings in read direction for velocities and in write direction for forces. In its core, using just-in-time mappings requires three changes in the configuration file:

1. `api-access` needs to be enabled on the `receive-mesh` (similar to the direct access), "ReceivedMeshName" in our example above.
2. The `read-data` and `write-data` tags need to use the received mesh with api-access enabled.
3. The mapping only defines (depending on the direction) a "from" or a "to" mesh. For read-consistent mappings, only the "from" mesh must be defined. For write-conservative mappings, only the "to" mesh must be defined. In both cases, the defined mesh needs to match the received mesh with api-access enabled (which is also used in the `read-data` or `write-data` tag).

The API makes use of two new API functions, called `mapAndReadData` and `writeAndMapData`. Both functions are very similar to the analogous functions `readData` and `writeData`: The only difference is that the functions take spatial coordinates as function arguments instead of static vertexIDs. In addition to `mapAndReadData` and `writeAndMapData`, the access region needs to be defined by "SolverOne" using `setMeshAccessRegion`. A full code example reads as follows:

```cpp
// Note that "ReceivedMeshName" is defined and received from another participant
const std::string otherMesh = "ReceivedMeshName";

// Allocate and fill a 'boundingBox' to define an access region in our example, we use
// the unit cube. Assuming dim == 3, means that the bounding box has dim * 2 == 6
// elements.
std::vector<double> boundingBox{
    0, 1, // x-axis min and max
    0, 1, // y-axis min and max
    0, 1  // z-axis min and max
};

// Define region of interest, where we want to obtain API access.
precice.setMeshAccessRegion(otherMesh, boundingBox);

// initialize preCICE as usual:
// initializing data (requiresInitialData) before calling initialize is possible,
// but writing the initial data is not possible by construction: we first need to
// exchange the meshes before being able write data on it. However, the mesh exchange
// only happens when calling initialize
precice.initialize();

// until this point, everything was just the same as for the direct mesh access, now we
// enter the main time loop and use dedicated read and write functions
while (precice.isCouplingOngoing()) {

  // reading data requires a time stamp (relative read time) for time interpolation,
  // which we need below. We simply select here the end of the time window
  double dt = couplingInterface.getMaxTimeStepSize();

  // The just-in-time reading function: its interface is very similar to the
  // conventional readData function, only the vertexIDs are now dynamic coordinates:

  // we need a vector, where we store the data we read
  std::vector<double> velocityValue(3);
  // ... and we define the coordinates where we want to read the data just-in-time.
  // Note that the sizes need to match: we read one vectorial value and provide
  // coordinates of a three-dimensional vertex the function can be called abitrarily
  // many times and the coordinates may be anything within the access region
  std::vector<double> readCoordinates({0.1, 0.5, 0.2});
  precice.mapAndReadData(otherMesh, "Velocities", readCoordinates, dt, velocityValue);

  // compute the next timestep solution using the data read from preCICE

  // Similarly, the just-in-time writing function: here, we have the write function,
  // where only the vertexIDs are now replaced by dynamic coordinates

  // we need a vector to pass the write data
  std::vector<double> forceValue({7.3, 18.4, 27});
  // ... and we define the coordinates where we want to write the data just-in-time.
  // Note that the sizes need to match: we write one vectorial value and provide
  // coordinates of a three-dimensional vertex the function can be called abitrarily
  // many times and the coordinates may be anything within the access region
  std::vector<double> writeCoordinates({0.75, 0.2, 0.3});
  precice.writeAndMapData(otherMesh, "Forces", writeCoordinates, forceValue);

  // finally advance to the next timestep, as usual
  precice.advance(dt);
}
```

For reading data just-in-time, the `mapAndReadData` API function has an argument for where to interpolate in space (`readCoordinates`) and an argument for where to interpolate in time (`dt`).
Performing the complete interpolation for each API function call can be computationally costly.
To mitigate the computational cost, the function makes internally use of a caching mechanism:
The design assumption is that (in the solver), the outer loop iterates over the simulation time and the inner loop iterates over space.
This means that the caching works efficiently, if consecutive calls of `mapAndReadData` use the same timestamp (`dt`) argument for different coordinates (`readCoordinates`).
In contrast, the caching does not work efficiently, if we use the same coordinate argument in `mapAndReadData` for different timestamps (`dt`) (which would typically only be possible for subcycling).

As a minimal example, we consider here two timestamps `t1 = 0.25` and `t2 = 0.5` and two coordinates `x1 = {0.0 , 0.0}` and `x2 = {1.0 , 1.0}`.

**Version 1** WITH efficient caching:

```cpp
    while (precice.isCouplingOngoing()) {
        // The time window size
        double dt = couplingInterface.getMaxTimeStepSize();

        // Reading for location x1 at t1
        precice.mapAndReadData(otherMesh, "Velocities", x1, t1, velocityValue);
        // ... and we use the same t1 for the second location, reusing the caching effectively
        precice.mapAndReadData(otherMesh, "Velocities", x2, t1, velocityValue);

        // move to the next time t2 for both locations
        precice.mapAndReadData(otherMesh, "Velocities", x1, t1, velocityValue);
        precice.mapAndReadData(otherMesh, "Velocities", x2, t1, velocityValue);

        // and mark the time window as completed
        precice.advance(dt);
    }
```

**Version 2** WITHOUT efficient caching (do NOT use):

```cpp
    while (precice.isCouplingOngoing()) {
        // The time window size
        double dt = couplingInterface.getMaxTimeStepSize();

        // Reading for location x1 at t1
        precice.mapAndReadData(otherMesh, "Velocities", x1, t1, velocityValue);
        // ... and now for the same location at the next time, no caching used here
        precice.mapAndReadData(otherMesh, "Velocities", x1, t2, velocityValue);

        // complete the next x2 for both timestamps
        precice.mapAndReadData(otherMesh, "Velocities", x2, t1, velocityValue);
        precice.mapAndReadData(otherMesh, "Velocities", x2, t2, velocityValue);

        // and mark the time window as completed
        precice.advance(dt);
    }
```

Of course, both variants work with preCICE, but the resulting computational cost might be considerable different (with Version 1 being much more efficient).

A more comprehensive description of all involved API function and their arguments is given in the [API documentation](/doxygen/main/classprecice_1_1Participant.html) (see the section on just-in-time mapping). Many other configuration and code examples can be found in related [integration tests](https://github.com/precice/precice/tree/develop/tests/serial/just-in-time-mapping). Just-in-time mapping includes full support for [time interpolation](couple-your-code-waveform.html) and subcycling.

## Limitations

Just-in-time data mapping is currently only implemented for the mapping combinations read-consistent (`<mapping:... direction="read" constraint="consistent"/>`) and write-conservative (`<mapping:... direction="write" constraint="conservative"/>`). Furthermore, only the mapping types `<mapping:nearest-neighbor .../>` and `<mapping:rbf-pum-direct .../>`, and the alias `<mapping:rbf .../>` are implemented. The general configuration of other mapping attributes follows the usual [mapping convention](configuration-mapping.html), i.e., configuring a `rbf-pum-direct` mapping for a just-in-time mapping would look as follows:

```xml
    <mapping:rbf-pum-direct
      direction="read"
      from="ReceivedMeshName"
      constraint="consistent"
      vertices-per-cluster="50"
      project-to-input="off"
      polynomial="separate">
      <basis-function:compact-polynomial-c6 support-radius="1." />
    </mapping:rbf-pum-direct>
```
