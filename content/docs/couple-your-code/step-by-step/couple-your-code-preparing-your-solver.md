---
title: Step 1 – Preparation
permalink: couple-your-code-preparing-your-solver.html
keywords: api, adapter, library, software engineering, CFD, fluid
summary: "If you want to couple your own code you need to properly understand it. That is why, in this first step, we have a look at your own code. We discuss what you need to do to prepare the code for coupling."
---

Let's say you want to prepare a fluid solver for fluid-structure interaction and that your code looks like this:

<ul id="apiTabs" class="nav nav-tabs">
    <li class="active"><a href="#cpp" data-toggle="tab">C++</a></li>
    <li><a href="#python" data-toggle="tab">Python</a></li>
</ul>
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="cpp" markdown="1">

```cpp
turnOnSolver(); //e.g. setup and partition mesh

double dt; // solver time step size

while (not simulationDone()){ // time loop
  dt = beginTimeStep(); // e.g. compute adaptive dt
  solveTimeStep(dt);
  endTimeStep(); // e.g. update variables, increment time
}
turnOffSolver();

```

</div>
<div role="tabpanel" class="tab-pane" id="python" markdown="1">

```python
turn_on_solver() #e.g. setup and partition mesh

while not simulation_done(): # time loop
  dt = begin_time_step() #e.g compute adaptive dt
  solve_time_step(dt)
  end_time_step() #e.g. update variables, increment time

turn_off_solver()
```

</div>
</div>
Probably most solvers have such a structures: something in the beginning (reading input, domain decomposition), a big time loop, and something in the end. Each time step also falls into three parts: some pre-computations (e.g. computing an adaptive time step size), the actual computation (solving a linear or non-linear equation system), and something in the end (updating variables, incrementing time). Try to identify these parts in the code you want to couple.

In the following steps, we will slowly add more and more calls to the preCICE API in this code snippet. Some part of the preCICE API is briefly described in each step. More precisely (no pun intended :grin:), we use the native `C++` API of preCICE. The API is, however, also available in other scientific programming languages: plain `C`, `Fortran`, `Python`, `Matlab`, `Julia`, and `Rust` (see [Application Programming Interface](couple-your-code-api)).

{% tip %}
Also have a look at the [definite C++ API documentation](https://precice.org/doxygen/main/classprecice_1_1Participant.html).
{% endtip %}

{% tip %}
Looking for best practices? There are [guidelines for adapters](community-guidelines-adapters.html) and [guidelines for application cases](community-guidelines-application-cases.html).
{% endtip %}

{% note %}
This example refers to preCICE v3.x: [see the differences from preCICE v2.x](couple-your-code-porting-v2-3.html).
{% endnote %}
