---
title: Global data
permalink: couple-your-code-global-data.html
keywords: api, adapter, data, global
summary: "Define and exchange global data (data not associated to a mesh) by using specific optional API functions."
---

{% warning %}
These API functions are a work in progress, experimental, and are not yet released. The API might change during the ongoing development process. Use with care.
{% endwarning %}

{% note %}
This feature is only available for coupling between two participants, i.e. does not yet support [multi coupling](https://precice.org/configuration-coupling-multi.html). Further, it does not yet allow [convergence measures](https://precice.org/configuration-coupling.html#implicit-coupling-schemes) and [acceleration](https://precice.org/configuration-acceleration) to be defined for global data. An extension to these features is planned.
{% endnote %}

preCICE allows participants to exchange data that is not associated with any mesh. Examples of such data are global background pressure (e.g. fluid-acoustic coupling) and angles between coordinate systems (e.g. fluid-structure coupling for rotor blades).

## Configuration

Configuration of global data objects is described below with examples.

In order to use this feature, global data needs to be explicitly defined in the configuration file using the `global-data` tag.

```xml
<precice-configuration dimensions="3" experimental="true">
    <global-data:vector name="angles" />
...
```

Rest of the global data configuration steps are similar to the usual *mesh-associated* data as described in [introduction to configuration](https://precice.org/configuration-introduction.html).

```xml
...
<participant name="SolverOne">
    <write-data name="angles" />
...
<participant name="SolverTwo">
    <read-data name="angles">
...
<coupling-scheme:serial-explicit>
    <exchange data="angles" from="SolverOne" to="SolverTwo" />
...
```

Since global data is not associated with any mesh, it should not be configured with the `use-data` tag under the `mesh` definition. Similarly, tags such as `read-data`, `write-data`, or `exchange` require no `mesh` attribute if used for global data.

## API

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

## Supported functionality

Global data exchange is supported in both explicit and implicit [coupling schemes](https://precice.org/configuration-coupling.html) with serial as well as parallel [coupling flow](https://precice.org/couple-your-code-coupling-flow.html#parallel-coupling-schemes).

Within implicit coupling, convergence measures and acceleration are not yet supported.

[Data initialization](https://precice.org/couple-your-code-initializing-coupling-data.html) and [time interpolation](https://precice.org/couple-your-code-waveform.html) are also supported for global data.
