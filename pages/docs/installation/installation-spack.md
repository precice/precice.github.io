---
title: Using Spack
permalink: installation-spack.html
keywords: configuration, basics, installation, building, dependencies, spack
summary: "Get and use Spack to easily build preCICE and all its dependencies from source on your Linux/macOS laptop or local supercomputer, without any root access."
---

## What is Spack?

[Spack](https://spack.io/) is a
> multi-platform package manager that builds and installs multiple versions and configurations of software. It works on Linux, macOS, and many supercomputers.
> Spack is non-destructive: installing a new version of a package does not break existing installations, so many configurations of the same package can coexist.

It also has [amazing documentation](https://spack.readthedocs.io/en/latest/)!

## Why Spack?

You can install Spack locally, without root permissions and in an environment that will not affect the rest of your system.
Meanwhile, it allows to be chained to installed variants provided by your system administrators.

It builds preCICE and all its dependencies from source and allows you to load the installation into your running environment when needed.
It also allows you to build multiple versions and variants of preCICE, which then coexist on your system.
Spack also generates module files which can be useful on clusters.

A few hints to get you started:

* `spack info precice` displays the package info, versions, variants, and dependencies.
* `spack spec precice` displays all the dependencies that will be built.
* Want to use a system-installed compiler (e.g. Intel)? Try [`spack compiler find`](https://spack.readthedocs.io/en/latest/getting_started.html#spack-compiler-find).
* Do you need a specific compiler version? You can build `gcc` and `llvm` from source and use them to compile your software.
* Want to build something special? If you ran `spack install precice@develop%gcc@7.3.0 ^openmpi@3.1.2 build_type=RelWithDebInfo`, this would install the `develop` version of preCICE, with the compiler GCC 7.3.0, OpenMPI version 3.1.2 and in `RelWithDebInfo` mode.
* You can even edit the package/recipe using `spack edit precice`.
* For more advanced usage, you can create your own package repository and use it to build your software.

Where are the packages installed?
Just inside the `spack/` directory!
Deleting this directory will remove everything.

## Setting up Spack

Get and configure [Spack](https://spack.io/) on your laptop / supercomputer (no sudo required!):

```bash
git clone -b develop https://github.com/spack/spack.git
source spack/share/spack/setup-env.sh # Maybe put this in your ~/.bashrc
```

## Installing preCICE

To install the latest release of preCICE run:

```bash
spack install precice ^boost@1.74.0
```

That's it! Spack will now automatically get and build preCICE and all of its dependencies from source. This may take a while, but you don't need to do anything else.

{% note %}
preCICE depends on Boost, which often introduces breaking changes that affect preCICE. We support newer Boost versions as soon as possible in patch releases. Here, we recommend the latest known compatible Boost version only to avoid such potential conflicts. Feel free to try the very latest by omitting this option:
{% endnote %}

<code>
spack install precice
</code>
(but keep an eye on for Boost-related compilation errors and
let us know in that case)." %}

You just installed the latest release of precice with the default configuration under `$SPACK_ROOT/opt/spack/<system-name>/<compiler-name>/`.
To see all the installed variants of precice that Spack knows, run the following:

```bash
spack find precice
```

To load the preCICE module, run:

```bash
spack load precice
```

You can now use preCICE normally and build any adapter following their respective instructions.

If you want to uninstall preCICE, `spack uninstall precice` or delete the complete `spack/` directory to remove everything.

🎉

## Installing the python bindings

To install the [python bindings](installation-bindings-python.html) using Spack, run the following:

```bash
spack install py-pyprecice@2.2.0.2
```

Then to use the python bindings:

```bash
spack load py-pyprecice@2.2.0.2
```

## Advanced tips

### Use dependencies from your system

You can instruct Spack to recognize specific dependencies that are already installed on your system, by modifying your preferences in `~/.spack/packages.yaml`.

{% tip %}
If this is the first time you set preferences, the file might not exist and you have to create it yourself
{% endtip %}

For example, to specify a locally installed MPI version, you could write:

```yaml
packages:
    openmpi:
        paths:
            openmpi@3.1.2: /opt/local
        buildable: False
```

Here we specify that a local install of OpenMPI version 3.1.2 exists in `/opt/local`. The `buildable` flag specifies that Spack is allowed to look for and build newer versions of the package if they exist instead of using the locally available one. Here we set it to `false` to prevent Spack from trying to build a newer version and add unnecessary installation time.

### Install preCICE without non-essential dependency extensions

You might want to opt out some default install options for some dependencies of preCICE as they can cause conflicts. Specifically, extensions of Eigen and Boost can cause errors.

To only install the essential boost libraries that are used by preCICE, you can strip away some default options of the Eigen and Boost packages:

```bash
spack install precice ^boost@1.65.1  -atomic -chrono -date_time -exception -graph -iostreams -locale -math -random -regex -serialization -signals -timer -wave ^eigen@3.3.1 -fftw -metis -mpfr -scotch -suitesparse ^openmpi@3.1.2
```

Note that, here, we install preCICE specifically with Boost 1.65.1 and Eigen 3.3.1. We also demand OpenMPI version 3.1.2 as this allows Spack to use the local OpenMPI install we specified in the example `packages.yaml` above. This is not necessary: feel free to use any other OpenMPI version or just fully omit the `^openmpi` argument to let Spack decide.

## I need preCICE v1.x with Python enabled, how can I get it from Spack?

Spack has [removed support for Python 2](https://github.com/spack/spack/pull/33898). You can still, however, use Spack 0.19.

## I need more help with Spack

Look first for topics with the [`spack` tag on our forum on Discourse](https://precice.discourse.group/tag/spack). If you don't find anything, we will be happy to help you there!
