---
title: Just-in-time data mapping
permalink: couple-your-code-just-in-time-mapping.html
keywords: api, adapter, mapping, meshes, just-in-time
summary: "You can read and write data by providing dynamic coordinates instead of static vertex IDs using specific optional API functions."
---

{% version 3.2.0 %}
This feature is new in preCICE version 3.2.0.
{% endversion %}

{% experimental %}
This is an experimental feature.
{% endexperimental %}

Just-in time data mapping is related to the [Solver-based data mapping](couple-your-code-direct-access.html) in the sense that a participant doesn't need to provide a mesh.

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

    // Define region of interest, where we want to obtain the direct access.
    // See also the API documentation of this function for further notes.
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
        precice.mapAndWriteData(otherMesh, "Forces", writeCoordinates, forceValue);

        // finally advance to the next timestep, as usual
        precice.advance(dt);
    }
```

```xml
  <participant name="SolverOne">
    <receive-mesh name="ReceivedMeshName" from="SolverTwo" api-access="true" />
    <!-- data reading and writing is performed on MeshTwo, which is a received mesh with api-access enabled -->
    <read-data name="Velocities" mesh="ReceivedMeshName" />
    <write-data name="Forces" mesh="ReceivedMeshName" />
    <!-- define the just-in-time mapping (read-consistent) to read the velocities, note the empty "to" mesh for the read direction-->
    <mapping:nearest-neighbor direction="read" from="ReceivedMeshName" constraint="consistent" />
    <!-- define the just-in-time mapping (write conservative) to write forces just-in-time, note the empty "from" mesh for the write direction-->
    <mapping:nearest-neighbor direction="write" to="ReceivedMeshName" constraint="conservative" />
  </participant>
```
