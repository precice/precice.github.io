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

Similarly, there is a `readData` API function for reading coupling data:

```cpp
void readData(
    precice::string_view          meshName,
    precice::string_view          dataName,
    precice::span<const VertexID> vertices,
    double                        relativeReadTime,
    precice::span<double>         values) const;
```

The relative read time can be anything from the current point in time (`0`) to the end of the time window (`getMaxTimeStepSize()`). We will talk about the additional argument `relativeReadTime` in detail in [the section on time interpolation](couple-your-code-waveform.html).

Let's define coupling meshes and access coupling data in our example code:

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

Did you see that your fluid solver now also needs to provide the functions `computeForces` and `setDisplacements`? As you are an expert in your fluid code, these functions should be easy to implement. Most probably, you already have such functionality anyway. If you are not an expert in your code try to find an expert :smirk:.
</div>
  <div role="tabpanel" class="tab-pane active" id="python-1" markdown="1">
  
  ```python
"""
    Parameters
    ----------
    mesh_name : str
        Name of the mesh to add the vertex to.
    position : array_like
        The coordinates of the vertex.

    Returns
    -------
    vertex_id : int
        ID of the vertex which is set.
"""
set_mesh_vertex(mesh_name, position)

"""
    Parameters
    ----------
    mesh_name : str
        Name of the mesh to add the vertices to.
    positions : array_like
        The coordinates of the vertices in a numpy array [N x D] where
        N = number of vertices and D = dimensions of geometry.

    Returns
    -------
    vertex_ids : numpy.ndarray
        IDs of the created vertices.
"""
set_mesh_vertices(mesh_name, positions)
```

* `set_mesh_vertex` defines the coordinates of a single mesh vertex and returns a vertex ID, which you can use to refer to this vertex.
* `set_mesh_vertices` defines multiple vertices at once. So, you can use this function instead of calling `set_mesh_vertex` multiple times. This is also good practice for performance reasons.

To write data to the coupling data structure the following API function is needed:

```python
"""
    Parameters
    ----------
    mesh_name : str
        name of the mesh to write to.
    data_name : str
        Data name to write to.
    vertex_ids : array_like
        Indices of the vertices.
    values : array_like
        Values of data
"""
write_data(self, mesh_name, data_name, vertex_ids, values)
```

Similarly, there is a `read_data` API function for reading coupling data:

```python
"""
    Parameters
    ----------
    mesh_name : str
        Name of the mesh to write to.
    data_name : str
        ID to read from.
    vertex_ids : array_like
        Indices of the vertices.
    relative_read_time : double
        Point in time where data is read relative to the beginning of the current time step

    Returns
    -------
    values : numpy.ndarray
        Contains the read data.
"""
read_data(mesh_name, data_name, vertex_ids, relative_read_time)
```

The relative read time can be anything from the current point in time (`0`) to the end of the time window (`get_max_time_step_size()`). We will talk about the additional argument `relative_read_time` in detail in [the section on time interpolation](couple-your-code-waveform.html).

Let's define coupling meshes and access coupling data in our example code:

```python
turn_on_solver() # e.g. setup and partition mesh
num_vertices = 3 
precice = precice.Participant("FluidSolver", "precice-config.xml", rank, size) # Initialize participant

mesh_dim = precice.get_mesh_dimensions("FluidMesh")

vertices = np.zeros((num_vertices, participant.get_mesh_dimensions(mesh_name))) # coords of vertices at wet surface
vertex_ids = precice.set_mesh_vertices("FluidMesh", vertices)

forces_dim = precice.get_data_dimensions("FluidMesh", "Forces")
forces = np.zeros((num_vertices, forces_dim))

displacements_dim = precice.get_data_dimensions("FluidMesh", "Displacements")
displacements = np.zeros((num_vertices, displacements_dim))


precice.initialize()
while participant.is_coupling_ongoing(): # time loop
  precice_dt = precice.get_max_time_step_size()
  solver_dt = begin_time_step() # e.g. compute adaptive dt
  dt = min(precice_dt, solver_dt)
  precice.read_data("FluidMesh", "Displacements", vertex_ids, dt, displacements)
  set_displacements(displacements)
  solve_time_step(dt)
  compute_forces(forces)
  precice.write_data("FluidMesh", "Forces", vertex_ids, forces)
  precice.advance(dt)
  end_time_step() # e.g. update variables, increment time

precice.finalize() # frees data structures and closes communication channels
turn_off_solver()
```

Did you see that your fluid solver now also needs to provide the functions `compute_forces` and `set_displacements`? As you are an expert in your fluid code, these functions should be easy to implement. Most probably, you already have such functionality anyway. If you are not an expert in your code try to find an expert :smirk:.
  
  </div>
</div>

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
