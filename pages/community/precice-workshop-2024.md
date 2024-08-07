---
title: preCICE workshop 2024
keywords: precice workshop 2024, event, events, workshop
summary:
permalink: precice-workshop-2024.html
toc: true
redirect_from: /preCICE2024/
---

<img class="img-responsive center-block" src="images/events/precice2024.svg" alt="preCICE Workshop banner" style="max-width: 500px; width: 100%; margin:auto;">

The 5th preCICE Workshop will be held at the [University of Stuttgart](https://www.uni-stuttgart.de/), together with [SimTech](https://www.simtech.uni-stuttgart.de/), on September 24-27, 2024. The workshop is a coming together of the preCICE community to share ideas, experiences and knowledge about using preCICE, and to learn from others in the process. Like always, we plan to have user and developer talks, hands-on training sessions, discussions with the developers about your applications and use cases, and plenty of opportunities for networking. Besides, this year we will organize a preCICE poster session for the first time!

The workshop will start with a hands-on training course on September 24-25. The [course](https://precice.org/community-training.html) is suited for both beginners and current preCICE users, since advanced topics will also be covered. The main part of the workshop will take place on September 25-27.

Keep watching this space for updates on registration, the workshop program, and more.

## Important dates

| Abstract submission deadline | **June 30** (extended until July 7) |
| Early-bird registration deadline | **July 15**  |
| Registration deadline | **September 15** |

## Program

Next you find the preliminary program for the workshop. More details will be added in the next weeks, stayed tuned!

The cost of lunch, as well as coffee and snacks is included in the registration fee. The same applies for the invited dinner.

### Course

#### Tuesday, September 24

- 08:30-09:00: 🥨 Registration and coffee
- 09:00-12:00: preCICE course, part 1 & 2
- 12:00-13:00: 🍲 Lunch
- 13:00-15:00: preCICE course, part 3
- 15:00-15:30: ☕️ Coffee break
- 15:30-17:30: preCICE course, part 4

#### Wednesday, September 25

- 08:30-09:00: 🥨 Coffee
- 09:00-09:30: Wrap-up course parts 1-4
- 09:30-12:00: preCICE course, part 5<br/>
  <details class="workshop-event" id="course-caccia">
    <summary>
      Setting up a fluid-structure interaction simulation with CalculiX and OpenFOAM.<br/>
      <p><a href="https://www.aero.polimi.it/index.php?id=263&uid=28451&L=0">Claudio Caccia</a>, Politecnico di Milano, Italy</p>
    </summary>
  </details>

### Main workshop

#### Wednesday; September 25

- 12:00-13:30: 🍲 Registration and lunch
- 13:30-15:00: Official welcome + user introductions
- 15:00-15:30: ☕️ Coffee break
- 15:30-17:00: What's new in preCICE?<br/>
  <details class="workshop-event" id="talk-v3">
    <summary>
      Overview on preCICE v3<br/>
      <p><a href="https://www.ipvs.uni-stuttgart.de/institute/team/Simonis/">Frédéric Simonis</a> (<a href="https://github.com/fsimonis">@fsimonis</a>), University of Stuttgart, Germany</p>
    </summary>
    <p>Version 3 of the preCICE library has arrived and brings a wide range of changes, improvements, and additional features. This talk aims to give a general overview of what has changed and what is being worked on.</p>
  </details>
- 17:00-18:00: User talks
  <details class="workshop-event" id="talk-wu">
    <summary>
      A new adapter of the weather numeric prediction software Weather Research and Forecast (WRF) model<br/>
      <p>Zhen Wu, Sun Yat-sen University, China;</p>
    </summary>
    <p>In the field of geoscience, the full knowledge of atmospheric conditions is necessary in the fields of urban planning, disaster mitigation, emergency response and air pollution assessments. While we see the remarkable advantages of the meso-scale model of Weather Research and Forecast (WRF) in the simulation of the atmosphere, it shows significant deficiencies in describing the micro-scale effects of the complex underlying surface. For solving this problem, a new adapter is developed based on preCICE. Thanks to the open source nature of the WRF model, the developed adapter enables the WRF to be coupled with other widely used Computational Fluid Dynamics (CFD) software, such as OpenFOAM. In fact, the developed adapter aims to provide the WRF model the Fluid-Fluid coupling capacity, which could be used to conduct a trans-scale numerical simulation downscaling the results from a numeric weather prediction software to drive a micro-scale (~1m) flow simulation. Such a trans-scale simulation shows the detailed flow structures inside the urban boundary layer or above complex hilly terrain.</p>
  </details>
  <details class="workshop-event" id="talk-jingya-li">
    <summary>
      Isogeometric Analysis Suitable Coupling Methods for Fluid-Structure Interactions with Solid-solver G+Smo Coupled via preCICE<br/>
      <p><a href="https://www.tudelft.nl/en/eemcs/the-faculty/departments/applied-mathematics/people/j-jingya-li-msc">Jingya Li</a>, Delft University of Technology, The Netherlands</p>
    </summary>
    <p>Accurate simulation of fluid-structure interactions (FSI) remains a difficult task in com- putational mechanics, especially when dealing with complicated geometries and dynamic coupling between fluid and solid domains. This paper introduces novel benchmarks in the field of FSI that take advantage of isogeometric analysis (IGA) and the adaptibility of the preCICE coupling library. We offer a framework that combines the IGA-based solid mechanics library G+Smo, the computational fluid dynamics capabilities of openFOAM, and the Julia-based WaterLily.jl fluid solver, aimed at advancing hydrodynamic simulations. Central to our approach is the utilization of spline-based communication for IGA-based fluid-structure interaction simulations. We employ spline-based communication instead of quadrature points to minimize the amount of information exchanged. A comparison of accuracy and efficiency between spline-based communication and quadrature point-based communication will be presented. Several benchmarks will be discussed, ranging from the replication of established preCICE cases to direct comparisons with other solid mechanics libraries, to demonstrate the effectiveness of spline-based communication. Through these benchmarks, we conclude that spline-based communication is more efficient than quadrature point-based communication and yields the same level of accuracy.
    </p>
  </details>
- 19:30-...: Invited dinner

#### Thursday, September 26

- 08:30-09:00: 🥨 Coffee
- 09:00-10:00: Keynote talk by Prof. Angelika Humbert<br/>
  <details class="workshop-event" id="talk-keynote-angelika">
    <summary>
      Tackling the complexity of Greenland’s Ice Sheet with coupled models<br/>
      <p><a href="https://www.awi.de/ueber-uns/organisation/mitarbeiter/detailseite/angelika-humbert.html">Angelika Humbert</a>, Alfred Wegener Institute Helmholtz Centre for Polar and Marine Research, Germany</p>
    </summary>
    <p>Ice sheets are losing mass at unprecedented rates during the observational period, which has a large impact on society. Simulating their future evolution is, therefore, an urgent task. While ice sheets are basically gravity-driven lubricated flow, processes such as the calving of icebergs at the seaward margins, crack formation and meltwater retention are making it a complex system. The rapid changes in the Greenland Ice Sheet require modelling concepts in which large-scale ice sheet models are coupled with process models, such as calving and hydrology. Glaciated areas themselves are a compartment of the Earth system, and hence, Earth System Models demand ice sheet codes. This comes with requirements on ice sheet models, particularly concerning performance and coupling. In this presentation, the general multi-physics problem of ice sheet modelling is introduced, and a typical simulation framework includes procedures for deriving initial states, performance, and bottlenecks. We will discuss process models and how they relate to large-scale ice sheet codes. Finally, we will focus on the requirements of Earth system model couplers and how preCICE would advance current coupling frameworks of climate models.</p>
  </details>
- 10:00-12:00: User talks
  <details class="workshop-event" id="talk-voit">
    <summary>
      MaMiCo-preCICE coupling for hybrid molecular-continuum flow simulations<br/>
      <p>Louis Voit (<a href="https://github.com/LouieVoit">@LouieVoit</a>), Helmut Schmidt University - University of the Federal Armed Forces Hamburg, Germany</p>
    </summary>
    <p>Molecular-continuum flow simulations apply computationally intensive molecular dynamics (MD) simulations in localized regions of a geometry under consideration, and classical, computationally cheaper computational fluid dynamics (CFD) solvers are employed for the remainder of the vast computational domain. The macro-micro coupling tool MaMiCo handles the coupling between a MD solver and a CFD solver. It is highly parallelized and provides interfaces to couple various MD and CFD solvers.
    Recently, preCICE has been coupled to MaMiCo. It allows us to access the large number of CFD solvers already coupled to preCICE, to use preCICE's interpolation methods in case of non matching grids between MaMiCo's grid and the continuum software's grid, to have a real partitioned approach with separate executables, to use preCICE's advanced time coupling schemes, etc. Validation and scaling have been done on various super computers, generally on a Couette flow scenario. Furthermore, MaMiCo and preCICE have been recently used to simulate an advanced transcritical multiphase scenario. Finally, we used preCICE to couple a CFD solver running on a laptop to a massively-parallel MD simulation running on a cluster.
    </p>
  </details>
  <details class="workshop-event" id="talk-breuer">
    <summary>
      Application of preCICE for fire-structure interaction predicting the damage of concrete walls under fire load<br/>
      <p><a href="https://dtecbw.de/home/kontaktadressen/hsu/prof-dr-ing-habil-michael-breuer">Michael Breuer</a>, Helmut Schmidt University - University of the Federal Armed Forces Hamburg, Germany</p>
    </summary>
    <p>This contribution presents a fully coupled simulation methodology for modeling a fire in a building and the developing structural damage to the concrete walls. Simulation of a fire without considering structural damages is already a challenging task due to the need to accurately account for a variety of chemical and physical processes such as pyrolysis, combustion, turbulence and heat transfer by convection, conduction and radiation. To achieve a practical and computational efficient approach, it is crucial to consider the expected computing times when selecting the models. Currently, the simulation methodology is implemented using the open-source software Fire Dynamics Simulator (FDS), which is a finite-difference solver of the Navier-Stokes equations on Cartesian grids. FDS relies on the large-eddy simulation technique to account for the instantaneous turbulent flow. The complexity increases when the fire causes structural damage to the building. In this study, the concrete damage in the form of cracks, holes or spalling is computed using a phase-field method with a FEniCS-based solver. The thermal boundary conditions are provided by the fire simulation. Thus, both solvers are coupled using the open-source coupling framework preCICE, which transfers wall temperatures from the fire simulation to the structural solver. In return the structural solver sends the predicted spalling data to the fluid solver. Consequently, the computational domain of the fluid solver must be adapted to account for the generated holes in the wall structure, affecting the ongoing CFD simulation. These holes facilitate the leakage of smoke gases and radiative heat transfer through the concrete wall, thereby contributing to the spread of the fire. In this work, the newly developed two-way coupled approach for the fire-structure interaction is applied to sample cases of thermal spalling induced in a concrete wall structure and the resulting leakage of hot gases. Another challenge is the implementation on a high-performance computer. Similar to many other coupled problems, the computational effort is not equally distributed between the two disciplines involved. Simulating the turbulent fluid flow and heat transfer in an entire building typically requires much more CPU time than predicting the structural response. This imbalance is taken into account by assigning a larger number of nodes to the MPI-parallelized CFD simulation compared to the structural simulation. All three codes are implemented on the local HPC cluster HSUper, which consists of 571 compute nodes, each equipped with 2 Intel Icelake sockets (Xeon Platinum 8360Y, 36 cores) enabling fast and efficient simulations.
    </p>
  </details>
  <details class="workshop-event" id="talk-hoehn">
    <summary>
      Simulation of coupled particle transport and FSI with application in the drilling industry<br/>
      <p>Patrick Höhn (<a href="https://github.com/hoehnp/">@hoehnp</a>), Institute for Computer Science, University of Göttingen, Germany</p>
    </summary>
    <p>Drilling is essential for the recovery and storage of sub-surface energy, such as oil, gas and geothermal heat. It typically accounts for large parts of the project costs. For optimal drilling operations it is required to achieve an efficient transport of cuttings from the drill-bit to the surface. As drilling often reaches several thousand meters below the surface, in-situ measurements of drilling parameters are very challenging. Therefore, limited field knowledge about the underlying phenomena exists and many investigations rely on simplified laboratory setups and detailed simulations.  Besides technical challenges, drilling projects are always very costly, e.g. in case of deep geothermal wells the typically drilling costs account for  50% of the total project costs. Large shares of these costs are caused by non-productive time during the drilling process caused by damages to underground equipment. Particular importance in these fatigue processes are lateral vibrations of the drill string. The research problem studied by the author attempts to evaluate the influence of the cuttings transport on the damping of lateral vibrations, which requires a simulation consisting both of particle transport and fluid-structure interaction. One approach using OpenFOAM and the particle solver XDEM was already presented in previous work. Because the code of XDEM, is not publically available, the author decided to solely use publically available open source libaries for his own approach. OpenFOAM was kept as solid base for the development. A big challenge caused by the community is the limitation that code contributions are usually bound to the OpenFOAM version of the initial development with no adoptions to newer versions. Since the initial design the particle transport is realized using the CFDEM®coupling libarary and the particle solver LIGGGHTS. Both were modified to allow a deformable mesh in LIGGGHTS. The FSI aspect was more recently realized by the FSI-library solids4Foam, which has seen significant changes in version 2. Most significantly it is now compatible with the multi-physics framework preCICE. Inspired by this change, the author realized that preCICE cannot only solve the issue of coupling different codes, but also help to overcome compatibility issues between different OpenFOAM additions to be coupled. Implementing the solvers from CFDEM®coupling-PFM in preCICE would allow a much wider application with other simulation codes for the simulation of coupled particle transport simulations, e.g. solid models in solids4Foam could be easily coupled with all solvers from CFDEM®coupling.
    </p>
  </details>
   <details class="workshop-event" id="talk-rodenberg">
    <summary>
      How to use time interpolation in the preCICE tutorials<br/>
      <p><a href="https://www.cs.cit.tum.de/sccs/personen/benjamin-rodenberg/">Benjamin Rodenberg</a> (<a href="https://github.com/BenjaminRodenberg/">@BenjaminRodenberg</a>), Technical University of Munich, Germany</p>
    </summary>
    <p>With version 3, preCICE has generally introduced time interpolation. This feature, which applies waveform iteration for coupling, internally transforms the exchanged quantities into time-continuous functions by applying B-spline interpolation. The coupled participants can then sample from the B-spline at any point in time. My presentation will introduce the API and configuration extensions required for time interpolation and provide practical examples. I will show how we can use this new feature to improve the accuracy and performance of time-stepping using preCICE tutorial cases. Additionally, I will show how time interpolation supports the implementation of adaptive black-box schemes provided by libraries like Scipy or MATLAB in coupled problems.
    </p>
  </details>
- 12:00-13:00: 🍲Lunch
- 13:00-13:45: User talks

  <details class="workshop-event" id="talk-kotarsky">
      <summary>
        Quasi-Newton methods for time adaptive waveform iterations<br/>
        <p><a href="https://www.lunduniversity.lu.se/lucat/user/9a5a021777b3e7cb0b8aea7ee9094808">Niklas Kotarsky</a> (<a href="https://github.com/NiklasKotarsky/">@NiklasKotarsky</a>), Lund University, Sweden</p>
      </summary>
      <p>We consider methods for dynamic coupled problems, in particular partitioned solvers for ﬂuid-structure interaction and thermal transfer where different sub-solvers are used for the different domains. To further improve the computational efficiency, different and adaptive time steps in the sub solvers are employed. Using so called waveform iterations, these goals have previously been achieved for heat transfer problems using relaxation. Quasi-Newton methods have recently been combined with waveform iterations for the case of constant time grids.  
      In this talk we further extend the quasi-Newton waveform iterations to the time adaptive case, where both of the sub-solvers use an adaptive time stepping scheme. We also give an overview of the convergence properties of time adaptive waveform iteration and quasi Newton methods as well as proposing an implementation of quasi-Newton acceleration for waveform iterations in the open source coupling library preCICE.  Lastly, we also show that using a time adaptive solver results in faster run times for a simple partitioned heat conduction test case, as well as a more realistic non-linear test case where a hot piece of steel is cooled by an air stream.
      </p>
    </details>
    <details class="workshop-event" id="talk-wieshau">
      <summary>
        Multirate Magnetothermal Coupling with Time Adaptive Waveform Relaxation<br/>
        <p><a href="https://www.temf.tu-darmstadt.de/team_temf/mitarbeitende_temf/mitarbeitende_details_116800.de.jsp">Michael Wieshau</a>, TU Darmstadt, Germany</p>
      </summary>
      <p>When simulating multiphysical problems, the different time scales of the physical aspects make it computationally inefficient to solve the problem as one monolithically coupled system. Electromagnetic processes, for example, happen at significantly higher time rates than the thermal heating induced by the electric losses. One approach to efficiently solve this coupled multirate system is to apply Waveform Relaxation and compute the electromagnetic and thermal problems with different time rates iteratively in a decoupled way. This work explores the possibilities to couple electromagnetic and thermal simulations of a 2D FEM transformer in Matlab with preCICE. The heat generated by the magnetic eddy-current losses influences the temperature dependent conductivity of the electric circuit, which again influences the electric losses generating the heat. This two-way coupling is solved with time adaptive Waveform Relaxation and independent blackbox solvers for the time-stepping within the two subproblems.
      </p>
    </details>
- 13:45-14:30: preECO talk<br/>
  <details class="workshop-event" id="talk-preECO">
    <summary>
      Standardization of Adapters and Application Cases: The preECO Project<br/>
      <p><a href="https://www.simtech.uni-stuttgart.de/exc/people/Uekermann/">Benjamin Uekermann</a> (<a href="https://github.com/uekerman/">@uekerman</a>), University of Stuttgart, Germany</p>
    </summary>
    <p>Through DFG's recent research software call, the preCICE maintainers acquired funding to increase the quality and reusability of all components in the preCICE ecosystem: the preECO project. For the next three years, we want to define and implement standardization guidelines together with you – the preCICE community. These guidelines should cover adapter development and application cases. This could include high-impact requirements such as that adapters need to have an independent configuration file adhering to a defined schema and format. But also little details, such as that every application case needs to name the preCICE configuration file exactly `precice-config.xml`.The main idea is to establish a review process, where users can apply for quality stamps for their adapters or application cases. What is in this for you? You will get reviews for your adapters and application cases. You will know that they not only work, but that they are good and correct. You also get access to more adapters and everything will be easier to exchange. And you potentially get access to more exciting simulation setups than the tutorial cases. In this talk, we want to introduce the preECO project and explain its ideas, timeline, and scope. We then want to present first tentative guidelines for adapters and application cases as a starting point for discussion.</p>
  </details>
- 14:30-15:00: ☕️ Coffee break
- 15:00-16:15: World Café
- 16:15-16:30: Photo
- 16:30-18:30: Poster session with beer

#### Friday, September 27

- 08:30-09:00: 🥨 Coffee
- 09:00-09:30: User support preparation
- 09:30-11:45: Hands-on user support
- 11:45-12:00: Closing remarks
- 12:00-13:00: 🍲Lunch
- 13:00-15:00: Hands-on user support
- 15:00-15:30: ☕️ Coffee break
- 15:30-17:30: Hands-on user support

## Call for contributions

<details>
  <summary>The call for contributions is closed.</summary>
  You do not need to submit a contribution to join this workshop. However, your contributions are very welcome! We are looking for talks and posters that could be beneficial for the wider preCICE community. Are you developing a new adapter? Are you using preCICE for an exciting new application? Are you developing new methods that should not be missing from preCICE? If the answer to any of these questions was yes, we encourage you to submit a brief abstract for a 20 minutes talk.

  Are you revisiting one of the classical preCICE use cases? Did you already present your work in a previous workshop? Then we would be very happy to catch up with your work and we encourage you to present a poster.

  [To abstract submission](https://ipvscloud.informatik.uni-stuttgart.de/apps/forms/s/JYtwkfiiiMCjHGjqjACifDWy)

</details>

## Registration

Registration is open until September 15. Register before July 15 to benefit from early-bird prices!

You can register for the full workshop (talks + course) or for the main part (only talks), in case you already know the topics covered by the course or you cannot attend on the first days.

[To registration](https://tagung.informatik-forum.org/preCICE2024/register)  

### Early-bird registration fee

| Ticket type | Members of academia | Members of industry  |
|---|---|---|
| workshop + course | 300 Euro    | 500  Euro     |
| workshop      | 200 Euro  | 300 Euro       |

### Standard registration fee

| Ticket type | Members of academia | Members of industry  |
|---|---|---|
| workshop + course | 450 Euro    | 750  Euro     |
| workshop      | 300 Euro  | 500 Euro       |

In case of cancellations, requests for refunds must be made by July 15, 2024. To cancel your registration, send an email to [preCICE2024@simtech.uni-stuttgart.de](mailto:preCICE2024@simtech.uni-stuttgart.de).  No refunds will be approved after July 15, 2024. There is a 50€ administration fee that will be deducted for any refunds.

{% note %}
If you are a holder of a [preCICE suport license](https://precice.org/community-support-precice.html#2-support-license), three members of your organisation are exempt of the registration fee and can register to the workshop by simply writing to [preCICE2024@simtech.uni-stuttgart.de](mailto:preCICE2024@simtech.uni-stuttgart.de) before the registration deadline.
{% endnote %}

## The venue

The 5th preCICE Workshop will be held at the [Campus Vaihingen](https://www.uni-stuttgart.de/en/university/map/) of the University of Stuttgart. Campus Vaihingen is located between the city district of Vaihingen (easily reachable by bus) and the city center of Stuttgart (15 min away by suburban rail).

The exact building and room number will be provided a few weeks before the event. The venue of the invited dinner will also made public a few weeks before the event.

For those who wish to extend their stay in Stuttgart, we refer you to [Stuttgart Tourism](https://www.stuttgart-tourist.de/en). Besides, the [Cannstatter Volksfest](https://www.wasen.de/), a major event in the city of Stuttgart, will take place from September 27 to October 13.

## Accomodation

We encourage you to book accomadation in a nearby hotel as soon as possible. We provide a list of potential hotels in collaboration with Stuttgart Marketing:

[To hotel list](https://www.stuttgart-tourist.de/en/precice-2024)

## Contact

For questions related to the 2024 preCICE workshop, write us at [preCICE2024@simtech.uni-stuttgart.de](mailto:preCICE2024@simtech.uni-stuttgart.de).

<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "preCICE Workshop 2024",
      "description": "The preCICE workshop offers a platform for researchers and industry professionals to exchange insights, experiences, and expertise on leveraging preCICE. It includes an introductory course, user and developer presentations, interactive support sessions, and feedback rounds. Attendees can network with the dynamic community and consult developers on application strategies, use cases, and requirements.",
      "image": "https://precice.org/images/events/precice2024.svg",
      "startDate": "2024-09-24",
      "endDate": "2024-09-27",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {  
        "@type": "Place",
        "name": "University of Stuttgart",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "",
          "addressLocality": "Stuttgart",
          "postalCode": "",
          "addressCountry": "DE"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "University of Stuttgart",
        "url": "https://www.uni-stuttgart.de/"
      },
      "funder": {
        "@type": "Organization",
        "name": "SimTech",
        "url": "https://www.simtech.uni-stuttgart.de/"
      }
    }
</script>

## Supporters

<img src="images/simtech.png" alt="SimTech" style="float:left; padding-right: 50px; max-width: 300px; margin:auto;">
<img src="images/logo-infos.png" alt="Infos" style="padding-right: 50px; max-width: 300px; margin:auto;">
<img src="images/funding/dfg.jpg" alt="DFG" style="max-width: 200px; margin:auto;">
