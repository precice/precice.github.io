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
cargo add precice@2.5
```

Alternatively, you can install the bindings from the git repository:

```console
cargo add --git https://github.com/precice/rust-bindings.git --rev v2.5.0 precice
```

## Usage

The usage of the rust language bindings for preCICE is very similar to the C++ API. Therefore, please refer to our section on [coupling your code](https://precice.org/couple-your-code-overview.html) for getting started. Some important differences:

* Use `precice::new()` to create a new `SolverInterface`.
* All calls that require mutable access to the `SolverInterface` need to pin it in memory first using [`pin_mut()`](https://docs.rs/cxx/1.0.91/cxx/struct.UniquePtr.html#method.pin_mut).
* Action constants are directly exposed via the `precice` module.
* Sizes are inferred from passed slices

```rust
// Create a mutable interface
let mut interface = precice::new("Solver", "config.xml", 0, 1);

// Call a const method
let mesh_id = interface.get_mesh_id("Mesh");

// Call a non-const method via pin_mut()
let vid = interface.pin_mut().set_mesh_vertex(mesh_id, &[1.0, 2.0, 3.0]);
```
