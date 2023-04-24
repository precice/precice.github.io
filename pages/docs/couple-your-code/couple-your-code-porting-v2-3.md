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

- Migrate connectivity information to the vertex-only API. All `setMeshX` methods take vertex IDs as input and return nothing.
  - Directly define face elements or cells of your coupling mesh available in your solver by passing their vectices to preCICE, which automatically handles edges of triangles etc. See [Mesh Connectivity](couple-your-code-defining-mesh-connectivity) for more information.
  - Rename `setMeshTriangleWithEdges` to `setMeshTriangle` and `setMeshQuadWithEdges` to `setMeshQuad`. The edge-based implementation was removed.
  - Use the new bulk functions to reduce sanitization overhead: `setMeshEdges`, `setMeshTriangles`, `setMeshQuads`, `setMeshTetrahedra`
- Remove `mapWriteDataFrom()` and `mapReadDataTo()`.
- Remove `initializeData()` and initialize the data after defining the mesh and before calling `initialize()` if `requiresInitialData()` is `true`.
- Remove `isReadDataAvailable()` and `isWriteDataRequired()`, or replace them with your own logic if you are subcycling in your adapter.
- Remove `getMeshVertices()` and `getMeshVertexIDsFromPositions()`. This information is already known by the adapter.
- Replace `precice::constants::*` with `isActionRequired()` and `markActionFulfilled()` with their respective requirement clause: `requiresInitialData()`, `requiresReadingCheckpoint()` or `requiresWritingCheckpoint()`. If these requirements are checked, then they are promised to be acted on.
- Replace `isMeshConnectivityRequired` with `requiresMeshConnectivityFor`
- Replace `isGradientDataRequired` with `requiresGradientDataFor`
- Remove the now obsolete calls to `getMeshID()` and `getDataID()`.
- Change integer input argument mesh ID to a string with the mesh name in the API commands `hasMesh`, `requiresMeshConnectivityFor`, `setMeshVertex`, `getMeshVertexSize`, `setMeshVertices`, `setMeshEdge`, `setMeshEdges`, `setMeshTriangle`, `setMeshTriangles`, `setMeshQuad`, `setMeshQuads`, `setMeshTetrahedron`, `setMeshTetrahedrons`, `setMeshAccessRegion`, `getMeshVerticesAndIDs`.
- Change integer input argument data ID to string arguments mesh name and data name in the API commands `hasData`, `writeBlockVectorData`, `writeVectorData`, `writeBlockScalarData`, `writeScalarData`, `readBlockVectorData`, `readVectorData`, `readBlockScalarData`, `readScalarData`, `requiresGradientDataFor`, `writeBlockVectorGradientData`, `writeVectorGradientData`, `writeBlockScalarGradientData`, `writeScalarGradientData`.
- Replace `double preciceDt = initialize()` and `double preciceDt = advance(dt)` with `initialize()` and `advance(dt)`, as they don't have a return value. If you need to know `preciceDt`, you can use `double preciceDt = getMaxTimeStepSize()`.

### Add `relativeReadTime` for all read data calls

The previously optional argument `relativeReadTime` is now mandatory for read data calls. This requires you to update all read data calls. See [time interpolation](couple-your-code-waveform) for more details on this argument. If you don't want to use subcycling or time interpolation, you can simply get the required `relativeReadTime` by calling `double preciceDt = getMaxTimeStepSize()` call. Change:

```diff cpp
- couplingInterface.readBlockVectorData(meshName, dataReadName, numberOfVertices, vertexIDs.data(), readData.data());
+ preciceDt = couplingInterface.getMaxTimeStepSize();
+ couplingInterface.readBlockVectorData(meshName, dataReadName, numberOfVertices, vertexIDs.data(), preciceDt, readData.data())
```

If you use subcycling, please do the following:

```diff cpp
- couplingInterface.readBlockVectorData(meshName, dataReadName, numberOfVertices, vertexIDs.data(), readData.data());
+ preciceDt = couplingInterface.getMaxTimeStepSize();
  double dt = min(preciceDt, solverDt);
+ couplingInterface.readBlockVectorData(meshName, dataReadName, numberOfVertices, vertexIDs.data(), dt, readData.data())
```

### Remove `initializeData()` calls

The API function `initializeData()` has been removed in [#1350](https://github.com/precice/precice/pull/1350). `initialize()` now takes care of all the initialization – including data initialization. This means, you have to call `initialize()`, where you previously called `initializeData()`. Be aware that this means that you have to write initial data before calling `initialize()`. Change:

```diff cpp
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

- Replace mapping constraint `scaled-consistent` with `scaled-consistent-surface`.
- Replace `<use-mesh provide="true" ... />` with `<provide-mesh ... />`, and `<use-mesh provide="false" ... />` with `<receive-mesh ... />`.
- Replace `<extraplation-order value="2" />` in `<coupling-scheme>` with `<extraplation-order value="1" />` or simply remove it.
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

<!--
- Add `<profiling mode="all" />` after the `<log>` tag if you need profiling data.
- Replace `<export:vtk />` for parallel participants with `<export:vtu />` or `<export:vtp />`.
-->

- We dropped quite some functionality concerning [data actions](https://precice.org/configuration-action.html) as these were not used to the best of our knowledge and hard to maintain:
  - Removed deprecated action timings `regular-prior`, `regular-post`, `on-exchange-prior`, and `on-exchange-post`.
  - Removed action timings `read-mapping-prior`, `write-mapping-prior`, and `on-time-window-complete-post`.
  - Removed `ComputeCurvatureAction` and `ScaleByDtAction` actions.
  - Removed callback functions `vertexCallback` and `postAction` from `PythonAction` interface.
  - Removed timewindowsize from the `performAction` signature of `PythonAction`. The new signature is `performAction(time, data)`

## Language bindings

<!--
- Rename Fortran function `precicef_ongoing()` to `precicef_is_coupling_ongoing()`
- Removed `precicef_write_data_required()`, `precicef_read_data_available()`, `precicef_action_required()`.
-->

## Profiling

<!--
- New modes for profiling data: `none`, `fundamental` (default), `all`.
-->
