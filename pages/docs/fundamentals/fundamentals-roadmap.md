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

- Restructure the **[precice.org](https://www.precice.org/) website** and **documentation**
  - Get faster to the first steps for users (coming soon)
  - All user documentation in one place (not in different wikis, READMEs, ...) (done)
  - Create a Community section to better communicate the size and contributions of the community, provide contribution guides (done)
  - Getting preCICE: first choose the target system, then get instructions for the specific system (coming soon)
- Provide a reference **virtual machine image** with preCICE already installed ([done](https://github.com/precice/vm))
- Keep investing on **[Spack](installation-spack.html)**
- Extend **documentation on "How to write an adapter"** (e.g. for mesh generation and moving meshes) ([done](couple-your-code-overview.html))
- Develop a **tutorial on electromagnetics**
- Allow **solver-based data mapping** to support higher order shape functions
- Create videos and upload them on **YouTube**
  - Already created a [YouTube channel](https://www.youtube.com/c/preCICECoupling/)
  - Create video tutorials
- Organize a **preCICE workshop again in 2021** ([register now](precice-workshop-2021.html))
  - Offer again an optional (potentially longer) introductory course on the first day (e.g. Monday)
  - Add an overview talk on documentation ("Where is what") and community ("How to become a good user")
  - Start main part with an evening event (e.g. Monday dinner)
  - More presentations (and training) from users (open call)
  - More presentations on new and future features
  - Offer again optional hands-on user support to close the workshop

## On our list

- Geometric multi-scale data mapping, e.g. for 3D-1D and 3D-2D coupled problems
- Tutorial testcase on electromagnetics
- [Support multiple `SolverInterface` instances simultaneously](https://github.com/precice/precice/projects/8)
- [Non-mesh-related global data exchange](https://github.com/precice/precice/issues/202)
- [Windows support](https://github.com/precice/precice/issues/200)
- [Splitting coupling meshes into patches](https://github.com/precice/precice/issues/374)
- [Two-level initialization enabled by default](https://github.com/precice/precice/issues/633). This feature was introduced in preCICE v2.0, but is currently switched off by default as not all use cases are supported yet.
- Partition-of-Unity RBF data mapping for very large problems
- More tutorial testcases for and better support of fluid-fluid coupling, including backflow
- Tutorial testcases for CFD-DEM coupling
- In-memory communication for volume-coupled problems
- A [configuration generator](https://github.com/precice/controller)
