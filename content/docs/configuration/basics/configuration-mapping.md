---
title: Mapping configuration
permalink: configuration-mapping.html
keywords: configuration, mapping, meshes, coupling
summary: "When coupling two participants at a common coupling interface, in general, the two surface meshes do not match.
Therefore, preCICE provides data mapping methods to map coupling data from one mesh to the other. On this page, we explain how to configure such data mapping methods."
---

{% note %}
The mapping configuration has undergone a major revision between preCICE version 2 and preCICE version 3. For the documentation of version 2, checkout the documentation of [our previous versions](fundamentals-previous-versions.html). Learn [how to upgrade](couple-your-code-porting-v2-3.html), or see the full [configuration reference](configuration-xml-reference.html).
{% endnote %}

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

The `provide` mesh and `receive` mesh are then assigned to the `from` and `to` slot in the mapping configuration to indicate the mesh, on which data is written, and the mesh, on which data is read. In addition to a `from` and `to` mesh, each mapping defines a `direction`, which can either be `read` or `write`:

* `read` mappings are executed _before_ you can read data from the mesh. In the example above, `Temperature` is received on `MyMesh2`, then it is mapped from `MyMesh2` to `MyMesh1` and, finally, read from `MyMesh1`.
* `write` mappings are executed _after_ you have written data.

The `direction` indicates, how the defined meshes are used from the participant perspective: for a `read` mapping, the participant reads data from the `provide` mesh (`MyMesh1`), for a `write` mapping, the participant writes data to the `provide` mesh. In principle, each `read` mapping can be transformed into a `write` mapping (see the section [restrictions for parallel participants](configuration-mapping.html#restrictions-for-parallel-participants) below) by shifting the mapping tag on the 'other' involved participant (e.g. `MySolver2`). Depending on the configuration, data mapping might be computationally demanding. In preCICE the mapping is executed on the participant, where the mapping tag is defined in the configuration file.

{% note %}
All data mappings are executed during `advance` and not in `readData`, cf. the section on  [how to couple your own code](couple-your-code-overview.html).
{% endnote %}

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

* `scaled-consistent-surface` and `scaled-consistent-volume` constraint: `scaled-consistent` constraints are used for intensive quantities (just as the `consistent` constraint) where conservation of integral values (surface or volume) is necessary (e.g. velocities when the mass flow rate needs to be conserved). The mapping executes a `consistent` mapping in a first step, and corrects the result by a subsequent scaling step using the integral data sum to ensure the conservation of the integral sum on the input mesh and the output mesh. To use the `scaled-consistent-surface` constraint, surface connectivity on input and output meshes is required. To use the `scaled-consistent-volume` constraint, volumetric connectivity on input and output meshes is required.

For a sequential participant, any combination of `read`/`write`-`consistent/conservative` is valid. For a participant running in parallel, only `read`-`consistent` and `write`-`conservative` is possible. More details are given [further below](configuration-mapping.html#restrictions-for-parallel-participants).

{% note %}
Do not confuse a participant running in parallel with a parallel coupling scheme, see the [fundamental terminology](fundamentals-terminology.html#parallel-solvers-and-parallel-coupling).
{% endnote %}

{% tip %}
Instead of using static meshes as described here, you may consider using a [just-in-time data mapping](couple-your-code-just-in-time-mapping.html), where one of both meshes can change at runtime.
{% endtip %}

## Available mapping methods in preCICE

The mapping method itself is defined in the xml configuration after the colon `mapping:...` (e.g. `<mapping:nearest-neighbor ...`). In general, preCICE offers two broader groups of mapping methods

![Mapping options](images/docs/configuration/doc-mapping-options.svg)

{% note %}
Chapter 3.2 (Data mapping) of the preCICE version 2 [reference paper](https://doi.org/10.12688/openreseurope.14445.2) explains and compares a selection of projection-based methods and kernel methods.
{% endnote %}

### Projection-based methods

Projection-based data mapping methods are typically cheap to compute as they don't involve solving expensive linear systems as opposed to the kernel methods. The basic variant, which operates solely on vertex data, is `nearest-neighbor` mapping. All other variants require additional information from the user, as shown in the overview figure above.

![different mapping variants visualized](images/docs/configuration-mapping-variants.png)

Available methods are:

* `nearest-neighbor`: A first-order method, which is fast, easy to use, but, of course, has numerical deficiencies.
* `nearest-projection`: A (depending on how well the geometries match at the coupling interface) second-order method, which first projects onto surface mesh elements (first-order step) and, then, uses linear interpolation within each element (second-order step) as illustrated in the figure above. The method is still relatively fast and numerically clearly superior to `nearest-neighbor`. The downside is that mesh connectivity information needs to be defined, i.e. in the adapter, the participant needs to tell preCICE about edges in 2D and edges, triangles, or quadrilaterals in 3D. On the [mesh connectivity page](couple-your-code-defining-mesh-connectivity.html), we explain how to define connectivity. If no connectivity information is provided, `nearest-projection` falls back to a `nearest-neighbor` mapping.
* `linear-cell-interpolation`: Instead of mapping to surface-elements as the `nearest-projection`, `linear-cell-interpolation` uses volumetric elements, i.e., it is designed for volumetric coupling, where the coupling mesh is a region of space and not a domain boundary. It interpolates on triangles in 2D and on tetrahedra in 3D. Hence, connectivity information for volumetric elements needs to be defined. If none are found, it falls back on `nearest-projection` or `nearest-neighbor` (depending on the available connectivity information). The method was developed in the [Master's thesis of Boris Martin](https://mediatum.ub.tum.de/doc/1685618/1685618.pdf), where more detailed information is available.
* `nearest-neighbor-gradient`: A second-order method, which uses the same algorithm as nearest-neighbor with an additional linear approximation using gradient data. This method requires additional gradient data information. On the [gradient data page](couple-your-code-gradient-data.html), we explain how to add gradient data to the mesh. This method is only applicable with the `consistent` constraint. The method was developed [Master's thesis of Boshra Ariguib](http://dx.doi.org/10.18419/opus-12128), where more detailed information is available.

### Kernel methods

Kernel methods are typically more accurate and can deliver higher-order convergence rates, but are computationally more demanding compared to projection-based mapping methods. All kernel methods operate solely on vertex data such that no additional connectivity information is required from the user. Since preCICE version 3, there are two types of kernel methods available:

* `rbf-global-...` mapping methods: this method assembles and computes a global (potentially sparse) linear-system on one mesh, which is then evaluated at the other mesh. The global interpolant is formed by a linear combination of radially-symmetric basis-functions centered on each vertex, enriched by a linear polynomial. For `consistent` constraints, the resulting linear system has the size `N x N`, where `N` corresponds to the number of vertices of the `from` mesh. For `conservative` constraints, the resulting linear system has the size `N x N`, where `N` corresponds to the number of vertices of the `to` mesh. preCICE offers two solution strategies to solve the linear system:

  * `rbf-global-direct`, which computes initially a dense matrix decomposition of the linear system and applies the matrix decomposition afterwards in every coupling iteration to solve the mapping problem. All involved linear-algebra data structures are dense, regardless of the basis-function configuration. This method can use different [execution backends](configuration-mapping.html#execution-backends). By default, the linear-algebra library Eigen is used. Eigen uses a Cholesky decomposition, if the configured basis-function is strictly positive definite, and a QR decomposition, if that's not the case. This means that using the mapping with one of the basis-functions `volume-splines`, `thin-plate-splines` or `multiquadrics` takes considerable more time to compute, as these basis-functions are not positive definite. While this mapping method can be used while running a participant in parallel via mpi, a gather-scatter approach is used in preCICE, such that the actual system is solved in serial.
  * `rbf-global-iterative`, which assembles the system matrix initially and solves the resulting system iteratively in each coupling iteration. This method can use different [execution backends](configuration-mapping.html#execution-backends). However, the CPU version relies on the linear-algebra library PETSc, which is an optional dependency of preCICE. The PETSc implementation is fully mpi-parallel and uses sparse linear algebra to solve the resulting system. As a consequence, we need to take care when configuring the basis-function for the mapping: it should only be used with compactly supported basis-functions and the configured support-radius or shape-parameter should only cover a limited number of vertices in radial direction (e.g. 10 vertices) such that the resulting linear system is sparse. Details about this implementation can be found in [Florian's thesis (pages 37 ff.)](https://elib.uni-stuttgart.de/bitstream/11682/10598/3/Lindner%20-%20Data%20Transfer%20in%20Partitioned%20Multi-Physics%20Simulations.pdf).

{% note %}
For global rbf methods, the interpolation problem (or rather the polynomial QR system) might not be well-defined if you map along an axis-symmetric surface. This means, preCICE tries to compute, for example, a 3D interpolant out of 2D information. If so, preCICE throws an error. In this case, you can restrict the interpolation problem by ignoring certain coordinates, e.g. `x-dead="true"` to ignore the x coordinate.
{% endnote %}

* `rbf-pum-direct`, which breaks down the mapping problem in smaller clusters, solves these clusters locally and blends them afterwards together to recover a global solution. This mapping version only needs the linear-algebra library Eigen and the used linear solver is a dense solver in each cluster (actually the same as for `rbf-global-direct`, i.e., it is beneficial to configure strictly positive definite basis-functions). The mapping is specifically designed for large mapping problems and runs fully mpi-parallel. To configure the accuracy of the mapping, the number of `vertices-per-cluster` can be increased. The method can only handle sufficiently matching geometries and problems might occur if large gaps exist between the coupling meshes. Further information, including some performance comparisons, can be found in [David's talk at the preCICE workshop 2023](https://youtu.be/df-JMl7UxRg?si=18X3LFTIepmrtAMc). In practical applications, the partition of unity method typically outperforms any of the global rbf variants.

#### Configuration

Configuring kernel methods is more involved and offers more options. A full reference of all options can be found in the [xml reference](configuration-xml-reference.html). On a broader level, the configuration consists of two main options: the applied kernel mapping method and the used basis-function including its support radius or shape parameter. As the decision about the used kernel mapping method can be intricate, we provide an alias called `<mapping:rbf ...` which decides dynamically for a kernel method according to the setup (e.g. parallel execution, problem size, available dependencies)

![RBF alias options](images/docs/configuration/doc-mapping-rbf-alias.svg)

An RBF mapping configuration could look as follows

```xml
<mapping:rbf direction="read" from="MyMesh2" to="MyMesh1" constraint="consistent">
 <basis-function:compact-polynomial-c6 support-radius="1.8"/>
</mapping:rbf>
```

The basis-function has to be defined as a subtag in all kernel methods. In this example the basis-function `compact-polynomial-c6` is used with a support radius of `r=1.8`.

{% note %}
We recommend to use the alias tag, as long as there are no further requirements regarding the desired mapping method. preCICE reports initially, which mapping method was selected for the alias tag. However, the decision might vary between different versions. If you want to ensure that a specific method is used, use the corresponding mapping tag.
{% endnote %}

The configuration of the basis-function is problem-dependent. In general, preCICE offers basis function with global and local support:

* Basis-functions with global support (such as `thin-plate-splines`) are easier to configure as no further parameter needs to be set. However, typically it pays off in terms of accuracy to configure a basis-function according to your problem dimensions and shape.
* Basis functions with local support need either the definition of a `support-radius` (such as for `compact-polynomial-c2`) or a `shape-parameter` (such as for `gaussian`). Selecting a larger and larger support radius leads to a more and more flat basis-function and -in theory- to more and more accurate results. However, the resulting linear system becomes more and more ill-conditioned such that the linear solver might fail eventually.

ASTE and our [ASTE tutorial](tutorials-aste-turbine.html) enable full insight into the accuracy of the configured mapping method.

#### Execution backends

Starting from version 3.2, preCICE offers to execute `mapping:rbf-global...` on different executor backends using the linear-operator library Ginkgo in conjunction with Kokkos.

To use this feature, please build preCICE from source with  [Ginkgo Mappings enabled](installation-source-dependencies.html#ginkgo).

![RBF executors](images/docs/configuration/doc-mapping-rbf-executors.svg)

To configure the executor, an additional subtag can be used in the mapping configuration:

```xml
<mapping:rbf direction="read" from="MyMesh2" to="MyMesh1" constraint="consistent">
 <basis-function:compact-polynomial-c6 support-radius="1.8"/>
 <executor:cuda gpu-device-id="0"/>
</mapping:rbf>
```

More details on the feature can be found in [Schneider et al. 2023](https://doi.org/10.23967/c.coupled.2023.016).

## Geometric multiscale mapping

Geometric multiscale mapping enables the coupling of dimensionally heterogeneous coupling participants, e.g., a 1D system code with a 3D CFD code.

{% experimental %}
This is an experimental feature, available since preCICE v3.0.0. Enable it using `<precice-configuration experimental="true">` and do not consider the configuration to be stable yet. For now, since preCICE does not yet support 1D meshes, both input and output meshes are defined as 3D, and a primary axis defines the active component of the 1D data. Are you interested in this feature? Give us your feedback!
{% endexperimental %}

We differentiate between _axial_ and _radial_ geometric multiscale mapping:

![Axial vs radial 1D-3D mapping](images/docs/configuration-mapping-geometric-multiscale-axial-radial.png)

In a 1D-3D mapping, axial mapping maps between one point at the boundary of the 1D domain and multiple points at a surface of a 3D domain, while the domains are connected over a main axis.
Radial mapping maps between multiple (internal) points of the 1D domain and multiple points at a surface of a 3D domain. In a 1D-3D domain, the 3D domain can encapsulate the 1D domain, or the 1D domain can be a line on the surface of the 3D domain.
Currently, axial and radial geometric multiscale coupling is only supported in a consistent manner between 1D and 3D participants and over a circular interface, but extensions to this are planned.

The concept also extends to 1D-2D, 2D-3D, and further setups, which are not currently supported.

Potential configurations for the axial and radial geometric multiscale mapping look as follows:

```xml
<mapping:axial-geometric-multiscale direction="read" multiscale-type="spread" multiscale-radius="1.0" multiscale-axis="X" from="MyMesh2" to="MyMesh1" constraint="consistent" />
```

```xml
<mapping:radial-geometric-multiscale direction="read" multiscale-type="collect" multiscale-axis="X" from="MyMesh1" to="MyMesh2" constraint="consistent" />
```

The `multiscale-type` which can be either `"spread"` or `"collect"` refers to whether the participant spreads data from one mesh node to multiple nodes or collects data from multiple mesh nodes into one node. The `multiscale-axis` is the main axis, along which the coupling takes place, i.e. the principal axis of the 1D and 3D participants. The `multiscale-radius` refers to the radius of the circular interface boundary surface.

Since the 1D participant likely computes average quantities, e.g., the average pressure and velocity in a pipe, a velocity profile has to be assumed in order to convert data between the 1D and 3D participant for the axial mapping. Currently, a laminar flow profile is imposed by default, but different profiles might be supported in the future.

## Restrictions for parallel participants

As stated above, for parallel participants only `read`-`consistent` and `write`-`conservative` are valid combinations. If want to find out why, have a look at [Benjamin's thesis](https://mediatum.ub.tum.de/doc/1320661/document.pdf), page 85. But what to do if you want a `write`-`consistent` mapping? The trick is to move the mapping to the other participant, then `write` becomes `read`:

* Move the mapping, adjust `write` to `read`
* Be sure that the other participant also uses both meshes. Probably you need an additional `<receive-mesh name="MyMesh1" from="MySolver1"/>`. This means another mesh is communicated at initialization, which can increase initialization time.
* Last, be sure to update the `exchange` tags in the coupling scheme, compare the [coupling scheme configuration](configuration-coupling.html) (e.g. change which mesh is used for the exchange and acceleration)

{% tip %}
After applying these changes, you can use the [preCICE Config Visualizer](https://github.com/precice/config-visualizer) to visually validate your updated configuration file.
{% endtip  %}

Maybe an example helps. You find one [in the preCICE Forum](https://precice.discourse.group/t/data-mapping-not-allowed-for-parallel-computation/374).
