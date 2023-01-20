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

## Next steps

- See which [output-files](running-output-files) preCICE creates.
- See how to run the case on a [distributed cluster](running-distributed).
