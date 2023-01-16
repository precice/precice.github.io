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
Registration is now open - register early till January 16.
{% endnote %}

The 4th preCICE Workshop will be held in-presence at the campus Garching of the [Technical University of Munich](https://www.tum.de/) ([Leibniz Supercomputing Center](https://www.lrz.de/)), on February 13-16, 2023. The workshop is a coming together of the preCICE community to share ideas, experiences and knowledge about using preCICE, and to learn from others in the process.

Expect user and developer talks, hands-on training sessions, discussions with the developers on your applications and use cases, feedback rounds, and plenty of opportunities to network with the rest of our vibrant community.

## Call for contributions

You do not need to present anything to join this workshop. However, your contributions are very welcome! We are looking for talks that could be beneficial for the wider preCICE community. Are you developing a new adapter? Are you using preCICE for an exciting new application? Are you developing new methods that should not be missing from preCICE? Then open your editor and start sketching a short abstract (free text, < 1000 characters) for a 20min talk right now! 😉

We will accept contributions in two batches. The first batch was till December 16. **Submit your abstract till January 16**, and we will reply before January 23. There will be no further extensions.

[Submit your talk abstract](https://ipvs.informatik.uni-stuttgart.de/cloud/apps/forms/oS6C7tLp88t2EAHR).

## Important dates

- Early abstract submission: December 16
- Acceptance notification for early submissions: December 23
- Late abstract submission: January ~~9~~ 16
- Early registration (discount): January ~~9~~ 16
- Acceptance notification for late submissions: January ~~16~~ 23
- Late registration: ~~January 30~~ February 9
- Submit introduction slide: February 9
- Workshop: February 13-16
  - You can skip the first day of the workshop if you are an experienced preCICE user

## Program

This is a preliminary schedule. We will finalize the schedule two weeks before the workshop, but you can already assume fixed starting and end times.

### February 13

Introductory day for new users

- 09:30-10:00: Registration and coffee
- 10:00-12:00: preCICE course, part 1 (basics)
- 12:00-13:30: Lunch
- 13:30-15:30: preCICE course, part 2 (tools)
- 15:30-16:00: Coffee break
- 16:00-18:00: preCICE course, part 3 (implicit coupling)

The course continues with a part 4 (data mapping) on Thursday.

Later (19:00): Informal dinner

### February 14

- 08:30-09:00: Registration and coffee
- 09:00-09:30: Opening
- 09:30-10:30: Talk: News on the preCICE library and ecosystem
- 10:30-12:00: User introductions
- 12:00-13:30: Lunch
- 13:30-14:30: Invited speaker: Philip Cardiff - Using preCICE to couple OpenFOAM and solids4foam for fluid-solid interactions
- 14:30-15:30: (2x developer talks)
- 15:30-16:00: Coffee break
- 16:00-18:00: (4x user talks)

Later (19:00): Invited dinner in Garching

### February 15

- 08:30-09:00: Coffee break / synchronization
- 09:00-09:30: Outlook on preCICE v3
- 09:30-10:30: (2x developer talks)
- 10:30-12:00: World Café
- 12:00-13:30: Lunch
- 13:30-15:30: (4x user talks)
- 15:30-16:00: Coffee break
- 16:00-18:00: Hands-on user support session

### February 16

- 08:30-09:00: Coffee break / synchronization
- 09:00-11:00: preCICE course, part 4 (data mapping)
- 11:00-12:00: Closing (+ prepare user support sessions)
- 12:00-13:30: Lunch
- 13:30-15:30: Hands-on user support session
- 15:30-16:00: Coffee break
- 16:00-18:00: Hands-on user support session

## Program details

### User introductions

On the first day, we will have a round of introductions, so that everyone knows who to talk to during the workshop.
[Submit](https://ipvs.informatik.uni-stuttgart.de/cloud/s/G68eRdTTx5832CK) one PDF slide (16:9, with name `surname-firstname.pdf`) with your name and some key details/pictures about your research till February 9, as we need to prepare a single slideshow.

### Invited talk

<details class="workshop-event" id="talk-invited" open="true"><summary>Using preCICE to couple OpenFOAM and solids4foam for fluid-solid interactions</summary>
  <p><b>Speaker:</b> <a href="https://people.ucd.ie/philip.cardiff">Philip Cardiff</a><br/>
<b>Affiliation:</b> University College Dublin, Ireland and <a href="https://solids4foam.github.io/">solids4foam</a> project</p>
<p>Abstract to be announced soon.</p>
</details>

### User talks

We have already accepted the following user talks. [Submit your talk](#call-for-contributions). The detailed schedule will be available in late January

<details class="workshop-event" id="talk-shams"><summary>Gym-OpenFOAM: An OpenAI Gym environment for active flow control with deep reinforcement learning</summary>
<p><b>Speaker:</b> Mosayeb Shams<br/>
<b>Affiliation:</b> Heriot Watt University, UK</p>
<p>OpenAI Gym API is a de facto standard API to communicate between reinforcement learning algorithms and simulation environments. The new software Gym-OpenFOAM is a Python environment fully compliant with the OpenAI Gym API to facilitate developing and implementing reinforcement learning algorithms for fluid dynamics applications. In a reinforcement learning-interaction cycle, Gym-OpenFOAM takes advantage of coupling tool preCICE, an open-source library for multi-physics coupling, to handle information exchange between agent (decision maker) and OpenFOAM (simulation environment), an open-source library for computational fluid dynamics. This coupling approach results in a seamless non-invasive integration of a realistic simulation system with the reinforcement learning paradigm, enabling the application of deep reinforcement learning algorithms to the continuum mechanics field.</p>
<p>For the purposes of demonstration, we use Gym-OpenFOAM framework to apply two state-of-the-art reinforcement algorithms, namely proximal policy optimisation (PPO) and soft actor-critic (SAC), for drag attenuation in flow over a cylinder.</p>
</details>

<details class="workshop-event" id="talk-fischler"><summary>A preCICE-interface for the ice-sheet and sea-level system model</summary>
<p><b>Speaker:</b> Yannic Fischler<br/>
<b>Affiliation:</b> Technical University of Darmstadt, Germany</p>
<p>Earth system modeling requires expertise of multiple scientific domains, including, for example, geographers, oceanologists and glaciologists. The Ice-sheet and Sea-level system model (ISSM) is a MPI parallel multiphysics finite element framework to simulate large ice-sheets like Greenland and Antarctica. Previous performance studies have validated the good scaling properties of this code.
In climate simulations, ISSM depends on external input data, e.g. subglacial hydrology models. Currently, this data is precalculated and handed to ISSM as a static file input. However, as the subglacial hydrology is affected by ice sheet evolution as well, bidirectional high frequent data exchange is beneficial for the entire accuracy. To enable dynamic data exchange during run-time, we develop the first ever exchange interface for ISSM using preCICE.
We present the coupling of ISSM and CUAS-MPI, a subglacial hydrology model, and discuss the challenges of integrating preCICE in a complex framework like ISSM regarding time stepping and data accessibility. We note that the new possibilities of coupled execution then also create new challenges in modeling, e.g. geometry evolution.</p>
</details>

<details class="workshop-event" id="talk-abele"><summary>Coupling an ice sheet model with satellite image based simulation of calving fronts</summary>
<p><b>Speaker:</b> Daniel Abele<br/>
<b>Affiliation:</b> Alfred-Wegener-Institut, Deutsches Zentrum für Luft- und Raumfahrt, Germany</p>
<p>ISSM (Ice-sheet and Sea-level System Model) is a software to simulate the evolution of glaciers and ice sheets. One of its important features is evolving the front of the glacier, which changes position due to melting, calving, and the forward movement of the glacier itself. Specifically, physics based models of calving are not yet able to capture the real behavior of the system precisely. We want to develop a data driven approach, computing the speed of the front from known positions that have been extracted from satellite images. This code will be coupled with ISSM using preCICE. The project is in its early stages. After a short introduction to ISSM, we will present the numerical methods we will use to compute the frontal speed. The front can be modeled using a level-set equation. Inversion of this model delivers the speed of the front. We will discuss the issues we expect to encounter in coupling the code to ISSM, like adaptive meshes, load balancing, integration of preCICE into ISSM, and stability of the coupled solution. The physics based approaches to calving are deeply integrated into ISSM. We hope to present some preliminary results of stability experiments where ISSM and the moving front module are less tightly coupled.</p>
</details>

<details class="workshop-event" id="talk-adhav"><summary>Investigation of OpenFOAM-XDEM momentum coupling results for AWJC Nozzle using preCICE</summary>
<p><b>Speaker:</b> Prasad Adhav<br/>
<b>Affiliation:</b> University of Luxembourg, Luxembourg</p>
<p>The high-speed water jet is the momentum source in an Abrasive Water Jet Cutting Nozzle. This momentum is transferred to the abrasive particles & the air within the nozzle. This leads to turbulent & complex particle-laden flow in the nozzle. These flow conditions can influence particle impacts on the nozzle, thus influencing erosion. Hence it is imperative that this complex particle-laden flow is captured correctly.
The momentum exchange can be directly from the water jet to the particles or indirectly through the airflow. In this work, we investigate these fluid-particle momentum exchanges.
Our prototype uses preCICE for volumetric coupling of XDEM (for the particle motion), & OpenFOAM (for the fluid). XDEM uses fluid flow conditions to compute the forces acting on particles. XDEM computes the particle momentum source that is injected into the fluid solver. The results of the coupled simulation align with literature & can be extended to include the FEM component for erosion predictions.</p>
</details>

More talks following (after January 16).

### Developer talks

<details class="workshop-event" id="talk-rodenberg"><summary>B-Splines for flexible and robust multirate time stepping</summary>
<p><b>Speaker:</b> Benjamin Rodenberg<br/>
<b>Affiliation:</b> Technical University of Munich, Germany</p>
<p>Black-box coupling schemes often only reach first order when it comes to time stepping. Most coupling schemes do not allow the coupled solvers to run at independent time scales (multirate). In this talk, I will explain how we use B-Splines to construct a higher-order interpolating function for each coupling time window in preCICE. This approach allows multirate and higher-order time stepping for coupled black-box solvers. Additionally, I introduce the API, demonstrate possible use cases, and investigate the performance of this new feature through the example of a simple oscillator test case.</p>
</details>

More talks following (after January 16).

### World Café

A classic for a preCICE Workshop, the preCICE [World Café](https://en.wikipedia.org/wiki/World_caf%C3%A9_(conversation)) is your opportunity to shape the future of preCICE.

### User support sessions

It's a workshop and not a classical conference, as we also get to do things together. Meet the experts to discuss your current or planned projects, as well as to debug any current issues.

On March 31, 10:00-15:00, we will have a post-workshop user-support session to catch up on any progress.

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
  <p>Instructors: TBA</p>
  <p>A hands-on introduction to preCICE, recommended for new users that want to learn how to couple their own codes.</p>  
  <p>In this fourth part, we will explore aspects of accuracy and efficiency in data mapping, using <a href="tooling-aste.html">ASTE</a>.</p>
  </details>

## Location

Having offered [preCICE 2022](precice-workshop-2022.html) and [preCICE 2021](precice-workshop-2021.html) online, we are now looking forward to meeting our community again in person, similarly to [preCICE 2020](precice-workshop-2020.html). The event itself will take place at the [LRZ](https://www.lrz.de/english/) building ([Boltzmannstr. 1](https://www.openstreetmap.org/search?query=Boltzmannstr.%201%20Garching#map=19/48.26176/11.66999)) and the social events will take place in the town of Garching.

As of December 2022, there are no particular Corona-related regulations anymore in Munich, while there is a recommendation of using masks in the public transportation. Follow the latest updates in the [official portal of the City of Munich](https://stadt.muenchen.de/infos/corona-fallzahlen-muenchen) (in German).

### Collaborating hotels

We have reserved hotel rooms in Garching for you to book at reduced/fixed prices and until they run out.

- [Hoyacker Hof](https://www.hoyackerhof.de/en/home/) (use the keyword `precice` till January 13 for a fixed price)
- [Hotel König Ludwig II.](https://hkl.de/) (use the group name `TENT-TU 13022023` till January 16 for a fixed price)
- [Dorint](https://dorint.com/de/muenchen-garching) (use the keyword `precice` till February 1 for a fixed price)
- [Marias Inn](http://www.marias-inn.com/) (use the keyword `precice` for 10% off)

We may add more options soon.

Any hotel on the campus or between the subway stations Garching Hochbrück and Garching Forschungszentrum will be fine.
The invited dinner will be at [Neuwirt](https://gasthof-neuwirt.org/) (subway station Garching).
Note that the campus is relatively far for the city center of Munich and you would need an M+2 ticket to reach the campus via public transport.

## Registration

Fill the [registration form](https://ipvs.informatik.uni-stuttgart.de/cloud/apps/forms/P3mcXayss5c3WrNA) till the (early) registration deadline and follow the payment instructions in the form.

Ticket prices:

- For members of universities and publicly-funded research institutes (any country): 300€ (early), 450€ (late)
- For all other participants: 600€ (early), 900€ (late)

The ticket includes access to the hands-on preCICE course, all talks, the consulting/user-support sessions (during the workshop and the post-workshop session on March 31st), invited dinner on February 14, as well as lunch and coffee breaks on all days.

See the [important dates](#important-dates) for the early and late registration deadlines.

## Contact

In case of any questions, contact the organizers at `precice2023` at `mailsccs.in.tum.de`.

## Get the poster - spread the word

Help us gather researchers from your field and make the workshop even more relevant to you (e.g., by sharing this [LinkedIn post](https://www.linkedin.com/posts/gerasimoschourdakis_precice-workshop-2023-activity-7006663153442803712-P0Gc)). Show your colleagues where you will be this February! Do you need high-quality prints? Just ask!

<a href="material/flyers/precice2023-poster.pdf" title="preCICE Workshop 2023 poster on GitHub"><img src="material/flyers/precice2023-poster-thumbnail.png" alt="preCICE Workshop 2023 poster (png thumbnail)"></a>
