---
title: Step 6 – Implicit coupling
permalink: couple-your-code-implicit-coupling.html
keywords: api, adapter, coupling schemes, checkpoint, fixed-point
summary: "In previous steps, we only considered explicit coupling. We now move onto implicit coupling, so sub-iterating each time step multiple times until a convergence threshold is reached. This stabilizes strongly-coupled problems."
---

The main ingredient needed for implicit coupling is move backwards in time. For that, we need a [flux capacitor](https://www.youtube.com/watch?v=VcZe8_RZO8c). Just kidding 😉. What we really need is that your solver can write and read iteration checkpoints. An iteration checkpoint should contain all the information necessary to reload a previous state of your solver. What exactly is needed depends solely on your solver. preCICE tells you when you need to write and read checkpoints. To this end, preCICE uses the following interface:
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-1" data-toggle="tab">C++</a></li>
    <li><a href="#python-1" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-1" markdown="1">

```cpp
bool requiresWritingCheckpoint()
bool requiresReadingCheckpoint()
```

</div>
<div role="tabpanel" class="tab-pane" id="python-1" markdown="1">

```python
requires_writing_checkpoint()
requires_reading_checkpoint()
```

</div>
</div>
These functions perform double duty:

1. They inform the adapter that writing or reading a checkpoint is required by the solver.
2. They let preCICE know that your adapter is capable of implicit coupling. preCICE will show an error if you configure implicit coupling without calling these functions.

Let's extend our example code to also handle implicit coupling.
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-2" data-toggle="tab">C++</a></li>
    <li><a href="#python-2" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-2" markdown="1">

```cpp
turnOnSolver(); //e.g. setup and partition mesh

precice::Participant precice("FluidSolver","precice-config.xml",rank,size); // constructor

// [...] define mesh

double solverDt; // solver time step size
double preciceDt; // maximum precice time step size
double dt; // actual time step size
```

</div>
<div role="tabpanel" class="tab-pane" id="python-2" markdown="1">

```python
turn_on_solver() # eg: setup and partition mesh
precice = precice.Participant("FluidSolver", "precice-config.xml", rank, size) # construct participant

# [... ] define mesh 
```

</div>
</div>
<!-- Long code blocks need to be split. See https://github.com/precice/precice.github.io/commit/74e377cece4a221e00b5c56b1db3942ec70a6272 -->
<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp-3" data-toggle="tab">C++</a></li>
    <li><a href="#python-3" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="cpp-3" markdown="1">

```cpp
precice.initialize();
while (precice.isCouplingOngoing()){
  if(precice.requiresWritingCheckpoint()){ // new time window
    saveOldState(); // save checkpoint
  }
  preciceDt = precice.getMaxTimeStepSize();
  solverDt = beginTimeStep(); // e.g. compute adaptive dt
  dt = min(preciceDt, solverDt);
  precice.readData("FluidMesh", "Displacements", vertexIDs, dt, displacements);
  setDisplacements(displacements);
  solveTimeStep(dt);
  computeForces(forces);
  precice.writeData("FluidMesh", "Forces", vertexIDs, forces);
  precice.advance(dt);
  if(precice.requiresReadingCheckpoint()){ // iteration did not converge
    reloadOldState(); // set variables back to checkpoint
  }
  else{ // iteration converged
    endTimeStep(); // e.g. update variables, increment time
  }
}
precice.finalize(); // frees data structures and closes communication channels
turnOffSolver();
```

</div>
<div role="tabpanel" class="tab-pane" id="python-3" markdown="1">

```python
precice.initialize()
while precice.is_coupling_ongoing():
  if precice.requires_writing_checkpoint():
    save_old_state()
  
  precice_dt = precice.get_max_time_step_size()
  solver_dt = begin_time_step()
  dt = min(precice_dt, solver_dt)
  displacements = precice.read_data("FluidMesh", "Displacements", vertexIDs, dt)
  set_displacements(displacements)
  solve_time_step(dt)
  forces = compute_forces()
  precice.write_data("FluidMesh", "Forces", vertex_ids, forces)
  precice.advance(dt)

  if precice.requires_reading_checkpoint():
    reload_old_state()
  else:
    end_time_step()

precice.finalize()
turn_off_solver()
```

</div>
</div>
The methods `saveOldState` and `reloadOldState` need to be provided by your solver. You wonder when writing and reading checkpoints is required? Well, that's no black magic. In the first coupling iteration of each time window, preCICE tells you to write a checkpoint. In every iteration in which the coupling does not converge, preCICE tells you to read a checkpoint. This gets a bit more complicated if your solver subcycles (we learned this in [Step 5](couple-your-code-time-step-sizes)), but preCICE still does the right thing. By the way, the actual convergence measure is computed in `advance` in case you wondered about that as well.

{% important %}
Did you see that we moved the function `endTimeStep()` into the `else` block? This is to only move forward in time if the coupling converged. With this neat trick, we do not need two loops (a time loop and a coupling loop), but both are combined into one.
{% endimportant %}

Of course, with the adapted code above, explicit coupling still works. You do not need to alter your code for that. In case of explicit coupling, both actions reading and writing iteration checkpoints always return `false`.

At this state, you can again test your adapted solver against a [solver dummy](couple-your-code-api#minimal-reference-implementations). Make sure to adjust the config file for implicit coupling scheme:

```xml
[...]
<coupling-scheme:serial-implicit>
  <participants first="FluidSolver" second="SolidSolver" />
  <max-time-windows value="10" />
  <time-window-size value="1.0" />
  <max-iterations value="15" />
  <relative-convergence-measure limit="1e-3" data="Displacements" mesh="StructureMesh"/>
  <exchange data="Forces" mesh="StructureMesh" from="FluidSolver" to="SolidSolver" />
  <exchange data="Displacements" mesh="StructureMesh" from="SolidSolver" to="FluidSolver"/>
</coupling-scheme:serial-implicit>
[...]
```

{% tip %}
For stability and faster convergence also use an [acceleration method](configuration-acceleration).
{% endtip %}

{% important %}
You need to implement `saveOldState` and `reloadOldState` in such a way that a single coupling iteration becomes a proper function. Meaning, for two times the same input (the values you read from preCICE), the solver also needs to return two times the same output (the values you write to preCICE). Only then can the quasi-Newton acceleration methods work properly. This means, you need to include as much information in the checkpoint as necessary to really be able to go back in time. Storing complete volume data of all variables is the brute-force option. Depending on your solver, there might also be more elegant solutions. Be careful: this also needs to work if you jump back in time more than one time step.
{% endimportant %}
