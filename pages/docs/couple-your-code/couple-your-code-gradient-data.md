---
title: Step 9 – Gradient data 
permalink: couple-your-code-gradient-data.html
keywords: api, adapter, mapping, gradient
summary: "So far, our mesh contains only data. This is sufficient for most of the numerical methods that preCICE offers. For nearest-neighbor-gradient mapping, however, preCICE also requires additional gradient data information. In this step, you learn how to add gradient data to the mesh."
---

{% version 2.4.0 %}
This feature is available since version 2.4.0.
{% endversion %}

When using `nearest-neighbor-gradient` mapping, we require coupling data and additional gradient data. We have seen in [Step 3](couple-your-code-mesh-and-data-access.html) how to write data to the mesh. 
Now, we will learn how to write gradient data to the mesh.

For this purpose, we use the following API methods: 

```cpp
bool isDataGradientRequired(int dataID);

void writeScalarGradientData (
    int             dataID,
    int             valueIndex,
    const double*   gradientValues  );

void writeBlockScalarGradientData (
      int           dataID,
      int           size,
      const int*    valueIndices,
      const double* gradientValues  );
      
void writeVectorGradientData (
    int             dataID,
    int             valueIndex,
    const double*   gradientValues,
    bool            rowsFirst = false );

void writeBlockVectorGradientData (
      int           dataID,
      int           size,
      const int*    valueIndices,
      const double* gradientValues,
      bool          rowsFirst = false );
```

* `isDataGradientRequired` returns a boolean, indicates if the data corresponding to the ID `dataID` has gradient data.
* `writeScalarGradientData` writes scalar-valued gradient data, derived in each spatial dimension to the coupling data structure.
* `ẁriteBlockScalarGradintData` writes multiple scalar gradient data at once, for performance reasons.
* `writeVectorGradientData` writes vector-valued gradient data to the coupling data structure. The matrix is entered as a 1D-array of each component differentiated first. The parameter `rowsFirst` allows to write the values of the matrix, such as the components are differentiated in the spatial dimensions first.
* `ẁriteBlockVectorGradintData` writes multiple vector gradient data at once, for performance reasons.

Let's consider an example for writing block vector gradient data corresponding to the vector data `v0 = (v0x, v0y) , v1 = (v1x, v1y), ... , vn = (vnx, vny)` differentiated in spatial directions x and y.
Per default, the values are passed as following:
 
``` 
( v0x_dx, v0x_dy, v0y_dx, v0y_dy,
  v1x_dx, v1x_dy, v1y_dx, v1y_dy,
  ... ,
  vnx_dx, vnx_dy, vny_dx, vny_dy  )  
```

When using the `rowsFirst` parameter, the following format is required:

```
( v0x_dx, v0y_dx, v1x_dx, v1y_dx, ... , vnx_dx, vny_dx,
  v0x_dy, v0y_dy, v1x_dy, v1y_dy, ... , vnx_dy, vny_dy  )
```

{% note %}
Gradient data must be added to an existing data ID. Therefore, we must create data first, then the corresponding gradient data.
{% endnote %}

Let's define access coupling data and gradient data in our example code:

```cpp
turnOnSolver(); //e.g. setup and partition mesh 

precice::SolverInterface precice("FluidSolver","precice-config.xml",rank,size); // constructor

// set mesh elements
int dim = precice.getDimensions();
int meshID = precice.getMeshID("FluidMesh");
int vertexSize; // number of vertices at wet surface 

// determine vertexSize
double* coords = new double[vertexSize*dim]; // coords of coupling vertices 
// determine coordinates
int* vertexIDs = new int[vertexSize];
precice.setMeshVertices(meshID, vertexSize, coords, vertexIDs); 
delete[] coords;

// create data first
int displID = precice.getDataID("Displacements", meshID); 
int forceID = precice.getDataID("Forces", meshID); 
double* forces = new double[vertexSize*dim];
double* displacements = new double[vertexSize*dim];

// create gradient data 
double* forces_gradient = new double[vertexSize*dim*dim]

double dt; // solver timestep size
double precice_dt; // maximum precice timestep size

precice_dt = precice.initialize();
while (not simulationDone()){ // time loop
        precice.readBlockVectorData(displID, vertexSize, vertexIDs, displacements);
  setDisplacements(displacements);
  dt = beginTimeStep(); // e.g. compute adaptive dt 
  dt = min(precice_dt, dt);
  solveTimeStep(dt);
  computeForces(forces);
  
  precice.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
  
  // write gradient data
  if (isGradientDataRequired(dataID)){
    precice.writeBlockVectorGradientData(forceID, vertexSize, vertexIDs, forces_gradient); 
  }
  
  precice_dt = precice.advance(dt);
  endTimeStep(); // e.g. update variables, increment time
}
precice.finalize(); // frees data structures and closes communication channels
delete[] vertexIDs, forces, displacements;
turnOffSolver();
```

{% experimental %}
This is an experimental feature.
{% endexperimental %}

As a last step, you need to set the flag `gradient="on"` in the configuration file, whenever you require to write gradient data.

For the example, you can use the following `precice-config.xml`:

```xml
<?xml version="1.0"?>

<precice-configuration>

  <solver-interface dimensions="3">

    <data:vector name="Forces" gradient="on"/>
    <data:vector name="Displacements"/>

    <mesh name="FluidMesh">
      <use-data name="Forces"/>
      <use-data name="Displacements"/>
    </mesh>

    <mesh name="StructureMesh">
      <use-data name="Forces"/>
      <use-data name="Displacements"/>
    </mesh>

    <participant name="FluidSolver">
      <use-mesh name="FluidMesh" provide="yes"/>
      <use-mesh name="StructureMesh" from="SolidSolver"/>
      <write-data name="Forces" mesh="FluidMesh"/>
      <read-data  name="Displacements" mesh="FluidMesh"/>
      <mapping:nearest-neighbor direction="write" from="FluidMesh" 
                                to="StructureMesh" constraint="conservative"/>
      <mapping:nearest-neighbor direction="read" from="StructureMesh" 
                                to="FluidMesh" constraint="consistent"/>
    </participant>

    <participant name="SolidSolver">
      <use-mesh name="StructureMesh" provide="yes"/>
      <write-data name="Displacements" mesh="StructureMesh"/>
      <read-data  name="Forces" mesh="StructureMesh"/>
    </participant>

    <m2n:sockets from="FluidSolver" to="SolidSolver"/>

    <coupling-scheme:serial-explicit>
      <participants first="FluidSolver" second="SolidSolver"/>
      <max-time-windows value="10" />
      <time-window-size value="1.0" />
      <exchange data="Forces" mesh="StructureMesh" from="FluidSolver" to="SolidSolver"/>
      <exchange data="Displacements" mesh="StructureMesh" from="SolidSolver" to="FluidSolver"/>
    </coupling-scheme:serial-explicit>

  </solver-interface>

</precice-configuration>
```
