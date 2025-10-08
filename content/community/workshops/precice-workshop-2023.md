---
title: preCICE workshop 2023
keywords: precice workshop 2023, event, events, workshop
summary:
permalink: precice-workshop-2023.html
toc: true
redirect_from: /preCICE2023/
---

<img class="img-responsive center-block" src="images/events/precice2023.svg" alt="preCICE Workshop banner" style="max-width: 500px; width: 100%; margin:auto;">

{% note %}
This workshop is now over. See you next in [SIAM CSE23](https://meetings.siam.org/program.cfm?CONFCODE=CSE23) with several talks, a poster, and two minitutorial sessions, as well as in [ECCOMAS COUPLED23](eccomas-coupled-2023.html) with a minisymposium.
{% endnote %}

<img class="img-responsive center-block" src="images/events/precice2023-group.jpg" alt="Group picture" style="width: 100%; margin:auto;">

The 4th preCICE Workshop was held in-presence at the campus Garching of the [Technical University of Munich](https://www.tum.de/) ([Leibniz Supercomputing Center](https://www.lrz.de/)), on February 13-16, 2023. The workshop is a coming together of the preCICE community to share ideas, experiences and knowledge about using preCICE, and to learn from others in the process.

Expect user and developer talks, hands-on training sessions, discussions with the developers on your applications and use cases, feedback rounds, and plenty of opportunities to network with the rest of our vibrant community.

## Program

### Monday, February 13: For newbies

Introductory day for new users (see <a href="#precice-training-course">course details</a>)

- 09:30-10:00: 🥨 Registration and coffee
- 10:00-12:00: preCICE course, part 1 (introduction + basics)
- 12:00-13:30: 🍲 Lunch (at the same place, expect at least meat and vegetarian options)
- 13:30-15:30: preCICE course, part 2 (tools)
- 15:30-16:00: ☕️ Coffee break
- 16:00-18:00: preCICE course, part 3 (implicit coupling)
- Later (19:00): 🍔 Informal dinner on campus ([Goldbraun Garching](https://goldbraun.de/))

The course continues with a part 4 (data mapping) on Thursday.

### Tuesday, February 14: Talks + dinner

- 08:30-09:00: 🥨 Registration and coffee (including well-thought swag)
- 09:00-10:30: Opening and news<br/>
  <details class="workshop-event" id="talk-chourdakis">
    <summary>
      News on preCICE v2.5 and the preCICE ecosystem<br/>
      <p><a href="https://www.cs.cit.tum.de/en/sccs/people/gerasimos-chourdakis/">Gerasimos Chourdakis</a> (<a href="https://github.com/MakisH/">@MakisH</a>), Technical University of Munich, Germany</p>
    </summary>
    <p>One year, two preCICE releases, one Distribution release, and some new publications later, it's time to look back at some news since the last workshop. May 2022 brought <a href="https://precice.discourse.group/t/highlights-of-the-new-precice-release-v2-4/1047">preCICE v2.4</a>, followed by <a href="https://precice.discourse.group/t/iceberg-ahead-and-new-precice-release-v2-5/1133">preCICE v2.5</a> in August. The <a href="https://precice.discourse.group/t/aste-and-more-new-components-in-the-precice-distribution-v2211-0/1229">preCICE Distribution v2211</a> was published in November, entering some silence-before-the-storm time (see v3 talk on Wednesday). This talk will summarize the highlights of the latest developments.</p>
  </details>
- 10:30-11:45: User introductions - _show your research!_
- 11:45-12:00: Group photo
- 12:00-13:30: 🍝 Lunch
- 13:30-14:30: Invited talk<br/>
  <details class="workshop-event" id="talk-invited">
    <summary>
      Using preCICE to couple OpenFOAM and solids4foam for fluid-solid interactions<br/>
      <p><a href="https://people.ucd.ie/philip.cardiff">Philip Cardiff</a>, University College Dublin, Ireland and <a href="https://solids4foam.github.io/">solids4foam</a> project</p>
    </summary>
    <p>solids4foam is an open-source OpenFOAM toolbox for solid mechanics and fluid-solid interactions (<a href="https://solids4foam.github.io/">solids4foam.github.io</a>). With recent updates to the preCICE OpenFOAM adapter, solids4foam can now act as the solid solver in fluid-solid interaction simulations driven by preCICE. This talk overviews the solids4foam toolbox, including the adopted class-based solid and fluid model approach. The finite volume method for solid mechanics will be briefly summarised, followed by the structure of a typical solids4foam case. The second half of the talk will adopt a hands-on approach to introduce how to combine solids4foam with preCICE. Following a brief overview of how to install solids4foam, examples of fluid-solid interaction cases will be presented, such as a beam in cross flow and a pressure wave in a pipe. The talk will conclude with a look to future directions.</p>
  </details>
- 14:30-15:30: (2x developer talks)<br/>
  <details class="workshop-event" id="talk-desai">
    <summary>
      Performing multiscale coupled simulations with preCICE in an adaptive and flexible way<br/>
      <p><a href="https://www.ipvs.uni-stuttgart.de/institute/team/Desai/">Ishaan Desai</a> (<a href="https://github.com/IshaanDesai">@IshaanDesai</a>), University of Stuttgart, Germany</p>
    </summary>
    <p>Multiscale simulation scenarios often consist of coupling between problems at different scales. In such scenarios, researchers mostly focus on developing coupling methodology for their application, but largely ignore software engineering and software reusability aspects. This can lead to reinventing technicalities of the coupling again and again. This talk presents a flexible and application-agnostic software framework to couple simulation codes at different scales. The new lightweight software is called Micro Manager, and it allows for reusing the coupling library preCICE for two-scale coupled problems. We discuss various features of the Micro Manager which make it a flexible tool for multiscale coupling.</p>
  </details>
  <details class="workshop-event" id="talk-schneider">
    <summary>
      Flexible and efficient data mapping for simulation of coupled problems<br/>
      <p><a href="https://www.ipvs.uni-stuttgart.de/institute/team/Schneider-00056/">David Schneider</a> (<a href="https://github.com/davidscn">@davidscn</a>), University of Stuttgart, Germany</p>
    </summary>
    <p>Solving large-scale data mapping problems on scattered data comes with the usual accuracy-performance trade-off: Projection-based methods such as nearest-neighbor methods are computationally cheap, but deliver only first-order accuracy. Kernel-methods based on radial-basis functions can provide higher-order, but are exceedingly expensive in terms of computational cost. This talk presents recent advances, which either improve the accuracy of our projection-based methods or mitigate the computational cost of our kernel-based methods. The talk focuses particularly on relevant features coming in the new preCICE version 3 and demonstrates user-visible advantages using realistic showcases. </p>
  </details>
- 15:30-16:00: ☕️ Coffee break
- 16:00-18:00: (4x talks)<br/>
  <details class="workshop-event" id="talk-homs-pons">
    <summary>
      Modelling an agonist-antagonist muscle pair with OpenDiHu and preCICE<br/>
      <p><a href="https://www.ipvs.uni-stuttgart.de/institute/team/Homs-Pons/">Carme Homs Pons</a> (<a href="https://github.com/carme-hp">@carme-hp</a>), University of Stuttgart, Germany</p>
    </summary>
    <p>Skeletal muscles are typically paired together in an agonist-antagonist (AA) muscle pair. The aim of this project is to model the novel agonist-antagonist myoneural interface (AMI) amputation technique, where AA muscles are mechanically connected by a tendon. Since muscles are an active hierarchical tissue, a multi-scale multi-physics problem is solved just to simulate a single muscle. The software of choice is OpenDiHu, which is able to perform scalable biophysical neuromuscular simulations. To model the AMI amputation, we use preCICE to couple two muscle solvers to a tendon solver. On the one hand, we couple the muscle’s top level, numerically represented by a solid mechanics mesh, to the tendon. On the other hand, we must implement the direct crossed-feedback loop between the sensory organs and the motor neurons of the AA muscle pair. All in all, this results in a complicated multi-coupling case with at least three participants.</p>
  </details>
  <details class="workshop-event" id="talk-fischler">
    <summary>
      A preCICE-interface for the ice-sheet and sea-level system model<br/>
      <p><a href="https://www.informatik.tu-darmstadt.de/sc/fg/people/details/yannic_fischler.en.jsp">Yannic Fischler</a>, Technical University of Darmstadt, Germany</p>
    </summary>
    <p>Earth system modeling requires expertise of multiple scientific domains, including, for example, geographers, oceanologists and glaciologists. The Ice-sheet and Sea-level system model (ISSM) is a MPI parallel multiphysics finite element framework to simulate large ice-sheets like Greenland and Antarctica. Previous performance studies have validated the good scaling properties of this code.
    In climate simulations, ISSM depends on external input data, e.g. subglacial hydrology models. Currently, this data is precalculated and handed to ISSM as a static file input. However, as the subglacial hydrology is affected by ice sheet evolution as well, bidirectional high frequent data exchange is beneficial for the entire accuracy. To enable dynamic data exchange during run-time, we develop the first ever exchange interface for ISSM using preCICE.
    We present the coupling of ISSM and CUAS-MPI, a subglacial hydrology model, and discuss the challenges of integrating preCICE in a complex framework like ISSM regarding time stepping and data accessibility. We note that the new possibilities of coupled execution then also create new challenges in modeling, e.g. geometry evolution.</p>
  </details>
  <details class="workshop-event" id="talk-abele">
    <summary>
      Coupling an ice sheet model with satellite image based simulation of calving fronts<br/>
      <p><a href="https://www.dlr.de/sc/en/desktopdefault.aspx/tabid-1192/1635_read-39728/sortby-lastname/">Daniel Abele</a>, Alfred Wegener Institute / German Aerospace Center (DLR), Germany</p>
    </summary>
    <p>ISSM (Ice-sheet and Sea-level System Model) is a software to simulate the evolution of glaciers and ice sheets. One of its important features is evolving the front of the glacier, which changes position due to melting, calving, and the forward movement of the glacier itself. Specifically, physics based models of calving are not yet able to capture the real behavior of the system precisely. We want to develop a data driven approach, computing the speed of the front from known positions that have been extracted from satellite images. This code will be coupled with ISSM using preCICE. The project is in its early stages. After a short introduction to ISSM, we will present the numerical methods we will use to compute the frontal speed. The front can be modeled using a level-set equation. Inversion of this model delivers the speed of the front. We will discuss the issues we expect to encounter in coupling the code to ISSM, like adaptive meshes, load balancing, integration of preCICE into ISSM, and stability of the coupled solution. The physics based approaches to calving are deeply integrated into ISSM. We hope to present some preliminary results of stability experiments where ISSM and the moving front module are less tightly coupled.</p>
  </details>
  <details class="workshop-event" id="talk-adhav">
    <summary>
      Investigation of OpenFOAM-XDEM momentum coupling results for AWJC Nozzle using preCICE<br/>
      <p><a href="https://dpm.gforge.uni.lu/team/padhav/">Prasad Adhav</a> (<a href="https://github.com/Alphaoo1">@Alphaoo1</a>), University of Luxembourg, Luxembourg</p>
    </summary>
    <p>The high-speed water jet is the momentum source in an Abrasive Water Jet Cutting Nozzle. This momentum is transferred to the abrasive particles & the air within the nozzle. This leads to turbulent & complex particle-laden flow in the nozzle. These flow conditions can influence particle impacts on the nozzle, thus influencing erosion. Hence it is imperative that this complex particle-laden flow is captured correctly.
    The momentum exchange can be directly from the water jet to the particles or indirectly through the airflow. In this work, we investigate these fluid-particle momentum exchanges.
    Our prototype uses preCICE for volumetric coupling of XDEM (for the particle motion), & OpenFOAM (for the fluid). XDEM uses fluid flow conditions to compute the forces acting on particles. XDEM computes the particle momentum source that is injected into the fluid solver. The results of the coupled simulation align with literature & can be extended to include the FEM component for erosion predictions.</p>
  </details>
- Later (19:00): 🍽️ Invited dinner in Garching ([Gasthof Neuwirt](https://gasthof-neuwirt.org/))

### Wednesday, February 15: Talks + World Café

- 08:30-09:00: 🥨 Coffee / synchronization
- 09:00-10:30: Developer talks<br/>
  <details class="workshop-event" id="talk-rodenberg">
    <summary>
      B-Splines for flexible and robust multirate time stepping<br/>
      <p><a href="https://www.cs.cit.tum.de/en/sccs/people/benjamin-rueth/">Benjamin Rodenberg</a> <a href="https://github.com/BenjaminRodenberg">@BenjaminRodenberg</a>, Technical University of Munich, Germany</p>
    </summary>
    <p>Black-box coupling schemes often only reach first order when it comes to time stepping. Most coupling schemes do not allow the coupled solvers to run at independent time scales (multirate). In this talk, I will explain how we use B-Splines to construct a higher-order interpolating function for each coupling time window in preCICE. This approach allows multirate and higher-order time stepping for coupled black-box solvers. Additionally, I introduce the API, demonstrate possible use cases, and investigate the performance of this new feature through the example of a simple oscillator test case.</p>
  </details>
  <details class="workshop-event" id="talk-simonis">
    <summary>
      Outlook on preCICE v3 + Q&A<br/>
      <p><a href="https://www.cs.cit.tum.de/en/sccs/people/frederic-simonis/">Frédéric Simonis</a> (<a href="https://github.com/fsimonis">@fsimonis</a>), Technical University of Munich, Germany</p>
    </summary>
    <p>The preCICE library is rapidly approaching its third major release. It contains a wide range of features, improvements and clean-ups, including waveform interpolation, more explicit RBF mapping configurations, and complete overhaul of the connectivity and actions APIs. This talk aims to give an overview of what is about to change and which features are planned for the upcoming version 3.</p>
  </details>
- 10:30-12:00: World Café
- 12:00-13:30: 🍲 Lunch
- 13:30-15:30: (4x talks)<br/>
  <details class="workshop-event" id="talk-markus">
    <summary>
      Partitioned flow simulations with preCICE and OpenFOAM<br/>
      <p>Markus Mühlhäußer (<a href="https://github.com/thesamriel">@thesamriel</a>), Technical University of Munich, Germany</p>
    </summary>
    <p>Large and heterogeneous flow simulations could benefit from partitioning, where each subdomain is solved by an individual, dedicated solver. In this presentation we will investigate and validate the fluid-fluid module of the preCICE OpenFOAM adapter by coupling two incompressible OpenFOAM fluid solvers via a surface Dirichlet-Neumann coupling approach. The results of various simple test cases are compared to monolithic OpenFOAM simulations. By utilizing a special pressure boundary condition, the coupled results show only a small error around the coupling interface. The magnitude of this error is dependent on the velocity gradient, the discretization size as well as the cell orthogonality. Looking into the OpenFOAM source code reveals that higher accuracy is only possible by manipulating the solvers themselves and thereby violating the black-box approach of preCICE.
  Additionally, the fluid-fluid module is extended to couple temperature with great accuracy for one validation case. Lastly, custom inlet-outlet boundary conditions are implemented for pressure and velocity, which switch their behavior dynamically depending on the flow direction. The results shown in this presentation provide a basis for future fluid-fluid coupling applications with preCICE.</p>
  </details>
  <details class="workshop-event" id="talk-caccia">
    <summary>
      Using MultiBody dynamics in FSI simulations for marine applications<br/>
      <p><a href="https://www.aero.polimi.it/index.php?id=263&uid=28451&L=0">Claudio Caccia</a>, Politecnico di Milano, Italy</p>
    </summary>
    <p>Our presentation concerns the simulation and validation of the hydroelastic performance of marine components.
    Our simulations involve three software components: the Multibody Dynamics solver MBDyn, the CFD solver OpenFOAM, and preCICE.
    MBDyn allows to model elements like rigid bodies or slender structures by means of a variety of elements; besides, it is equipped with a structure that maps a cloud of interface points and the multibody model, used to exchange the mutual kinematics and dynamics.
    The coupling described above has been successfully tested in different scenarios, including some well-known FSI problems, such as the Turek-Hron FSI benchmarks.
    In the presentation, we analyze the performance of our setup with marine components of different complexity, from a simple foil to a complete kitesurf keel made of composite material. This cases show the potentialities of our methodology: the ability to describe a complex structure by means of equivalent beams, the determination of the performance and the recovery of the stresses in the structure.</p>
  </details>
  <details class="workshop-event" id="talk-shams">
    <summary>
      Gym-OpenFOAM: An OpenAI Gym environment for active flow control with deep reinforcement learning<br/>
      <p>Mosayeb Shams (<a href="https://github.com/mosayebshams">@mosayebshams</a>), Heriot Watt University, UK</p>
      <p><i>Amendment:</i> The talk will be given by <a href="https://researchportal.hw.ac.uk/en/persons/ahmed-h-elsheikh">Ahmed Elsheikh</a>, Heriot Watt University, UK</p>
    </summary>
    <p>OpenAI Gym API is a de facto standard API to communicate between reinforcement learning algorithms and simulation environments. The new software Gym-OpenFOAM is a Python environment fully compliant with the OpenAI Gym API to facilitate developing and implementing reinforcement learning algorithms for fluid dynamics applications. In a reinforcement learning-interaction cycle, Gym-OpenFOAM takes advantage of coupling tool preCICE, an open-source library for multi-physics coupling, to handle information exchange between agent (decision maker) and OpenFOAM (simulation environment), an open-source library for computational fluid dynamics. This coupling approach results in a seamless non-invasive integration of a realistic simulation system with the reinforcement learning paradigm, enabling the application of deep reinforcement learning algorithms to the continuum mechanics field.</p>
    <p>For the purposes of demonstration, we use Gym-OpenFOAM framework to apply two state-of-the-art reinforcement algorithms, namely proximal policy optimisation (PPO) and soft actor-critic (SAC), for drag attenuation in flow over a cylinder.</p>
  </details>
  <details class="workshop-event" id="talk-wileke">
    <summary>
      preCICE-FMI Runner to couple controller models to PDEs<br/>
      <p>Leonard Willeke (<a href="https://github.com/LeonardWilleke">@LeonardWilleke</a>), University of Stuttgart, Germany</p>
    </summary>
    <p>The FMI standard is today’s most popular co-simulation concept. It enables interoperability of simulation models and software by treating simulation models as libraries (FMUs). A "coupler" then calls and orchestrates these models. This is easily possible for simple models, such as ODE-based ones, but difficult for PDE-based models. This presentation explores if and how FMU libraries can be coupled with other simulation tools via the coupling library preCICE. To this end, a runner software "preCICE-FMI" is being developed. It connects the FMU model via preCICE with potentially arbitrary many simulation partners. As a first step towards a general Runner, this project aims to couple an FMU model implementing a PID controller with simulations in OpenFOAM. A first example case of a coupling of FMU models with preCICE is shown. </p>
  </details>
- 15:30-16:00: ☕️ Coffee break
- 16:00-18:00: Hands-on user support session

### Thursday, February 16: Closing + Hands-on support

- 08:30-09:00: 🥨 Coffee break / synchronization
- 09:00-11:00: preCICE course, part 4 (data mapping) - **new**
- 11:00-12:00: Closing (+ prepare user support sessions)
- 12:00-13:30: 🥘 Lunch
- 13:30-15:30: Hands-on user support session
- 15:30-16:00: ☕️ Coffee break
- 16:00-18:00: Hands-on user support session

## Program details

### User introductions

On the first day, we will have a round of introductions, so that everyone knows who to talk to during the workshop.
[Submit](https://ipvs.informatik.uni-stuttgart.de/cloud/s/JWJ4toJF2qCScYL) one PDF slide (16:9, with name `surname-firstname.pdf`) with your name and some key details/pictures about your research till February 9, as we need to prepare a single slideshow.

### World Café

A classic for a preCICE Workshop, the preCICE [World Café](https://en.wikipedia.org/wiki/World_caf%C3%A9_(conversation)) is your opportunity to shape the future of preCICE. Expect topics such as Features, Usability, Community, Funding, Teaching, and This Workshop.

### User support sessions

It's a workshop and not a classical conference, as we also get to do things together. Meet the experts to discuss your current or planned projects, as well as to debug any current issues.

On March 31, 10:00-15:00, we will have a _post-workshop user-support session_ to catch up on any progress.

### preCICE training course

If you are new to preCICE, this is the perfect way to get started. February 13 is for you, offering only training (parts I-III). Even if you joined this course in previous years, don't miss the new part IV on February 16.

  <details class="workshop-event" id="courseI"><summary>preCICE Course I: Basics</summary>
  <p>Instructors: <a href="https://www.cs.cit.tum.de/en/sccs/people/gerasimos-chourdakis/">Gerasimos Chourdakis</a>, <a href="https://www.simtech.uni-stuttgart.de/exc/people/Uekermann/">Benjamin Uekermann</a><br/>
  Affiliation: Technical University of Munich, University of Stuttgart, preCICE developers.</p>
  <p>A hands-on introduction to preCICE, recommended for new users that want to learn how to couple their own codes.</p>
  <p>In this first part, we couple two simple Python codes, discussing the basic methods of the preCICE API.</p>
  <p>We recommend to use the <a href="installation-vm.html">preCICE Demo Virtual Machine</a> for the course. If you, however, prefer installing things on your system, you need to install preCICE v2.5, Python 3.6 or newer, and the Python bindings of preCICE. Optionally, please also install ParaView and gnuplot, or similar software to visualize VTK point data and CSV files.</p>
  </details>

  <details class="workshop-event" id="courseII"><summary>preCICE Course II: Tools</summary>
  <p>Instructors: <a href="https://www.cs.cit.tum.de/en/sccs/people/gerasimos-chourdakis/">Gerasimos Chourdakis</a>, <a href="https://www.simtech.uni-stuttgart.de/exc/people/Uekermann/">Benjamin Uekermann</a><br/>
  Affiliation: Technical University of Munich, University of Stuttgart, preCICE developers.</p>
  <p>A hands-on introduction to preCICE, recommended for new users that want to learn how to couple their own codes.</p>  
  <p>In this second part, we take a tour over available tools to configure, understand, and post-process preCICE simulations. More specifically, we have a look at the preCICE logger, config visualizer, mesh exports, and watchpoints of preCICE. We also discuss common tips for visualizing partitioned simulations in ParaView.</p>
  </details>

  <details class="workshop-event" id="courseIII"><summary>preCICE Course III: Implicit Coupling</summary>
  <p>Instructors: <a href="https://www.cs.cit.tum.de/en/sccs/people/gerasimos-chourdakis/">Gerasimos Chourdakis</a>, <a href="https://www.simtech.uni-stuttgart.de/exc/people/Uekermann/">Benjamin Uekermann</a><br/>
  Affiliation: Technical University of Munich, University of Stuttgart, preCICE developers.</p>
  <p>A hands-on introduction to preCICE, recommended for new users that want to learn how to couple their own codes.</p>  
  <p>In this third part, we use a conjugate heat conduction scenario coupling OpenFOAM with Nutils to study implicit coupling.</p>
  <p>If you do not use the <a href="installation-vm.html">preCICE Demo Virtual Machine</a>, you additionally need to install Nutils 7, OpenFOAM (e.g., v2206), and the latest OpenFOAM adapter for this part.</p>
  </details>

  <details class="workshop-event" id="courseIV"><summary>preCICE Course IV: Data Mapping (new)</summary>
  <p>Instructors: <a href="https://www.cs.cit.tum.de/en/sccs/people/gerasimos-chourdakis/">Gerasimos Chourdakis</a>, <a href="https://www.simtech.uni-stuttgart.de/exc/people/Uekermann/">Benjamin Uekermann</a></p>
  <p>A hands-on introduction to preCICE, recommended for new users that want to learn how to couple their own codes.</p>  
  <p>In this fourth part, we will explore aspects of accuracy and efficiency in data mapping, using <a href="tooling-aste.html">ASTE</a>.</p>
  </details>

## Location

Having offered [preCICE 2022](precice-workshop-2022.html) and [preCICE 2021](precice-workshop-2021.html) online, we are now looking forward to meeting our community again in person, similarly to [preCICE 2020](precice-workshop-2020.html). The event itself will take place at the [LRZ](https://www.lrz.de/english/) building ([Boltzmannstr. 1](https://www.openstreetmap.org/search?query=Boltzmannstr.%201%20Garching#map=19/48.26176/11.66999)) and the social events will take place in the town of Garching.

As of January 2023, there are no particular Corona-related regulations anymore in Munich, while there is a recommendation of using masks in the public transportation. Follow the latest updates in the [official portal of the City of Munich](https://stadt.muenchen.de/infos/corona-fallzahlen-muenchen) (in German).

### Collaborating hotels

We have reserved hotel rooms in Garching for you to book at reduced/fixed prices and until they run out.

- [Hoyacker Hof](https://www.hoyackerhof.de/en/home/) (use the keyword `precice` till January 13 for a fixed price)
- [Hotel König Ludwig II.](https://hkl.de/) (use the group name `TENT-TU 13022023` till January 16 for a fixed price)
- [Dorint](https://dorint.com/de/muenchen-garching) (use the keyword `precice` till February 1 for a fixed price)
- [Marias Inn](http://www.marias-inn.com/) (use the keyword `precice` for 10% off)

Any hotel on the campus or between the subway stations Garching Hochbrück and Garching Forschungszentrum will be fine.
The invited dinner will be at [Neuwirt](https://gasthof-neuwirt.org/) (subway station Garching).
Note that the campus is relatively far for the city center of Munich and you would need an M+2 ticket to reach the campus via public transport.
Find out more about [public transportation in Munich](https://www.mvg.de/).

## Call for contributions

_The contribution period has ended. Maybe next time!_

You do not need to present anything to join this workshop. However, your contributions are very welcome! We are looking for talks that could be beneficial for the wider preCICE community. Are you developing a new adapter? Are you using preCICE for an exciting new application? Are you developing new methods that should not be missing from preCICE? Then open your editor and start sketching a short abstract (free text, < 1000 characters) for a 20min talk right now! 😉

We will accept contributions in two batches. The first batch was till December 16. Submit your abstract till January 16, and we will reply before January 23. There will be no further extensions.

[Submit your talk abstract](https://ipvs.informatik.uni-stuttgart.de/cloud/apps/forms/oS6C7tLp88t2EAHR).

## Important dates

- Early abstract submission: December 16
- Acceptance notification for early submissions: December 23
- Late abstract submission: January ~~9~~ 16
- Early registration (discount): January ~~9~~ 16
- Acceptance notification for late submissions: January ~~16~~ 23
- Late registration: ~~January 30~~ February 9 (limited places)
- Submit introduction slide: February 9
- Workshop: February 13-16
  - You can safely skip the first day of the workshop if you are an experienced preCICE user.
- Post-workshop user support session: March 31 (online)

## Registration

The registration period has ended.

Ticket prices:

- For members of universities and publicly-funded research institutes (any country): ~~300€ (early)~~, 450€ (late)
- For all other participants: ~~600€ (early)~~, 900€ (late)

The ticket includes access to the hands-on preCICE course, all talks, the consulting/user-support sessions (during the workshop and the post-workshop session on March 31st), invited dinner on February 14, as well as lunch and coffee breaks on all days.

See the [important dates](#important-dates) for the early and late registration deadlines.

## Contact

In case of any questions, contact the organizers at `precice2023` at `mailsccs.in.tum.de`.

## Get the poster - spread the word

Help us gather researchers from your field and make the workshop even more relevant to you (e.g., by sharing this [LinkedIn post](https://www.linkedin.com/posts/gerasimoschourdakis_precice-workshop-2023-activity-7006663153442803712-P0Gc)). Show your colleagues where you will be this February! Do you need high-quality prints? Just ask!

<a href="material/flyers/precice2023-poster.pdf" title="preCICE Workshop 2023 poster on GitHub"><img src="material/flyers/precice2023-poster-thumbnail.png" alt="preCICE Workshop 2023 poster (png thumbnail)"></a>
