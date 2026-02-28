---
title: Moving or changing meshes
permalink: couple-your-code-moving-or-changing-meshes.html
keywords: api, adapter, ALE, geometries, CFD
summary: "preCICE supports ALE-methods, direct-mesh-access, and pseudo-meshes to handle most scenarios of moving or changing meshes. A remeshing API is on the roadmap and being actively developped."
---

## Static reference domain

preCICE supports static meshes, meaning moving geometries can still be emulated using node displacements as described by the Arbitrary-Lagrangian-Eulerian or ALE-methods.

Note that spatially aware mapping-schemes in preCICE work in the reference domain, not the physical domain.

Examples of this method are the [perpendicular flap tutorials](tutorials-perpendicular-flap) and the [Turek-Hron FSI3 benchmark](tutorials-turek-hron-fsi3).

## Just-in-time data mapping

Instead of defining a static mesh during initialization, coordinates can be provided at runtime to read and write data at the provided coordinates using so-called [just-in-time data mappings](couple-your-code-just-in-time-mapping.md). This feature has particularly been developed for mesh-particle coupling, where one participant has a static mesh and the other participant has time-dependent coupling locations. However, it might be useful in other scenarios as well.

## Mapping inside adapter

In some cases, the mesh of a participant may fluctuate extremely between time steps or it may be unclear, where exactly sampling points are needed for following time steps.
This includes particle methods, such as the Discrete Element Method (DEM), where particle centers are often points of interest.
Directly representing them as vertices in a preCICE mesh would lead to strongly fluctuating meshes.

Another common method are overset meshes, which require moving meshes in addition to advanced mapping logic in the adapter.

For such cases, it may be the best way forward to [directly access the mesh](couple-your-code-direct-access) of the remote participant.
After defining a region of interest and initializing the participant, the adapter can receive vertex coordinates and ids included in said region.

This information gives the dynamic participant the option to manage its own mapping to/from internal solver meshes, or to generate an interpolant over the region of interest allowing to freely sample any coordinates.

See the documentation of [the direct-access feature](couple-your-code-direct-access) for more information.

## Pseudo reference domain

Under some circumstances, it may be useful to manage a pseudo-mesh in both adapters.

First, define matching meshes with a fixed amount of pseudo-coordinates $$ coord(i) = (i, 0, 0) $$ in both adapters and configure a nearest-neighbour mapping between them.

Various data types can then be converted to `double` and written as `scalar` and `vector` data to those nodes.
This can include a boolean data which encodes if a node is active or not.
The adapters can now dynamically use these nodes by writing `1.0` or `0.0` to the `active` data of the local mesh.

This method trades communication efficiency for flexibility, as data is always stored as doubles and will always be fully transferred.

```xml
<data:scalar name="active" />   <!-- Boolean 0.0 for off, 1.0 for on -->
<data:vector name="position" />
<data:scalar name="..." />      <!-- define more properties as needed -->
```

Note that inactive nodes can lead to numerical instabilities in some acceleration schemes.

## Remeshing using preCICE

{% version 3.2.0 %} This feature is new in preCICE version 3.2.0. {% endversion %}

{% experimental %}
This feature is in active development and not yet feature-complete.
If you are missing features, please check [the GitHub project](https://github.com/orgs/precice/projects/20) and comment on the issues to help us prioritize.
Enable it using `<precice-configuration experimental="true">` and do not consider the configuration to be stable yet.
{% endexperimental %}

**Goal** of the remeshing support in preCICE to allow resetting meshes at runtime.

To change a mesh dynamically at runtime, first enable remeshing in the config:

```xml
<precice-configuration experimental="true" allow-remeshing="true" />
  ...
</precice-configuration>
```

You can the reset a mesh in your participant as follows:

```python
rdata = participant.read_data(mesh, data, vertex_ids, dt)
if (my_solver_wants_to_remesh(basedon=data)):
    # reset the mesh
    participant.reset_mesh(mesh)
    # redefine the mesh
    vertex_ids = participant.set_mesh_vertices(mesh, new_coordinates)
    values.resize()

# solved the timestep based on the old data
# most likely this needs extra support from the adapter
wdata = solve(rdata)

# write data to the newly defined mesh
participant.write_data(mesh, wdata, vertex_ids, values)

# preCICE automatically handles the mesh change
participant.advance(dt)
```

This feature comes with runtime implications.
Changing a mesh changes data-mapping schemes on the local as well as the receiving participant.
This change may impact the required communication network between ranks of parallel participants.
Furthermore, the ownership of watchpoints may move between ranks of a participant.

Consequently, preCICE has to reset the majority of its internal data structures.
The cost for this is similar to calling `initialize()` on top of the cost of calling `advance()`.

This is probably impractical for solvers with meshes changing every timestep.
For such cases, [mapping inside the adapter](#mapping-inside-adapter) of the dynamic solver should the method of choice.
