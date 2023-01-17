# Dockerfile and Image making

- `docker build .` to build an image from the _Dockerfile_.
- `docker run ID123` with the id that was printed after building to run the image.
- `docker build -t IMAGENAME .` creates an image with the supplied image name.
- `docker commit -c 'CMD ["COMMAND"]' ID123` to create an image with the default command out of the container. Dockerfile approach is generally preferred though.

Naming convention:
`personaldockerid/projectname:version`
example:
`pallimoon/myproject:latest`
