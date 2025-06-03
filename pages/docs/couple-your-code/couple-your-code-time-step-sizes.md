---
title: Step 5 – Non-matching time step sizes
permalink: couple-your-code-time-step-sizes.html
keywords: api, adapter, advance, timestepping, subcycling, adaptivity
summary: "In this step, you learn how preCICE handles non-matching time step sizes and a few more things about simulation time."
redirect_from:
  - couple-your-code-timestep-sizes.html
---

In previous steps, you have already seen that there are quite some things going on with time step sizes. Let us now have a look at what is actually happening.
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-1" data-toggle="tab">C++</a></li>
    <li><a href="#python-1" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-1" markdown="1">

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

</div>
<div role="tabpanel" class="tab-pane" id="python-1" markdown="1">

```python
...
solver_dt = 0 # solver time step size
precice_dt = 0 # maximum precice time step size
dt = 0  # actual time step size

precice.initialize()
while not simulation_done(): # time loop
  precice_dt = precice.get_max_time_step_size()
  solver_dt = begin_time_step() # e.g. compute adaptive dt
  dt = min(precice_dt, solver_dt)
  solve_time_step(dt) 
  precice.advance(dt)
  end_time_step() # e.g. update variables, increment time
```

</div>
</div>
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

<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-2" data-toggle="tab">C++</a></li>
    <li><a href="#python-2" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-2" markdown="1">

```c++
preciceDt = precice.getMaxTimeStepSize();
```

</div>
<div role="tabpanel" class="tab-pane" id="python-2" markdown="1">

```python
precice_dt = precice.get_max_time_step_size()
```

</div>
</div>
* Both participants compute their next (adaptive) time step size. It can be larger or smaller than the remainder `preciceDt`.
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-3" data-toggle="tab">C++</a></li>
    <li><a href="#python-3" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-3" markdown="1">

```c++
solverDt = beginTimeStep();
```

</div>
<div role="tabpanel" class="tab-pane" id="python-3" markdown="1">

```python
solver_dt = begin_time_step()
```

</div>
</div>
If it is larger, the remainder `preciceDt` is used instead (orange participant, dark orange is used).
If it is smaller, the participant's time step size `solverDt` can be used (blue participant, dark blue is used).
These two cases are reflected in:
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-4" data-toggle="tab">C++</a></li>
    <li><a href="#python-4" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-4" markdown="1">

```c++
dt = min(preciceDt, solverDt)
```

</div>
<div role="tabpanel" class="tab-pane" id="python-4" markdown="1">

```python
dt = min(precice_dt, solver_dt)
```

</div>
</div>
* Once both participants reach the end of the time window, coupling data is exchanged.

{% note %}
This procedure is independent of whether a serial or a parallel coupling scheme is used.
For parallel coupling, both solvers run together and everything happens simultaneously in both participants, while for serial coupling, the first participant needs reach the end of the window before the second one can start.
{% endnote %}

### Possible subcycling pitfall

If you are using very many small time steps in one window, you might see the following warning:

```txt
preCICE just returned a maximum time step size of <SOME DT>. Such a small value can happen if you use many sub steps per time window over multiple time windows due to added-up differences of machine precision.
```

The last time step ended up close to the end of the time-window without reaching it, leading to a very small final time step.
Such small time steps can lead to problems in the solver.

One strategy to avoid this situation is to extend the last time step of a time window preventing problematic time step sizes.
The follow example extends the time step negotiation between the solver and preCICE to ensure the next time step size `preciceDt - solverDt` stays over some threshold `minDt`.
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-5" data-toggle="tab">C++</a></li>
    <li><a href="#python-5" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-5" markdown="1">

```cpp
...
solverDt = beginTimeStep(); // e.g. compute adaptive dt
// Can lead to using a dt that only approximately reaches end of time window
// dt = min(preciceDt, solverDt);

// Specify a minimal time step size
double minDt = 10e-14;
if (preciceDt - solverDt < minDt) {
  // The next time step would be too small or surpass the end
  dt = preciceDt;
} else {
  dt = solverDt;
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

</div>
<div role="tabpanel" class="tab-pane" id="python-5" markdown="1">

```python
...
solver_dt = begin_time_step() # e.g. compute adaptive dt
# Can lead to using a dt that only approximately reaches end of time window
# dt = min(precice_dt, solver_dt);

# Specify a minimal time step size
min_dt = 10e-14
if precice_dt - solver_dt < min_dt:
  dt = precice_dt
else:
  dt = solver_dt
displacements = precice.read_data("FluidMesh", "Displacements", vertex_ids, dt)
set_displacements(displacements)
solve_time_step(dt)
forces = compute_forces()
precice.write_data("FluidMesh", "Displacements", vertex_ids, forces)
# if dt = preciceDt, we will exactly reach the end of the window when calling advance
precice.advance(dt)
...
```

</div>
</div>

{% note %}
The strategy presented above is only one possibility. Generally, the participant knows best how to determine the allowed time step size and there often are additional requirements you might want to consider, depending on the use case and discretization techniques the participant is using.
{% endnote %}

## First participant prescribes time step size

The `first` participant sets the time step size. This requires that the `second` participant runs after the `first` one. Thus, as stated above, this option is only applicable for serial coupling.

![First participant prescribes time step size](images/docs/couple-your-code-timestepping-first.png)

* The blue participant B is `first` and computes a step with its time step size (Step 1).
* In `advance`, this time step size is given to preCICE (Step 2).

<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-6" data-toggle="tab">C++</a></li>
    <li><a href="#python-6" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-6" markdown="1">

```c++
precice.advance(dt);
```

</div>
<div role="tabpanel" class="tab-pane" id="python-6" markdown="1">

```python
precice.advance(dt)
```

</div>
</div>
* preCICE has tracked the time level of the orange participant A and returns the remainder to reach B's time step size.
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-7" data-toggle="tab">C++</a></li>
    <li><a href="#python-7" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-7" markdown="1">

```c++
preciceDt = precice.getMaxTimeStepSize();
```

</div>
<div role="tabpanel" class="tab-pane" id="python-7" markdown="1">

```python
precice_dt = precice.get_max_time_step_size()
```

</div>
</div>
* A computes its next (adaptive) time step size. It can now be larger or smaller than the remainder.
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-8" data-toggle="tab">C++</a></li>
    <li><a href="#python-8" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-8" markdown="1">

```c++
solverDt = beginTimeStep();
```

</div>
<div role="tabpanel" class="tab-pane" id="python-8" markdown="1">

```python
solver_dt = begin_time_step()
```

</div>
</div>

If it is larger, the remainder `preciceDt` is used instead (the case below in Step 3, dark orange is used).
If it is smaller, the participant's time step size `solverDt` can be used (not visualized).
These two cases are again reflected in the formula:
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-9" data-toggle="tab">C++</a></li>
    <li><a href="#python-9" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-9" markdown="1">

```c++
dt = min(preciceDt, solverDt);
```

</div>
<div role="tabpanel" class="tab-pane" id="python-9" markdown="1">

```python
dt = min(precice_dt, solver_dt)
```

</div>
</div>

* The procedure starts over with the blue participant B.

{% note %}
`preciceDt` on the blue side is always infinity such that `min(solverDt,preciceDt)==solverDt`.
{% endnote %}

{% important %}
You never need to alter your code if you want to switch the first and second participant, if you want to switch between a serial and a parallel coupling scheme, or if you want to switch between `fixed` and `first-participant` timestepping. Everything can be configured. Even if implicit coupling is used.
{% endimportant %}

## Steering the end of the simulation

One last thing about time. There is also a helper function in preCICE that allows you to steer the end of a coupled simulation:
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-10" data-toggle="tab">C++</a></li>
    <li><a href="#python-10" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-10" markdown="1">

```c++
bool isCouplingOngoing();
```

</div>
<div role="tabpanel" class="tab-pane" id="python-10" markdown="1">

```python
is_ongoing = is_coupling_ongoing()
```

</div>
</div>

This functions looks at `max-time-windows` and `max-time` as defined in the preCICE configuration and knows when it is time to go. Then, you should call `finalize`. It replaces your `simulationDone()`.
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-11" data-toggle="tab">C++</a></li>
    <li><a href="#python-11" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-11" markdown="1">

```c++
while (precice.isCouplingOngoing()){ // time loop
  ...
}
precice.finalize();
```

</div>
<div role="tabpanel" class="tab-pane" id="python-11" markdown="1">

```python
while precice.is_coupling_ongoing(): # time loop
  ...
precice.finalize()  
```

</div>
</div>
