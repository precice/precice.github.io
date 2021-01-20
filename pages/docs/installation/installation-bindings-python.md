---
title: Language bindings
permalink: installation-bindings-python.html
keywords: todo, configuration, basics, overview, installation, bindings
summary: "Use pip3 install --user pyprecice to install the python language bindings from PyPI"
---

## Installation

The python bindings for preCICE are [published on PyPI](https://pypi.org/project/pyprecice/) with the package `pyprecice`. You can use your python package manager for installing the language bindings. For example, `pip3 install --user pyprecice`. Note that preCICE and MPI have to be installed on your system.

## Usage

The usage of the python language bindings for preCICE is very similar to the C++ API. Therefore, please refer to our section on [coupling your code](https://www.precice.org/couple-your-code-overview.html) for getting started. Some important differences:

* Call `import precice` at the beginning of your script.
* The object `precice.Interface` is the main access point to the preCICE API.
* We try to follow [PEP8](https://pep8.org/) with respect to function and class names. Meaning: `write_block_scalar_data`, not `writeBlockScalarData`, since this is a function call.
* Please use `numpy` arrays, if this seems appropriate. For scalar data a 1D-`numpy` with `size` entries should be used; for vector data a 2D-`numpy` array with `size x dimensions` entries should be used. This allows us to drop the `size` argument some functions calls. Meaning: not `writeBlockScalarData (int dataID, int size, int* vertexIDs, double* values)`, but `write_block_scalar_data(dataID, vertexIDs, values)`.

{% include tip.html content="You can use Python's `help()` function for getting detailed usage information. Example: `help(precice.Interface)` or `help(precice.Interface.write_block_scalar_data)`" %}

## More details & troubleshooting

The python package and detailed documentation for the python bindings can be found [here](https://github.com/precice/python-bindings).
