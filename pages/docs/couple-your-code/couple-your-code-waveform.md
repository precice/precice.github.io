---
title: Waveform iteration for time interpolation of coupling data
permalink: couple-your-code-waveform.html
keywords: api, adapter, time, waveform, subcycling, multirate
summary: "With Waveform iteration you can interpolate your coupling data in time for higher order time stepping and more stable subcycling."
---

{% include warning.html content="These API functions are work in progress, experimental, and are not yet released. The API might change during the ongoing development process. Use with care." %}
{% include note.html content="In this section, we will only discuss implicit coupling. We will, without loss of generality, only discuss the use of the API functions `readBlockVectorData` and `writeBlockVectorData` in the examples." %}

preCICE allows the participants to use subcycling - meaning: to work with different time step sizes on their respective domains. If participants are using different timestep sizes, they have to synchronize at the end of each *time window*. If you want to know how this works and what a time window is, see ["Step 5 - Non-matching time step sizes" of the step-by-step guide](couple-your-code-timestep-sizes.html). In this section, we will take a closer look at the exchange of coupling data when subcycling, and advanced techniques for interpolation of coupling data inside of a time window.

## Exchange of coupling data with subcycling

preCICE only exchanges data and performs the coupling at the end of the last time step in the time window - the end of the time window. For the default case, preCICE only exchanges the data that was written at the very end of the time window. This approach automatically leads to discontinuities or "jumps" when going from one time windows to the next and, thus, lower accuracy (for details, see [here](https://onlinelibrary.wiley.com/doi/full/10.1002/nme.6443)).

{% include important.html content="If subcycling is used, data that was written before the last time step in the window will be ignored and will not be exchanged. This means that coupling data has a constant value (in time) within one coupling window." %}

### Example for subcycling without waveform iteration

The figure below visualizes this situation for a single coupling window ranging from $$t_\text{ini}$$ to $$t_\text{ini}+\Delta t$$:

![Coupling data exchange without interpolation](images/docs/couple-your-code/couple-your-code-waveform/WaveformConstant.png)

The two participants Dirichlet $$\mathcal{D}$$ and Neumann $$\mathcal{N}$$ use their respective time step sizes $$\delta t$$ and produce coupling data $$c$$ at the end of each time step. But only the very last samples $$c_{\mathcal{N}\text{end}}$$ and $$c_{\mathcal{D}\text{end}}$$ are exchanged. If the Dirichlet participant $$\mathcal{D}$$ calls `readBlockVectorData`, it will always receive the same value $$c_{\mathcal{N}\text{end}}$$ from the Neumann participant $$\mathcal{N}$$, independent from the current time step.

## Linear interpolation in a time window

A simple extension of the existing API is to apply linear interpolation inside of a time window to get smoother coupling boundary conditions. With this approach time-dependent functions (so-called *waveforms*) are exchanged between the participant. Since these waveforms are exchanged iteratively in implicit coupling, we call this procedure *waveform iteration*. Exchanging waveforms leads to a more robust subcycling and allows us to support higher order time stepping (for details, see [here](https://onlinelibrary.wiley.com/doi/full/10.1002/nme.6443)).

### Example for waveform iteration with linear interpolation

Linear interpolation between coupling boundary conditions of the previous and the current time window is illustrated below:

![Coupling data exchange with linear interpolation](images/docs/couple-your-code/couple-your-code-waveform/WaveformLinear.png)

If the Dirichlet participant $$\mathcal{D}$$ calls `readBlockVectorData`, it samples the data from a time-dependent function $$c_\mathcal{D}(t)$$. This function is created from linear interpolation of the first and the last sample $$c_{\mathcal{D}0}$$ and $$c_{\mathcal{D}5}$$ created by the Neumann participant $$\mathcal{N}$$ in the current time window. This allows $$\mathcal{D}$$ to sample the coupling condition at arbitrary times $$t$$ inside the current time window.

## Experimental API for waveform iteration

preCICE offers an experimental API for using linear interpolation on time windows. Here, `readBlockVectorData` accepts an additional argument `dt`. This allows us to choose the time where the interpolant should be sampled:

```cpp
// stable API with constant data in time window
void readBlockVectorData(int dataID, int size, const int* valueIndices, double* values) const;

// experimental API for waveform iteration
void readBlockVectorData(int dataID, int size, const int* valueIndices, double dt, double* values) const;
```

{% include note.html content="The functionality of `writeBlockVectorData` remains unchanged. All samples but the one from the very last time step in the time window are ignored. An extension of `writeBlockVectorData` to accept multiple samples per time window is work in progress." %}

The experimental API has to be activated in the configuration file via the `experimental` attribute. This allows us to define the order of the interpolant in the `read-data` tag of the corresponding `participant`. Here, `waveform-order="1"` corresponds to linear interpolation and `waveform-order="0"` to constant interpolation (this is just the same as the stable API).

```xml
<solver-interface experimental="true" ... >
...
    <participant name="FluidSolver">
        <use-mesh name="FluidMesh" provide="yes"/>
        <write-data name="Forces" mesh="MyMesh"/>
        <read-data name="Displacements" mesh="FluidMesh" waveform-order="1"/>
    </participant>
...
</solver-interface>
```

## Usage examples

Let's use this experimental API in two examples from the step-by-step guide.

### Use waveform iteration without subcycling

We begin with an extended version of the example from ["Step 3 - Mesh and data access"](couple-your-code-timestep-sizes.html). Only few changes are necessary to sample the `Displacements` at the middle of the time window, which might be necessary for our specific application:

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

double dt;         // solver timestep size
double precice_dt; // maximum precice timestep size

precice_dt = precice.initialize();
while (not simulationDone()){ // time loop
  dt = beginTimeStep(); // e.g. compute adaptive dt 
  dt = min(precice_dt, dt);
  // sampling in the middle of the time step
  precice.readBlockVectorData(displID, vertexSize, vertexIDs, 0.5 * dt, displacements);
  setDisplacements(displacements); // displacement at the middle of the time step
  solveTimeStep(dt); // might be using midpoint rule for time-stepping
  computeForces(forces);
  precice.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
  precice_dt = precice.advance(dt);
  endTimeStep(); // e.g. update variables, increment time
}
precice.finalize();
delete[] vertexIDs, forces, displacements;
turnOffSolver();
```

### Use waveform iteration with subcycling

Another example shows how to use subcycling with the waveform iteration API. This is an extension of the example from ["Step 5 - Non-matching time step sizes"](couple-your-code-timestep-sizes.html). The changes are similar to the example above, but additionally the behavior of `isReadDataAvailable` slightly changes, because every time step now provides updated read data:

```cpp
while (not simulationDone()){ // time loop
  dt = beginTimeStep(); // e.g. compute adaptive dt 
  dt = min(precice_dt, dt);
  if (precice.isReadDataAvailable()){ // always returns true with new API
    // sampling in the middle of the time step
    precice.readBlockVectorData(displID, vertexSize, vertexIDs, 0.5 * dt, displacements);
    setDisplacements(displacements); // displacement at the middle of the time step
  }
  solveTimeStep(dt); // might be using midpoint rule for time-stepping
  if (precice.isWriteDataRequired(dt)){ // only true at the end of the time window
    computeForces(forces);
    precice.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
  }
  precice_dt = precice.advance(dt);
  endTimeStep(); // e.g. update variables, increment time
}
```

### Note on the use of `initializeData`

{% include important.html content="`writeBlockVectorData` *after* `initializeData` writes data corresponding to the *end* of the window." %}

In the very first time window of our coupled simulation we have to provide initial data in order to be able to perform linear interpolation. We have to call `writeBlockVectorData` *before* `initializeData`. This data will be used as initial data for the interpolation. If no initial data is provided, only constant interpolation can be applied in the first window, but linear interpolation is still available in later time windows.

```cpp
...
// sets forces at beginning of the first time window, similar for displacement on the other participant's side.
precice.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
precice.initializeData();
precice_dt = precice.initialize();

while (not simulationDone()){ // time loop
  if (precice.isReadDataAvailable()){ // always returns true with new API
    // sampling from interpolant in the middle of the time step
    precice.readBlockVectorData(displID, vertexSize, vertexIDs, 0.5 * dt, displacements);
  }
  ...
  if (precice.isWriteDataRequired(dt)){ // only true at the end of the time window
    // sets forces at the end of the current time window
    precice.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
  }
  precice_dt = precice.advance(dt);
  ...
}
```

{% include note.html content="Depending on the coupling scheme, the used interpolation scheme might differ depending on the order of the participants and depending on whether we are in the first or a later coupling iteration." %}
