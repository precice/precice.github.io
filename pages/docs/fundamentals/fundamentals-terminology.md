---
title: Terminology
permalink: fundamentals-terminology.html
keywords: adapter, peer-to-peer, library, black-box, participant
summary: "We often refer to the following terms, but they may not already be clear."
---

## Partitioned approach

As already mentioned in the overview:

> Partitioned (as opposed to monolithic) means that preCICE couples existing programs (solvers) which simulate a subpart of the complete physics involved in a simulation.

The direct opposite is the (numerically) monolithic approach, in which the same
software has to construct and solve a global system of equations for the complete domain.

There are several advantages and disadvantages in both approaches. The partitioned approach
allows to reuse existing components, reducing the time from deciding to simulate a
multi-physics scenario to getting accurate results (the real time to solution).
It also allows to study different combinations of components
that are already "experts" in each subdomain.
The monolithic approach can have robustness and performance advantages in some cases,
but with the current advanced partitioned coupling algorithms, the significance of any such difference
should not always be taken for granted (see our [literature guide](fundamentals-literature-guide.html)).

## Solver and participant

By _solver_, we refer to a complete simulation code, which we want to couple. We do not mean a linear algebra solver. With _participant_, we refer to a solver in the context of a coupled simulation (e.g. "Fluid participant"). This term is also used in the [preCICE configuration](configuration-overview.html).

## Library approach

preCICE follows a _library_ approach. This basically means that preCICE is a library: each solver needs to call preCICE. This also means that preCICE runs in the same threads that the solvers run in. The opposite coupling approach is the _framework_ approach. In that approach, the coupling tool calls all solvers, which need to implement a certain programming interface. The advantage of a library approach is that it is minimally invasive to the coupled codes. They do not need to be rewritten. Instead, you just need to insert the preCICE calls at the right places.

## Peer-to-peer approach

preCICE also follows a peer-to-peer approach. If you already tried preCICE, you may have noticed that you only need to start all coupled solvers individually, in the same way you would start them to run each single-physics simulation. There is no other starting mechanism involved: no server-like coupling executable or anything similar.

## Adapter

To call preCICE from your code, you need to call functions of the application programming interface of preCICE. You can directly do this in your code. In this case, you develop an adapted solver. The little software engineering purist in you prefers, however, to collect all calls to preCICE into one place. This could be a separate class or module in your code. This could also be a separate library, which you call from pre-defined callback hooks. We call this one place an _adapter_. Depending on the perspective, you would call it _preCICE adapter_, _MyCode adapter_, or _MyCode-preCICE adapter_; assuming that you want to couple a code named MyCode. [preCICE comes with a few ready-to-use adapters](adapters-overview.html). If you want to couple your own code, you basically want to develop an adapter for this code. [Read more on adapter software engineering approaches](couple-your-code-adapter-software-engineering).

## Black-box coupling

preCICE also follows a _black-box_ coupling approach. This is a numerical term. It means that preCICE treats the coupled solvers as black boxes. Only minimal information about these black boxes is available: what kind of data you can input, what you get as output, and how to repeat a time step. At first, this is a drawback. With little information available, it is difficult to realize a robust coupling. That is why preCICE provides quite some numerical methods to overcome this hurdle (more information in the [literature guide](fundamentals-literature-guide.html)). At second glance, however, black-box coupling turns out to be a very neat feature. First, it is very easy to couple a new code, as only little information needs to be provided. And second, you can easily exchange participants: for example, if you want to try a finite-element fluid solver instead of a finite-volume fluid solver.

We still need to discuss what black-box coupling means mathematically:

* The coupling algorithm only uses the input and output values of a coupled solver, not their derivatives. For example, the deformation (displacements) of a structural mechanics FEM code, but not its Jacobian matrix.
* The coupling algorithm only uses nodal values, meaning values at mesh vertices. For some algorithms, these mesh vertices can be extended with mesh connectivity (mesh edges). What preCICE does not use, however, is shape functions or anything similar.

## Explicit and implicit coupling

preCICE offers a variety of [coupling schemes](configuration-coupling.html).
With "explicit coupling", we mean that the participants exchange information
only once per coupling time window. With "implicit coupling", we mean that
the participants are coupled iteratively, repeating each coupling time window
until both sides of the interface have converged to the same values.
The iterations of implicit coupling schemes can be greatly reduced with
acceleration techniques, such as Aitken under-relaxation or
interface quasi-Newton acceleration (which learns over time).
