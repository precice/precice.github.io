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
This is an experimental feature.
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

At its core, the API now makes use of two new API functions, called `mapAndReadData` and `writeAndMapData`. Both functions are very similar to the analogous functions `readData` and `writeData`: the only difference is that the functions take spatial coordinates as function arguments instead of static vertexIDs stemming from the preCICE initialization. In addition to `mapAndReadData` and `writeAndMapData`, the access region needs to be defined by "SolverOne" using `setMeshAccessRegion`. The full code example reads the following:

```cpp
    // Note that "ReceivedMeshName" is defined and received
    // from another participant
    const std::string otherMesh = "ReceivedMeshName";

    // Allocate and fill a 'boundingBox' to define an access region
    // in our example, we use the unit cube.
    // Assuming dim == 3, means that the bounding box has
    // dim * 2 == 6 elements.
    std::vector<double> boundingBox {
        0, 0, 0, // minimum corner
        1, 1, 1 // maximum corner
    };

    // Define region of interest, where we want to obtain API access.
    precice.setMeshAccessRegion(otherMesh, boundingBox);

    // initialize preCICE as usual
    // initializing data (requiresInitialData) before calling initialize is not possible, as we first need to exchange the
    // meshes before being able to access the mesh
    precice.initialize();

    // until this point, everything was just the same as for
    // the direct mesh access, now we enter the main time loop
    // and use dedicated read and write functions
    while (precice.isCouplingOngoing()) {

        // reading data requires a time stamp (relative read
        // time) for time interpolation, which we need below
        // we simply select here the end of the time window
        double dt = couplingInterface.getMaxTimeStepSize();

        // The just-in-time reading function: its interface
        // is very similar to the conventional readData
        // function, only the vertexIDs are now dynamic
        // coordinates:

        // we need a vector, where we store the data we read
        std::vector<double> velocityValue(1);
        // ... and we define the coordinates where we want to
        // read the data just-in-time. Note that the sizes
        // need to match: we read one scalar value and provide
        // coordinates of a three-dimensional vertex
        // the function can be called abitrarily many times
        // and the coordinates may be anything within the
        // access region
        std::vector<double> readCoordinates({0.1, 0.5, 0.2});
        precice.mapAndReadData(otherMesh, "Velocities", readCoordinates, dt, velocityValue);

        // compute the next timestep solution using the data
        // read from preCICE

        // Similarly, the just-in-time writing function: here,
        // we have the write function, where only the vertexIDs
        // are now replaced by dynamic coordinates

        // we need a vector to pass the write data
        std::vector<double> forceValue({7.3});
        // ... and we define the coordinates where we want to
        // write the data just-in-time. Note that the sizes
        // need to match: we write one scalar value and provide
        // coordinates of a three-dimensional vertex
        // the function can be called abitrarily many times
        // and the coordinates may be anything within the
        // access region
        // however,
        std::vector<double> writeCoordinates({0.75, 0.2, 0.3});
        precice.writeAndMapData(otherMesh, "Forces", writeCoordinates, forceValue);

        // finally advance to the next timestep, as usual
        precice.advance(dt);
    }
```

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
