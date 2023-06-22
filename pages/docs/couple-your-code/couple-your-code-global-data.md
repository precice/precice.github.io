---
title: Exchanging Global Data (data not associated to a mesh)
permalink: couple-your-code-global-data.html
keywords: api, adapter, data, global
summary: "You can define and exchange global data (data not associated to a mesh) with preCICE by using specific optional API functions."
---

{% warning %}
These API functions are a work in progress, experimental, and are not yet released. The API might change during the ongoing development process. Use with care.
{% endwarning %}

{% note %}
This feature is only available for two-participant coupling and does not yet support [Multi coupling](https://precice.org/configuration-coupling-multi.html). Further, it does not yet allow [Convergence Measures](https://precice.org/configuration-coupling.html#implicit-coupling-schemes) and [Acceleration](https://precice.org/configuration-acceleration) to be defined for global data. An extension to these features is planned.
{% end note %}

preCICE allows participants to exchange data that is not associated with any mesh. Examples of such data are global background pressure (for e.g. in fluid-acoustic coupling) and angles between coordinate systems (for e.g. in CAMRAD-fluid coupling).

## Configuration of Global Data

Configuration of global data objects is described below with examples.

In order to use this feature, global data needs to be explicitly defined in the configuration file using the `global-data` tag.

```xml
<precice-configuration dimensions="3" experimental="true">
    <global-data:vector name="angles" />
...
```

Rest of the global data configuration steps are similar to the usual 'mesh-associated' data as described in [Introduction to configuration](https://precice.org/configuration-introduction.html).

```xml
...
<participant name="SolverOne">
    <write-data name="angles" />
...
<participant name="SolverTwo">
    <read-data name="angles">
...
    <exchange data="angles" from="SolverOne" to="SolverTwo" />
...
```



Since global data is not associated with any mesh, it should not be configured with the `use-data` tag under the `mesh` definition. Similarly, all tags like `read-data`, `write-data` and `exchange` that configure global data should be written without `mesh=...`.

## Global Data functions in the API

The API functions `writeGlobalData(...)` and `readGlobalData(...)` enable exchange of global data analogous to the `writeData(...)` and `readData(...)` functions for mesh-associated data. For the above example, the API calls would be as follows.

For SolverOne:

```C++
...
participant.writeGlobalData("angles", writeAngles);
...
```

For SolverTwo:
```C++
...
participant.readGlobalData("angles", dt, readAngles);
...

```

## Supported Functionality

Global data exchange is supported in both Explicit and Implicit [coupling schemes](https://precice.org/configuration-coupling.html) with Serial as well as Parallel [coupling flows](https://precice.org/couple-your-code-coupling-flow.html#parallel-coupling-schemes).

Within implicit coupling, convergence measures and acceleration are not yet supported.

[Data Initialization](https://precice.org/couple-your-code-initializing-coupling-data.html) and [Time Interpolation](https://precice.org/couple-your-code-waveform.html) are also supported on global data.