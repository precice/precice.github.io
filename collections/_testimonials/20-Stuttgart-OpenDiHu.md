---
title: "Coupling mechanics and electrophysiology in skeletal muscles"
author: "Benjamin Maier and David Schneider"
author_link: "https://www.ipvs.uni-stuttgart.de/institute/team/Maier-00024/"
organisation: "Simulation of Large Systems, University of Stuttgart, Germany"
organisation_link: https://www.ipvs.uni-stuttgart.de/departments/sgs/
img: testimonial-stuttgart-opendihu.png
---
In our project "[Towards a digital human](https://ipvs.informatik.uni-stuttgart.de/SGS/digital_human/index.php)", we improve the understanding of the neuromuscular system by simulating multi-scale models of skeletal muscles with realistic resolutions on HPC clusters. In particular, we implemented a complete biophysical multi-scale model of the neuromuscular system in our open-source software [OpenDiHu](https://github.com/maierbn/opendihu). We simulate biochemical processes of subcellular force generation (0D), muscle fiber activation (1D) as well as electric conduction in the extracellular space (3D). In order to additionally take muscle contraction into account, we apply volume coupling between the finely resolved 3D electromyography model, which computes muscle activation, and a coarse 3D solid mechanics solver, which computes the muscle deformation. Using preCICE, we are able to simulate the respective highly resolved scenarios with 100 million degrees of freedom on more than 9,000 cores on the supercomputer Hawk at the High Performance Computing Center Stuttgart.
Furthermore, preCICE helps us to numerically couple multiple mechanical models with different materials, e.g., the biceps brachii muscle and its tendons. Using preCICE, our code is envisioned to become a building block in combination with other external solvers within a comprehensive "digital human model".
[Learn more](https://upcommons.upc.edu/handle/2117/190149)
