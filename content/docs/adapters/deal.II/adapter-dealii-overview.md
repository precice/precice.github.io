---
title: The deal.II adapter
permalink: adapter-dealii-overview.html
redirect_from: adapter-dealii.html
keywords: adapter, deal.II
summary: "Coupled structural solver written with the C++ finite element library deal.II"
---

## What is deal.II?

From their documentation: _deal.II is a C++ program library targeted at the computational solution_
_of partial differential equations using adaptive finite elements. It uses_
_state-of-the-art programming techniques to offer you a modern interface_
_to the complex data structures and algorithms required._ A more extensive answer can be found on the [deal.II webpage](https://www.dealii.org/).

## Aim of this adapter

This adapter has two use cases: On the one hand, it provides coupled structural solvers, which could be used for FSI simulations steered by preCICE. On the other hand, it serves as an example of how to couple your own deal.II project with other solvers using preCICE. Have a look in the [build your own adapter](adapter-dealii-own-project.html) section for more details.

{% tip %}
In addition to our coupled solid mechanics related codes of the dealii-adapter repository, we contributed a [minimal deal.II-preCICE example to the deal.II project](https://dealii.org/developer/doxygen/deal.II/code_gallery_coupled_laplace_problem.html). If you want to couple your own deal.II-code, or want to gain insight in the preCICE coupling with deal.II this tutorial is probably the best place to start.
{% endtip %}

## How to install the adapter?

The adapter requires deal.II version 9.2 or greater and preCICE version 2.0 or greater. The building can be done using CMake, as usual. A detailed installation guide can be found on the [deal.II adapter building page](adapter-dealii-get.html).

## How to use the coupled codes?

The coupled codes cover the solid part of partitioned FSI simulations. If you want to use them for your own partitioned case, you can read up in the [configuration section](adapter-dealii-configure.html) how to change parameters and use different meshes.

## How can I use my own solver with the adapter?

The provided deal.II adapter is (as opposed to other adapter) not applicable for any arbitrary solver or project. Nevertheless, the required infrastructure and code to couple a solver different than the given solid solver is similar. You can find a detailed description of the relevant functionality and how to use it for your own solver in the [own project section](adapter-dealii-own-project.html).

## How general are the already coupled codes?

preCICE provides a large variety of various functionalities. The coupled codes do not yet cover everything. You can find further information about recent limitations of the codes in the [limitation section](adapter-dealii-limitations.html).

## What is the theory behind the coupled solver?

deal.II is a finite element library where user can implement whatever they want. If you are interested in theoretic details of the coupled solid solver, you can find the relevant information in the [solver details section](adapter-dealii-solver-details.html).
