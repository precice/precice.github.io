---
title: preCICE training
keywords: workshop, teaching, support, api, implicit coupling, tools, data mapping, training
summary: A hands-on introduction to preCICE, recommended for new users that want to learn how to couple their own codes and beyond.
permalink: community-training.html
toc: true
---

## About the course

Since 2020, we have been developing a dedicated training course on preCICE. Originally conceptualized for beginners, more and more content for advanced users has been added. We regularly give the complete course at the [preCICE workshops](https://precice.org/community.html) and parts of it at various different occasions (for example as a [minitutorial at SIAM CSE 2023](https://meetings.siam.org/sess/dsp_programsess.cfm?SESSIONCODE=77168). We also offer to give private and bespoke versions of the course through the [preCICE support program](community-support-precice.html). Please note that the material of the course (besides community-contributed modules) is not distributed with a FOSS license, in contrast to almost everything else we do.

## Teaching concept

The course is organized in separate modules, which can be combined in various different ways. Each module typically takes 120 to 150 minutes to complete. We start each module with a short presentation explaining some background and giving an overview of the tasks. Then, students work on the tasks in a hands-on fashion, individually or in groups. Questions are answered individually by typically several instructors. We close each module by discussing solution approaches and open problems all together. We typically provide a reference system (see [how to prepare](#how-to-prepare)) with everything installed, for convenience. The actual course material is tailored to the needs of each event and distributed via download links.

Basic previous knowledge of Python programming, the Linux command line, and numerical simulation principles are highly recommended.

## Content

The course currently consists of the following modules, presented in historical order.
The basics is necessary for beginners, and it is typically followed by tools, implicit coupling, and data mapping,
and further modules depending on the needs of the audience.
We regularly add new modules - don't hesitate to let us know if you would have any specific needs.

### Basics

We couple two simple Python codes, discussing the basic methods of the preCICE API.

![Basics training: Configuration](images/training/training-basics.png)

### Tools

We take a tour over available tools to configure, understand, and post-process preCICE simulations. More specifically, we have a look at the preCICE logger, config visualizer, mesh exports, and watchpoints of preCICE. We also discuss common tips for visualizing partitioned simulations in ParaView.

![Basics training: Tools](images/training/training-tools.png)

### Implicit coupling

We use a conjugate heat transfer scenario coupling OpenFOAM with Nutils to study implicit coupling, including acceleration methods.

![Basics training: Implicit coupling](images/training/training-implicit-coupling.png)

### Data mapping

We explore aspects of accuracy and efficiency in data mapping, using [ASTE](tooling-aste.html).

![Basics training: Mapping](images/training/training-mapping.png)

### Workflow for FSI simulations

In this [community-contributed part of the course](https://github.com/precice/community-training/tree/main/fsi-workflow), we are going step by step through the process of creating a fluid-structure interaction simulation coupling CalculiX and OpenFOAM. We start by creating the meshes for both solvers, using FreeCAD and snappyHexMesh. We then setup and run single-physics simulations, before we couple them.

![Application training: FSI workflow](images/training/training-fsi.png)

### Parallelization and HPC workflows

We parallelize the same Python codes used in the Basics module, we analyze the performance-related events, run partitioned simulations in parallel on SLURM-enabled systems, and look deeper into common performance-related pitfalls.

![HPC training: Tracing](images/training/training-hpc.png)

### Macro-micro coupling

We couple many micro simulations to a macro simulation: We use the [Micro Manager](tooling-micro-manager-overview.html) to set up Python and C++ micro simulations, learn how manage runtime using adaptivity, implement model adaptivity, and run the micro simulations in parallel with adaptivity and load balancing.

![Macro-Micro training: Adaptivity](images/training/training-mm.png)

## How to prepare?

On the technical side, the training course involves multiple components of the preCICE ecosystem, as well as third-party solvers and pre- and post-processing tools.
Most of these tools work best (or only) on a Linux system.
You can either (a) use a prepared system image that we provide (a virtual machine image or a bootable live USB), or (b) install the dependencies directly on your system.
To reduce system-related friction during the training, we recommend starting with option (a).
On virtual trainings, that is a VM image; on in-person trainings, that might be a bootable live USB.

{% important %}
Before the training, verify your installation, and contact us as soon as possible regarding any issues.
For example, try running the [elastic-tube-1d Python tutorial](tutorials-elastic-tube-1d.html) (check if it is already under `~/tutorials/`).
{% endimportant %}

### Provided virtual machine image

Close to the training start, you will receive instructions with a link to an up-to-date provided VM image, very similar to the [demo VM](installation-vm.html).
We typically provide a [Vagrant](https://developer.hashicorp.com/vagrant) box made for [VirtualBox](https://www.virtualbox.org/).

{% note %}
At the moment, this modified Ubuntu image is only available for Intel/AMD x86-64 CPUs.
{% endnote %}

System requirements: ideally 25GB of free storage, 8GB of RAM, and more than 4 CPU cores.
By default, the VM is configured with 4GB of RAM and 4 CPU cores, both configurable.
Most of the storage goes to solvers and other tools that you might not need, in which case you could directly install the tools you need on your system, or on your own VM.

### Provided live USB

In our on-site trainings, some bootable USB sticks are provided, based on the Ubuntu installer,
allowing you to work on a temporary live session, without installing anything on your system.
These should work on any laptop with an x86-64 CPU, as long as you have the rights to boot from USB. In particular, these do not work on Apple Silicon systems.

{% important %}
If you use a bootable USB, make sure to select trying a live session, and not installing (or take care that you do not remove your data).
{% endimportant %}

Notes:

- If you have [secure boot](https://en.wikipedia.org/wiki/UEFI#Secure_Boot) enabled, this will need to be turned off to boot this unsigned OS.
- In case you use Windows with [BitLocker](https://en.wikipedia.org/wiki/BitLocker) enabled, you will not be able to boot on Windows while secure boot is disabled (BitLocker will be asking for the decryption key).
Remember to switch secure boot on again to be able to use your system as before.
- Do not remove the USB during a live session (e.g., during a break). You would be surprised how many times this has happened already. :-)

### Individual dependencies

In case you prefer to install everything on your system, you will need the following:

- [preCICE](installation-overview.html) (check with running `precice-version` in a terminal)
- [preCICE Python bindings](installation-bindings-python.html):
  - Create a virtual environment: `python3 -m venv .venv && source .venv/bin/activate`. As long as the environment is active, you will see `(venv)` before your command prompt. You need to activate the venv in new terminal windows.
  - Install the bindings: `pip3 install pyprecice` (check with running `import precice` in a Python interpreter)
- matplotlib and numpy v1.x: In the same virtual environment, run `pip3 install matplotlib numpy==1.26.4`
- [ParaView](https://www.paraview.org/) (visualization, used in most modules apart from the basics)

The tools module also needs (all optional):

- [preCICE config visualizer](tooling-config-visualization.html) (check with running `precice-config-visualizer --help`)
  - Optionally, install the `precice-config-visualizer-gui` as well.
- [gnuplot](http://gnuplot.info/) (check with `gnuplot --help`)

The implicit coupling module also needs:

- OpenFOAM (openfoam.com): See the [Quickstart](quickstart.html) page (check with running `buoyantPimpleFoam -help`)
- [OpenFOAM-preCICE](adapter-openfoam-get.html) (check with running the Quickstart tutorial)
- Nutils (installed automatically when running)

The mapping module also needs:

- [ASTE](tooling-aste.html) (check by running `./precice-aste-run --help` from the ASTE build directory)

The FSI workflow module also needs:

- OpenFOAM (openfoam.com): See the [Quickstart](quickstart.html) page (check with running `pimpleFoam -help`)
- [OpenFOAM-preCICE](adapter-openfoam-get.html) (check with running the Quickstart tutorial)
- CalculiX and the [CalculiX adapter](https://precice.org/adapter-calculix-overview.html) (check by running `ccx_preCICE`)
- [FreeCAD](https://www.freecad.org/) 0.21 or later (check by starting the GUI)
- [ccx2paraview](https://github.com/calculix/ccx2paraview) (`pip3 install ccx2paraview`, check by starting a Python terminal and executing `import ccx2paraview`)
- [PyFoam](https://pypi.org/project/PyFoam/) (`pip3 install pyfoam`, check by running `pyFoamPlotWatcher.py --help`)

The macro-micro coupling module also needs:

- A C++ compiler (for example, g++ or clang++)
- [Micro Manager](tooling-micro-manager-overview.html) (`pip3 install micro-manager-precice`, check by running `micro-manager-precice -h`)
- [pybind11](https://pybind11.readthedocs.io/en/stable/index.html) (v3 or later, install on Ubuntu with `apt install python3-pybind11`, check with `pybind11-config --includes --extension-suffix`)
