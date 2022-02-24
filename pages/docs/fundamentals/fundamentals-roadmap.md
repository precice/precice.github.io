---
title: Roadmap
permalink: fundamentals-roadmap.html
keywords: upcoming features, roadmap
summary: "We are actively developing preCICE. These are some of the features you can expect in the future."
---

preCICE applies [Semantic Versioning](https://semver.org/), introducing new functionality in minor and major releases. A minor release does not mean fewer changes than a major release, it only means that we add new functionality while keeping backwards compatibility. We release breaking changes only every few years, giving you time to focus on your project, keeping updates easy.

In this page, you can find information about features that we plan to introduce in next releases. This is not meant to be a strict schedule, but rather a hint on the directions that preCICE is heading towards. We also have a few [issue milestones](https://github.com/precice/precice/milestones), which are updated more often. Issues and work packages of bigger features are generally grouped in [projects](https://github.com/precice/precice/projects).

If you are looking for features introduced already in the past, have a look at our [Changelog](https://github.com/precice/precice/blob/develop/CHANGELOG.md).

## Main feedback from the [1st preCICE Workshop](https://precice.discourse.group/t/precice-workshop-2020-updates/40/7)

- Restructure the **[precice.org](https://precice.org/) website** and **documentation**
  - Get faster to the first steps for users (coming soon)
  - All user documentation in one place (not in different wikis, READMEs, ...) (done)
  - Create a Community section to better communicate the size and contributions of the community, provide contribution guides (done)
  - Getting preCICE: first choose the target system, then get instructions for the specific system (coming soon)
- Provide a reference **virtual machine image** with preCICE already installed ([done](https://github.com/precice/vm))
- Keep investing on **[Spack](https://github.com/precice/precice/wiki/preCICE-with-Spack)**
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

## Mid-future (preCICE 2.x or later)

- [macOS support](https://github.com/precice/precice/issues/519) (coming in v2.2)
- [`watch-integral`](https://github.com/precice/precice/issues/342) (coming in v2.2)
- [Contiguous mapping](https://github.com/precice/precice/issues/489)
- [Nearest-Projection mapping for quad meshes](https://github.com/precice/precice/issues/153) (done in v2.1)
- [RBF mapping without PETSc](https://github.com/precice/precice/issues/718) (done in v2.1)
- [Non-mesh-related global data exchange](https://github.com/precice/precice/issues/202)
- [Improved error messages](https://github.com/precice/precice/issues/698) (done in v2.1)
- [Windows support](https://github.com/precice/precice/issues/200)
- [Brute-force re-initialization](https://github.com/precice/precice/issues/225)
- [Splitting interface into patches](https://github.com/precice/precice/issues/374)
- [Test more platforms in CI](https://github.com/precice/precice/issues/713#issuecomment-614500090)
- [Two-level initialization enabled by default](https://github.com/precice/precice/issues/633) (coming in v2.2)
  - Currently, we perform the mesh initialization in preCICE in a gather-scatter approach: The communicated mesh is gathered on one side and scattered on the other. This limits the size of the coupling mesh and the scalability (for very large cases). We plan to replace this technique with a two-level approach: Exchanging bounding boxes first and do a parallel mesh initialization afterwards. Ultimately, this will also allow to handle dynamically changing meshes efficiently. This feature was introduced in preCICE v2.0, but is currently switched off by default.

## Long-term (preCICE 3.x or later)

- **Consistent time interpolation**, to correctly treat multiscale scenarios with large differences in the respective timestep size of the participating solvers and higher order time stepping schemes. Currently a loss of accuracy and stability can be observed. (needs [API changes](https://github.com/precice/precice/issues/133))
- **3D-1D and 3D-2D data mapping**, e.g. to couple a 3D fluid solver with a 1D model.  
- Support for **dynamic adaptive meshes**
- Full support for [Volume coupling](https://github.com/precice/precice/issues/468)
- Solver-based data mapping to support higher order shape functions

There are even more features coming, stay tuned!

## Adapter-related plans

- **[Fluid-fluid module](https://github.com/precice/openfoam-adapter/issues/60) for the OpenFOAM adapter.** This will allow to couple different fluid solvers with each other. (done)
- Develop an adapter for **[Elmer](https://www.csc.fi/web/elmer)**. (done)
