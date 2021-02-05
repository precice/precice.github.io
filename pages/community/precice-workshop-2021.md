---
title: preCICE workshop 2021
keywords: precice workshop 2021, event, events, workshop
summary:
permalink: precice-workshop-2021.html
toc: false
redirect_from: /preCICE2021/
---

<img class="img-responsive center-block" src="images/events/precice2021.svg" alt="preCICE Workshop banner" style="max-width: 500px; margin:auto;">

The 2nd preCICE Workshop will be held virtually through the [University of Stuttgart](https://www.uni-stuttgart.de/en/), from February 22-25, 2021. The workshop is a coming together of the preCICE community to share ideas, experiences and knowledge about using preCICE, and to learn from others in the process. [Registration](https://www.precice.org/precice-workshop-2021.html#registration) for the workshop is still open. 

If you have any questions regarding the workshop, please contact us at precice2021@ipvs.uni-stuttgart.de.

## Program

The workshop stretches from Monday noon to Thursday evening.

### Monday, February 22

* 13:00 - 13:30 Welcoming
* 13:30 - 14:00 Q&A session of the introductory video: Fundamentals of preCICE 
* 14:30 - 15:00 Break
* 15:00 - 17:00 preCICE Course I

### Tuesday, February 23
* 10:00 - 13:00 User presentations (20-30 min each)
  * Pre-recorded
  * Recording played live during session
  * live Q&A afterwards
* 13:00 - 14:00 Break
* 14:00 - 16:00 preCICE Course II
* 16:00 - 17:00 Frédéric Simonis: What's new in preCICE
* 17:00 - 18:00 Networking/Social Event
  * Networking event where participants can network and discuss their work in more detail with each other after watching the user presentation talks.


### Wednesday, February 24
* 10:00 - 11:30 Developer talks
  * Pre-recorded
  * Recording played live during session 
* 11:30 - 12:00 Speakers in breakout rooms for Q&A
* 12:00 - 13:00 Break
* 13:00 - 14:30 Developer talks
* 14:30 - 15:00 Speakers in breakout rooms for Q&A
* 15:00 - 16:00 Break
* 16:00 - 17:00 Workshop feedback
  * World Cafe Introduction
  * Feedback session for the workshop
* 17:00 - 17:10 Closing

### Thursday, February 25

* The entire day is dedicated to hands-on user support. Users will be able to interact with developers in various breakout rooms. The user support can vary from questions asked live, to discussing more in-depth problems on the Discourse channel.
* 10:00 - 12:00
* 13:00 - 15:00
* 16:00 - 18:00

## Program details
* Before the workshop, an Introductory video will be distributed to all participants. Participants will then be able discuss the Introductory video in the Q/A session.
* Two Introductory Workshop Sessions recommended for new users that want to learn how to couple their own codes. 
* The developer talks consist of various topics relating to the internals of preCICE. The following topics will be presented in the developer talks:
* Session I:
  * Two-level Initialization
  * Data-Mapping in preCICE
  * Macro-Micro Coupling
  * Language Bindings
* Session II:
  * deal.II Adapter
  * FEniCS Adapter
  * OpenFOAM Adapter
  * How to become a good user
* User Talks:
    <details class="workshop-event" id="Adhav"><summary>Prasad Adhav: Evaluation of erosion inside AWJC Nozzle by 6‐way coupling of DEM+CFD+FEM using preCICE</summary>
    <p>Authors: <a>Prasad Adhav</a>, Xavier Besseron, Alban Rousset, Bernhard Peters<br/></p>
    <p>The objective of this work is to study the particle‐induced erosion within a nozzle for abrasive cutting. So far, the erosion in the nozzle was predicted only through the number of collisions, using only a simple DEM+CFD coupling. To improve these predictions, we extend our model to a 6‐way momentum coupling with DEM+CFD+FEM to account for deformations and vibrations in the nozzle. </p>
    <p>Our prototype uses preCICE to couple 3 numerical solvers: XDEM (for the particle motion), OpenFOAM (for the water jet), and CalculiX (for the nozzle deformation). The OpenFOAM adapter has been adapted to add particles drag, which is modeled as semi‐implicit porosity, implicit and explicit drag terms injected to OpenFOAM solver through fvOptions.</p>
    <p>This 6‐way coupling between DEM+CFD+FEM brings the simulation of the particle‐laden multiphase flow inside the abrasive cutting nozzle close to the real‐life conditions. Thus opening up opportunities for further investigation and improvement of the Nozzle design.</p>
    </details>

    <details class="workshop-event" id="Enders"><summary>: A. Enders‐Seidlitz: Development of a python‐based crystal growth simulation framework</summary>
    <p>Authors: <a>A. Enders‐Seidlitz</a>, J. Pal, K. Dadzis<br/></p>
    <p>The NEMOCRYS project in the group “Model experiments” at the IKZ develops an open‐source‐based framework for coupled multiphysics simulation in crystal growth. Currently, Gmsh for FEM mesh generation and Elmer to solve the heat transfer problem including inductive heating are applied. These tools are wrapped in an easy‐to‐use python interface that allows for highly‐ parameterized models and enables automatized large‐scale studies. A major challenge in the present implementation is the coupling between Elmer and Gmsh: The transient simulation involves moving boundaries and requires mesh updates. In future, an additional coupling to OpenFOAM will be needed to consider the fluid dynamics of the liquid and gas phase. This requires transient bi‐directional multiscale coupling in 2D and 3D both on surfaces and in volumes. We consider preCICE a promising library to meet this challenge and would like to discuss the need for further adapters and coupling algorithms. </p>
    </details>

    <details class="workshop-event" id="Heck"><summary>: Ulrich Heck: Transfer of FSI coupling with preCICE, OpenFOAM and CalculiX to industrial applications‐Status and plans</summary>
    <p>Authors: <a>Ulrich Heck</a>, Martin Becker<br/></p>
    <p>The preCICE coupling provides an efficient and powerful tool for solving demanding fluid structure applications with OpenFOAM and CalculiX. Based on this, the needs for industrial users will be shown and solution approaches will be presented during the lecture. Besides a GUI solution for an efficient case setup, benchmarks for different problems and modelling approaches such as free surface flows or the use of shell elements on the structure side will be presented. Finally, current fields of work and requirements for future applications such as fluid structure solutions for filter applications or closing processes with dynamic wall contact will be shown. </p>
    </details>

    <details class="workshop-event" id="Jaust"><summary>Alexander Jaust: Solving coupled free and porous‐media flow with preCICE and DuMuX</summary>
    <p>Authors: <a>Alexander Jaust</a>, Miriam Mehl<br/>
    <p>We present recent results of coupling free and porous‐media flow applications and the development of the corresponding adapter. The main focus is on simulations based on DuMuX (https://dumux.org/) which is an open‐source framework for solving flow problems, especially porous‐media flow. We present results using the partitioned approach of preCICE for different scenarios and compare it, where applicable, with monolithic simulations or exact solutions.</p>
    </details>

    <details class="workshop-event" id="Odersky"><summary>: Leonhard Odersky: Energy system optimization with PreCICE</summary>
    <p>Authors: <a>Leonhard Odersky</a>, Smajil Halilovic<br/></p>
    <p>In order to be able to optimally design an urban energy system, many complex interactions must be taken into account. The project GeoKW is therefore investigating the optimal use of shallow geothermal heat pumps for energy supply of the city of Munich. This could create synergies in meeting the heating and cooling loads of the various infrastructures in the city. The optimization of this highly complex problem requires the coupling of the groundwater simulation software PFLOTRAN and the energy system optimization framework urbs. This coupling is realized with the help of PreCICE. For a first exemplary application, the coupling is already implemented and shows promising results. In further work, the coupling is to be extended to the entire area of the city of Munich. Based on the first results, we would like to present the optimization problem with the optimization framework, the coupling approach and the use of preCICE in this framework at the upcoming workshop.</p>
    </details>

    <details class="workshop-event" id="Pauw"><summary>: Viktoria Pauw: Using PreCICE for GeoKW on Supermuc‐NG</summary>
    <p>Authors: <a>Viktoria Pauw</a><br/></p>
    <p>We would like to contribute on our experience employing PreCICE on Supermuc‐NG for the project GeoKW. The aim of the project is to improve the use of shallow geothermal energy by providing simulation data on optimal placement of facilities. When thermal interference is not assessed while planning the installation locations and usage of heat pumps, it can severely impact efficiency. For this problem, we use preCICE to couple urbs, a linear programming optimisation model for energy systems, with PFLOTRAN, a subsurface flow solver. PreCICE allows fast implementation to couple these 2 codes for large distributed systems with minimal effort. All communication, mapping and acceleration schemes are already implemented. The open source nature and flexibility allows us to use preCICE extensively for our unique application. The coupled model will now be tested on the HPC systems at LRZ in Garching and we would welcome the opportunity to report the preliminary results at the upcoming workshop.</p>
    </details>

    <details class="workshop-event" id="Stegmeir"><summary>: Andreas Stegmeir: Application of code coupling in magnetic fusion</summary>
    <p>Authors: <a>Andreas Stegmeir</a>, Ishaan Desai, Benjamin Ueckermann<br/></p>
    <p>Nuclear fusion technology is projected to play a major role as a source of clean and safe energy in the future. the process of converting complex physical theories to working engineering applications, modelling and simulation assumes a vital position. While simulating nuclear fusion devices, the physical and geometrical complexity arising from different scales and physical regimes needs to be addressed. In this talk opportunities of coupling methods for solving the multiphysics and multiscale problems of magnetic fusion will be presented. As a first application the coupling of a code simulating the core region of a tokamak with the code GRILLIX simulating turbulent transport in the edge region is considered. To perform this coupling, a partitioned black‐box approach is pursued using the open‐source coupling library preCICE. The main focus is on the geometrical complexities of the coupling arising due to the usage of different coordinates in both participants.</p>
    </details>

* The World Cafe styled feedback session will consist of various breakout rooms. Participants will be free to discuss the pros/cons of the virtual workshop.

## Registration

This is an academic, non-profit conference. However, we still have to collect a small registration fee. 

For early registrations (until January 17), the registration fee is 50€. Registration is still possible after this date, with a registration fee of 100€.

Please use the [registration form](https://tagung.informatik-forum.org/preCICE2021/register) to register.

For those that do not have access to funding to pay for the registration, you can write an email to us at precice2021@ipvs.uni-stuttgart.de, and we will evaluate each case individually. For selected cases we will supply a voucher to be used when registering that voids the required payment.

## Call for contributions
<details><summary>Oh no, you just missed the call for contributions deadline!</summary>
<p>Please note that this is not a classical scientific conference, but a user and developer meeting. Contributions are very welcome, if they fit the purpose, but not mandatory.<p>

<p>Possible contributions include (non-exclusively):
<ul>
<li>New adapters for community codes</li>
<li>Coupling numerics</li>
<li>Comparison of different mapping, coupling, and communication methods</li>
<li>Coupling boundary conditions</li>
<li>Multi-scale coupling</li>
<li>Building, packaging, testing, documentation and other Research Software Engineering topics</li>
</ul>
<p>

Please use the <a href="https://tagung.informatik-forum.org/preCICE2021/register">registration form</a> if you would like to submit a talk.

## Important dates

* Early bird registration until January 17 at 23:59 CET
* Late registration until February 15 
* Abstract submission until January 17 at 23:59 CET
* Recorded talks to be received until February 15
* Workshop February 22-25
