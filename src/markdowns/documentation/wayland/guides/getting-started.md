# Getting Started

In this chapter, we are going to prepare to setting up the development
environment.

## Requirement

### 1. Linux

Wayland supports officially Linux only. We need Linux distribution with
Display. It means, you can't develop the Wayland clients through the SSH
connection.

### 2. Wayland Compositor

A Wayland compositor is a server side implementation of the Wayland protocols.
Our Wayland client programs need a compositor to communicate.

**Weston** is the reference implementation of Wayland compositor.

**KWin** also implements Wayland compositor. If you are using KDE, check if
you have this with the command,

```sh
$ kwin_wayland --version
```

If you are using GNOME, check Settings > About > Windowing System field.

There is another popular Wayland compositor called **Sway** but it is a
tiling manager, so it is not suitable for our tutorial.

### 3. C Compiler

We need a C compiler for the tutorial. In this tutorial, we will using **GCC**
as the compiler. You can check if it is installed by the command,

```sh
$ gcc --version
```

### 4. Packages

Before we begin, the next commands should be installed.

- `gcc`
- `make`
- `wayland-scanner`
- `weston` (optional)

And the Wayland protocols needed. The protocols are XML files. These located
under the directory `/usr/share/wayland-protocols`.

Let's install the required packages.

#### Arch Linux

Arch Linux (and Arch based distros such as Manjaro) is the best development
environment for Wayland clients. Arch packages always provide latest version.

Use `pacman` to install the packages.

```sh
$ sudo pacman -S gcc make wayland-protocols
```

If your display system is running on X, install `weston` too.

```sh
$ sudo pacman -S weston
```

#### Ubuntu

If you are using Ubuntu 21.04 desktop with default settings, it is already
running on Wayland. On 20.04 LTS version, some example code may not work
because the Wayland compositors provided for this version are not implemented
the latest protocols yet.

To install the packages, use `apt`.

```sh
$ sudo apt install gcc make wayland-protocols libwayland-dev libwayland-bin
```

If your display system is running on X, install `weston` too.

```sh
$ sudo apt install weston
```

## What's Next?

If you are ready, let's start coding.

[Hello, Wayland!](/documentation/wayland/guides/hello-wayland)
