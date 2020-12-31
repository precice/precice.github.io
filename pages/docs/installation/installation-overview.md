---
title: Installing preCICE
permalink: installation-overview.html
keywords: configuration, basics, overview, installation
summary: "You always need to install the preCICE library and you have a few ways to do this: using a binary package, building from source manually, or building using Spack. You may additionally need to install bindings for Python, Fortran, or Matlab separately."
---

## Installing the core library

The aim of this section is to help you to install preCICE on your system.
Depending on your system and your requirements, this process may vary greatly in complexity.
To find the right method for you, follow this decision graph, or simply read on!

<img class="img-responsive center-block" src="images/docs/install-decision.svg" alt="Decision tree for installation method" style="width: 800px; margin: auto; margin-bottom:40px"/>

**Are there packages available for my system?**

Check [our packages](installation-packages.html) to see if there are binary packages available for your system.
If they are available, install them and you are done!

**Are you not allowed to install packages? Do you need to build preCICE in multiple variants and configurations?**

Maybe you want to compare how preCICE performs when built with different compilers, MPI versions or dependency versions.
If this is the case, strongly consider using the [precice spack package](installation-spack.html).
Once set up, this will simplify your work tremendously.

**Do you need to build the debug version of preCICE?**

The debug version of preCICE provides a lot of additional debug information and may be necessary for isolating bugs and understanding error messages.
If your system provides packages for all [required dependencies](installation-source-dependencies), [installing from source](installation-source-preparation) is the easiest way of installing preCICE.
If there are packages missing, things get complicated.
At this point it is wiser to invest your time in setting up Spack and [install precice using spack](installation-spack) than attempting to install everything by yourself.

**You want to hack preCICE?**

[Build preCICE from source](installation-source-preparation) is the way to go here.
In addition to building from source, [Spack](installation-spack) is useful for building and testing with various dependency version [in-place](https://spack.readthedocs.io/en/latest/command_index.html#spack-dev-build).

**Nothing of the above grabs your attention?**

If your system provides packages for all [required dependencies](installation-source-dependencies), [installing from source](installing-source-preparation) is the easiest way of installing preCICE.
If there are packages missing, things get complicated.
At this point it is wiser to invest your time in setting up Spack and [install precice using spack](installation-spack) than attempting to install everything by yourself.

## Installing language bindings

preCICE offers further language bindings.
Please refer to the following pages for installation instructions:

* [Python](installation-bindings-python)
* [Fortran](installation-bindings-fortran)
* [Matlab](installation-bindings-matlab)
