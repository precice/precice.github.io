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

* `python3` and `pip`
* [`graphviz`](https://graphviz.org/download/) for rendering the result.

We recommend installing the `config-visualizer` straight from [GitHub](https://github.com/precice/config-visualizer):

```bash
pip3 install --user https://github.com/precice/config-visualizer/archive/master.zip
```

In case you want to tinker with the software, you can clone the repository and install the package locally.

```bash
git clone https://github.com/precice/config-visualizer.git
pip3 install --user -e config-visualizer
```

Note: You maybe need to add your user pip installations to your path to make the config visualizer findable, i.e.

```bash
export PATH=$PATH:$HOME/.local/bin
```

## Usage

The config visualizer can be used interactively:

```bash
precice-config-visualizer-gui precice-config.xml 
```

Alternatively, you can generate a graph and transform it to a readable format, e.g., pdf.

1. Use `precice-config-visualizer -o config.dot precice-config.xml` to generate the graph in the `.dot` format.

2. Use `dot -Tpdf -ofile config.pdf config.dot` to layout the result and output a given format such as pdf.
  This program is part of graphviz.

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

These options are currently available for:

* **data access** participants using `read-data` and `write-data` to access data on meshes.
* **data exchange** participants `exchange`ing data between meshes.
* **communicators** configured `m2n` connections between participants.
* **coupling schemes** configured `cplscheme`s between participants.

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
