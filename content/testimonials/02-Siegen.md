---
title: "Development of adapter-codes for multiphysical simulations"
author: "Dr.-Ing. Fettah Aldudak"
author_link: "https://www.mb.uni-siegen.de/lfst/index.html.en?lang=en"
organisation: "Chair of Fluid Mechanics, University of Siegen, Germany"
organisation_link:
img: testimonial-siegen.jpg
---
At the University of Siegen (LSM group), we are currently developing different adapter codes to run partitioned simulations using preCICE as the coupling interface.
In a first step, we coupled two solvers within the frameworks of deal.
II and OpenFOAM (foam-extend) to simulate conjugate heat transfer problems.
In a second project, a structural solver based on deal.
II was coupled with an OpenFOAM solver, capable of handling dynamic mesh movement for FSI simulations.
preCICE offers sophisticated post-processing methods, which considerably improved the convergence and stability of our implicitly coupled system.
Additionally, the capability of peer-to-peer communication in case of parallel simulations was a reason to choose preCICE.
From our point of view, preCICE proved to be a very promising and efficient coupling strategy supported by a committed community of users and a dedicated developer team.
For the future, we would like to further improve our self-written adapters as well as test and integrate available adapters.
