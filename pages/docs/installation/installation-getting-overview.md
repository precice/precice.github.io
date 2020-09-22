---
title: Installing preCICE
permalink: installation-getting-overview.html
keywords: configuration, basics, overview, installation
---

The aim of this section is to help you to install preCICE on your system.
Depending on your system and your requirements, this process may vary greatly in complexity.
To find the right method for you, simply read on!

**Are there packages available for your system?**

Check [our packages](installation-getting-packages.html) to see if there are binary packages available for your system.
If they are available, install them and you are done!

**Do you need to build preCICE in multiple variants and configurations?**

Maybe you want to compare how preCICE performs when built with different compilers, MPI versions or dependency versions.
If this is the case, strongly consider using the [precice spack package](installation-getting-spack.html).
Once set up, this will simplify your work temendously.

**Do you need to build the debug version of preCICE?**

The debug version of preCICE provides a lot of additional debug information and may be necessary for isolating bugs and understanding error messages.
If your system provides packages for all [required dependencies](installing-getting-dependencies.html), [installing from source](installing-getting-source.html) is the easiest way of installing preCICE.
If there are packages missing, things get complicated.
At this point it is wiser to invest your time in setting up spack and [install precice using spack](installation-getting-spack.html) than attempting to install everything by yourself.

**You want to hack preCICE?**

[Build preCICE from source](installation-getting-source.html) is the way to go here.
In addition to building from source, [Spack](installation-getting-spack.html) is useful for building and testing with various dependency version [in-place](https://spack.readthedocs.io/en/latest/command_index.html#spack-dev-build).

**Nothing of the above grabs your attention?**

If your system provides packages for all [required dependencies](installing-getting-dependencies.html), [installing from source](installing-getting-source.html) is the easiest way of installing preCICE.
If there are packages missing, things get complicated.
At this point it is wiser to invest your time in setting up spack and [install precice using spack](installation-getting-spack.html) than attempting to install everything by yourself.
