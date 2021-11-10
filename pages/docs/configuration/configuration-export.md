---
title: Exports configuration
permalink: configuration-export.html
keywords: configuration, export, vtk, vtu, paraview
summary: You can export your coupling meshes to .vtk (leagcy) or .vtu (XML). This is a great feature for debugging. On this page, we explain how.
---

Well, it's easy. Just write ...

```xml
<participant name="MySolver1"> 
    <use-mesh name="MyMesh1" provide="yes"/>
    ...
    <export:vtk directory="preCICE-output" />
    ...
</participant>
```

With `directory`, you can give an extra folder to write the VTK/VTU files to, relative to the location from where you start the participant. preCICE writes output for every `use-mesh` separately.

Of course, this is only the data at the coupling surface. So the main purpose of this feature is to debug, not to analyze physical results.

Optional parameters:

* `every-n-time-windows="{integer}"`: Use this if you want to output only every x timesteps
* `every-iteration="true"`: Use this if you want output for every coupling iteration (for an implicit coupling scheme)

## Visualization with ParaView

If you have not defined edges or triangles, the VTK/VTU files will only contain point data. You can visualize them in ParaView using either of:

* Glyphs - Note that more recent paraView version use as default representation 'arrows', which might be perpendicular in the 2D plane and therefore not visible by default. You might need to switch the representation.
* A `Delaunay 2D` filter to get a surface from the points. If your coupling surface is not XY-aligned, use the `best fitting plane` setting of the filter. If `Delaunay 2D` is not able to reconstruct a meaningful surface (i.e. in the case of a thin flap), `Delaunay 3D` may give a meaningful volume.
