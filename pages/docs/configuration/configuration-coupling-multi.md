---
title: Multi coupling configuration
permalink: configuration-coupling-multi.html
keywords: configuration, coupling scheme
summary: "If you want to couple more than two participants, there are two options: You can combine multiple normal coupling schemes (composition) or you can use a fully-implicit multi-coupling scheme. On this page, we explain both options."
---

## Composition of bi-coupling schemes

To combine multiple coupling schemes, simply add them one after the other in the configuration:

```xml
<coupling-scheme:parallel-explicit>
  <participants first="MySolver1" second="MySolver2"/>
  ...
</coupling-scheme:parallel-explicit>
<coupling-scheme:parallel-explicit>
  <participants first="MySolver1" second="MySolver3"/>
  ...
</coupling-scheme:parallel-explicit>
```

For this example, all three participants are executed in parallel to one another, whereas `MySolver1` exchanges data with `MySolver2` and `MySolver3`, but not the latter two with each other. To also get an interaction between `MySolver2` and `MySolver3`, simply add a third coupling scheme.

You can probably imagine that you can do very strange combinations, where most of them have only limited practical relevance. To find out more, you can read Section 4.1.5 in [Bernhard's thesis](https://www5.in.tum.de/pub/Gatzhammer2014_preCICE.pdf). Numerically, it only makes sense to either only have explicit schemes or to combine one implicit scheme with several explicit ones. To find out more, you can read [this paper](https://link.springer.com/article/10.1007%2Fs00466-014-1113-2). If you want to resolve more than one strong interaction, you need a fully-implicit multi-coupling.

## Fully-implicit multi-coupling

In a fully-implicit multi-coupling, an arbitrary number of solvers are executed in parallel to each other in an implicit fashion.

```xml
<coupling-scheme:multi>
  <participant name="MySolver1" control="yes"/>
  <participant name="MySolver2" />
  <participant name="MySolver3" />
  ...
</coupling-scheme:multi>
```

Exactly one participant needs to take `control` of the coupling. preCICE computes the convergence measures and the acceleration on this participant. 

{% version 2.3.0 %}
Prior to version 2.3.0, this controlling participant needs to be centric.
This means that it requrires `m2n` connections to all other participants and the `exchange` tags needs to be properly configured.
Version 2.3.0 allows non-centric participants as long as they run in serial.
{% endversion %}

All other tags are similar to a normal [implicit coupling](configuration-coupling.html#implicit-coupling-schemes).

To find out more about multi coupling, you can also read Section 3.8 in [Benjamin's thesis](https://mediatum.ub.tum.de/doc/1320661/document.pdf).
