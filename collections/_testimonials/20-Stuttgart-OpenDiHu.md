---
title: "Coupling free and porous-medium flow"
author: "Benjamin Maier"
author_link: "https://www.ipvs.uni-stuttgart.de/institute/team/Maier-00024/"
organisation: "Simulation of Large Systems, University of Stuttgart, Germany"
organisation_link: https://www.ipvs.uni-stuttgart.de/departments/sgs/
img: testimonial-stuttgart-opendihu.png
---
In our project "[Towards a digital human](https://ipvs.informatik.uni-stuttgart.de/SGS/digital_human/index.php)", we improve the understanding of the neuromuscular system by simulating realistic sized multi-scale models on HPC clusters. In particular, we implemented a complete biophysical multi-scale model of the neuromuscular system in our open-source software [OpenDiHu](https://github.com/maierbn/opendihu), simulating biochemical processes of the subcellular force generation (0D), muscle fiber activation (1D) as well as electric conduction in the extracellular space (3D). In order to take additionally the muscle contraction into account, we apply a volume coupling between the finely resolved 3D electromyographical model, computing the muscle activation, and a coarse 3D solid mechanic solver, computing the muslce deformation. Using preCICE, we are able to simulate respective highly resolved scenarios with 50 million degrees of freedom on more than 4,000 cores on the supercomputer Hawk at the High Performance Computing Center Stuttgart.
[Learn more](https://upcommons.upc.edu/handle/2117/190149)

