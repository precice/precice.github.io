---
title: Use the adapter for your own project
permalink: adapter-dealii-own-project.html
keywords: adapter, dealii, adapter writing
summary: "This section will help you couple your own deal.II-code based on the provided deal.II solid codes."
---

The deal.II adapter provides examples of deal.II codes, which have been coupled using preCICE. This section explains the preCICE-related code changes and introduces the `Adapter` class, which is located in the `include/adapter` directory. A step-by-step tutorial is also available on the [preCICE wiki](couple-your-code-overview.html).

{% tip %}
In addition to our coupled solid mechanics related codes of the dealii-adapter repository, we contributed a [minimal deal.II-preCICE example to the deal.II project](https://dealii.org/developer/doxygen/deal.II/code_gallery_coupled_laplace_problem.html). If you want to couple your own deal.II-code, this tutorial is probably the best place to start.
{% endtip %}

{% note %}
[Contact us](community-channels.html) if you have any questions. Even if you don't have any questions, please let us know about your experience when your adapter is ready!
{% endnote %}

### Which information is needed by preCICE?

preCICE uses a black-box coupling approach, which means the solver only needs to provide a minimal set of information. In the simplest case, this includes configuration information, e.g. the name of the participant and the coordinates of the data you want to exchange (the interface mesh vertices). If you want to use a nearest-projection mapping, you need to additionally [specify mesh connectivity between the vertices](couple-your-code-defining-mesh-connectivity.html), which is currently not included in this adapter example.

### About fluid-structure coupling

For every multi-physics coupling, proper coupling data needs to be exchanged between all participants. In our example case, the `Fluid` participant calculates stresses, which are passed to the `Solid` participant. Using the stress for the structural calculations, the `Solid` participant calculates displacements, which are then passed back to the `Fluid` participant. As outlined above, preCICE needs coordinates of the data points you want to exchange.

## The `Adapter` class

This section introduces the `Adapter` class. This class is located in the `include/adapter` directory and contains various files: the files `time_handler.h` and `adapter.h` are the most important files for the adapter. The `time_handler.h` file contains a class to keep track of the current time step and absolute time values. There are other ways to handle this task, but we directly use its functionality in the adapter class to restore the time and therefore included it in this class. The main functionalities are, however, provided in the `adapter.h` file.
An exhaustive documentation for all functions can be found directly in the `adapter.h` source code.

In order to use the adapter, we first create an `adapter` object:

```cpp
Adapter::Adapter<dim, Vector<double>, Parameters::AllParameters> adapter(parameters, interface_boundary_id);
```

The first template argument specifies the coupling dimension, the second argument specifies the vector type of your simulation. The third template argument specifies the `Parameter` class type. The `parameter` object is directly passed to the constructor and all preCICE related settings are read by the adapter. In this case, required information is grouped in the parameter file in the subsection `precice configuration`. You can copy and insert it directly in your own parameter class or copy the class from the provided parameter class. Apart from the parameter object, the constructor needs to know your `interface_boundary_id`, which is the `boundary_id` of your deal.II triangulation. Make sure it is unique and doesn't change during simulation.

With the `adapter` object and the `time` object, you can modify your time loop in the following way:
This code has in large parts been copied from the `linear_elasticity` `run()` function:

```c++
// In the beginning, we create the mesh and set up the data structures
make_grid();
setup_system();
output_results(); // Output initial state
assemble_system();

// Then, we initialize preCICE i.e. we pass our mesh and coupling
// information to preCICE
// displacement and stress are the coupling data sets for FSI
adapter.initialize(dof_handler, displacement, stress);

// Then, we start the time loop. The loop itself is steered by preCICE. This
// line replaces the usual 'while( time < end_time)'
while (adapter.precice.isCouplingOngoing())
{
  // In case of an implicit coupling, we need to store time-dependent
  // data, in order to reload it later. The decision, whether it is
  // necessary to store the data is handled by preCICE as well
  adapter.save_current_state_if_required(state_variables, time);

  // Afterwards, we start the actual time step computation
  time.increment();

  // Assemble the time dependent contribution obtained from the Fluid
  // participant
  assemble_rhs();

  // ...and solve the system
  solve();

  // Update time-dependent data according to the theta-scheme
  update_displacement();

  // Then, we exchange data with other participants. Most of the work is
  // done in the adapter: We just need to pass both data vectors with
  // coupling data to the adapter. In case of FSI, 'displacement' is the
  // data we calculate and pass to preCICE and 'stress' is the (global)
  // vector filled by preCICE/the Fluid participant.
  adapter.advance(displacement, stress, time.get_delta_t());

  // Next, we reload the data we have previously stored in the beginning
  // of the time loop. This is only relevant for implicit couplings and
  // preCICE steers the reloading depending on the specific
  // configuration.
  adapter.reload_old_state_if_required(state_variables, time);

  // At last, we ask preCICE whether this coupling time step (= time
  // window in preCICE terms) is finished and write the result files
  if (adapter.precice.isTimeWindowComplete() &&
      time.get_timestep() % parameters.output_interval == 0)
    output_results();
}
```

Since now the coupling data is time-dependent, you need to assemble parts of your matrices/vectors in every time step, depending on your coupling problem/implementation. In most of the cases and in our example, this will be the rhs of the equations. The function `assemble_rhs()` uses the coupling data, namely stresses, to rebuild the rhs vector. How to apply coupling data is strongly problem-dependent. In our case, we use global data vectors to exchange data with preCICE. Afterwards, we use `get_function_values()` to extract the relevant data locally from the global vector. This way, we also enable to run the assembly with a shared-memory parallelization as shown in the nonlinear elastic case. More details can be found in the `assemble_rhs()` function in the linear elastic solver or the `assemble_neumann_contribution_one_cell()` function in the nonlinear elastic solver.

Your adapter is now ready for most of the preCICE features. For nearest-projection mapping, mesh connectivity needs to be provided as well, which is not yet supported.
