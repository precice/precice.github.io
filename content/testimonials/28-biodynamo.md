---
title: "Coupling OpenFOAM and BioDynaMo for continuum–agent simulations"
author: "Alexandros Iosif"
author_link: "mailto:iosif.alexandros@outlook.com"
organisation: "In Silico Modelling Group, University of Cyprus"
organisation_link: "https://in-silico-modelling.ucy.ac.cy/"
img: testimonial-28-biodynamo.png
---
 Many multiscale problems are traditionally addressed by integrating continuum and discrete agent solvers within a monolithic framework. In our work at the University of Cyprus, we are developing a partitioned framework that couples OpenFOAM with BioDynaMo through preCICE, combining the finite-volume method with off-lattice agent-based modelling.

We extended the OpenFOAM–preCICE adapter with a dedicated Fluid–Agent module and developed a corresponding BioDynaMo adapter. The framework supports both one-way and two-way coupling, allowing agents to sample continuum quantities such as velocity fields and scalar concentrations and, when required, return local momentum or scalar feedback to the OpenFOAM solver.

We have progressively developed and tested the framework through a series of benchmarks of increasing complexity: lid-driven cavity cases for convection, diffusion, and convection–diffusion; Venturi flows with passive tracers and momentum feedback; two-way scalar-consumption coupling; and, finally, agent transport in an aneurysm geometry. Through these cases, we have built a reusable and modular framework in which users can configure the quantities exchanged between the solvers according to the needs of their application. Our long-term goal is to use this architecture for biological multiscale simulations, where continuum transport fields interact directly with individual cell behaviours.

Pictured: Coupled multiphysics simulation of a 3D tumor spheroid using the OpenFOAM–preCICE–BioDynaMo framework, illustrating the interaction between oxygen transport and cellular dynamics. OpenFOAM provides the spatial oxygen field within the surrounding domain (bottom), while the agent-based spheroid model (top) responds to local oxygen availability through growth, division, and phenotype switching, leading to the emergence of hypoxic cells in the oxygen-depleted core.
