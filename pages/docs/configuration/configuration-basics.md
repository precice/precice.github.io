---
title: Introduction to configuration
keywords: configuration, basics, xml, data
summary: "The preCICE configuration file is structured in several sections. It is important to understand what the section are and how they are connected. On this page, we explain you that."
sidebar: docs_sidebar
permalink: configuration-introduction.html
---


The configuration consists, in general, of the following five parts:

```xml
<precice-configuration>
  <solver-interface dimensions="3">
   <data .../>
   <mesh .../>
   <participant .../>
   <m2n .../>
   <coupling-scheme .../>
 </solver-interface>
</precice-configuration>
```

{% tip %}
Visualizing the configuration helps a lot in understanding the connections between these five parts. Do not forget to try out the [configuration visualizer](tooling-config-visualization.html). We use it to visualize the configuration in the documentation.
{% endtip %}

![Complete example](images/docs/configuration/doc-base.png)

{% note %}
On this page, you also find references to the preCICE API. If you are only using (and not developing) an adapter, don't panic: you can use these references to get a better understanding, but you don't need to change anything in your adapter.
{% endnote %}

## 0. Dimensions

The value `dimensions` needs to match the physical dimension of your simulation, i.e. the number of coordinates a vertex has in `setMeshVertex`, etc. Some solvers only support 3D simulation, such as OpenFOAM or CalculiX. In this case the adapter maps from 3D to 2D if the preCICE dimension is 2D. This, of course, only works if you simulate a quasi-2D scenario with one layer of cells in z direction.  

## 1. Coupling data

You need to define which data values the coupled solvers want to exchange, e.g. displacements, forces, velocities, or temperature.

```xml
<data:scalar name="Temperature"/>
<data:vector name="Forces"/>
```

Once you have defined these fields, you can use the preCICE API to access them:

```c++
int temperatureID = precice.getDataID("Temperature", meshID);
```

## 2. Coupling meshes

Next, you can define the interface coupling meshes.

```xml
<mesh name="MyMesh1"> 
  <use-data name="Temperature"/> 
  <use-data name="Forces"/> 
</mesh> 
```

With the preCICE API, you get an ID for each mesh:

```c++
int meshID = precice.getMeshID("MyMesh1");
```

## 3. Coupling participants

![Participant configuration](images/docs/configuration/doc-participants.png)

Each solver that participates in the coupled simulation needs a participant definition. You need to define at least two participants.

```xml
<participant name="MySolver1"> 
  <use-mesh name="MyMesh1" provide="yes"/> 
  <read-data name="Temperature" mesh="MyMesh1"/> 
  <write-data name="Forces" mesh="MyMesh1"/> 
  ...
</participant>
```

The name of the participant has to coincide with the name you give when creating the preCICE interface object in the adapter:

```c++
precice::SolverInterface precice("MySolver1",rank,size);
```

The participant `provides` the mesh. This means that you have to define the coordinates:

```c++
precice.setMeshVertices(meshID, vertexSize, coords, vertexIDs);
```

The other option is to receive the mesh coordinates from another participant (who defines them):

```xml
<use-mesh name="MyMesh2" from="MySolver2"/> 
```

If a participant uses at least two meshes, you can define a data mapping between both:

```xml
<mapping:nearest-neighbor direction="read" from="MyMesh2" to="MyMesh1" constraint="consistent"/> 
```

`nearest-neighbor` means that the nearest-neighbor mapping method is used to map data from `MyMesh1` to `MyMesh2`.

Read more about the [mapping configuration](configuration-mapping.html).

## 4. Communication

![Communication configuration](images/docs/configuration/doc-m2n.png)

If two participants should exchange data, they need a communication channel.

```xml
<m2n:sockets from="MySolver1" to="MySolver2" />   
```

Read more about the [communication configuration](configuration-communication.html).

## 5. Coupling scheme

![Couplingscheme configuration](images/docs/configuration/doc-cplscheme.png)

At last, you need to define how the two participants exchange data. If you want an explicit coupling scheme (no coupling subiterations), you can use:

```xml
<coupling-scheme:parallel-explicit> 
  <participants first="MySolver1" second="MySolver2"/> 
  <max-time value="1.0"/> 
  <time-window-size value="1e-2"/> 
  <exchange data="Forces" mesh="MyMesh2" from="MySolver1" to="MySolver2"/>
  <exchange data="Temperature" mesh="MyMesh2" from="MySolver2" to="MySolver1"/>
</coupling-scheme:parallel-explicit>    
```

`parallel` means here that both solver run at the same time. In this case, who is `first` and `second` only plays a minor role. `max-time` is the complete simulation time. After this time,

```c++
precice.isCouplingOngoing()
```

will return `false`. The `time-window-size`, is the coupling time window (= coupling time step) length. This means if a solver uses a smaller time step size, he subcycles, i.e. needs more smaller time steps until data is exchanged.

Both participants need to `use` the mesh over which data is `exchanged` (here `MyMesh2`).

For implicit coupling, i.e. both solver subiterate in every time window until convergence, the configuration looks a bit more complicated.

Read more about the [coupling scheme configuration](configuration-coupling.html).
