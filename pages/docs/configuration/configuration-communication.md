---
title: Communication configuration
permalink: configuration-communication.html
keywords: configuration, communication, m2n tag, master tag
summary: A very basic ingredient to coupling is communication. The participants you want to couple need to be able to communicate data. On this page, we explain how communication between participants can be configured. 
---

## The m2n tag

For each two participants that should exchange data, you have to define an m2n communication, for example like this:
```xml
<m2n:sockets from="MySolver1" to="MySolver2" exchange-directory="../"/>
```
This establishes an `m2n` (i.e. parallel, from the M processes of the one participant to the N processes of the other) communication channel based on TCP/IP `sockets` between `MySolver1` and `MySolver2`. 

For certain systems, you need to specify the network over which the TCP/IP sockets get connected: `network="..."`. It defaults to `"lo"`. For some clusters, you could use the infiniband, e.g. `"ib0"`. macOS is also a [special case](macOS).  

The alternative to TCP/IP sockets is MPI ports (an MPI 2.0 feature):
```xml
<m2n:mpi .../>
```
As the ports functionality is not a highly used feature of MPI, it has robustness issues for several MPI implementations ([for OpenMPI, for example](TODO)). In principle, MPI gives you faster communication roughly by a factor of 10, but, for most applications, you will not feel any difference as both are very fast. We recommend using `sockets`. 

Which participant is `from` and which one is `to` makes almost no difference and cannot lead to deadlock. Only for massively parallel runs, it can make a performance difference at initialization. For such cases, [ask us for advice](TODO).

The `exchange-directory` should point to the same location for both participants. We use this location to exchange hidden files with initial connection information. It defaults to `"."`, i.e. both participants need to be started in the same folder. We give some best practices on how to arrange your folder structure and start the coupled solvers [here](TODO).  

{% include important.html content="If you face any problems with establishing the communication, have a look [here](TODO)." %}



## Advanced: the master tag

If you build preCICE without MPI (and **only** in this case) you might also need to change the communication preCICE uses to communicate between ranks of a single parallel participant. You can specify to use TCP/IP sockets with:

```xml
<participant name="MySolver1"> 
...
<master:sockets/>   
...
</participant>
```


