---
title: preCICE training
keywords: workshop, teaching, support, api, implicit coupling, tools, data mapping, training
summary: A hands-on introduction to preCICE, recommended for new users that want to learn how to couple their own codes and beyond.
permalink: community-training.html
toc: true
---

## About the course

Since 2020, we have been developing a dedicated training course on preCICE. Originally conceptualized for beginners, more and more content for advanced users has been added. We regularly give the complete course at the preCICE workshops ([next workshop in Stuttgart in September 2024](precice-workshop-2024.html)) and parts of it at various different occasions (for example as a [minitutorial at SIAM CSE 2023](https://meetings.siam.org/sess/dsp_programsess.cfm?SESSIONCODE=77168). We also offer to give private and bespoke versions of the course through the [preCICE support program](community-support-precice.html). Please note that the material of the course is not distributed with a FOSS license, in contrast to almost everything else we do.

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

## How to prepare?

In our training courses, we typically bring along some Ubuntu Live USB sticks with all the dependencies pre-installed. They should work on any laptop with an x86 CPU, as long as you have the rights to boot from USB. In particular, these do not work on Apple silicon systems.

In case you would like something more permanent, but still with low setup effort, you can download the  [preCICE Demo Virtual Machine](installation-vm.html). Note that downloading this will take a while, so better prepare this early enough.

Finally, in case you prefer to install everything in your laptop, you will need the following:

- [preCICE](installation-overview.html)
- [preCICE Python bindings](installation-bindings-python.html): `pip3 install --user pyprecice`
- matplotlib: `pip3 install --user matplotlib`
- [ParaView](https://www.paraview.org/) (visualization, used in most modules apart from the basics)

The tools module also needs (all optional):

- [preCICE config visualizer](tooling-config-visualization.html)
- [gnuplot](http://gnuplot.info/)

The implicit coupling module also needs:

- OpenFOAM (openfoam.com): See the [Quickstart](quickstart.html) page.
- [OpenFOAM-preCICE](adapter-openfoam-get.html)
- Nutils: `pip3 install --user nutils`

The mapping module also needs:

- [ASTE](tooling-aste.html)
