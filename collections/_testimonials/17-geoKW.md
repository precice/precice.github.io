---
title: "Optimization of thermal groundwater heat pump usage in Munich"
author: "Fabian Boettcher"
author_link: "https://www.bgu.tum.de/hydro/team/personal-detail/boettcher/"
organisation: "Chair of Hydrogeology, Technical University of Munich, Germany"
organisation_link: https://www.bgu.tum.de/hydro/team/
img: testimonial-geokw.png
---
The GEO.KW project aims to improve the efficiency of thermal groundwater use in urban environments. Careful placement and usage of groundwater heat pumps is critical for optimal use of the shallow subsurface. An optimization tool is being developed that couples a subsurface flow solver ([PFLOTRAN](https://www.pflotran.org/) ) with an energy system optimization solver, ([urbs](https://github.com/tum-ens/urbs) ). This presents a unique coupling problem, where completely different physics are involved in each solver. We use preCICE as it already has the required coupling schemes, acceleration schemes, and parallel communication and data mapping. We saved time by using the functionality already available in preCICE for software coupling, allowing us to focus on our models and not reinventing the "coupling" wheel. [Learn more](https://www.bgu.tum.de/hydro/projects/geokw/)
