---
title: Terminology
permalink: fundamentals-terminology.html
keywords: adapter, peer-to-peer, library, black-box, participant
summary: "There are just some preCICE terms every preCICE user should know. On this page, we explain them."
---


## Solver and participant

By _solver_, we refer to a complete simulation code, which we want to couple. We do not mean a linear algebra solver. With _participant_, we refer to a solver in the context of a coupled simulation. This term is also used in the [preCICE configuration](configuration-basics.html).  

## Library approach

preCICE follows a library approach. This basically means that preCICE is a library: each solver needs to call preCICE. This also means that preCICE runs in the same threads that the solvers run in. The opposite coupling approach is a so-called framework approach. Here, the coupling calls all solvers, which need to implement a certain programming interface. The advantage of a library approach is that it is minimally invasive to the coupled codes. They do not need to be rewritten. Instead, you just need to insert the preCICE calls at the right places.

## Peer-to-peer approach

preCICE also follows a peer-to-peer approach. This, you actually already know the tutorials. You only need to start all coupled solvers individually. Nothing else; not server-like coupling executable or anything similar. 

## Adapter

To call preCICE from your code, you need to call the application programming interface of preCICE. You can directly do this in your code. In this case, you develop an adapted solver. The little software engineering purist in you prefers, however, to collect all calls to preCICE in one place. This could be a separate class or module in your code. This could also be a separate library, which you call from pre-defined callback hooks. We call this one place then an _adapter_. Depending on the perspective you would call it _preCICE adapter_, _XYZ adapter_, or _XYZ-preCICE adapter_; assuming that you want to couple a code named XYZ. [preCICE comes with a few ready-to-use adapters](adapters-overview.html). If you want to couple your own code, you basically want to develop an adapter for this code. [Read more on adapter software engineering approaches](couple-your-code-adapter-software-engineering). 

## Black-box coupling

preCICE also follows a black-box coupling approach. This is a numerical term. It means that preCICE regards the coupled solvers as black boxes. Only minimal information about these black boxes is available: what kind of data you can input, what you get as output, and how to repeat a timestep. At first, this is a drawback. With little information available, it is difficult to realize a robust coupling. That is why preCICE provides quite some numerical methods to overcome this hurdle (more information in the [literature guide](literature-guide.html)). At second glance, however, black-box coupling turns out to be a very neat feature. First, it is very easy to couple a new code as only little information needs to be provided. And second, you can easily exchange participants: say use a finite-element fluid solver instead of a finite-volume fluid solver. We still need to discuss what black-box coupling means mathematically:
* The coupling algorithm only uses the input and output values of a coupled solver. Not their derivatives. For example: the deformation (displacements) of a structural mechanics FEM code, but not its Jacobian matrix.
* The coupling algorithm only uses nodal values, meaning values at mesh vertices. For some algorithms, these mesh vertices can be extended by mesh connectivity. What preCICE does not use, however, are shape functions, or anything similar.

  
