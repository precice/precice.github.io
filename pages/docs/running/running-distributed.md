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

## Running the simulation

Now open a terminal on each machine and navigate to the test setup.
Then run your solvers.

If you have logged into remote machine via SSH, then be careful to use a tool such a [`screen`](https://www.redhat.com/sysadmin/tips-using-screen) or [`tmux`](https://www.redhat.com/sysadmin/tips-using-tmux).
This allows to safely detach from a session without the running process getting killed.

If your cluster is managed using SLURM, then [further steps may be necessary](running-slurm).
