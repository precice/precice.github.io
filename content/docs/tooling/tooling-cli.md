---
title: The preCICE CLI
permalink: tooling-cli.html
keywords: tooling, xml, configuration, version, cli, pypi
summary: "The preCICE CLI provides a unified interface to the main preCICE tools."
---

The [`precice-cli`](https://github.com/precice/cli) package provides an easy-to-use interface for the [builtin tools](tooling-builtin) of preCICE and a range of python-based tooling.

## Installation

To install the cli locally as a runnable program, we recommend using either [pipx](https://pipx.pypa.io/latest/installation/) by the Python Packaging Authority or [uv](https://docs.astral.sh/uv/) by the [Astal](https://astral.sh) project.

### pipx

```bash
$ pipx install precice-cli  
  installed package precice-cli 1.0.0, installed using Python 3.13.7
  These apps are now globally available
    - precice-cli
done! 
```

### uv

```bash
$ uv tool install precice-cli
Resolved 39 packages in 11ms
Installed 39 packages in 15ms
Installed 1 executable: precice-cli
```

## Usage

`precice-cli` offers some basic sub commands and categories:

### version

```bash
precice-cli version
```

This subcommand displays the version of the precice-cli and all preCICE-related dependencies.
If the preCICE library is installed, it also shows its version and configuration.

### profiling

```bash
precice-cli profiling merge
precice-cli profiling trace
```

This subcommand group exposes all commands from the [precice profiling tools](tooling-performance-analysis).

### config

```bash
precice-cli config check
precice-cli config visualize
precice-cli config format
```

This subcommand group includes configuration related commands such as checking, [visualization](tooling-config-visualization), and [formatting](https://github.com/precice/config-format).
The check command first validates the given configuration using the [builtin tool](tooling-builtin) and then runs the [config checker](https://github.com/precice/config-check) on it.

### init

```bash
precice-cli init
```

This experimental command initializes a preCICE case using a topology file.
Have a look at the [case generation repository](https://github.com/precice/case-generate) for up-to-date information on the development.
