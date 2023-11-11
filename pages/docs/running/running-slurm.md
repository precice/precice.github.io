---
title: SLURM sessions
permalink: running-slurm.html
keywords: running, cluster, slurm, mpi
summary: "Running partitioned simulations on a cluster managed by SLURM requires special treatment of the provided MPI machines."
---

Please read how to run [preCICE simulations on distributed systems](running-distributed.html) first.

## SLURM and MPI

The [SLURM workload manager](https://slurm.schedmd.com/) is commonly used on clusters and is responsible for scheduling user-submitted jobs on a cluster.
These jobs describe

* the required resources (compute nodes, time, partitions),
* the environment of the job,
* the actual work as a series of shell commands.

The scheduling then distributes such jobs to maximise some criteria, such as the utilisation of the entire cluster.

Once a job is run, SLURM sets environment variable that tell MPI which nodes it may use.
Executing `mpirun ...` in the job script then automatically distributes the job an all available nodes.

## SLURM and partitioned simulations

Running multiple MPI jobs in parallel in a single job script is a very unusual use case and leads to problems tough.
Each invocation of `mpirun ...` uses the environment variables set by SLURM to determine which nodes to run on.
As both see the identical list of nodes, they double allocate the nodes starting at node 1.
This leads to an increased workload on the doubly-allocated nodes, while some nodes are unused (assuming as parallel coupling scheme).
Furthermore, this can lead to problems with communication build-up.

### Example of double allocation

```console
mpirun -n 2 ./A &
mpirun -n 4 ./B
```

Nodes   | 1   | 2   | 3   | 4   | 5   | 6
---     | --- | --- | --- | --- | --- | ---
A ranks | 0   | 1   |     |     |     |
B ranks | 0   | 1   | 2   | 3   |     |

In this case nodes 1 and 2 are double allocated, while nodes 5 and 6 aren't used at all.

## Partitioning available nodes

A viable remedy is to further partition the MPI session provided by SLURM and assign these partitions to the various MPI runs using hostfiles.

To generate a file containing a list of all hosts use:

```bash
#!/bin/bash
rm -f hosts.intel host.ompi
for host in `scontrol show hostname $SLURM_JOB_NODELIST`; do
  # IntelMPI requires one entry per node
  echo $host >> hosts.intel;
  # OpenMPI requires one entry per slot
  for j in $(seq 1 ${SLURM_TASKS_PER_NODE%%(*}); do
    echo $host >> hosts.ompi;
  done
done
```

If you have only 2 participants, you can partition the resulting file using `head` and `tail`:

```bash
# Example 2 hosts for A, the rest for B
head -2 hosts.ompi > hosts.a
tail +3 hosts.ompi > hosts.b
```

If you have more participants, you can extract sections with `sed`:

```bash
# Distributing 3 nodes of 24 tasks each to 3 participants
# One node per participant.
sed -n " 1,24p" hosts.ompi > hosts.a 
sed -n "25,48p" hosts.ompi > hosts.b
sed -n "49,72p" hosts.ompi > hosts.c 
```

{% warning %}
Hostfiles are not standardized and differ between OpenMPI, MPICH and IntelMPI.
{% endwarning %}

## Running partitioned simulations

Once you generated the necessary hostfiles, you can invoke `mpirun` multiple times:

```bash
# Group runs to prevent a failure from wasting resources
set -m
(
  mpirun -n 24 -hostfile hosts.a solverA &
  mpirun -n 24 -hostfile hosts.b solverB &
  mpirun -n 24 -hostfile hosts.c solverC &
  wait
)
echo "All participants succeeded"
```
