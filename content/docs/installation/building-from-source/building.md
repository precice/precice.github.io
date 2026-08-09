---
title: Building from source - Building
permalink: installation-source-building.html
keywords: configuration, basics, cmake, installation, building, source
toc: false
---

To build preCICE, run `make` in the build directory.

You can also build in parallel using all available logical cores using `make -j $(nproc)`. In that case, remember that the more threads you use, the more main memory will be needed.

## The next step

As a next step, please [run the tests](installation-source-testing) to ensure everything works as expected.

If you feel lucky, you can skip straight to [installing preCICE](installation-source-installation).
