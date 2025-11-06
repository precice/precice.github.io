---
title: System packages
permalink: installation-packages.html
keywords: configuration, basics, installation, building, dependencies, spack
---

For some systems, preCICE is available in the form of a pre-built package or a package recipe.
These packages are built with enabled Python actions, MPI communication, and PETSc mapping.
This section lists systems and instructions on how to install these packages.

An incomplete package version overview of preCICE can be found on repology:

[![Packaging status](https://repology.org/badge/vertical-allrepos/precice.svg?header=&columns=2&exclude_sources=site)](https://repology.org/project/precice/versions)

## Ubuntu

You can download version-specific Ubuntu (Debian) packages from each [GitHub release](https://github.com/precice/precice/releases/latest).
To install, open it in your software center.

Alternatively, download & install it from the command line. For **Ubuntu 24.04 (noble)**:

```bash
wget https://github.com/precice/precice/releases/download/v{{ site.precice_version }}/libprecice3_{{ site.precice_version }}_noble.deb
sudo apt install ./libprecice3_{{ site.precice_version }}_noble.deb
```

We support the latest two Ubuntu LTS versions, as well as the latest normal Ubuntu release.
Check the [official release-cyle](https://ubuntu.com/about/release-cycle) for more information and the version code names.
As an example, change `noble` to `jammy` for 22.04.

Is a newer preCICE release out, and have we not yet updated the above links? Please edit this page.

## Debian

Similar to the Ubuntu packages, we generate Debian packages for at least the latest stable release of Debian.
You can download version-specific Debian packages from the respective release [GitHub release](https://github.com/precice/precice/releases/latest).

## Arch Linux / Manjaro

We maintain a package in the [Arch User Repository](https://aur.archlinux.org/packages/precice/).
Please have a look at the official [AUR wiki page](https://wiki.archlinux.org/index.php/Arch_User_Repository) to find out how to install it.

The community also maintains a [development version](https://aur.archlinux.org/packages/precice-git) and [several other packages](https://aur.archlinux.org/packages?&K=precice).

Furthermore, the [arch4edu](https://github.com/arch4edu/arch4edu/wiki) initiative provides pre-built binaries for preCICE and related packages.

## Nix / NixOS

In addition to the community efforts listed above, preCICE and several of the bindings and adapters are available for Nix in the [precice/nix-packages repository](https://github.com/precice/nix-packages/).

If you are using Nix (or NixOS for that matter), you can simply run the command

```sh
nix shell github:precice/nix-packages#precice-calculix-adapter github:precice/nix-packages#precice-openfoam-adapter
```

for instance, which will drop you into a shell with the CalculiX adapter and the OpenFOAM adapter accessible.
For more information, please consult the `README.md` file in the repository.
All available outputs of the Nix flake can be shown by running `nix flake show github:precice/nix-packages`.

The Nix flake also contains the outputs `vm`, `iso`, and `vagrant-vbox-image`, which output a VM in several formats containing a remake of the [preCICE distribution v2211.0](installation-vm.html).
To run the preCICE VM, you can, on a NixOS system, simply run `nix run github:precice/nix-packages`.
Note that this will build all the components needed for the preCICE VM locally on your machine if they cannot be fetched from the upstream binary cache.
A full build of the VM can take several hours, depending on the hardware used.
For more options, have a look at the [readme](https://github.com/precice/nix-packages#readme) in the repository.

For all packages available upstream, see the [NixOS search](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&query=precice).

## macOS

For macOS, we maintain a [homebrew package/formula](https://formulae.brew.sh/formula/precice).
To install the latest version use:

```bash
brew install precice
```

It also provides a way of installing the latest develop version from source using the head flag:

```bash
brew install --head precice
```

## Windows

The community maintains a preCICE package for [MSYS2](https://packages.msys2.org/base/mingw-w64-precice).
To use Microsoft MPI, first make sure to install the [latest release of MSMPI](https://github.com/microsoft/Microsoft-MPI/releases/latest) (the `msmpisetup.exe`).
Then, enable path inheritance in the environment configuration of your choice.
To enable it for MSYS64 UCRT, edit the file `C:/msys64/ucrt.ini` and uncomment the line `MSYS2_PATH_TYPE=inherit` by removing the leading `#`. You should now be able to run `mpiexec` in the ucrt environment.

To search for a suitable package use:

```bash
pacman -Ss precice
```

Then install it with:

```bash
pacman -S <package name>
```

## Something else

For other systems, you need to either use [Spack](installation-spack.html) or [build from source](installation-source-preparation.html).

## Community efforts

These packages are maintained by the preCICE community and may be occasionally outdated or not fully working.
However, we appreciate the effort, and you may be able to contribute to them.

- [EasyBuild](https://github.com/easybuilders/easybuild-easyconfigs/tree/develop/easybuild/easyconfigs/p/preCICE)
- [Conda](https://github.com/conda-forge/precice-feedstock) (see also packages [pyprecice](https://github.com/conda-forge/pyprecice-feedstock) and [fenicsprecice](https://github.com/conda-forge/fenicsprecice-feedstock)). We recommend using [Miniforge](https://conda-forge.org/download/) (see https://www.fz-juelich.de/en/rse/the_latest/the-anaconda-is-squeezing-us for reasons why).
- [FreeBSD](https://www.freshports.org/science/precice)
