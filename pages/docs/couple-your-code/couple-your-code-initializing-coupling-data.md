---
title: Step 7 - Data initialization
permalink: couple-your-code-initializing-coupling-data.html
keywords: api, adapter, initialization, coupling scheme, restart
summary: "As default values, preCICE assumes that all coupling variables are zero initially. For fluid-structure interaction, for example, this means that the structure is in its reference state. Sometimes, you want to change this behavior – for instance, you may want to restart your simulation."
---

{% version 3.0.0 %}
`initializeData()` only exists for preCICE versions < 3.0. For versions >= 3.0, data initialization is directly handled in `initialize()`.
{% endversion %}

By default preCICE assumes that all coupling variables are zero initially. If you want to provide non-zero initial values, you can write data before calling `initialize()`. This data will then be used as initial data. To check whether initial data is required, you can use the following function:

```cpp
bool requiresInitialData()
```

To support data initialization, we extend our example as follows:

```cpp
[...]

int displID = precice.getDataID("Displacements", meshID);
int forceID = precice.getDataID("Forces", meshID);
double* forces = new double[vertexSize*dim];
double* displacements = new double[vertexSize*dim];

[...]

if(precice.requiresInitialData()){
  precice.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
}

precice_dt = precice.initialize();

while (precice.isCouplingOngoing()){
  [...]
}
```

Now, you can specify at runtime if you want to initialize coupling data. For example to initialize displacements:

```xml
[...]
<exchange data="Forces" mesh="StructureMesh" from="FluidSolver" to="SolidSolver" />
<exchange data="Displacements" mesh="StructureMesh" from="SolidSolver" to="FluidSolver" initialize="yes"/>
[...]
```

If you are using a serial coupling scheme, only initial data that is written from the second to the first participant is actually used. Initial data written from the first to the second participant will be ignored, because in a serial coupling scheme the first participant already computes its first result before the second participant even starts.

{% note %}
preCICE still supports data initialization for both participants, even if a serial coupling scheme is used. You can read our section on [time interpolation](couple-your-code-waveform) to learn more about the reasons.
{% endnote %}
