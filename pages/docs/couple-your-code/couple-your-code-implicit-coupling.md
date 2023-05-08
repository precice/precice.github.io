---
title: Step 6 – Implicit coupling
permalink: couple-your-code-implicit-coupling.html
keywords: api, adapter, coupling schemes, checkpoint, fixed-point
summary: "In previous steps, we only considered explicit coupling. We now move onto implicit coupling, so sub-iterating each time step multiple times until a convergence threshold is reached. This stabilzes strongly-coupled problems."
---

The main ingredient needed for implicit coupling is move backwards in time. For that, we need a [flux capacitor](https://www.youtube.com/watch?v=VcZe8_RZO8c). Just kidding :wink:. What we really need is that your solver can write and read iteration checkpoints. An iteration checkpoint should contain all the information necessary to reload a previous state of your solver. What exactly is needed depends solely on your solver. preCICE tells you when you need to write and read checkpoints. To this end, preCICE uses the following action interface:

```cpp
bool isActionRequired(const std::string& action)
void markActionFulfilled(const std::string& action)
const std::string& constants::actionReadIterationCheckpoint()
const std::string& constants::actionWriteIterationCheckpoint()
```

* `isActionRequired` inquires the necessity of a certain action. It takes a string argument to reference the action.
* `markActionFulfilled` tells preCICE that the action is fulfilled. This is a simple safeguard. If a certain action is required and you did not mark it as fulfilled preCICE will complain.
* The Methods in the `precice::constants` namespace return strings to reference specific actions. For implicit coupling, we need `actionReadIterationCheckpoint` and `actionWriteIterationCheckpoint`.

Let's extend our example code to also handle implicit coupling.

```cpp
turnOnSolver(); //e.g. setup and partition mesh

precice::SolverInterface precice("FluidSolver","precice-config.xml",rank,size); // constructor

const std::string& coric = precice::constants::actionReadIterationCheckpoint();
const std::string& cowic = precice::constants::actionWriteIterationCheckpoint();

int dim = precice.getDimension();
int meshID = precice.getMeshID("FluidMesh");
int vertexSize; // number of vertices at wet surface
// determine vertexSize
double* coords = new double[vertexSize*dim]; // coords of vertices at wet surface
// determine coordinates
int* vertexIDs = new int[vertexSize];
precice.setMeshVertices(meshID, vertexSize, coords, vertexIDs);
delete[] coords;

int displID = precice.getDataID("Displacements", meshID);
int forceID = precice.getDataID("Forces", meshID);
double* forces = new double[vertexSize*dim];
double* displacements = new double[vertexSize*dim];

double solverDt; // solver time step size
double preciceDt; // maximum precice time step size
double dt; // actual time step size
```
<!-- Long code blocks need to be split. See https://github.com/precice/precice.github.io/commit/74e377cece4a221e00b5c56b1db3942ec70a6272 -->
```cpp
preciceDt = precice.initialize();
while (precice.isCouplingOngoing()){
  if(precice.isActionRequired(cowic)){
    saveOldState(); // save checkpoint
    precice.markActionFulfilled(cowic);
  }
  solverDt = beginTimeStep(); // e.g. compute adaptive dt
  dt = min(preciceDt, solverDt);
  precice.readBlockVectorData(displID, vertexSize, vertexIDs, displacements);
  setDisplacements(displacements);
  solveTimeStep(dt);
  computeForces(forces);
  precice.writeBlockVectorData(forceID, vertexSize, vertexIDs, forces);
  preciceDt = precice.advance(dt);
  if(precice.isActionRequired(coric)){ // time step not converged
    reloadOldState(); // set variables back to checkpoint
    precice.markActionFulfilled(coric);
  }
  else{ // time step converged
    endTimeStep(); // e.g. update variables, increment time
  }
}
precice.finalize(); // frees data structures and closes communication channels
delete[] vertexIDs, forces, displacements;
turnOffSolver();
```

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
