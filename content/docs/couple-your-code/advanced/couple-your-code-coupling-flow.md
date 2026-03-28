---
title: Coupling flow
permalink: couple-your-code-coupling-flow.html
keywords: api, adapter, coupling schemes, communication, advance
summary: "Do you wonder why there is no `sendData` and `receiveData` in preCICE? Instead, there only is `advance`. We call this a high-level API. On this page, you learn which advantages a high-level API has and how communication and control flow in preCICE works."
---

preCICE distinguishes between serial and parallel coupling schemes:

- **serial**: the participants run after one another,
- **parallel**: the participants run simultaneously.

## Serial coupling schemes

In our example, we currently use a serial coupling scheme:

```xml
<coupling-scheme:serial-explicit>
  <participants first="FluidSolver" second="SolidSolver"/>
  ...
</coupling-scheme:serial-explicit>
```

`FluidSolver` is first and `SolidSolver` second. This means that `FluidSolver` starts the simulation and computes the first time step, while `SolidSolver` still waits. Where does it wait? Well, communication in preCICE only happens within `initialize` and `advance`:

* `FluidSolver` computes the first time step and then sends and receives data in `advance`. The receive call blocks.
* `SolidSolver` waits in `initialize` for the first data. When it receives the data it computes its first time step and then calls `advance`.
* Now, `FluidSolver` receives data and `SolidSolver` blocks again.
* ...

***

<!-- Approach A -->
<!-- {% mermaid %}
sequenceDiagram
    participant FluidSolver
    participant SolidSolver
    Note over FluidSolver,SolidSolver: Initialization
    FluidSolver->>FluidSolver: precice.initialize()
    SolidSolver->>SolidSolver: precice.initialize()
    SolidSolver->>FluidSolver: send mesh (SolidMesh)
    FluidSolver->>FluidSolver: receive mesh
    loop Coupling timestep
        Note over FluidSolver: Solve fluid timestep
        FluidSolver->>FluidSolver: solveTimeStep(...)
        FluidSolver->>FluidSolver: precice.advance()
        Note over FluidSolver: Map write Forces<br/>FluidMesh → SolidMesh
        FluidSolver->>SolidSolver: send Forces
        Note over SolidSolver: Waiting for Forces
        SolidSolver->>SolidSolver: receive Forces
        SolidSolver->>SolidSolver: solveTimeStep(...)
        SolidSolver->>SolidSolver: precice.advance()
        SolidSolver->>FluidSolver: send Displacements
        Note over FluidSolver: receive Displacements
        FluidSolver->>FluidSolver: Map read Displacements<br/>SolidMesh → FluidMesh
    end
    Note over FluidSolver,SolidSolver: Finalization
    FluidSolver->>FluidSolver: precice.finalize()
    SolidSolver->>SolidSolver: precice.finalize()
{% endmermaid %} -->

<!-- Approach B -->
{% mermaid %}
sequenceDiagram
participant F as FluidSolver
participant S as SolidSolver

    Note over F: Participant("FluidSolver", ...)
    Note over S: Participant("SolidSolver", ...)

    Note over F: precice.initialize()
    Note over S: precice.initialize()

    S->>F: SolidMesh (send mesh → receive mesh)

    Note over F: solveTimeStep(...)
    Note over F: precice.advance()

    Note over S: waiting

    Note over F: map write data<br/>FluidMesh ––→ SolidMesh<br/>(Forces)
    F->>S: Forces (send data → receive data)

    Note over F: waiting

    Note over S: solveTimeStep(...)
    Note over S: precice.advance()

    S-->>F: Displacements (send data → receive data)

    Note over F: map read data<br/>FluidMesh ←–– SolidMesh<br/>(Displacements)

    Note over F: solveTimeStep(...)
    Note over F: precice.advance()

    Note over S: waiting

    Note over F: map write data<br/>FluidMesh ––→ SolidMesh<br/>(Forces)
    F->>S: Forces (send data → receive data)

    Note over S: solveTimeStep(...)
    Note over S: precice.advance()

    Note over F: precice.finalize()
    Note over S: precice.finalize()

{% endmermaid %}

---

Try to swap the roles of `first` and `second` in your example. Do you see the difference? If everything is just too fast, add some `sleep` calls.

## Parallel coupling schemes

In a way, parallel coupling schemes are much easier here (numerically, they are not, but that's a different story). Everything is symmetric:

***

<img class="img-responsive" src="images/docs/couple-your-code-parallel-coupling.svg" alt="Parallel coupling flow" style="width:100%">

***

{% important %}
The neat thing about the high-level API of preCICE is that you don't need to change anything in your code to switch between a serial and a parallel coupling scheme. This becomes even more important if you want to couple not only two participants, but three or more. The coupling logic, meaning who sends data to whom can be fully configured at runtime.
{% endimportant %}
