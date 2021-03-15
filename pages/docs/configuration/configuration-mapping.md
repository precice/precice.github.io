---
title: Mapping configuration
permalink: configuration-mapping.html
keywords: configuration, mapping, meshes, coupling
summary: "When coupling two participants at a common coupling interface, in general, the two surface meshes do not match.
Therefore, preCICE provides data mapping methods to map coupling data from one mesh to the other. On this page, we explain how to configure such data mapping methods."
---

## Basics

A participant needs to `use` at least two meshes to define a mapping between both:

```xml
<participant name="MySolver1"> 
    <use-mesh name="MyMesh1" provide="yes"/> 
    <use-mesh name="MyMesh2" from="MySolver2"/>
    <write-data name="Forces" mesh="MyMesh1"/> 
    <read-data name="Temperature" mesh="MyMesh1"/> 
    <mapping:nearest-neighbor direction="read" from="MyMesh2" to="MyMesh1" constraint="consistent"/>
    <mapping:nearest-neighbor direction="write" from="MyMesh1" to="MyMesh2" constraint="conservative"/>
</participant>
```

Mappings can be defined in two `directions`, either `read` or `write`:
* `read` mappings are executed _before_ you can read data from the mesh. In the example above, `Temperature` is received on `MyMesh2`, then it is mapped from `MyMesh2` to `MyMesh1` and, finally, read from `MyMesh1`.
* `write` mappings are executed _after_ you have written data. 

Furthermore, mappings come int two types of `constraint`: `consistent` and `conservative`:
* `conservative` mapping: Mapping between different meshes (example, from a fine to a coarse grid), the value at a coarse node is computed as an aggregation of the corresponding fine nodes, such that the total coupling value (in our example `Forces`) on the coarse and fine mesh is the same. This is required for quantities that are absolute (e.g. force, mass, etc.). An example for a nearest-neighbor mapping could look like this:

```
     f=2    f=1    f=2    f=1    f=1
------+------+------+------+------+------
          \  |  /          |  /          
-------------+-------------+-------------
         f=(2+1+2)     f=(1+1)         
```

* `consistent` mapping: For quantities that are normalized (`Temperature` in our example, or pressure, which is force _per unit area_), we need a consistent mapping. This means that the value at coarse nodes is the same as the value at the corresponding fine node. Again, an example for a nearest-neighbor mapping could look like this:

```
     T=2    T=1    T=2    T=1    T=1
------+------+------+------+------+------
             |             |             
-------------+-------------+-------------
            T=1           T=1            
```

For a sequential participant, any combination of `read`/`write`-`consistent/conservative` is valid. For a parallel participant (i.e. a `master` tag is defined), only `read`-`consistent` and `write`-`conservative` is possible. More details are given [further below](configuration-mapping.html#restrictions-for-parallel-participants). 

Furthermore, mappings have an optional parameter `timing`, it can be:
* `initial` (the default): The mapping is only computed once, the first time it is used. This is sufficient for stationary meshes (also including the reference mesh in an Lagrangian or an ALE description). 
* `onadvance`: The mapping is newly computed for every mapping of coupling data. This can be expensive and is only recommend if you know exactly why you want to do this.
* `ondemand`: Data is not mapped in `initialize`, `initializeData`, or `advance`, but only if steered manually through `mapReadDataTo` resp. `mapWriteDataFrom`. Only use this if you are sure that your adapter uses theses methods.   


Concerning mapping methods, preCICE offers three variants:
* `nearest-neighbor`: A first-order method, which is fast, easy to use, but, of course, has numerical deficiencies. 
* `nearest-projection`: A (mostly) second-order method, which first projects onto mesh elements and, then, uses linear interpolation within each element (compare the figure below). The method is still relatively fast and numerically clearly superior to `nearest-neighbor`. The downside is that mesh connectivity information needs to be defined, i.e. in the adapter, the participant needs to tell preCICE about edges in 2D and edges, triangles, or quads (see [issue](https://github.com/precice/precice/issues/153)) in 3D. On the [mesh connectivity page](couple-your-code-defining-mesh-connectivity.html), we explain how to do that. If no connectivity information is provided, `nearest-projection` falls back to an (expensive) `nearest-neighbor` mapping. 
* Radial-basis function mapping. Here, the configuration is more involved, so keep reading.   

![different mapping variants visualised](images/docs/configuration-mapping-variants.png)


## Radial-basis function mapping

Radial basis function mapping computes a global interpolant on one mesh, which is then evaluated at the other mesh. The global interpolant is formed by a linear combination of radially-symmetric basis functions centered on each vertex, enriched by one global linear polynomial. For more information, please refer, e.g., [Florian's thesis](https://elib.uni-stuttgart.de/bitstream/11682/10598/3/Lindner%20-%20Data%20Transfer%20in%20Partitioned%20Multi-Physics%20Simulations.pdf) (pages 37 ff.) or to [this paper](https://www.researchgate.net/publication/317902743_Radial_Basis_Function_Interpolation_for_Black-Box_Multi-Physics_Simulations) and the reference therein.

To compute the interpolant, a linear equation system needs to be solved in every mapping of data. We use either:
- the external library Eigen and a QR decomposition, or
- the external library PETSc and a GMRES solver.

For small/medium size problems, the QR decomposition is enough and you don't need to install anything else. However, this follows a gather-scatter approach, which limits the scalability. For large problems, the GMRES solver performs better than the QR decomposition. For this, you need to [build preCICE with PETSc](https://github.com/precice/precice/wiki/Dependencies#petsc-optional). If you built with PETSc, the default is always GMRES. If you still want to use the QR decomposition, you can use the option `use-qr-decomposition`.

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



{% include note.html content="All data mappings are executed during `advance` and not in `readBlockVectorData` etc., cf. the section on  [how to couple your own code](couple-your-code-overview.html)." %}



## Restrictions for parallel participants

As stated above, for parallel participants only `read`-`consistent` and `write`-`conservative` are valid combinations. If want to find out why, have a look at [Benjamin's thesis](https://mediatum.ub.tum.de/doc/1320661/document.pdf), page 85. But what to do if you want a `write`-`consistent` mapping? The trick is to move the mapping to the other participant, then `write` becomes `read`:
* Move the mapping, adjust `write` to `read`
* Be sure that the other participant also uses both meshes. Probably you need an additional `<use-mesh name="MyMesh1" from="MySolver1"/>`. This means another mesh is communicated at initialization, which can increase initialization time. 
* Last, be sure to update the `exchange` tags in the coupling scheme, compare the [coupling scheme configuration](configuration-coupling-scheme.html) (e.g. change which mesh is used for the exchange and acceleration)

After applying these changes, you can use the [preCICE Config Visualizer](https://github.com/precice/config-visualizer) to visually validate your updated configuration file. 

Maybe an example helps. You find one [in the preCICE Forum](https://precice.discourse.group/t/data-mapping-not-allowed-for-parallel-computation/374).
