---
title: Export configuration
permalink: configuration-export.html
keywords: configuration, export, vtk, vtu, paraview, monitoring, debugging
summary: You can export your coupling meshes to various formats. This is a great feature for debugging as you can monitor how preCICE maps and exchanges data. On this page, we explain how to configure such exporters.
---

## Enabling exporters

Configuring exporters in preCICE is really easy.
To export the meshes of `MySolver1` as `vtu`, add the following to the configuration of the participant:

```xml
<participant name="MySolver1">
    ...
    <export:vtu />
    ...
</participant>
```

This will automatically export all known meshes of `MySolver1` as `.vtu` files to the working directory of the participant.
If `MySolver1` is a serial participant, then it will create a single `.vtu` file per export and mesh.
If the solver runs in parallel, then every rank writes its local part of the mesh as a `.vtu` file in addition to a single `.pvtu` file, which allows to load the entire mesh.

Of course, this is only the data at the coupling surface. So the main purpose of this feature is to debug, not to analyze physical results.

## Structuring exports

It is generally a good idea to structure these exports giving them a directory to export to:

```xml
<participant name="MySolver1">
    ...
    <export:vtu directory="precice-exports" />
    ...
</participant>
```

This tells preCICE to write all exports to a separate directory.
The argument can be either an absolute or relative path.

## Export frequency

The following two options allow to control the frequency of exports.

* `every-n-time-windows="{integer}"`:
Use this if you want to output only every x time steps.
This is especially useful to reduce required disk space when dealing with large meshes and/or very long simulations.

* `every-iteration="true"`:
Use this if you are working with an implicit coupling scheme and are interested in the output for every coupling iteration.
Be aware that this quickly produces **a lot** of exports.

## File formats

preCICE supports various file formats to export to.
These various formats have different purposes and capabilities.

### VTK

```xml
<export:vtk />
```

The original VTK exporter exports to the legacy ASCII VTK format.
As the format only supports serial participants, it exports to parallel VTU files if needed.
Its intended use-case is to visualize coupling-meshes in Paraview.

{% note %}
For parallel participants, prefer to use the VTU exporter, introduced in 2.4.0.
{% endnote %}

### VTU

{% version 2.4.0 %}
New in version 2.4.0.
Prefer the VTU exporter over the VTK exporter for parallel simulations.
{% endversion %}

```xml
<export:vtu />
```

The VTU exporter exports to the unstructured-grid XML format of VTK, namely VTU.
Serial participants export meshes to `.vtu` files.
Parallel participants export meshes as `.vtu` piece files and additionally create a `.pvtu` file.
Use the latter file to load the entire mesh in Paraview.
Its intended use-case is the visualization of coupling-meshes in Paraview.

VTU files tend to be slightly smaller than VTP files, but the connectivity information is less readable.

### VTP

{% version 2.4.0 %}
New in version 2.4.0.
{% endversion %}

```xml
<export:vtp />
```

The VTP exporter exports to the polynomial XML format of VTK, namely VTP.
Serial participants export meshes to `.vtp` files.
Parallel participants export meshes as `.vtp` piece files and additionally create a `.pvtp` file.
Use the latter file to load the entire mesh in Paraview.
Its intended use-case is the visualization of coupling-meshes in Paraview.

VTP files tend to be slightly larger than VTU files, but the explicit connectivity information is easier to read.

### CSV

{% version 2.4.0 %}
New in version 2.4.0.
{% endversion %}

```xml
<export:csv />
```

This exporter creates CSV files containing the vertex data of the meshes.
Parallel participants will create one CSV file per rank.
These CSV files use semicolon (`;`) as a delimiter and do not contain connectivity information.

The intended use-case of the exporter is quick debugging of pure coupling-data, which may be more useful when dealing with pseudo-meshes.
It also simplifies post-processing using other software including python, R and spreadsheet applications.

The following example shows what the header of the CSV file looks like:

```xml
<data:scalar name="Temperature"/>
<data:vector name="Forces"/>

<mesh name="MyMesh1">
  <use-data name="Temperature"/>
  <use-data name="Forces"/>
</mesh>
```

The resulting header of the CSV file looks as follows:

```csv
PosX;PosY;PosZ;Rank;Temperature;ForcesX;ForcesY;ForcesZ
```

Column | Name | Description
--- | --- | ---
0 | PosX | X component of the vertex position
1 | PosY | Y component of the vertex position
2 | PosZ | Z component of the vertex position _3D only_
3 | Rank | The rank of this partition. Useful when joining all partitions.
4 | Temperature | The scalar value of `Temperature`
5 | ForcesX | X component of `Forces`
6 | ForcesY | Y component of `Forces`
7 | ForcesZ | Z component of `Forces` _3D only_

These files can be loaded and merged using python and pandas:

```py
def loadParallelCSV(name):
  import glob, pandas
  return pandas.concat([pandas.read_csv(name, sep=";") for name in glob.glob(f"{name}_*.csv")], ignore_index=True)

def loadParallelCSVSeries(name)
  import re, glob, pandas
  l = [(re.search("dt(\d+)_", s).group(1), s) for s in glob.glob(f"{name}.dt*_*.csv")]
  return pandas.concat([pandas.read_csv(file, sep=";").assign(dt=dt) for dt, file in l], ignore_index=True)

pointData       = loadParallelCSV("A-ExporterTwo.dt1")
pointDataSeries = loadParallelCSVSeries("A-ExporterTwo")
```

<br/> <!-- prevents overlap of code and header -->

## Visualization with ParaView

If you have not defined edges or triangles, the VTK/VTU/VTP files will only contain point data.
You can visualize them in ParaView using either of:

* Gaussians - A quick and easy way to visualize the vertex positions as well as scalar data.
* Glyphs - Note that more recent paraView version use as default representation 'arrows', which might be perpendicular in the 2D plane and therefore not visible by default. You might need to switch the representation.
* A `Delaunay 2D` filter to get a surface from the points. If your coupling surface is not XY-aligned, use the `best fitting plane` setting of the filter. If `Delaunay 2D` is not able to reconstruct a meaningful surface (i.e. in the case of a thin flap), `Delaunay 3D` may give a meaningful volume.
