---
title: "FSI coupling between OpenFOAM and MBDyn of a cycloidal rotor"
author: "Julian Schließus and Louis Gagnon"
author_link: "http://louisgagnon.com/"
organisation: "Institute of Aerodynamics and Gas Dynamics, University of Stuttgart, Germany"
organisation_link: "https://www.iag.uni-stuttgart.de/en/"
img: testimonial-stuttgart-cyclorotor.jpg
---
In this project a FSI coupling was established to investigate the influence of rotor blade deformation of cycloidal rotors and its effect on the rotor efficiency.
The preCICE OpenFOAM adapter uses the pointDisplacement function of OpenFOAM to couple motion data. However, simulating rotating bodies of a cyclorotor is not yet possible with this approach in OpenFOAM. Therefore an additional OpenFOAM class was added to couple the rotation motion directly from the MBDyn adapter to OpenFOAM.

The results have also been presented at the HPC-Asia 2022 MMCP workshop ([abstract](http://louisgagnon.com/articlesScientifiques/Schliessus2022_MMCP22.pdf)).
A dataset of the simulation results including the base case setup can be found here:
Schließus, Julian and Gagnon, Louis, Data for: Create a Fluid-Structure Simulation Framework for Cycloidal Rotors, DaRUS, 2022, [https://doi.org/10.18419/darus-2232](https://doi.org/10.18419/darus-2232)
