---
title: "Fluid-structure interaction of inflatable wing sections"
author: "Mikko Folkersma"
author_link: "https://www.researchgate.net/profile/Mikko-Folkersma"
organisation: "Wind Energy, Faculty of Aerospace Engineering, TU Delft, The Netherlands"
organisation_link:
img: testimonial-delft-wind-energy.jpg
---
Airborne wind energy is a novel renewable energy technology using tethered wings to harness wind energy at higher altitudes and with less material. At TU Delft, we are investigating the aerodynamics of inflatable membrane wings which are highly flexible and therefore exhibit a strong coupling between fluid and structure. In our fluid-structure interaction (FSI) simulation framework, we use OpenFOAM to calculate the aerodynamic load distribution on the wing and mem4py or, alternatively, MBDyn to calculate the structural deformation. We use preCICE to couple the solvers and implemented the preCICE adapters in Python for mem4py and MBDyn. Thanks to preCICE, we achieved accurate, stable and efficient fluid-structure coupling with a small piece of code (less than 100 lines).
