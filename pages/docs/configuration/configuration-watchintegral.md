---
title: Watch integral configuration
permalink: configuration-watchintegral.html
keywords: configuration, watchintegral
summary: "With a watch integral, you can track the transient change of integral values of coupling data over complete coupling meshes. This is especially useful when you want to track conserved quantities of your simulation, such as flow rate or the overall force acting on a geometry."
---

{% important %}
This feature is only available for preCICE versions >= v2.2
{% endimportant %}

```xml
<participant name="MySolver1"> 
    <use-mesh name="MyMesh1" provide="yes"/>
    ...
    <watch-integral mesh="MyMesh1" name="MyWatchIntegral" scale-with-connectivity="yes"/>
    ...
</participant>
```

This creates a log file `precice-MySolver1-watchintegral-MyWatchIntegral.log` with one row per time window and integral values of coupling data per column. If `scale-with-connectivity` is set to `yes` and there is connectivity information defined (find out more about mesh connectivity in [step 8 of the couple-your-code section](couple-your-code-defining-mesh-connectivity.html)), surface area is included as an additional column.

* Only a participant that provides a mesh can set a watch integral on this mesh.
* You can freely choose the name `MyWatchIntegral`.
* There are two ways to calculate integral data:
  * **Calculate with scaling:** While calculating the integral values, area weighted sum of vertex data is calculated. This approach is useful when your data is not yet associated to any cell size such as a flow rate or a displacement field. In case your data is already associated with a cell size (e.g. a force acting on a cell face), this option is usually not required. Data, where a scaling is reasonable, is usually mapped `consistent` between participants.
    This option requires mesh connectivity information (edges for 2D, faces for 3D) and `scale-with-connectivity` option is set to `yes`. For 2D, edge lengths are used while for 3D face areas are used for scaling.

  * **Calculate without scaling:** The coupling data is summed up over all vertices on the coupling mesh. This is useful when your coupling data is already associated to a certain cell size (e.g. a force acting on a cell face) of your coupling mesh since no additional weighting of the coupling data is applied. Data, where a scaling is not reasonable, is usually mapped `conservative` between participants. If there is no mesh connectivity information provided, no scaling is performed to calculate the integral. If there is mesh connectivity information, you can switch of the scaling by setting `scale-with-connectivity` option to `no`.

* Some important points for the interpretation of the integral data:
  * Integral calculation is based on weighted sum of vertex data and does not distinguish between conservative and consistent data. For example, watch integral is useful for calculating the total flow rate over the interface, or total force which are both conserved variables. However, using watch integral for stress data would not be useful since summing up total stress has no physical interpretation.
  * Scaling of the data is going to be always based on the connectivity information of the mesh given in configuration. For example, in the given configuration file, `MyWatchIntegral` is defined on mesh `MyMesh1`. Each of the coupling data used by `Mesh1` is scaled with the connectivity information of `Mesh1`
  * If your solver uses a Lagrangian or ALE description please note that the scaling is based on the initial reference vertex coordinates of your geometry.
