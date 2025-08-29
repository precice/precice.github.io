---
title: Coupling meshes in deal.II
permalink: adapter-dealii-coupling-meshes.html
keywords: adapter, dealii, meshes
summary: "The polynomial support points are used to define the coupling mesh."
---

Defining a coupling mesh in finite element programs is not trivial and there are multiple solution strategies. We rely here on the support points of the high-order polynomials. There are several reasons to do so: First, we would like to keep the high resolution property for higher-order shape functions. An alternative would be to choose the mesh vertices, but it would lead to a loss of information between grid points. Another reason is the consistency to the deal.II infrastructure during the right-hand side assembly, where we treat the coupling data as global vectors. When reading global vectors, data location is assumed to be at the support points i.e. the actual solution points. The third reason is, that we use (by default) a direct solver and therefore, want to keep the overall number of unknowns rather small, while providing a high accuracy. From a solver perspective, high-order polynomial degrees are in most of the applications superior considering the classical solid mechanics as in the tutorials.

However, from a coupling perspective, fewer unknowns are not the best choice, since our mapping methods are restricted to (at most) second order in space. Therefore, having more interface nodes is preferable. Also, using the support points is difficult in case of `conservative` mappings, because data is interpolated to quadrature points and conservation property is not guaranteed. A simple remedy would be to apply collocation techniques, where the interpolation is essentially omitted.

## Where are support points located?

The concept of support points is explained in [this glossary entry of the deal.II documentation](https://www.dealii.org/developer/doxygen/deal.II/DEALGlossary.html#GlossSupport). In particular (by default), we use here the standard `FE_Q` finite element, where the support points are located according to [Gauss-Lobatto quadrature points](https://www.dealii.org/developer/doxygen/deal.II/classQGaussLobatto.html). Note that these points are not equidistant. A detailed description of the `FE_Q` finite element can be found in the [`FE_Q` deal.II documentation](https://dealii.org/developer/doxygen/deal.II/classFE__Q.html).
