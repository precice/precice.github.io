---
title: Literature guide
permalink: fundamentals-literature-guide.html
keywords: literature, papers, numerics, hpc, cite, publications
summary: "A guide to the main reference literature for each component and feature of preCICE"
redirect_from:
  - /publications/
  - publications.html
---

The literature one can read to understand different aspects of preCICE may feel a bit overwhelming. This page aims to give some starting points and citation guidelines.

Apart from these resources, you may also wonder what else the preCICE team and community have published. In that case, please refer to the [citations on Google Scholar](https://scholar.google.com/scholar?hl=en&cites=5053469347483527186) (this is for the v1 paper, the v2 paper will be listed soon).

## When to cite what

preCICE is made by academics: please cite us! 🤗

Even further, please cite all components you are using, next to the latest reference paper. Here are some guidelines:

### preCICE in general

Talking about preCICE, at any level? Then, read and cite the latest preCICE reference paper:

<!-- Do you want to add a new publication? Careful where you are copying from. Depending on the type, every publication renders different fields.  -->
{% for pub in site.publications %}
{% if pub.title == "preCICE v2: A sustainable and user-friendly coupling library [version 2; peer review: 2 approved]" %}
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
        {{ pub.year }},
        {{ pub.journal.volume }}:{{ pub.journal.issue }}.
      </p>
      <a href="{{pub.pub-url}}">Publisher's site</a>&nbsp;&nbsp;
      <a href="assets/{{ pub.bibtex }}">Download BibTeX &nbsp;<i class="fas fa-download"></i></a>
    </div>
  </div>
</div>
</div>
{% endif %}
{% endfor %}

Talking specifically about preCICE v1? Then keep citing the [preCICE v1 reference paper](http://www.sciencedirect.com/science/article/pii/S0045793016300974).

### Adapters

Are you using any of the adapters? Then, please also read and cite the respective references. The following adapters currently have reference papers:

{% for pub in site.publications %}
{% if pub.title == "OpenFOAM-preCICE: Coupling OpenFOAM with External Solvers for Multi-Physics Simulations" %}
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
        {{ pub.year }}.
      </p>
      <a href="https://www.doi.org/{{pub.doi}}">Publisher's site</a>&nbsp;&nbsp;
      <a href="assets/{{ pub.bibtex }}">Download BibTeX &nbsp;<i class="fas fa-download"></i></a>
    </div>
  </div>
</div>
</div>
{% endif %}
{% endfor %}

{% for pub in site.publications %}
{% if pub.title == "FEniCS–preCICE: Coupling FEniCS to other simulation software" %}
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
      <a href="https://www.doi.org/{{pub.doi}}">Publisher's site</a>&nbsp;&nbsp;
      <a href="assets/{{ pub.bibtex }}">Download BibTeX &nbsp;<i class="fas fa-download"></i></a>
    </div>
  </div>
</div>
</div>
{% endif %}
{% endfor %}

For the CalculiX, SU2, and code_aster adapters, as well as for the concept of an adapter, please read and cite this overview paper:

{% for pub in site.publications %}
{% if pub.title == "Official preCICE Adapters for Standard Open-Source Solvers" %}
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

### Reproducibility

To ensure reproducibility of your results, you can use and cite the [preCICE distribution](installation-distribution.html). This frequently updated snapshot of the preCICE ecosystem includes versions of components that work together, while acknowledging everyone that has contributed to the respective version of any component.

## Starting points

{% tip %}
Are you looking for how to start coupling your code? Then the [documentation](couple-your-code-overview.html) is a more extensive and up-to-date guide than the published resources.
{% endtip  %}

* The latest reference article for preCICE is [preCICE v2: A sustainable and user-friendly coupling library](https://doi.org/10.12688/openreseurope.14445.2). This gives a wide overview over the complete preCICE ecosystem and is a great place to start reading about the modern preCICE (most probably even for the versions after v2).

* The original reference article for preCICE is [preCICE - A Fully Parallel Library for Multi-Physics Surface Coupling](http://www.sciencedirect.com/science/article/pii/S0045793016300974). This may not be the best introduction for new users because of its condensed form.

A very good first reading is the dissertations of the core preCICE developers:

* Bernhard Gatzhammer introduced preCICE in his dissertation [Efficient and Flexible Partitioned Simulation of Fluid-Structure Interactions](http://www5.in.tum.de/pub/Gatzhammer2014_preCICE.pdf) (2014). Chapters 1-4 give a detailed introduction of most of the preCICE features and are still valid to a large extend. Start here for an explanation of the different coupling schemes, of the different communication methods, or of the data mapping techniques. Note that the "geometry interface" and "server mode" features have been removed.

* Benjamin Uekermann introduced inter- and intra-solver parallelization in his dissertation [Partitioned Fluid-Structure Interaction on Massively Parallel Systems](https://mediatum.ub.tum.de/doc/1320661/document.pdf) (2016). Chapter 2 gives a compact introduction to preCICE. Furthermore, read here especially for the parallel coupling schemes, which allow a simultaneous execution of multiple solvers (Chapter 3) and the realization of all main features on distributed data (Chapter 4).

The list of completed dissertations also includes:

* Klaudius Scheufele: [Coupling schemes and inexact Newton for multi-physics and coupled optimization problems.](ftp://ftp.informatik.uni-stuttgart.de/pub/library/ncstrl.ustuttgart_fi/DIS-2019-01/DIS-2019-01.pdf) (2018)

* Florian Lindner: [Data Transfer in Partitioned Multi-Physics Simulations: Interpolation & Communication](https://elib.uni-stuttgart.de/bitstream/11682/10598/3/Lindner%20-%20Data%20Transfer%20in%20Partitioned%20Multi-Physics%20Simulations.pdf) (2019)

and the story continues by the [current team](about.html).

## preCICE features

* **Coupling schemes** For an introduction to explicit and implicit coupling, as well as the various acceleration / post-processing techniques, have a look at the dissertations of Bernhard Gatzhammer (Sections 2.3 and 4.1) and Benjamin Uekermann (Chapter 3). An easy first read on quasi-Newton acceleration is [A Comparison of Various Quasi-Newton Schemes for Partitioned Fluid-Structure Interaction](http://hdl.handle.net/2117/191193). Detailed information on the improved IQN-IMVJ acceleration is given in [Robust Multisecant Quasi-Newton Variants for Parallel Fluid-Structure Simulations – and Other Multiphysics Applications](https://doi.org/10.1137/16M1082020).

* **Data mapping** For an introduction to the various techniques, have a look at the dissertations of Bernhard Gatzhammer (Sections 2.4 and 4.2) and Benjamin Uekermann (Section 4.3). For a more condensed overview of RBF mapping, see [Radial Basis Function Interpolation for Black-Box Multi-Physics Simulations](ftp://ftp.informatik.uni-stuttgart.de/pub/library/ncstrl.ustuttgart_fi/INPROC-2017-35/INPROC-2017-35.pdf). For details regarding gradient-based data mapping schemes, see [Second-order projection-based mapping methods for coupled multi-physics simulations](https://elib.uni-stuttgart.de/bitstream/11682/12145/1/Bachelorthesis_Ariguib.pdf). For a performance comparison between the different mapping methods, see the [preCICE v2 reference paper](https://doi.org/10.12688/openreseurope.14445.2). For details regarding volume-coupling with cell-interpolation, see [Robust and Efficient Barycentric Cell-Interpolation for Volumetric Coupling with preCICE](https://mediatum.ub.tum.de/1685618).

* **Communication** For an introduction to the various techniques, have a look at the dissertation of Bernhard Gatzhammer (Section 4.3). Have a look also at the master's thesis of Alexander Shukaev: "[A Fully Parallel Process-to-Process Intercommunication Technique for preCICE](https://www5.in.tum.de/pub/Shukaev2015_MasterThesis.pdf)".

* **Time interpolation** This feature is currently under active development. Have a look at the publications, talks, and posters of [Benjamin Rodenberg](https://www.cs.cit.tum.de/sccs/personen/benjamin-rodenberg/).

## Parallel and high-performance computing

* The initial effort for parallelization of preCICE is documented in [Partitioned Fluid-Structure-Acoustics Interaction on Distributed Data: Coupling via preCICE](https://link.springer.com/chapter/10.1007/978-3-319-40528-5_11) (2016).
* Further steps to speed up initialization are documented in [ExaFSA: Parallel Fluid-Structure-Acoustic Simulation](https://library.oapen.org/bitstream/handle/20.500.12657/41289/2020_Book_SoftwareForExascaleComputing-S.pdf?sequence=1#page=278) (2020).
* The parallelization of communication initialization is published in [Efficient and Scalable Initialization of Partitioned Coupled Simulations with preCICE](https://www.mdpi.com/1999-4893/14/6/166) (2021).
* More details can be found in [Benjamin's thesis](https://mediatum.ub.tum.de/doc/1320661/document.pdf) (2016), [Florian's thesis](https://elib.uni-stuttgart.de/bitstream/11682/10598/3/Lindner%20-%20Data%20Transfer%20in%20Partitioned%20Multi-Physics%20Simulations.pdf) (2019), and [Klaudius' thesis](ftp://ftp.informatik.uni-stuttgart.de/pub/library/ncstrl.ustuttgart_fi/DIS-2019-01/DIS-2019-01.pdf) (2019).

## Further components

The documentation pages of each adapter include guides to further literature. Apart from those resources, the proceedings paper ["Official preCICE Adapters for Standard Open-Source Solvers"](https://www.gacm2017.uni-stuttgart.de/registration/Upload/ExtendedAbstracts/ExtendedAbstract_0138.pdf) includes a first overview and describes the concept of an adapter, while the [preCICE v2 reference paper](https://doi.org/10.12688/openreseurope.14445.2) gives a more updated and detailed overview of the preCICE ecosystem.
