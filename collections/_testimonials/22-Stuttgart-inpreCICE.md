---
title: "In-situ data visualization for visual data comparison"
author: "Alexander Jaust"
author_link: "https://www.ipvs.uni-stuttgart.de/institute/team/Jaust-00001/"
organisation: "SFB1313, University of Stuttgart, Germany"
organisation_link: https://www.sfb1313.uni-stuttgart.de/
img: testimonial-stuttgart-inprecice.png
---
One big challenge when working with (simulation) data is the visual comparison of data that stems from different sources. For simulations, this may be data that stems from different software packages and different discretizations. This occurs when one carries out a benchmark study as in [Berre et al.](https://doi.org/10.1016/j.advwatres.2020.103759), for example. The different approaches for solving the same problem usually lead to different types of output file formats and output meshes where information is stored at different locations. Therefore, the members of project area D of the [CRC1313](https://www.sfb1313.uni-stuttgart.de/) investigate how preCICE's capabilities can be used to visualize solutions on a predefined reference mesh. In the current prototype, data from a [DuMuX](https://dumux.org/) simulation is transferred and mapped to the reference mesh via preCICE to be visualized by [inpreCICE](https://github.com/SteScheller/inpreCICE). This allows for in-situ visualizations and free choice of the visualization mesh independent of the actual mesh used in the simulation.
[Learn more](https://www.sfb1313.uni-stuttgart.de/project-structure/project-area-d/)