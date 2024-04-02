---
title: Config visualization
permalink: tooling-config-visualization.html
keywords: tooling, xml, configuration
summary: "Understanding, handling and debugging preCICE configuration files can be difficult and tedious. This tool simplifies this process by visualizing the configuration as a dot graph."
---

## Motivation

Understanding, handling and debugging preCICE configuration files can be difficult and tedious.
As so many problems, also this problem grows superlinear with the size of the input.
Especially the configuration of the data-flow can be tricky to get right for beginners and sometimes even seasoned preCICE users.

This tool is supposed to tackle this issue.

It naively interprets the given configuration file and visualizes it as a graph.
This has a few important benefits:

* Configuration mistakes can be difficult to spot in XML, but are often trivial to spot in a graph.
* Students and co-workers have less trouble understanding relations of components in a graph format.
* A graph is a good format to present the simulation scenario in presentations

## Installation

Please first install the dependencies:

* `python3` and `pipx` (or `pip`)
* [`graphviz`](https://graphviz.org/download/) for rendering the result.
* dependencies of [`pygobject`](https://gnome.pages.gitlab.gnome.org/pygobject/getting_started.html)

In particular, in Ubuntu, you might need to install the following packages:

```bash
sudo apt install libcairo2-dev libgirepository1.0-dev gcc libcairo2-dev pkg-config python3-dev gir1.2-gtk-4.0
```

Then install the latest version straight from PyPi:

```bash
pipx install precice-config-visualizer
```

Alternatively, you can install the latest develop version from the repository

```bash
pipx install https://github.com/precice/config-visualizer/archive/master.zip
```

## General usage

The configuration visualizer comes with a CLI and a GUI, which serve different purposes:

* Use the GUI to quickly explore a configuration and change the visualization parameters.
* Use the CLI to automatriclaly generate graphs from preCICE configuration files or to heavily customize them to suite your own needs.

## Using the GUI

To open the interactive GUI and optionally pass a path to a configuration file:

```bash
precice-config-visualizer-gui
# Or directly open the precice-config.xml
precice-config-visualizer-gui precice-config.xml 
```

The application automatically reloads configuration files on change and shows parsing errors at the bottom. This is especially useful for rapid prototyping.

Desktop integration is still lacking with commonly used tools for installin python packages.
If you want your launcher to pick up the tool, you can save [its desktop file](https://raw.githubusercontent.com/precice/config-visualizer/master/data/org.precice.config_visualizer.desktop) manually to the directory `~/.local/share/applications/`. The directory may need to be created first.

## Using the CLI

Alternatively, you can generate [a DOT graph](https://graphviz.org/doc/info/lang.html) and transform it to a presentable format, e.g., PDF or PNG.

1. Use `precice-config-visualizer -o config.dot precice-config.xml` to generate the grpah `config.dot` from the `precice-config.xml` file.

2. Use `dot -Tpdf -O config.dot` to layout the graph in `config.dot`, generating a `config.pdf`.
  This program is part of graphviz and there are many more output formats possible.

These commands support piping, so you can also execute:

```bash
cat precice-config.xml | precice-config-visualizer | dot -Tpdf > config.pdf
```

{% tip %}
Set a bash function to your aliases to make your life easier. The [demo virtual machine](installation-vm.html) already [defines such functions](https://github.com/precice/vm/blob/main/provisioning/.alias).
{% endtip  %}

## Controlling the output

For big cases, the generated output can be visually too busy.
This is why the tool allows you to control the verbosity of some elements.
For some properties, the following options are available:

* **full** shows the available information in full detail. This is the default.
* **merged** shows available relations between components without full detail. Multiple edges between components will be merged into a single one.
* **hide** hides all relations.

These options are currently available for many information types, including:

* **data access** participants using `read-data` and `write-data` to access data on meshes.
* **data exchange** participants `exchange`ing data between meshes.
* **communicators** configured `m2n` connections between participants.
* **coupling schemes** configured `cplscheme`s between participants.
* **mapping schemes** configured `mapping`s between meshes.

These options can be visually adjusted in the GUI or passed via command line arguments to the CLI.
The GUI also provides some presets, which is a one-click setup of many options.
To see the full list of options, run:

```bash
precice-config-visualizer --help
```

## Examples

These examples are based on the elastictube1d example.

### The full picture

```bash
precice-config-visualizer precice-config.xml | dot -Tpdf > graph.pdf
```

![Config visualization](images/docs/tooling/elastictube1d-full.svg)

### Reduced information of coupling schemes and communicators

```bash
precice-config-visualizer --communicators=merged --cplschemes=merged precice-config.xml | dot -Tpdf > graph.pdf
```

![Config visualization](images/docs/tooling/elastictube1d-cpl-com-merged.svg)

### Data flow visualization

```bash
precice-config-visualizer --communicators=hide --cplschemes=hide precice-config.xml | dot -Tpdf > graph.pdf
```

![Config visualization](images/docs/tooling/elastictube1d-data-flow.svg)
