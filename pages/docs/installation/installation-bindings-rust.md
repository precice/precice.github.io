---
title: Rust bindings
permalink: installation-bindings-rust.html
keywords: configuration, basics, overview, installation, bindings, rust
summary: "Use cargo add precice to install the rust language bindings from crate.io"
---

## The versioning scheme

The versioning scheme of the rust bindings consists of the first two parts of the preCICE version and the additional version of the rust bindings.

Examples:

* version `1` of the rust bindings for preCICE version `2.5` is `2.5.1`
* version `2.5.0` of the rust bindings are compatible will all bugfix releases of `2.5`.

## Prerequisites

Install `cargo`, `pkg-config` and [preCICE](installation-overview.html).
The rust bindings rely on `pkg-config` to locate preCICE.

## Installation

The rust bindings for preCICE are [published on crates.io](https://crates.io/crates/precice/) with the package `precice`.

You can install the bindings directly from crates.io:

```console
cargo add precice@3.0
```

Alternatively, you can install the bindings from the git repository:

```console
cargo add --git https://github.com/precice/rust-bindings.git --rev v3.0.0 precice
```

## Usage

The usage of the rust language bindings for preCICE is very similar to the C++ API. Therefore, please refer to our section on [coupling your code](https://precice.org/couple-your-code-overview.html) for getting started.
The main important differences are:

* Import the crate `use precice`
* Create a `precice::Participant` using `precice::Participant::new()`
* The rust bindings follow rust naming scheme, so `read_data` instead of `readData`.
* The bindings use slices for data `[f64]` and indices `[i32]` or `[VertexID]`
* Refer to [the rust version of the elastic tube 1D](tutorials-elastic-tube-1d.html#python) and the corresponding [source code](https://github.com/precice/tutorials/tree/master/elastic-tube-1d) for a complete example of the precice crate.
