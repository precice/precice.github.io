---
title: Built-in tooling
permalink: tooling-builtin.html
keywords: tooling, xml, configuration, version
summary: "Built-in tooling is always installed alongside preCICE and provides some basic functionality."
---

Part of a preCICE installation is the tool `binprecice`.
It provides an easy-to-use interface to tooling API of the preCICE library.

With `binprecice`, you can get the installed preCICE version, generate a reference of all available configuration options, as well as check your configuration file for basic configuration issues.

## XML reference

```bash
binprecice md
binprecice xml
binprecice dtd
```

This prints the XML reference to the console in various flavors.

### `md`

This prints the XML configuration in Markdown format.
You can find the reference of the latest release [on the website](configuration-xml-reference.html).

It is possible to generate a local version of the reference by rendering the Markdown to HTML using the `markdown` command.
Be aware that this version does not contain styling, LaTeX rendering, and functioning links.

```bash
binprecice md | markdown > reference.html
```

### `xml`

This prints the XML configuration with in-lined annotations of tags and attributes.

### `dtd`

This prints the DTD information, which can be used to validate the XML configuration file.

## preCICE version

{% version 2.4.0 %}
This feature is available since version 2.4.0.
{% endversion %}

```bash
binprecice version
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

```bash
binprecice check FILE [ PARTICIPANT [ COMMSIZE ] ]
```

The `check` runs the preCICE configuration parsing and checking logic on the given configuration file.
This will find the majority of the configuration mistakes without having to start a simulation.
These checks include wrong tags and attribute values, and more elaborate naming checks.
More advanced logic, such as checks if all necessary data are exchanged in a coupling scheme, are not covered.

The basic usage is to check a configuration file:

```bash
binprecice check precice-config.xml
```

Some example errors handled by the checker:

* Misspelled tags (should be `data:vector` instead)

  ```log
  ERROR: The configuration contains an unknown tag <data:vektor>.
  ```

* Misspelled data names (should be `Forces` instead)

  ```log
  ERROR: Data with name "forces" used by mesh "Solid" is not defined. Please define a data tag with name="forces".
  ```

* Incorrect attribute combinations (mesh provided and received at the same time)

  ```log
  ERROR: Participant "SolverOne" cannot receive and provide mesh "Test-Square" at the same time. Please remove all but one of the "from" and "provide" attributes in the <use-mesh name="Test-Square"/> node of SolverOne.
  ```

* Incorrect meshes used in mapping definitions (`MeshTwo` doesn't exist)

  ```log
  ERROR: Mesh "MeshTwo" was not found while creating a mapping. Please correct the to="MeshTwo" attribute.
  ```

To enable more niche checks, additionally pass the name of one participant.
This participant is assumed to run on a single rank.
You may additionally pass the communicator size of the participant.
This enables some checks regarding user-defined intra-participant communication, which should not be necessary in the vast majority of cases.

```bash
binprecice check precice-config.xml Fluid
binprecice check precice-config.xml Fluid 2
```
