---
title: Built-in tooling
permalink: tooling-builtin.html
keywords: tooling, xml, configuration, version
summary: "Built-in tooling is always installed alongside preCICE and provides some basic functionality."
---

Part of a preCICE installation is the tool `binprecice`.
It provides an easy-to-use interface to tooling API of the preCICE library.

## XML reference

```
$ binprecice md
$ binprecice xml
$ binprecice dtd
```

This prints the XML reference to the console in various flavours.

### `md`

This prints the XML configuration in Markdown format.
You can find the reference of the latest release [on the website](configuration-xml-reference.html).

It is possible to generate a local version of the reference by rendering the Markdown to HTML using the `markdown` command.
Be aware that this version does not contain styling, LaTeX rendering, and functioning links.

```
$ binprecice md | markdown > reference.html
```

### `xml`

This prints the XML configuration with in-lined annotations of tags and attributes.

### `dtd`

This prints the DTD information, which can be used to validate the XML configuration file.

## preCICE version

{% version 2.4.0 %}
This feature is available since version 2.4.0.
{% endversion %}

```
$ binprecice version
```

This prints the version information of preCICE, which consists of multiple semicolon-separated parts.

1. the version of preCICE e.g. `2.3.0`.
2. the git revision of this version e.g. `v2.3.0-87-g04ee7308-dirty`.
   This is interesting for development versions of preCICE.
   It is not available if the library wasn't build using the git repository.
3. Configuration options for MPI, PETSc, Python and some more.
4. Compilation and linker flags used to build preCICE


## Configuration check

{% version 2.4.0 %}
This feature is available since version 2.4.0.
{% endversion %}

```
$ binprecice check FILE [ PARTICIPANT [ COMMSIZE ] ]
```

The `check` runs the preCICE configuration parsing and checking logic on the given configuration file.
This will find the majority of the configuration mistakes without having to start a simulation.

The basic usage is to simply check a configuration file.

```
$ binprecice check precice.xml
```

To enable more checks, additionally pass the name of one participant.
This should be repeated for every defined participant in the simulation.

```
$ binprecice check precice.xml Fluid
```

To enable all available checks, you may additionally pass the communicator size of the Participant.
This enables some niche checks, which should not be necessary in the vast majority of cases.

```
$ binprecice check precice.xml Fluid 2
```

