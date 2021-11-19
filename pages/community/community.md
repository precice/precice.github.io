---
title: Become part of the preCICE community
permalink: community.html
keywords:
summary:
toc: false
editme: true
---

<img class="img-responsive center-block" src="images/events/precice2021.svg" alt="preCICE Workshop banner" style="width: 500px; margin: auto;">
<!-- ![preCICE community](images/community-banner2.jpg) -->

## preCICE workshops

Do you want to meet the community and learn what is new in preCICE? There is no better way than to join one of our workshops! We already had preCICE workshops in [February 2020](precice-workshop-2020.html) (Munich) and [February 2021](precice-workshop-2021.html) (online/Stuttgart), and already planning the [next one](precice-workshop-2022.html) (online/Stuttgart). We are excited to continue to interact with all users/developers/interested-persons and enthusiasts of preCICE.

## How our community is using preCICE

We have compiled a community showcase with several of the most impressive preCICE implementations. The range of application fields is diverse, including e.g.  simulating the [temperatures on the moon](community-projects.html#simulation-of-temperatures-on-the-moon-with-thermos),  the [biomechanics of the heart valve](community-projects.html#evaluation-of-heart-balve-biomechanics), [modelling wind in urban areas](community-projects.html#hybrid-simulation-methods-for-wind-modelling-in-urban-areas), and simluating [high impact loads on structures](community-projects.html#fsi-simulations-of-high-impact-loads-on-structures).
You can find many more use cases on the [projects page](community-projects.html).

{% assign testimonials = site.testimonials | reverse %}
{%- for testimonial in testimonials -%}
{%- if testimonial.img -%}
<img class="img-circle" src="images/testimonials/{{ testimonial.img }}" style="border-radius: 50%; width: 100px; height: 100px; object-fit: cover; display: inline; border: 1px solid lightgrey;">
{%- endif -%}
{% endfor %}

Do you use preCICE? [Tell us](community-channels.html) your story and will be happy to feature it here!

## Contributions to preCICE

Since its first commit in 2008, preCICE has been developed by three generations of doctoral students: simply look at the [list of active and previous developers](community-contributors.html). Your (small or large) [contributions are welcome](community-contribute-to-precice.html).
