---
title: Roadmap
permalink: fundamentals-roadmap.html
redirect_from: roadmap.html
keywords: upcoming features, roadmap, future, releases
summary: "We are actively developing preCICE. These are some of the features you can expect in the future."
---

preCICE applies [Semantic Versioning](https://semver.org/), introducing new functionality in minor and major releases. A minor release does not mean fewer changes than a major release, it only means that we add new functionality while keeping backwards compatibility. We release breaking changes only every few years, giving you time to focus on your project, keeping updates easy.

In this page, you can find information about features that we plan to introduce in next releases. This is not meant to be a strict schedule, but rather a hint on the directions that preCICE is heading towards. We also have a few [issue milestones](https://github.com/precice/precice/milestones), which are updated more often. Issues and work packages of bigger features are generally grouped in [projects](https://github.com/precice/precice/projects).

If you are looking for features introduced already in the past, have a look at our [Changelog](https://github.com/precice/precice/blob/develop/CHANGELOG.md).

## In active development

- [Adaptive and flexible macro-micro coupling software](https://github.com/precice/micro-manager)
- [Solver-based data mapping](couple-your-code-direct-access.html) to take advantage of higher-order shape functions
- [Non-mesh-related global data exchange](couple-your-code-global-data.html)
- [Dynamic coupling meshes](https://github.com/precice/precice/projects/2)
- [Improving](https://github.com/precice/precice/issues/1252) the experimental [Nearest-neighbor gradient data mapping](https://github.com/precice/precice/pull/1169)
- [More robust and efficient quasi-Newton acceleration](https://github.com/precice/precice/pull/1152)
- [Geometric multi-scale data mapping](https://github.com/orgs/precice/projects/14), e.g. for 3D-1D and 3D-2D coupled problems
- [Extendable and modular system tests](https://github.com/orgs/precice/projects/12)

## On our list

- Tutorial testcase on electromagnetics
- [Support multiple `Participant` instances simultaneously](https://github.com/precice/precice/projects/8)
- [Windows support](https://github.com/precice/precice/issues/200)
- [Two-level initialization enabled by default](https://github.com/precice/precice/issues/633). This feature was introduced in preCICE v2.0, but is currently switched off by default as not all use cases are supported yet.
- Tutorial testcases for CFD-DEM coupling
- In-memory communication for volume-coupled problems
- A [configuration generator](https://github.com/precice/controller)
