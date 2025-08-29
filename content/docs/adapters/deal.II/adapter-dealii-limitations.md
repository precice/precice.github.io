---
title: Limitations and assumptions
permalink: adapter-dealii-limitations.html
keywords: adapter, deal.II, limitations, 
---

In case you want to use the adapter for your own work, consider the following notes.

## Number of interface meshes

You can only define one `read` and one `write` mesh per deal.II executable. On the one hand, extending this is not in particular difficult and could be done in the `Adapter` class itself, but since we have only FSI (solid part) ready-to-run tutorials and programs, it should be sufficient to summarize different boundary parts into a single mesh (in deal.II terminology `boundary_id()`) for writing and reading, respectively. The applied boundary conditions are on each `write` and on each `read` mesh the same. If this is not sufficient, you may want to consider more than one deal.II participant.

## Boundary conditions

If you want to couple your own deal.II code, note that we apply here Neumann boundary conditions. In case you would like to couple e.g. a `Fluid` participant, the application of Dirichlet boundary conditions is much more common. The treatment of boundary conditions is very specific to the considered application case and cannot be included in the adapter as presented here. Even if you couple your own structure solver, the boundary conditions resulting from the coupling might be different, e.g. depending on your configuration (Lagrangian vs Eulerian). However, in this code we show everything based on coupling the application to other participant by Neumann boundary conditions. The treatment of Dirichlet boundary conditions is dedicated to future work of this adapter / adapter examples. You might find useful information in the deal.II own tutorials. If you have done or are currently doing something similar, let us know.

## Coupling data

As opposed to preCICE itself, there is currently no option to switch between the coupling data type (i.e. vector data and scalar data). This is triggered by the fact that we use purely vector valued data for (FSI) coupling. Have a look in the extensive source code documentation of the `Adapter` class if you would like to change this in your own project.

## Mapping

In order to benefit from the high-order property of finite element methods as applied here, we use the support points of high-order polynomials in the coupling mesh. These points are in general different from the quadrature points, where data is evaluated. Therefore, we define our read mappings (and data) to be `consistent`, since we need to interpolate from the support points to the quadrature points. If we use a `conservative` mapping, we might violate the conservation property due to the interpolation step. In one of the previous implementations, we used a conservative read data, but selected the face-centers of the triangulation as read mesh leading to a loss of the natural subcell resolution property of the finite element methods. A rather simple remedy would be the application of collocation techniques, where the interpolation step vanishes. Another option would be to ensure the conservation property in the interpolation step itself. However, this is not considered in the current implementations.
