---
title: Problems with Establishing the Communication
permalink: troubleshooting-communication.html
keywords: troubleshooting, communication
summary: "This page gives you guidance on common communication problems between preCICE participants."
---

This is a standard issue that many users face. You start both solver of your coupled simulation and they both hang at: 
```
(0) 18:57:09 [impl::SolverInterfaceImpl]:253 in initialize: Setting up master communication to coupling partner/s
```
What could be the problem? Let's take one step back and have a look how preCICE sets up the communication. In order to establish the communication between the master ranks of both solvers, preCICE exchanges initial communication data by writing them into the directory `precice-run/`. You can define the location where this file is written and read in the configuration (_exchange-directory_). 

Note: Before v1.6.0, this data were written to a hidden file called `.MySolver1-MySolver2.address`.

Several things can go wrong now: 

## Problem 1: Wrong relative folders

From the folders where you start your two solvers, the _exchange-directory_ needs to point to the same location. For example, you start both solvers in the same folder. Then, the exchange-directory could be `"."`. This is also the default value, so you don't need to define this in the preCICE configuration. However, if you start both solvers from sub-folders `Folder1` and `Folder2`, you should configure:
```xml
<m2n:sockets from="MySolver1" to="MySolver2" exchange-directory="../"/>
``` 

## Problem 2: Wrong permissions

Do you have write and read permissions on the exchange directory? What does `ls -la` say?

## Problem 3: Dirty files from last run

If your simulation crashes during initialization, there might leftover address files from the last run. We normally clean them up, but if your simulation just crashes at the wrong moment, we might have had no chance to do that for you. Go look for old address files and remove them, i.e. **delete the directory `precice-run`**.

Before preCICE v1.6.0, these files used to be named `.Participant1-Participant2.address`.

## Problem 4: Network-related issues

In case you are using a supercomputer / cluster, make sure that you are specifying the appropriate network interface in the configuration file (e.g. `network="ib0"`). The default for network is the loopback interface `lo`. For a particular cluster, you need to find out what the actual network interface is called. Often it is `ib0` (for infiniband) or `eth0` (for older linux systems). You can try to find it out by using the command `ip link`. In doubt, contact your cluster administrator. 

There is currently an [issue](https://github.com/precice/precice/issues/45) preventing the communication of participants when there is no network connection (even when the communication is completely local). We are currently working on this issue.

***

All that does not help? Do the [tests](Tests) work for you? Changing from _sockets_ to _mpi_ and vice versa might give more insight. [Let us know!](https://www.precice.org/resources/#contact)  

