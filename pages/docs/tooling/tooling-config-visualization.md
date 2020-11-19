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

We recommend installing the `config-visualizer` straight from GitHub:

```
pip3 install --user https://github.com/precice/config-visualizer/archive/master.zip
```

In case you want to tinker with the software, you can clone the repository and install the package locally.
```
git clone https://github.com/precice/config-visualizer.git
pip3 install --user -e config-visualizer
```

## Workflow

0. Familiarize yourself with the options. Many properties can be fully visualized, merged or omitted.
  ```
  precice-config-visualizer --help
  ```

1. Generate the 




## Example
