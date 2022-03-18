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
