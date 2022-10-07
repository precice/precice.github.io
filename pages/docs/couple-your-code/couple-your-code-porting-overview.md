---
title: Porting adapters between breaking releases
permalink: couple-your-code-porting-overview.html
keywords: api, adapter, version, porting, major, breaking
---

We use [semantic versioning](https://semver.org/) for preCICE, which means that you can extract useful information from the version number. If the first digit (major version) does not change, this means that you don't need to update your adapter or (usually) your preCICE configuration file. However, when the major version number increases, this means that you need to update your code as well (we plan for a major version change once every 2-3 years).
We recommend using the latest stable versions of preCICE and the corresponding bindings and adapters.
