---
title: Coupling flow
permalink: couple-your-code-coupling-flow.html
keywords: api, adapter, coupling schemes, communication, advance
summary: "Do you wonder why there is no `sendData` and `receiveData` in preCICE? Instead, there only is `advance`. We call this a high-level API. On this page, you learn which advantages a high-level API has and how communication and control flow in preCICE works."
---

preCICE distinguishes between serial and parallel coupling schemes:

* **serial**: the participants run after one another,
* **parallel**: the participants run simultaneously.

## Serial coupling schemes

In our example, we currently use a serial coupling scheme:

```xml
<coupling-scheme:serial-explicit>
  <participants first="FluidSolver" second="SolidSolver"/>
  ...
</coupling-scheme:serial-explicit>
```

`FluidSolver` is first and `SolidSolver` second. This means that `FluidSolver` starts the simulation and computes the first time step, while `SolidSolver` still waits. Where does it wait? Well, communication in preCICE only happens within `initialize` and `advance` (and `initializeData`, but more about this in [Step 7](couple-your-code-initializing-coupling-data.html)):

* `FluidSolver` computes the first time step and then sends and receives data in `advance`. The receive call blocks.
* `SolidSolver` waits in `initialize` for the first data. When it receives the data it computes its first time step and then calls `advance`.
* Now, `FluidSolver` receives data and `SolidSolver` blocks again.
* ...

***

<img class="img-responsive" src="images/docs/couple-your-code-serial-coupling.svg" alt="Serial coupling flow" style="width:100%">

***

Try to swap the roles of `first` and `second` in your example. Do you see the difference? If everything is just too fast, add some `sleep` calls.

## Parallel coupling schemes

In a way, parallel coupling schemes are much easier here (numerically, they are not, but that's a different story). Everything is symmetric:

***

<img class="img-responsive" src="images/docs/couple-your-code-parallel-coupling.svg" alt="Parallel coupling flow" style="width:100%">

***

{% important %}
The neat thing about the high-level API of preCICE is that you don't need to change anything in your code to switch between a serial and a parallel coupling scheme. This becomes even more important if you want to couple not only two participants, but three or more. The coupling logic, meaning who sends data to whom can be fully configured at runtime.
{% endimportant %}
