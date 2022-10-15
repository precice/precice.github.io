---
title: Step 2 – Steering methods
permalink: couple-your-code-steering-methods.html
keywords: api, adapter, initialization, advance, finalize, workflow
summary: "In this step, you get to know the most important API functions of preCICE: initialize, advance, and finalize."
---


As a first preparation step, you need to include the preCICE library headers. In C++, you need to include the file [precice.hpp](https://github.com/precice/precice/blob/develop/src/precice/precice.hpp).
The handle to the preCICE API is the class `precice::Participant`. Its constructor requires the participant's name, the preCICE configuration file's name and the `rank` and `size` of the current thread. Once the basic preCICE interface is set up, we can _steer_ the behaviour of preCICE. For that we need the following functions:

```cpp
Participant( String participantName, String configurationFileName, int rank, int size );
void initialize();
void advance ( double computedTimeStepSize );
void finalize();
```

What do they do?

* `initialize` establishes communication channels and sets up data structures of preCICE.
* `advance` needs to be called after the computation of every time step to _advance_ the coupling. As an argument, you have to pass the solver's last time step size (`dt`). Additionally, it maps coupling data between the coupling meshes, it communicates coupling data between the coupled participants, and it accelerates coupling data. One could say the complete coupling happens within this single function.
* `finalize` frees the preCICE data structures and closes communication channels.

The following function allows us to query the maximum allowed time step size from preCICE:


<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp" data-toggle="tab">C++</a></li>
    <li><a href="#python" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="cpp" markdown="1">
```cpp
double getMaxTimeStepSize();
```

But let's ignore the details of time step sizes for the moment. This will be the topic of [Step 5](couple-your-code-time-step-sizes.html). We can now extend the code of our fluid solver:

```cpp
#include <precice/precice.hpp>

turnOnSolver(); //e.g. setup and partition mesh

precice::Participant precice("FluidSolver","precice-config.xml",rank,size); // constructor

double solverDt; // solver time step size
double preciceDt; // maximum precice time step size
double dt; // actual time step size

precice.initialize();
while (not simulationDone()){ // time loop
  preciceDt = getMaxTimeStepSize();
  solverDt = beginTimeStep(); // e.g. compute adaptive dt
  dt = min(preciceDt, solverDt); // more about this in Step 5
  solveTimeStep(dt);
  precice.advance(dt);
  endTimeStep(); // e.g. update variables, increment time
}
precice.finalize(); // frees data structures and closes communication channels
turnOffSolver();
```
  </div>
  <div role="tabpanel" class="tab-pane" id="python" markdown="1">
```python
import precice

turn_on_solver()  # e.g. setup and partition mesh

precice = precice.Interface(
    "FluidSolver", "precice-config.xml", rank, size
)
precice_dt = precice.initialize()

u = initialize_solution()

while t < t_end:  # time loop
    dt = compute_adaptive_dt()
    dt = min(precice_dt, dt)  # more about this in Step 5
    u = solve_time_step(dt, u)  # returns new solution
    precice_dt = precice.advance(dt)
    t = t + dt

precice.finalize()  # frees data structures and closes communication channels
```
  </div>
</div>

