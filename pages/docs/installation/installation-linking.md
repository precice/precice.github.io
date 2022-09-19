---
title: Linking to preCICE
permalink: installation-linking.html
keywords: configuration, basics, cmake, installation, building, source, autotools, make, pkg-config
---

Linking against preCICE requires to pass two set of flags to two programs.
The compiler requires information on where to find the preCICE headers.
The linker requires the name of the library as well as its location.

## CMake

This is the preferred method of linking to preCICE.
preCICE provides a precice-Config file which contains all required information to the build system.

Linking to preCICE from a CMake project is simple.
Use `find_package(precice)` and link `precice::precice` to your target:

```cmake
find_package(precice REQUIRED CONFIG)

add_executable(myTarget main.cpp)
target_link_libraries(myTarget PRIVATE precice::precice)
```

This works out-of-the-box if you installed preCICE from provided packages or manually to `/usr/local`.
In case preCICE was installed to another directory, CMake needs to know which directory to look into.

The simplest solution is to explicitly pass the location of the config file to CMake using `-Dprecice_DIR=<prefix>/lib/cmake/precice`.
This directory can also point to the build directory of preCICE. This allows to use preCICE without explicitly installing it.

An alternative is to tell CMake to consider an additional install prefix by passing the following to CMake `-DCMAKE_PREFIX_PATH=<prefix>`.

{% note %}
__Static linking is not recommended nor supported by the preCICE developers!__  

Static linking in CMake requires you to provide all transitive dependencies of the preCICE, which includes private dependencies!
Meaning that you have to find and provide the requested targets in your `CMakeLists.txt`.
You may [contribute here](https://github.com/precice/precice/pull/343)
{% endnote %}

## Autotools

Linking to preCICE from a GNU Autotools project is similarly simple. Just use the following in your `configure.ac` file:

```makefile
PKG_CHECK_MODULES(preCICE, libprecice)
```

This will extract the `CFLAGS` and `LIBS` into `preCICE_CFLAGS` and `preCICE_LIBS`, which you can then use in your `Makefile.am` as:

```makefile
my_cxx_flags += @preCICE_CFLAGS@
my_ldadd += @preCICE_LIBS@
```

## Make and scripts in general

The recommended way to link preCICE to another project is by embedding pkg-config commands into a building script/Makefile to extract the necessary flags from the generated `liprecice.pc` file.

Use the following two commands to fetch necessary flags:

```makefile
pkg-config --cflags libprecice
pkg-config --libs   libprecice
```

These two commands should return (if the paths are not already known by the system):

```makefile
-I/path/to/include
-L/path/to/lib -lprecice
```

You can use backticks to evaluate a command and use its result in your shell script, for example:

```makefile
CFLAGS = `pkg-config --cflags libprecice`
```

The syntax to do the same in a Makefile is:

```makefile
CFLAGS = $(shell pkg-config --cflags libprecice)
```

If you built preCICE and installed it into a custom prefix, e.g. `~/software/`, you need to set the following environment variable first:

```bash
export PKG_CONFIG_PATH="~/software/lib/pkgconfig"
```

Now you can use `pkg-config` to extract the necessary flags.

## Troubleshooting

### `SolverInterface.hpp` cannot be found

There are two reasons you may be getting this error:

* `pkg-config` could not find a `libprecice.pc` file (keep reading)
* you are including the file as `SolverInterface.hpp` and not as `precice/SolverInterface.hpp`

### `SolverInterfaceC.h` cannot be found

If you are using the C bindings, please note that they are now installed in `[prefix]/include/precice/`, alongside the C++ headers. If your code includes e.g. `precice/bindings/c/SolverInterfaceC.h`, please update this to `precice/SolverInterfaceC.h`.

### libprecice cannot be found (during building)

If you installed preCICE in a path not known by your compiler/linker, pkg-config will try to locate the file `libprecice.pc` and extract the necessary information. However, pkg-config only looks in specific places (usually in `/usr/lib/pkgconfig`, but *not* e.g. in `/usr/local/lib/pkgconfig`). Before building, you need to set the path where pkg-config can find this file, e.g. with:

```bash
PKG_CONFIG_PATH=/path/to/lib/pkgconfig [make or anything else]
```

### libprecice cannot be found (at runtime)

If you built preCICE (as a shared library) in a non-standard path, pkg-config only helps during building. At runtime, libprecice will not be discoverable, unless you e.g. include this path in your `LD_LIBRARY_PATH`.

Depending on the configuration of `ld` it might look by default into `/usr/local/lib` or not. This might lead to linking problems and can be either solved by adding `/usr/local/lib` to the `LD_LIBRARY_PATH` or [changing the configuration of `ld`](https://lonesysadmin.net/2013/02/22/error-while-loading-shared-libraries-cannot-open-shared-object-file/).

### `precice/Version.h` cannot be found

Version 2.5 introduces the `precice/Version.h` header and includes it by default in `SolverInterface.hpp` and `SolverInterfaceC.h`.
This file is generated during the preCICE build and not part of the sources.

If you are using preCICE directly from the build directory without the help of pkg-config nor CMake, then you are likely missing an include-directory.
Prefer to use pkg-config or CMake as these directories may change without further notice. Alternatively, add `<build-directory>/src/` to your include-directories.
