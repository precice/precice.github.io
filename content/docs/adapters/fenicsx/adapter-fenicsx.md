---
title: The FEniCSx adapter
permalink: adapter-fenicsx.html
keywords: adapter, fenicsx
summary: "A general adapter for the open source computing platform FEniCSx"
---

## What is FEniCS

From the FEniCS Project website: _FEniCS is a popular open-source computing platform for solving partial differential equations (PDEs) with the finite element method (FEM). FEniCS enables users to quickly translate scientific models into efficient finite element code. With the high-level Python and C++ interfaces to FEniCS, it is easy to get started, but FEniCS offers also powerful capabilities for more experienced programmers. FEniCS runs on a multitude of platforms ranging from laptops to high-performance computers._ More details can be found at [fenicsproject.org](https://fenicsproject.org/).

## How to get FEniCSx

You can install FEniCSx on your system following the instructions on [fenicsproject.org](https://fenicsproject.org/download/). The simplest way to install FEniCS on Ubuntu is using the official PPA repository of FEniCS:

```bash
sudo add-apt-repository ppa:fenics-packages/fenics
sudo apt update
sudo apt install fenicsx
```

## Aim of this adapter

This adapter supports the Python interface of FEniCSx and offers an API that allows the user to use FEniCSx-style data structures for solving coupled problems. It is an update of the [FEniCS adapter](https://precice.org/adapter-fenics.html) featuring similar API as the FEniCS adaper but with support of FEniCSx and new features of preCICE. The FEniCS solvers for the heat transport and conjugate heat transfer examples have been adapted for FEniCSx and FEniCSx-preCICE and serve as usage examples. However, the adapter is designed in a general fashion and can be used to couple any code using the FEniCS library.

## How to install the adapter

The adapter requires FEniCSx and preCICE version 3.3.0 or greater and the preCICE language bindings for Python.

### Use `pip`

The adapter is [published on PyPI](https://pypi.org/project/fenicsxprecice/). After installing preCICE and the python language bindings, run `pip3 install --user fenicsxprecice` to install the adapter via your Python package manager.

<!--
### Use `conda` (or `mamba`)

You can alternatively use `conda` (or `mamba`) to install the adapter. We recommend using [Miniforge](https://conda-forge.org/download/) (see https://www.fz-juelich.de/en/rse/the_latest/the-anaconda-is-squeezing-us for reasons why). Please refer to [`conda-forge/fenicsprecice`](https://github.com/conda-forge/fenicsprecice-feedstock) for installation instructions. Added advantage of using `conda`: you do not have to worry about the dependencies, because `conda` takes care of this for you.
-->

### Something special?

Please refer to the installation instructions provided [here](https://github.com/precice/fenics-adapter#installing-the-package) for alternative installation procedures.

## Examples for coupled codes

The following tutorials can be used as a usage example for the FEniCSx adapter:

* Solving the heat equation in a partitioned fashion (heat equation solved via FEniCSx for both participants)
* Flow over plate (heat equation solved via FEniCSx for solid participant)

For more details please consult the references given in the [reference section](#related-literature).

## How can I use my own solver with the adapter

The FEniCSx adapter does not couple your code out-of-the-box, but you have to call the adapter API from within your code. You can use the tutorials from above as an example. The basic API of the adapter and the design is explained in the [reference paper](#how-to-cite). For more information about the purpose of each function provided by the FEniCSx adapter, you can refer to the respective Python docstrings within the code.

## You need more information?

Please don't hesitate to ask questions about the FEniCSx adapter on [discourse](https://precice.discourse.group/) or in [Matrix]({{ site.matrix_url }}).

## How to cite

If you are using our adapter, please consider citing our paper:

{% for pub in site.publications %}

{% if pub.title == "FEniCSx-preCICE: Coupling FEniCSx to other simulation software" %}

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
        {{ pub.year }},
        <a href="https://www.doi.org/{{pub.doi}}">doi:{{pub.doi}}</a>.
      </p>
      <a href="{{pub.pub-url}}">Publisher's site</a>&nbsp;&nbsp;
      <a href="assets/{{ pub.bibtex }}">Download BibTeX &nbsp;<i class="fas fa-download"></i></a>
    </div>
  </div>
</div>
</div>

{% endif %}

{% endfor %}

## Related literature

{% assign years = site.publications | group_by:"year" | sort:"title" %}
{% for year in years reversed %}

<div class="row">
{% for pub in year.items %}
{% if pub.tag contains "fenicsx" %}
<div class="col-md-10 col-md-offset-1">
  <div class="panel panel-primary panel-precice">
    <div class="panel-heading-precice">
      <strong>{{ pub.title }}</strong>
    </div>
    <div class="panel-body">
      <p>
        <em>{{ pub.authors }}</em>
        {% if pub.journal.name %}{{ pub.journal.name }}, {% endif %}
        {% if pub.journal.volume %}Volume {{ pub.journal.volume }}, {% endif %}
        {% if pub.journal.publisher %}{{ pub.journal.publisher }}, {% endif %}
        {{ pub.year }}{% if pub.doi %}, <a href="https://www.doi.org/{{pub.doi}}">doi:{{pub.doi}}</a>{% endif %}.
      </p>
      {% if pub.pub-url %}
      <a href="{{pub.pub-url}}">Publisher's site</a>&nbsp;&nbsp;
      {% endif %}
      {% if pub.bibtex %}
      <a href="assets/{{ pub.bibtex }}">Download BibTeX &nbsp;<i class="fas fa-download"></i></a>
      {% endif %}
    </div>
  </div>
</div>
{% endif %}
{% endfor %}
</div>
{% endfor %}
