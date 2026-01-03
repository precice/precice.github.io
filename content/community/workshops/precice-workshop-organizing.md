---
title: Organizing a preCICE workshop
keywords: precice workshop, workshop
summary:
permalink: precice-workshop-organizing.html
toc: true
---

While the preCICE workshop lasts a week, it takes several months of preparation to make it successful. In this preparation, the complete preCICE team plays an active role, while the event management role rotates, to integrate different perspectives and to distribute the load. In cases where this makes sense, we organize the workshop together with local user groups, opening further networking opportunities for the community.

In this page, we document common steps and lessons learned, aiming to make onboarding of new organizers easier. Besides, who remembers what material the registration desk needed last year, if we cannot even remember what we had for lunch?

We have also published our experiences and recommendations together with the [ESPResSo](https://espressomd.org/) and [DuMux](https://dumux.org/) teams:

{% for pub in site.publications %}
{% if pub.title == "Organizing software community workshops: Experiences from three independent simulation software projects" %}
<div class="row">
<div class="col-md-10 col-md-offset-1">
  <div class="panel panel-primary panel-precice">
    <div class="panel-heading-precice">
      <strong>{{ pub.title }}</strong>
    </div>
    <div class="panel-body">
      <p>
        <em>{{ pub.authors }}</em>,
        {{ pub.journal.name }},
        Volume {{ pub.journal.volume }},
        {{ pub.journal.publisher }},
        {{ pub.year }}.
      </p>
      <a href="{{pub.pub-url}}">Publisher's site</a>&nbsp;&nbsp;
      <a href="assets/{{ pub.bibtex }}">Download BibTeX &nbsp;<i class="fas fa-download"></i></a>
    </div>
  </div>
</div>
</div>
{% endif %}
{% endfor %}

## First urgent steps

Do these steps as soon as possible, as other major steps depend on them.

### Set and advertise a date

Decide on a place and date before the previous year's workshop, so that this can be announced to the current participants.

Factors that typically contribute to a date decision:

- Venue availability
- Lecture-free periods
- School holidays
- Overlap with other related conferences (check, e.g., ECCOMAS, IACM, SIAM)

Once finalized, a "save the date" entry should be listed immediately on:

- the preCICE website (news banner, community overview, first dummy page of the workshop)
- the preCICE forum
- the social media platforms that preCICE is active on

### Find a venue

If not at the same time as the date announcement, decide on a venue, and book rooms as soon as possible after that. Depending on the local workflows and availability, room booking requests might need to be done more than six months ahead, so aim to book at least the main room at the time that the venue is decided.

Typical room requirements:

- Fitting around 50 people (but not much larger than that)
- For the hands-on training course and the user support sessions: easy access at every seat, (collaborative) working surface, enough power sockets, stable internet connection
- For the talks: good acoustics and visibility, recording infrastructure
- For the world café: (standing) tables, placed far from each other, isolated from noisy areas of the building
- For the catering: ideally next to the rooms, isolated, standing

With "recording infrastructure", we mean infrastructure to capture the speaker audio+video, slides, and an additional microphone in separate stream (a meeting camera system is typically not fitting the purpose). We can provide specialized hardware to do the mixing of these channels into what you later see as recordings on YouTube, if this is not already available in the room.

The rooms for the training and the talks are typically different, even if the schedule is typically structured as a single track. The catering and the world café can typically use the same room and tables, but reusing the collaborative working room for the world café is also fine.

### Define financing scheme

Typically, the workshop is co-funded by participation fees. An important dependency for subsequent steps is which entity can collect and process such participation fees. This might be an association supporting scientific activities, an event management unit of a university, or an external company. The setup should allow to model an income to reinvest into maintaining preCICE.

Multiple types of tickets are typically defined:

- early -vs- late registration
- full price -vs- discount for academia
- training course included -vs- only main part of the workshop

In addition, free registration is accounted for:

- holders of a [support license](community-support-precice.html#2-support-license)
- invited speakers
- organizers (if possible)
- special cases

Finally, account for a number of travel grants (at least for the invited speakers), if possible.

### Set milestones

Set clear responsible persons for each task, and track progress in a collaborative project board.

Important dates to set:

- "save the date" announcement: one year ahead
- call for contributions (needs a form): open six months ahead. An early call mainly acts as advertisement and helps participants that need a visa application to travel.
- open registration (needs a form): the earlier the better, and useful as a concrete action when advertising.
- abstract submission deadline and contribution acceptance: the earlier the better, typically before the early-bird registration deadline. Aim for 3-4 months before the workshop, to facilitate the visa process. The contribution acceptance can be as short as one week after the deadline.
- early-bird registration deadline: important for estimating the number of participants, driven by the catering requirements.
- request catering offers: typically 3-4 months before the workshop.
- reserve tables for the workshop dinner: typically 3-4 months before the workshop.
- late registration deadline: typically 2-3 weeks before the workshop, to give an accurate number of participants to the caterer.

## Registration infrastructure

Two forms are mainly needed, and it is easier if they are decoupled: an abstract submission form, and a registration form.

The abstract submission form should collect:

- Kind of contribution (talk or poster, if offered)
- Presenter
- Authors
- Affiliations
- Webpage (optional)
- GitHub handle (optional)
- Contact email
- Title
- Abstract (plain text, max 1500 chars including spaces)
- A disclaimer that, if accepted and the presenter registers, this information is going to appear on the website

This form can be implemented in any survey tool. Live access to the data by the preCICE team would be helpful, to understand where further advertising might be needed.

The registration form should collect:

- Name
- Affiliation
- Billing address and ticket type/price (depending on the financial setup)
  - Organization or person
  - Internal routing information (institute, project)
  - Email for the invoice
  - VAT ID
  - Academic discount / Normal price
- Contact email
- Whether an invitation is required for visa purposes
- Dates/modules that one plans to attend:
  - Training course
  - Main workshop
  - Dinner
  - User support session (if the only event of the day)
  - Potential other social events
- Dietary restrictions
- Permission to include contact details in a participants list distributed to the participants
- A disclaimer that photos are going to be taken on site and will be used for advertising
- Potential questions of interest for the workshop (particular topics of interest, goals)

This form is typically implemented by the local organizers. Payments including invoices or receipts could be part of the process or separate.

After submitting either form, the applicant should get an automatic confirmation (feature not available in some tools, e.g., Nextcloud), which includes information on how to pay the registration fee.

On-site registration is typically not planned or advertised, but can be handled in small numbers.

## Advertising

Advertising the workshop happens mainly in three phases:
when the date is fixed, when the call for contributions is open, and when the registration deadline is approaching.
Surveys from previous workshops showed that most participants find about the workshop via collaborators (including forwarded emails) or simply on the website.
Therefore, targeted emails and an early announcement on the website (including the news banner) are crucial.

Further places where we typically advertise are:

- preCICE channels:
  - forum
  - chatroom
  - [social media](https://precice.org/community-channels.html)
- Local communities:
  - [Quartl](https://www.cs.cit.tum.de/sccs/weiterfuehrende-informationen/quartl/)
  - [SimTech](https://www.simtech.uni-stuttgart.de/communication/)
- Event calendars:
  - [FOSS Events](https://foss.events/)
  - [Gauß-Allianz's HPC calendar](https://veranstaltungen.hpc-in-deutschland.de/)
- News and mailing lists:
  - [NADigest](https://na-digest.coecis.cornell.edu/na-digest-html/)
  - [CFD Online News](https://www.cfd-online.com/Forum/news.cgi/form/0)
  - [NAFEMS News](https://www.nafems.org/mynafems/submitnews/) and [events](https://www.nafems.org/events/industry-events/)
  - [HPC Announce](https://lists.mcs.anl.gov/mailman/listinfo/hpc-announce)
  - [NHR Announcements](https://www.listserv.dfn.de/sympa/subscribe/nhr-announcements)
  - Mailing lists of collaborating projects
- Other communities:
  - [CFD Online forum](https://www.cfd-online.com/Forums/main/259965-precice-workshop-conference-sessions.html)
  - [CalculiX forum](https://calculix.discourse.group/)
  - Reddit [r/cfd](https://www.reddit.com/r/CFD/)
- Personal posts on LinkedIn and in the following groups:
  - [preCICE](https://www.linkedin.com/groups/9073912/)
  - [OpenFOAM](https://www.linkedin.com/groups/1920608/)
  - [HPC](https://www.linkedin.com/groups/87791/)
  - [Computational Fluid Dynamics](https://www.linkedin.com/groups/66032/?lipi=urn%3Ali%3Apage%3Ad_flagship3_groups_index%3BzXis%2BeD7QbaLqV6CHaM8PQ%3D%3D)
  - [Fluid-Structure Interaction](https://www.linkedin.com/groups/2195717/?lipi=urn%3Ali%3Apage%3Ad_flagship3_groups_index%3BzXis%2BeD7QbaLqV6CHaM8PQ%3D%3D)
  - [NAFEMS Community](https://www.linkedin.com/groups/84748/?lipi=urn%3Ali%3Apage%3Ad_flagship3_groups_index%3BzXis%2BeD7QbaLqV6CHaM8PQ%3D%3D)

## Reviewing contributions

After collecting all contributions in a list, add comments for each:

- Does the contribution clearly fit the workshop?
- What is the novelty from a preCICE perspective?
- Is it best suited for a talk or a poster?
- Further comments

Given that talk slots are limited, we prioritize talks that are potentially interesting to a wider audience and are already concrete enough.
Vision talks in new directions might also be fitting.
Technical topics, or early work that can profit from extensive discussion, are better suited for posters.

After a decision is made, send official confirmation/rejection emails to the contributors.
For talks, ask about time restrictions for scheduling the talk.
For posters, include information about:

- What size and orientation is possible? A0 poster boards fitting either orientation is typically the default.
- Is there a template to follow? Default would be no.
- When should the posters be hanged, and until when do they have to be taken down?
- Is there a local printing option? Who should they send a poster to and until when? What is the cost (typically free)?

For both talks and posters, remind contributors that they need to register separately.

Ideally, publish the list of accepted talks and posters (unscheduled) and ask contributors to confirm their details.

## Scheduling

Prepare the schedule in two phases:

1. Preliminary schedule: Mainly includes starting and ending dates/times, and overall sessions.
   Main purpose: Get an idea of what this event is about, request travel funding, and plan traveling.
   The details can change later.
2. Detailed schedule: As soon as talks are accepted and time restrictions settled.

Elements to mention in the detailed schedule:

1. Catering offerings: This is important information for the caterer and for the travel reimbursement.
   Add an "Arrival and coffee" option in the morning.
   This typically leads to two coffee breaks and one lunch per day.
2. Schedule buffers: Lunch should be at least 1h and coffee breaks at least 30min.
3. Course components can split between sessions or even days, but each session should be allocated at least 90min (ideally 120min). Especially in the beginning, account for some time for setup or resolving installation issues.
4. Don't forget to schedule the group photo, any interaction components (e.g., world café), and any evening activities (formal and informal dinner).

## Tasks to delegate

There are a few minor non-local tasks, which can be easily distributed to others within the organization team:

- Preparing and announcing feedback form. Ideally, participants can fill out the feedback form already during the last day of the workshop.
- Ordering and preparing swag.
- Managing the word café (collecting topcis, introducing the concept, keeping the time)
