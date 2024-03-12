---
title: preCICE training
keywords: workshop, teaching, support, api, implicit coupling, tools, data mapping, training
summary: A hands-on introduction to preCICE, recommended for new users that want to learn how to couple their own codes and beyond.
permalink: community-training.html
toc: true
---

## About the course

Since, 2020, we have been developing a dedicated training course on preCICE. Originally conceptualized for beginners, more and more content for advanced users has been added. We regularly give the complete course at the preCICE workshops ([next workshop in Stuttgart in September 2024](precice-workshop-2024.html)) and parts of it at various different occasions (for example as a [minitutorial at SIAM CSE 2023](https://meetings.siam.org/sess/dsp_programsess.cfm?SESSIONCODE=77168). We also offer to give private and bespoke versions of the course through the [preCICE support program](community-support-precice.html). Please note that the material of the course is not distributed with a FOSS license, in contrast to almost everything else we do.

## Teaching concept

The course is organized in separate modules, which can be combined in various different ways. Each module typically takes 120 to 150 minutes to complete. We start each module with a short presentation explaining some background and giving an overview of the tasks. Then, students work on the tasks in a hands-on fashion individually or in groups. Questions are answered individually by typically several instructors. We close each module by discussing solution approaches and open problems all together. We recommend using the [preCICE Demo Virtual Machine](installation-vm.html) to follow the tasks. The actual course material is distributed via download links.

## Content

The course currently consists of four modules. Several more will follow.

### Basics

We couple two simple Python codes, discussing the basic methods of the preCICE API.

### Tools

We take a tour over available tools to configure, understand, and post-process preCICE simulations. More specifically, we have a look at the preCICE logger, config visualizer, mesh exports, and watchpoints of preCICE. We also discuss common tips for visualizing partitioned simulations in ParaView.

### Implicit coupling

We use a conjugate heat conduction scenario coupling OpenFOAM with Nutils to study implicit coupling including acceleration methods.

### Data mapping

We explore aspects of accuracy and efficiency in data mapping, using [ASTE](tooling-aste.html).
