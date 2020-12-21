---
title: RBF shape calculator
permalink: tooling-rbf-shape.html
keywords: tooling, rbf, configuration
---

Selecting an appropriate shape parameter for radial basis function mappings can be a bit tricky.

To simplify this task, you can find the script [rbgShape.py](https://raw.githubusercontent.com/precice/precice/develop/extras/rbfShape/rbfShape.py) in the preCICE repository.

Given the width of the mesh, the amount of vertices to include this script caclulates an appropriate shape parameter for Gaussian basis-functions.
The script also allows to specify a custom decay.

This solves the following equation:

$$\text{shape} = \frac{\sqrt{-log(\text{decay})}}{\text{vertices} \cdot \text{meshwidth}}$$
