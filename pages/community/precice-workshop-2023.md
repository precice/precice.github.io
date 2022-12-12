---
title: preCICE workshop 2023
keywords: precice workshop 2023, event, events, workshop
summary:
permalink: precice-workshop-2023.html
toc: false
redirect_from: /preCICE2023/
---

<img class="img-responsive center-block" src="images/events/precice2023.svg" alt="preCICE Workshop banner" style="max-width: 500px; margin:auto;">

{% note %}
Registration is now open - register early till January 9.
{% endnote %}

The 4th preCICE Workshop will be held in-presence at the campus Garching of the [Technical University of Munich](https://www.tum.de/), on February 13-16, 2023. The workshop is a coming together of the preCICE community to share ideas, experiences and knowledge about using preCICE, and to learn from others in the process.

Expect user and developer talks, hands-on training sessions, discussions with the developers on your applications and use cases, feedback rounds, and plenty of opportunities to network with the rest of our vibrant community.

## Call for contributions

You do not need to present anything to join this workshop. However, your contributions are very welcome! We are looking for talks that could be beneficial for the wider preCICE community. Are you developing a new adapter? Are you using preCICE for an exciting new application? Are you developing new methods that should not be missing from preCICE? Then open your editor and start sketching a short abstract (free text, < 1000 characters) for a 20min talk right now! 😉

We will accept contributions in two batches. **Submit your abstract till December 16**, and we will reply before Christmas. You can still submit later and till January 9, in which case, we will reply before January 16. There will be no further extensions.

[Submit your talk abstract](https://ipvs.informatik.uni-stuttgart.de/cloud/apps/forms/oS6C7tLp88t2EAHR).

## Important dates

- Early abstract submission: December 16
- Acceptance notification for early submissions: December 23
- Late abstract submission: January 9
- Early registration (discount): January 9
- Acceptance notification for late submissions: January 16
- Late registration: January 30
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

Later (19:00): Informal dinner

### February 14

- 08:30-09:00: Registration and coffee
- 09:00-09:30: Opening
- 09:30-10:30: Talk: News on preCICE and upcoming preCICE v3
- 10:30-12:00: User introductions
- 12:00-13:30: Lunch
- 13:30-15:30: (2x developer talks + invited speaker (TBA))
- 15:30-16:00: Coffee break
- 16:00-18:00: (4x user talks)

Later (19:00): Invited dinner in Garching

### February 15

- 08:30-09:00: Coffee break / synchronization
- 09:00-10:30: (3x developer talks)
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

Having offered [preCICE 2022](precice-workshop-2022.html) and [preCICE 2021](precice-workshop-2021.html) online, we are now looking forward to meeting our community again in person, similarly to [preCICE 2020](precice-workshop-2020.html). With the current situation, we are confident that this will be possible.

The event itself will take place at the [LRZ](https://www.lrz.de/english/) building (Boltzmannstr. 1) and the social events will take place in the town of Garching.

We will soon reserve hotel rooms in Garching for you to book with some discount and publish a list of hotels here. Note that the campus is relatively far for the city center of Munich and you would need an M+2 ticket to reach the campus via public transport.

### Collaborating hotels

We have reserved hotel rooms in Garching for you to book at reduced prices and until they run out. Note that the campus is relatively far for the city center of Munich and you would need an M+2 ticket to reach the campus via public transport.

- [Hoyacker Hof](https://www.hoyackerhof.de/en/home/) (use the keyword `precice`)

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

Help us gather researchers from your field and make the workshop even more relevant to you. Show your colleagues where you will be this February! Do you need high-quality prints? Just ask!

<a href="material/flyers/precice2023-poster.pdf" title="preCICE Workshop 2023 poster on GitHub"><img src="material/flyers/precice2023-poster-thumbnail.png" alt="preCICE Workshop 2023 poster (png thumbnail)"></a>
