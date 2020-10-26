---
title: Building from source
permalink: installation-source-installation.html
keywords: configuration, basics, cmake, installation, building, source
summary: "Usually the first paragraph of the page. If not create one or simple leave the field blank"
---

## Installation

To install preCICE on your system, there are two ways: build a binary package to install with your package manager, or run `make install`. We recommend the first one.
- Recommended: [build a binary package](#debian-packages).
- Advanced: `make install` will install preCICE to your prefix.
You may have to add `<prefix>/lib/pkconfig` to your `PKG_CONFIG_PATH` in order for pkgconfig to be able to locate it.
You can run `make uninstall` to remove the files. However, this may not always work as expected. Keep track of the files that preCICE installs and remove them before an upgrade.

To test your installation please run `make test_install`.
This will attempt to build our C++ example program against the **installed version** of the library.
This is commonly known as _the smoke test_.


To use preCICE in your project, see the page [Linking to preCICE](installation-linking).
