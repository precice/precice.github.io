---
title: Building from source - Finding
permalink: installation-source-finding.html
keywords: configuration, basics, cmake, installation, building, source, bash, profile
toc: false
---

If you installed preCICE in a custom prefix, then one still needs to make it discoverable by the system.

The preCICE library needs to be discoverable in various ways:

1. The location of headers needs to be available during compilation.
   Compilers use hints from `CPATH` if no extra compilation flags were passed to them using `-I`.
2. The shared library needs to be available during linking and execution.
   The dynamic linker uses hints from `LD_LIBRARY_PATH` (`DYLD_LIBRARY_PATH` on MacOS X).
3. The preCICE executables need to be in `PATH` (optional, only for additional tools).

As this setup can become tedious to maintain, there are some tools that expose the above details.
However, they also need to find preCICE in some way:

* `pkg-config` and `pkgconf` use `PKG_CONFIG_PATH` to search for additional `.pc` files.
* `CMake` uses `CMAKE_PREFIX_PATH` for additional installation prefixes.
  Alternatively, one can specify the location of the preCICE CMake configuration file using `precice_DIR`.

## Using the shell

If you are using a Unix-like system, you are using a shell, which offers an easy and straight forward way to make preCICE discoverable.

Let `PRECICE_PREFIX` be the installation prefix chosen during the [preparation step](installation-source-preparation#installation-prefix).
Then add the following to your `.profile` (for bash) or `.zshrc` (for zsh).

```bash
# set this to your selected installation prefix
PRECICE_PREFIX=~/software/prefix
export PATH=$PRECICE_PREFIX/bin:$PATH
export LD_LIBRARY_PATH=$PRECICE_PREFIX/lib:$LD_LIBRARY_PATH
export CPATH=$PRECICE_PREFIX/include:$CPATH
# Enable detection with pkg-config and CMake
export PKG_CONFIG_PATH=$PRECICE_PREFIX/lib/pkgconfig:$PKG_CONFIG_PATH
export CMAKE_PREFIX_PATH=$PRECICE_PREFIX:$CMAKE_PREFIX_PATH
```

After adding these variables, start a new session (open a new terminal or logout and login again).

## Using systemd environment.d

An alternative to the above system is to set these variables in the shell-agnostic [`environment.d`](https://www.man7.org/linux/man-pages/man5/environment.d.5.html).

Create the directory if it does not yet exist:

```terminal
mkdir -p ~/.config/environment.d/
```

Let `PRECICE_PREFIX` be the installation prefix chosen during the [preparation step](installation-source-preparation#installation-prefix).
Then create a file `~/.config/environment.d/99-precice.conf` with the content:

```conf
# set this to your selected installation prefix
PRECICE_PREFIX=$HOME/software/prefix
PATH=${PRECICE_PREFIX}/bin:${PATH}
LD_LIBRARY_PATH=${PRECICE_PREFIX}/lib:${LD_LIBRARY_PATH}
CPATH=${PRECICE_PREFIX}/include:${CPATH}
# Enable detection with pkg-config and CMake
PKG_CONFIG_PATH=${PRECICE_PREFIX}/lib/pkgconfig:${PKG_CONFIG_PATH}
CMAKE_PREFIX_PATH=${PRECICE_PREFIX}:${CMAKE_PREFIX_PATH}
```

After adding the file, logout and login again. Opening a new terminal will not be sufficient.

## Using directly from the binary directory

{% warning %}
This method is strongly discouraged unless you are a preCICE developer.
Install preCICE into a prefix unless you have a very good reason not to.
{% endwarning %}

It may not always be practical to install preCICE repeatedly.
This is especially the case for simultaneous development of preCICE and an adapter, or while profiling the internals.

This method is discouraged as file layouts are fundamentally different and we make **no** guarantees on keeping them consistent between releases.
Hence, the only reliable methods for using preCICE from the binary directory require `pkg-config` or `CMake`.
If your adapter or solver isn't using one of these methods, then we strongly suggest to install preCICE to a prefix or port the adapter to `pkg-config`.

First extend `LD_LIBRARY_PATH` with the binary directory if you don't plan to use `rpath` (which `CMake` does by default).
For `pkg-config` users, extend `PKG_CONFIG_PATH` with the binary directory.
For `CMake` users, either set the environment variable `precice_DIR` to the binary directory prior to calling `CMake`, or pass it as a `CMake` variable during configuration.

## Next steps

This concludes the preCICE installation for custom prefixes and you should have a working installation of preCICE on your system.

To use preCICE in your project, see the page [Linking to preCICE](installation-linking).
