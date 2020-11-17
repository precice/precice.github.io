---
title: Watch Integral Configuration
permalink: configuration-watchintegral.html
keywords: configuration, watchintegral
summary: "With a watch integral, you can track the transient change of integral of a coupling data over the interface. This is especially useful when you want to track conserved quantities of your simulation, such as flow rate or total force at coupling mesh."
---
**NOTE:** Only available for preCICE version >= v2.2.0

```xml
<participant name="MySolver1"> 
    <use-mesh name="MyMesh1" provide="yes"/>
    ...
    <watch-integral mesh="MyMesh1" name="MyWatchIntegral" scale-with-connectivity="yes"/>
    ...
</participant>
```

This will create a logging file `precice-MySolver1-watchintegral-MyWatchIntegral.log` with one row per timestep. If `scale-with-connectivity` is set and there is a connectivity information, `SurfaceArea` is also going to be included as a column in the logging file. 
* Only a participant that provides the respective mesh can set a watch integral on that mesh.
* You can freely choose the name `MyWatchIntegral`.
* Coupling data can be scaled with area based on connectivity information as follows:
    * **No connectivity information:** Integral is the summation of coupling data over the mesh, no matter what `scale-with-connectivity` is.
    * **2D - Edge Connectivity:** If `scale-with-connectivity` is set `yes`, data values will be scaled using midpoint rule, i.e the average of two vertex data is taken and multiplied with corresponding edge length. Otherwise, the integral will be the same as no connectivity case.
    * **3D - Face Connectivity:** If `scale-with-connectivity` is set `yes`, data values will be scaled such that the average of three vertex data is taken and multiplied with corresponding face area. Otherwise, the integral will be the same as no connectivity case.
* Some important points for the interpretation of the integral data:
    * Integral calculation is based on weighted sum of vertex data and does not distinguish between conservative and consistent data. For example, watch integral is useful for calculating the total flow rate over the interface, or total force which are both conserved variables. However, using watch integral for stress data would not be useful since summing up total stress has no physical interpretation.
    * Scaling of the data is going to be always based on the mesh given in configuration.