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

- Migrate connectivity information to the vertex-only API. All `setMeshX` methods take vertex IDs as input and return nothing.
  - Directly define face elements or cells of your coupling mesh available in your solver by passing their vectices to preCICE, which automatically handles edges of triangles etc. See [Mesh Connectivity](couple-your-code-defining-mesh-connectivity) for more information.
  - Rename `setMeshTriangleWithEdges` to `setMeshTriangle` and `setMeshQuadWithEdges` to `setMeshQuad`. The edge-based implementation was removed.
  - Use the new bulk functions to reduce sanitization overhead: `setMeshEdges`, `setMeshTriangles`, `setMeshQuads`, `setMeshTetrahedra`
- Remove `mapWriteDataFrom()` and `mapReadDataTo()`.
- Remove `initializeData()` and initialize the data after defining the mesh and before calling `initialize()`.
- Remove `isReadDataAvailable()` and `isWriteDataRequired()`, or replace them with your own logic if you are subcycling in your adapter.
<!--
- preCICE does not reset your write data to `0` any longer.
-->

## preCICE configuration file

- Replace mapping constraint `scaled-consistent` with `scaled-consistent-surface`.
- Replace `<use-mesh provide="true" ... />` with `<provide-mesh ... />`, and `<use-mesh provide="false" ... />` with `<receive-mesh ... />`.

<!--
- Remove actions `scale-by-computed-dt-part-ratio` and `scale-by-computed-dt-ratio`.
- Remove mapping timing `on-demand`
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
- Removed timewindowsize from the `performAction` signature. The new signature is `performAction(time, data)`.
-->

## Profiling

<!--
- New modes for profiling data: `none`, `fundamental` (default), `all`.
-->
