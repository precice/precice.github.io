---
title: Distributed systems
permalink: running-distributed.html
keywords: running, distributed, cluster, mainframe, cloud
summary: "Running preCICE simulations on a distributed system involves additional setup steps which are covered on this page."
---

## Distributed vs local

A distributed system and a single local system differ in two major ways:

1. The local system can rely on a loopback interface for internal communication.
   A distributed system requires communication between nodes using a common network.
2. The local system has unhindered access to the local files.
   A distributed system requires to use a shared network drive with higher latency.

So, there is additional work involved to set the simulation up.

## Common network interface

To setup communication, preCICE needs to exchange the endpoint information between participants.
When using `sockets`, preCICE defaults to endpoints of the loopback interface, which only works on the local system.
Follow the [instructions on how to configure the communication](configuration-communication) to select an appropriate network.

## Common filesystem

The common working directory requires a common filesystem.

Most cluster administrators provide a shared filesystem by default.
It is used to share datasets and provide common software to all nodes in the system.
preCICE does not require a fast underlying filesystem, but high latency on file creation can noticeably slow the initialization down.

In case you don't have access to a managed cluster and you want to use available workstations, then you have to setup this shared filesystem yourself.
The simplest may be to use a common network file share using samba. This is available on virtually all Linux distributions.
Another option is to mount a remote directory using an [SSH Filesystem (`sshfs`)](https://www.redhat.com/sysadmin/sshfs).
In any case, make sure that both are available as the same path on both machines. You can use [symbolic links](https://en.wikipedia.org/wiki/Symbolic_link) to simplify this task.

Shared filesystems on clusters and super computers are normally optimized for high-bandwidth.
This can become a serious performance bottleneck when [logging to a shared file](configuration-logging) the more ranks are involved in the simulation, prefer to log to `stdout` instead.

## Running the simulation

Now open a terminal on each machine and navigate to the test setup.
Then run your solvers.

If you have logged into remote machine via SSH, then be careful to use a tool such a [`screen`](https://www.redhat.com/sysadmin/tips-using-screen) or [`tmux`](https://www.redhat.com/sysadmin/tips-using-tmux).
This allows to safely detach from a session without the running process getting killed.

If your cluster is managed using SLURM, then [further steps may be necessary](running-slurm).

## Running participants in different systems

One advantage of communicating via TCP/IP sockets is that participants can be executed in different systems, even connected via the internet. This feature [has been demonstrated in the literature](https://doi.org/10.1007/978-3-031-40843-4_42) and has a few use cases, such as:

- Coupling participants with licenses restricting them to a specific system
- Coupling participants running on a cluster with GUI-based participants running locally, while exchanging only interface data
- Coupling participants running on containers or virtual machines (see [related discussion](https://precice.discourse.group/t/how-to-configure-precice-communication-on-kubernetes-with-tcp-port-access-control/1451))

You can achieve this by configuring an `m2n:sockets` communication interface with an explicitly-defined port, which you can then forward via your SSH connection. Since you only open one port, you need to select `enforce-gather-scatter`, so that only one rank of each participant communicates. For example:

```xml
<m2n:sockets port="12345" network="lo" acceptor="RemoteParticipant" connector="LocalParticipant" exchange-directory=".." enforce-gather-scatter="1"/>
```

We assume here the scenario of connecting a local laptop/workstation to a cluster, via a login node. First, connect via SSH to the login node of your cluster, forwarding connections to the local (`-L`) port 12345 to the remote port 12345 (of the login node):

```shell
ssh -L 12345:0.0.0.0:12345 user@login01.mycluster.edu
```

Then, in your job script, make the compute nodes forward any connections to remote (`-R`) port `12345` of the login node to the local port `12345` of the compute node (`-N`: without executing any commands)

```shell
ssh -R 12345:0.0.0.0:12345 login01 -N
```

The exchange directory also needs to be accessible by both participants, so that they can both access the `precice-run/` directory, which stores the addresses to find each other.
