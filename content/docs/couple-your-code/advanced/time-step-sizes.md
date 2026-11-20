---
title: Time step sizes
keywords: api, adapter, advance, time, time-stepping, subcycling, adaptivity
summary: "There are various considerations when selecting time step sizes in preCICE."
---

## Accumulating error over time

preCICE uses the time step sizes `dt` passed to `advance(dt)` to track the overall point in time.
It does its best to reduce numerical error of accumulating these generally small time step sizes.
However, this is only possible if the passed `dt` themselves are computed in a way that minimizes numerical error.

An example on how a time step size can be of low precision is to compute the `dt` based on an absolute solver time.
The precision of this `dt` decreases with increasing absolute time.

<ul id="apiTabs" class="nav nav-tabs">
    <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" role="tab" href="#cpp-13">C++</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" role="tab" href="#python-13">Python</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-13" markdown="1">

```cpp
preciceDt = precice.getMaxTimeStepSize();
// BAD: compute the time using absolute values 
tBefore = currentSolverTime();
solveTimeStep(preciceDt);
tAfter = currentSolverTime();
dt = tAfter - tBefore
// this dt decreases in precision
precice.advance(dt);
```

</div>
<div role="tabpanel" class="tab-pane" id="python-13" markdown="1">

```python
precice_dt = precice.get_max_time_step_size()
# BAD: compute the time using absolute values 
t_before = current_solver_time()
solve_time_step(dt) 
t_after = current_solver_time()
dt = t_after - t_before
# this dt decreases in precision
precice.advance(dt)
```

</div>
</div>

A common symptom of using time step sizes with poor numerical precision are errors regarding either time step sizes or timestamped data samples such as:

* `The time step size given to preCICE in "advance" ... exceeds the maximum allowed time step size ...`
* `Data "D" cannot be read from mesh "M" as it contains no samples.`
* `readData(...) cannot sample data outside of current time window.`
* `Data D on mesh M1 didn't contain any data samples while attempting to map to mesh M2.`

The easiest way to prevent this in your adapter is to negotiate the time step as shown in [the step-by-step guide](/docs/couple-your-code/step-by-step/time-step-sizes/) and use this to both advance the solver and advance preCICE:

<ul id="apiTabs" class="nav nav-tabs">
    <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" role="tab" href="#cpp-12">C++</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" role="tab" href="#python-12">Python</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-12" markdown="1">

```cpp
preciceDt = precice.getMaxTimeStepSize();
solverDt = beginTimeStep(); // e.g. compute adaptive dt
// negotiate time step
dt = min(preciceDt, solverDt);
// pass the dt to both the solver and to preCICE
solveTimeStep(dt);
precice.advance(dt);
```

</div>
<div role="tabpanel" class="tab-pane" id="python-12" markdown="1">

```python
precice_dt = precice.get_max_time_step_size()
solver_dt = begin_time_step() # e.g. compute adaptive dt
# negotiate time step
dt = min(precice_dt, solver_dt)
# pass the dt to both the solver and to preCICE
solve_time_step(dt) 
precice.advance(dt)
```

</div>
</div>

If your solver directly uses the preCICE provided time step, then its best to directly pass the time step size to advance:

<ul id="apiTabs" class="nav nav-tabs">
    <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" role="tab" href="#cpp-14">C++</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" role="tab" href="#python-14">Python</a></li>
</ul>

<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-14" markdown="1">

```cpp
precice.advance(precice.getMaxTimeStepSize());
```

</div>
<div role="tabpanel" class="tab-pane" id="python-14" markdown="1">

```python
precice.advance(precice.get_max_time_step_size())
```

</div>
</div>

## Possible subcycling pitfall

If you are using very many small time steps in one window, you might see the following warning:

```txt
preCICE just returned a maximum time step size of <SOME DT>. Such a small value can happen if you use many sub steps per time window over multiple time windows due to added-up differences of machine precision.
```

The last time step ended up close to the end of the time-window without reaching it, leading to a very small final time step.
Such small time steps can lead to problems in the solver.

One strategy to avoid this situation is to extend the last time step of a time window preventing problematic time step sizes.
The following example extends the time step negotiation between the solver and preCICE to ensure the next time step size `preciceDt - solverDt` stays over some threshold `minDt`.
<ul id="apiTabs" class="nav nav-tabs">
    <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" role="tab" href="#cpp-5">C++</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" role="tab" href="#python-5">Python</a></li>
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

{{< note >}}
The strategy presented above is only one possibility. Generally, the solver knows best how to determine the allowed time step size and there often are additional requirements you might want to consider, depending on the use case and discretization techniques the participant is using.
{{< /note >}}
