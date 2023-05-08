---
title: Watchpoint configuration
permalink: configuration-watchpoint.html
keywords: configuration, watchpoint
summary: "With a watch point, you can track the coupling data values at a certain position over time. This is very handy for applications such as the Turek and Hron FSI3 benchmark where you want to analyze the movement of the tip of a flexible plate."
---

```xml
<participant name="MySolver1">
    <use-mesh name="MyMesh1" provide="yes"/>
    ...
    <watch-point mesh="MyMesh1" name="MyWatchPoint" coordinate="0.6; 0.2"/>
    ...
</participant>
```

This will create a logging file `precice-MySolver1-watchpoint-MyWatchPoint.log` with one row per time step.

* Only a participant that provides the respective mesh can set a watchpoint on that mesh.
* You can freely choose the name `MyWatchPoint`.
* Please note the format of `coordinate`. Here, values at (x,y)=(0.6,0.2) are tracked. The dimensions need to match the overall preCICE `dimensions` in the `solver-interface` tag, cf. the [configuration overview](Basic-Configuration#0-dimensions).
* If (0.6, 0.2) is not explicitly a vertex of `MyMesh1`, the nearest neighbor is chosen (resp. nearest projection if mesh connectivity is defined, cf. the [mapping configuration](configuration-mapping.html)).
* The dimensions of the watchpoint need to match the dimensions of the interface (2D vs. 3D).

You can plot watchpoints using gnuplot. See an [example from our tutorials](https://github.com/precice/tutorials/blob/master/perpendicular-flap/plot-displacement.sh).
