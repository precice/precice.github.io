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

The course is organized in separate modules, which can be combined in various different ways. Each module typically takes 120 to 150 minutes to complete. We start each module with a short presentation explaining some background and giving an overview of the tasks. Then, students work on the tasks in a hands-on fashion, individually or in groups. Questions are answered individually by typically several instructors. We close each module by discussing solution approaches and open problems all together. We recommend using the [preCICE Demo Virtual Machine](installation-vm.html) to follow the tasks. The actual course material is tailored to the needs of each event and distributed via download links.

## Content

The course currently consists of four modules. Several more will follow.

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

## How to prepare?

On the technical side, the training course involves multiple components of the preCICE ecosystem, as well as third-party solvers and pre- and post-processing tools.
Most of these tools work best (or only) on a Linux system.
You can either (a) use a prepared system image that we provide (e.g., in a virtual machine), or (b) install the dependencies directly on your system.
To reduce system-related friction during the training, we recommend starting with option (a).

{% important %}
At the end, verify your installation, and contact us as soon as possible regarding any issues.
Find verification instructions at the end of each section.
{% endimportant %}

### Provided system

We have prepared a [modified Ubuntu image](https://ipvscloud.informatik.uni-stuttgart.de/s/tzFbZ8zsrRNM9z2) that includes all the tools we will use (different from the demo VM).
With this `.iso` file, you can either:

- prepare a virtual machin (VM), e.g., using [VirtualBox](https://www.virtualbox.org/)
- create a bootable USB stick, e.g., using [Etcher](https://etcher.balena.io/), and use your system directly

In both cases, you can either install the modified Ubuntu image, or try a live session, without any permanent changes (or result file saves) to your system.
Get the smoothest experience by installing the image in a VM, so that your changes are saved between sessions, and you can at the same time access your host OS.

{% note %}
At the moment, this image is only available for Intel/AMD x86-64 CPUs.
In our on-site trainings, some prepared USB sticks are provided.
These should work on any laptop with an x86-64 CPU, as long as you have the rights to boot from USB. In particular, these do not work on Apple Silicon systems.
{% endnote %}

Configure the VM with these settings:

- At least 8GB of RAM (the system will not load with 4GB in the "try" mode).
- Ideally, four logical CPU cores (one is also fine).
- At least 64MB of video RAM (more -> smoother graphics).
- At least 25GB of storage.

For VirtualBox, find these settings under the `System`, `Display`, and `Storage` categories.

Further important settings:

- The OpenFOAM adapter is installed under `~/OpenFOAM/ubuntu-v2406`. If you install (not "try" in a live session), move that directory to your user: `cd ~/OpenFOAM/ && mv ubuntu-v2406/ $USER-v2406`.
- Set your keyboard layout: In the Ubuntu applications menu, type "keyboard layout". Select "Add input source". Remove the default one.

**Optional:** If you choose to install the image in a VM, you probably want to better integrate it with your host system. For VirtualBox, you need to [install the Guest Additions](https://www.virtualbox.org/manual/ch04.html) and set up a [shared folder](https://www.virtualbox.org/manual/ch04.html#sharedfolders):

1. Devices > Insert Guest Additions CD Image
2. Navigate to the CD
3. Execute `autorun.sh` and give your password
4. It automatically installs the Guest Additions. Press Enter to exit at the end.
5. Set up a shared folder: Devices > Shared Folders > Shared Folders settings... > Add
6. Folder Path: folder in your host system
7. Mount point: Where to find the folder in the VM system. For example, `/mnt/training`.
8. Select "Auto-mount" and "Make Permanent"
9. Inside the VM, execute `sudo adduser $USER vboxsf`
10. Restart the VM

To check your installation, run the [1D elastic tube tutorial](tutorials-elastic-tube-1d.html) (Python solvers) inside the VM.

### Individual dependencies

In case you prefer to install everything on your system, you will need the following:

- [preCICE](installation-overview.html)
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
