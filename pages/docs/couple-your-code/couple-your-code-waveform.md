---
title: Waveform interpolation of coupling data
permalink: couple-your-code-waveform.html
keywords: api, adapter, time, waveform, subcycling, multirate
summary: "You can intepolate your coupling data in time for higher order and more stable multirate timestepping."
---

{% include warning.html content="These API functions are work in progress, experimental, and are not yet released. The API might change during the ongoing development process. Use with care." %}

preCICE allows the solvers to work with different time step sizes on their respective domains. This is explained in detail in [one the section "Non-matching time step sizes" of the step-by-step guide](https://precice.org/couple-your-code-timestep-sizes.html).

Rules:
* Solvers meet at the end of each time window
* Coupling data is **constant** over time for each time window

This feature:
* Extends this framework
* Allows (linear) intepolation between the beginning and the end of the time window
* Helps to get more robust multirate time stepping (subcycling); refer to literature
* Also allows us to use higher order time stepping; refer to literature

**Show waveform picture**

## Usage

```cpp
// Code snippet with usage
```

```xml
// Config
```
