# Dockerfile and Image making

- `docker build .` to build an image from the _Dockerfile_.
- `docker run ID123` with the id that was printed after building to run the image.
- `docker build -t IMAGENAME .` creates an image with the supplied image name.
- `docker commit -c 'CMD ["COMMAND"]' ID123` to create an image with the default command out of the container. Dockerfile approach is generally preferred though.

On Windows, if you get the error `"/bin/sh: [COMMAND]: not found"`, try running the command like so: `docker commit -c "CMD 'COMMAND'" ID123`.

Naming convention for images:

```
personaldockerid/projectname:version
```

example:

```
pallimoon/myproject:latest
```

The `:latest` is automatically appended if not specified. It is also not needed when running the image.
