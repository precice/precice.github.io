---
title: Contributors
permalink: community-contributors.html
keywords:
summary:
toc: true
---
<style>
.devlist {
    border: 1px solid #0a76bb;
    border-radius: 5px;
    padding: 0;
}
.devlist>li.devlist-first {
    border-top: 1px solid transparent;
}
ul.devlist>li {
    display: flex;
    flex-flow: row wrap;
    border-top: 1px solid #0a76bb;
    border-top-radius: 5px;
    padding: 8px 16px;
    margin: 0;
}

.devlist>li .devlist-img {
    flex: 0 0 auto;
    width: auto;
    width: 50px;
    margin-right: 1rem;

}
.devlist>li .devlist-img>img {
    border-radius: 5px;
    width: 100%;
    margin: 0;
    border: 1px solid lightgrey;
}
.devlist>li .devlist-left {
    flex: 1 1 0px;
    width: auto;
    align-items: center;
    display: flex;
}
.devlist>li .devlist-right {
    flex: 0 0 auto;
    width: auto;
    padding: 0;
    margin: 0;
    list-style: none;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: larger;
}
.devlist>li .devlist-right li+li {
    margin-left: 16px;
}
.devlist-left > p {
    margin-bottom: 0;
}
</style>

## Main contributors

<br>
{% assign dev_main = site.data.developer.main | sort: "name" %}
<div class="row">
<div class="col-md-10 col-md-offset-1">
<ul class="devlist">
  {% for p in dev_main %}
  <li{% if forloop.first %} class="devlist-first"{% endif %}>
    <div class="devlist-img">
      {% if p.img %}
      <img src="{{site.static_files | where: "basename", p.img | map: "path"}}" alt="Portait">
      {% endif %}
    </div>
    <div class="devlist-left">
      <p>
        <strong>{{ p.fullname }}</strong><br/>
        {{ p.institution }}
      </p>
    </div>
    <ul class="devlist-right">
      {% if p.url %}<li><a href="{{ p.url }}" alt="See the institutional website" class="notExternal"><i class="fas fa-university"></i></a></li>{% endif %}
      {% if p.github %}<li><a href="https://github.com/{{ p.github }}" alt="See the Github profile" class="notExternal"><i class="fab fa-github"></i></a></li>{% endif %}
    </ul>
  </li>
  {% endfor %}
</ul>
</div>
</div>

## Previous main contributors

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
      {% if p.url %}<li><a href="{{ p.url }}" alt="See the institutional website" class="notExternal"><i class="fas fa-university"></i></a></li>{% endif %}
      {% if p.github %}<li><a href="https://github.com/{{ p.github }}" alt="See the Github profile" class="notExternal"><i class="fab fa-github"></i></a></li>{% endif %}
    </ul>
  </li>
  {% endfor %}
</ul>
</div>
</div>

## Further contributors include

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
      {% if p.url %}<li><a href="{{ p.url }}" alt="See the institutional website" class="notExternal"><i class="fas fa-university"></i></a></li>{% endif %}
      {% if p.github %}<li><a href="https://github.com/{{ p.github }}" alt="See the Github profile" class="notExternal"><i class="fab fa-github"></i></a></li>{% endif %}
    </ul>
  </li>
  {% endfor %}
</ul>
</div>
</div>



