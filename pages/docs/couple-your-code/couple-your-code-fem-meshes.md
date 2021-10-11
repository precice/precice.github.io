---
title: Dealing with FEM meshes
permalink: couple-your-code-fem-meshes.html
keywords: api, adapter, FEM, meshes, elements
summary: "There are various options and the best one depends on your application case."
---

## Common choices

Finite-element discretizations come along with different options in order to define a coupling interface. Given a common (here fourth-order) finite element, we have

![FEM coupling mesh](images/docs/couple-your-code-fem-meshes.png)

  1. geometry-based interfaces such as vertices (black, circular contour) at the element corners or the element surface as a whole,
  2. the finite-element support points (black, filled circles) and
  3. the quadrature points (blue, filled circles).

### Geometry-based interfaces


Using the geometry in order to define a coupling interface seems like one of the most obvious choices, since the coordinate information are usually easy to access. The major drawback is, however, that the resolution of the coupling interface is independent of the discretization and you might lose information across the coupling interface. Considering our example element above, a coupling mesh based on geometric vertices would consist of four interface nodes, whereas the other choices have considerably more (25) interface nodes. The overall difference between the geometry-based interface and options two and three are related to the polynomial degree of the finite-element support points (assuming a polynomial FE basis for the moment). In case the code you want to couple uses solely linear elements, the resulting number of interface nodes coincide with the vertex based coupling mesh and the element vertices might be a perfect choice for your application case. For an increasing polynomial degree, option one becomes less attractive.

In addition to the resolution of the coupling interface, another challenge in this context is given by the required solution transfer between the FE solution space and the geometry. One has to average over an element face or map the solution within the solver to the vertex location.

### Support points

Finite-element support points are based on the finite-element discretization. Not all finite-element discretizations have support points at all, e.g., Legendre finite elements based on a modal decomposition. However, we focus here on polynomial finite elements with support points, which are a common choice in many applications. The major advantage of support points is that the solution values live typically on the support points and the values can be passed easily to preCICE by reading them from the solution vector. Also, increasing the polynomial degree of the discretization increases the number of coupling interface nodes in contrast to the geometry based coupling interface.

However, this approach runs into trouble in case the support points live on element faces in a discontinuous solution space (Discountinuous Galerkin approach), since you define interface nodes multiple times. In particular, the duplicate definition becomes problematic if an interpolant is constructed from the coupling mesh in preCICE, which happens for the `from` mesh in a `read-consistent` setup and for the `to` mesh in a `write-conservative` setup.

Another issue using higher-order support points might appear in case you run very large cases and strive for the RBF mapping of preCICE. In case the support points are non-equally distributed within the element (shown in our example element above and as it is usually the case in order to preserve a reasonable conditioning of the mass matrix), the RBF mapping becomes ill-conditioned due to the varying distance of interface nodes all over the place.

### Quadrature points

Quadrature points refer to the points used for numerical quadrature when assembling the matrices of the finite-element system. The location of the quadrature points depend on the employed quadrature formula, where the [Gauss-Legendre quadrature](https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_quadrature) is by far the most common choice. Still, there are good reasons to select a different quadrature formula. Using the Gauss-Legendre quadrature points comes in the first place with the same issue of potentially ill-conditioned RBF mappings as described in the section above. Moreover, additional computations are required in order to interpolate the coupling data values from the support points into the quadrature points.

However, building a coupling interface based on quadrature points may lead to a decisive advantage in case the quadrature formula for data writing (assuming consistent data) can be chose independent of the problem setup. In this case, the degree of the quadrature formula can be increased without touching the discretization, i.e., it would be possible to increase the number of interface nodes artificially. If you use higher-order schemes on your finite-element participant, you could compensate the limited convergence order of the mapping algorithms to some extent. Also, you could select quadrature formulas with equally-distributed quadrature points so that no convergence issues appear in case of higher-order quadrature formulas.
