---
title: Community stories
permalink: community-projects.html
keywords:
summary:
toc: true
redirect_from: /testimonials/
---

{{site.data.alerts.note}}
Do you use preCICE? We are always happy to hear about interesting projects that use preCICE. <br>
<a class="button primary" href="community-channels.html">Tell us your story!</a>
{{site.data.alerts.end}}

{% assign testimonials = site.testimonials | reverse %}
{% for testimonial in testimonials %}
## {{ Simulation of flow-acoustic-structural interactions in duct systems }}
<div class="row" markdown="1">
<div class="col-md-6" markdown="1">
{{ To study the influence of flow-induced vibrations on noise mitigation solutions in duct systems like ventilation systems, the interactions between the flow-acoustic field inside the duct and the structural vibrations of the flexible components need to be understood. Therefore I coupled an in-house MPI-parallelized aeroacoustics solver for the linearized Euler equations to an in-house structural solver for linear elasto-dynamics. The coupling is managed by the preCICE library, which offers an excellent framework for coupling time domain solvers. }}

—**[{{ Jurgen Kersschot }}]({{ https://www.kuleuven.be/wieiswie/nl/person/00124026 }})**

{{ LMSD Division, Mechanical engineering department, KU Leuven, Belgium  }}
</div>
<div class="col-md-6" markdown="1">
![](images/testimonials/{{ testimonial.img![fig_crop_ex](https://user-images.githubusercontent.com/61868063/110646676-68ab7f00-81b7-11eb-98b2-1c8234a75ff9.png)
 }})
</div>
</div>
{% endfor %}


