---
title: Building from source - Preparation
permalink: installation-source-preparation.html
keywords: configuration, basics, cmake, installation, building, source
---

## Which version to build

You decided to build preCICE from source, thus you most likely require a specific configuration.

preCICE builds as a fully-featured library by default, but you can turn off some features.
This is the way to go if you run into issues with an unnecessary dependency.

These features include:

* Support for MPI communication.
* Support for radial-basis function mappings based on PETSc. This requires MPI communication to be enabled.
* Support for user-defined python actions.

We recommend to leave all features enabled unless you have a good reason to disable them.

Next is the type of the build which defaults to debug:

* A **debug** build enables some logging facilities, which can give you a deep insight into preCICE.
  This is useful to debug and understand what happens during API calls.
  This build type is far slower than release builds for numerous reasons and not suitable for running large examples.
* A **release** build is an optimized build of the preCICE library, which makes it the preferred version for running large simulations.
  The version offers limited logging support: debug and trace log output is not available.
* A **release with debug info** build allows to debug the internals of preCICE only.
  Similar to the release build, it does not support neither debug nor trace logging.

{% version 2.4.0 %}
Version 2.4.0 introduces CMake options to extend release builds with debugging functionality.
If the debug build is prohibitively slow in your setup, then try to use a release build with the option [`PRECICE_RELEASE_WITH_DEBUG_LOG`](installation-source-configuration) enabled.
{% endversion %}

At this point, you should have decided on which build-type to use and which features to disable.

## The source code

Download and unpack the `Source Code` of the [latest release](https://github.com/precice/precice/releases/latest) of preCICE and unpack the content to a directory.
Then open a terminal in the resulting folder.

To download and extract a version directly from the terminal, please execute the following:

```bash
wget https://github.com/precice/precice/archive/v{{ site.precice_version }}.tar.gz
tar -xzvf v{{ site.precice_version }}.tar.gz
cd precice-{{ site.precice_version }}
```

## Installation prefix

The next step is to decide where to install preCICE to.
This directory is called the installation prefix and will later contain the folders `lib` and `include` after installation.
System-wide prefixes require root permissions and may lead to issues in the long run, however, they often do not require setting up additional variables.
User-wide prefixes are located in the home directory of the user. These prefixes do not conflict with the system libraries and do not require special permissions.
Using such prefixes is generally required when working on clusters.

Using a user-wide prefix such as `~/software/precice` is the recommended choice.

Common system-wide prefixes are:

* `/usr/local` which does not collide with package managers and is picked up by most linkers (depends on each system).
* `/opt/precice` which is often used for system-wide installation of optional software. Choosing this prefix requires setting additional variables, which is why we generally don't recommend using it.

Common user-wide prefixes are:

* `~/software/precice` which allows to install preCICE in an isolated directory. This requires setting some additional variables, but saves a lot of headache.
* `~/software` same as above but preCICE will share the prefix with other software.

## The next step

In the next step we will install all required [dependencies](installation-source-dependencies).
