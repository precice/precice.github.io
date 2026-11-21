---
title: Step 7 - Data initialization
permalink: couple-your-code-initializing-coupling-data.html
aliases:
  - /couple-your-code-initializing-coupling-data.html
keywords: api, adapter, initialization, coupling scheme, restart
summary: "As default values, preCICE assumes that all coupling variables are zero initially. For fluid-structure interaction, for example, this means that the structure is in its reference state. Sometimes, you want to change this behavior – for instance, you may want to restart your simulation."
---

By default preCICE assumes that all coupling variables are zero initially. If you want to provide non-zero initial values, you can write data before calling `initialize()`. This data will then be used as initial data. To check whether initial data is required, you can use the following function:

{{<api>}}

```cpp
bool requiresInitialData()
```

---

```python
requires_initial_data()
```

{{</api>}}

To support data initialization, we extend our example as follows:

{{<api>}}

```cpp

[...]

if(precice.requiresInitialData()){
  precice.writeData("FluidMesh", "Forces", vertexIDs, forces);
}

precice.initialize();

while (precice.isCouplingOngoing()){
  [...]
}
```

---

```python
[...]

if precice.requires_initial_data():
  precice.write_data("FluidMesh", "Forces", vertex_ids, forces)

precice.initialize()

while precice.is_coupling_ongoing():
  [...]
```

{{</api>}}

Now, you can specify at runtime if you want to initialize coupling data. For example to initialize displacements:

```xml
[...]
<exchange data="Forces" mesh="StructureMesh" from="FluidSolver" to="SolidSolver" />
<exchange data="Displacements" mesh="StructureMesh" from="SolidSolver" to="FluidSolver" initialize="yes"/>
[...]
```

preCICE supports data initialization for both participants. To make things easier at this point, we recommend to always provide initial data, if it is available, since otherwise preCICE will assume zero-valued initial data, which might lead to errors in certain situation. The situation is, however, more complicated and there are edge cases for certain coupling schemes. If you are interested in the details you can jump to our section on [time interpolation](couple-your-code-waveform).
