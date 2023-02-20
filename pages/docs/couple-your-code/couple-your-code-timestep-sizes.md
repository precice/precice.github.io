---
title: Step 5 – Non-matching timestep sizes 
permalink: couple-your-code-timestep-sizes.html
keywords: api, adapter, advance, timestepping, subcycling, adaptivity
summary: "In this step, you learn how preCICE handles non-matching timestep sizes and a few more things about simulation time."
---

In previous steps, you have already seen that there are quite some things going on with timestep sizes. Let us now have a look at what is actually happening.

```cpp
...
double solver_dt; // solver timestep size
double precice_dt; // maximum precice timestep size
double dt; // actual timestep size

precice_dt = precice.initialize();
while (not simulationDone()){ // time loop
  solver_dt = beginTimeStep(); // e.g. compute adaptive dt
  dt = min(precice_dt, solver_dt);
  solveTimeStep(dt);
  precice_dt = precice.advance(dt);
  endTimeStep(); // e.g. update variables, increment time
}
```

Good thing to know: in this step, you do really not have to alter your code. Everything needed is already there and can be configured. :relieved:

There are basically two options to choose from in the configuration.

```xml
<time-window-size value="..." method="..."/>
```

`method` can be:

* `fixed`: A fixed time window with size `value` is prescribed, during which both participants can use whatever timestep sizes they want. Communication of coupling data happens only after each time window.  
* `first-participant`: The first participant prescribes the timestep size for the second one. Communication of coupling data happens after each timestep. This option is only available for serial coupling schemes (more about [configuration of coupling schemes](configuration-coupling.html)). The attribute `value` is not applicable.

Let us have a closer look at both options.

## Fixed time window

The preCICE configuration defines a fixed time window. Both participants can use smaller timestep sizes, but then they _subcycle_, i.e. coupling data is only communicated at the end of each time window.
The figure below illustrates this procedure (k is the subcycling index, the dashed lines mark the time window):

![Timestepping with a fixed time window](images/docs/couple-your-code-timestepping-fixed.png)

* After each timestep, both participants tell preCICE which timestep size `dt` they just used. This way, preCICE can keep track of the total time. preCICE returns the remainder time to the next window.

```c++
precice_dt = precice.advance(dt);
```  

* Both participants compute their next (adaptive) timestep size. It can be larger or smaller than the remainder `precice_dt`.

```c++
solver_dt = beginTimeStep();
```

If it is larger, the remainder `precice_dt` is used instead (orange participant, dark orange is used).
If it is smaller, the participant's timestep size `solver_dt` can be used (blue participant, dark blue is used).
These two cases are reflected in:

```c++
dt = min(precice_dt, solver_dt)
```

* Once both participants reach the end of the time window, coupling data is exchanged.

{% note %}
This procedure is independent of whether a serial or a parallel coupling scheme is used.
For parallel coupling, both solvers run together and everything happens simultaneously in both participants, while for serial coupling, the first participant needs reach the end of the window before the second one can start.
{% endnote %}

If a participant subcycles it is actually not necessary to write data to or read data from preCICE. To avoid unnecessary calls, preCICE offers two optional helper functions:

```c++
bool isReadDataAvailable () const;
bool isWriteDataRequired (double computedTimestepLength) const;
```

You can use them as follows:

```c++
while (not simulationDone()){ // time loop
  if (precice.isReadDataAvailable()){
    precice.readBlockVectorData(displID, vertexSize, vertexIDs, displacements);
    setDisplacements(displacements);
  }
  solver_dt = beginTimeStep(); // e.g. compute adaptive dt
  dt = min(precice_dt, solver_dt);
  solveTimeStep(dt);
  if (precice.isWriteDataRequired(dt)){
    computeForces(forces);
    precice.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
  }
  precice_dt = precice.advance(dt);
  endTimeStep(); // e.g. update variables, increment time
}
```

## First participant prescribes timestep size

The `first` participant sets the timestep size. This requires that the `second` participant runs after the `first` one. Thus, as stated above, this option is only applicable for serial coupling.

![First participant prescribes timestep size](images/docs/couple-your-code-timestepping-first.png)

* The blue participant B is `first` and computes a step with its timestep size (Step 1).
* In `advance`, this timestep size is given to preCICE (Step 2).

```c++
precice_dt = precice.advance(dt);
```  

* preCICE has tracked the time level of the orange participant A and returns the remainder to reach B's timestep size.
* A computes its next (adaptive) timestep size. It can now be larger or smaller than the remainder.

```c++
solver_dt = beginTimeStep();
```

If it is larger, the remainder `precice_dt` is used instead (the case below in Step 3, dark orange is used).
If it is smaller, the participant's timestep size `solver_dt` can be used (not visualized).
These two cases are again reflected in the formula:

```c++
dt = min(precice_dt, solver_dt)
```

* The procedure starts over with the blue participant B.

{% note %}
`precice_dt` on the blue side is always infinity such that `min(solver_dt,precice_dt)==solver_dt`.
{% endnote %}

{% important %}
You never need to alter your code if you want to switch the first and second participant, if you want to switch between a serial and a parallel coupling scheme, or if you want to switch between `fixed` and `first-participant` timestepping. Everything can be configured. Even if implicit coupling is used.
{% endimportant %}

## Steering the end of the simulation

One last thing about time. There is also a helper function in preCICE that allows you to steer the end of a coupled simulation:

```c++
bool isCouplingOngoing();
```

This functions looks at `max-time-windows` and `max-time` as defined in the preCICE configuration and knows when it is time to go. Then, you should call `finalize`. It replaces your `simulationDone()`.

```c++
while (not precice.isCouplingOngoing()){ // time loop
  ...
}
precice.finalize();
```
