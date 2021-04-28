---
title: Mesh exchange example
permalink: configuration-coupling-mesh-exchange.html
keywords: configuration, mesh exchange, example, read, write
summary: If you struggle with which mesh you should use where in the configuration and whether a mapping is read or write, you might find this example helpful. 
---

People that are new to preCICE typically struggle with the same things in the configuration:

* What does it mean that a mapping is a "write" mapping?
* Which mesh should be received "from" another participant?
* Which mesh should be mentioned in the `exchange` tag?

## Example configuration

All this sounds complicated at first, but is relatively clear once you draw the right picture. Let's do this here exemplary for the following configuration file:

```xml
...
<participant name="MySolver1"> 
    <use-mesh name="MyMesh1" provide="yes"/> 
    <use-mesh name="MyMesh2" from="MySolver2"/> 
    <read-data name="Temperature" mesh="MyMesh1"/> 
    <write-data name="Forces" mesh="MyMesh1"/> 
    <mapping:nearest-neighbor direction="read" from="MyMesh2" to="MyMesh1" constraint="consistent"/>
    <mapping:nearest-neighbor direction="write" from="MyMesh1" to="MyMesh2" constraint="conservative"/>
...
</participant>

<participant name="MySolver2"> 
    <use-mesh name="MyMesh2" provide="yes"/> 
    <read-data name="Forces" mesh="MyMesh2"/> 
    <write-data name="Temperature" mesh="MyMesh2"/> 
...
</participant>

<coupling-scheme:serial-explicit>
  <participants first="MySolver1" second="MySolver2"/>
  <exchange data="Forces" mesh="MyMesh2" from="MySolver1" to="MySolver2"/>
  <exchange data="Temperature" mesh="MyMesh2" from="MySolver2" to="MySolver1"/>
...
</coupling-scheme:serial-explicit>
```

![visualistion of the mesh exchange](images/docs/configuration-mesh-exchange.png)

## Why do we make all this so complicated?

We want to give the user as much freedom as possible to adjust the setup to her specific needs. Typical constraints / wishes are:

* Communication of coupling data on the coarser mesh
* Computation of the quasi-Newton acceleration on the coarser mesh (typically more robust)
* Restriction of the mapping in parallel to "read-consistent" and "write-conservative" (more information on the [mapping configuration page](configuration-mapping.html#restrictions-for-parallel-participants)
