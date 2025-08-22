---
title: Waveform iteration for time interpolation of coupling data
permalink: couple-your-code-waveform.html
keywords: api, adapter, time, waveform, subcycling, multirate
summary: "With waveform iteration, you can interpolate coupling data in time for higher-order time stepping and more stable subcycling."
---

preCICE allows the participants to use subcycling – meaning: to work with individual time step sizes smaller than the time window size. Note that participants always have to synchronize at the end of each *time window*. If you are not sure about the difference between a time window and a time step or you want to know how subcycling works in detail, see ["Step 5 - Non-matching time step sizes" of the step-by-step guide](couple-your-code-time-step-sizes.html). In the following section, we take a closer look at the exchange of coupling data when subcycling and advanced techniques for interpolation of coupling data are used inside of a time window.

## Exchange of coupling data with subcycling

preCICE only exchanges data at the end of the last time step in each time window – the end of the time window. By default, preCICE only exchanges data that was written at the very end of the time window. This approach automatically leads to discontinuities or "jumps" when going from one time window to the next. Coupling data has a constant value (in time) within one coupling window. This leads to lower accuracy of the overall simulation.[^1]

### Example for subcycling without waveform iteration

The figure below visualizes this situation for a single coupling window ranging from $$t_\text{ini}$$ to $$t_\text{ini}+\Delta t$$:

![Coupling data exchange without interpolation](images/docs/couple-your-code/couple-your-code-waveform/WaveformConstant.png)

The two participants Dirichlet $$\mathcal{D}$$ and Neumann $$\mathcal{N}$$ use their respective time step sizes $$\delta t_\mathcal{D}, \delta t_\mathcal{N}$$ and produce coupling data $$c$$ at the end of each time step. But only the very last samples $$c_{\mathcal{N}\text{end}}$$ and $$c_{\mathcal{D}\text{end}}$$ are exchanged. If the Dirichlet participant $$\mathcal{D}$$ calls `readData`, it always reads the same value $$c_{\mathcal{N}\text{end}}$$ from preCICE, independent from the current time step.

## Linear interpolation in a time window

A simple solution to reach higher accuracy is to apply linear interpolation inside of a time window to get smoother coupling boundary conditions. With this approach time-dependent functions (so-called *waveforms*) are exchanged between the participants. Since these waveforms are exchanged iteratively in implicit coupling, we call this procedure *waveform iteration*. Exchanging waveforms leads to a more robust subcycling and allows us to support higher order time stepping.[^1]

### Example for waveform iteration with linear interpolation

Linear interpolation between coupling boundary conditions of the previous and the current time window is illustrated below:

![Coupling data exchange with linear interpolation](images/docs/couple-your-code/couple-your-code-waveform/WaveformLinear.png)

If the Dirichlet participant $$\mathcal{D}$$ calls `readData`, it samples the data from a time-dependent function $$c_\mathcal{D}(t)$$. This function is created from linear interpolation of the first and the last sample $$c_{\mathcal{D}0}$$ and $$c_{\mathcal{D}5}$$ created by the Neumann participant $$\mathcal{N}$$ in the current time window. This allows $$\mathcal{D}$$ to sample the coupling condition at arbitrary times $$t$$ inside the current time window.

## Using waveform iteration

preCICE requires the argument `relativeReadTime` for the `readData` functions:

```cpp
void Participant::readData(
    precice::string_view          meshName,
    precice::string_view          dataName,
    precice::span<const VertexID> vertices,
    double                        relativeReadTime,
    precice::span<double>         values) const
```

In the previous sections of the step-by-step guide we always used `relativeReadTime = preciceDt` where `preciceDt = precice.getMaxTimeStepSize()` points to the end of the current time window (see, for example ["Step 5 - Non-matching time step sizes"](couple-your-code-time-step-sizes.html)). However, the original purpose of `relativeReadTime` is exactly to offer the user an interface for sampling from waveforms. The figure below illustrates how providing different values `dt` for `relativeReadTime` allows to sample interpolated values at different points in time:

![API for relativeReadTime](images/docs/couple-your-code/couple-your-code-waveform/APIRelativeReadTime.png)

`relativeReadTime` describes the time relatively to the beginning of the current time step starting at $$\tau_n$$. This means that `dt = 0` gives us access to data at the beginning of the time step. By choosing `dt > 0` we can sample data at points in time after $$\tau_n$$. The maximum allowed `dt = preciceDt` corresponds to $$\tau_n$$ plus the remaining time until the end of the current time window (i.e. `preciceDt = precice.getMaxTimeStepSize()`).

If we choose to use a smaller time step size `solverDt < preciceDt`, we apply subcycling and therefore `dt = solverDt` corresponds to sampling data at the end of the time step. But we can also use arbitrary values for `dt`, like `dt = 0.5 * solverDt` to implement, for example, a midpoint rule (see also the usage example below).

This allows us to define the degree of the interpolant in the `read-data` tag of the corresponding `participant`. Currently, we support two interpolation schemes: constant and linear interpolation. The interpolant is always constructed using data from the beginning and the end of the window. The default is constant interpolation (`waveform-degree="1"`). The following example uses `waveform-degree="3"` and, therefore, cubic interpolation:

```xml
<precice-configuration ... >
...
    <data:vector name="Forces" waveform-degree="3"/>
    <data:vector name="Displacements" waveform-degree="3"/>
...
</precice-configuration>
```

## Usage examples

### Implicit coupling

We are now ready to extend the example from ["Step 6 - Implicit coupling"](couple-your-code-implicit-coupling.html) to use waveforms. Let us assume that our fluid solver uses a midpoint rule as time stepping method. In this case, only few changes are necessary to sample the `Displacements` at the middle of the time window:

```cpp
...
precice.initialize();
while (not simulationDone()){ // time loop
  // write checkpoint
  ...
  preciceDt = precice.getMaxTimeStepSize();
  solverDt = beginTimeStep(); // e.g. compute adaptive dt
  dt = min(preciceDt, solverDt);
  // sampling in the middle of the time step
  precice.readData("FluidMesh", "Displacements", vertexIDs, 0.5 * dt, displacements);
  setDisplacements(displacements); // displacement at the middle of the time step
  solveTimeStep(dt); // might be using midpoint rule for time-stepping
  computeForces(forces);
  precice.writeData("FluidMesh", "Forces", vertexIDs, forces);
  precice.advance(dt);
  // read checkpoint & end time step
  ...
}
...
```

### Different time scales

For solvers operating on different time-scales, the solver with the smaller time-step size may need smooth input data.
In this case the solver with the smaller step size may call `readData()` with `dt=0` to sample data at the beginning of each of it's time steps.
By default, this results in piecewise linearly interpolated data.

For parallel-implicit coupling, interpolation will be available starting from the second iteration.
For serial coupling schemes, the `second` solver will always have linear interpolation available.

To achieve higher-order interpolation, let the solver with the larger time-steps perform multiple time-steps per time-window and increase the `waveform-degree="2"` of the data in question.
Serial-explicit schemes need to manually enable exchange of substeps from the `first` to the `second` participant using `<exchange substeps="true" />`.

## Literature

[^1]: Rüth, B, Uekermann, B, Mehl, M, Birken, P, Monge, A, Bungartz, H-J. Quasi-Newton waveform iteration for partitioned surface-coupled multiphysics applications. Int J Numer Methods Eng. 2021; 122: 5236– 5257. [https://doi.org/10.1002/nme.6443](https://doi.org/10.1002/nme.6443)
