---
title: Configuration overview
keywords: configuration, xml, overview
summary: "preCICE needs to be configured at runtime via an `xml` file, typically named `precice-config.xml`. Here, you specify which solvers participate in the coupled simulation, which coupling data values they exchange, which numerical methods are used for the data mapping and the fixed-point acceleration and many other things. On this page, we give you an overview of the complete configuration section of the documentation."
sidebar: docs_sidebar
permalink: configuration-overview.html
---

## You are new to preCICE and want to learn how the configuration works?

Have first a look at the [introduction page](configuration-introduction.html). Here, we explain in which basic sections the configuration is structured and how the different sections are connected. Afterwards you can study the details of the main parts:

* [Mapping configuration](configuration-mapping.html)
* [Communication configuration](configuration-communication.html)
* [Coupling scheme configuration](configuration-coupling.html)
* [Acceleration configuration](configuration-acceleration.html)
* [Mesh exchange example](configuration-coupling-mesh-exchange.html)

And some optional advanced parts:

* [Logging configuration](configuration-logging.html)
* [Exports configuration](configuration-export.html)
* [Action configuration](configuration-action.html)
* [Watchpoint configuration](configuration-watchpoint.html)
* [Multi coupling configuration](configuration-coupling-multi.html)

## You are already familiar with the preCICE configuration, but you don't remember how a certain option was called?

Then you should look at the [configuration reference](configuration-xml-reference.html). Also try the search here on top. The configuration reference is up to date with the last release of preCICE. If you need an older version, you can always generate this documentation yourself:

```bash
./binprecice md > reference.md
```

There is also an `xml` variant of the reference. Just call `binprecice` without arguments to see all options.

## You want to visualize your configuration file?

Visualizing the configuration file is a good way to spot mistakes, but also to learn how the configuration is structured. Do not forget to try out the [configuration visualizer](tooling-config-visualization.html).

## You want to port your configuration file from preCICE v1.x to v2.x?

There is a [separate page with all steps required for porting](couple-your-code-porting-adapters.html#precice-configuration-file).

{% note %}
The parsing of floating point numbers in the configuration files depends on your system [locale](https://docs.oracle.com/cd/E19455-01/806-0169/overview-9/index.html).
If you get errors emitted by `xml::XMLAttribute`, then please set the locale to `export LANG=en_US.UTF-8`.
{% endnote %}
