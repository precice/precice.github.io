---
title: Julia bindings
permalink: installation-bindings-julia.html
keywords: basics, overview, installation, bindings, Julia
summary: "Use add PreCICE to install the Julia language bindings from the official Julia registry"
---

## The versioning scheme

The versioning scheme of the Julia bindings is the major and minor preCICE version which the bindings are tested with, followed by the version of the Julia bindings. This differs from the [matlab](installation-bindings-python.md) and [python](installation-bindings-python.md) bindings due to the [Julia versioning guidelines](https://pkgdocs.julialang.org/v1/toml-files/#The-version-field), which only allow major, minor, and patch versions.

Example: version `1` of the Julia bindings for preCICE version `2.4.0` is `2.4.1`

## Installation

The Julia bindings can be installed with [Pkg.jl](https://pkgdocs.julialang.org/v1/) from the [Julia General Repository](https://github.com/JuliaRegistries/General). For this, preCICE needs to be installed first. For the preCICE installation refer to the [Quickstart](quickstart.html) or the [installation overview](installation-overview.html).

### Adding the package

Add the Julia bindings in the Julia prompt by typing:

```julia-repl
julia> ]
pkg> add PreCICE 
```

Alternatively you can also include the package in a Julia script in the following way:

```julia
import Pkg; Pkg.add("PreCICE")
```

Yes, we know, "PreCICE" is not as elegant as "preCICE", but that's a Julia convention. 🙈

### Adding the package from a local folder

If you have cloned or downloaded the Julia bindings on your local machine, add the Julia bindings to your Julia environment in the following way:

```julia-repl
julia> ]
pkg> add <path-to-repository>
```

### Adding a feature branch

If you want to test a new feature, you can install a specific branch of the [PreCICE.jl repository](https://github.com/precice/PreCICE.jl/) with the following command:

```julia-repl
julia> ]
pkg> add https://github.com/precice/PreCICE.jl#<branch-name>
```

## Troubleshooting

If preCICE is installed at a custom path, errors of the form `ERROR: could not load library "/..."` can occur after adding the Julia bindings package. Make sure the preCICE library is in the system library path through `echo $LD_LIBRARY_PATH`. If the path containing `libprecice.so` doesn't appear, update the variable with the correct path.

```bash
~$ export LD_LIBRARY_PATH="<path-to-libprecice.so>:${LD_LIBRARY_PATH}"
```

A different way to fix this error is to set the custom path of the preCICE installation through the environment variable `PRECICE_JL_BINARY`. Afterwards you need to rebuild this package:

```julia-repl
~$ export PRECICE_JL_BINARY=/usr/lib/x86_64-linux-gnu/
~$ julia (--project)
julia> ]
pkg> build PreCICE
```

## Usage

The usage of the Julia language bindings for preCICE is very similar to the C++ API. Therefore, please refer to our section on [coupling your code](https://precice.org/couple-your-code-overview.html) for getting started. Some important differences:

* Call `using PreCICE` at the beginning of your script.
* Access API functions using `PreCICE.<function>`
* The object `PreCICE` is the main access point to the preCICE API.
* We try to follow the [Julia styleguide](https://docs.julialang.org/en/v1/manual/style-guide/) with respect to function and class names. Meaning:, `writeBlockScalarData` not `write_block_scalar_data`.
* The [solverdummy](https://github.com/precice/julia-bindings/tree/main/solverdummy) shows an example of how to use the Julia bindings for preCICE.

{% tip %}
You can use Julia's `?()` function for getting detailed usage information. Example: Open a Julia shell and type: `using PreCICE` and then `? PreCICE.writeBlockScalarData`
{% endtip %}

## Testing PreCICE.jl

To test the bindings, run:

```julia-repl
julia> ]
pkg> test PreCICE
```

This checks if the preCICE bindings can be found and accessed correctly.
You can also test the full functionality of PreCICE.jl. If not set up, the output of the previous test shows an info on what command you need to execute. It will be along the lines of:

```shell
cd /home/<user>/.julia/packages/PreCICE/<code>/test && make
```

After this, you can run the tests again, resulting into individual 22 tests being executed.

## Dependencies

This package works with the official Julia binaries listed below. See the [platform-specific instructions for official binaries](https://julialang.org/downloads/platform/)  or [Julia's documentation](https://docs.julialang.org/en/v1/manual/getting-started/) if you are not sure how to download them.

## Supported versions

The package is [tested](https://github.com/precice/PreCICE.jl/actions/workflows/build-and-test.yml) for Julia versions `1.6.0`, `1.6.5`, `1.7.0` and the newest [Julia release](https://github.com/JuliaLang/julia/releases). Julia versions prior to `v1.6.0` are not supported.

[Unofficial Julia binaries](https://julialang.org/downloads/platform/#platform_specific_instructions_for_unofficial_binaries) may not be compatible.
