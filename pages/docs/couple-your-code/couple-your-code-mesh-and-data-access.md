---
title: Step 3 – Mesh and data access
permalink: couple-your-code-mesh-and-data-access.html
keywords: api, adapter, mesh, ids, data, vertices
summary: "In this step, we see how to define coupling meshes and access coupling data."
---

For coupling, we need coupling meshes. Let's see how we can tell preCICE about our coupling mesh. For the moment, we define coupling meshes only as clouds of vertices. In [Step 8](couple-your-code-defining-mesh-connectivity.html), we will learn how to define mesh connectivity, so edges, triangles, and quads.

Coupling meshes and associated data fields are defined in the preCICE configuration file, which you probably already know from the tutorials. The concrete values, however, you can access with the API:

```cpp
int setMeshVertex(
    ::precice::string_view        meshName,
    ::precice::span<const double> position);

void setMeshVertices(
    precice::string_view        meshName,
    precice::span<const double> positions,
    precice::span<VertexID>     ids);
```

* `setMeshVertex` defines the coordinates of a single mesh vertex and returns a vertex ID, which you can use to refer to this vertex.
* `setMeshVertices` defines multiple vertices at once. So, you can use this function instead of calling `setMeshVertex` multiple times. This is also good practice for performance reasons.

To write data to the coupling data structure the following API function is needed:

```cpp
void Participant::writeData(
    precice::string_view          meshName,
    precice::string_view          dataName,
    precice::span<const VertexID> vertices,
    precice::span<const double>   values)
```

<!-- TODO Also point to section where `relativeReadTime` is explained? We will probably solve this in https://github.com/precice/precice.github.io/pull/257 -->
Similarly, there is a `readData` API function for reading coupling data.

Let's define coupling meshes and access coupling data in our example code:

```cpp
turnOnSolver(); //e.g. setup and partition mesh

precice::Participant precice("FluidSolver","precice-config.xml",rank,size); // constructor

int dim = precice.getDimensions();
int vertexSize; // number of vertices at wet surface
// determine vertexSize
std::vector<double> coords(vertexSize*dim); // coords of vertices at wet surface
// determine coordinates
std::vector<int> vertexIDs(vertexSize);
precice.setMeshVertices("FluidMesh", coords, vertexIDs);

std::vector<double> forces(vertexSize*dim);
std::vector<double> displacements(vertexSize*dim);

double solverDt; // solver time step size
double preciceDt; // maximum precice time step size
double dt; // actual time step size

precice.initialize();
while (not simulationDone()){ // time loop
  preciceDt = precice.getMaxTimeStepSize();
  solverDt = beginTimeStep(); // e.g. compute adaptive dt
  dt = min(preciceDt, solverDt);
  precice.readData("FluidMesh", "Displacements", vertexIDs, dt, displacements);
  setDisplacements(displacements);
  solveTimeStep(dt);
  computeForces(forces);
  precice.writeData("FluidMesh", "Forces", vertexIDs, forces);
  precice.advance(dt);
  endTimeStep(); // e.g. update variables, increment time
}
precice.finalize(); // frees data structures and closes communication channels
turnOffSolver();
```

Did you see that your fluid solver now also needs to provide the functions `computeForces` and `setDisplacements`? As you are an expert in your fluid code, these functions should be easy to implement. Most probably, you already have such functionality anyway. If you are not an expert in your code try to find an expert :smirk:.

Once your adapter reaches this point, it is a good idea to test your adapter against one of the [solverdummies](couple-your-code-prerequisites#application-programming-interface), which then plays the role of the `SolidSolver`.

You can use the following `precice-config.xml`:

```xml
<?xml version="1.0"?>

<precice-configuration>
    <data:vector name="Forces"/>
    <data:vector name="Displacements"/>

    <mesh name="FluidMesh" dimensions="3">
      <use-data name="Forces"/>
      <use-data name="Displacements"/>
    </mesh>

    <mesh name="StructureMesh" dimensions="3">
      <use-data name="Forces"/>
      <use-data name="Displacements"/>
    </mesh>

    <participant name="FluidSolver">
      <provide-mesh name="FluidMesh" />
      <receive-mesh name="StructureMesh" from="SolidSolver"/>
      <write-data name="Forces" mesh="FluidMesh"/>
      <read-data  name="Displacements" mesh="FluidMesh"/>
      <mapping:nearest-neighbor direction="write" from="FluidMesh"
                                to="StructureMesh" constraint="conservative"/>
      <mapping:nearest-neighbor direction="read" from="StructureMesh"
                                to="FluidMesh" constraint="consistent"/>
    </participant>

    <participant name="SolidSolver">
      <provide-mesh name="StructureMesh" />
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
</precice-configuration>
```
