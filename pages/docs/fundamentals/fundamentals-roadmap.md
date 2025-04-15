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

- GPU support for partition-of-unity radial-basis-function data mapping
- [Dynamic coupling meshes](https://github.com/precice/precice/projects/2)
- [Geometric multi-scale data mapping](https://github.com/orgs/precice/projects/14), e.g. for 3D-1D and 3D-2D coupled problems
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
