---
title: Step 7 - Data initialization
permalink: couple-your-code-initializing-coupling-data.html
keywords: api, adapter, initialization, coupling scheme, restart
summary: "As default values, preCICE assumes that all coupling variables are zero initially. For fluid-structure interaction, for example, this means that the structure is in its reference state. Sometimes, you want to change this behavior – for instance, you may want to restart your simulation."
---

For initializing coupling data, you can add the following **optional** method:

```cpp
void initializeData();
```

Before jumping into the implementation, let's try to clarify how the usual the sequence of events in a serial and in a parallel coupling as studied in [Step 4](couple-your-code-coupling-flow) changes.

TODO: picture

In a serial coupling, only the second participant can send data inside `initializeData()`. In parallel coupling, both participants can initialize data.

The high-level API of preCICE makes it possible to enable this feature at runtime, irrelevant of serial or parallel coupling configuration. To support this feature, we extend our example as follows:

```cpp
[...]

const std::string& cowid = precice::constants::actionWriteInitialData();

[...]

int displID = precice.getDataID("Displacements", meshID);
int forceID = precice.getDataID("Forces", meshID);
double* forces = new double[vertexSize*dim];
double* displacements = new double[vertexSize*dim];

[...]

preciceDt = precice.initialize();

if(precice.isActionRequired(cowid)){
  precice.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
  precice.markActionFulfilled(cowid);
}

precice.initializeData();

while (precice.isCouplingOngoing()){
  [...]
```

Now, you can specify at runtime if you want to initialize coupling data. For example to initialize displacements:

```xml
[...]
<exchange data="Forces" mesh="StructureMesh" from="FluidSolver" to="SolidSolver" />
<exchange data="Displacements" mesh="StructureMesh" from="SolidSolver" to="FluidSolver" initialize="yes"/>
[...]
```
