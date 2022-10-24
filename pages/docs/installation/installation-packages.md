---
title: System packages
permalink: installation-packages.html
keywords: configuration, basics, installation, building, dependencies, spack
---

For some systems, preCICE is available in form of a pre-build package or a package recipe.
This section lists systems and instructions on how to install these packages.

## Ubuntu

You can download version-specific Ubuntu (Debian) packages from each [GitHub release](https://github.com/precice/precice/releases/latest).
To install, open it in your software center.

Alternatively, download & install it from the command line. For **Ubuntu 22.04 (jammy)**:

```bash
wget https://github.com/precice/precice/releases/download/v{{ site.precice_version }}/libprecice2_{{ site.precice_version }}_jammy.deb
sudo apt install ./libprecice2_{{ site.precice_version }}_jammy.deb
```

We support the latest two Ubuntu LTS versions, as well as the latest normal Ubuntu release.
Check the [official release-cyle](https://ubuntu.com/about/release-cycle) for more information and the version code names.
As an example, change `jammy` to `focal` for 20.04.

Is a newer preCICE release out and we have not yet updated the above links? Please edit this page.

## Arch Linux / Manjaro

We maintain a package in the [Arch User Repository](https://aur.archlinux.org/packages/precice/).
Please have a look at the official [AUR wiki page](https://wiki.archlinux.org/index.php/Arch_User_Repository) to find out how to install it.

The community also maintains a [development version](https://aur.archlinux.org/packages/precice-git) and [several other packages](https://aur.archlinux.org/packages?&K=precice).

## Something else

For other systems you need to either use [Spack](installation-spack.html) or [build from source](installation-source-preparation.html).

## Community efforts

These packages are maintained by the preCICE community and may be occasionally outdated or not fully working.
However, we appreciate the effort and you may be able to contribute to them.

- [MSYS2](https://packages.msys2.org/base/mingw-w64-precice) (for Windows, built with MinGW), [thread on our forum](https://precice.discourse.group/t/precice-and-mingw-packages/382)
- [Nix / NixOS](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&query=precice)
- [EasyBuild](https://github.com/easybuilders/easybuild-easyconfigs/tree/develop/easybuild/easyconfigs/p/preCICE)
- [Conda](https://anaconda.org/conda-forge/precice) (see also packages [pyprecice](https://anaconda.org/conda-forge/pyprecice) and [fenicsprecice](https://anaconda.org/conda-forge/fenicsprecice))
- [FreeBSD](https://www.freshports.org/science/precice)
