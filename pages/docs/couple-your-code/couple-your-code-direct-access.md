---
title: Direct access to received meshes
permalink: couple-your-code-direct-access.html
keywords: api, adapter, mapping, meshes
summary: "You can access received meshes and their data directly by using specific optional API functions."
---

{% include warning.html content="These API functions are work in progress, experimental, and are not yet released. The API might change during the ongoing development process. Use with care." %}

This concept is required if you want to access received meshes directly. It might be relevant in case you don't want to use the mapping schemes in preCICE, but rather want to use your own solver for data mapping. As opposed to the usual preCICE mapping, only a single mesh (from the other participant) is now involved in this situation since an 'own' mesh defined by the participant itself is not required any more. In order to re-partition the received mesh, the participant needs to define the mesh region it wants read data from and write data to. The complete concept on the receiving participant looks as follows:

```cpp
    // Allocate a bounding-box vector containing lower and upper bounds per
    // space dimension
    std::vector<double> boundingBoxes(dim * 2);

    // fill the boundingBoxes according to the interested region ...
    // Get relevant IDs. Note that "ReceivedMeshname" is not a name of a
    // provided mesh, but a mesh defined by another participant. Accessing
    // a received mesh directly is disabled in a usual preCICE configuration.
    const int otherMeshID = precice.getMeshID("ReceivedMeshName");
    const int writeDataID = precice.getDataID("WriteDataName", otherMeshID);

    // Define region of interest, where we want to obtain the direct access.
    // See also the API documentation of this function for further notes.
    precice.setMeshAccessRegion(otherMeshID, boundingBox.data());

    // initialize preCICE as usual
    double dt = precice.initialize();

    // Get the size of the received mesh partition, which lies within the
    // defined bounding (provided by the coupling participant)
    const int otherMeshSize = precice.getMeshVertexSize(otherMeshID);

    // Now finally get the data. First allocate memory for the IDs and the
    // vertices
    std::vector<double> otherSolverVertices(otherMeshSize * dim);
    std::vector<int>    ids(otherMeshSize);
    // ... and afterwards ask preCICE to fill the vectors
    precice.getMeshVerticesAndIDs(otherMeshID,
                                   otherMeshSize,
                                   ids.data(),
                                   otherSolverVertices.data());

    // continue with time loop and write data directly using writeDataID and
    // the received ids, which correspond to the vertices
```

## Concept and API

Defining a bounding box for serial runs of the solver (not to be confused with serial coupling mode) is valid. However, a warning is raised in case vertices are filtered out completely on the receiving side, since the associated data values of the filtered vertices are filled with zero data values in order to make the 'read' operation of the other participant valid.

In order to use the feature, it needs to be enabled explicitly in the configuration file. Using the same data and mesh names as in the code example above, a corresponding configuration would be

```xml
...
<participant name="MyParticipant">
  <use-mesh name="ReceivedMeshName" from="OtherParticipant" direct-access="true" />
  <write-data name="WriteDataName" mesh="ReceivedMeshName" />
</participant>
...
```

Note that we write the data on a mesh we received and no mapping and no mesh need to be defined as opposed to the usual case. If you want to read data on a provided mesh additionally, a mesh can (and must) be provided, as usual. Note also that you probably need to reconfigure the mesh, which is used for the data exchange (`<exchange data=..`), the data acceleration and convergence measure within the coupling scheme. Minimal configuration examples can also be found in the integration tests located in the preCICE repository `precice/src/precice/tests`. All relevant test files have '`direct-access`' in the file name, e.g. `explicit-direct-access.xml`.

{% include tip.html content="A more application-oriented configuration, where both solver make use of this feature can be found in [this deal.II example](https://github.com/DavidSCN/matrix-free-dealii-precice/blob/master/tests/heat/partitioned-heat-direct-access/precice-config.xml)" %}

## Using the feature in parallel

Using the described concept in parallel computations requires some additional considerations. In particular, it is important to note that the geometric description of the domain via axis-aligned bounding-boxes is not exact. Thus, the resulting partitioning usually leads to overlapping regions between the individual rank partitions. If additional mappings on a directly accessed mesh are desired, overlapping partitions might even be necessary in order to compute the global mapping. preCICE does not know which rank finally writes data to or reads data from which vertices. Hence, preCICE performs a *sum over all data* it receives for a particular vertex. If you have overlapping regions, i.e., vertices are unique on a rank, but duplicated across all ranks, the contribution of each rank is summed up and finally passed to the other participant. It is the responsibility of the user to make sure that data is only written on a single rank or summing up data is actually desired since the data is conservative (e.g. summing up a force contribution across all ranks). An exemplary implementation of this feature, which works in parallel, is given in the [deal.II example](https://github.com/DavidSCN/matrix-free-dealii-precice/blob/master/include/adapter/arbitrary_interface.h) (a documentation of the implementation is given in the source code itself). There, a consensus algorithm, which selects the lowest rank for duplicated vertices across several ranks, is responsible for writing the data, all other ranks do not write data for the particular point.
