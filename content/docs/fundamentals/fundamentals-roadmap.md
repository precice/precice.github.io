---
title: Roadmap
permalink: fundamentals-roadmap.html
redirect_from: roadmap.html
keywords: upcoming features, roadmap, future, releases
summary: "We are actively developing preCICE. These are some of the features you can expect in the future."
---

preCICE applies [Semantic Versioning](https://semver.org/), introducing new functionality in minor and major releases. A minor release does not mean fewer changes than a major release, it only means that we add new functionality while keeping backwards compatibility. We release breaking changes only every few years, giving you time to focus on your project, keeping updates easy.

In this page, you can find information about features that we plan to introduce in next releases. This is not meant to be a strict schedule, but rather a hint on the directions that preCICE is heading towards. We also have a few [issue milestones](https://github.com/precice/precice/milestones), which are updated more often. Issues and work packages of bigger features are generally grouped in [projects](https://github.com/precice/precice/projects).

If you are looking for library features introduced already in the past, have a look at our [Changelog](https://github.com/precice/precice/blob/develop/CHANGELOG.md).
For most recent developments waiting for the next release, have a look at the [unreleased changes](#changelog).

## Experimental

The following features have recently been released, but are still experimental,
meaning that the respective API or configuration might change in a minor release:

- [Dynamic coupling meshes](couple-your-code-moving-or-changing-meshes.html) - Since v3.2.0 ([GitHub project](https://github.com/orgs/precice/projects/20/views/1))
- [Just-in-time data mapping](couple-your-code-just-in-time-mapping.html), e.g., for particle codes - Since v3.2.0
- [Geometric multi-scale data mapping](configuration-mapping.html#geometric-multiscale-mapping), e.g. for 3D-1D coupled problems - Since v3.0.0 ([GitHub project](https://github.com/orgs/precice/projects/14))
- [Gradient data](couple-your-code-gradient-data.html) - Since v2.4.0

## In active development

- [GPU support for partition-of-unity radial-basis-function data mapping](https://github.com/precice/precice/pull/2346)
- [Extendable and modular system tests](https://github.com/orgs/precice/projects/12)
- [Volume coupling for OpenFOAM](https://github.com/orgs/precice/projects/9)
- [Standardization of adapter and tooling configurations](https://github.com/precice/preeco-orga/issues/18)
- Tutorials for mesh-particle coupling
- [Tutorials for turbulent FSI](https://github.com/precice/tutorials/pull/643)
- [Configuration and case generation](https://github.com/precice/preeco-orga/issues/2)
- [A smart offline checker of configuration files](https://github.com/precice/preeco-orga/issues/1)
- On-the-fly model switching for macro-micro coupling
- [Load balancing for macro-micro coupling](https://github.com/precice/micro-manager/pull/141)
- Reviving the [FEniCSx adapter](https://github.com/precice/fenicsx-adapter)
- [Model adaptivity using reduced-order and data-integrated models for macro-micro coupling](https://github.com/precice/micro-manager/milestone/3)

## On our list

- Tutorials for electromagnetics
- [Support multiple `Participant` instances simultaneously](https://github.com/precice/precice/projects/8)
- [Windows support](https://github.com/precice/precice/issues/200)
- [Two-level initialization enabled by default](https://github.com/precice/precice/issues/633). This feature was introduced in preCICE v2.0, but is currently switched off by default as not all use cases are supported yet.
- In-memory communication for volume-coupled problems
- [Non-mesh-related global data exchange](couple-your-code-global-data.html)
- [A general mocked interface for testing](https://github.com/precice/preeco-orga/issues/4)
- Data compression for waveform relaxation

## Unreleased changes in preCICE

This is a list of changes that are present on develop and ready for the [next release](dev-docs-release-strategy.html#release-schedule).

<div id="changelog">
  <button id="loadBtn" class="btn btn-default">Click to load</button>
  <span id="spinner" style="text-align:center; display:none"><i class="fa fa-spinner fa-spin fa-3x"></i></span></div>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script>
  async function loadMarkdownFiles() {
      document.getElementById("loadBtn").style.display = "none";
      document.getElementById("loadBtn").addEventListener("click", null);
      document.getElementById("spinner").style.display = "block";
      const folder = await fetch("https://api.github.com/repos/precice/precice/contents/docs/changelog");
      const files = await folder.json();
      const mdFiles = files.filter(f => /^\d+\.md$/.test(f.name));
      const entries = await Promise.all(mdFiles.map(async (file) => {
        const prNumber = file.name.replace(".md", "");
        const entry = await fetch(file.download_url);
        const text = await entry.text();
        const html = marked.parse(text);
        // Use dummy div to extract li
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return Array.from(temp.querySelectorAll("li")).map(li => {
            li.innerHTML += ` (<a target="_blank" href="https://github.com/precice/precice/pull/${prNumber}">#${prNumber}</a>)`
            return li.outerHTML });
      }));
      document.getElementById("changelog").innerHTML = "<ul>" + entries.flat().sort().join("\n") + "</ul>";
    }
    document.getElementById("loadBtn").addEventListener("click", loadMarkdownFiles);
  </script>
