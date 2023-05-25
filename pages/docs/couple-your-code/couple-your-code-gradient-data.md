---
title: Step 9 – Gradient data
permalink: couple-your-code-gradient-data.html
keywords: api, adapter, mapping, gradient, nearest-neighbor-gradient
summary: "So far, our mesh contains only data. This is sufficient for most of the numerical methods that preCICE offers. For nearest-neighbor-gradient mapping, however, preCICE also requires additional gradient data information. In this step, you learn how to add gradient data to the mesh."
---

{% version 2.4.0 %}
This feature is available since version 2.4.0.
{% endversion %}

When using `nearest-neighbor-gradient` mapping, we require coupling data and additional gradient data. We have seen in [Step 3](couple-your-code-mesh-and-data-access.html) how to write data to the mesh.
Now, we will learn how to write gradient data to the mesh.

For this purpose, we use the following API methods:

```cpp
bool isGradientDataRequired(int dataID);

void writeScalarGradientData(
    int             dataID,
    int             valueIndex,
    const double*   gradientValues);

void writeBlockScalarGradientData(
    int           dataID,
    int           size,
    const int*    valueIndices,
    const double* gradientValues);

void writeVectorGradientData(
    int             dataID,
    int             valueIndex,
    const double*   gradientValues);

void writeBlockVectorGradientData(
    int           dataID,
    int           size,
    const int*    valueIndices,
    const double* gradientValues);
```

* `isGradientDataRequired` returns a boolean, indicates if the data corresponding to the ID `dataID` requires additional gradient data.
* `writeScalarGradientData` writes gradient data corresponding to scalar data values, i.e., a vector containing the spatial derivative of a scalar quantity in each space dimension.
* `ẁriteBlockScalarGradintData` writes multiple scalar gradient data at once (analogue to `writeBlockScalarData`).
* `writeVectorGradientData` writes gradient data corresponding to vector-valued data, i.e, a Gradient matrix. The matrix is passed as a 1D-array.
* `writeBlockVectorGradintData` writes multiple vector gradient data at once (analogue to `writeBlockVectorData`)

Let's consider an example for writing block vector gradient data corresponding to the vector data `v0 = (v0x, v0y) , v1 = (v1x, v1y), ... , vn = (vnx, vny)` differentiated in spatial directions x and y.
The values are passed as following:

```cpp
( v0x_dx, v0y_dx, v0x_dy, v0y_dy,
  v1x_dx, v1y_dx, v1x_dy, v1y_dy,
  ... ,
  vnx_dx, vny_dx, vnx_dy, vny_dy  )
```

Let's add gradient data to our example code:

```cpp
precice::SolverInterface precice("FluidSolver", "precice-config.xml", rank, size); // constructor

int dim = precice.getDimensions();
int meshID = precice.getMeshID("FluidMesh");
[...]
precice.setMeshVertices(meshID, vertexSize, coords, vertexIDs);

int stressID = precice.getDataID("Stress", meshID);
double* stress = new double[vertexSize * dim];

// create gradient data
double* stressGradient = new double[vertexSize * dim * dim]
[...]
preciceDt = precice.initialize();

while (not simulationDone()){ // time loop
  precice.readBlockVectorData(displID, vertexSize, vertexIDs, displacements);
  setDisplacements(displacements);
  [...]
  solveTimeStep(dt);
  computeStress(stress);

  precice.writeBlockVectorData(stressID, vertexSize, vertexIDs, stress);

  // write gradient data
  if (isGradientDataRequired(dataID)){
    computeStressGradient(stressGradient)
    precice.writeBlockVectorGradientData(stressID, vertexSize, vertexIDs, stressGradient);
  }

  preciceDt = precice.advance(dt);
}
[...]
```

{% experimental %}
This is an experimental feature.
{% endexperimental %}

{% version 2.4.0 %}
For preCICE versions lower than 2.5.0, you need to set the flag `gradient="on"` in the configuration file, whenever you require to write gradient data. An exemplary xml configuration file is given below. Starting from preCICE version 2.5.0, the gradient requirement is automatically deduced (based on the selected mapping) and can be queried in the code, as usual. Hence, the `gradient="on"` flag must not be set in the configuration file.
{% endversion %}

For the example, you can use the following `precice-config.xml` (note the version specific information above):

```xml
<?xml version="1.0"?>

<precice-configuration>

  <solver-interface dimensions="3" experimental="on">

    <!-- the gradient flag here is only required vor preCICE version 2.4.0 -->
    <data:vector name="Stress" gradient="on"/>
    <data:vector name="Displacements" />

    <mesh name="FluidMesh">
      <use-data name="Stress"/>
      <use-data name="Displacements"/>
    </mesh>

    <mesh name="StructureMesh">
      <use-data name="Stress"/>
      <use-data name="Displacements"/>
    </mesh>

    <participant name="FluidSolver">
      <use-mesh name="FluidMesh" provide="yes"/>
      <use-mesh name="StructureMesh" from="SolidSolver"/>
      <write-data name="Stress" mesh="FluidMesh"/>
      <read-data  name="Displacements" mesh="FluidMesh"/>
      <mapping:nearest-neighbor-gradient direction="write" from="FluidMesh"
                                to="StructureMesh" constraint="consistent"/>
      <mapping:nearest-neighbor direction="read" from="StructureMesh"
                                to="FluidMesh" constraint="consistent"/>
    </participant>
    [...]
  </solver-interface>
</precice-configuration>
```
