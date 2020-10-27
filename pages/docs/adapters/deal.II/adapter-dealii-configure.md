---
title: Configure the deal.II codes
permalink: adapter-dealii-configure.html
keywords: adapter, deal.II, configuration, parameterfiles
summary: "Define your geometry in the individual source code file and case specific paramters (e.g. coupling parameters) in the respective parameterfile (*.prm)"
---

If you like to setup your own FSI simulation using the provided dealii-adapter, this section should help you to configure the source code and the parameter file.

In order to change your geometry and set appropriate boundary conditions, you need to modify the source file. The parameter file e.g. `linear_elasticity.prm` is used to set certain properties e.g. material properties, numerical properties or preCICE-related properties.

## Source code file
### Grid generation
Similar to the deal.II tutorial cases, the grid is generated in a function called `make_grid()`, which is called in the beginning of the `run()` function. There are a bunch of options to construct the mesh inside this function, which are extensively described in the deal.II documentation: If your geometry is rather simple (e.g. a shell or a sphere), have a look at the [GridGenerator class](https://www.dealii.org/9.0.0/doxygen/deal.II/namespaceGridGenerator.html) in the documentation. If you have complex geometries, you might want to create your mesh with external software and load the geometry file in the source code file. In this case, have a look at the [GridIn class](https://www.dealii.org/9.0.0/doxygen/deal.II/classGridIn.html). The documentation also provides a list of supported mesh file formats. 

In our case, we configured the source code file for two [tutorial cases](https://github.com/precice/precice/wiki/Tutorial-for-FSI-with-deal.II-and-OpenFOAM). Hence, there is additionally an `if` condition in the `make_grid()` function, which asks for the chosen tutorial case. Since both cases have a rectangular grid, we generate our mesh by using the `subdivided_hyper_rectangle()` function. Moreover, the [deal.II tutorial programs](https://www.dealii.org/9.0.0/doxygen/deal.II/Tutorial.html) provide various examples for the grid generation.

### Boundary conditions
Boundary conditions are applied to specific mesh regions via boundary IDs. We need to distinguish three mesh regions: 

1. Dirichlet boundaries, where a constant zero displacement is prescribed 

2. Neumann boundaries, where a prescribed traction acts on the surface. This is solely the coupling interface in our case

3. Boundaries without a specified condition (strictly speaking zero traction)   

Hence, the first task is the assignment of mesh IDs to the desired mesh region. This is done in the `make_grid()` function. In our case, we used the `colorized = true` option during the grid generation, which automatically assigns each side of our rectangle an individual boundary ID. But you could also iterate over all cells and ask for your own condition e.g. geometric conditions and set accordingly the boundary ID. Make sure you have only one boundary ID for the interface mesh in the end. If you have more than one, sum them up in a single ID in a second step as done at the end of the `make_grid()` function. The interface mesh ID is a global variable and needed by the `Adapter` constructor. 

The interface mesh is assumed to be the only Neumann boundary. If you have other loads acting on the surface, you need to add it manually during assembly. Constant volume loads (gravity) can be used and are switched off by default, since the tutorial cases don't need them. 

Similar to the collection of the interface mesh ID in a single boundary ID, you could sum up your Dirichlet boundaries in one ID. In this case, you could simply use the `clamped_mesh_id` as in the tutorial cases. If you want to set more specific Dirichlet boundaries e.g. in a specific direction, have a look at the bottom of the `assemble_rhs()`/ the `make_constraints()` function. You need to modify the `interpolate_boundary_values()` function by e.g. choosing a different direction in the `fe.component_mask()`. The tutorials give an example for doing this in the out-of-plane direction. A detailed documentation is given in the [deal.II documentation](https://www.dealii.org/9.0.0/doxygen/deal.II/namespaceVectorTools.html#a9f3e3ae1396811f998cc35f94cbaa926). 

## Parameter file
This section gives additional information about the parameter files:
```
subsection Time
  # End time
  set End time        = 10

  # Time step size
  set Time step size  = 0.05

  # Output interval
  set Output interval = 10
end
```
The first subsection deals with specifications for time related settings. The output interval specifies, when simulation results are written to an output file. In this example, the program will store the results every 10 time steps. Using a time step size of 0.05 seconds, a result file is written every 0.5 seconds.

```
subsection Discretization
    # Time integration scheme 
    # 0 = forward, 1 = backward
    set theta               = 0.5

    # Polynomial degree of the FE system
    set Polynomial degree   = 3
end
```
This subsection configures the numerical discretization: Theta is related to the time integration scheme, which is a one-step-theta method. Accordingly, its value can be chosen between 0 and 1, where 0 denotes an explicit forward Euler method and 1 denotes an implicit backward Euler method with each having first order accuracy. It is recommended to use theta to 0.5, which results in a second order accurate and energy-conserving Crank-Nicolson scheme. If you prefer dissipative behavior, you need to choose theta greater than 0.5. Have a look in the [Solver details](https://github.com/precice/dealii-adapter/wiki/Solver-Details) for more information. The polynomial degree is associated to the degree of the applied shape functions.

```
subsection System properties
    # mu (shear modulus)
    set mu                   = 0.5e6

    # lambda
    set lambda               = 2e6

    # density
    set density              = 1000

    # Body forces x,y,z
    set body forces     = 0.0,0.0,0.0
end
```
This section defines the material properties and allows the definition of body forces. Mu and lambda are the [Lamé parameters](https://en.wikipedia.org/wiki/Lam%C3%A9_parameters) and related to the E- modulus and Poisson's ratio:
<!---
\lambda = \frac{\nu E}{(1+\nu)(1-2\nu)}\;\;\;\;\;\;\;\;
\mu = G = \frac{E}{2(1+\nu)}
--->

![equation](https://user-images.githubusercontent.com/33414590/59502469-1d5b2400-8e9e-11e9-899b-d3d3378f6762.png)

Body forces are usually gravitational forces and defined in each direction (x,y,z).

```
subsection Linear solver
  # Linear solver iterations (multiples of the system matrix size)
  set Max iteration multiplier  = 1

  # Linear solver residual (scaled by residual norm)
  set Residual                  = 1e-6

  # Linear solver: CG or Direct
  set Solver type               = Direct
end
```
This subsection defines parameters for the linear solver. In case you select a direct solver, the first two parameters are not relevant. Furthermore, you need to build deal.II with `UMFPACK` in order to use the direct solver.


```
subsection precice configuration
    # Cases: FSI3 or PF for perpendicular flap
    set Scenario            = FSI3

    # Name of the precice configuration file
    set precice config-file = precice-config.xml
	
    # Name of the participant in the precice-config.xml file
    set Participant name    = Solid
	
    # Name of the node based coupling mesh in the precice-config.xml file
    set Mesh name           = Solid_nodes
	
    # Name of the read data in the precice-config.xml file
    set Read data name      = Stress
	
    # Name of the write data in the precice-config.xml file
    set Write data name     = Displacement
end
```
This section defines preCICE-related settings. The scenario parameter can be deleted for your own project and is just needed for the configuration of our tutorial cases. The other parameters are related to the `precice-config.xml` file. Have a look at the respective entry in the [preCICE wiki](https://github.com/precice/precice/wiki/Basic-Configuration#3-coupling-participants) for details. Make sure the names are the same as in the `precice-config.xml`.
