---
title: RBF shape calculator
permalink: tooling-rbf-shape.html
keywords: tooling, rbf, configuration
---

Selecting an appropriate shape parameter for radial basis function mappings can be a bit tricky.

To simplify this task, you can find the script [rbfShape.py](https://github.com/precice/precice/tree/develop/extras/rbfShape) in the preCICE repository.

Given the width of the mesh and the amount of vertices to cover by the support radius, this script calculates an appropriate shape parameter for Gaussian basis-functions.
The script also allows to specify a custom decay.

This solves the following equation:

$$\text{shape} = \frac{\sqrt{-log(\text{decay})}}{\text{vertices} \cdot \text{meshwidth}}$$

Find more information about tuning the parameters of the RBF radial basis functions in [Radial Basis Function Interpolation for Black-Box Multi-Physics Simulations](https://upcommons.upc.edu/handle/2117/190255) and in further papers (see [literature guide](fundamentals-literature-guide.html)).

{% version %}
Since preCICE v3, just use the default partition-of-unity mapping. This script is mainly relevant for earlier versions, when tuning the shape parameter was crucial.
{% endversion %}
