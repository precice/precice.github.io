---
title: Step 3 – Mesh and data access
permalink: couple-your-code-mesh-and-data-access.html
keywords: api, adapter, mesh, ids, data, vertices
summary: "In this step, we see how to define coupling meshes and access coupling data."
---

For coupling, we need coupling meshes. Let's see how we can tell preCICE about our coupling mesh. For the moment, we define coupling meshes only as clouds of vertices. In [Step 8](couple-your-code-defining-mesh-connectivity.html), we will learn how to define mesh connectivity, so edges, triangles, and quads.

Coupling meshes and associated data fields are defined in the preCICE configuration file, which you probably already know from the tutorials. The concrete values, however, you can access with the API:

<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-1" data-toggle="tab">C++</a></li>
    <li><a href="#python-1" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-1" markdown="1">

```cpp
VertexID setMeshVertex(
    ::precice::string_view        meshName,
    ::precice::span<const double> position);

void setMeshVertices(
    precice::string_view        meshName,
    precice::span<const double> positions,
    precice::span<VertexID>     ids);
```

</div>
<div role="tabpanel" class="tab-pane" id="python-1" markdown="1">

```python
vertex_id = set_mesh_vertex(mesh_name, position)
vertex_ids = set_mesh_vertices(mesh_name, positions)
```

</div>
</div>
* `setMeshVertex` defines the coordinates of a single mesh vertex and returns a vertex ID, which you can use to refer to this vertex.
* `setMeshVertices` defines multiple vertices at once. So, you can use this function instead of calling `setMeshVertex` multiple times. This is also good practice for performance reasons.

To write data to the coupling data structure the following API function is needed:
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-2" data-toggle="tab">C++</a></li>
    <li><a href="#python-2" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-2" markdown="1">

```cpp
void Participant::writeData(
    precice::string_view          meshName,
    precice::string_view          dataName,
    precice::span<const VertexID> vertices,
    precice::span<const double>   values)
```

</div>
<div role="tabpanel" class="tab-pane" id="python-2" markdown="1">

```python
write_data(mesh_name, data_name, vertex_ids, values)
```

</div>
</div>
Similarly, there is a `readData` API function for reading coupling data:
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-3" data-toggle="tab">C++</a></li>
    <li><a href="#python-3" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-3" markdown="1">

```cpp
void readData(
    precice::string_view          meshName,
    precice::string_view          dataName,
    precice::span<const VertexID> vertices,
    double                        relativeReadTime,
    precice::span<double>         values) const;
```

</div>
<div role="tabpanel" class="tab-pane" id="python-3" markdown="1">

```python
values = read_data(mesh_name, data_name, vertex_ids, relative_read_time)
```

</div>
</div>
The relative read time can be anything from the current point in time (`0`) to the end of the time window (`getMaxTimeStepSize()`). We will talk about the additional argument `relativeReadTime` in detail in [the section on time interpolation](couple-your-code-waveform.html).

Let's define coupling meshes and access coupling data in our example code:
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-4" data-toggle="tab">C++</a></li>
    <li><a href="#python-4" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-4" markdown="1">

```cpp
turnOnSolver(); //e.g. setup and partition mesh

precice::Participant precice("FluidSolver","precice-config.xml",rank,size); // constructor

int meshDim = precice.getMeshDimensions("FluidMesh");
int vertexSize; // number of vertices at wet surface
// determine vertexSize
std::vector<double> coords(vertexSize*dim); // coords of vertices at wet surface
// determine coordinates
std::vector<int> vertexIDs(vertexSize);
precice.setMeshVertices("FluidMesh", coords, vertexIDs);

int forcesDim = precice.getDataDimensions("FluidMesh", "Forces");
std::vector<double> forces(vertexSize*forcesDim);
int displacementsDim = precice.getDataDimensions("FluidMesh", "Displacements");
std::vector<double> displacements(vertexSize*displacementsDim);

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

</div>
<div role="tabpanel" class="tab-pane" id="python-4" markdown="1">

```python
turn_on_solver() # e.g. setup and partition mesh
precice = precice.Participant("FluidSolver", "precice-config.xml", rank, size) # Initialize participant

mesh_dim = precice.get_mesh_dimensions("FluidMesh")

# define coords of vertices at wet surface
coords = np.zeros((vertex_size, mesh_dim))

vertex_ids = precice.set_mesh_vertices("FluidMesh", coords)

forces_dim = precice.get_data_dimensions("FluidMesh", "Forces")
forces = np.zeros((vertex_size, forces_dim))

displacements_dim = precice.get_data_dimensions("FluidMesh", "Displacements")
displacements = np.zeros((vertex_size, displacements_dim))

precice.initialize()
while precice.is_coupling_ongoing(): # time loop
  precice_dt = precice.get_max_time_step_size()
  solver_dt = begin_time_step() # e.g. compute adaptive dt
  dt = min(precice_dt, solver_dt)
  displacements = precice.read_data("FluidMesh", "Displacements", vertex_ids, dt)
  set_displacements(displacements)
  solve_time_step(dt)
  forces = compute_forces()
  precice.write_data("FluidMesh", "Forces", vertex_ids, forces)
  precice.advance(dt)
  end_time_step() # e.g. update variables, increment time

precice.finalize() # frees data structures and closes communication channels
turn_off_solver()
```

</div>
</div>
Did you see that your fluid solver now also needs to provide the functions `computeForces` and `setDisplacements`? As you are an expert in your fluid code, these functions should be easy to implement. Most probably, you already have such functionality anyway. If you are not an expert in your code try to find an expert :smirk:.

Once your adapter reaches this point, it is a good idea to test your adapter against one of the [solverdummies](couple-your-code-api#minimal-reference-implementation), which then plays the role of the `SolidSolver`.

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

    <m2n:sockets acceptor="FluidSolver" connector="SolidSolver"/>

    <coupling-scheme:serial-explicit>
      <participants first="FluidSolver" second="SolidSolver"/>
      <max-time-windows value="10" />
      <time-window-size value="1.0" />
      <exchange data="Forces" mesh="StructureMesh" from="FluidSolver" to="SolidSolver"/>
      <exchange data="Displacements" mesh="StructureMesh" from="SolidSolver" to="FluidSolver"/>
    </coupling-scheme:serial-explicit>
</precice-configuration>
```
