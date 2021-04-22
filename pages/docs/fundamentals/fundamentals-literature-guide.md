---
title: Literature guide
permalink: fundamentals-literature-guide.html
keywords: literature, papers, numerics, hpc
summary: "A guide to the main reference literature for each component and feature of preCICE"
---

Wherever the information in this documentation is not enough (in this case, [let us know](https://www.precice.org/community-channels.html)), you may find a wide spectrum of additional information in [publications](https://www.precice.org/publications.html). This page will guide you through it.

## Starting points

* The main reference article for preCICE is [preCICE - A Fully Parallel Library for Multi-Physics Surface Coupling](http://www.sciencedirect.com/science/article/pii/S0045793016300974). This may not be the best introduction for new users because of its condensed form. A very good first reading is the dissertations of the core preCICE developers.

* Bernhard Gatzhammer introduced preCICE in his dissertation [Efficient and Flexible Partitioned Simulation of Fluid-Structure Interactions](http://www5.in.tum.de/pub/Gatzhammer2014_preCICE.pdf) (2014). Chapters 1-4 give a detailed introduction of most of the preCICE features and are still valid to a large extend. Start here for an explanation of the different coupling schemes, of the different communication methods, or of the data mapping techniques. Note that the "geometry interface" and "server mode" features have been removed.

* Benjamin Uekermann introduced inter- and intra-solver parallelization in his dissertation [Partitioned Fluid-Structure Interaction on Massively Parallel Systems](https://mediatum.ub.tum.de/doc/1320661/document.pdf) (2016). Chapter 2 gives a compact introduction to preCICE. Furthermore, read here especially for the parallel coupling schemes, which allow a simultaneous execution of multiple solvers (Chapter 3) and the realization of all main features on distributed data (Chapter 4).

The list of completed dissertations also includes:

* Klaudius Scheufele: [Coupling schemes and inexact Newton for multi-physics and coupled optimization problems.](ftp://ftp.informatik.uni-stuttgart.de/pub/library/ncstrl.ustuttgart_fi/DIS-2019-01/DIS-2019-01.pdf) (2018)

* Florian Lindner: [Data Transfer in Partitioned Multi-Physics Simulations: Interpolation & Communication](https://elib.uni-stuttgart.de/bitstream/11682/10598/3/Lindner%20-%20Data%20Transfer%20in%20Partitioned%20Multi-Physics%20Simulations.pdf) (2019)

and the story continues by the [current team](about.html).

## preCICE features

* **Coupling schemes** For an introduction to explicit and implicit coupling, as well as the various acceleration / post-processing techniques, have a look at the dissertations of Bernhard Gatzhammer (Sections 2.3 and 4.1) and Benjamin Uekermann (Chapter 3).

* **Data mapping** For an introduction to the various techniques, have a look at the dissertations of Bernhard Gatzhammer (Sections 2.4 and 4.2) and Benjamin Uekermann (Section 4.3). For a more condensed overview of RBF mapping, see [Radial Basis Function Interpolation for Black-Box Multi-Physics Simulations](ftp://ftp.informatik.uni-stuttgart.de/pub/library/ncstrl.ustuttgart_fi/INPROC-2017-35/INPROC-2017-35.pdf)

* **Communication** For an introduction to the various techniques, have a look at the dissertation of Bernhard Gatzhammer (Section 4.3). Have a look also at the master's thesis of Alexander Shukaev: "[A Fully Parallel Process-to-Process Intercommunication Technique for preCICE](https://www5.in.tum.de/pub/Shukaev2015_MasterThesis.pdf)".

* **Time interpolation** This feature is currently under active development. Have a look at the publications, talks, and posters of [Benjamin Rodenberg](https://www.in.tum.de/en/i05/people/personen/benjamin-rueth/).

## High-performance computing

* The initial effort for parallelization of preCICE is documented in [Partitioned Fluid-Structure-Acoustics Interaction on Distributed Data: Coupling via preCICE](https://link.springer.com/chapter/10.1007/978-3-319-40528-5_11) (2016).
* Further steps to speed up initialization are documented in [ExaFSA: Parallel Fluid-Structure-Acoustic Simulation](https://library.oapen.org/bitstream/handle/20.500.12657/41289/2020_Book_SoftwareForExascaleComputing-S.pdf?sequence=1#page=278) (2020).
* More details can be found in [Benjamin's thesis](https://mediatum.ub.tum.de/doc/1320661/document.pdf) (2016), [Florian's thesis](https://elib.uni-stuttgart.de/bitstream/11682/10598/3/Lindner%20-%20Data%20Transfer%20in%20Partitioned%20Multi-Physics%20Simulations.pdf) (2019), and [Klaudius' thesis](ftp://ftp.informatik.uni-stuttgart.de/pub/library/ncstrl.ustuttgart_fi/DIS-2019-01/DIS-2019-01.pdf) (2019).

## Adapters

* For the official adapters for open-source solvers, an overview is given in ["Official preCICE Adapters for Standard Open-Source Solvers"](https://www.gacm2017.uni-stuttgart.de/registration/Upload/ExtendedAbstracts/ExtendedAbstract_0138.pdf) (2017).

* For the first implementation of the OpenFOAM, CalculiX, and Code_Aster adapters, have a look at Lucia Cheung Yau's Master's Thesis [Conjugate Heat Transfer with the Multiphysics Coupling Library preCICE](http://www5.in.tum.de/pub/Cheung2016_Thesis.pdf) (2016). Start here also for the physics of Conjugate Heat Transfer. The OpenFOAM adapter was then extended by Gerasimos Chourdakis in his Master's Thesis [A general OpenFOAM adapter for the coupling library preCICE](https://www5.in.tum.de/pub/Chourdakis2017_Thesis.pdf) (2017). Start here for the structure of the current OpenFOAM adapter. For the additional functionality to support mechanical FSI simulations, have a look at [Derek Risseeuw's thesis](http://resolver.tudelft.nl/uuid:70beddde-e870-4c62-9a2f-8758b4e49123).

* For the SU2 adapter, read Alexander Rusch's Bachelor's Thesis [Extending SU2 to Fluid-Structure Interaction via preCICE](http://www5.in.tum.de/pub/Rusch2016_BA.pdf) (2016). In this you can also find a quick introduction to Fluid-Structure Interaction.
