---
title: Running on a local machine
permalink: running-simple.html
keywords: running, mpi, local, workstation, laptop
summary: "Run your preCICE simulation on your local machine."
---

## Preparation

Before we run the simulation, let's check some very common pitfalls.

### The exchange directory

Whilst configuring the [inter-participant communication](configuration-communication), you specified an exchange directory.
preCICE uses this directory as a common meeting place to coordinate both participants.
It is common practise to use a relative path such as `..` here.

Please check if this exchange directory points to the same directory from the working directory of every participant in your simulation.
If your folder structure doesn't allow this, use a absolute path instead.

### Artifacts from previous runs

preCICE creates a folder called `precice-run` in this exchange directory.
This may include folders, but shouldn't include files.

You can check this by using `find` in your terminal.
The following command should not return anything:

```console
find precice-run -type f
```

If the `precice-run` folder contains files, delete the folder.

## Run the simulation manually

Now you are ready to run the simulation.

To do so, open one terminal window for each participant and navigate to their working directories.
Then run each solver in each terminal and observe what happens.

## Run the simulation using a script

Opening terminals can be very useful in the early stages of prototyping, but can become a bit tedious over time.

You can also run all the entire simulation in single script:

```bash
#!/bin/bash

# Print executed commands
set -e

# Group solvers to stop all if one fails
set -m
(
 # Launch solver A
 cd /path/to/solver/a
 ./runSolver &> a.log &

 # Launch solver B
 cd /path/to/solver/b
 ./runSolver &> b.log &

 # Launch solver C
 cd /path/to/solver/c
 ./runSolver  &> c.log &

 # Wait for every solver to finish
  wait
)
```

## Run locally in parallel using MPI

If your solvers support it, your can run simulations in parallel using MPI.
Whilst relatively simple to do on a single machine, this gets more complicated when dealing with distributed systems and job managers like SLURM, which are handled in following steps.

Running a single solver in parallel is the simplest case.
Here we start the parallel solver using `mpirun` and specify the amount of processes to spawn in parallel.
An example looks as follows:

```bash
#!/bin/bash

set -em
(
 # Launch solver A in serial
 cd /path/to/solver/a
 ./runSolver &> a.log &

 # Launch solver B in parallel using 4 processes
 cd /path/to/solver/b
 mpirun -n 4 ./runSolver &> b.log &

  wait
)
```

## Running multiple solvers using MPI

Running multiple solvers in parallel is more complicated.
Here we start all parallel solver using `mpirun` and specify the amount of processes to spawn in parallel.
MPI pins processes to cores to prevent the OS from moving them around.
It generally does this in sequence independent of other MPI runs, leading to multiple solvers getting pinned to the same core(s).
On a single machine, this can be avoided by telling `mpirun` which physical CPU cores to use.

Unfortunately, these options change from vendor to vendor.
Let's assume we want to run solver A with 2 parallel processes on cores 0 and 1, and B with 4 processes on cores 2, 3, 4, and 5.
Then the vendor-specific arguments for `mpirun <ARGS> ./runSolver` are:

MPI | Arguments for A | Arguments for B
--- | --- | ---
OpenMPI | `--cpu-set 0,1` | `--cpu-set 2,3,4,5`
MPICH | `-env HYDRA_BIND cpu:0,1 -n 2` | `-env HYDRA_BIND cpu:2,3,4,5 -n 4`
Intel MPI | `-env I_MPI_PIN_PROCESSOR_LIST 0-1 -n 2` | `-env I_MPI_PIN_PROCESSOR_LIST 2-5 -n 4`
MVAPICH2 | `-env MV2_CPU_MAPPING 0:1 -n 2` | `-env MV2_CPU_MAPPING 2:3:4:5 -n 4`
Microsoft MPI | `-env CCP_MPI_CPU_AFFINITY 0-1 -n 2` | `-env CCP_MPI_CPU_AFFINITY 2-5 -n 4´

Example for OpenMPI:

```bash
#!/bin/bash

set -em
(
 # Launch solver A on CPUs 0,1
 cd /path/to/solver/a
 mpirun --cpu-set 0,1 ./runSolver &> a.log &

 # Launch solver B on CPUs 2,3,4,5
 cd /path/to/solver/b
 mpirun --cpu-set 2,3,4,5 ./runSolver &> b.log &

  wait
)
```

## Next steps

- See which [output-files](running-output-files) preCICE creates.
- See how to run the case on a [distributed cluster](running-distributed).
