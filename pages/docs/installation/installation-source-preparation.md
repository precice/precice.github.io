---
title: Preparation
permalink: installation-source-preparation.html
keywords: configuration, basics, cmake, installation, building, source
summary: "Usually the first paragraph of the page. If not create one or simple leave the field blank"
---

## Which Version to Build

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
  Similar to the release build, it does support debug nor trace logging.

At this point, you should have decided on which build-type to use and which features to disable.

## The Source Code

Download and unpack the `Source Code` of the [latest release](https://github.com/precice/precice/releases/latest) of preCICE and unpack the content to a directory.
Then open a terminal in the resulting folder.

To download and extract a version directly from the terminal, please execute the following(replace `x.y.z` with the actual version):
```sh
wget https://github.com/precice/precice/archive/vx.y.z.tar.gz
tar -xzvf vx.y.z.tar.gz
cd precice-x.y.z
```

## Installation Prefix

The next step is to decide where to install preCICE to.
This directory is called the installation prefix and will later contain the folders `lib` and `include` after installation.
System-wide prefixes require root permissions and may lead to issues in the long run, however, they often do not require setting up additional variables.
User-wide prefixes are located in the home directory of the user. These prefixes do not conflict with the system libraries and do not require special permissions.
Using such prefixes is generally required when working on clusters.

Using a user-wide prefix such as `~/software/precice` is the recommended choice.

Common system-wide prefixes are:
* `/usr/local` which does not collide with package managers and is picked up by most linker.
* `/opt/precice` which is often used for system-wide installation of optional software. Choosing this prefix requires setting additional variables, which is why we generally don't recommend using it.

Common user-wide prefixes are:
* `~/software/precice` which allows to install preCICE in an isolated directory. This requires setting some additional variables, but saves a lot of headache.
* `~/software` same as above but preCICE will share the prefix with other software.

In case you choose a user-wise prefix you need to extend some additional environment variables in your `~/.bashrc`:

Replace `<prefix>` with your selected prefix
```sh
PRECICE_PREFIX=~/software/prefix # set this to your selected prefix
export LD_LIBRARY_PATH=$PRECICE_PREFIX/lib:$LD_LIBRARY_PATH
export CPATH=$PRECICE_PREFIX/include:$CPATH
# Enable detection with pkg-config and CMake
export PKG_CONFIG_PATH=$PRECICE_PREFIX/lib/pkgconfig:$PKG_CONFIG_PATH
export CMAKE_PREFIX_PATH=$PRECICE_PREFIX:$CMAKE_PREFIX_PATH
```

After adding these variables, please logout and login again.

{% include note.html content="On debian-based distributions, you can also build preCICE as a debian package and install it using the package manager. [Read more](installation-source-advanced#debian-packages)" %}

## The next step

In the next step we will install all required [dependencies](installation-source-dependencies).
