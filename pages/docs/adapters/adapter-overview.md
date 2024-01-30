---
title: Overview of adapters
permalink: adapters-overview.html
keywords: adapter, adapters, adapter overview, adapter introduction
redirect_from: /codes/
---

There are various codes - free and proprietary ones - currently coupled with preCICE. If you want to add your code here, please let us know.

## Official adapters

We host adapters for the following codes in the [preCICE GitHub organization](https://github.com/precice/) and we maintain them to work with the latest release of preCICE (unless stated otherwise).

| Adapter for | Contact | Resources | Typical applications | Comments |
| [CalculiX](http://www.calculix.de/) | preCICE Developers | [code](https://github.com/precice/calculix-adapter), [docs](adapter-calculix-overview.html) | Structure part in CHT, FSI | |
| [code_aster](https://code-aster.org/) | preCICE Developers | [code](https://github.com/precice/code_aster-adapter), [docs](adapter-code_aster.html) | Structure part in CHT | |
| [deal.II](https://www.dealii.org/) | preCICE Developers | [code](https://github.com/precice/dealii-adapter), [docs](adapter-dealii-overview.html) | Structure part in FSI, any FEM | |
| [FEniCS](https://fenicsproject.org/) | preCICE Developers | [code](https://github.com/precice/fenics-adapter), [docs](adapter-fenics.html) | Structure part in CHT, FSI, any FEM | See also [FEniCS-X](https://github.com/precice/fenicsx-adapter) below (WIP) |
| [Nutils](http://www.nutils.org/) | preCICE Developers | [docs](adapter-nutils.html) | Structure part in CHT, any FEM | |
| [OpenFOAM](https://www.openfoam.com/) | preCICE Developers | [code](https://github.com/precice/openfoam-adapter), [docs](adapter-openfoam-overview.html) | Fluid part in CHT, FSI, FF | |
| [SU2](https://su2code.github.io/) | preCICE Developers | [code](https://github.com/precice/su2-adapter), [docs](adapter-su2-overview.html) | Fluid part in FSI | [Maintainer needed](https://github.com/precice/su2-adapter/issues/16) |

## Third-party adapters

The preCICE community has successfully coupled the following codes with preCICE for [community projects](community-projects.html).
Wherever meaningful (license, maturity of the project, no other home), we host the code repository.

| Adapter for   | Contact | Resources | Typical applications | Comments |
| [Alya](https://www.bsc.es/research-development/research-areas/engineering-simulations/alya-high-performance-computational) | [TUM SCCS](https://www.in.tum.de/en/i05/) | | Fluid and structure part in FSI | Not actively maintained (but not abandoned) |
| [Ansys Fluent](https://www.ansys.com/products/fluids/ansys-fluent) | preCICE Developers | [code](https://github.com/precice/fluent-adapter), [docs](https://github.com/precice/fluent-adapter/wiki) | Fluid part in FSI | Experimental |
| [Ateles (APES)](https://apes.osdn.io/pages/ateles) | [Univ. Siegen STS](https://www.mb.uni-siegen.de/sts/index.html) | [code](https://osdn.net/projects/apes/scm/hg/ateles) | Fluid-Acousting, Fluid-Fluid coupling | |
| [COMSOL Multiphysics](https://www.comsol.com/comsol-multiphysics) | preCICE Developers | [code](https://github.com/precice/comsol-adapter) | Structure part in FSI | Currently not maintained |
| [DuMuX](https://dumux.org/) | [Alexander Jaust, University of Stuttgart](https://www.ipvs.uni-stuttgart.de/institute/team/Jaust-00001/) | [code](https://github.com/precice/dumux-adapter) | Free flow and porous-medium flow | Currently only coupled DuMuX to DuMuX. Feedback appreciated. |
| [DUNE](https://dune-project.org/) | [Max Firmbach, UniBW M](https://www.unibw.de/imcs/team/firmbach) | [Thesis](https://mediatum.ub.tum.de/node?id=1609293), [code](https://github.com/precice/dune-adapter) | Structure part in FSI | |
| [DUNE-Fem](https://www.dune-project.org/sphinx/content/sphinx/dune-fem/) | [Niklas Kotarsky, Lund University](https://www.lunduniversity.lu.se/lucat/user/9a5a021777b3e7cb0b8aea7ee9094808) | [coupled example code](https://github.com/precice/tutorials/tree/develop/flow-over-heated-plate/solid-dunefem) | Structure part in CHT, any FEM | |
| [Elmer FEM](https://www.elmerfem.org/) | [Benjamin Rodenberg, TUM](https://www.in.tum.de/i05/personen/personen/benjamin-rodenberg/) | [Thesis](https://mediatum.ub.tum.de/node?id=1636717), [code](https://github.com/precice/elmer-adapter) | Structure part in CHT, FSI, any FEM | looking for maintainers! |
| [ExaDG](https://github.com/exadg/exadg) | [David Schneider, US](https://www.ipvs.uni-stuttgart.de/institute/team/Schneider-00056/) | [code](https://github.com/exadg/exadg/tree/master/applications/fluid_structure_interaction/perpendicular_flap) | Fluid or Structure part in FSI | |
| [FASTEST](https://www.fnb.tu-darmstadt.de/forschung_fnb/software_fnb/software_fnb.en.jsp) | [TU Darmstadt FNB](https://www.fnb.tu-darmstadt.de/) | None | Fluid-Structure-Acoustics interaction | |
| [FEAP](http://projects.ce.berkeley.edu/feap/) | [TU Darmstadt FNB](https://www.fnb.tu-darmstadt.de/) | None | Structure part in FSI | |
| [FEniCS-X](https://fenicsproject.org/) | [Benjamin Rodenberg, TUM](https://www.in.tum.de/i05/personen/personen/benjamin-rodenberg/) | [code](https://github.com/precice/fenicsx-adapter) | Structure part in CHT, FSI, any FEM | looking for maintainers! |
| [G+Smo](https://gismo.github.io/) | [TU Delft Numerical Analysis](https://www.tudelft.nl/en/eemcs/the-faculty/departments/applied-mathematics/numerical-analysis/) | [code](https://github.com/gismo/gismo/tree/stable/extensions/gsPreCICE) | Structure part in CHT ||
| [LS-DYNA](http://www.lstc.com/products/ls-dyna) | [LKR](https://www.ait.ac.at/lkr) | [code example](https://github.com/precice/lsdyna-adapter) | Continuous metal casting process ||
| [MBDyn](https://www.mbdyn.org/) | [TU Delft Wind Energy](https://www.tudelft.nl/en/ae/organisation/departments/flow-physics-and-technology/wind-energy) | [code](https://github.com/precice/mbdyn-adapter) | Structure part in FSI ||
| [MBDyn](https://www.mbdyn.org/) | [Politecnico di Milano DAER](https://www.aero.polimi.it/) | [documentation](https://public.gitlab.polimi.it/DAER/mbdyn/-/wikis/preCICE-MBDyn-adapter), [code](https://gitlab.com/stilita/mbdyn-esm-adapter/) | Structure part in FSI ||
| [OpenFAST](https://openfast.readthedocs.io/en/main/) | [Leonard Willeke](https://github.com/LeonardWilleke), [TU Delft Wind Energy](https://www.tudelft.nl/en/ae/organisation/departments/flow-physics-and-technology/wind-energy) | [code](https://github.com/precice/openfast-adapter), [report](https://pure.tudelft.nl/ws/portalfiles/portal/175757249/willeke24-openfast-adapter.pdf) | Structure part in FSI | Experimental |
| [Palabos](https://palabos.unige.ch/) | [University of Stuttgart](https://www.ipvs.uni-stuttgart.de/institute/team/Davis/) | [code](https://github.com/KyleDavisSA/palabos) | Fluid-Structure interaction (Experimental) | |

## Legacy adapters

These adapters and/or the respective solvers are not maintained and might not work anymore, but are listed here as an example of which other projects have used preCICE in the past.

| Adapter for   | Contact | Resources | Typical applications | Comments |
| [Carat++](http://carat.st.bv.tum.de/) | [TUM Statik](https://www.bgu.tum.de/en/st/software/research/carat/) | None | Structure part of FSI | |
| [EFD](https://github.com/precice/efd) | [TUM SCCS](https://www.in.tum.de/en/i05/) | [code](https://github.com/precice/efd) | Fluid part of FSI | |
| [foam-extend](https://sourceforge.net/projects/foam-extend/) | [TU Delft Aerodynamics](https://www.tudelft.nl/index.php?id=4542&L=1) | [code](https://github.com/davidsblom/FOAM-FSI) | Fluid and structure part of FSI, Fluid-Fluid coupling | |
| [Peano](http://www.peano-framework.org/) | [Durham University](https://tobiasweinzierl.webspace.durham.ac.uk/) | None | Fluid part of FSI | |
