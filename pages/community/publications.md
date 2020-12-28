---
title: Publications
permalink: publications.html
keywords: cite, publications
summary:
toc: true
redirect_from: /publications/
---

## How to cite preCICE?

You can cite the preCICE library using the following paper.
Please also consider citing the adapters you use. You can find the respective references in the documentation of our adapters and in our [literature guide](fundamentals-literature-guide.html).

<div class="row">
<div class="col-md-10 col-md-offset-1">
  <div class="panel panel-primary panel-precice">
    <div class="panel-heading-precice">
      <strong>preCICE -- A Fully Parallel Library for Multi-Physics Surface Coupling</strong>
    </div>
    <div class="panel-body">
      <p><em>Hans-Joachim Bungartz, Bernhard Gatzhammer, Florian Lindner, Miriam Mehl, Klaudius Scheufele, Alexander Shukaev, Benjamin Uekermann</em>, <strong>2016</strong>.</p>
      <p>In Computers and Fluids, Volume 141, p. 250––258. Elsevier.</p>
      <a href="http://www.sciencedirect.com/science/article/pii/S0045793016300974">Publisher's site</a>&nbsp;&nbsp;
      <a href="assets/precice.bib" class="">Download BibTeX &nbsp;<i class="fas fa-download"></i></a>
    </div>
  </div>
</div>
</div>

{% assign years = site.publications | group_by:"year" | sort:"title" %}
{% for year in years reversed %}
## {{ year.name }}

<div class="row">
{% for pub in year.items %}
<div class="col-md-10 col-md-offset-1">
  <div class="panel panel-primary panel-precice">
    <div class="panel-heading-precice">
      <strong>{{ pub.title }}</strong>
    </div>
    <div class="panel-body">
      <p><em>{{ pub.authors }}</em>, <strong>{{ pub.year }}</strong>.</p>
      <p>{{ pub.content }}</p>
      {% if pub.pub-url %}
      <a href="{{ pub.pub-url }}">Publisher's site</a>
      {% endif %}
    </div>
  </div>
</div>
{% endfor %}
</div>
{% endfor %}




