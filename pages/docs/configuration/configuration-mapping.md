---
title: Mapping configuration
permalink: configuration-mapping.html
keywords: configuration, mapping, meshes, coupling
summary: "When coupling two participants at a common coupling interface, in general, the two surface meshes do not match.
Therefore, preCICE provides data mapping methods to map coupling data from one mesh to the other. On this page, we explain how to configure such data mapping methods."
---

## Basics

Each data mapping definition refers to two meshes in the participant configuration: a `provide` mesh defined by the participant and a `receive` mesh defined by another participant (e.g. `MySolver2`):

```xml
<participant name="MySolver1">
    <provide-mesh name="MyMesh1"/>
    <receive-mesh name="MyMesh2" from="MySolver2"/>
    <write-data name="Forces" mesh="MyMesh1"/>
    <read-data name="Temperature" mesh="MyMesh1"/>
    <mapping:nearest-neighbor direction="read" from="MyMesh2" to="MyMesh1" constraint="consistent"/>
    <mapping:nearest-neighbor direction="write" from="MyMesh1" to="MyMesh2" constraint="conservative"/>
</participant>
```

![Mapping configuration](images/docs/configuration/doc-mapping.png)

The `provide` mesh and `receive` mesh are then assigned to the `from` and `to` slot in the mapping configuration to indicate the source mesh, on which data is written, and the target mesh, on which data is read. In addition to source and target mesh, each mapping defines a `direction`, which can either be `read` or `write`:

* `read` mappings are executed _before_ you can read data from the mesh. In the example above, `Temperature` is received on `MyMesh2`, then it is mapped from `MyMesh2` to `MyMesh1` and, finally, read from `MyMesh1`.
* `write` mappings are executed _after_ you have written data.

The `direction` indicates, how the defined meshes are used from the participant perspective: for a `read` mapping, the participant reads data from the `provide` mesh (`MyMesh1`), for a `write` mapping, the participant writes data to the `provide` mesh. Therefore, the `direction` is related to the `exchange` tag of the `coupling-scheme`, as the remote mesh defined by the 'other' participant (e.g. `MyMesh2`) needs to be the mesh used in `<exchange mesh="MyMesh2" ...`. In principle, each `read` mapping can be transformed into a `write` mapping (ignoring the [restrictions for parallel participants for now](configuration-mapping.html#restrictions-for-parallel-participants)) by shifting the mapping tag on the 'other' involved participant (e.g. `MySolver2`). Depending on the configuration, data mapping might be computationally demanding. In preCICE the mapping is executed on the participant, where the mapping tag is defined in the configuration file.

Each mapping defines a `constraint`, which defines how the data is mapped between the meshes:

* `conservative` constraint: `conservative` mappings ensure that the global sum of data at the input and output mesh are the same. As an example, one could consider a nearest-neighbor mapping from a fine to a coarse grid: the value at a coarse node is computed as an aggregation of the corresponding fine nodes, such that the total coupling value (in our example `Forces`) on the coarse and fine mesh is the same. This is required for quantities that are physically conservative (extensive quantities, such as force, mass, etc.). Visually, the conservative nearest-neighbor example would like like the following:

```text
     f=2    f=1    f=2    f=1    f=1
------+------+------+------+------+------
          \  |  /          |  /
-------------+-------------+-------------
         f=(2+1+2)     f=(1+1)
```

* `consistent` constraint: `consistent` constraints interpolate data between the input and output mesh. This constraint typically applies to intensive quantities such as `Temperature` (as in our example configuration) or pressure. Considering once more an example of a mapping from a fine to a coarse mesh using a nearest-neighbor mapping: the value at the coarse node would be the same as the value at the corresponding nearest fine node. Visually, the corresponding nearest-neighbor example could look like this:

```text
     T=2    T=1    T=2    T=1    T=1
------+------+------+------+------+------
             |             |
-------------+-------------+-------------
            T=1           T=1
```

* `scaled-consistent-surface` and `scaled-consistent-volume` constraint: `scaled-consistent` constraints are used for intensive quantities (just as the `consistent` constraint) where conservation of integral values (surface or volume) is necessary (e.g. velocities when the mass flow rate needs to be conserved). The mapping executes a `consistent` mapping in a first step, and corrects the result by a subsequent scaling step using the integral data sum to ensure the conservation of the integral sum on the input mesh and the output mesh. To use the `scaled-consistent-surface` constraint, surface connectivity on input and output meshes are required. To use the `scaled-consistent-volume` constraint, volumetric connectivity on input and output meshes are required.


For a sequential participant, any combination of `read`/`write`-`consistent/conservative` is valid. For a participant running in parallel, only `read`-`consistent` and `write`-`conservative` is possible. More details are given [further below](configuration-mapping.html#restrictions-for-parallel-participants).

The mapping method itself is defined after the colon `mapping:...`. In general, preCICE offers two groups of mapping methods

![Mapping options](images/docs/configuration/doc-mapping-options.pdf)

## Projection-based data mapping

Projection-based data mapping methods are typically cheap to compute as they don't involve solving expensive linear systems as opposed to the kernel methods. The basic variants, which operates solely on vertex data is `nearest-neighbor` mapping. All other variants require, additional information from the user, as stated in the overview figure. The available methods are

* `nearest-neighbor`: A first-order method, which is fast, easy to use, but, of course, has numerical deficiencies.
* `nearest-projection`: A (depending on how well the geometries match at the coupling interface) second-order method, which first projects onto surface mesh elements (first-order step) and, then, uses linear interpolation within each element (second-order step) as illustrated in the figure below. The method is still relatively fast and numerically clearly superior to `nearest-neighbor`. The downside is that mesh connectivity information needs to be defined, i.e. in the adapter, the participant needs to tell preCICE about edges in 2D and edges, triangles, or quadrilaterals in 3D. On the [mesh connectivity page](couple-your-code-defining-mesh-connectivity.html), we explain how to define connectivity. If no connectivity information is provided, `nearest-projection` falls back to a `nearest-neighbor` mapping.
* `linear-cell-interpolation`: Instead of mapping to surface-elements as the `nearest-projection`, `linear-cell-interpolation` uses volumetric elements, i.e., it is designed for volumetric coupling, where the coupling mesh is a region of space and not a domain boundary. It interpolates on triangles in 2D and on tetrahedra in 3D. Hence, connectivity information for volumetric elements needs to be defined. If none are found, it falls back on `nearest-projection` or `nearest-neighbor` (depending on the available connectivity information). The method was developed in the [Master's thesis of Boris Martin](https://mediatum.ub.tum.de/doc/1685618/1685618.pdf), where more detailed information are available.
* `nearest-neighbor-gradient`: A second-order method, which uses the same algorithm as nearest-neighbor with an additional linear approximation using gradient data. This method requires additional gradient data information. On the [gradient data page](couple-your-code-gradient-data.html), we explain how to add gradient data to the mesh. This method is only applicable with the `consistent` constraint. The method was developed [Master's thesis of Boshra Ariguib](http://dx.doi.org/10.18419/opus-12128), where more detailed information are available.

![different mapping variants visualised](images/docs/configuration-mapping-variants.png)

## Kernel methods


[Talk of the preCICE workshop 2023](https://www.youtube.com/watch?v=df-JMl7UxRg)

![RBF alias options](images/docs/doc-mapping-rbf-alias.pdf)
![RBF executors](images/docs/doc-mapping-rbf-executors.pdf)

Radial basis function mapping computes a global interpolant on one mesh, which is then evaluated at the other mesh. The global interpolant is formed by a linear combination of radially-symmetric basis functions centered on each vertex, enriched by one global linear polynomial. For more information, please refer, e.g., to [Florian's thesis](https://elib.uni-stuttgart.de/bitstream/11682/10598/3/Lindner%20-%20Data%20Transfer%20in%20Partitioned%20Multi-Physics%20Simulations.pdf) (pages 37 ff.) or to [this paper](https://www.researchgate.net/publication/317902743_Radial_Basis_Function_Interpolation_for_Black-Box_Multi-Physics_Simulations) and the reference therein.

To compute the interpolant, a linear equation system needs to be solved in every mapping of data. We use either:

* the external library Eigen and a QR decomposition, or
* the external library PETSc and a GMRES solver.

For small/medium size problems, the QR decomposition is enough and you don't need to install anything else. However, this follows a gather-scatter approach, which limits the scalability. For large problems, the GMRES solver performs better than the QR decomposition. For this, you need to [build preCICE with PETSc](installation-source-configuration.html). If you built with PETSc, the default is always GMRES. If you still want to use the QR decomposition, you can use the option `use-qr-decomposition`.

Radial basis function mapping also behaves as a second-order method just as `nearest-projection`, but without the need to define connectivity information. The downside is that it is normally more expensive to compute and that it shows numerical problems for large or highly irregular meshes.

The configuration might look like this:

```xml
<mapping:rbf-thin-plate-splines direction="read" from="MyMesh2" to="MyMesh1" constraint="consistent"/>
```

`thin-plate-splines` is the type of basis function used. preCICE offers basis function with global and local support:

* Basis function with global support (such as `thin-plate-splines`) are easier to configure as no further parameter needs to be set. For larger meshes, however, such functions lead to performance issues in terms of algorithmic complexity, numerical condition, and scalability.
* Basis functions with local support need either the definition of a `support-radius` (such as for `rbf-compact-tps-c2`) or a `shape-parameter` (such as for `gaussian`). To have a good trade-off between accuracy and efficiency, the support of each basis function should cover three to five vertices in every direction. You can use the tool [rbfShape.py](https://github.com/precice/precice/tree/develop/extras/rbfShape) to get a good estimate of `shape-parameter`.

For a complete overview of all basis function, refer to [this paper](https://www.sciencedirect.com/science/article/pii/S0045793016300974), page 5.

The interpolation problem might not be well-defined if you map along an axis-symmetric surface. This means, preCICE tries to compute, for example, a 3D interpolant out of 2D information. If so, preCICE throws an error `RBF linear system has not converged` or `Interpolation matrix C is not invertible`. In this case, you can restrict the interpolation problem by ignoring certain coordinates, e.g. `x-dead="true"` to ignore the x coordinate.

{% note %}
All data mappings are executed during `advance` and not in `readData`, cf. the section on  [how to couple your own code](couple-your-code-overview.html).
{% endnote %}

## Restrictions for parallel participants

As stated above, for parallel participants only `read`-`consistent` and `write`-`conservative` are valid combinations. If want to find out why, have a look at [Benjamin's thesis](https://mediatum.ub.tum.de/doc/1320661/document.pdf), page 85. But what to do if you want a `write`-`consistent` mapping? The trick is to move the mapping to the other participant, then `write` becomes `read`:

* Move the mapping, adjust `write` to `read`
* Be sure that the other participant also uses both meshes. Probably you need an additional `<use-mesh name="MyMesh1" from="MySolver1"/>`. This means another mesh is communicated at initialization, which can increase initialization time.
* Last, be sure to update the `exchange` tags in the coupling scheme, compare the [coupling scheme configuration](configuration-coupling.html) (e.g. change which mesh is used for the exchange and acceleration)

After applying these changes, you can use the [preCICE Config Visualizer](https://github.com/precice/config-visualizer) to visually validate your updated configuration file.

Maybe an example helps. You find one [in the preCICE Forum](https://precice.discourse.group/t/data-mapping-not-allowed-for-parallel-computation/374).
