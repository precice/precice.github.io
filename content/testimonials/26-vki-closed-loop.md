---
title: "Closed-loop natural convection flow in deformed bundles"
author: "Matilde Fiore, PhD"
author_link: "mailto:matilde.fiore@vki.ac.be"
organisation: "Von Karman Institute for Fluid Dynamics, Belgium"
organisation_link: "https://www.vki.ac.be/"
img: testimonial-26-vki-closed-loop.png
---
Deformation of fuel pins in the core of nuclear reactors is the result of several concurrent phenomena and directly affects the peak temperatures reached in the cladding layers. In forced-convection regimes, the excess temperature induced by pin deformations can be reasonably estimated through numerical simulations that focus only on the active region of the assembly. Simulations of fuel bundles under natural convection are significantly more challenging, as the entire primary loop must be resolved in order to accurately capture buoyancy-driven flow dynamics. As the computational domain increases in size, mesh generation becomes increasingly demanding: it is necessary to limit the total number of cells while preserving good mesh quality and appropriately handling transition regions between zones of high and low spatial resolution.

Using preCICE, we simplified the meshing process by partitioning the full domain into two subdomains: the active region of the bundle and the remaining part of the loop. The two subdomains have very different resolution and mesh structure (structured vs unstructured) and are handled by different solvers (chtMultiRegionFoam and buoyantPimpleFoam for the bundle and the loop, respectively). At the two shared interfaces we used custom boundary conditions and exchange derived fields, enabling a consistent, pressure-driven flow across the coupled domains.
