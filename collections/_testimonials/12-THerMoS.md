---
title: "Simulation of temperatures on the moon with THerMoS"
author: "Matthias Killian"
author_link: "https://www.lrg.tum.de/en/lrt/institute/staff-old/killian-matthias/"
organisation: "Chair of Astronautics,  Technical University of Munich (TUM), Germany"
organisation_link:
img: testimonial-thermos.jpg
---
We are developing [THerMoS](https://www.lrg.tum.de/lrt/forschung/exploration-technologies/thermos/), a tool for simulation of temperatures on the surface of the Moon including rovers and astronauts operating on the lunar surface. Ray tracing on a single or multiple GPUs with NVIDIA Optix calculates the heat transfer by radiation between surface elements, while a MATLAB routine solves the equation of heat diffusion. preCICE couples the two domains and handles the communication between MATLAB and NVIDIA Optix. Other solvers and simulation approaches (instead of MATLAB and NVIDIA Optix) are going to be tested in the future with the aid of the flexibility that preCICE offers. [Learn more](https://congress.cimne.com/coupled2019/admin/files/fileabstract/a180.pdf)
