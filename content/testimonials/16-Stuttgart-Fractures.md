---
title: "Hybrid-dimensional coupling for flow in deformable fractures"
author: "Patrick Schmidt"
author_link: "https://www.mib.uni-stuttgart.de/en/institute/team/Schmidt-00066/"
organisation: "Institute of Applied Mechanics (CE), University of Stuttgart, Germany"
organisation_link: https://www.mib.uni-stuttgart.de/en/institute/team/
img: testimonial-stuttgart-fractures.png
---
Simulating flow in deformable fractures embedded in a porous medium is a challenging numerical task, especially when the aspect ratio of the fracture is large (length >> aperture).  We respect this in our model by using a hybrid-dimensional formulation to reduce the flow problem’s dimension. Discretization of the model is done in [FEniCS](https://fenicsproject.org/) as it is easy to use through its Python interface. preCICE allows us to couple our codes nicely due to the available Python bindings. Additionally, the architecture of preCICE allows us to immediately use FEniCS’ parallel computing capabilities which are mandatory for large scale simulation.
[Learn more](https://doi.org/10.1007/s10596-021-10120-8)
