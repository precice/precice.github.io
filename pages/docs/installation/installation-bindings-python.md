---
title: Python bindings
permalink: installation-bindings-python.html
keywords: configuration, basics, overview, installation, bindings
summary: "Use pip3 install --user pyprecice to install the python language bindings from PyPI"
---

## The versioning scheme

The versioning scheme of the python bindings is the preCICE version with the additional version of the python bindings.

Example: version `1` of the python bindings for preCICE version `2.2.0` is `2.2.0.1`

## Installation

The python bindings for preCICE are [published on PyPI](https://pypi.org/project/pyprecice/) with the package `pyprecice`. You can use your python package manager for installing the language bindings. For example, `pip3 install --user pyprecice`. This will automatically install the latest version of the bindings compatible with the latest version of preCICE. If you are using an older version of preCICE, you have to explicitly tell pip to download the correct version (For example, `pip3 install --user pyprecice==2.2.0.2` for preCICE version `2.2.0`). See [the PyPI release history](https://pypi.org/project/pyprecice/#history) for a list of available version. Note that preCICE and MPI have to be installed on your system.

### Alternatives & Community packages

* Build the latest version from source: You can get the latest version of python bindings from [github.com/precice/python-bindings](https://github.com/precice/python-bindings). Refer to the `README.md` in the repository for building instructions.
* You can also install pyprecice using `conda install -c conda-forge pyprecice`. The package is maintained at [conda-forge/pyprecice](https://anaconda.org/conda-forge/pyprecice).
* If you are using Arch Linux, there is a package on [AUR](https://aur.archlinux.org/cgit/aur.git/tree/PKGBUILD?h=python-pyprecice) you might want to use.
* For Spack, see [our documentation page on Spack installation](https://precice.org/installation-spack.html#installing-the-python-bindings).

## Usage

The usage of the python language bindings for preCICE is very similar to the C++ API. Therefore, please refer to our section on [coupling your code](https://precice.org/couple-your-code-overview.html) for getting started. Some important differences:

* Call `import precice` at the beginning of your script.
* The object `precice.Interface` is the main access point to the preCICE API.
* We try to follow [PEP8](https://pep8.org/) with respect to function and class names. Meaning: `write_block_scalar_data`, not `writeBlockScalarData`, since this is a function call.
* Please use `numpy` arrays, if this seems appropriate. For scalar data a 1D-`numpy` with `size` entries should be used; for vector data a 2D-`numpy` array with `size x dimensions` entries should be used. This allows us to drop the `size` argument some functions calls. Meaning: not `writeBlockScalarData (int dataID, int size, int* vertexIDs, double* values)`, but `write_block_scalar_data(dataID, vertexIDs, values)`.
* Refer to [the python version of the tutorial for the elastic tube in 1D](tutorials-elastic-tube-1d.html#python) and the corresponding [source code](https://github.com/precice/tutorials/tree/master/elastic-tube-1d) for a complete example of how pyprecice can be used to couple your code.

{% tip %}
You can use Python's `help()` function for getting detailed usage information. Example: Open a python3 shell, `import precice`,   `help(precice.Interface)` or `help(precice.Interface.write_block_scalar_data)`
{% endtip %}

## More details & troubleshooting

The python package and detailed documentation for the python bindings can be found [here](https://github.com/precice/python-bindings).
