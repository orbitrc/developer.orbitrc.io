# Everything is a Surface

A surface is a primary concept of Wayland which is simply a rectangular area.
If you want to draw something, a surface is required. If you want to
interact with a device such as a mouse, a surface is required. Even if you
do not want to interact with drawn something, a surface is required.

Yes, in Wayland everything is a surface.

In this chapter, we are going to create a surface. Of course, nothing will be
drawn to the screen with just a surface, but this is an important step.

## Create a Surface

To create a surface, we need a compositor object. Remember the code we wrote
earlier. Let's add some lines to our code.

```c
/* main.c */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <wayland-client.h>

struct wl_display *display = NULL;
struct wl_registry *registry = NULL;
struct wl_compositor *compositor = NULL;
struct wl_surface *surface = NULL;

static void global_registry_handler(void *data, struct wl_registry *registry,
        uint32_t id, const char *interface, uint32_t version)
{
    printf("Got a registry event for <%s>, id: %d, version: %d.\n",
        interface, id, version);
    if (strcmp(interface, "wl_compositor") == 0) {
        compositor = wl_registry_bind(registry,
            id, &wl_compositor_interface, 4);
    }
}

static void global_registry_remove_handler(void *data,
        struct wl_registry *registry, uint32_t id)
{
    printf("Got a registry losing event for <%d>\n", id);
}

static const struct wl_registry_listener registry_listener = {
    .global = global_registry_handler,
    .global_remove = global_registry_remove_handler,
};

int main(int argc, char *argv[])
{
    display = wl_display_connect(NULL);
    if (display == NULL) {
        exit(1);
    }

    registry = wl_display_get_registry(display);
    wl_registry_add_listener(registry, &registry_listener, NULL);

    wl_display_dispatch(display);
    wl_display_roundtrip(display);

    if (compositor == NULL) {
        exit(1);
    }

    surface = wl_compositor_create_surface(compositor);
    if (surface != NULL) {
        printf("Created a surface!\n");
    } else {
        fprintf(stderr, "Failed to create a surface.\n");
        exit(1);
    }

    wl_surface_destroy(surface);

    wl_display_disconnect(display);

    return 0;
}
```

## XDG Surface and Surface Roles

In the desktop-like environment, there's a concept called a window to show
something on the screen. This is named **XDG surface** in Wayland.
In the past, a shell surface existed in the Wayland core protocol. But it is
deprecated and now it won't work on the modern Wayland compositors. Instead,
we should use **XDG Shell** protocol. This is now _stable_ protocol but not a
part of Wayland core protocol.

### Code Generation

Wayland protocols are just XML files. Fortunately, we have a code generator
called `wayland-scanner`. We can generate C header and source file with the
command.

```sh
$ wayland-scanner client-header /usr/share/wayland-protocols/stable/xdg-shell/xdg-shell.xml xdg-shell.h
$ wayland-scanner public-code /usr/share/wayland-protocols/stable/xdg-shell/xdg-shell.xml xdg-shell.c
```

In our source code, include the header.

```c
#include "xdg-shell.h"
```

And our compilation command would be,

```sh
$ gcc main.c xdg-shell.c -lwayland-client
```

### Back to Code

We are going to write a lot of code, but don't panic! Most of them are
repetitive and in same pattern. Define handlers, create a listener with them,
create an object and add listener to it.

First, we will declare the three variables.

```c
struct xdg_wm_base *xdg_wm_base = NULL;
struct xdg_surface *xdg_surface = NULL;
struct xdg_toplevel *xdg_toplevel = NULL;
```

`xdg_wm_base` is the base of **XDG Shell** protocol. `xdg_surface` is a surface
based on `wl_surface`. `xdg_toplevel` is a one of the XDG surface roles. We
will explain about these details later. For now, let's write the code.

Next, define listeners with the necessary handlers.

```c
static void xdg_wm_base_ping_handler(void *data,
        struct xdg_wm_base *wm_base, uint32_t serial)
{
    xdg_wm_base_pong(wm_base, serial);
}

static const struct xdg_wm_base_listener xdg_wm_base_listener = {
    .ping = xdg_wm_base_ping_handler,
};

static void xdg_surface_configure_handler(void *data,
        struct xdg_surface *xdg_surface, uint32_t serial)
{
    xdg_surface_ack_configure(xdg_surface, serial);
}

static const struct xdg_surface_listener xdg_surface_listener = {
    .configure = xdg_surface_configure_handler,
};

static void xdg_toplevel_configure_handler(void *data,
        struct xdg_toplevel *toplevel, int32_t width, int32_t height,
        struct wl_array *states)
{
    fprintf(stderr, "XDG toplevel configure: %dx%d\n", width, height);
}

static void xdg_toplevel_close_handler(void *data,
        struct xdg_toplevel *toplevel)
{
}

static const struct xdg_toplevel_listener xdg_toplevel_listener = {
    .configure = xdg_toplevel_configure_handler,
    .close = xdg_toplevel_close_handler,
};
```

You may have noticed that this code has a similar pattern to what was written
before. Let's continue. In our `global_registry_handler()` function, add new
comparison.

```c
static void global_registry_handler(void *data, struct wl_registry *registry,
        uint32_t id, const char *interface, uint32_t version)
{
    if (strcmp(interface, "wl_compositor") == 0) {
        compositor = wl_registry_bind(registry,
            id, &wl_compositor_interface, 4);
    } else if (strcmp(interface, "xdg_wm_base") == 0) {
        xdg_wm_base = wl_registry_bind(registry,
            id, &xdg_wm_base_interface, 1);
    }
}
```

And finally in our main function, add next after create a surface.

```c
// Add our listener to xdg_wm_base.
xdg_wm_base_add_listener(xdg_wm_base, &xdg_wm_base_listener, NULL);

// Create a XDG surface based our surface.
xdg_surface = xdg_wm_base_get_xdg_surface(xdg_wm_base, surface);
xdg_surface_add_listener(xdg_surface, &xdg_surface_listener, NULL);

// Set toplevel role to our XDG surface.
xdg_toplevel = xdg_surface_get_toplevel(xdg_surface);
xdg_toplevel_add_listener(xdg_toplevel, &xdg_toplevel_listener, NULL);

// Apply our changes.
wl_surface_commit(surface);
```

There's one thing left. Main loop of our Wayland client.

```c
while (wl_display_dispatch(display) != -1) {
    ;
}
```

It's done! Try compile and run.

If you want full source code, click [here](https://github.com/hardboiled65/WaylandClient-tutorials/tree/main/surface).

## Conclusion

We have done to prepare the core of Wayland client program. In next chapter,
finally we will draw something on the screen.

[In Pixels We Trust](/documentation/wayland/guides/in-pixels-we-trust)
