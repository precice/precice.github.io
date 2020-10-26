---
title: Literature Guide
permalink: literature-guide-starting-points.html
keywords: literature, papers, numerics
---

* The main reference article for preCICE is [preCICE - A Fully Parallel Library for Multi-Physics Surface Coupling](http://www.sciencedirect.com/science/article/pii/S0045793016300974). This may not be the best introduction for new users because of its condensed form. A very good first reading is the dissertations of the core preCICE developers. 

* Bernhard Gatzhammer introduced preCICE in his dissertation [Efficient and Flexible Partitioned Simulation of Fluid-Structure Interactions](http://www5.in.tum.de/pub/Gatzhammer2014_preCICE.pdf) (2014). Chapters 1-4 give a detailed introduction of most of the preCICE features and are still valid to a large extend. Start here for an explanation of the different coupling schemes, of the different communication methods, or of the data mapping techniques. Note that the "Geometry Interface" has been removed and the "server mode" is deprecated.

* Benjamin Uekermann introduced inter- and intra-solver parallelization in his dissertation [Partitioned Fluid-Structure Interaction on Massively Parallel Systems](https://mediatum.ub.tum.de/doc/1320661/document.pdf) (2016). Chapter 2 gives a compact introduction to preCICE. Furthermore, read here especially for the parallel coupling schemes, which allow a simultaneous execution of multiple solvers (Chapter 3) and the realization of all main features on distributed data (Chapter 4).