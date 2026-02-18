---
title: Contributors
permalink: community-contributors.html
keywords: contributors, developers, maintainers
summary:
toc: true
---

## Maintainers

<br>
{% assign dev_main = site.data.developer.main | sort: "name" %}
<div class="row">
<div class="col-md-10 col-md-offset-1">
<ul class="devlist">
  {% for p in dev_main %}
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
      {% if p.orcid %}<li><a href="{{ p.orcid }}" alt="See the institutional website" class="no-icon"><i class="fab fa-orcid"></i></a></li>{% endif %}
      {% if p.github %}<li><a href="https://github.com/{{ p.github }}" alt="See the Github profile" class="no-icon"><i class="fab fa-github"></i></a></li>{% endif %}
    </ul>
  </li>
  {% endfor %}
</ul>
</div>
</div>

If you are interested in joining the team of preCICE maintainers, please [contact Benjamin Uekermann](https://www.ipvs.uni-stuttgart.de/departments/us3/).

## Previous maintainers

Previous mantainers and their affiliation at the time of their last significant contribution.

<br>
{% assign dev_premain = site.data.developer.main-inactive | sort: "name" %}
<div class="row">
<div class="col-md-10 col-md-offset-1">
<ul class="devlist">
  {% for p in dev_premain %}
  <li{% if forloop.first %} class="devlist-first"{% endif %}>
    <div class="devlist-left">
      <p>
        <strong>{{ p.fullname }}</strong><br/>
        {{ p.institution }}
      </p>
    </div>
    <ul class="devlist-right">
      {% if p.orcid %}<li><a href="{{ p.orcid }}" alt="See the institutional website" class="no-icon"><i class="fab fa-orcid"></i></a></li>{% endif %}
      {% if p.github %}<li><a href="https://github.com/{{ p.github }}" alt="See the Github profile" class="no-icon"><i class="fab fa-github"></i></a></li>{% endif %}
    </ul>
  </li>
  {% endfor %}
</ul>
</div>
</div>

## Further contributors

Previous contributors and their affiliation at the time of their last significant contribution.

<br>
{% assign dev_contrib = site.data.developer.contributors | sort: "name" %}
<div class="row">
<div class="col-md-10 col-md-offset-1">
<ul class="devlist">
  {% for p in dev_contrib %}
  <li{% if forloop.first %} class="devlist-first"{% endif %}>
    <div class="devlist-left">
      <p>
        <strong>{{ p.fullname }}</strong><br/>
        {{ p.institution }}
      </p>
    </div>
    <ul class="devlist-right">
      {% if p.orcid %}<li><a href="{{ p.orcid }}" alt="See the institutional website" class="no-icon"><i class="fab fa-orcid"></i></a></li>{% endif %}
      {% if p.github %}<li><a href="https://github.com/{{ p.github }}" alt="See the Github profile" class="no-icon"><i class="fab fa-github"></i></a></li>{% endif %}
    </ul>
  </li>
  {% endfor %}
</ul>
</div>
</div>
