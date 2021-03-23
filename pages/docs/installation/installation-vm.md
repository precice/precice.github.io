---
title: Demo Virtual Machine
permalink: installation-vm.html
keywords: installation, demo, sandbox, virtual machine, vm, vagrant, box
summary: "A sandbox to try preCICE and all the adapters without having to install them on your system."
---

## Do I need this?

You probably only want to use this if you are very new to preCICE and want to learn,
for example during our [preCICE Workshops or other conferences](community.html)
where we may be present with a training session.

After trying this out for a few days, you probably want to just delete it and
install only the components you need directly on your target system.

## What is this?

This is a [Vagrant](https://www.vagrantup.com/) box, essentially a [VirtualBox](https://www.virtualbox.org/)
virtual machine image, with additional automation to make it easier for you to use and for us to maintain.

After installing this on any operating system, you will be able to start a virtual machine
with Linux and a lightweight graphical interface.
You can do anything you like in there, without breaking anything.
This will download a very large file (~4GB), will occupy significant storage space (~10GB),
and will reserve 2GB of main memory while running,
but you can easily delete it when you don't need it anymore.

![Screnshot](images/docs-installation-vm-screenshot.png)

See [what is included](https://github.com/precice/vm/blob/main/README.md#what-is-included) in detail.

## How to use this?

You can use this on any mainstream operating system (Windows/macOS/Linux),
but it is necessary that your CPU supports virtualization (most systems nowadays do)
and that this is enabled in your BIOS/UEFI settings.
Note once more that this will consume a significant amount of storage and main memory space.

1. Install [Vagrant](https://www.vagrantup.com/) **and** [VirtualBox](https://www.virtualbox.org/) (6.0 or later).
2. Start your terminal / command prompt and go to an empty directory.
3. Run `vagrant init precice/precice-vm` to prepare the directory.
4. Run `vagrant up` to download [the box](https://app.vagrantup.com/precice/boxes/precice-vm) (~4GB) and start the system.
5. A window should eventually pop-up (or look for it in VirtualBox). The login password in `vagrant`.

After logging in, start a terminal (e.g. [terminator](https://gnome-terminator.org/)) from the applications menu.
On the Desktop (`cd ~/Desktop/`) you can find the basic solverdummy examples, as well as the tutorials.

Most adapters are already built and available in the home directory.
In case of deal.II, you first need to copy the adapter from `~/dealii-adapter/` (built in 2D mode) wherever you need it.
We are working on different aspects needed to make this experience better.

You can turn off the system normally from the GUI and start it again with `vagrant up`.

## What else may I want to do?

### Sharing files and clipboard

Vagrant gives access to the same directory where you downloaded the box into.
If you add any files there from your host system, you will be able to see them in 
`~/Desktop/shared` or in `/vagrant/`.

You can enable copy-pasting text by clicking in the VirtualBox menu bar at
`Devices > Shared Clipboard > Bidirectional`.

Even though you can directly start the VM again by clicking on it in VirtualBox, it is important
that you start it with `vagrant up` to set up these features.

### Changing the keyboard layout

The default keyboard layout is US English (QWERTY).
Change this clicking on the `Keyboard` link on the Desktop,
removing the already added en-us layout, and adding yours.

### Installing additional software

You can install additional software using `sudo apt install <package>`,
without any password.

In terms of editors, gedit, vim, and nano are already installed.
If you need a more advanced editor with a GUI, you can
install VSCode by running `~/Desktop/install-vscode.sh`.
If you double-click on it, it will run silently. Wait for a bit
and you will then find it under a new category `Development`
in the applications menu.

### Updating the system

preCICE, the tutorials, and all adapters are installed from their
Git repositories in the home directory, using their main/master branches.
You can do a `git pull` at any time to get the latest state
of each package.

You can also [update the complete box](https://www.vagrantup.com/docs/cli/box#box-update),
but this will delete the previous one and you will lose any changes.

### Deleting everything

To go back to the state before trying this, run `vagrant destroy`, `vagrant box remove precice/precice-vm`,
and uninstall Vagrant and VirtualBox.

## I found an issue

Please report any technical issues on the [vm repository on GitHub](https://github.com/precice/vm).
Should we definitely include some package you love? Let us know!
For general support, please refer to our [community channels](community-channels.html).
