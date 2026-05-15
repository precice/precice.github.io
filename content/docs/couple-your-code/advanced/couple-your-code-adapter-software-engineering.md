---
title: Adapter software engineering
permalink: couple-your-code-adapter-software-engineering.html
keywords: api, adapter, library, modularity, sustainability
summary: "The example developed in the step-by-step guide is a rather intrusive way of writing an adapter as we directly modify the main solver routines. This page discusses alternative architectures, as well as further technical aspects of the adapter as a software project."
---

## Architecture

What we develop in the [step-by-step guide](couple-your-code-preparing-your-solver) is best described as an _adapted code_, not an _adapter_. We directly modified the main solver routines, which means that now the coupling-related code is tightly integrated with the solver code. If you are the maintainer of the solver code, you know best what architecture to follow. However, if you are developing an adapter for someone else's solver, there are also ways to separate the adapter code from the solver code, making the adapter easier to maintain and distribute/publish and hence more useful to the community.

In this section, we look into developing an adapter as a class in the solver code, as a wrapper that calls the solver and preCICE APIs, or as a solver plugin:

![Adapter software engineering options](images/docs/couple-your-code/adapter-software-engineering/adapter-software-engineering-approaches.svg)

This categorization is not always clear, as it often depends on our perspective: which is the executable application being coupled? A ready-to-use simulation program, a code using tools from a toolkit, or an external script delegating execution? This section is mainly meant to provide ideas and examples on how to better structure such an adapter code.

{% tip %}
In any case, fully integrating the adapter into the codebase and the continuous integration system of the solver (with any of the methods described here) makes maintenance easier, as most complications typically come from changes in the solver code, not from preCICE (in which case, you can refer to a [porting guide](./couple-your-code-porting-overview.html)).
{% endtip %}

### Adapter class

Encapsulating the adapter into a class separates the preCICE calls from the rest of the solver code.
This is very similar to directly modifying the solver code (with some modifications still needed),
but the solver calls a few high-level adapter functions, instead of directly calling the preCICE API.
Such encapsulation avoids duplicating additional checks and details and makes maintenance easier.

This method is particularly useful for adapters used in frameworks that the user uses to create concrete simulations.
Examples here include the [FEniCS adapter](./adapter-fenics.html) and the [deal.II adapter](https://github.com/precice/dealii-adapter).

Even when directly modifying the code, it makes sense to hide as many changes as possible behind a class API.
Examples for this include the [CalculiX adapter](./adapter-calculix-overview.html) and the [SU2 adapter for v6 and earlier](./adapter-su2-overview.html) (as described in [Alexander Rusch's thesis](https://mediatum.ub.tum.de/1461810)).

Adapter classes can still be provided as optional modules of the main codebase. Examples include the [deal.II adapter](./adapter-dealii-overview.html), the [G+smo adapter](./adapter-gismo.html), the [DUNE adapter](./adapter-dune.html), and the [DuMux adapter](./adapter-dumux-get.html)

### Adapter plugin

Some solvers provide a plugin interface.
Examples include OpenFOAM (function objects) and Fluent (UDF files).
The solver exposes specific "hooks"/"callbacks", which trigger the execution of external code at specific stages of the simulation.
Creating an adapter as such a plugin is non-intrusive and makes it easy to distribute the adapter independently.

While this is a generally preferable architecture, it comes with some requirements.
The solver needs to provide the following functionality via the plugin interface:

- Executing additional steps during the configuration, setup, and teardown
- Access to the (boundary) mesh coordinates (read)
- Access to the (boundary) values (read/write)
- Access to the time step size (read/write)
- Controlling the exit condition of the time loop
- Checkpointing (if implicit coupling is required):
  - Storing and restoring the time
  - Storing and restoring the internal solution

The trickiest part is typically the checkpointing. However, in some cases, this can alternatively be implemented as (a) controlling when the solver moves to the next time step or discards the current solution and tries again, (b) storing restart files and restarting from them (inefficient, but might not be an issue in some cases).

Examples of adapters implemented as plugins include the [OpenFOAM adapter](./adapter-openfoam-overview.html) (with the plugin approach explained in detail in [Gerasimos Chourdakis' thesis](https://mediatum.ub.tum.de/1462269)) and the [Fluent adapter](https://github.com/precice/fluent-adapter).

### Adapter wrapper

Some solvers provide an API, meaning that specific functions of the solver can be executed from external programs.
A common example is a Python API, which allows us to write a Python wrapper for the solver.
This wrapper then can call both the solver and preCICE, making the wrapper an adapter.

Similarly to the plugin approach, this approach is non-intrusive to the solver code and makes it easy to distribute the adapter independently.

Examples of adapters implemented as wrappers include the [SU2 adapter](./adapter-su2-overview.html) and the [code_aster adapter](./adapter-code_aster.html).
A further example from the literature is the [TAU adapter](https://doi.org/10.23967/wccm-eccomas.2020.081).

Even when the solver does not provide an API and cannot be modified (e.g., in case of proprietary codes),
a wrapper that starts the executable of the solver with modified configuration might be a possible, last-resort solution.
An example from the literature includes the [CAMRAD-II adapter](https://doi.org/10.23967/wccm-eccomas.2020.081).

## Configuration

Besides the [preCICE configuration](./configuration-overview.html), every adapter also needs its own configuration.
This includes information such as where the preCICE configuration file is located,
which participant is this solver acting as,
and which data is read and written from which part of the mesh.
This configuration is typically sourced from a dedicated configuration file,
which is read directly by the adapter.
For example, for an FSI simulation coupling OpenFOAM and CalculiX, three configuration files are needed:

![Adapter and preCICE configuration files in a coupled simulation](images/docs/couple-your-code/adapter-software-engineering/configuration-files-precice-adapter.svg)

### Configuration prototypes

While still prototyping, it might be convenient to avoid reading a configuration file.
An easier approach might be hard-coding the configuration in the solver code.
In case you are coupling two participants using the same solver,
you could read only the participant name from the command line.

Examples of this approach are the [minimal reference implementations (solver dummies)](./couple-your-code-api.html#minimal-reference-implementations), the [1D elastic tube tutorial codes](./tutorials-elastic-tube-1d.html), and the [Nutils examples](./adapter-nutils.html).

{% tip %}
It is a good practice to keep the configuration of each participant stored in a configuration file, and the configuration files of each participant stored in separate directories.
{% endtip %}

### Configuration format

An adapter configuration file can be written in any configuration format.
Choose a format that is easy for the user of the respective solver to understand and write,
as well as easy for the adapter to parse.
Common standard formats include [YAML](https://en.wikipedia.org/wiki/YAML) and [JSON](https://en.wikipedia.org/wiki/JSON), for which we develop generation and validation tools.
Both are used by existing adapters and have good tooling support.
YAML is primarily designed for configuration files, it is more convenient to read and write, and supports comments.
JSON is primarily designed for data interchange, focuses on interoperability, and is often the primary format that some tools use.
In the future, we aim to have the adapter configuration files automatically generated by default.

### Adapter configuration schema

We provide a standard [preCICE adapter configuration schema](https://github.com/precice/preeco-orga/tree/main/adapter-config-schema) to facilitate the interoperability between adapters.
Expecting configuration in this general format has several benefits:

- allows you to generate and validate adapter configuration files using the provided preCICE tools (including the [MetaConfigurator](https://www.metaconfigurator.org/?schema=https://github.com/precice/preeco-orga/blob/main/adapter-config-schema/precice_adapter_config_schema.json))
- allows users to more easily understand the structure of a simulation case
- allows the community to use existing adapter configuration files with your adapter, with minimal, if any, modifications
- is a requirement for publishing your adapter as a [preCICE-conforming adapter](./community-guidelines-adapters.html)

## Best practices

As the preCICE ecosystem expands, we are designing standards and guidelines to make the community-contributed components interoperable.
See the contribution [guidelines for adapters](./community-guidelines-adapters.html) and for [application cases](./community-guidelines-application-cases.html).
