---
title: Building from source - Installation
permalink: installation-source-installation.html
keywords: configuration, basics, cmake, installation, building, source
toc: false
---

It is time to install preCICE into the installation prefix chosen during [preparation](installation-source-preparation#installation-prefix) and used during the [configuration with CMake](installation-source-configuration).

To install preCICE run `make install`.

If the chosen prefix points to a system directory, you may have to run `sudo make install`.

## Testing your installation

To test your installation please run `make test_install`.
This will attempt to build our C++ example program against the **installed version** of the library.
This is commonly known as _the smoke test_.

## Next steps

If you chose a system directory as installation prefix, then this concludes the preCICE installation and you should have a working installation of preCICE on your system.
To use preCICE in your project, see the page [Linking to preCICE](installation-linking).

For custom prefixes, the installation needs to be discoverable by the system, which leads us to the final step, [finding preCICE](installation-source-finding).
