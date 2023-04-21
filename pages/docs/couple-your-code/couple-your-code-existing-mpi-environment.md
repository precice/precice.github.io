---
title: Initialization in existing MPI environment
permalink: couple-your-code-existing-mpi-environment.html
keywords: api, adapter, parallelization, mpi, initialization
summary: "preCICE uses MPI for communication between different participants (and also for communication between ranks of the same participant). So are there any problems if the solver that you intend to couple also already uses MPI (e.g. for parallelization)? Who should initialize MPI? Who should finalize MPI? This is what we discuss here."
---

It is not complicated. There are just three rules that preCICE follows:

* preCICE only initializes MPI if it is not yet initialized (by e.g. the solver you want to couple).
* preCICE finalizes MPI if and only if it was also initialized by preCICE.
* preCICE only initializes MPI if it needs MPI.

So what does this mean for your adapter code:

* Initialize preCICE after you initialize MPI.
* Finalize preCICE before you finalize MPI.

```cpp
[...] // start up your solver

MPI_Init(NULL, NULL);
int world_rank, world_size;
MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);
MPI_Comm_size(MPI_COMM_WORLD, &world_size);

[...] // maybe more initialization

precice::SolverInterface precice("SolverName", world_rank, world_size);
precice.configure("precice-config.xml");

[...] // declare meshes vertices etc.

double preciceDt = precice.initialize();

[...] // solving and coupling

precice.finalize();

[...] // more finalization

MPI_Finalize();

```
