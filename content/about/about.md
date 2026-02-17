---
title: About the preCICE project
permalink: about.html
keywords: about, project leaders, timeline, impressum, legal
summary:
hide_sidebar: true
toc: false
editme: false
redirect_from:
  - /about/
  - /timeline/
---

## Development

preCICE is developed in the groups of [Benjamin Uekermann (Usability and Sustainability of Simulation Software)](https://www.ipvs.uni-stuttgart.de/departments/us3/) and [Miriam Schulte (Simulation of Large Systems)](https://www.ipvs.uni-stuttgart.de/departments/sgs/) at the University of Stuttgart and in the group of [Hans-Joachim Bungartz (Scientific Computing in Computer Science)](https://www.cs.cit.tum.de/en/sccs/home/) at the Technical University of Munich. [Support contracts](community-support-precice.html) are offered through [TTI GmbH](https://www.tti-stuttgart.de/).

<br>
<img class="img-responsive center-block" src="images/developer/precice-devs.png" alt="preCICE contributors" style="width: 800px; margin: auto;">
<br>

For the full list of contributors to preCICE please see our [community page](community-contributors).

<!--## Scientific project leaders

<br>
{% assign dev_leads = site.data.developer.leads | sort: "name" %}
<div class="row">
<div class="col-md-8 col-md-offset-2">
<ul class="devlist">
  {% for p in dev_leads %}
  <li{% if forloop.first %} class="devlist-first"{% endif %}>
    <div class="devlist-img">
      {% if p.img %}
      <img src="images/developer/{{ p.img }}.jpg" alt="Portrait">
      {% endif %}
    </div>
    <div class="devlist-left">
      <p>
        <strong>{{ p.fullname }}</strong><br/>
        {{ p.institution }}
      </p>
    </div>
    <ul class="devlist-right">
      {% if p.url %}<li><a href="{{ p.url }}" alt="See the institutional website" class="no-icon"><i class="fas fa-university"></i></a></li>{% endif %}
      {% if p.github %}<li><a href="https://github.com/{{ p.github }}" alt="See the Github profile" class="no-icon"><i class="fab fa-github"></i></a></li>{% endif %}
    </ul>
  </li>
  {% endfor %}
</ul>
</div>
</div>-->

The conceptual ideas of preCICE are not completely new. preCICE is an advancement of FSI*ce, developed by Markus Brenk.

## Planning and development of precice.org

The website in its current form was planned and implemented by CH Lorenz Research and Innovation Consulting together with the preCICE team. For more information contact [Christopher Lorenz](https://christopherlorenz.com) at [christopher.lorenz@chlorenz.ug](mailto:christopher.lorenz@chlorenz.ug).

## Funding

<div class="row">
{% for item in site.data.funding %}
<div class="col-md-6">
        <div class="panel panel-default panel-custom">
          <div class="panel-heading-precice">
                <a href="{{ item.url }}" target="_blank" class="no-icon panel-title">
                <strong>
            {{ item.title }}
                </strong>
                </a>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-sm-4">
                <a href="{{ item.url }}" target="_blank" class="no-icon">
                <img src="{{ item.img }}" alt="Logo" class="img-responsive">
                </a>
              </div>
              <div class="col-sm-8">
                {% if item.description %}<p><small>{{ item.description }}</small></p>{% endif %}
                {% if item.number %}<p>Funding number: {{ item.number }}</p>{% endif %}
                <p>Years running: {{ item.period }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
{% endfor %}
</div>

## Prince XML

We use a non-commercial license of [Prince XML](http://www.princexml.com/) to generate the PDF version of the documentation. For more information see our [meta documentation page](docs-meta-publish-to-pdf.html).

## Website analytics

We use the open-source and privacy-friendly analytics service [Plausible](https://plausible.io/). Everyone can see the [analytics for this website](https://plausible.io/precice.org).

## Impressum

This website is maintained by

Benjamin Uekermann -
Universität Stuttgart -
Universitätsstraße 38 -
70569 Stuttgart

## Privacy

You can find the preCICE [privacy policy here](privacy.html).

![preCICE doughnuts](images/doughnuts.jpg)

preCICE is tasty because it is made with love by its contributors.
