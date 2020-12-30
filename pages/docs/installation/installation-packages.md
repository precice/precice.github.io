---
title: System packages
permalink: installation-packages.html
keywords: configuration, basics, installation, building, dependencies, spack
---

For some systems, preCICE is available in form of a pre-build package or a package recipe.
This section lists systems and instructions on how to install these packages.

## Ubuntu

You can download version-specific Ubuntu (Debian) packages from each [GitHub release](https://github.com/precice/precice/releases/latest).
To install, simply open it using your window manager.

Alternatively, install it from the command line. For **Ubuntu 20.04 (focal)**:
```shell
wget https://github.com/precice/precice/releases/download/v2.1.1/libprecice2_2.1.1_focal.deb
sudo apt install ./libprecice2_2.1.1_focal.deb
```

We support the latest two Ubuntu LTS versions, as well as the latest normal Ubuntu release. Change `focal` to `groovy` for 20.10, or to `bionic` for 18.04.

Is a newer preCICE release out and we have not yet updated the above links? Please [edit this page](https://github.com/precice/precice.github.io_future/blob/master/pages/docs/installation/installation-packages.md).

## Arch Linux / Manjaro

We maintain a package in the [Arch User Repository](https://aur.archlinux.org/packages/precice/).
Please have a look at the official [AUR wiki page](https://wiki.archlinux.org/index.php/Arch_User_Repository) to find out how to install it.

## Something else

For other systems you need to either use [Spack](installation-spack.html) or [build from source](installation-source-preparation.html).