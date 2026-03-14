---
title: Step 9 – Gradient data
permalink: couple-your-code-gradient-data.html
keywords: api, adapter, mapping, gradient, nearest-neighbor-gradient
summary: "So far, our mesh contains only data. This is sufficient for most of the numerical methods that preCICE offers. For nearest-neighbor-gradient mapping, however, preCICE also requires additional gradient data information. In this step, you learn how to add gradient data to the mesh."
---

{% version 2.4.0 %}
This feature is available since version 2.4.0.
{% endversion %}

{% experimental %}
This is an experimental feature.
Enable it using `<precice-configuration experimental="true">` and do not consider the configuration to be stable yet.
{% endexperimental %}

When using `nearest-neighbor-gradient` mapping, we require coupling data and additional gradient data. We have seen in [Step 3](couple-your-code-mesh-and-data-access.html) how to write data to the mesh.
Now, we will learn how to write gradient data to the mesh. For this purpose, we use the following API method:
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-1" data-toggle="tab">C++</a></li>
    <li><a href="#python-1" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-1" markdown="1">

```cpp
void writeGradientData(
    precice::string_view          meshName,
    precice::string_view          dataName,
    precice::span<const VertexID> vertices,
    precice::span<const double>   gradients);
```

</div>
<div role="tabpanel" class="tab-pane" id="python-1" markdown="1">

```python
write_gradient_data(mesh_name, data_name, vertex_ids, gradients)
```

</div>
</div>
Let's consider an example for writing block vector gradient data corresponding to the vector data `v0 = (v0x, v0y) , v1 = (v1x, v1y), ... , vn = (vnx, vny)` differentiated in spatial directions x and y.
The values are passed as following:

```cpp
( v0x_dx, v0y_dx, v0x_dy, v0y_dy,
  v1x_dx, v1y_dx, v1x_dy, v1y_dy,
  ... ,
  vnx_dx, vny_dx, vnx_dy, vny_dy  )
```

Let's add gradient data to our example code:
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-2" data-toggle="tab">C++</a></li>
    <li><a href="#python-2" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-2" markdown="1">

```cpp
precice::Participant precice("FluidSolver", "precice-config.xml", rank, size); // constructor

int meshDim = precice.getMeshDimensions("FluidMesh");
int dataDim = precice.getDataDimensions("FluidMesh", "Stress");
/* ... */
precice.setMeshVertices("FluidMesh", coords, vertexIDs);

std::vector<double> stress(vertexSize * dataDim);

// create gradient data
std::vector<double> stressGradient(vertexSize * dataDim * meshDim)
/* ... */
precice.initialize();

while (not simulationDone()){ // time loop
  preciceDt = precice.getMaxTimeStepSize();
  solverDt = beginTimeStep(); // e.g. compute adaptive dt
  dt = min(preciceDt, solverDt);
  precice.readData("FluidMesh", "Displacements", vertexIDs, dt, displacements);
  setDisplacements(displacements);
  solveTimeStep(dt);
  computeStress(stress);

  precice.writeData("FluidMesh", "Stress", vertexIDs, stress);

  // write gradient data
  if (requiresGradientDataFor("FluidMesh")){
    computeStressGradient(stressGradient)
    precice.writeGradientData("FluidMesh", "Stress", vertexIDs, stressGradient);
  }

  precice.advance(dt);
}
/* ... */
```

</div>
<div role="tabpanel" class="tab-pane" id="python-2" markdown="1">

```python
precice = precice.Participant("FluidSolver", "precice-config.xml", rank, size)

mesh_dim = precice.get_mesh_dimensions("FluidMesh")
data_dim = precice.get_data_dimensions("FluidMesh", "Stress")

vertex_ids = precice.set_mesh_vertices("FluidMesh", coords)

stress = np.zeros((vertex_size, data_dim))
stress_gradient = np.zeros((vertex_size, data_dim, mesh_dim))
precice.initialize()

while not simulation_done():
  precice_dt = precice.get_max_time_step_size()
  solver_dt = begin_time_step()
  dt = min(precice_dt, solver_dt)
  displacements = precice.read_data("FluidMesh", "Displacements", vertex_ids, dt)
  set_displacement(displacements)
  solve_time_step(dt)
  stress = compute_stress()

  precice.write_data("FluidMesh", "Stress", vertex_ids, stress)

  if precice.requires_gradient_data_for("FluidMesh", "Stress"):
    stress_gradient = compute_stress_gradient()
    precice.write_gradient_data("FluidMesh", "Stress", vertex_ids, stress_gradient)

  precice.advance(dt)
```

</div>
</div>

{% version 2.4.0 %}
For preCICE versions lower than 2.5.0, you need to set the flag `gradient="on"` in the configuration file, whenever you require to write gradient data. An exemplary xml configuration file is given below. Starting from preCICE version 2.5.0, the gradient requirement is automatically deduced (based on the selected mapping) and can be queried in the code, as usual. Hence, the `gradient="on"` flag must not be set in the configuration file.
{% endversion %}

For the example, you can use the following `precice-config.xml` (note the version specific information above):

```xml
<?xml version="1.0"?>

<precice-configuration experimental="true">
    <!-- the gradient flag here is only required vor preCICE version 2.4.0 -->
    <data:vector name="Stress" gradient="on"/>
    <data:vector name="Displacements" />

    <mesh name="FluidMesh" dimensions="3">
      <use-data name="Stress"/>
      <use-data name="Displacements"/>
    </mesh>

    <mesh name="StructureMesh" dimensions="3">
      <use-data name="Stress"/>
      <use-data name="Displacements"/>
    </mesh>

    <participant name="FluidSolver">
      <provide-mesh name="FluidMesh" />
      <receive-mesh name="StructureMesh" from="SolidSolver"/>
      <write-data name="Stress" mesh="FluidMesh"/>
      <read-data  name="Displacements" mesh="FluidMesh"/>
      <mapping:nearest-neighbor-gradient direction="write" from="FluidMesh"
                                to="StructureMesh" constraint="consistent"/>
      <mapping:nearest-neighbor direction="read" from="StructureMesh"
                                to="FluidMesh" constraint="consistent"/>
    </participant>
    [...]
</precice-configuration>
```
