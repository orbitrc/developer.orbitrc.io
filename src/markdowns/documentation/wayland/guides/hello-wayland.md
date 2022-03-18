# Hello, Wayland!

The first step of Wayland client programming is connecting to as server. In
this chapter, we will learn about how to connect to a Wayland server and get
informations.

In this guide we will use global variables for convenience. But this is
discouraged for real applications.

## Connecting

This is a very simple example to connect to a server and disconnect.

Create directories wherever you want. For example,

```sh
$ mkdir -p wayland-client/connect
$ cd wayland-client/connect
```

```c
/* main.c */
#include <stdio.h>
#include <stdlib.h>

#include <wayland-client.h>

struct wl_display *display = NULL;

int main(int argc, char *argv[])
{
    display = wl_display_connect(NULL);
    if (display == NULL) {
        fprintf(stderr, "Failed to connect to display.\n");
        exit(1);
    }
    printf("Connected to display!\n");

    wl_display_disconnect(display);
    printf("Disconnected from display.\n");

    return 0;
}
```

Then, compile it and run.

```sh
$ gcc main.c -lwayland-client
$ ./a.out
```

## Server Information

Let's get some information from server.

```c
/* main.c */
#include <stdio.h>
#include <stdlib.h>

#include <wayland-client.h>

struct wl_display *display = NULL;
struct wl_registry *registry = NULL;

static void global_registry_handler(void *data,
        struct wl_registry *registry, uint32_t id, const char *interface,
        uint32_t version)
{
    printf("Got a registry event for <%s>, id: %d, version: %d.\n",
        interface, id, version);
}

static void global_registry_remove_handler(void *data,
        struct wl_registry *registry, uint32_t id)
{
    printf("Got a registry losing event for <%d>\n", id);
}

const static struct wl_registry_listener registry_listener = {
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

    wl_display_disconnect(display);

    return 0;
}
```

We defined two functions for registry's `global` and `global_remove` handlers.
And then initialized a struct typed `struct wl_registry_listener` with these
handlers.

`wl_display_get_registry()` making a registry object from the display.
`wl_registry_add_listener()` adds the listener we have created to the registry.

After add the listener call `wl_display_dispatch()` and `wl_display_roundtrip()`
to wait for a response. Because adding listener is asynchronous process, we
have to call these to block until the server responds.

## Bind Something

Now, we will bind an object from the registry called a compositor.
For string comparison include the string standard library.

```c
#include <string.h>
```

Declare a global variable.

```c
struct wl_compositor *compositor = NULL;
```

In our `global_registry_handler()` function, compare interface to
`"wl_compositor"`. Then if match, bind it with the registry.

```c
static void global_registry_handler(void *data,
        struct wl_registry *registry, uint32_t id, const char *interface,
        uint32_t version)
{
    printf("Got a registry event for <%s>, id: %d, version: %d.\n",
        interface, id, version);
    if (strcmp(interface, "wl_compositor") == 0) {
        compositor = wl_registry_bind(registry,
            id, &wl_compositor_interface, 4);
    }
}
```

Add check for compositor in main function.

```c
    wl_display_dispatch(display);
    wl_display_roundtrip(display);

    if (compositor == NULL) {
        fprintf(stderr, "Can't find compositor.\n");
    } else {
        printf("Found compositor!\n");
    }
```

`wl_compositor_interface` is pre-defined by Wayland client C library.
The number `4` is the interface version. The latest version of `wl_compositor`
is 5. But our Wayland compositor is not implemented this version yet. Instead,
using version 4. If you faced an error, set version as 1 is okay. There are not
many changes between version 1 and 4.
We will handle with interface version detail later.

## Source Code

You can find a full source code [here](https://github.com/hardboiled65/WaylandClient-tutorials/tree/main/connect).

## Creating a Surface

If your program runs fine, now you will learn about a surface.

[Everything is a Surface](/documentation/wayland/guides/everything-is-a-surface)
