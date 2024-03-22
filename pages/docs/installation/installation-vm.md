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
This will download a very large file (~7GB), will occupy significant storage space (~20GB),
and will reserve 2GB of main memory while running,
but you can easily delete it when you don't need it anymore.

This contains all the solvers and adapters used in our tutorials, already built and configured for you to enjoy.

![Screnshot](images/docs/docs-installation-vm-screenshot.jpg)

See [what is included](https://github.com/precice/vm/blob/main/README.md#what-is-included) in detail. See [the box](https://app.vagrantup.com/precice/boxes/precice-vm) directly on vagrant.

## How to use this?

You can use this on any mainstream operating system (Windows/macOS/Linux),
but it is necessary that your CPU supports virtualization (most systems nowadays do)
and that this is enabled in your BIOS/UEFI settings.
Note once more that this will consume a significant amount of storage and main memory space.

1. Install [Vagrant](https://www.vagrantup.com/) **and** [VirtualBox](https://www.virtualbox.org/) (6.0 or later).
2. Start your terminal / command prompt and go to an empty directory.
3. Run `vagrant init precice/precice-vm` to prepare the directory.
4. Run `vagrant up` to download the box (~4GB) and start the system.

You can then either use a full desktop (slower but more familiar), or connect to the VM in command-line mode via SSH (faster, can also start GUI).

### Starting a full desktop

Open VirtualBox: A new virtual machine should be running. Double-click to open its window. The login password in `vagrant`.

After logging in, start a terminal (e.g. [terminator](https://gnome-terminator.org/)) from the applications menu.

You can turn off the system normally from the GUI and start it again with `vagrant up`. Your data remains safe until you explicitly delete the VM.

### Connecting to the VM via SSH

You can connect to the vm via SSH while being able to also open graphical applications using `vagrant ssh -- -Y`. If you don't need any GUI, then `vagrant ssh` is also enough.

If you are using Windows, please install and start [Xming](http://www.straightrunning.com/XmingNotes/) (or any other Xserver) first.

### What's next?

Now you are ready to [run your first simulation](quickstart.html)! You can find all the files you need on the Desktop (`~/Desktop/tutorials`).

Do you have any questions? Help us improve this also by asking on the [preCICE forum](https://precice.discourse.group/t/precice-demo-virtual-machine/748).

## What else may I want to do?

### Sharing files and clipboard

Vagrant gives access to the same directory where you downloaded the box into.
If you add any files there from your host system, you will be able to see them in
`~/Desktop/shared` or in `/vagrant/`.

You can enable copy-pasting text by clicking in the VirtualBox menu bar at
`Devices > Shared Clipboard > Bidirectional`. The VirtualBox Guest Additions
that enable this are already installed.

Even though you can directly start the VM again by clicking on it in VirtualBox, it is important
that you start it with `vagrant up` to set up these features.

### Changing the keyboard layout

The default keyboard layout is US English (QWERTY).
Change this clicking on the `Keyboard` link on the Desktop.
Switch to the `Layout` tab, add your layout and remove the default.
Finally, use the menu in the very top left to to logout and login for the change to take effect.

### Adjusting the window scaling

Does everything appear tiny on your high-resolution screen?
Adjust the window scaling:

1. Click on the start menu (top-left corner)
2. Click on "Settings" (left bar, second from bottom)
3. Click on "Appearance" (right bar, fourth from top)
4. Click on "Settings" (rightmost tab)
5. Adjust the "Window Scaling" to 2x (bottommost drop-down)
6. Cancel your ophthalmologist appointment. 😎

### Installing additional software

You can install additional software using `sudo apt install <package>`,
without any password.

In terms of editors, gedit, vim, and nano are already installed.
If you need a more advanced editor with a GUI, you can
install VSCode by running `~/install-vscode.sh`.
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

There are a couple of [known issues](https://github.com/precice/vm/issues) that we are continuously trying to improve.
Your feedback and contribution is always very helpful.
