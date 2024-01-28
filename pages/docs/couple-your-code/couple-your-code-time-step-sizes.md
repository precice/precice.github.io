---
title: Step 5 – Non-matching time step sizes
permalink: couple-your-code-time-step-sizes.html
keywords: api, adapter, advance, timestepping, subcycling, adaptivity
summary: "In this step, you learn how preCICE handles non-matching time step sizes and a few more things about simulation time."
redirect_from:
  - couple-your-code-timestep-sizes.html
---

In previous steps, you have already seen that there are quite some things going on with time step sizes. Let us now have a look at what is actually happening.

```cpp
...
double solverDt; // solver time step size
double preciceDt; // maximum precice time step size
double dt; // actual time step size

precice.initialize();
while (not simulationDone()){ // time loop
  preciceDt = precice.getMaxTimeStepSize();
  solverDt = beginTimeStep(); // e.g. compute adaptive dt
  dt = min(preciceDt, solverDt);
  solveTimeStep(dt);
  precice.advance(dt);
  endTimeStep(); // e.g. update variables, increment time
}
```

Good thing to know: in this step, you do really not have to alter your code. Everything needed is already there and can be configured. :relieved:

There are basically two options to choose from in the configuration.

```xml
<time-window-size value="..." method="..."/>
```

`method` can be:

* `fixed`: A fixed time window with size `value` is prescribed, during which both participants can use whatever time step sizes they want. Communication of coupling data happens only after each time window.
* `first-participant`: The first participant prescribes the time step size for the second one. Communication of coupling data happens after each time step. This option is only available for serial coupling schemes (more about [configuration of coupling schemes](configuration-coupling.html)). The attribute `value` is not applicable.

Let us have a closer look at both options.

## Fixed time window

The preCICE configuration defines a fixed time window. Both participants can use smaller time step sizes, but then they _subcycle_, i.e. coupling data is only communicated at the end of each time window.
The figure below illustrates this procedure (k is the subcycling index, the dashed lines mark the time window):

![Timestepping with a fixed time window](images/docs/couple-your-code-timestepping-fixed.png)

* After each time step, both participants tell preCICE which time step size `dt` they just used by calling `precice.advance(dt)`. This way, preCICE can keep track of the total time. `preciceDt` is the remainder time to the next window:

```c++
preciceDt = precice.getMaxTimeStepSize();
```

* Both participants compute their next (adaptive) time step size. It can be larger or smaller than the remainder `preciceDt`.

```c++
solverDt = beginTimeStep();
```

If it is larger, the remainder `preciceDt` is used instead (orange participant, dark orange is used).
If it is smaller, the participant's time step size `solverDt` can be used (blue participant, dark blue is used).
These two cases are reflected in:

```c++
dt = min(preciceDt, solverDt)
```

* Once both participants reach the end of the time window, coupling data is exchanged.

{% note %}
This procedure is independent of whether a serial or a parallel coupling scheme is used.
For parallel coupling, both solvers run together and everything happens simultaneously in both participants, while for serial coupling, the first participant needs reach the end of the window before the second one can start.
{% endnote %}

### Possible subcycling pitfall

If you are using very many small time steps in one window, you might see the following error message:
```
ERROR: preCICE has detected a difference between its internal time and the time of this participant. This can happen, if you are using very many substeps per time window over multiple time windows.
```
preCICE ignores differences smaller than machine precision when comparing the time where a coupling window ends and the participant time it knows from subsequent `advance(dt)` calls. Such small differences are usually negligible. They, however, might add up over multiple windows and become relevant. If preCICE detects this, it raises the error message shown above as a safeguard.

One strategy to avoid this error showing up is to replace the usual call for determining the `dt` you are using in the following way:

```cpp
...
solverDt = beginTimeStep(); // e.g. compute adaptive dt
// Can lead to using a dt that only approximately reaches end of time window
// dt = min(preciceDt, solverDt);

// Allow some tolerance
double tol = 10e-14;
if (preciceDt - solverDt < tol) {
  // Use preciceDt, if difference between preciceDt and solverDt is small enough
  dt = preciceDt;
} else {
  dt = min(preciceDt, solverDt);
}
precice.readData("FluidMesh", "Displacements", vertexIDs, dt, displacements);
setDisplacements(displacements);
solveTimeStep(dt);
computeForces(forces);
precice.writeData("FluidMesh", "Forces", vertexIDs, forces);
// if dt = preciceDt, we will exactly reach the end of the window when calling advance
precice.advance(dt);
...
```
Here, a participant accepts `preciceDt`, even if it is bigger than `solverDt`, if the difference is not bigger than a certain tolerance `tol`. From the perspective of the participant this tolerance should be negligible with respect to the requirements (e.g. numerical stability)  that led to `solverDt`. With this modification the participant ensures that there is absolutely no difference between its internal time and the time used by preCICE and this eliminates the root cause for the error message from above.

{% note %}
The strategy presented above is only one possibility. Generally, the participant knows best how to determine the allowed time step size and there often are additional requirements you might want to consider, depending on the use case and discretization techniques the participant is using.
{% endnote %}

## First participant prescribes time step size

The `first` participant sets the time step size. This requires that the `second` participant runs after the `first` one. Thus, as stated above, this option is only applicable for serial coupling.

![First participant prescribes time step size](images/docs/couple-your-code-timestepping-first.png)

* The blue participant B is `first` and computes a step with its time step size (Step 1).
* In `advance`, this time step size is given to preCICE (Step 2).

```c++
precice.advance(dt);
```

* preCICE has tracked the time level of the orange participant A and returns the remainder to reach B's time step size.

```c++
preciceDt = precice.getMaxTimeStepSize();
```

* A computes its next (adaptive) time step size. It can now be larger or smaller than the remainder.

```c++
solverDt = beginTimeStep();
```

If it is larger, the remainder `preciceDt` is used instead (the case below in Step 3, dark orange is used).
If it is smaller, the participant's time step size `solverDt` can be used (not visualized).
These two cases are again reflected in the formula:

```c++
dt = min(preciceDt, solverDt)
```

* The procedure starts over with the blue participant B.

{% note %}
`preciceDt` on the blue side is always infinity such that `min(solverDt,preciceDt)==solverDt`.
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
