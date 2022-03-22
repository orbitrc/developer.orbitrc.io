# In Pixels We Trust

Imagine being able to control the pixels within a rectangular area. This is
what the shared memory model in Wayland programming.

## Creating a Shared Memory

It's not easy to understand about shared memory. Instead we will use the piece
of source code from **Weston**. Next is the little modified version of code in
**Weston** and just copy-and-paste it to your code.

I modified indentation and the name `"weston-shared-XXXXXX"` to
`"tutorial-shared-XXXXXX"`.
The original source code is in [here](https://gitlab.freedesktop.org/wayland/weston/-/blob/main/shared/os-compatibility.c).

```c
static int set_cloexec_or_close(int fd)
{
    long flags;

    if (fd == -1)
        return -1;

    flags = fcntl(fd, F_GETFD);
    if (flags == -1)
        goto err;

    if (fcntl(fd, F_SETFD, flags | FD_CLOEXEC) == -1)
        goto err;

    return fd;

err:
    close(fd);
    return -1;
}

static int create_tmpfile_cloexec(char *tmpname)
{
    int fd;

#ifdef HAVE_MKOSTEMP
    fd = mkostemp(tmpname, O_CLOEXEC);
    if (fd >= 0)
        unlink(tmpname);
#else
    fd = mkstemp(tmpname);
    if (fd >= 0) {
        fd = set_cloexec_or_close(fd);
        unlink(tmpname);
    }
#endif

    return fd;
}

/*
 * Create a new, unique, anonymous file of the given size, and
 * return the file descriptor for it. The file descriptor is set
 * CLOEXEC. The file is immediately suitable for mmap()'ing
 * the given size at offset zero.
 *
 * The file should not have a permanent backing store like a disk,
 * but may have if XDG_RUNTIME_DIR is not properly implemented in OS.
 *
 * The file name is deleted from the file system.
 *
 * The file is suitable for buffer sharing between processes by
 * transmitting the file descriptor over Unix sockets using the
 * SCM_RIGHTS methods.
 */
int os_create_anonymous_file(off_t size)
{
    static const char template[] = "/tutorial-shared-XXXXXX";
    const char *path;
    char *name;
    int fd;

    path = getenv("XDG_RUNTIME_DIR");
    if (!path) {
        errno = ENOENT;
        return -1;
    }

    name = malloc(strlen(path) + sizeof(template));
    if (!name)
        return -1;
    strcpy(name, path);
    strcat(name, template);

    fd = create_tmpfile_cloexec(name);

    free(name);

    if (fd < 0)
        return -1;

    if (ftruncate(fd, size) < 0) {
        close(fd);
        return -1;
    }

    return fd;
}
```

These functions need including some headers.

```c
#include <errno.h>

// Unix
#include <unistd.h>
#include <fcntl.h>
#include <sys/mman.h>
```

## Creating a Shared Memory Buffer

And then we need a shared memory buffer which is provided by Wayland. `wm_shm`
is a singleton global object.

```c
struct wl_shm *shm = NULL;
struct wl_buffer *buffer = NULL;
void *shm_data;
```

`wl_shm` is also created by `wl_registry`. Go to our
`global_registry_handler()` function and add new comparison.

```c
    } else if (strcmp(interface, "wl_shm") == 0) {
        shm = wl_registry_bind(registry,
            id, &wl_shm_interface, 1);
        wl_shm_add_listener(shm, &shm_listener, NULL);
    }
```

Don't forget to write a listener struct.

```c
static void shm_format_handler(void *data,
        struct wl_shm *shm, uint32_t format)
{
    fprintf(stderr, "Format %d\n", format);
}

static const struct wl_shm_listener shm_listener = {
    .format = shm_format_handler,
};
```

To create a buffer we need a pool. And a pool requires a file descriptor.
For this, using the function we have copied. Then we will use
[mmap](https://man7.org/linux/man-pages/man2/mmap.2.html) function to create a
mapping. This will be the space where our pixel data stored.

```c
static struct wl_buffer* create_buffer(int width, int height)
{
    struct wl_shm_pool *pool;
    int stride = width * 4; // 4 bytes per pixel in our ARGB8888 format.
    int size = stride * height;
    int fd;
    struct wl_buffer *buff;

    fd = os_create_anonymous_file(size);
    if (fd < 0) {
        fprintf(stderr, "Failed to create a buffer. size: %d\n", size);
        exit(1);
    }

    shm_data = mmap(NULL, size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (shm_data == MAP_FAILED) {
        fprintf(stderr, "mmap failed!\n");
        close(fd);
        exit(1);
    }

    pool = wl_shm_create_pool(shm, fd, size);
    buff = wl_shm_pool_create_buffer(pool, 0, width, height, stride,
        WL_SHM_FORMAT_ARGB8888);
    wl_shm_pool_destroy(pool);

    return buff;
}
```

Done. Now we are ready to write pixel data to shared memory.

## Writing to Shared Memory

In our main function add the lines.

```c
    wl_surface_commit(surface);
    wl_display_roundtrip(display);

    buffer = create_buffer(480, 360);

    wl_surface_attach(surface, buffer, 0, 0);
    wl_surface_commit(surface);

    uint32_t *pixel = shm_data;
    for (int i = 0; i < 480 * 360; ++i) {
        *pixel = 0xde000000;
        ++pixel;
    }
```

We used `WL_SHM_FORMAT_ARGB8888` when create buffer. Each 8-bit stands for
alpha, red, green and blue, in that order. In this example, the colour is
black with slightly transparent.

The result will be like this.

![wayland-shared](https://raw.githubusercontent.com/orbitrc/developer.orbitrc.io/main/static/wayland-shared.png)

The full, working source code can found [here](https://github.com/hardboiled65/WaylandClient-tutorials/tree/main/shared).

### Do It Yourself!

Change the hexademical number in your flavour. For example, 0xffff0000 is
fully opaque red colour. You can store this pixel data to a global variable
and change each loop. Try it until you get tired of playing with the pixels.

## Next

If you are no longer interested in this, let's move on to the next chapter.

[Cairo For an Image](/documentation/wayland/guides/cairo-for-an-image)
