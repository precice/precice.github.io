---
title: Porting from 2.x to 3.x
permalink: couple-your-code-porting-v2-3.html
keywords: api, adapter, version, timestep, action
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

<!--
- Migrate connectivity information to the vertex-only API.
  - `setMeshEdges`, `setMeshTriangles`, `setMeshQuads`, `setMeshTetrahedron` now require vertices only and don't return ids.
  - Replace `setMeshXWithEdges` with `setMeshX` calls for `Triangle` and `Quads`
  - Only define the primitives you actually need. There is no need to define edges of triangles separately.
- Remove `mapWriteDataFrom()` and `mapReadDataTo()`
- Remove `initializeData()` and initialize the data after defining the mesh and before calling `initialize()`.
- preCICE does not reset your write data to `0` any longer.
-->

### Remove `initializeData()` calls

The API function `initializeData()` has been removed in https://github.com/precice/precice/pull/1350. `initialize()` now takes care of all the initialization - including data initialization. This means, you have to call `initialize()`, where you previously called `initializeData()`. Be aware that this also means that all meshes have to be defined before calling `initialize()` and that you have to write all initialize data before calling `initialize()`. Change:

```diff
  double dt = 0;
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
+ dt = couplingInterface.initialize();
```

Typical error message that should lead you here:

```
TODO
```

## preCICE configuration file

<!--
- Remove actions `scale-by-computed-dt-part-ratio` and `scale-by-computed-dt-ratio`.
- Remove mapping timing `on-demand`
- Replace mapping constraint `scaled-consistent` by `scaled-consistent-surface`.
- Add `<profiling mode="all" />` after the `<log>` tag if you need profiling data.
- Replace `<export:vtk />` for parallel participants with `<export:vtu />` or `<export:vtp />`.
-->

## Language bindings

<!--
- Rename Fortran function `precicef_ongoing()` to `precicef_is_coupling_ongoing()`
- Removed `precicef_write_data_required()`, `precicef_read_data_available()`, `precicef_action_required()`.
-->

## Actions

<!--
- Removed ScaleByDtAction
- Removed `isReadDataAvailable` and `isWriteDataRequired`.
- Removed timewindowsize from the `performAction` signature. The new signature is `performAction(time, data)`.
-->

## Profiling

<!--
- New modes for profiling data: `none`, `fundamental` (default), `all`.
-->
