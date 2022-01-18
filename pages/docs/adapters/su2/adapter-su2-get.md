---
title: Build the adapter
permalink: adapter-su2-get.html
keywords: adapter, su2, development, modules
summary: "Get SU2, get preCICE, execute adapter install script"
---

### SU2

Before installing the adapter SU2 itself must be downloaded from [SU2 repository](https://github.com/su2code/SU2). If necessary unpack the code and move it to your preferred location. Please do not configure and build the package before installing the adapter. In case you have already used SU2 you will need to rebuild the suite after installing the adapter.

### preCICE

It is assumed that preCICE has been installed successfully beforehand. Concerning installation instructions for preCICE, have a look at the [preCICE installation documentation](../../installation/installation-overview.md)

### Adapter

In order to run SU2 with the preCICE adapter, some SU2-native solver routines need to be changed. The altered SU2 files are provided with this adapter in the directory "replacement_files". Moreover, preCICE-specific files are contained in the directory "adapter_files". These need to be added to the source code of SU2. A simple shell script called su2AdapterInstall comes with the adapter, which automates this process and replaces/copies the adapted and preCICE-specific files to the correct locations within the SU2 package including the appropriately adjusted Makefile of SU2. For the script to work correctly, the environment variable `SU2_HOME` needs to be set to the location of SU2 (top-level directory).

{% note %}
If you run `./configure --prefix=$SU2_HOME` and get the error `configure: error: cannot find python-config for /usr/bin/python`, check via `ls /usr/bin` whether there is a `python-config` and/or `python2.7-config`. If not, you can create a symbolic link via `ln /usr/bin/python3-config /usr/bin/python-config` such that `python-config` uses `python3-config`.
{% endnote %}

It is recommended to set these variables permanently in your `~/.bashrc` (Linux) or `~/.bash_profile` (Mac). After setting these variables the script `su2AdapterInstall` can be run from the directory, in which it is contained:
`./su2AdapterInstall`
The script will not execute if the environment variables are unset or empty.

If you do not want to use this script, manually copy the files to the locations given in it. The two environment variables need to be defined as stated above, nevertheless.

After copying the adapter files to the correct locations within the SU2 package, SU2 can be configured and built just like the original version of the solver suite. Please refer to the installation instructions provided with the SU2 source code. SU2 should be built with MPI support in order to make use of parallel functionalities. The script su2AdapterInstall states recommended command sequences for both the configuration and the building process upon completion of the execution.

The SU2 executable is linked against the dynamic library of preCICE, so make sure you have built it like this.
