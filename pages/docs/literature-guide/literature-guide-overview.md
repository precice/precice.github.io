---
title: Literature guide
permalink: literature-guide-overview.html
keywords: literature, papers, numerics
summary: "Theses and papers for theoretical background of preCICE"
---

Wherever the information in this documentation is not enough (in this case, [let us know](https://www.precice.org/resources/#contact)), you may find a wide spectrum of additional information in [publications](https://www.precice.org/publications/). This page will guide you through it.

## Starting points

* The main reference article for preCICE is [preCICE - A Fully Parallel Library for Multi-Physics Surface Coupling](http://www.sciencedirect.com/science/article/pii/S0045793016300974). This may not be the best introduction for new users because of its condensed form. A very good first reading is the dissertations of the core preCICE developers. 

* Bernhard Gatzhammer introduced preCICE in his dissertation [Efficient and Flexible Partitioned Simulation of Fluid-Structure Interactions](http://www5.in.tum.de/pub/Gatzhammer2014_preCICE.pdf) (2014). Chapters 1-4 give a detailed introduction of most of the preCICE features and are still valid to a large extend. Start here for an explanation of the different coupling schemes, of the different communication methods, or of the data mapping techniques. Note that the "Geometry Interface" has been removed and the "server mode" is deprecated.

* Benjamin Uekermann introduced inter- and intra-solver parallelization in his dissertation [Partitioned Fluid-Structure Interaction on Massively Parallel Systems](https://mediatum.ub.tum.de/doc/1320661/document.pdf) (2016). Chapter 2 gives a compact introduction to preCICE. Furthermore, read here especially for the parallel coupling schemes, which allow a simultaneous execution of multiple solvers (Chapter 3) and the realization of all main features on distributed data (Chapter 4).

## preCICE features

* **Coupling schemes** For an introduction to explicit and implicit coupling, as well as the various acceleration / post-processing techniques, have a look at the dissertations of Bernhard Gatzhammer (Sections 2.3 and 4.1) and Benjamin Uekermann (Chapter 3). 

* **Data mapping** For an introduction to the various techniques, have a look at the dissertations of Bernhard Gatzhammer (Sections 2.4 and 4.2) and Benjamin Uekermann (Section 4.3). For a more condensed overview of RBF mapping, see [Radial Basis Function Interpolation for Black-Box Multi-Physics Simulations](ftp://ftp.informatik.uni-stuttgart.de/pub/library/ncstrl.ustuttgart_fi/INPROC-2017-35/INPROC-2017-35.pdf)

* **Communication** For an introduction to the various techniques, have a look at the dissertation of Bernhard Gatzhammer (Section 4.3). Have a look also at the master's thesis of Alexander Shukaev: "[A Fully Parallel Process-to-Process Intercommunication Technique for preCICE](https://www5.in.tum.de/pub/Shukaev2015_MasterThesis.pdf)".

* **Time interpolation** This feature is currently under active development. Have a look at the publications, talks, and posters of [Benjamin Rüth](https://www5.in.tum.de/wiki/index.php/Benjamin_R%C3%BCth,_M.Sc._(hons)).

## Adapters

* For the official adapters for open-source solvers, an overview is given in ["Official preCICE Adapters for Standard Open-Source Solvers"](https://www.gacm2017.uni-stuttgart.de/registration/Upload/ExtendedAbstracts/ExtendedAbstract_0138.pdf) (2017).

* For the first implementation of the OpenFOAM, CalculiX, and Code_Aster adapters, have a look at Lucia Cheung Yau's Master's Thesis [Conjugate Heat Transfer with the Multiphysics Coupling Library preCICE](http://www5.in.tum.de/pub/Cheung2016_Thesis.pdf) (2016). Start here also for the physics of Conjugate Heat Transfer. The OpenFOAM adapter was then extended by Gerasimos Chourdakis in his Master's Thesis [A general OpenFOAM adapter for the coupling library preCICE](https://www5.in.tum.de/pub/Chourdakis2017_Thesis.pdf) (2017). Start here for the structure of the current OpenFOAM adapter. For the additional functionality to support mechanical FSI simulations, have a look at [Derek Risseeuw's thesis](http://resolver.tudelft.nl/uuid:70beddde-e870-4c62-9a2f-8758b4e49123).

* For the SU2 adapter, read Alexander Rusch's Bachelor's Thesis [Extending SU2 to Fluid-Structure Interaction via preCICE](http://www5.in.tum.de/pub/Rusch2016_BA.pdf) (2016). In this you can also find a quick introduction to Fluid-Structure Interaction.