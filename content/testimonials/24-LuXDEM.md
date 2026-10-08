---
title: "Evaluation of erosion phenomena in a nozzle for Abrasive Water Jet Cutting"
author: "Prasad Adhav"
author_link: "https://luxdem.uni.lu/team/padhav/"
organisation: "LuXDEM, University of Luxembourg"
organisation_link: "https://luxdem.uni.lu/index.html"
img: testimonial-24-LuXDEM.png
---
In an Abrasive Water Jet Cutting (AWJC) operation, a high-speed water jet is used to accelerate abrasive particles forming a turbulent mixture of water, entrained air, and abrasive powders traveling at hundreds of meters per second. The focusing tube (Nozzle) represents a key component, whose primary scope is to focus and stabilize the flow forming in the mixing chamber, in order to ensure optimal cutting performances of the device. Nevertheless, this nozzle often happens to be the first target of the erosive action of the flow. This phenomenon significantly shortens the operational life of a nozzle. The numerical approach proposed in this work aims to provide an insight to this very fast and disruptive phenomena that is difficult and expensive to be captured by purely experimental studies.

Such state of the art numerical models have only been able to capture erosion through number of impacts, and do not account for the impact forces. In our prototype, we couple three single-physics black-box numerical solvers to create a multiphysics simulation environment. Our prototype uses preCICE to couple the three numerical solvers: XDEM (for the particle motion), OpenFOAM (for the water jet and entrained air), and CalculiX (for the nozzle deformation). This six-way coupling between DEM+CFD+FEM brings the simulation of the particle-laden multiphase flow inside the abrasive cutting nozzle close to real-life conditions -- thus, opening up opportunities for further investigation and improvement of the nozzle design. [Learn more](https://luxdem.uni.lu/research/nozzle_erosion/)
