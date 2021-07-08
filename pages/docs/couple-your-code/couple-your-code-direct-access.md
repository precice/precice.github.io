---
title: Accessing received meshes directly
permalink: couple-your-code-direct-access.html
keywords: api, adapter, mapping, meshes
summary: "This concept is required if you want to access received meshes without a preCICE mapping. The API functions offer access to the data location of the received mesh as well as read and write access to the data itself. "
---

{% include warning.html content="These API functions have been recently added and are experimental. The API might change during the ongoing development process." %}

This concept is required if you want to access received meshes directly. It might be relevant in case you don't want to use the preCICE own mappings, but rather want to use your own solver for data mapping. As opposed to the usual preCICE mapping, only a single mesh (from the other participant) is now involved in this situation since an 'own' mesh defined by the participant itself is not required any more. In order to re-partition the receiving interface mesh, the participant needs to define the mesh region it wants read data from and write data to. The complete concept on the receiving participant looks as follows:

```cpp
    // Allocate a bounding-box vector containing lower and upper bounds per
    // space dimension
    std::vector<double> boundingBoxes(dim * 2 * nBoundingBoxes);

    // fill the boundingBoxes according to the interested region ...
    // Get relevant IDs. Note that "ReceivedMeshname" is not a name of a
    // provided mesh, but a mesh defined by another participant. This
    // behavior is disabled in a usual precice configuration.
    const int otherMeshID = precice.getMeshID("ReceivedMeshname");
    const int writeDataID = precice.getDataID("WriteDataName", otherMeshID);

    // Define region of interest, where we want to obtain the direct access.
    // Currently, only a single bounding box can be defined (nBoundingBoxes
    // must be equal to one), an assertion is thrown otherwise.
    precice.setBoundingBoxes(otherMeshID, boundingBox.data(), nBoundingBoxes);

    // initialize preCICE as usual
    double dt = precice.initialize();

    // Get the size of the received mesh partition, which lies within the
    // defined bounding (provided by the coupling participant)
    const int otherMeshSize = precice.getMeshVertexSize(otherMeshID);

    // Now finally get the data. First allocate memory for the IDs and the
    // vertices
    std::vector<double> otherSolverMesh(otherMeshSize * dim);
    std::vector<int>    ids(otherMeshSize);
    // ... and afterwards ask preCICE to fill the vectors
    precice.getMeshVerticesWithIDs(otherMeshID,
                                   otherMeshSize,
                                   ids.data(),
                                   otherSolverMesh.data());

    // continue with time loop and write data directly using writeDataID and
    // the received ids, which correspond to the vertices
```

Defining a bounding box for serial runs of the solver (not to be confused with serial coupling mode) is valid. However, a warning is raised in case vertices are filtered out completely on the receiving side, since the associated data values of the filtered vertices are filled with zero data values in order to make the 'read' operation of the other participant valid.

In order to use the feature, it needs to be enabled explicitly in the configuration file. Using the same data and mesh names as in the code example above, a corresponding configuration would be
```xml
...
<participant name="MyParticipant">
  <use-mesh name="ReceivedMeshname" from="OtherParticipant" direct-access="true" />
  <write-data name="WriteDataName" mesh="ReceivedMeshname" />
</participant>
...
```
Note that we write the data on a mesh we received and no mapping and no mesh need to be defined as opposed to the usual case. If you want to read data on a provided mesh additionally, a mesh can (and must) be provided, as usual. Note also that you probably need to adjust the mesh, which is used for the data exchange (`<exchange data=..`), the data acceleration and convergence measure within the coupling scheme. Minimal configuration examples can also be found in the integration tests located in the preCICE repository `precice/src/precice/tests`. All relevant test files have '`direct-access`' in the file name, e.g. `explicit-direct-access.xml`.
