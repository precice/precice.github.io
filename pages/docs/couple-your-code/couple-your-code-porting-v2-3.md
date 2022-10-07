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

## preCICE API

- Migrate connectivity information to the vertex-only API.
  - `setMeshEdges`, `setMeshTriangles`, `setMeshQuads`, `setMeshTetrahedron` now require vertices only and don't return ids.
  - Replace `setMeshXWithEdges` with `setMeshX` calls for `Triangle` and `Quads`
  - Only define the primitives you actually need. There is no need to define edges of triangles separately.
- Remove `mapWriteDataFrom()` and `mapReadDataTo()`
- Remove `initializeData()` and initialize the data after defining the mesh and before calling `initialize()`.
- preCICE does not reset your write data to `0` any longer.

## Language bindings

- Rename Fortran function `precicef_ongoing()` to `precicef_is_coupling_ongoing()`
<!--
- Removed `precicef_write_data_required()`, `precicef_read_data_available()`, `precicef_action_required()`.
-->

## Actions

- Removed ScaleByDtAction
- Removed `isReadDataAvailable` and `isWriteDataRequired`.
- Removed timewindowsize from the `performAction` signature. The new signature is `performAction(time, data)`.


## preCICE configuration file

- Remove actions `scale-by-computed-dt-part-ratio` and `scale-by-computed-dt-ratio`.
- Remove mapping timing `on-demand`
- Replace mapping constraint `scaled-consistent` by `scaled-consistent-surface`.
- Add `<profiling mode="all" />` after the `<log>` tag if you need profiling data.
- Replace `<export:vtk />` for parallel participants with `<export:vtu />` or `<export:vtp />`.

## Profiling

- New modes for profiling data: `none`, `fundamental` (default), `all`.

## Side-changes

-
