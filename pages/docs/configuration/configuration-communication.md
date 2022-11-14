---
title: Communication configuration
permalink: configuration-communication.html
keywords: configuration, communication, m2n tag, intra-comm tag
summary: A very basic ingredient to coupling is communication. The participants you want to couple need to be able to communicate data. On this page, we explain how communication between participants can be configured. 
---

## The m2n tag

For each two participants that should exchange data, you have to define a m2n communication, for example like this:

```xml
<m2n:sockets from="MySolver1" to="MySolver2" exchange-directory="../"/>
```

This establishes an `m2n` (i.e. parallel, from the M processes of the one participant to the N processes of the other) communication channel based on TCP/IP `sockets` between `MySolver1` and `MySolver2`.
The used network defaults to the loopback network of your OS, which allows running multiple participants on a single machine.
Certain systems may not provide a loopback interface, in which case you need to specify a network interface yourself.

In some situations, you may need to manually specify a network interface.
The most common case being participants distributed over multiple hosts aka running on clusters.
This may also be the case if you use participants in isolated Docker containers or if your system doesn't provide a loopback interface.

To manually specify a network interface use the `network="..."` attribute.
Common interface on clusters are the local ethernet `"eth0"` or the infiniband system `"ib0"`.

```xml
<m2n:sockets from="MySolver1" to="MySolver2" network="ib0" />
```

On Unix systems, you can list network interfaces using the following command:

```console
$ ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 52:54:00:e0:03:62 brd ff:ff:ff:ff:ff:ff
```

The alternative to TCP/IP sockets is MPI ports (an MPI 2.0 feature):

```xml
<m2n:mpi .../>
```

In preCICE, we always start simulations in separated MPI communicators (remember: we start solvers in different terminals, with their own `mpirun` commands), a feature that highly improves flexibility (solvers do not need to be in the same MPI communicator at any time). As the MPI ports functionality is not a highly used feature of MPI (at least not with separated `MPI_COMM_WORLD` communicators), it has robustness issues for several MPI implementations ([for OpenMPI, for example](https://github.com/precice/precice/issues/746)). In principle, MPI gives you faster communication roughly by a factor of 10 (see [Benjamin Uekermann's dissertation](https://mediatum.ub.tum.de/doc/1320661/document.pdf), section 4.2.3), but, for most applications, you will not feel any difference as both are very fast. We recommend using `sockets` by default, unless you are performing large performance-critical simulations with very large coupling meshes combined with a high total time-window count.
There are no hard limits regarding vertex or time-window count for when this change makes sense, as the the preCICE configuration and the solver-provided mesh partitioning hugely impact the required communication load. The only reliable decision process is to measure the impact of the change on the run-time of `initialize` and `advance` calls. See the section on [performance analysis](tooling-performance-analysis) for more information.

Which participant is `from` and which one is `to` makes almost no difference and cannot lead to deadlock. Only for massively parallel runs, it can make a performance difference at initialization. For such cases, [ask us for advice](https://precice.discourse.group/new-topic).

The `exchange-directory` should point to the same location for both participants. We use this location to exchange hidden files with initial connection information. It defaults to `"."`, i.e. both participants need to be started in the same folder. We give some best practices on how to arrange your folder structure and start the coupled solvers in the page [running on a local machine](running-simple.html).  

{% important %}
If you face any problems with establishing the communication, have a look [at this Discourse post](https://precice.discourse.group/t/help-the-participants-are-not-finding-each-other/646/2).
{% endimportant %}

## Advanced: the intra-comm tag

If you build preCICE without MPI (and **only** in this case) you might also need to change the communication preCICE uses to communicate between ranks of a single parallel participant. You can specify to use TCP/IP sockets with:

```xml
<participant name="MySolver1"> 
...
<intra-comm:sockets/>   
...
</participant>
```
