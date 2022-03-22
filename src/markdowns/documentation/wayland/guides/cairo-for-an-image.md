# Cairo For an Image

In this chapter, we will learn how to render a PNG image with **Cairo** the
2D graphics library.

## Cairo

[Cairo](https://www.cairographics.org/) is a 2D graphics library with many
drawing APIs. But in this time we will use its PNG image handling
feature only.

### Packages

We need Cairo library on our system with header files. Additionally, it
requires `pkg-config` to compile.

#### Arch Linux

On Arch Linux or Arch based distributions, library packages also contain
header files. So if you are already running on a graphical environment, it may
already be installed. You can omit `cairo` package in this case.

```sh
$ sudo pacman -S cairo pkgconf
```

#### Ubuntu

If your system is Ubuntu, you have to install the development package.

```sh
$ sudo apt install libcairo2-dev pkg-config
```

### Hello, Cairo!

This is a simple example that prints `"Hello, world!"` to a PNG file.

_Note_: Text API in Cairo is a _toy_ API.

> This set of functions are really that, a toy text API,
> for testing and demonstration purposes.
> Any serious application should avoid them.

```c
#include <cairo.h>

int main(int argc, char *argv[])
{
    cairo_surface_t *surface = cairo_image_surface_create(
        CAIRO_FORMAT_ARGB32, 240, 80);
    cairo_t *cr = cairo_create(surface);

    cairo_select_font_face(cr, "serif", CAIRO_FONT_SLANT_NORMAL,
        CAIRO_FONT_WEIGHT_BOLD);
    cairo_set_font_size(cr, 32.0);
    cairo_set_source_rgb(cr, 0.0, 0.0, 1.0);
    cairo_move_to(cr, 10.0, 50.0);
    cairo_show_text(cr, "Hello, world!");

    cairo_destroy(cr);
    cairo_surface_write_to_png(surface, "hello.png");
    cairo_surface_destroy(surface);
    return 0;
}
```

To compile this,

```sh
$ gcc main.c `pkg-config --cflags --libs cairo`
```

If you run the program, you will see a PNG file named `hello.png` contains
our text.

## Cairo with Wayland

Now, we will load a PNG image with Cairo and render it to our Wayland surface.
Let's get the sample image.

[nayn-cat.png](https://github.com/orbitrc/developer.orbitrc.io/raw/main/static/nyan-cat.png)

Right click the link and select **Save Link As...** if you are using Firefox.
And move this file to our working directory.

```c
    cairo_surface_t *cairo_surface = cairo_image_surface_create_from_png(
        "nyan-cat.png");
    if (cairo_surface_status(cairo_surface) != CAIRO_STATUS_SUCCESS) {
        fprintf(stderr, "Failed to load PNG image.\n");
        exit(1);
    }
    unsigned char *image_data = cairo_image_surface_get_data(cairo_surface);
    int image_width = cairo_image_surface_get_width(cairo_surface);
    int image_height = cairo_image_surface_get_height(cairo_surface);

    uint32_t *image_pixel = (uint32_t*)image_data;
    uint32_t *target = (uint32_t*)shm_data;
    for (int i = 0; i < image_height; ++i) {
        for (int j = 0; j < image_width; ++j) {
            *target = *image_pixel++;
            ++target;
            // Because our surface is larget than image, skip to next line.
            if (j == image_width - 1) {
                target += (480 - image_width);
            }
        }
    }

    cairo_surface_destroy(cairo_surface);
```

The code quite simple. Loop code is little dirty but it works in our tutorial.
If you have a simpler and more efficient algorithm for this, please submit a
new issue or email me.

Compile and run to show the result. The full source code is
[here](https://github.com/hardboiled65/WaylandClient-tutorials/tree/main/cairo).

## What About Text?

In common GUI examples, rendering text is introduced first. But we learned to
render an image first. Why? We will talk about this in next chapter.

[Pango For Text](/documentation/wayland/guides/pango-for-text)
