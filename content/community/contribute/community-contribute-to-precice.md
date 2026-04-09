---
title: Contribute to preCICE
permalink: community-contribute-to-precice.html
keywords: contribute, develop
summary:
toc: true
---

Do you enjoy improving whatever you can? Did you find a bug in preCICE or one of the adapters? Have you developed a new simulation that could serve as a tutorial? We can use your help!

<p style="text-align: center">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/oPorUPZA9XE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

## Talk about your work

We are very interested to know how you use preCICE, and we are regularly looking for contributions to the [preCICE Workshop](precice-workshop.html), as well as to invited sessions in broader conferences. We are also interested to know if you are talking about preCICE in other conferences: Don't forget to mention preCICE by name in your abstract, so that we can find your talk when we are also attending the respective conference.

If you are contributing a talk to a workshop or session we organize, following these guidelines will help us a lot to follow your talk and understand how we can help you:

- Address an interdisciplinary audience: explain the general application first - probably nobody else in the room is working on something similar
- Show a figure clarifying the domains coupled and the data exchanged (as you would explain it to a friend)
- Show the [configuration visualization](tooling-config-visualization.html)
- Mention the preCICE and solver versions, as well as platform information (HPC cluster / laptop, Ubuntu/other)
- Clarify if you modified any adapters/preCICE itself, and where the modifications might be available. Mention any challenges you had to work around.
- Aim for few slow-paced slides, use the opportunity for backup slides

And hey! You have already worked with preCICE, so you can definitely contribute something in the following ways, if you have the time! 🤗

## Contributing documentation

You (yes, you) have already found something that can be improved in this website:
maybe an unclear part, maybe a broken link, maybe even a small typo.
Click the `Edit me` button at the top of the respective page to see
the source file of the page. You can then click `Edit this file`
and submit your changes as a [Pull Request on GitHub](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests).
Don't worry: you cannot break anything! We will review your suggestions
and merge them as soon as possible.

These pages are written in [Markdown](https://guides.github.com/features/mastering-markdown/) (a very easy language)
and we also have a [cheatsheet](docs-meta-cheatsheet.html) specifically for this website.

## Reporting issues

After discussing a problem in one of our [community channels](community-channels.html), we may conclude that this is a bug
we should fix, or a nice feature we could add. In that case, we will ask you to [create a GitHub issue](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/creating-an-issue).

We keep each issue in the repository that contains the respective code, mainly:

- [`precice/precice`](https://github.com/precice/precice/issues)
- [`precice/tutorials`](https://github.com/precice/tutorials/issues)
- adapters

Please follow the issue template of each repository and provide as much information as possible, in particular the
affected versions, error logs, and configuration files involved. However, it would also help if you select the files you upload
and avoid sending complete simulation cases via cloud services.

In any case, you can use [Markdown](https://guides.github.com/features/mastering-markdown/) to format your message
and in particular your code/log snippets.

## Testing upcoming versions

When we try to fix an issue or to offer new functionality, we contribute and discuss in Pull Requests.
You can help us test the new features by [trying a pull request](https://precice.discourse.group/t/i-was-asked-to-try-a-pull-request-how-can-i-do-that/38).

You can also use preCICE from the [develop branch](https://github.com/precice/precice/tree/develop/) and report anything suspicious before we release it.

## Contributing tutorials

After working on your new simulation case, you may want to share it with the community to use as a starting point,
or to demonstrate a new feature. We welcome contributions to our [tutorials repository](https://github.com/precice/tutorials/)
and we will discuss it with you over a few [review](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/reviewing-proposed-changes-in-a-pull-request) iterations.
If you roughly follow the guidelines in this section, your contribution could be merged very quickly. Since we aim to maintain and update all tutorials, it is important for us that every tutorial merged follows the same structure and conventions.

{% tip %}
Get in touch with us early and we will be very happy to help you with every step! Open a first draft Pull Request on GitHub and we can together bring it into a fitting shape.
{% endtip %}

First time working with Git? Watch a [lecture on Git](https://missing.csail.mit.edu/2020/version-control/).

### What to contribute and where?

Your case may already fit into one of the existing tutorials. If not, feel free to start a new one! A new case typically needs a new preCICE configuration file.

Contribute only the files necessary for running the tutorial (no results or user-specific files). You can check this by looking at the "Files changed" tab on GitHub.

If there is already a `precice-config.xml` for the case you are simulating, please use the same one (or contribute changes to that). We want that all solvers that can simulate a given case use the same preCICE configuration file.

### Structure of a tutorial

Our tutorials generally follow a file structure similar to this:

```bash
- <tutorial>/                     # e.g. perpendicular-flap/
  - README.md                     # description of the case
  - precice.config.xml            # a works-with-all preCICE configuration file
  - clean-tutorial.sh             # a symbolic link (see ../tools/)
  - <participant1-solver1>/       # e.g. fluid-openfoam/
    - run.sh                      # a short script to run the solver1 case
    - clean.sh                    # a short script to clean the solver1 case
    - <the solver1 files>
  - <participant2-solver2>/       # e.g. solid-dealii/
    - run.sh
    - clean.sh
    - <the solver2 files>
```

Other files you may encounter are the following:

```bash
- <tutorial>/                     
  - <visualization scripts>       # gnuplot or simple Python scripts
  - images/                       # any images used by the documentation
  - solver-<code>/                # any configurable, tutorial-specific code, e.g., solver-fenics
  - reference-results/            # results from different case combinations, used for regression tests
    - <case_combination>.tar.gz   # Git LFS objects, generated from GitHub Actions
```

### The run.sh scripts

Each run script must be executable for a default case without any arguments. Optional arguments can include `-parallel`, or anything that triggers a special case. Such a uniform interface not only makes the workflow more predictable, but it also facilitates automation, avoiding special cases.

These scripts should generally be very short and not include too much automation that would obfuscate the main steps. Remember: The tutorials serve as examples to copy from and extend, most often by replacing one participant with another.

There are several helper scripts and functions in `tools/`; using these will make your scripts simpler.

### Tutorial-specific codes

In case a tutorial-specific code example is needed for this tutorial, and this can be reused among participants, add that in `solver-<code>/`. See, for example, the [partitioned heat conduction tutorial](https://github.com/precice/tutorials/tree/develop/partitioned-heat-conduction).

You don't need to have a participant-specific configuration file in a participant case (even though that would be nice). Instead, you can hard-code the configuration of each participant in the code and select the respective participant via a command-line argument. A case-specific `run.sh` that provides the participant as command-line argument is enough.

If you write any output, it would be very helpful to keep it tidy (e.g., in a dedicated `output/` directory).

### The README file

In the `README.md` file, following the general structure of the existing tutorials, document:

- the scenario setup,
- the dependencies,
- how to run the tutorial,
- how to visualize the results, and
- an example picture or video of the results.
- Don't forget to adapt the `permalink:` field in the beginning of the file.

{% note %}
If you add a complete new tutorial case, the case also needs to be added to the [tutorials sidebar](https://github.com/precice/precice.github.io/blob/master/_data/sidebars/tutorial_sidebar.yml) on the [tutorials website section](tutorials.html). Please open a pull request to the [website repository](https://github.com/precice/precice.github.io). Please note that we will only merge this one with the next release of the tutorials, such that the list of tutorial cases on the website does not deviate from the list of released tutorial cases.
{% endnote  %}

### Naming conventions

- Directories use `-` to separate words, not `_`, and only use lowercase.
  - We use `_` for separating case combinations, e.g., in the reference results: `fluid-openfoam_solid-calculix.tar.gz`.
- Data and mesh names should start with uppercase and use `-` as separator.
- Data names are in singular, e.g. `Stress`, `Heat-Flux`.
- Mesh names start with the participant/domain name, e.g. `Fluid-Mesh`.
- Mesh names of participants with multiple interfaces contain the interface in the mesh name, e.g. `Fluid-Upstream-Mesh`. For meshes on which it is important to distinguish between face centers and face nodes, the modifier comes at the end, e.g. `Fluid-Upstream-Mesh-Centers`.
- Watchpoint names should be describing the point, not be a generic name.
- Images need to be named as `tutorials-<tutorial>-<image>.png` to be correctly displayed on the website. You can then refer to them as `![title](images/tutorials-<tutorial>-<image>.png)`. Subdirectories are not allowed.

### Open a pull request

Start a draft [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) early on, so that people know that someone is working on this. In the description, gradually include everything we may need to review and run your tutorial:

- Why is this case a good fit for our tutorials? What is different from other tutorials?
- How did you create the setup? Do we need any additional tools?
- Which versions of preCICE, adapters, and solvers have you tried?
- If it is a solver we don't already support, how can we get it?
- How should the results look like? A screenshot would be very helpful.

### Optional: Help us with some checks

There are a few technical things to take care of before we can merge your contribution. If you find any of these steps to be complicated, we will be happy to directly edit your branch to apply them.

Clean-up the files: remove commented-out code, remove scripts that are not needed, add case-specific files in a `.gitignore`.

Install `pre-commit` and enable it in the repositories you plan to contribute to with `pre-commit install`. It automatically ensures consistent formatting and best practices before you even commit changes. You can also run these checks yourself on all files using `pre-commit run -va`

We automate many checks with [GitHub actions](https://github.com/features/actions), which you will see running at the bottom of each pull request. Using `pre-commit` yourself saves you some unnecessary trouble.

### Adding a new tutorial to the website

The content of the tutorials is sourced from the develop branch of the tutorials repository, which is specified in the `.gitmodules` file of the website repository. Hence, in general, anything merged to develop in the tutorials appears on the website. Consider putting some `note` [alert box](docs-meta-cheatsheet.html#alerts) on top of your new tutorial page to describe any unreleased requirements.

*New* tutorials will not directly appear on the website, but they need some additional steps. After merging to the tutorials develop, open a pull request with the following changes in the [website repository](https://github.com/precice/precice.github.io) ([example](https://github.com/precice/precice.github.io/pull/275)):

1. Trigger the [update submodules workflow](https://github.com/precice/precice.github.io/actions/workflows/update-submodules.yml) and, after it completes, create a new branch and pull request (this may also happen automatically, or someone from the preCICE team may have to do it for you).
2. Edit the [`_config.yml` file](https://github.com/precice/precice.github.io/blob/master/_config.yml) to append the directory name of your tutorial under `subprojects:`.
3. Edit the [tutorials sidebar](https://github.com/precice/precice.github.io/blob/master/_data/sidebars/tutorial_sidebar.yml) to add your tutorial permalink (defined in the heading of the `README.md` you created) to a fitting place, next to a similar tutorial.
4. Edit the [tutorials landing page](https://github.com/precice/precice.github.io/blob/master/content/tutorials/tutorials.md) to add your tutorial to the overview.

After your PR gets reviewed, approved, and merged, the website will be built automatically, and your tutorial will appear online in a couple of minutes.

## Sharing a simulation case

Did you create a nice simulation case that could be useful for more people, but is not simple enough to serve as a tutorial, or you don't want to invest any more time shaping it into a tutorial? You can alternatively share it in the [community projects](https://precice.discourse.group/c/community-projects/11) category of our forum.

## Contributing code

You can pick up issues that you would like to work on from any repository you like. You may be particularly interested in the [good first issues](https://github.com/precice/precice/labels/good%20first%20issue) and we definitely need help in the [help wanted issues](https://github.com/precice/precice/labels/help%20wanted). The same labels exist in every repository.

Look for [contributing guidelines](https://github.com/precice/precice/blob/develop/docs/CONTRIBUTING.md) in each repository. The [developer documentation](dev-docs-overview.html) will also be useful.

{% tip %}
Read on our [Roadmap](fundamentals-roadmap.html) what is already in our to-do list before starting to write large parts of code.
{% endtip %}

{% tip %}
There are [guidelines for adapters](community-guidelines-adapters.html) and [guidelines for application cases](community-guidelines-application-cases.html).
{% endtip %}

### Repository anatomy

Before contributing code to the core [`precice/precice`](https://github.com/precice/precice) repository, it is highly beneficial to familiarize yourself with its structure. Understanding how the codebase is organized will help you navigate the source efficiently, identify where changes should be made, and ensure that contributions follow the established conventions. The following provides a thorough overview of every major directory, its subdirectories, and the key root-level files present in the repository.

#### Top-level directory overview

At the root of the repository, the following directories and files form the backbone of the project:

```text
precice/
├── src/                  # Core C++ library source code
├── tests/                # Integration and system-level tests
├── docs/                 # Developer documentation and guidelines
├── cmake/                # CMake build system modules and helpers
├── tools/                # Development and maintenance utilities
├── benchmarks/           # Performance benchmark programs
├── examples/             # Solver dummy examples in C, C++, and Fortran
├── extras/               # Supplementary tools and language bindings
├── thirdparty/           # Bundled third-party dependencies
├── .github/              # GitHub-specific CI workflows and templates
├── CMakeLists.txt        # Primary CMake build configuration
├── CMakePresets.json      # CMake build presets for common configurations
├── CHANGELOG.md          # Version-by-version record of changes
├── CODE_OF_CONDUCT.md    # Community code of conduct
├── LICENSE               # Project license (LGPLv3)
├── Doxyfile              # Doxygen API documentation configuration
├── .clang-format         # C++ code formatting rules
├── .clang-tidy           # C++ static analysis configuration
├── .pre-commit-config.yaml  # Pre-commit hook definitions
├── .codespellrc          # Spell checking configuration
├── .gitignore            # Git ignore patterns
├── .gitattributes        # Git attributes for line endings and diffs
├── .mailmap              # Author name and email normalization
└── .python-version       # Python version specification for tooling
```

#### The `src/` directory -- core library source code

The `src/` directory is the heart of the preCICE library. It contains the complete C++ implementation, organized into modular subdirectories. Each subdirectory encapsulates a distinct area of functionality within the coupling library.

- **`src/precice/`** -- This is the public API module. It contains the `Participant` class (formerly `SolverInterface`) and the C and Fortran bindings. Any solver adapter interacts with preCICE exclusively through the interfaces defined here. When implementing new API functions or modifying the public interface, changes are made in this directory.

- **`src/acceleration/`** -- Implements the acceleration (convergence acceleration) schemes used in implicit coupling. This includes implementations of Aitken under-relaxation, the IQN-ILS (Interface Quasi-Newton Inverse Least Squares) method, the IQN-IMVJ (Multi-Vector) method, and related data filtering techniques. These methods are critical for achieving stable and fast convergence in strongly-coupled simulations.

- **`src/action/`** -- Contains the action framework, which allows users to define operations to be executed at specific points during the coupling workflow. Actions can include computing derived quantities, scaling data, or performing summation operations on coupling data between time steps or iterations.

- **`src/com/`** -- The communication module handles all inter-process and inter-participant data exchange. It provides abstractions over different communication backends, including MPI (both point-to-point and ports-based) and TCP/IP sockets. This module defines how participants discover each other and exchange coupling data in both intra- and inter-machine scenarios.

- **`src/cplscheme/`** -- Implements the coupling scheme logic, which governs the overall orchestration of the coupled simulation. This includes explicit (staggered) and implicit (iterative) coupling schemes, as well as multi-coupling schemes involving more than two participants. The coupling scheme decides when to advance, when to iterate, and when convergence has been achieved.

- **`src/drivers/`** -- Contains the entry points and driver programs for the preCICE library. This includes the main driver logic and any standalone executables shipped with the library.

- **`src/io/`** -- Handles all input/output operations, including reading and writing of mesh data, export of results in formats such as VTK and VTU, and configuration parsing for data persistence.

- **`src/logging/`** -- Provides the internal logging framework used throughout the library. It wraps around the Boost.Log library and defines log levels, formatting, and output targets. Proper use of this module is important for producing consistent and meaningful log output.

- **`src/m2n/`** -- The mesh-to-mesh networking module manages the communication layer specifically between coupling participants. While `src/com/` provides the raw communication primitives, `src/m2n/` builds on top of it to handle the specific patterns of mesh-based data exchange, point-to-point connections, and gather-scatter operations needed for coupled simulations.

- **`src/mapping/`** -- Implements the data mapping algorithms that project coupling data from one mesh to another. This includes nearest-neighbor mapping, nearest-projection mapping, and radial basis function (RBF) interpolation with various kernel functions. Mapping is one of the core functionalities of preCICE and is often the most computationally intensive part of the coupling.

- **`src/math/`** -- Provides common mathematical utilities, including linear algebra operations, geometric computations, Barycentric coordinate calculations, and other numerical helper functions used across other modules.

- **`src/mesh/`** -- Defines the mesh data structures used throughout the library. This includes the representation of vertices, edges, triangles, tetrahedra, and the associated data containers. It also handles mesh indexing through spatial trees for efficient nearest-neighbor and projection queries.

- **`src/partition/`** -- Contains the mesh partitioning logic that distributes mesh data among parallel processes. This module computes which portions of a mesh a given process is responsible for and handles the repartitioning and filtering required when coupling meshes of different participants in a parallel setting.

- **`src/profiling/`** -- Implements the internal profiling and performance instrumentation framework. It produces structured profiling events that can be analyzed to identify performance bottlenecks in the coupling workflow.

- **`src/query/`** -- Provides spatial query functionality, enabling efficient geometric queries such as finding the nearest vertex, the nearest projection onto a surface element, or determining containment within mesh boundaries.

- **`src/testing/`** -- Contains the testing infrastructure used by the preCICE unit tests. This includes test fixtures, helper functions, and MPI-aware test contexts that simplify writing and running parallel tests.

- **`src/time/`** -- Manages time interpolation and time stepping control within the coupling. It implements waveform relaxation approaches and provides functions for interpolating coupling data between different time grids across participants.

- **`src/utils/`** -- A collection of general utility functions and classes, including string handling, assertion macros, multi-lock mechanisms, algorithm helpers, and common type definitions used throughout the codebase.

- **`src/xml/`** -- Implements the XML configuration parser that reads and validates the `precice-config.xml` file. This module builds an internal representation of the preCICE configuration, ensures semantic correctness, and populates the runtime objects accordingly.

- **`src/sources.cmake`** -- A CMake script that enumerates all source files in the `src/` directory for inclusion in the build.

- **`src/tests.cmake`** -- A CMake script that enumerates and configures the unit test sources located alongside the source code modules.

#### The `tests/` directory -- integration and system tests

The `tests/` directory contains integration-level and system-level tests that exercise preCICE across multiple participants and processes. These are distinct from the unit tests co-located in `src/`. The integration tests are organized by test scenario:

- **`tests/serial/`** -- Tests that run coupling scenarios in serial (single-process per participant).
- **`tests/parallel/`** -- Tests that run coupling scenarios with multiple MPI ranks per participant, verifying correct behavior under parallelism.
- **`tests/fundamental/`** -- Basic sanity tests that verify core functionality of the library in isolation.
- **`tests/quasi-newton/`** -- Tests specifically targeting quasi-Newton acceleration schemes and their convergence properties.
- **`tests/geometric-multiscale/`** -- Tests for geometric multiscale coupling features, such as coupling between 1D and 3D domains.
- **`tests/remeshing/`** -- Tests for scenarios involving dynamic remeshing during a coupled simulation.
- **`tests/exporter/`** -- Tests for the VTK/VTU export functionality.
- **`tests/config/`** -- XML configuration files used by the various integration tests.
- **`tests/tests.cmake`** -- The CMake file that registers and configures all the integration tests with CTest.

#### The `docs/` directory -- documentation

The `docs/` directory contains in-repository documentation intended primarily for developers:

- **`docs/README.md`** -- An overview of the developer-facing documentation structure and how to navigate it.
- **`docs/CONTRIBUTING.md`** -- Guidelines for contributing to the preCICE core library, including workflow conventions, branching strategies, and code style expectations.
- **`docs/ISSUE_TEMPLATE.md`** -- A template for filing issue reports.
- **`docs/changelog/`** -- Change fragments used for assembling the changelog of upcoming releases.
- **`docs/documents/`** -- Structural diagrams, design documents, and technical notes describing the internal architecture of the library.
- **`docs/fragments/`** -- Reusable documentation snippets used in assembling release notes and changelogs.
- **`docs/man/`** -- Man page sources for any command-line tools distributed with preCICE.

#### The `cmake/` directory -- build system

The `cmake/` directory contains all the CMake modules, helper scripts, and configuration templates required to build, test, package, and install the preCICE library:

- **`cmake/modules/`** -- Custom CMake find-modules for locating third-party dependencies (e.g., PETSc, Eigen, libxml2) that are not natively supported by CMake's built-in module set.
- **`cmake/CPackConfig.cmake`** -- Configuration for CPack, which generates distributable packages (DEB, RPM, etc.) for the library.
- **`cmake/CTestConfig.cmake`** -- Configuration for CTest, defining how tests are discovered, categorized, and executed (including parallel test configurations).
- **`cmake/CheckSTL.cmake`** -- Compiler feature checks to verify support for standard library features required by preCICE.
- **`cmake/DetectGitRevision.cmake`** -- Automatically detects the current Git commit hash and embeds version information into the built library.
- **`cmake/GenerateVersionInformation.cmake`** -- Generates structured version metadata for runtime reporting and compatibility checks.
- **`cmake/Validation.cmake`** -- Validates the build configuration and flags potential problems or unsupported combinations.
- **`cmake/preciceConfig.cmake`** -- The CMake package configuration file installed alongside the library, enabling downstream projects to use `find_package(precice)`.
- **`cmake/XSDKMacros.cmake`** & **`cmake/XSDKOptions.cmake`** -- Macros and options for compliance with the xSDK (Extreme-scale Scientific Software Development Kit) community policies.
- **`cmake/discover_tests.py`** -- A Python helper script for automated test discovery in the CTest framework.
- **`cmake/runsolverdummies.cmake`** & **`cmake/runsolverdummies.sh`** -- Scripts for running the solver dummy examples as part of the test suite to verify a correct build.
- **`cmake/PrintHelper.cmake`** -- Utility for formatted console output during the CMake configuration process.
- **`cmake/TestInstall.cmake`** & **`cmake/Uninstall.cmake`** -- Scripts for verifying correct installation and for uninstalling the library from the system.

#### The `tools/` directory -- development utilities

The `tools/` directory provides scripts and utilities that assist developers in day-to-day development, code quality, and release workflows:

- **`tools/building/`** -- Helper scripts for automating common build tasks such as configuring CMake with specific options, running parallel builds, and managing build directories.
- **`tools/linting/`** -- Scripts for running code linters and formatters beyond what pre-commit handles, including specialized checks for naming conventions and header guards.
- **`tools/profiling/`** -- Utilities for analyzing preCICE profiling output, generating performance reports, and converting profiling events into visualizations.
- **`tools/releasing/`** -- Automation scripts for the release process, including version bumping, changelog generation, and creating release tarballs.
- **`tools/testing/`** -- Additional testing utilities and scripts for running specialized test configurations, including parallel test orchestration.

#### The `benchmarks/` directory -- performance benchmarks

The `benchmarks/` directory contains C++ programs for measuring the performance of critical code paths within preCICE. These are built using the Google Benchmark framework and include:

- **`benchmarks/bb.cpp`** -- Benchmarks for bounding box computations.
- **`benchmarks/mesh-index.cpp`** -- Benchmarks for mesh spatial indexing operations (R-tree queries).
- **`benchmarks/mesh-tagging.cpp`** -- Benchmarks for mesh tagging routines.
- **`benchmarks/rbf-assembly-kernels.cpp`** -- Benchmarks for radial basis function (RBF) matrix assembly kernels, a performance-critical component of the mapping module.
- **`benchmarks/write-data.cpp`** -- Benchmarks for data writing operations.
- **`benchmarks/write-data.xml`** -- A sample preCICE configuration file used by the write-data benchmark.
- **`benchmarks/helper.hpp`** -- Shared helper utilities for the benchmark programs.
- **`benchmarks/main.cpp`** -- The benchmark main entry point.
- **`benchmarks/sources.cmake`** -- CMake script for registering the benchmark sources.

#### The `examples/` directory -- solver dummy examples

The `examples/` directory contains minimal, self-contained solver dummy programs that demonstrate how to use the preCICE API. These are primarily used for testing the build and installation of the library:

- **`examples/solverdummies/c/`** -- A solver dummy implementation in C, exercising the C bindings.
- **`examples/solverdummies/cpp/`** -- A solver dummy implementation in C++, using the native C++ `Participant` API.
- **`examples/solverdummies/fortran/`** -- A solver dummy implementation in Fortran, exercising the Fortran bindings.
- **`examples/solverdummies/precice-config.xml`** -- A shared preCICE configuration file for running the solver dummies together.
- **`examples/solverdummies/README.md`** -- Documentation on how to compile and run the solver dummies.

#### The `extras/` directory -- supplementary tools

The `extras/` directory contains additional tools and supplementary components that are not part of the core library but are shipped alongside it:

- **`extras/bindings/`** -- Contains additional language binding related files, including Fortran module definitions used by the Fortran API.
- **`extras/livegraph/`** -- A live graphing utility for visualizing coupling convergence data in real time during a simulation.
- **`extras/mpiportstester/`** -- A diagnostic tool for testing MPI port-based communication, which is useful for debugging inter-process connectivity on various HPC systems.
- **`extras/rbfShape/`** -- Tools for computing and visualizing radial basis function shape parameters, aiding in the selection of appropriate RBF kernels for data mapping.

#### The `thirdparty/` directory -- bundled dependencies

The `thirdparty/` directory contains external libraries that are bundled directly with the preCICE repository to reduce external dependency requirements:

- **`thirdparty/fmt/`** -- A vendored copy of the [{fmt}](https://fmt.dev/) formatting library, providing fast and safe string formatting as an alternative to `printf` and `iostream`.
- **`thirdparty/libbacktrace/`** -- A vendored copy of [libbacktrace](https://github.com/ianlancetaylor/libbacktrace), used for generating readable stack traces in error reports and assertions.

#### The `.github/` directory -- CI and project management

The `.github/` directory contains all GitHub-specific configurations that drive continuous integration, issue management, and pull request workflows:

- **`.github/workflows/`** -- Contains GitHub Actions workflow definitions. These automate the build, test, and quality assurance pipeline on every push and pull request, covering multiple compilers, MPI implementations, and operating system configurations.
- **`.github/ISSUE_TEMPLATE/`** -- Issue templates that guide users and contributors to provide structured information when reporting bugs or requesting features.
- **`.github/pull_request_template.md`** -- A pull request template that provides a checklist and description format for all incoming contributions.
- **`.github/dependabot.yml`** -- Configuration for Dependabot, which automatically opens pull requests when upstream GitHub Actions dependencies have new versions available.

#### Root-level files

The following root-level files serve important purposes in the project:

- **`CMakeLists.txt`** -- The main entry point for the CMake build system. It defines the project, locates dependencies, configures compiler flags, assembles the library target from all source files, and sets up installation rules. This is the first file the build system reads when a developer runs `cmake`.
- **`CMakePresets.json`** -- Provides predefined CMake configuration presets (e.g., debug, release, or CI-specific builds) that simplify the build invocation and ensure consistency across environments.
- **`CHANGELOG.md`** -- A comprehensive, version-by-version record of all notable changes, including new features, bug fixes, deprecated functionality, and breaking changes. Contributors should reference this file to understand the historical evolution of the library.
- **`CODE_OF_CONDUCT.md`** -- Defines the expectations for interaction within the preCICE community and the consequences for unacceptable behavior. All contributors are expected to adhere to this code.
- **`LICENSE`** -- The full text of the GNU Lesser General Public License version 3 (LGPLv3) under which the preCICE library is distributed.
- **`Doxyfile`** -- The configuration file for the Doxygen documentation generator. Running Doxygen with this file produces a comprehensive API reference from the annotated source code comments.
- **`.clang-format`** -- Defines the C++ code formatting rules enforced throughout the project, ensuring a consistent style across all contributions. Contributors should run `clang-format` or use the pre-commit hooks to format their code before submitting.
- **`.clang-tidy`** -- Configures the Clang-Tidy static analysis tool, specifying which checks are enabled and what coding practices are enforced at the compiler level.
- **`.pre-commit-config.yaml`** -- Defines the set of pre-commit hooks that run automatically before each commit. These hooks enforce formatting, check for trailing whitespace, validate YAML files, and run other lightweight quality checks.
- **`.codespellrc`** -- Configuration for the codespell tool, which detects common spelling errors in the source code and documentation.
- **`.gitignore`** -- Specifies files and directories that Git should ignore, such as build artifacts, editor swap files, and local configuration directories.
- **`.gitattributes`** -- Defines Git attributes for the repository, controlling line ending normalization and diff behavior for specific file types.
- **`.mailmap`** -- Maps different author name and email address variations to a canonical form, ensuring consistent attribution in the Git history.
- **`.python-version`** -- Specifies the Python version used by the project's tooling, ensuring consistency when running Python-based development scripts.

#### Branching model

The preCICE repository follows a branching model with two main branches:

- **`develop`** -- The primary development branch. All new features, bug fixes, and improvements are merged into this branch. Contributors should always branch off from `develop` and submit pull requests targeting `develop`.
- **`main`** -- The stable release branch. It is updated only during official releases and always points to the latest released version of the library.

#### The broader preCICE ecosystem

The core library at `precice/precice` is part of a larger ecosystem of repositories maintained under the [`precice` GitHub organization](https://github.com/precice). When contributing, it is helpful to be aware of these related repositories:

- **[`precice/tutorials`](https://github.com/precice/tutorials)** -- Ready-to-run tutorial cases demonstrating preCICE usage with various solvers.
- **[`precice/precice.github.io`](https://github.com/precice/precice.github.io)** -- The source for the preCICE website and user-facing documentation.
- **Adapter repositories** -- Official adapters for simulation software such as [`precice/openfoam-adapter`](https://github.com/precice/openfoam-adapter), [`precice/calculix-adapter`](https://github.com/precice/calculix-adapter), [`precice/fenics-adapter`](https://github.com/precice/fenics-adapter), and others. Each adapter has its own repository, contributing guidelines, and release cycle.
- **Language binding repositories** -- Bindings for additional programming languages, including [`precice/python-bindings`](https://github.com/precice/python-bindings), [`precice/julia-bindings`](https://github.com/precice/julia-bindings), [`precice/matlab-bindings`](https://github.com/precice/matlab-bindings), and [`precice/rust-bindings`](https://github.com/precice/rust-bindings).


## Helping other users

We would really appreciate it if you followed our [community channels](community-channels.html) and joined us in answering questions.
It is often much easier than you think!

If you want to help there, then you may also want bookmark and visit the forum and/or chatroom regularly. You can also try to answer some of the [still unanswered forum questions](https://precice.discourse.group/search?expanded=true&q=status%3Aunsolved%20order%3Alatest). There is a special place in our hearts for users that help each other! 🤗
