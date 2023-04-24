---
title: Step 3 – Mesh and data access
permalink: couple-your-code-mesh-and-data-access.html
keywords: api, adapter, mesh, ids, data, vertices
summary: "In this step, we see how to define coupling meshes and access coupling data."
---

For coupling, we need coupling meshes. Let's see how we can tell preCICE about our coupling mesh. For the moment, we define coupling meshes only as clouds of vertices. In [Step 8](couple-your-code-defining-mesh-connectivity.html), we will learn how to define mesh connectivity, so edges, triangles, and quads.

Coupling meshes and associated data fields are defined in the preCICE configuration file, which you probably already know from the tutorials. The concrete values, however, you can access with the API:

```cpp
int getMeshID (const std::string& meshName);
int setMeshVertex (int meshID, const double* position);
void setMeshVertices (int meshID, int size, double* positions, int* ids);
```

* `getMeshID` returns the ID of the coupling mesh. You need the ID of the mesh whenever you want to something with the mesh.
* `setMeshVertex` defines the coordinates of a single mesh vertex and returns a vertex ID, which you can use to refer to this vertex.
* `setMeshVertices` defines multiple vertices at once. So, you can use this function instead of calling `setMeshVertex` multiple times. This is also good practice for performance reasons.

To access coupling data, the following API functions are needed:

```cpp
int getDataID (const std::string& dataName, int meshID);
void writeVectorData (int dataID, int vertexID, const double* value);
void writeBlockVectorData (int dataID, int size, int* vertexIDs, double* values);
```

* `getDataID` returns the data ID for a coupling data field (e.g. "Displacements", "Forces", etc).
* `writeVectorData` writes vector-valued data to the coupling data structure.
* `writeBlockVectorData` writes multiple vector data at once, again for performance reasons.

Similarly, there are methods for reading coupling data: `readVectorData` and `readBlockVectorData`. Furthermore,
preCICE distinguishes between scalar-valued and vector-valued data. For scalar data, similar methods exist, for example `writeScalarData`.

{% note %}
The IDs that preCICE uses (for data fields, meshes, or vertices) have arbitrary integer values. Actually, you should never need to look at the values. The only purpose of the IDs is to talk to preCICE. You also do not look at the value of a C pointer, it is just a non-readable address. In particular, you should not assume that vertex IDs are ordered in any certain way (say from 0 to N-1) or, for example, that 'Forces' always have the same ID '2' on all meshes.
{% endnote %}

Let's define coupling meshes and access coupling data in our example code:

```cpp
turnOnSolver(); //e.g. setup and partition mesh

precice::SolverInterface precice("FluidSolver","precice-config.xml",rank,size); // constructor

int dim = precice.getDimensions();
int meshID = precice.getMeshID("FluidMesh");
int vertexSize; // number of vertices at wet surface
// determine vertexSize
double* coords = new double[vertexSize*dim]; // coords of coupling vertices
// determine coordinates
int* vertexIDs = new int[vertexSize];
precice.setMeshVertices(meshID, vertexSize, coords, vertexIDs);
delete[] coords;

int displID = precice.getDataID("Displacements", meshID);
int forceID = precice.getDataID("Forces", meshID);
double* forces = new double[vertexSize*dim];
double* displacements = new double[vertexSize*dim];

double solverDt; // solver time step size
double preciceDt; // maximum precice time step size
double dt; // actual time step size

preciceDt = precice.initialize();
while (not simulationDone()){ // time loop
  solverDt = beginTimeStep(); // e.g. compute adaptive dt
  dt = min(preciceDt, solverDt);
  precice.readBlockVectorData(displID, vertexSize, vertexIDs, displacements);
  setDisplacements(displacements);
  solveTimeStep(dt);
  computeForces(forces);
  precice.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
  preciceDt = precice.advance(dt);
  endTimeStep(); // e.g. update variables, increment time
}
precice.finalize(); // frees data structures and closes communication channels
delete[] vertexIDs, forces, displacements;
turnOffSolver();
```

Did you see that your fluid solver now also needs to provide the functions `computeForces` and `setDisplacements`? As you are an expert in your fluid code, these functions should be easy to implement. Most probably, you already have such functionality anyway. If you are not an expert in your code try to find an expert :smirk:.

Once your adapter reaches this point, it is a good idea to test your adapter against one of the [solverdummies](couple-your-code-prerequisites#application-programming-interface), which then plays the role of the `SolidSolver`.

You can use the following `precice-config.xml`:

```xml
<?xml version="1.0"?>

<precice-configuration>

  <solver-interface dimensions="3">

    <data:vector name="Forces"/>
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
