---
title: Community stories
permalink: community-projects.html
keywords:
summary:
toc: true
redirect_from: /testimonials/
---

{{site.data.alerts.note}}
Do you use preCICE? We are always happy to hear about interesting projects that use preCICE. To add your project here, you can directly open a PR to the website. Simply copy any of the <a class="button primary" href="https://github.com/precice/precice.github.io/tree/master/collections/_testimonials"> previous descriptions</a>, adjust with your data, and <a class="button primary" href="https://github.com/precice/precice.github.io/tree/master/images/testimonials">add a picture</a>.<br>
A good example is <a class="button primary" href="https://github.com/precice/precice.github.io/pull/54"> this pull request</a>.<br>
{{site.data.alerts.end}}

<div class="testimonials">

{% assign testimonials = site.testimonials | reverse %}
{% for testimonial in testimonials %}

<h2>{{ testimonial.title }}</h2>

<div class="row" markdown="1">
<div class="col-md-6" markdown="1">

{{ testimonial.content }}
—**[{{ testimonial.author }}]({{ testimonial.author_link }})**
{{ testimonial.organisation }}

</div>
<div class="col-md-6" markdown="1">

<figure markdown="1">
<img src="images/testimonials/{{ testimonial.img }}" alt="{{ testimonial.title }}">
<figcaption>{{ testimonial.title }}</figcaption>
</figure>

</div>
</div>
{% endfor %}

</div>
