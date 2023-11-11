---
title: Configure the deal.II codes
permalink: adapter-dealii-configure.html
keywords: adapter, deal.II, configuration, parameter file
summary: "Define your geometry in the individual source code file and case specific parameters (e.g. coupling parameters) in the respective parameter file (*.prm)"
---

If you like to setup your own FSI simulation using the provided dealii-adapter, this section should help you to configure the source code and the parameter file.

In order to change your geometry and set appropriate boundary conditions, you need to modify the source file. The parameter file (e.g. `parameters.prm`) is used to set certain properties: material properties, numerical properties or preCICE-related properties.

{% tip %}
The linear elastic solver is designed for single core and single threaded computations. The non-linear solver supports shared memory parallelism. If that is still not enough for your case, there is also an [unofficial non-linear elastic solid solver for massively parallel systems](https://github.com/DavidSCN/matrix-free-dealii-precice).
{% endtip %}

{% tip %}
The number of allocated threads in case of shared-memory parallel computations can be specified via the environment variable `DEAL_II_NUM_THREADS`. By default, all available cores on the respective machine are utilized.
{% endtip %}

## Parameter file

This section gives additional information about the parameter files. Here is an example:

```text
subsection Time
  # End time
  set End time        = 10

  # Time step size
  set Time step size  = 0.05

  # Write results every x time steps
  set Output interval = 10

  # Output folder
  set Output folder   = dealii-output
end
```

{% tip %}
A reference parameter file including all important options can be found [in the adapter repository](https://github.com/precice/dealii-adapter/blob/master/parameters.prm).
{% endtip %}

The first subsection deals with specifications for time-related settings. The output interval specifies when simulation results are written to an output file. In this example, the program will store the results every 10 time steps. Using a time step size of 0.05 seconds, a result file is written every 0.5 seconds.

```text
subsection Discretization
    # Polynomial degree of the FE system
    set Polynomial degree   = 3

    # Time integration scheme
    # 0 = forward, 1 = backward
    set theta               = 0.5

    # Newmark beta
    beta                    = 0.25

    # Newmark gamma
    gamma                   = 0.5
end
```

This subsection configures the numerical discretization: The polynomial degree is associated to the degree of the applied shape functions.
Theta is related to the time integration scheme of the linear solver, which is a one-step-theta method. Accordingly, its value can be chosen between 0 and 1, where 0 denotes an explicit forward Euler method and 1 denotes an implicit backward Euler method with each having first order accuracy. It is recommended to use theta to 0.5, which results in a second order accurate and energy-conserving Crank-Nicolson scheme. If you prefer dissipative behavior, you need to choose theta greater than 0.5. Have a look in the [Solver details](adapter-dealii-solver-details.html) for more information.
The non-linear solver uses, however, an implicit [Newmark scheme](https://en.wikipedia.org/wiki/Newmark-beta_method), which allows a configuration using the parameters beta and gamma.

```text
subsection System properties
    # Poisson's ratio
    set Poisson's ratio = 0.4

    # Shear modulus
    set mu                   = 0.5e6

    # density
    set density              = 1000

    # Body forces x,y,z
    set body forces     = 0.0,0.0,0.0
end
```

This section defines the material properties and allows the definition of body forces. Possion's ratio and lambda define the material properties. For an overview of all available parameters and conversion formulas have a look at the conversion table at the bottom of the [elastic moduli wikipedia article](https://en.wikipedia.org/wiki/Elastic_modulus):
Body forces are usually gravitational forces and defined direction-wise (x,y,z).

```text
subsection Solver
  # Structural model to be used: linear or neo-Hookean
  set Model                     = linear

  # Linear solver: CG or Direct
  set Solver type               = Direct

  # Max CG solver iterations (multiples of the system matrix size)
  # In 2D, this value is best set at 2. In 3D, a value of 1 works fine.
  set Max iteration multiplier  = 1

  # Absolute CG solver residual (multiplied by residual norm, ignored if Model == linear)
  set Residual                  = 1e-6

  # Number of Newton-Raphson iterations allowed (ignored if Model == linear)
  set Max iterations Newton-Raphson = 10

  # Relative displacement error tolerance for non-linear iteration (ignored if Model == linear)
  set Tolerance displacement        = 1.0e-6

  # Relative force residual tolerance for non-linear iteration (ignored if Model == linear)
  set Tolerance force               = 1.0e-9
end
```

This subsection defines parameters for the applied solver. First of all, the underlying model needs to specified: you can either choose a [linear elastic](https://en.wikipedia.org/wiki/Linear_elasticity) model or employ a hyper-elastic non-linear [neo-Hookean solid](https://en.wikipedia.org/wiki/Neo-Hookean_solid). The non-linear solvers applies an iterative Newton-Raphson scheme to solve the system iteratively. The following selections determine the properties of the linear and non-linear solver. Depending on your configuration, some parameters might not be relevant. The residual of the linear solver is only relevant for the non-linear model, since the residual is adjusted between individual Newton iterations. For the linear model, this value is hard-coded.
{% note %}
You need to build deal.II with `UMFPACK` in order to use the direct solver, which is enabled by default.
{% endnote %}

```text
subsection precice configuration
    # Cases: FSI3 or PF for perpendicular flap
    set Scenario            = FSI3

    # PF x-location
    set Flap location       = 0.0

    # Name of the precice configuration file
    set precice config-file = precice-config.xml

    # Name of the participant in the precice-config.xml file
    set Participant name    = Solid

    # Name of the coupling mesh in the precice-config.xml file
    set Mesh name           = Solid-Mesh

    # Name of the read data in the precice-config.xml file
    set Read data name      = Stress

    # Name of the write data in the precice-config.xml file
    set Write data name     = Displacement
end
```

This section defines preCICE-related settings. The scenario and flap-location parameters can be deleted for your own project since they are just needed for the configuration of our tutorial cases. The other parameters are related to the `precice-config.xml` file. Have a look at the respective entry in the [preCICE configuration section](configuration-overview.html) for details. Make sure the names are the same as in the `precice-config.xml`.

## Source code file

### Grid generation

Similar to the deal.II tutorial cases, the grid is generated in a function called `make_grid()`, which is called in the beginning of the `run()` function. There are a bunch of options to construct the mesh inside this function, which are extensively described in the deal.II documentation: If your geometry is rather simple (e.g. a shell or a sphere), have a look at the [GridGenerator class](https://www.dealii.org/developer/doxygen/deal.II/namespaceGridGenerator.html) in the documentation. If you have complex geometries, you might want to create your mesh with external software and load the geometry file in the source code file. In this case, have a look at the [GridIn class](https://www.dealii.org/developer/doxygen/deal.II/classGridIn.html). The documentation also provides a list of supported mesh file formats.

In our case, we configured the source code file for two [tutorial cases](tutorials.html). Hence, there is additionally an `if` condition in the `make_grid()` function, which asks for the chosen tutorial case. Since both cases have a rectangular grid, we generate our mesh by using the `subdivided_hyper_rectangle()` function. Moreover, the [deal.II tutorial programs](https://www.dealii.org/developer/doxygen/deal.II/Tutorial.html) provide various examples for the grid generation.

### Boundary conditions

Boundary conditions are applied to specific mesh regions via boundary IDs. We need to distinguish three mesh regions:

1. Dirichlet boundaries, where a constant zero displacement is prescribed

2. Neumann boundaries, where a prescribed traction acts on the surface. This is solely the coupling interface in our case

3. Boundaries without a specified condition (strictly speaking zero traction)

Hence, the first task is the assignment of mesh IDs to the desired mesh region. This is done in the `make_grid()` function. In our case, we used the `colorized = true` option during the grid generation, which automatically assigns each side of our rectangle an individual boundary ID. But you could also iterate over all cells and ask for your own condition (e.g. geometric conditions) and set the boundary ID accordingly. Make sure you only have one boundary ID for the interface mesh in the end. If you have more than one, sum them up in a single ID in a second step as done at the end of the `make_grid()` function. The interface mesh ID is a global variable and needed by the `Adapter` constructor.

The interface mesh is assumed to be the only Neumann boundary. If you have other loads acting on the surface, you need to add it manually during assembly. Constant volume loads (gravity) can be used and are switched off by default, since the tutorial cases don't need them.

Similar to the collection of the interface mesh ID in a single boundary ID, you could sum up your Dirichlet boundaries in one ID. In this case, you could use the `clamped_mesh_id` as in the tutorial cases. If you want to set more specific Dirichlet boundaries e.g. in a specific direction, have a look at the bottom of the `assemble_rhs()`/ the `make_constraints()` function. You need to modify the `interpolate_boundary_values()` function by e.g. choosing a different direction in the `fe.component_mask()`. The tutorials give an example for doing this in the out-of-plane direction. A detailed documentation is given in the [deal.II documentation](https://www.dealii.org/developer/doxygen/deal.II/namespaceVectorTools.html#a9f3e3ae1396811f998cc35f94cbaa926).
