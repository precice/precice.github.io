---
title: Porting from 2.x to 3.x
permalink: couple-your-code-porting-v2-3.html
keywords: api, adapter, version, time step, action
summary: "This guide helps you to upgrade from preCICE 2.x to preCICE 3.x."
---

<!--
Missing:
#1352
-->

{% note %}
Please add breaking changes here when merged to the `develop` branch.
{% endnote %}

## preCICE API

<!-- Split code block. See https://github.com/precice/precice.github.io/commit/74e377cece4a221e00b5c56b1db3942ec70a6272. -->
```diff
- #include "precice/SolverInterface.hpp"
+ #include "precice/precice.hpp"
  
  turnOnSolver(); //e.g. setup and partition mesh
  
- precice::SolverInterface interface("FluidSolver","precice-config.xml",rank,size); // constructor
+ precice::Participant participant("FluidSolver","precice-config.xml",rank,size); // constructor
  
- const std::string& coric = precice::constants::actionReadIterationCheckpoint();
- const std::string& cowic = precice::constants::actionWriteIterationCheckpoint();
- const std::string& cowid = precice::constants::actionWriteInitialData();
  
- int dim = interface.getDimension();
+ int dim = participant.getMeshDimensions("FluidMesh");
- int meshID = precice.getMeshID("FluidMesh");
  int vertexSize; // number of vertices at wet surface
  
  // determine vertexSize
- double* coords = new double[vertexSize*dim]; // coords of vertices at wet surface
+ std::vector<double> coords(vertexSize*dim); // coords of vertices at wet surface
  
  // determine coordinates
- int* vertexIDs = new int[vertexSize];
- precice.setMeshVertices(meshID, vertexSize, coords, vertexIDs);
- delete[] coords;
+ std::vector<int> vertexIDs(vertexSize);
+ precice.setMeshVertices("FluidMesh", coords, vertexIDs);
  
- int displID = precice.getDataID("Displacements", meshID);
- int forceID = precice.getDataID("Forces", meshID);
- double* forces = new double[vertexSize*dim];
- double* displacements = new double[vertexSize*dim];
+ std::vector<double> forces(vertexSize*dim);
+ std::vector<double> displacements(vertexSize*dim);
  
  double solverDt; // solver timestep size
  double preciceDt; // maximum precice timestep size
  double dt; // actual time step size
  
- preciceDt = interface.initialize();
  
- if(interface.isActionRequired(cowid)){
-   interface.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
-   interface.markActionFulfilled(cowid);
- }
+ if(participant.requiresInitialData()){
+   participant.writeData("FluidMesh", "Forces", vertexIDs, forces);
+ }
  
- interface.initializeData();
+ participant.initialize();
  
-  while (interface.isCouplingOngoing()){
-   if(interface.isActionRequired(cowic)){
+  while (participant.isCouplingOngoing()){
+   if(participant.requiresWritingCheckpoint()){
      saveOldState(); // save checkpoint
-     interface.markActionFulfilled(cowic);
    }
  
+   preciceDt = participant.getMaxTimeStepSize();
    solverDt = beginTimeStep(); // e.g. compute adaptive dt
    dt = min(preciceDt, solverDt);
  
-   interface.readBlockVectorData(displID, vertexSize, vertexIDs, displacements);
+   participant.readData("FluidMesh", "Displacements", vertexIDs, dt, displacements);
    setDisplacements(displacements);
    solveTimeStep(dt);
    computeForces(forces);
-   interface.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
+   participant.writeData("FluidMesh", "Forces", vertexIDs, forces);
  
-   preciceDt = interface.advance(dt);
+   participant.advance(dt);
  
-   if(interface.isActionRequired(coric)){ // timestep not converged
+   if(participant.requiresReadingCheckpoint()){
      reloadOldState(); // set variables back to checkpoint
-     interface.markActionFulfilled(coric);
    }
    else{ // timestep converged
      endTimeStep(); // e.g. update variables, increment time
    }
  }
- interface.finalize(); // frees data structures and closes communication channels
+ participant.finalize(); // frees data structures and closes communication channels
  
- delete[] vertexIDs, forces, displacements;
  turnOffSolver();
```

- The main preCICE header file was renamed. This means that you need to:
  - Replace `#include "precice/SolverInterface.hpp"` with `#include "precice/precice.hpp"`.
  - Where declaring a preCICE object, replace the `precice::SolverInterface` type with `precice::Participant`.
  - Where constructing a preCICE object, replace the `precice::SolverInterface( ... )` constructor with `precice::Participant( ... )`.
  - Consider renaming your objects from, e.g., `interface` to `participant`, to better reflect the purpose and to be consistent with the rest of the changes.
- Migrate connectivity information to the vertex-only API. All `setMeshX` methods take vertex IDs as input and return nothing.
  - Directly define face elements or cells of your coupling mesh available in your solver by passing their vectices to preCICE, which automatically handles edges of triangles etc. See [Mesh Connectivity](couple-your-code-defining-mesh-connectivity) for more information.
  - Rename `setMeshTriangleWithEdges` to `setMeshTriangle` and `setMeshQuadWithEdges` to `setMeshQuad`. The edge-based implementation was removed.
  - Use the new bulk functions to reduce sanitization overhead: `setMeshEdges`, `setMeshTriangles`, `setMeshQuads`, `setMeshTetrahedra`.
- Remove `mapWriteDataFrom()` and `mapReadDataTo()`.
- Remove `initializeData()`. The functions `initializeData()` and `ìnitialize()` have been merged into the new function `initialize()`. Before calling `ìnitialize()`, you have to initialize the mesh and the data ( if `requiresInitialData()` is `true`).
- Remove `isReadDataAvailable()` and `isWriteDataRequired()`, or replace them with your own logic if you are subcycling in your adapter.
- Remove `getMeshVertices()` and `getMeshVertexIDsFromPositions()`. This information is already known by the adapter.
- Replace `isActionRequired()` with their respective requirement clause: `requiresInitialData()`, `requiresReadingCheckpoint()` or `requiresWritingCheckpoint()`.
- Remove `precice::constants::*` and corresponding `#include` statements as they are no longer needed.
- Remove `markActionFullfiled()`. If `requiresInitialData()`, `requiresReadingCheckpoint()`, or `requiresWritingCheckpoint()` are called, then they are promised to be acted on. Therefore, `markActionFullfiled()` is no longer needed.
- Replace `isMeshConnectivityRequired` with `requiresMeshConnectivityFor`. Instead of the input argument `meshID`, pass the `meshName`.
- Replace `isGradientDataRequired` with `requiresGradientDataFor`. Instead of the input argument `dataID`, pass the `meshName` and `dataName`.
- Remove the now obsolete calls to `getMeshID()` and `getDataID()`.
- Remove `hasMesh()` and `hasData()`.
- Replace the commands to read data: `readBlockVectorData`, `readVectorData`, `readBlockScalarData`, `readScalarData` with a single command `readData`.
- Replace the commands to write data: `writeBlockVectorData`, `writeVectorData`, `writeBlockScalarData`, `writeScalarData` with a single command `writeData`.
- Replace the commands to write gradient data: `writeBlockVectorGradientData`, `writeVectorGradientData`, `writeBlockScalarGradientData`, `writeScalarGradientData` with a single command `writeGradientData`.
- Replace `getMeshVerticesAndIDs` with `getMeshVertexIDsAndCoordinates`. Change the input argument meshID to meshName.
- Change integer input argument `meshID` to a string with the mesh name in the API commands `hasMesh`, `requiresMeshConnectivityFor`, `setMeshVertex`, `getMeshVertexSize`, `setMeshVertices`, `setMeshEdge`, `setMeshEdges`, `setMeshTriangle`, `setMeshTriangles`, `setMeshQuad`, `setMeshQuads`, `setMeshTetrahedron`, `setMeshTetrahedrons`, `setMeshAccessRegion`.
- Change integer input argument `dataID` to string arguments mesh name and data name in the API commands `hasData`.
- Replace `double preciceDt = initialize()` and `double preciceDt = advance(dt)` with `initialize()` and `advance(dt)`, as they don't have a return value. If you need to know `preciceDt`, you can use `double preciceDt = getMaxTimeStepSize()`.
- Replace `getDimensions()` with either `getMeshDimensions(meshName)` or `getDataDimensions(meshName, dataName)`, depending on whether the mesh dimension or data dimension is required.

- Renamed CMake variables as follows:
  - `PRECICE_PETScMapping` -> `PRECICE_FEATURE_PETSC_MAPPING`
  - `PRECICE_MPICommunication` -> `PRECICE_FEATURE_MPI_COMMUNICATION`
  - `PRECICE_Packages` -> `PRECICE_CONFIGURE_PACKAGE_GENERATION`
  - `PRECICE_PythonActions` -> `PRECICE_FEATURE_PYTHON_ACTIONS`
  - `PRECICE_ENABLE_C` -> `PRECICE_BINDINGS_C`
  - `PRECICE_ENABLE_FORTRAN` ->`PRECICE_BINDINGS_FORTRAN`
  - `PRECICE_ENABLE_LIBBACKTRACE`  -> `PRECICE_FEATURE_LIBBACKTRACE_STACKTRACES`

### Add `relativeReadTime` for all read data calls

The previously optional argument `relativeReadTime` is now mandatory for read data calls. This requires you to update all read data calls. See [time interpolation](couple-your-code-waveform) for more details on this argument. If you don't want to use subcycling or time interpolation, you can simply get the required `relativeReadTime` by calling `double preciceDt = getMaxTimeStepSize()` call. Change:

```diff
- couplingInterface.readBlockVectorData(meshName, dataReadName, numberOfVertices, vertexIDs.data(), readData.data());
+ preciceDt = couplingInterface.getMaxTimeStepSize();
+ couplingInterface.readBlockVectorData(meshName, dataReadName, numberOfVertices, vertexIDs.data(), preciceDt, readData.data())
```

If you use subcycling, please do the following:

```diff
- couplingInterface.readBlockVectorData(meshName, dataReadName, numberOfVertices, vertexIDs.data(), readData.data());
+ preciceDt = couplingInterface.getMaxTimeStepSize();
  double dt = min(preciceDt, solverDt);
+ couplingInterface.readBlockVectorData(meshName, dataReadName, numberOfVertices, vertexIDs.data(), dt, readData.data())
```

### Remove `initializeData()` calls

The API function `initializeData()` has been removed in [#1350](https://github.com/precice/precice/pull/1350). `initialize()` now takes care of all the initialization – including data initialization. This means, you have to call `initialize()`, where you previously called `initializeData()`. Be aware that this means that you have to write initial data before calling `initialize()`. Change:

```diff
- double dt = 0;
- dt        = couplingInterface.initialize();
  std::vector<double> writeData(dimensions, writeValue);

  // Write initial data before calling initialize()
  const std::string & cowid = actionWriteInitialData();
  if (couplingInterface.isActionRequired(cowid)) {
    couplingInterface.writeVectorData(writeDataID, vertexID, writeData.data());
    couplingInterface.markActionFulfilled(cowid);
  }

  // Move initialize to the place where you called initializeData() previously.
- couplingInterface.initializeData();
+ couplingInterface.initialize();
+ double dt = couplingInterface.getMaxTimeWindowSize();
```

Typical error message that should lead you here:

```bash
error: ‘class precice::SolverInterface’ has no member named ‘initializeData’; did you mean ‘initialize’?
   63 |   couplingInterface.initializeData();
      |                     ^~~~~~~~~~~~~~
      |                     initialize
```

## preCICE configuration file

- The XML tag `<solver-interface>` was removed and all underlying functionality was moved to the `<precice-configuration>` tag. Remove the lines including `<solver-interface>` and `</solver-interface>`, and move any attributes (such as `experimental`) from the `solver-interface` to the `precice-configuration` tag. Move the `sync-mode` attribute to the new `<profiling>` tag (see below).
- The `dimensions` configuration is now defined per mesh. Move the `dimensions="2"` or `dimensions="3"` from the `<solver-interface>` tag to each `<mesh>` tag: `<mesh name="MeshOne" dimensions="3">`.
- Replace mapping constraint `scaled-consistent` with `scaled-consistent-surface`.
- Replace `<use-mesh provide="true" ... />` with `<provide-mesh ... />`, and `<use-mesh provide="false" ... />` with `<receive-mesh ... />`.
- Remove `<extraplation-order value="..." />` in `<coupling-scheme>`.
- Replace all RBF related `<mapping:rbf-... />` tags. RBF mappings are now defined in terms of the applied solver (current options `<mapping:rbf-global-direct ...`, `<mapping:rbf-global-iterative` or `<mapping:rbf-pum-direct ...`) and the applied basis function as a subtag of the solver. Users should use the additionally added auto selection of an appropriate solver, which omits the solver specification, as follows:

```xml
<mapping:rbf  ...>
  <basis-function:... />
</mapping:rbf>
```

Example:

preCICE version 2 rbf configuration:

```xml
<mapping:compact-polynomial-c0 direction="read" from= ... support-radius="0.3" />
```

corresponding preCICE version 3 rbf configuration (using the recommended auto selection):

```xml
<mapping:rbf  direction="read" from= ...>
  <basis-function:compact-polynomial-c0 support-radius="0.3" />
</mapping:rbf>
```

A specific solver should only be configured if you want to force preCICE to use and stick to a certain solver, independent of your problem size and execution.

- Renamed `<mapping:rbf... use-qr-decomposition="true" />` to `<mapping:rbf-global-direct ... > <basis-function:... /> </mapping:rbf-global-direct>`.
- Remove all timings in the mapping configuration `<mapping: ... timing="initial/onadvance/ondemand" />`.
- Remove the preallocations in the mapping configuration `<mapping: ... preallocation="tree/compute/estimate/save/off" />`.

<!--
- Add `<profiling mode="all" />` after the `<log>` tag if you need profiling data.
- Replace `<export:vtk />` for parallel participants with `<export:vtu />` or `<export:vtp />`.
-->

- Renamed the `<m2n: ... />` attributes `from` -> `acceptor` and `to` -> `connector`.

- Moved and renamed the optional attribute `<read-data: ... waveform-order="1" />` to `<data:scalar/vector ... waveform-degree="1"`.

- We dropped quite some functionality concerning [data actions](https://precice.org/configuration-action.html) as these were not used to the best of our knowledge and hard to maintain:
  - Removed deprecated action timings `regular-prior`, `regular-post`, `on-exchange-prior`, and `on-exchange-post`.
  - Removed action timings `read-mapping-prior`, `write-mapping-prior`, and `on-time-window-complete-post`.
  - Removed `ComputeCurvatureAction` and `ScaleByDtAction` actions.
  - Removed callback functions `vertexCallback` and `postAction` from `PythonAction` interface.
  - Removed timewindowsize from the `performAction` signature of `PythonAction`. The new signature is `performAction(time, data)`

- Replace `<min-iteration-convergence-measure min-iterations="3" ... />` by `<min-iterations value="3"/>`.

- We removed the plain `Broyden` acceleration. You could use `IQN-IMVJ` instead, which is a [multi-vector Broyden variant](http://hdl.handle.net/2117/191193).

## Language bindings

The renaming of the preCICE API from `SolverInterface` to `preCICE` also applies to all language bindings. The C++ header change `precice/SolverInterface.hpp` to `precice/precice.hpp` becomes:

- In C: Replace `#include "precice/SolverInterfaceC.h"` with `#include "precice/preciceC.h"` and `precicec_createSolverInterface( ... )` with `precicec_createParticipant( ... )`.
- In Julia: Replace `precicec_createSolverInterface( ... )` with `precicec_createParticipant( ... )`.
- In Matlab: Replace `SolverInterface` with `Participant` everywhere.
- In Fortran, Python: You don't need to change anything.

<!--
- Rename Fortran function `precicef_ongoing()` to `precicef_is_coupling_ongoing()`
- Removed `precicef_write_data_required()`, `precicef_read_data_available()`, `precicef_action_required()`.
-->

## Profiling

- There are three profiling modes now: `off`, `fundamental` (default), `all`.
- Add `<profiling mode="all" />` inside the `<precice-configuration>` tag if you need detailed profiling data.
- If you relied on `sync-mode="on"`, remove it from `<precice-configuration>` and add it to the profiling tag `<profiling synchronize="true" />`.
