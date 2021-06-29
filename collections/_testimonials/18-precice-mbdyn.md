---
title: "FSI coupling with multibody dynamics"
author: "Claudio Caccia"
author_link: ""
organisation: " Department of Aerospace Science and Technology (DAER), Politecnico of Milan, Italy"
organisation_link: https://www.aero.polimi.it/
img: testimonial-precice-mbdyn.png
---
When Fluid Structure Interaction involves slender or flat structures, it is interesting to apply reduced dimensionalty models (e.g. shells, or beams) to perform such computations. We coupled [MBDyn](www.mbdyn.org) (an open source multibody dynamics software developed at Politecnico of Milan) to preCICE within a master thesis project, exploiting the C++ interface provided by MBDyn. We validated the set-up in the incompressible regime coupling MBDyn and OpenFOAM and comparing our results with the well-known Turek & Hron bechmarks, which proved to be challenging because of added mass instability issues, Some preliminary results can be found in this [master thesis](http://hdl.handle.net/10589/175517), while an extensive validation has been described [here](https://www.researchgate.net/publication/352642167_COUPLING_MULTI-BODY_AND_FLUID_DYNAMICS_ANALYSIS_WITH_PRECICE_AND_MBDYN)
[Learn more](https://public.gitlab.polimi.it/DAER/mbdyn/-/wikis/preCICE-MBDyn-adapter)
