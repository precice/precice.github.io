---
title: Building from source - Installation
permalink: installation-source-installation.html
keywords: configuration, basics, cmake, installation, building, source
toc: false
---

It is time to install preCICE into the installation prefix chosen during [preparation](installation-source-preparation#installation-prefix) and used during the [configuration with CMake](installation-source-configuration).

To install preCICE run `make install`.

If the chosen prefix points to a system directory, you may have to run `sudo make install`.

## Testing your installation

To test your installation please run `make test_install`.
This will attempt to build our C++ example program against the **installed version** of the library.
This is commonly known as _the smoke test_.

## Make preCICE installation findable

In case you chose a user-wide prefix installation, see preparation section on the [installation prefix](installation-source-advanced#installation-prefix), you need to extend some additional environment variables. This is needed such that other applications and preCICE adapters can find your preCICE installation. Please add the following lines your `~/.bashrc` and replace `<prefix>` with your selected prefix:

```bash
PRECICE_PREFIX=~/software/prefix # set this to your selected prefix
export PATH=$PRECICE_PREFIX/bin:$PATH
export LD_LIBRARY_PATH=$PRECICE_PREFIX/lib:$LD_LIBRARY_PATH
export CPATH=$PRECICE_PREFIX/include:$CPATH
# Enable detection with pkg-config and CMake
export PKG_CONFIG_PATH=$PRECICE_PREFIX/lib/pkgconfig:$PKG_CONFIG_PATH
export CMAKE_PREFIX_PATH=$PRECICE_PREFIX:$CMAKE_PREFIX_PATH
```

{% tip %}
Do you want to use preCICE from the build directory, without installing it to the prefix? Set both `PRECICE_PREFIX` and `PKG_CONFIG_PATH` to the build directory. This setting will let png-config discover a `libprecice.pc` configuration for using preCICE from the build directory.
{% endtip %}

After adding these variables, please start a new session (open a new terminal or logout and login again).

{% note %}
On MacOS X some of the environment variables have different names. For example, you have to extend the environment variable `DYLD_LIBRARY_PATH` instead of `LD_LIBRARY_PATH`.
{% endnote %}

## Next steps

This concludes the preCICE installation and you should have a working installation of preCICE on your system.

To use preCICE in your project, see the page [Linking to preCICE](installation-linking).
