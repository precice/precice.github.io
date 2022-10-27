---
title: Adapter software engineering
permalink: couple-your-code-adapter-software-engineering.html
keywords: api, adapter, library, modularity, sustainability
summary: "The example developed in the step-by-step guide is a rather intrusive way of writing an adapter as we directly modify the main solver routines. This page discusses better software engineering approaches."
---

What we develop in the [step-by-step guide](couple-your-code-preparing-your-solver) is best described as an _adapted code_, not an _adapter_. We directly modified the main solver routines. Better alternatives exist. Depending on the solver's functionalities, you could either consider creating a separate class for the preCICE adapter (as applied e.g. in the [SU2 adapter](https://github.com/precice/su2-adapter)) or using a callback functionality provided by the solver (as applied e.g. in the [OpenFOAM adapter](https://github.com/precice/openfoam-adapter)).

The diagram below summarizes these three different ways of using preCICE:

![Adapter software engineering options](images/docs/adapterSoftwarePerspective.png)

The direct modification approach is what the [step-by-step guide](couple-your-code-preparing-your-solver) uses. It consists of directly modifying the solver code lines to couple with preCICE. This, however, is not an ideal approach since it requires changing of the solver source code, and you should try to avoid this to wherever possible to maintain a sustainable software development practice.

To minimize the lines of solver source code changes, you can create a separate class for the adapter. This adapter will be responsible for calling all the preCICE APIs, and from the solver source code you would only call the corresponding adapter class methods. As stated above, this approach is used e.g. for the SU2-adapter and explained in detail in [Alexander Rusch's thesis](https://www5.in.tum.de/pub/Rusch2016_BA.pdf).

If the solver you are using provides a callback functionality you can separate the adapter even better from the code by calling the preCICE API from the callback. As stated above this is realized in the [OpenFOAM adapter](https://github.com/precice/openfoam-adapter) and is explained in detail in [Gerasimos Chourdakis' thesis](https://www5.in.tum.de/pub/Chourdakis2017_Thesis.pdf).
