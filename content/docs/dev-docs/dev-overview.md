---
title: Developer documentation
keywords: pages, development
permalink: dev-docs-overview.html
---

This section contains information for preCICE maintainers and contributors.

To see the source code documentation, please visit our [doxygen](dev-docs-sourcedocs.html).

## Getting started

To start developing preCICE:

1. Get the preCICE source code `git clone https://github.com/precice/precice.git`
2. [Install required dependencies](installation-source-dependencies.html)
3. Install additional tooling such as python polars in a separate python venv
4. [Setup and install pre-commit](dev-docs-dev-tooling.html#setting-up-pre-commit)
5. [Configure the build](installation-source-configuration.html) using the development preset `cmake --preset=development`
6. [Fix unity build](#fix-language-servers)
7. [Compile preCICE](installation-source-building.html)
8. [Run the tests](installation-source-testing.html)
9. [Make preCICE findable](installation-source-finding.html#using-directly-from-the-binary-directory)

## Fix Language Servers

Language servers have problems handling unity builds and may not work.

There are 3 ways to fix it:

1. Download and run [this python script](https://gist.github.com/fsimonis/f8da437c7f22e6a923a194003f7115e9) in your build directory `./deunify -i`. You need to repeat this whenever you add source files.
2. Configure without the unity build `cmake -DCMAKE_BUILD_UNITY=OFF .`, then `cp compile_commands.json ..` and activate unity builds again `cmake -DCMAKE_BUILD_UNITY=ON .`
3. Disable unity builds altogether `cmake -DCMAKE_BUILD_UNITY=OFF .`

## Other important basics

- [Logging and asserting](dev-docs-dev-logging.html)
- [Writing tests](dev-docs-dev-testing.html)
- [Profiling](dev-docs-dev-eventtimings.html)
